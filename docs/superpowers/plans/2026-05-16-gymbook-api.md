# GymBook API — Phase 2 Backend Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a production-ready FastAPI backend that scrapes gym data from the Google Places API (New), stores it in Supabase PostgreSQL, and serves a REST API consumed by the Next.js frontend at gymbogota.co.

**Architecture:** Separate Python service (`~/Desktop/gymbook-api/`) deployed to Railway. Supabase PostgreSQL for data storage (direct asyncpg connection, not supabase-py REST). Google Places Text Search API for initial data seed; deduplication by `place_id`. The frontend already has `NEXT_PUBLIC_API_URL` wired in `city.ts` — it just needs to point to the deployed Railway URL.

**Tech Stack:** Python 3.12, FastAPI 0.115, asyncpg 0.30, pydantic-settings 2.x, httpx 0.28, tenacity 9, alembic 1.14, python-slugify 8, ruff, mypy (strict), pytest + pytest-asyncio, GitHub Actions CI, Railway deploy via Dockerfile.

**Out of scope for this plan:** Next.js frontend changes (Plan B), CSV import from other Bogotá sources (Plan C).

---

## File structure

```
~/Desktop/gymbook-api/
├── pyproject.toml              # all config: deps, ruff, mypy, pytest, coverage
├── Dockerfile
├── railway.toml
├── .env.example
├── .gitignore
├── .github/
│   └── workflows/
│       └── ci.yml
├── alembic.ini
├── alembic/
│   ├── env.py
│   └── versions/
│       └── 001_initial.py      # full schema
├── app/
│   ├── __init__.py
│   ├── main.py                 # FastAPI app + lifespan + CORS
│   ├── config.py               # pydantic-settings Settings
│   ├── database.py             # asyncpg pool (singleton)
│   ├── deps.py                 # get_conn FastAPI dependency
│   ├── exceptions.py           # http_exception_handler
│   ├── models/
│   │   ├── __init__.py
│   │   └── gym.py              # Pydantic response models
│   ├── routers/
│   │   ├── __init__.py
│   │   ├── health.py           # GET /health
│   │   ├── gyms.py             # GET /gyms  GET /gyms/{slug}
│   │   ├── search.py           # GET /search
│   │   └── stats.py            # GET /stats
│   └── scraper/
│       ├── __init__.py
│       ├── places_client.py    # Google Places Text Search async client
│       └── seed.py             # CLI: python -m app.scraper.seed
├── tests/
│   ├── __init__.py
│   ├── conftest.py             # AsyncClient fixture, mock pool fixture
│   ├── test_health.py
│   ├── test_gyms.py
│   └── test_search.py
└── scripts/
    └── run_seed.py             # thin wrapper: asyncio.run(seed_all())
```

---

## Task 1: Project scaffold + health endpoint

**Files:**
- Create: `~/Desktop/gymbook-api/pyproject.toml`
- Create: `~/Desktop/gymbook-api/.gitignore`
- Create: `~/Desktop/gymbook-api/.env.example`
- Create: `~/Desktop/gymbook-api/app/__init__.py`
- Create: `~/Desktop/gymbook-api/app/config.py`
- Create: `~/Desktop/gymbook-api/app/main.py`
- Create: `~/Desktop/gymbook-api/app/routers/__init__.py`
- Create: `~/Desktop/gymbook-api/app/routers/health.py`
- Create: `~/Desktop/gymbook-api/tests/__init__.py`
- Create: `~/Desktop/gymbook-api/tests/conftest.py`
- Create: `~/Desktop/gymbook-api/tests/test_health.py`

- [ ] **Step 1: Create directory structure**

```bash
mkdir -p ~/Desktop/gymbook-api/{app/{models,routers,scraper},tests,scripts,.github/workflows,alembic/versions}
touch ~/Desktop/gymbook-api/app/__init__.py
touch ~/Desktop/gymbook-api/app/models/__init__.py
touch ~/Desktop/gymbook-api/app/routers/__init__.py
touch ~/Desktop/gymbook-api/app/scraper/__init__.py
touch ~/Desktop/gymbook-api/tests/__init__.py
cd ~/Desktop/gymbook-api
git init
```

- [ ] **Step 2: Write `pyproject.toml`**

```toml
[build-system]
requires = ["hatchling"]
build-backend = "hatchling.build"

[project]
name = "gymbook-api"
version = "0.1.0"
requires-python = ">=3.12"
dependencies = [
    "fastapi[standard]>=0.115",
    "asyncpg>=0.30",
    "pydantic-settings>=2.6",
    "httpx>=0.28",
    "tenacity>=9.0",
    "alembic>=1.14",
    "psycopg2-binary>=2.9",
    "python-slugify>=8.0",
]

[project.optional-dependencies]
dev = [
    "pytest>=8.3",
    "pytest-asyncio>=0.24",
    "pytest-cov>=6.0",
    "ruff>=0.8",
    "mypy>=1.13",
]

[tool.hatch.build.targets.wheel]
packages = ["app"]

[tool.ruff]
line-length = 100
target-version = "py312"

[tool.ruff.lint]
select = ["E", "F", "I", "UP", "B", "SIM"]

[tool.mypy]
python_version = "3.12"
strict = true
ignore_missing_imports = true

[tool.pytest.ini_options]
asyncio_mode = "auto"
testpaths = ["tests"]

[tool.coverage.run]
source = ["app"]
omit = ["app/scraper/*"]
```

- [ ] **Step 3: Write `.env.example`**

```
DATABASE_URL=postgresql://postgres:password@db.supabase.co:5432/postgres
GOOGLE_PLACES_API_KEY=
ALLOWED_ORIGINS=http://localhost:3000,https://gymbogota.co,https://www.gymbogota.co
```

- [ ] **Step 4: Write `.gitignore`**

```
.env
__pycache__/
*.pyc
.mypy_cache/
.ruff_cache/
.pytest_cache/
.coverage
htmlcov/
dist/
```

- [ ] **Step 5: Write `app/config.py`**

```python
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")

    database_url: str = ""
    google_places_api_key: str = ""
    allowed_origins: list[str] = [
        "http://localhost:3000",
        "https://gymbogota.co",
        "https://www.gymbogota.co",
    ]
    api_version: str = "0.1.0"


settings = Settings()
```

- [ ] **Step 6: Write `app/routers/health.py`**

```python
from fastapi import APIRouter
from app.config import settings

router = APIRouter(tags=["health"])


@router.get("/health")
async def health() -> dict[str, str]:
    return {"status": "ok", "version": settings.api_version}
```

- [ ] **Step 7: Write `app/main.py`**

```python
from contextlib import asynccontextmanager
from collections.abc import AsyncGenerator

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import settings
from app.routers import health


@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncGenerator[None, None]:
    # DB pool initialised lazily on first request; nothing to do here yet
    yield


app = FastAPI(title="GymBook API", version=settings.api_version, lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.allowed_origins,
    allow_methods=["GET"],
    allow_headers=["*"],
)

app.include_router(health.router)
```

- [ ] **Step 8: Write `tests/conftest.py`**

```python
import pytest
from httpx import AsyncClient, ASGITransport

from app.main import app


@pytest.fixture
async def client() -> AsyncClient:
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as c:
        yield c
```

- [ ] **Step 9: Write `tests/test_health.py`**

```python
import pytest
from httpx import AsyncClient


async def test_health_returns_ok(client: AsyncClient) -> None:
    resp = await client.get("/health")
    assert resp.status_code == 200
    body = resp.json()
    assert body["status"] == "ok"
    assert "version" in body
```

- [ ] **Step 10: Install deps and run test — expect PASS**

```bash
cd ~/Desktop/gymbook-api
pip install -e ".[dev]"
pytest tests/test_health.py -v
```

Expected output:
```
PASSED tests/test_health.py::test_health_returns_ok
1 passed in 0.XXs
```

- [ ] **Step 11: Run ruff + mypy**

```bash
ruff check app tests
mypy app
```

Expected: no errors.

- [ ] **Step 12: Commit**

```bash
cd ~/Desktop/gymbook-api
git add .
git commit -m "feat: project scaffold + health endpoint"
```

---

## Task 2: Database layer + Alembic migration

**Files:**
- Create: `~/Desktop/gymbook-api/alembic.ini`
- Create: `~/Desktop/gymbook-api/alembic/env.py`
- Create: `~/Desktop/gymbook-api/alembic/versions/001_initial.py`
- Create: `~/Desktop/gymbook-api/app/database.py`
- Create: `~/Desktop/gymbook-api/app/deps.py`

**Pre-requisite (manual):** Create a Supabase project at https://supabase.com, go to Project Settings → Database → Connection string (URI mode), copy it into `~/Desktop/gymbook-api/.env` as `DATABASE_URL`. The string looks like: `postgresql://postgres.XXXXX:PASSWORD@aws-0-us-east-1.pooler.supabase.com:5432/postgres`

- [ ] **Step 1: Initialise Alembic**

```bash
cd ~/Desktop/gymbook-api
alembic init alembic
```

- [ ] **Step 2: Replace `alembic/env.py` with sync psycopg2 version**

```python
from logging.config import fileConfig
from alembic import context
from sqlalchemy import engine_from_config, pool
import os

config = context.config
if config.config_file_name:
    fileConfig(config.config_file_name)

config.set_main_option("sqlalchemy.url", os.environ["DATABASE_URL"].replace(
    "postgresql://", "postgresql+psycopg2://", 1
))


def run_migrations_offline() -> None:
    url = config.get_main_option("sqlalchemy.url")
    context.configure(url=url, literal_binds=True, dialect_opts={"paramstyle": "named"})
    with context.begin_transaction():
        context.run_migrations()


def run_migrations_online() -> None:
    connectable = engine_from_config(
        config.get_section(config.config_ini_section, {}),
        prefix="sqlalchemy.",
        poolclass=pool.NullPool,
    )
    with connectable.connect() as connection:
        context.configure(connection=connection)
        with context.begin_transaction():
            context.run_migrations()


if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()
```

- [ ] **Step 3: Write `alembic/versions/001_initial.py`**

```python
"""initial schema

Revision ID: 001
Revises:
Create Date: 2026-05-16
"""
from alembic import op

revision = "001"
down_revision = None
branch_labels = None
depends_on = None

VALID_CATEGORIES = "('gimnasios','estudios','entrenadores','eventos','bienestar')"
VALID_STATUSES = "('active','closed','pending')"


def upgrade() -> None:
    op.execute("""
        CREATE TABLE IF NOT EXISTS gyms (
            id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            place_id    TEXT UNIQUE NOT NULL,
            name        TEXT NOT NULL,
            slug        TEXT UNIQUE NOT NULL,
            category    TEXT NOT NULL CHECK (category IN """ + VALID_CATEGORIES + """),
            localidad   TEXT NOT NULL,
            address     TEXT,
            phone       TEXT,
            website     TEXT,
            description TEXT,
            rating      NUMERIC(2,1),
            review_count INTEGER NOT NULL DEFAULT 0,
            lat         NUMERIC(10,7),
            lng         NUMERIC(10,7),
            photos      JSONB NOT NULL DEFAULT '[]',
            opening_hours JSONB NOT NULL DEFAULT '{}',
            status      TEXT NOT NULL DEFAULT 'active' CHECK (status IN """ + VALID_STATUSES + """),
            source      TEXT NOT NULL DEFAULT 'google_places',
            featured    BOOLEAN NOT NULL DEFAULT false,
            created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
            updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
        );

        CREATE INDEX IF NOT EXISTS idx_gyms_category
            ON gyms(category) WHERE status = 'active';
        CREATE INDEX IF NOT EXISTS idx_gyms_localidad
            ON gyms(localidad) WHERE status = 'active';
        CREATE INDEX IF NOT EXISTS idx_gyms_cat_loc
            ON gyms(category, localidad) WHERE status = 'active';
        CREATE INDEX IF NOT EXISTS idx_gyms_slug
            ON gyms(slug);
        CREATE INDEX IF NOT EXISTS idx_gyms_rating
            ON gyms(rating DESC NULLS LAST) WHERE status = 'active';
        CREATE INDEX IF NOT EXISTS idx_gyms_fts ON gyms USING gin(
            to_tsvector('spanish', name || ' ' || COALESCE(description, ''))
        );

        CREATE OR REPLACE FUNCTION update_updated_at()
        RETURNS TRIGGER AS $$
        BEGIN NEW.updated_at = now(); RETURN NEW; END;
        $$ LANGUAGE plpgsql;

        DROP TRIGGER IF EXISTS gyms_updated_at ON gyms;
        CREATE TRIGGER gyms_updated_at
            BEFORE UPDATE ON gyms
            FOR EACH ROW EXECUTE FUNCTION update_updated_at();
    """)


def downgrade() -> None:
    op.execute("DROP TABLE IF EXISTS gyms CASCADE;")
    op.execute("DROP FUNCTION IF EXISTS update_updated_at CASCADE;")
```

- [ ] **Step 4: Run migration against Supabase**

```bash
cd ~/Desktop/gymbook-api
alembic upgrade head
```

Expected output:
```
INFO  [alembic.runtime.migration] Running upgrade  -> 001, initial schema
```

Verify in Supabase dashboard: Table Editor → gyms table should appear with all columns.

- [ ] **Step 5: Write `app/database.py`**

```python
import asyncpg
from asyncpg import Pool

from app.config import settings

_pool: Pool | None = None


async def get_pool() -> Pool:
    global _pool
    if _pool is None:
        _pool = await asyncpg.create_pool(
            settings.database_url,
            min_size=2,
            max_size=10,
            command_timeout=30,
            statement_cache_size=0,  # required for Supabase PgBouncer
        )
    assert _pool is not None
    return _pool


async def close_pool() -> None:
    global _pool
    if _pool is not None:
        await _pool.close()
        _pool = None
```

Note: `statement_cache_size=0` is required when connecting via Supabase's PgBouncer transaction pooler. Without it, asyncpg will fail with "prepared statement already exists".

- [ ] **Step 6: Write `app/deps.py`**

```python
from collections.abc import AsyncGenerator

import asyncpg

from app.database import get_pool


async def get_conn() -> AsyncGenerator[asyncpg.Connection, None]:
    pool = await get_pool()
    async with pool.acquire() as conn:
        yield conn
```

- [ ] **Step 7: Update `app/main.py` to wire pool lifecycle**

```python
from contextlib import asynccontextmanager
from collections.abc import AsyncGenerator

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import settings
from app.database import close_pool, get_pool
from app.routers import health


@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncGenerator[None, None]:
    await get_pool()
    yield
    await close_pool()


app = FastAPI(title="GymBook API", version=settings.api_version, lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.allowed_origins,
    allow_methods=["GET"],
    allow_headers=["*"],
)

app.include_router(health.router)
```

- [ ] **Step 8: Run tests — still PASS (health test needs no DB)**

```bash
pytest tests/ -v
```

- [ ] **Step 9: Commit**

```bash
git add .
git commit -m "feat: database layer + alembic migration (gyms table)"
```

---

## Task 3: Gym Pydantic models

**Files:**
- Create: `~/Desktop/gymbook-api/app/models/gym.py`

- [ ] **Step 1: Write `app/models/gym.py`**

```python
from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, ConfigDict


class GymListItem(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    name: str
    slug: str
    category: str
    localidad: str
    address: str | None
    phone: str | None
    website: str | None
    rating: float | None
    review_count: int
    lat: float | None
    lng: float | None
    featured: bool


class GymDetail(GymListItem):
    description: str | None
    photos: list[str]
    opening_hours: dict[str, str]
    created_at: datetime
    updated_at: datetime


class PaginatedGyms(BaseModel):
    items: list[GymListItem]
    total: int
    page: int
    per_page: int
    pages: int
```

- [ ] **Step 2: Verify mypy passes**

```bash
mypy app/models/gym.py
```

Expected: `Success: no issues found in 1 source file`

- [ ] **Step 3: Commit**

```bash
git add .
git commit -m "feat: gym pydantic models"
```

---

## Task 4: Gyms API endpoints (list + detail)

**Files:**
- Create: `~/Desktop/gymbook-api/app/routers/gyms.py`
- Modify: `~/Desktop/gymbook-api/app/main.py`
- Create: `~/Desktop/gymbook-api/tests/test_gyms.py`

- [ ] **Step 1: Write `tests/test_gyms.py`**

The tests mock the DB pool so they work without a real Supabase connection.

```python
import json
from unittest.mock import AsyncMock, MagicMock, patch
from uuid import uuid4

import pytest
from httpx import AsyncClient


def make_gym_row(**kwargs: object) -> dict:
    defaults: dict = {
        "id": uuid4(),
        "name": "CrossFit Chapinero",
        "slug": "crossfit-chapinero",
        "category": "gimnasios",
        "localidad": "chapinero",
        "address": "Calle 63 #9-10",
        "phone": "+5713456789",
        "website": "https://example.com",
        "rating": 4.5,
        "review_count": 120,
        "lat": 4.6534,
        "lng": -74.0636,
        "featured": False,
        "description": "Great gym",
        "photos": json.dumps([]),
        "opening_hours": json.dumps({}),
        "created_at": "2026-01-01T00:00:00+00:00",
        "updated_at": "2026-01-01T00:00:00+00:00",
    }
    defaults.update(kwargs)
    return defaults


def mock_row(data: dict) -> MagicMock:
    row = MagicMock()
    row.__iter__ = MagicMock(return_value=iter(data.items()))
    row.keys = MagicMock(return_value=list(data.keys()))
    row.__getitem__ = MagicMock(side_effect=data.__getitem__)

    def items():
        return data.items()

    row.items = items
    return row


@pytest.fixture
def mock_conn() -> AsyncMock:
    conn = AsyncMock()
    return conn


@pytest.fixture(autouse=True)
def patch_pool(mock_conn: AsyncMock) -> None:
    pool_mock = AsyncMock()
    pool_mock.acquire.return_value.__aenter__ = AsyncMock(return_value=mock_conn)
    pool_mock.acquire.return_value.__aexit__ = AsyncMock(return_value=None)
    with patch("app.database._pool", pool_mock):
        yield


async def test_list_gyms_returns_paginated(client: AsyncClient, mock_conn: AsyncMock) -> None:
    row = make_gym_row()
    mock_conn.fetchval = AsyncMock(return_value=1)
    mock_conn.fetch = AsyncMock(return_value=[mock_row(row)])

    resp = await client.get("/gyms")
    assert resp.status_code == 200
    body = resp.json()
    assert body["total"] == 1
    assert body["page"] == 1
    assert len(body["items"]) == 1
    assert body["items"][0]["name"] == "CrossFit Chapinero"


async def test_list_gyms_filter_by_category(client: AsyncClient, mock_conn: AsyncMock) -> None:
    mock_conn.fetchval = AsyncMock(return_value=0)
    mock_conn.fetch = AsyncMock(return_value=[])

    resp = await client.get("/gyms?category=estudios")
    assert resp.status_code == 200
    assert resp.json()["total"] == 0


async def test_get_gym_detail(client: AsyncClient, mock_conn: AsyncMock) -> None:
    row = make_gym_row()
    mock_conn.fetchrow = AsyncMock(return_value=mock_row(row))

    resp = await client.get("/gyms/crossfit-chapinero")
    assert resp.status_code == 200
    assert resp.json()["slug"] == "crossfit-chapinero"


async def test_get_gym_not_found(client: AsyncClient, mock_conn: AsyncMock) -> None:
    mock_conn.fetchrow = AsyncMock(return_value=None)

    resp = await client.get("/gyms/nonexistent")
    assert resp.status_code == 404
```

- [ ] **Step 2: Run tests — expect FAIL (router not wired yet)**

```bash
pytest tests/test_gyms.py -v
```

Expected: `FAILED tests/test_gyms.py::test_list_gyms_returns_paginated — 404 Not Found`

- [ ] **Step 3: Write `app/routers/gyms.py`**

```python
from typing import Annotated

import asyncpg
from fastapi import APIRouter, Depends, HTTPException, Query

from app.deps import get_conn
from app.models.gym import GymDetail, GymListItem, PaginatedGyms

router = APIRouter(tags=["gyms"])

Conn = Annotated[asyncpg.Connection, Depends(get_conn)]


@router.get("", response_model=PaginatedGyms)
async def list_gyms(
    conn: Conn,
    category: str | None = Query(None),
    localidad: str | None = Query(None),
    page: int = Query(1, ge=1),
    per_page: int = Query(20, ge=1, le=100),
) -> PaginatedGyms:
    conditions = ["status = 'active'"]
    params: list[object] = []
    idx = 1

    if category:
        conditions.append(f"category = ${idx}")
        params.append(category)
        idx += 1
    if localidad:
        conditions.append(f"localidad = ${idx}")
        params.append(localidad)
        idx += 1

    where = " AND ".join(conditions)
    offset = (page - 1) * per_page

    total: int = await conn.fetchval(f"SELECT COUNT(*) FROM gyms WHERE {where}", *params)
    rows = await conn.fetch(
        f"""
        SELECT id, name, slug, category, localidad, address, phone, website,
               rating, review_count, lat, lng, featured
        FROM gyms WHERE {where}
        ORDER BY featured DESC, rating DESC NULLS LAST
        LIMIT ${idx} OFFSET ${idx + 1}
        """,
        *params,
        per_page,
        offset,
    )

    return PaginatedGyms(
        items=[GymListItem(**dict(r)) for r in rows],
        total=total,
        page=page,
        per_page=per_page,
        pages=max(1, -(-total // per_page)),
    )


@router.get("/{slug}", response_model=GymDetail)
async def get_gym(slug: str, conn: Conn) -> GymDetail:
    row = await conn.fetchrow(
        "SELECT * FROM gyms WHERE slug = $1 AND status = 'active'", slug
    )
    if not row:
        raise HTTPException(status_code=404, detail="Gym not found")
    return GymDetail(**dict(row))
```

- [ ] **Step 4: Wire gyms router in `app/main.py`**

Add to imports:
```python
from app.routers import gyms, health
```

Add after `app.include_router(health.router)`:
```python
app.include_router(gyms.router, prefix="/gyms")
```

- [ ] **Step 5: Run tests — expect PASS**

```bash
pytest tests/test_gyms.py -v
```

Expected: `4 passed`

- [ ] **Step 6: Run full lint + type check**

```bash
ruff check app tests && mypy app
```

- [ ] **Step 7: Commit**

```bash
git add .
git commit -m "feat: gyms list + detail endpoints with tests"
```

---

## Task 5: Search endpoint

**Files:**
- Create: `~/Desktop/gymbook-api/app/routers/search.py`
- Create: `~/Desktop/gymbook-api/tests/test_search.py`
- Modify: `~/Desktop/gymbook-api/app/main.py`

- [ ] **Step 1: Write `tests/test_search.py`**

```python
from unittest.mock import AsyncMock
from uuid import uuid4

import pytest
from httpx import AsyncClient

from tests.test_gyms import make_gym_row, mock_row


async def test_search_requires_query(client: AsyncClient) -> None:
    resp = await client.get("/search")
    assert resp.status_code == 422


async def test_search_too_short(client: AsyncClient) -> None:
    resp = await client.get("/search?q=a")
    assert resp.status_code == 422


async def test_search_returns_results(client: AsyncClient, mock_conn: AsyncMock) -> None:
    row = make_gym_row(name="Power Gym Usaquén", slug="power-gym-usaquen")
    mock_conn.fetchval = AsyncMock(return_value=1)
    mock_conn.fetch = AsyncMock(return_value=[mock_row({**row, "rank": 0.9})])

    resp = await client.get("/search?q=power+gym")
    assert resp.status_code == 200
    body = resp.json()
    assert body["total"] == 1
    assert body["items"][0]["name"] == "Power Gym Usaquén"


async def test_search_with_filters(client: AsyncClient, mock_conn: AsyncMock) -> None:
    mock_conn.fetchval = AsyncMock(return_value=0)
    mock_conn.fetch = AsyncMock(return_value=[])

    resp = await client.get("/search?q=crossfit&category=gimnasios&localidad=chapinero")
    assert resp.status_code == 200
    assert resp.json()["total"] == 0
```

- [ ] **Step 2: Run tests — expect FAIL**

```bash
pytest tests/test_search.py -v
```

- [ ] **Step 3: Write `app/routers/search.py`**

```python
from typing import Annotated

import asyncpg
from fastapi import APIRouter, Depends, Query

from app.deps import get_conn
from app.models.gym import GymListItem, PaginatedGyms

router = APIRouter(tags=["search"])

Conn = Annotated[asyncpg.Connection, Depends(get_conn)]


@router.get("", response_model=PaginatedGyms)
async def search_gyms(
    conn: Conn,
    q: str = Query(..., min_length=2, max_length=100),
    category: str | None = Query(None),
    localidad: str | None = Query(None),
    page: int = Query(1, ge=1),
    per_page: int = Query(20, ge=1, le=100),
) -> PaginatedGyms:
    # $1 is always the search query
    conditions = [
        "status = 'active'",
        "to_tsvector('spanish', name || ' ' || COALESCE(description,'')) @@ plainto_tsquery('spanish', $1)",
    ]
    params: list[object] = [q]
    idx = 2

    if category:
        conditions.append(f"category = ${idx}")
        params.append(category)
        idx += 1
    if localidad:
        conditions.append(f"localidad = ${idx}")
        params.append(localidad)
        idx += 1

    where = " AND ".join(conditions)
    offset = (page - 1) * per_page

    total: int = await conn.fetchval(f"SELECT COUNT(*) FROM gyms WHERE {where}", *params)
    rows = await conn.fetch(
        f"""
        SELECT id, name, slug, category, localidad, address, phone, website,
               rating, review_count, lat, lng, featured,
               ts_rank(
                   to_tsvector('spanish', name || ' ' || COALESCE(description,'')),
                   plainto_tsquery('spanish', $1)
               ) AS rank
        FROM gyms WHERE {where}
        ORDER BY rank DESC, rating DESC NULLS LAST
        LIMIT ${idx} OFFSET ${idx + 1}
        """,
        *params,
        per_page,
        offset,
    )

    items = [GymListItem(**{k: v for k, v in dict(r).items() if k != "rank"}) for r in rows]

    return PaginatedGyms(
        items=items,
        total=total,
        page=page,
        per_page=per_page,
        pages=max(1, -(-total // per_page)),
    )
```

- [ ] **Step 4: Wire search router in `app/main.py`**

```python
from app.routers import gyms, health, search

# after gyms router:
app.include_router(search.router, prefix="/search")
```

- [ ] **Step 5: Run all tests — expect PASS**

```bash
pytest tests/ -v
```

Expected: `6 passed`

- [ ] **Step 6: Commit**

```bash
git add .
git commit -m "feat: full-text search endpoint with tests"
```

---

## Task 6: Stats endpoint

**Files:**
- Create: `~/Desktop/gymbook-api/app/routers/stats.py`
- Modify: `~/Desktop/gymbook-api/app/main.py`

- [ ] **Step 1: Write `app/routers/stats.py`**

```python
from typing import Annotated

import asyncpg
from fastapi import APIRouter, Depends

from app.deps import get_conn

router = APIRouter(tags=["stats"])

Conn = Annotated[asyncpg.Connection, Depends(get_conn)]


class StatsResponse(dict):
    pass


@router.get("/stats")
async def get_stats(conn: Conn) -> dict[str, int]:
    row = await conn.fetchrow("""
        SELECT
            COUNT(*) FILTER (WHERE status = 'active')           AS gyms,
            COUNT(DISTINCT localidad) FILTER (WHERE status = 'active') AS localidades,
            COUNT(DISTINCT category)  FILTER (WHERE status = 'active') AS categories
        FROM gyms
    """)
    localidades = int(row["localidades"])
    return {
        "gyms":        int(row["gyms"]),
        "barrios":     localidades,
        "localidades": localidades,
        "categories":  int(row["categories"]),
    }
```

- [ ] **Step 2: Wire stats router in `app/main.py`**

```python
from app.routers import gyms, health, search, stats

app.include_router(stats.router)
```

- [ ] **Step 3: Run all tests + lint**

```bash
pytest tests/ -v && ruff check app tests && mypy app
```

- [ ] **Step 4: Commit**

```bash
git add .
git commit -m "feat: stats endpoint (gym count, localidades, categories)"
```

---

## Task 7: Google Places API client

**Files:**
- Create: `~/Desktop/gymbook-api/app/scraper/places_client.py`

The client uses the Google Places **New API** (v1). Text Search endpoint returns up to 20 results per call; paginate with `nextPageToken`.

Cost: ~$0.032/request. 400 searches × 3 pages = 1200 requests ≈ $38 one-time seed. Monthly refresh ~$5.

- [ ] **Step 1: Enable the API**

In Google Cloud Console:
1. Create a project (or use existing)
2. Enable "Places API (New)"
3. Create an API key, restrict it to "Places API (New)"
4. Add `GOOGLE_PLACES_API_KEY=your_key` to `~/Desktop/gymbook-api/.env`

- [ ] **Step 2: Write `app/scraper/places_client.py`**

```python
import asyncio
import logging
from dataclasses import dataclass

import httpx
from tenacity import retry, stop_after_attempt, wait_exponential

from app.config import settings

logger = logging.getLogger(__name__)

PLACES_URL = "https://places.googleapis.com/v1/places:searchText"

FIELD_MASK = ",".join([
    "places.id",
    "places.displayName",
    "places.formattedAddress",
    "places.nationalPhoneNumber",
    "places.websiteUri",
    "places.rating",
    "places.userRatingCount",
    "places.location",
    "places.regularOpeningHours",
    "places.photos",
])


@dataclass
class PlaceResult:
    place_id: str
    name: str
    address: str | None
    phone: str | None
    website: str | None
    rating: float | None
    review_count: int
    lat: float | None
    lng: float | None
    opening_hours: dict[str, str]
    photo_names: list[str]


@retry(stop=stop_after_attempt(3), wait=wait_exponential(multiplier=1, min=4, max=15))
async def _text_search(
    client: httpx.AsyncClient, query: str, page_token: str | None = None
) -> dict:
    payload: dict[str, object] = {
        "textQuery": query,
        "languageCode": "es",
        "regionCode": "CO",
        "maxResultCount": 20,
    }
    if page_token:
        payload["pageToken"] = page_token

    resp = await client.post(
        PLACES_URL,
        json=payload,
        headers={
            "X-Goog-Api-Key": settings.google_places_api_key,
            "X-Goog-FieldMask": FIELD_MASK,
        },
        timeout=30,
    )
    resp.raise_for_status()
    return resp.json()  # type: ignore[no-any-return]


def _parse_place(raw: dict) -> PlaceResult:
    location = raw.get("location", {})
    hours_raw = raw.get("regularOpeningHours", {}).get("weekdayDescriptions", [])
    hours: dict[str, str] = {}
    for entry in hours_raw:
        if ": " in entry:
            day, times = entry.split(": ", 1)
            hours[day] = times

    return PlaceResult(
        place_id=raw["id"],
        name=raw.get("displayName", {}).get("text", ""),
        address=raw.get("formattedAddress"),
        phone=raw.get("nationalPhoneNumber"),
        website=raw.get("websiteUri"),
        rating=raw.get("rating"),
        review_count=raw.get("userRatingCount", 0),
        lat=location.get("latitude"),
        lng=location.get("longitude"),
        opening_hours=hours,
        photo_names=[p.get("name", "") for p in raw.get("photos", [])[:5]],
    )


async def search_all_pages(query: str) -> list[PlaceResult]:
    """Fetch up to 3 pages (60 results max) for a single text query."""
    results: list[PlaceResult] = []
    page_token: str | None = None

    async with httpx.AsyncClient() as client:
        for _ in range(3):  # Places API caps at 3 pages
            data = await _text_search(client, query, page_token)
            places = data.get("places", [])
            results.extend(_parse_place(p) for p in places)

            page_token = data.get("nextPageToken")
            if not page_token:
                break

            await asyncio.sleep(2)  # Places API requires a short delay before next page token

    logger.info("query=%r returned %d results", query, len(results))
    return results
```

- [ ] **Step 3: Commit**

```bash
git add .
git commit -m "feat: Google Places API client with retry + pagination"
```

---

## Task 8: Seed script

**Files:**
- Create: `~/Desktop/gymbook-api/app/scraper/seed.py`
- Create: `~/Desktop/gymbook-api/scripts/run_seed.py`

The seed script:
1. For each category × localidad combination, runs multiple search queries
2. Parses results and upserts into Supabase (ON CONFLICT place_id DO NOTHING)
3. Generates URL-safe unique slugs
4. Assigns localidad from the search query (v1 approximation — good enough for initial seed)

- [ ] **Step 1: Write `app/scraper/seed.py`**

```python
"""
Run: python scripts/run_seed.py
Estimated cost: ~$38 one-time (1200 Places API requests)
"""
import asyncio
import logging
import re

import asyncpg
from slugify import slugify

from app.config import settings
from app.scraper.places_client import PlaceResult, search_all_pages

logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s")

LOCALIDADES = [
    "Chapinero", "Usaquén", "Suba", "Kennedy", "Teusaquillo",
    "Fontibón", "Engativá", "Barrios Unidos", "Los Mártires",
    "Antonio Nariño", "Puente Aranda", "Rafael Uribe Uribe",
    "Ciudad Bolívar", "Bosa", "Tunjuelito", "San Cristóbal",
    "Usme", "La Candelaria", "Santa Fe",
]

LOCALIDAD_SLUG_MAP: dict[str, str] = {
    "Chapinero": "chapinero", "Usaquén": "usaquen", "Suba": "suba",
    "Kennedy": "kennedy", "Teusaquillo": "teusaquillo", "Fontibón": "fontibon",
    "Engativá": "engativa", "Barrios Unidos": "barrios-unidos",
    "Los Mártires": "los-martires", "Antonio Nariño": "antonio-narino",
    "Puente Aranda": "puente-aranda", "Rafael Uribe Uribe": "rafael-uribe-uribe",
    "Ciudad Bolívar": "ciudad-bolivar", "Bosa": "bosa", "Tunjuelito": "tunjuelito",
    "San Cristóbal": "san-cristobal", "Usme": "usme",
    "La Candelaria": "la-candelaria", "Santa Fe": "santa-fe",
}

QUERIES: dict[str, list[str]] = {
    "gimnasios": [
        "gimnasio en {loc} Bogotá",
        "gym crossfit en {loc} Bogotá",
        "calistenia entrenamiento en {loc} Bogotá",
    ],
    "estudios": [
        "estudio yoga pilates en {loc} Bogotá",
        "spinning cycling studio en {loc} Bogotá",
    ],
    "bienestar": [
        "spa centro bienestar en {loc} Bogotá",
        "nutricionista fisioterapia en {loc} Bogotá",
    ],
}


def _make_slug(name: str, localidad_slug: str, existing: set[str]) -> str:
    base = slugify(f"{name} {localidad_slug}")
    if base not in existing:
        return base
    i = 2
    while f"{base}-{i}" in existing:
        i += 1
    return f"{base}-{i}"


async def upsert_places(
    conn: asyncpg.Connection,
    places: list[PlaceResult],
    category: str,
    localidad: str,
    existing_slugs: set[str],
) -> int:
    inserted = 0
    localidad_slug = LOCALIDAD_SLUG_MAP[localidad]
    for place in places:
        slug = _make_slug(place.name, localidad_slug, existing_slugs)
        existing_slugs.add(slug)

        import json
        result = await conn.fetchval(
            """
            INSERT INTO gyms (
                place_id, name, slug, category, localidad,
                address, phone, website,
                rating, review_count, lat, lng,
                photos, opening_hours
            ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)
            ON CONFLICT (place_id) DO NOTHING
            RETURNING id
            """,
            place.place_id, place.name, slug, category, localidad_slug,
            place.address, place.phone, place.website,
            place.rating, place.review_count, place.lat, place.lng,
            json.dumps(place.photo_names), json.dumps(place.opening_hours),
        )
        if result:
            inserted += 1

    return inserted


async def seed_all() -> None:
    pool = await asyncpg.create_pool(
        settings.database_url, min_size=2, max_size=5, statement_cache_size=0
    )
    assert pool

    async with pool.acquire() as conn:
        existing_slugs: set[str] = {r["slug"] for r in await conn.fetch("SELECT slug FROM gyms")}

    total_inserted = 0

    for category, query_templates in QUERIES.items():
        for localidad in LOCALIDADES:
            for template in query_templates:
                query = template.format(loc=localidad)
                logger.info("Searching: %s", query)
                try:
                    places = await search_all_pages(query)
                except Exception as exc:
                    logger.error("Failed query %r: %s", query, exc)
                    continue

                async with pool.acquire() as conn:
                    n = await upsert_places(conn, places, category, localidad, existing_slugs)
                    total_inserted += n
                    logger.info("  inserted %d new gyms (total: %d)", n, total_inserted)

                await asyncio.sleep(0.5)  # be polite to the API

    await pool.close()
    logger.info("Seed complete. Total new gyms: %d", total_inserted)
```

- [ ] **Step 2: Write `scripts/run_seed.py`**

```python
import asyncio
import sys
import os

sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))
from app.scraper.seed import seed_all

if __name__ == "__main__":
    asyncio.run(seed_all())
```

- [ ] **Step 3: Test with a single localidad first (dry run)**

Before spending $38, test with one localidad to verify the pipeline works:

```bash
cd ~/Desktop/gymbook-api
# Temporarily edit seed.py: change LOCALIDADES list to just ["Chapinero"]
# and QUERIES to just gimnasios with 1 template
python scripts/run_seed.py
```

Expected log output:
```
INFO Searching: gimnasio en Chapinero Bogotá
INFO   query='gimnasio en Chapinero Bogotá' returned 20 results
INFO   inserted 20 new gyms (total: 20)
INFO Seed complete. Total new gyms: 20
```

Verify in Supabase: Table Editor → gyms → should show 20 rows.

- [ ] **Step 4: Restore full LOCALIDADES and QUERIES, run full seed**

```bash
python scripts/run_seed.py
```

This will run for ~10-15 minutes. Total expected: 500-1500 gyms depending on Places API coverage.

- [ ] **Step 5: Commit**

```bash
git add .
git commit -m "feat: seed script (Google Places → Supabase)"
```

---

## Task 9: CI/CD — GitHub Actions + Railway deploy

**Files:**
- Create: `~/Desktop/gymbook-api/.github/workflows/ci.yml`
- Create: `~/Desktop/gymbook-api/Dockerfile`
- Create: `~/Desktop/gymbook-api/railway.toml`

- [ ] **Step 1: Write `Dockerfile`**

```dockerfile
FROM python:3.12-slim

WORKDIR /app

COPY pyproject.toml .
RUN pip install --no-cache-dir -e "."

COPY . .

EXPOSE 8000
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

- [ ] **Step 2: Write `railway.toml`**

```toml
[build]
builder = "DOCKERFILE"

[deploy]
startCommand = "uvicorn app.main:app --host 0.0.0.0 --port $PORT"
healthcheckPath = "/health"
healthcheckTimeout = 30
restartPolicyType = "ON_FAILURE"
restartPolicyMaxRetries = 3
```

- [ ] **Step 3: Write `.github/workflows/ci.yml`**

```yaml
name: CI

on:
  push:
    branches: [main]
  pull_request:

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-python@v5
        with:
          python-version: '3.12'
          cache: 'pip'

      - name: Install dependencies
        run: pip install -e ".[dev]"

      - name: Lint
        run: ruff check app tests

      - name: Type check
        run: mypy app

      - name: Test
        run: pytest tests/ -v --cov=app --cov-report=term-missing
        env:
          DATABASE_URL: ""
          GOOGLE_PLACES_API_KEY: ""
```

- [ ] **Step 4: Deploy to Railway**

1. Go to https://railway.app → New Project → Deploy from GitHub repo → select `gymbook-api`
2. Railway auto-detects Dockerfile
3. In Railway project → Variables → add:
   - `DATABASE_URL` = your Supabase connection string
   - `ALLOWED_ORIGINS` = `https://gymbogota.co,https://www.gymbogota.co`
4. Deploy button → Railway builds and deploys
5. Copy the generated Railway URL (e.g. `https://gymbook-api-production.up.railway.app`)

- [ ] **Step 5: Test deployed API**

```bash
curl https://gymbook-api-production.up.railway.app/health
# Expected: {"status":"ok","version":"0.1.0"}

curl "https://gymbook-api-production.up.railway.app/gyms?category=gimnasios&localidad=chapinero&per_page=3"
# Expected: {"items":[...],"total":N,...}

curl "https://gymbook-api-production.up.railway.app/stats"
# Expected: {"gyms":N,"barrios":N,"localidades":N,"categories":N}
```

- [ ] **Step 6: Push to GitHub — CI should go green**

```bash
cd ~/Desktop/gymbook-api
git remote add origin https://github.com/YOUR_USERNAME/gymbook-api.git
git push -u origin main
```

Check GitHub Actions tab → CI workflow → all steps green.

- [ ] **Step 7: Commit railway.toml + Dockerfile (if not already committed)**

```bash
git add .
git commit -m "feat: Railway deploy config + GitHub Actions CI"
```

---

## Task 10: Wire Railway URL into Next.js frontend

**Files:**
- Modify: `~/Desktop/gymbook-frontend/.env.local` (create if not exists, already in .gitignore)
- Modify: `~/Desktop/gymbook-frontend/.env.production` (create — committed to repo, no secrets)

The frontend already reads `NEXT_PUBLIC_API_URL` from `city.ts`. We just need to point it at the Railway URL.

- [ ] **Step 1: Create `~/Desktop/gymbook-frontend/.env.production`**

```
NEXT_PUBLIC_API_URL=https://gymbook-api-production.up.railway.app
```

Replace `gymbook-api-production.up.railway.app` with your actual Railway URL.

- [ ] **Step 2: Create `~/Desktop/gymbook-frontend/.env.local` (for local dev)**

```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

This file is already `.gitignore`'d by Next.js convention.

- [ ] **Step 3: Add Railway URL to Cloudflare Pages environment variables**

In Cloudflare dashboard → Pages → gymbook-frontend → Settings → Environment variables:
- Variable: `NEXT_PUBLIC_API_URL`
- Value: `https://gymbook-api-production.up.railway.app`

- [ ] **Step 4: Verify build still works**

```bash
cd ~/Desktop/gymbook-frontend
npm run build
```

Expected: build succeeds (frontend doesn't call the API at build time yet — that's Phase 2B).

- [ ] **Step 5: Commit .env.production to frontend repo**

```bash
cd ~/Desktop/gymbook-frontend
git add .env.production
git commit -m "feat: point NEXT_PUBLIC_API_URL at Railway backend"
git push
```

---

## Self-review

**Spec coverage:**
- ✅ FastAPI separate service — Task 1
- ✅ Supabase PostgreSQL schema — Task 2
- ✅ Gym list endpoint (filter by category + localidad) — Task 4
- ✅ Gym detail endpoint — Task 4
- ✅ Full-text search (PostgreSQL `to_tsvector`) — Task 5
- ✅ Stats endpoint (real counts) — Task 6
- ✅ Google Places API client with retry — Task 7
- ✅ Seed script for all 19 localidades × 3 categories — Task 8
- ✅ Railway deployment via Dockerfile — Task 9
- ✅ GitHub Actions CI (lint + mypy + tests) — Task 9
- ✅ NEXT_PUBLIC_API_URL wired in frontend — Task 10
- ✅ CORS locked to gymbogota.co — Task 1 (Settings.allowed_origins)
- ✅ Deduplication by `place_id` — Task 8 (ON CONFLICT DO NOTHING)
- ✅ Slug uniqueness — Task 8 (_make_slug with existing set)
- ✅ Enterprise quality: types (mypy strict), lint (ruff), tests, structured config — throughout

**Pending (Phase 2B — separate plan):**
- Next.js: consume `/gyms` API on category pages
- Next.js: generate localidad sub-pages (`/gimnasios/chapinero/`)
- Next.js: individual gym detail pages (`/gimnasios/chapinero/crossfit-chapinero/`)
- Next.js: wire HeroSearch to `/search` endpoint
- Next.js: replace StatsBar mock data with `/stats` API
- Other Bogotá data sources (CSV import from local business registry)

**No placeholders found.**

**Type consistency:** `GymListItem` used in both `/gyms` (Task 4) and `/search` (Task 5). `PaginatedGyms` used in both routers. Field names (`slug`, `localidad`, `category`) consistent throughout.
