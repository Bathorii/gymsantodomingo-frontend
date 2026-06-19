# Automated Publishing Pipeline – Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a fully automated, human-paced publishing pipeline that pre-generates all 1625 gym profile pages and publishes 5 per day at ~11:00 Budapest time via GitHub Actions, with the sitemap updating automatically on each publish.

**Architecture:** A `publish_queue.json` file (committed to git) acts as the single source of truth — it stores every gym's `scheduled_at` and `published_at` timestamps. At build time, Next.js reads this file to know which gym pages to generate. A daily GitHub Action runs a script that marks due gyms as published, commits the updated queue, and the existing deploy workflow picks it up automatically.

**Tech Stack:** Node.js ESM scripts (`.mjs`), Next.js 15 static export, GitHub Actions cron, Railway FastAPI (gymbook-api), Cloudflare Pages.

---

## Scope Note

This plan has **two repos** involved:
- `/Users/bathoriistvan/Desktop/gymbook-api` — Task 1 only (fix broken endpoint)
- `/Users/bathoriistvan/Desktop/gymbook-frontend` — Tasks 2–7

The AI internal linker (updating localidad/category pages after each publish) is a **separate follow-up plan** — not included here.

---

## File Map

| File | Action | Repo |
|---|---|---|
| `app/routers/gyms.py` | Modify — fix `/gyms/{slug}` 500 | gymbook-api |
| `publish_config.json` | Create — portal-level publish settings | gymbook-frontend |
| `publish_queue.json` | Generated — all 1625 gyms with schedule | gymbook-frontend |
| `scripts/generate-queue.mjs` | Create — fetches all gyms, builds queue | gymbook-frontend |
| `scripts/daily-publish.mjs` | Create — marks due gyms as published | gymbook-frontend |
| `src/app/gimnasios/[slug]/page.tsx` | Modify — connect to Railway API, add schema | gymbook-frontend |
| `src/app/sitemap.ts` | Modify — include published gym pages | gymbook-frontend |
| `.github/workflows/daily-publish.yml` | Create — daily cron Action | gymbook-frontend |
| `.github/workflows/deploy.yml` | Modify — add NEXT_PUBLIC_API_URL env var | gymbook-frontend |

---

## Task 1: Fix `/gyms/{slug}` 500 error in gymbook-api

**Repo:** `/Users/bathoriistvan/Desktop/gymbook-api`

**Files:**
- Modify: `app/routers/gyms.py:89-97`

The endpoint `GET /gyms/{slug}` returns HTTP 500 on Railway production. The most likely cause: `SELECT *` includes columns from migration 002 (`faqs`, `citation_block`, etc.) that may not be applied on Railway yet, or the JSONB `photos`/`opening_hours` fields fail Pydantic deserialization for some rows.

Fix: switch to explicit column list instead of `SELECT *`, and add safe JSONB fallbacks.

- [ ] **Step 1: Verify the issue locally**

```bash
cd /Users/bathoriistvan/Desktop/gymbook-api
curl -s "https://gymbook-api-production-c43e.up.railway.app/gyms/911-callboxcrossfit--dx4m4"
# Expected: {"detail": "Internal Server Error"} (500)
```

- [ ] **Step 2: Update `_cast_detail_row` to handle JSONB safely**

In `app/routers/gyms.py`, replace `_cast_detail_row`:

```python
def _cast_detail_row(d: dict[str, Any]) -> dict[str, Any]:
    for key in ("rating", "lat", "lng"):
        if isinstance(d.get(key), Decimal):
            d[key] = float(d[key])
    # Ensure JSONB list fields are Python lists, not None
    if not isinstance(d.get("photos"), list):
        d["photos"] = []
    if not isinstance(d.get("opening_hours"), dict):
        d["opening_hours"] = {}
    return d
```

- [ ] **Step 3: Switch `get_gym` to explicit columns**

Replace the `get_gym` function body:

```python
_DETAIL_COLS = (
    "id, name, slug, category, localidad, address, phone, website, "
    "description, rating, review_count, lat, lng, photos, opening_hours, "
    "featured, created_at, updated_at"
)

@router.get("/{slug}", response_model=GymDetail)
async def get_gym(slug: str, conn: ConnDep) -> GymDetail:
    row = await conn.fetchrow(
        f"SELECT {_DETAIL_COLS} FROM gyms WHERE slug = $1 AND status = 'active'",
        slug,
    )
    if row is None:
        raise HTTPException(status_code=404, detail="Gym not found")
    return GymDetail(**_cast_detail_row(dict(row)))
```

- [ ] **Step 4: Run existing tests**

```bash
cd /Users/bathoriistvan/Desktop/gymbook-api
.venv/bin/pytest tests/test_gyms.py -v
```

Expected: all tests pass.

- [ ] **Step 5: Commit and push (Railway auto-deploys)**

```bash
cd /Users/bathoriistvan/Desktop/gymbook-api
git add app/routers/gyms.py
git commit -m "fix(gyms): explicit column select + JSONB fallbacks in get_gym"
git push
```

- [ ] **Step 6: Verify fix on Railway (wait ~2 min for deploy)**

```bash
sleep 120
curl -s "https://gymbook-api-production-c43e.up.railway.app/gyms/911-callboxcrossfit--dx4m4" | python3 -m json.tool | head -10
```

Expected: JSON with `id`, `name`, `slug`, `description`, `photos`, `opening_hours` fields.

---

## Task 2: Create `publish_config.json`

**Repo:** `/Users/bathoriistvan/Desktop/gymbook-frontend`

**Files:**
- Create: `publish_config.json`

- [ ] **Step 1: Create the config file**

```bash
cat > /Users/bathoriistvan/Desktop/gymbook-frontend/publish_config.json << 'EOF'
{
  "portal": "bogota",
  "api_url": "https://gymbook-api-production-c43e.up.railway.app",
  "daily_count": 5,
  "working_hours_start": 9,
  "working_hours_end": 17,
  "timezone_offset_hours": 2,
  "start_date": "2026-06-01"
}
EOF
```

- [ ] **Step 2: Add publish_queue.json to .gitignore check**

Make sure `publish_queue.json` is NOT in `.gitignore` (it must be committed — it's the source of truth):

```bash
cd /Users/bathoriistvan/Desktop/gymbook-frontend
grep "publish_queue" .gitignore || echo "OK: not ignored"
```

Expected output: `OK: not ignored`

- [ ] **Step 3: Commit**

```bash
cd /Users/bathoriistvan/Desktop/gymbook-frontend
git add publish_config.json
git commit -m "feat: add publish_config.json for automated publishing pipeline"
```

---

## Task 3: Create `scripts/generate-queue.mjs`

**Repo:** `/Users/bathoriistvan/Desktop/gymbook-frontend`

**Files:**
- Create: `scripts/generate-queue.mjs`

This script fetches all gyms from the Railway API (paginating through all pages since `per_page` max is 100), sorts by `review_count DESC`, assigns a `scheduled_at` timestamp to each (5 per day, random minute within working hours Budapest time), and writes `publish_queue.json`.

If `publish_queue.json` already exists, already-published gyms are preserved (their `published_at` is not reset). New gyms from the API not yet in the queue are appended at the end.

- [ ] **Step 1: Create the scripts directory**

```bash
mkdir -p /Users/bathoriistvan/Desktop/gymbook-frontend/scripts
```

- [ ] **Step 2: Write the script**

Create `/Users/bathoriistvan/Desktop/gymbook-frontend/scripts/generate-queue.mjs`:

```javascript
#!/usr/bin/env node
// scripts/generate-queue.mjs
// Run: node scripts/generate-queue.mjs
// Generates publish_queue.json from all gyms in the Railway API.

import { readFileSync, writeFileSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const CONFIG_PATH = join(ROOT, 'publish_config.json')
const QUEUE_PATH = join(ROOT, 'publish_queue.json')

const config = JSON.parse(readFileSync(CONFIG_PATH, 'utf-8'))

// ── Fetch all gyms from API (paginated) ──────────────────────────────────────
async function fetchAllGyms() {
  const perPage = 100
  let page = 1
  const allGyms = []

  while (true) {
    const url = `${config.api_url}/gyms/?page=${page}&per_page=${perPage}`
    console.log(`Fetching page ${page}… (${url})`)
    const res = await fetch(url)
    if (!res.ok) throw new Error(`API error ${res.status} on page ${page}`)
    const data = await res.json()
    allGyms.push(...data.items)
    if (page >= data.pages) break
    page++
  }

  console.log(`Total gyms fetched: ${allGyms.length}`)
  return allGyms
}

// ── Random timestamp within working hours for a given date ───────────────────
// Returns ISO 8601 string with Budapest timezone offset (+02:00 in summer)
function randomWorkingTime(dateStr) {
  const { working_hours_start, working_hours_end, timezone_offset_hours } = config
  const rangeMinutes = (working_hours_end - working_hours_start) * 60
  const offsetMinutes = Math.floor(Math.random() * rangeMinutes)
  const totalMinutesFromMidnight = working_hours_start * 60 + offsetMinutes

  const hours = Math.floor(totalMinutesFromMidnight / 60)
  const minutes = totalMinutesFromMidnight % 60
  const pad = n => String(n).padStart(2, '0')
  const sign = timezone_offset_hours >= 0 ? '+' : '-'
  const absOffset = Math.abs(timezone_offset_hours)
  return `${dateStr}T${pad(hours)}:${pad(minutes)}:00${sign}${pad(absOffset)}:00`
}

// ── Add N calendar days to a YYYY-MM-DD string ───────────────────────────────
function addDays(dateStr, n) {
  const d = new Date(dateStr + 'T12:00:00Z')
  d.setUTCDate(d.getUTCDate() + n)
  return d.toISOString().slice(0, 10)
}

// ── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  const gyms = await fetchAllGyms()

  // Sort by review_count DESC (most reviewed first = best quality, publish first)
  gyms.sort((a, b) => (b.review_count ?? 0) - (a.review_count ?? 0))

  // Load existing queue to preserve published_at values
  let existing = {}
  if (existsSync(QUEUE_PATH)) {
    const prev = JSON.parse(readFileSync(QUEUE_PATH, 'utf-8'))
    for (const entry of prev) {
      existing[entry.slug] = entry
    }
    console.log(`Loaded ${Object.keys(existing).length} existing queue entries`)
  }

  const { daily_count, start_date } = config
  const queue = []
  let dayOffset = 0

  for (let i = 0; i < gyms.length; i++) {
    const gym = gyms[i]

    if (existing[gym.slug]) {
      // Preserve existing entry (especially published_at)
      queue.push(existing[gym.slug])
      continue
    }

    // New gym — assign a scheduled_at slot
    const slotInDay = i % daily_count  // 0..4
    const dayIndex = Math.floor(i / daily_count)
    const dateStr = addDays(start_date, dayIndex)
    const scheduled_at = randomWorkingTime(dateStr)

    queue.push({
      slug: gym.slug,
      name: gym.name,
      review_count: gym.review_count ?? 0,
      localidad: gym.localidad,
      category: gym.category,
      scheduled_at,
      published_at: null,
    })
  }

  writeFileSync(QUEUE_PATH, JSON.stringify(queue, null, 2), 'utf-8')
  console.log(`✅ publish_queue.json written with ${queue.length} entries`)
  console.log(`   First publish date: ${config.start_date}`)
  console.log(`   Last publish date:  ${addDays(start_date, Math.ceil(gyms.length / daily_count) - 1)}`)
}

main().catch(err => { console.error(err); process.exit(1) })
```

- [ ] **Step 3: Run the script**

```bash
cd /Users/bathoriistvan/Desktop/gymbook-frontend
node scripts/generate-queue.mjs
```

Expected output:
```
Fetching page 1… (https://gymbook-api-production-c43e.up.railway.app/gyms/?page=1&per_page=100)
Fetching page 2…
…
Fetching page 17…
Total gyms fetched: 1625
✅ publish_queue.json written with 1625 entries
   First publish date: 2026-06-01
   Last publish date:  2026-10-29
```

- [ ] **Step 4: Spot-check the queue**

```bash
node -e "
const q = JSON.parse(require('fs').readFileSync('publish_queue.json'));
console.log('Total:', q.length);
console.log('Top 3:');
q.slice(0, 3).forEach(g => console.log(' ', g.scheduled_at, g.review_count, g.slug));
console.log('Null published_at:', q.filter(g => g.published_at === null).length);
"
```

Expected: 1625 total, all `published_at` null, top entries have highest review_count.

- [ ] **Step 5: Commit**

```bash
cd /Users/bathoriistvan/Desktop/gymbook-frontend
git add scripts/generate-queue.mjs publish_queue.json
git commit -m "feat: add generate-queue script and initial publish_queue.json (1625 gyms)"
```

---

## Task 4: Create `scripts/daily-publish.mjs`

**Repo:** `/Users/bathoriistvan/Desktop/gymbook-frontend`

**Files:**
- Create: `scripts/daily-publish.mjs`

This script is run by the GitHub Action daily. It reads `publish_queue.json`, finds entries where `scheduled_at <= now()` and `published_at === null`, marks them as published (up to `daily_count`), and writes the file back. If nothing is due, it exits with code 0 and no file changes (no commit will be made).

- [ ] **Step 1: Write the script**

Create `/Users/bathoriistvan/Desktop/gymbook-frontend/scripts/daily-publish.mjs`:

```javascript
#!/usr/bin/env node
// scripts/daily-publish.mjs
// Run daily by GitHub Actions. Marks due gyms as published.
// Exit code 0 always; outputs "PUBLISHED=N" to stdout for the Action to read.

import { readFileSync, writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const CONFIG_PATH = join(ROOT, 'publish_config.json')
const QUEUE_PATH = join(ROOT, 'publish_queue.json')

const config = JSON.parse(readFileSync(CONFIG_PATH, 'utf-8'))
const queue = JSON.parse(readFileSync(QUEUE_PATH, 'utf-8'))

const now = new Date()
const due = queue.filter(g =>
  g.published_at === null && new Date(g.scheduled_at) <= now
)

const toPublish = due.slice(0, config.daily_count)

if (toPublish.length === 0) {
  console.log('PUBLISHED=0')
  console.log('No gyms due for publishing today.')
  process.exit(0)
}

const publishedAt = now.toISOString()
for (const entry of toPublish) {
  entry.published_at = publishedAt
}

writeFileSync(QUEUE_PATH, JSON.stringify(queue, null, 2), 'utf-8')

console.log(`PUBLISHED=${toPublish.length}`)
console.log('Published gyms:')
toPublish.forEach(g => console.log(`  - ${g.slug} (${g.review_count} reviews)`))

const remaining = queue.filter(g => g.published_at === null).length
console.log(`Remaining in queue: ${remaining}`)
```

- [ ] **Step 2: Test the script manually (simulates future date)**

```bash
cd /Users/bathoriistvan/Desktop/gymbook-frontend

# Temporarily set first gym's scheduled_at to the past to test
node -e "
const q = JSON.parse(require('fs').readFileSync('publish_queue.json'));
// Set first 5 to a past date for testing
q.slice(0, 5).forEach(g => g.scheduled_at = '2026-01-01T10:00:00+02:00');
require('fs').writeFileSync('publish_queue.json', JSON.stringify(q, null, 2));
console.log('Set 5 gyms to past scheduled_at for testing');
"

node scripts/daily-publish.mjs
```

Expected output:
```
PUBLISHED=5
Published gyms:
  - [slug] ([N] reviews)
  - ...
Remaining in queue: 1620
```

- [ ] **Step 3: Verify publish_queue.json was updated**

```bash
node -e "
const q = JSON.parse(require('fs').readFileSync('publish_queue.json'));
const published = q.filter(g => g.published_at !== null);
console.log('Published:', published.length);
console.log('First published_at:', published[0]?.published_at);
"
```

Expected: `Published: 5`, valid ISO timestamp.

- [ ] **Step 4: Reset publish_queue.json back to all null (we tested, now revert)**

```bash
node scripts/generate-queue.mjs
```

This regenerates the queue (existing entries without published_at are assigned schedules, since we reset published_at to null manually). Verify all are null again:

```bash
node -e "const q=JSON.parse(require('fs').readFileSync('publish_queue.json')); console.log('All null:', q.every(g=>g.published_at===null))"
```

Expected: `All null: true`

- [ ] **Step 5: Commit**

```bash
cd /Users/bathoriistvan/Desktop/gymbook-frontend
git add scripts/daily-publish.mjs publish_queue.json
git commit -m "feat: add daily-publish script"
```

---

## Task 5: Connect gym profile page to Railway API

**Repo:** `/Users/bathoriistvan/Desktop/gymbook-frontend`

**Files:**
- Modify: `src/app/gimnasios/[slug]/page.tsx`
- Modify: `src/lib/api.ts` (add `GymDetail` type)

At build time, `generateStaticParams` reads `publish_queue.json` to know which gym slugs to build. For each slug, it fetches full gym data from the Railway API (`/gyms/{slug}`). The page renders with real data and includes `SportsActivityLocation` JSON-LD schema.

**Prerequisite:** Task 1 (fix `/gyms/{slug}`) must be complete and deployed.

- [ ] **Step 1: Add `GymDetail` type to `src/lib/api.ts`**

Append to end of `/Users/bathoriistvan/Desktop/gymbook-frontend/src/lib/api.ts`:

```typescript
export interface GymDetail {
  id: string
  name: string
  slug: string
  category: string
  localidad: string
  address: string | null
  phone: string | null
  website: string | null
  description: string | null
  rating: number | null
  review_count: number
  lat: number | null
  lng: number | null
  photos: string[]
  opening_hours: Record<string, string>
  featured: boolean
}

export async function fetchGymDetail(slug: string): Promise<GymDetail> {
  const res = await fetch(`${API_URL}/gyms/${slug}`, {
    cache: 'force-cache',
  })
  if (!res.ok) {
    throw new Error(`Failed to fetch gym detail: ${res.status}`)
  }
  return res.json()
}
```

- [ ] **Step 2: Rewrite `src/app/gimnasios/[slug]/page.tsx`**

Replace the entire file content:

```typescript
// src/app/gimnasios/[slug]/page.tsx
import { readFileSync } from 'fs'
import path from 'path'
import type { Metadata } from 'next'
import { Breadcrumb } from '@/components/layout/Breadcrumb'
import { JsonLd } from '@/components/seo/JsonLd'
import { fetchGymDetail, type GymDetail } from '@/lib/api'
import { city } from '@/config/city'

type QueueEntry = { slug: string; published_at: string | null }

function getPublishedSlugs(): string[] {
  const queue: QueueEntry[] = JSON.parse(
    readFileSync(path.join(process.cwd(), 'publish_queue.json'), 'utf-8')
  )
  return queue.filter(g => g.published_at !== null).map(g => g.slug)
}

export function generateStaticParams() {
  return getPublishedSlugs().map(slug => ({ slug }))
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params
  const gym = await fetchGymDetail(slug)
  return {
    title: `${gym.name} | GymBogota.co`,
    description: gym.description
      ? gym.description.slice(0, 155) + '…'
      : `Información, horarios y contacto de ${gym.name} en ${gym.localidad}, Bogotá.`,
  }
}

function StarRating({ rating }: { rating: number }) {
  const full = Math.floor(rating)
  const half = rating - full >= 0.5
  return (
    <span style={{ display: 'flex', gap: 2, alignItems: 'center' }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          style={{
            color: i < full || (i === full && half) ? 'var(--rating)' : '#d1d5db',
            fontSize: 18,
          }}
        >
          {i < full ? '★' : i === full && half ? '½' : '☆'}
        </span>
      ))}
    </span>
  )
}

function buildSchema(gym: GymDetail) {
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'SportsActivityLocation',
    name: gym.name,
    url: `${city.baseUrl}/gimnasios/${gym.slug}/`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: gym.address ?? '',
      addressLocality: 'Bogotá',
      addressRegion: 'Cundinamarca',
      addressCountry: 'CO',
    },
  }
  if (gym.lat && gym.lng) {
    schema.geo = {
      '@type': 'GeoCoordinates',
      latitude: gym.lat,
      longitude: gym.lng,
    }
  }
  if (gym.phone) schema.telephone = gym.phone
  if (gym.website) schema.sameAs = gym.website
  if (gym.rating && gym.review_count > 0) {
    schema.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: gym.rating,
      reviewCount: gym.review_count,
    }
  }
  if (Object.keys(gym.opening_hours).length > 0) {
    schema.openingHoursSpecification = Object.entries(gym.opening_hours).map(
      ([day, hours]) => ({
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: `https://schema.org/${day}`,
        opens: hours.split('–')[0]?.trim() ?? '00:00',
        closes: hours.split('–')[1]?.trim() ?? '23:59',
      })
    )
  }
  return schema
}

export default async function GymDetailPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const gym = await fetchGymDetail(slug)

  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(gym.address ?? gym.name + ' Bogotá')}`
  const waUrl = gym.phone ? `https://wa.me/${gym.phone.replace(/\D/g, '')}` : null

  return (
    <>
      <JsonLd data={buildSchema(gym)} />

      <Breadcrumb
        items={[
          { label: 'Gimnasios', href: '/gimnasios/' },
          { label: gym.localidad, href: `/gimnasios/` },
          { label: gym.name },
        ]}
      />

      <div style={{ maxWidth: 1100, margin: '32px auto', padding: '0 24px 64px', display: 'grid', gridTemplateColumns: '1fr 320px', gap: 40, alignItems: 'start' }}>

        <main>
          <div style={{ width: '100%', height: 260, background: 'linear-gradient(135deg,#1a1a2e 0%,#16213e 60%,#0f3460 100%)', borderRadius: 16, marginBottom: 28, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: 64 }}>🏋️</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8, flexWrap: 'wrap' }}>
            <h1 style={{ fontSize: 32, margin: 0, color: 'var(--text)' }}>{gym.name}</h1>
            <span style={{ background: '#fff3e8', color: 'var(--orange)', fontWeight: 700, fontSize: 12, padding: '4px 10px', borderRadius: 20, border: '1px solid #ffd5b3' }}>
              {gym.category}
            </span>
          </div>

          {gym.rating !== null && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
              <StarRating rating={gym.rating} />
              <span style={{ fontWeight: 700, fontSize: 15 }}>{gym.rating}</span>
              <span style={{ color: 'var(--muted)', fontSize: 14 }}>({gym.review_count} reseñas en Google)</span>
            </div>
          )}

          {gym.address && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--muted)', fontSize: 14, marginBottom: 24 }}>
              <span>📍</span>
              <a href={mapsUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--orange)', textDecoration: 'underline' }}>
                {gym.address}
              </a>
            </div>
          )}

          {gym.description && (
            <section style={{ marginBottom: 36 }}>
              <h2 style={{ fontSize: 20, marginBottom: 12 }}>Sobre el lugar</h2>
              <p style={{ fontSize: 15, lineHeight: 1.8, color: '#374151', margin: 0 }}>{gym.description}</p>
            </section>
          )}

          {Object.keys(gym.opening_hours).length > 0 && (
            <section>
              <h2 style={{ fontSize: 20, marginBottom: 16 }}>Horario de atención</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px 0' }}>
                {Object.entries(gym.opening_hours).map(([day, hours]) => (
                  <div key={day} style={{ display: 'contents' }}>
                    <span style={{ padding: '8px 0', borderBottom: '1px solid var(--border)', fontSize: 14, fontWeight: 600 }}>{day}</span>
                    <span style={{ padding: '8px 0', borderBottom: '1px solid var(--border)', fontSize: 14, color: hours === 'Cerrado' ? 'var(--muted)' : 'var(--text)', textAlign: 'right' }}>{hours}</span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </main>

        <aside>
          <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: 16, padding: 24, marginBottom: 20 }}>
            <h3 style={{ fontSize: 16, marginBottom: 16, marginTop: 0 }}>Contacto</h3>

            {waUrl && (
              <a href={waUrl} target="_blank" rel="noopener noreferrer"
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, background: 'var(--whatsapp)', color: 'white', padding: '12px 16px', borderRadius: 10, fontWeight: 700, fontSize: 15, marginBottom: 10, textDecoration: 'none' }}>
                <span>💬</span> WhatsApp
              </a>
            )}

            {gym.phone && (
              <a href={`tel:${gym.phone}`}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, background: 'var(--surface)', color: 'var(--text)', padding: '12px 16px', borderRadius: 10, fontWeight: 600, fontSize: 15, marginBottom: 10, border: '1px solid var(--border)', textDecoration: 'none' }}>
                <span>📞</span> {gym.phone}
              </a>
            )}

            {gym.website && (
              <a href={gym.website} target="_blank" rel="noopener noreferrer"
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, background: 'var(--surface)', color: 'var(--orange)', padding: '12px 16px', borderRadius: 10, fontWeight: 600, fontSize: 14, border: '1px solid var(--border)', textDecoration: 'none' }}>
                <span>🌐</span> Sitio web
              </a>
            )}
          </div>

          <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}>
            <a href={mapsUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'block', textDecoration: 'none' }}>
              <div style={{ height: 180, background: '#e8f0fe', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                <span style={{ fontSize: 40 }}>🗺️</span>
                <span style={{ fontSize: 13, color: '#4b5563', fontWeight: 600 }}>Ver en Google Maps</span>
              </div>
              <div style={{ padding: '12px 16px', fontSize: 13, color: 'var(--muted)', borderTop: '1px solid var(--border)' }}>
                📍 {gym.localidad}, Bogotá
              </div>
            </a>
          </div>

          <p style={{ textAlign: 'center', fontSize: 12, color: 'var(--muted)', marginTop: 16 }}>
            ¿Datos incorrectos?{' '}
            <a href="/contacto/" style={{ color: 'var(--orange)' }}>Reportar</a>
          </p>
        </aside>
      </div>

      <style>{`
        @media (max-width: 768px) {
          div[style*="grid-template-columns: 1fr 320px"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </>
  )
}
```

- [ ] **Step 3: Build to verify**

First, temporarily mark 1 gym as published so `generateStaticParams` returns something:

```bash
cd /Users/bathoriistvan/Desktop/gymbook-frontend
node -e "
const q = JSON.parse(require('fs').readFileSync('publish_queue.json'));
q[0].published_at = new Date().toISOString();
require('fs').writeFileSync('publish_queue.json', JSON.stringify(q, null, 2));
console.log('Marked', q[0].slug, 'as published');
"
```

Build:

```bash
NEXT_PUBLIC_API_URL=https://gymbook-api-production-c43e.up.railway.app npm run build 2>&1 | tail -20
```

Expected: build succeeds, `/gimnasios/[slug]` shows 1 generated page.

- [ ] **Step 4: Reset queue back to all null**

```bash
node scripts/generate-queue.mjs
```

- [ ] **Step 5: Commit**

```bash
cd /Users/bathoriistvan/Desktop/gymbook-frontend
git add src/app/gimnasios/[slug]/page.tsx src/lib/api.ts publish_queue.json
git commit -m "feat(gym-page): connect to Railway API + SportsActivityLocation schema"
```

---

## Task 6: Update `sitemap.ts` to include published gym pages

**Repo:** `/Users/bathoriistvan/Desktop/gymbook-frontend`

**Files:**
- Modify: `src/app/sitemap.ts`

- [ ] **Step 1: Update sitemap.ts**

Replace the full content of `/Users/bathoriistvan/Desktop/gymbook-frontend/src/app/sitemap.ts`:

```typescript
// src/app/sitemap.ts
export const dynamic = 'force-static'

import { readFileSync } from 'fs'
import path from 'path'
import type { MetadataRoute } from 'next'
import { city } from '@/config/city'
import { localidades, categories } from '@/data'

type QueueEntry = {
  slug: string
  published_at: string | null
}

function getPublishedGyms(): QueueEntry[] {
  const queue: QueueEntry[] = JSON.parse(
    readFileSync(path.join(process.cwd(), 'publish_queue.json'), 'utf-8')
  )
  return queue.filter(g => g.published_at !== null)
}

export default function sitemap(): MetadataRoute.Sitemap {
  const base = city.baseUrl
  const now = new Date()

  const corePages: MetadataRoute.Sitemap = [
    { url: `${base}/`,                  lastModified: now, priority: 1.0,  changeFrequency: 'weekly' },
    { url: `${base}/sobre-nosotros/`,   lastModified: now, priority: 0.5,  changeFrequency: 'monthly' },
    { url: `${base}/agregar-negocio/`,  lastModified: now, priority: 0.6,  changeFrequency: 'monthly' },
    { url: `${base}/blog/`,             lastModified: now, priority: 0.5,  changeFrequency: 'weekly' },
    { url: `${base}/faq/`,              lastModified: now, priority: 0.6,  changeFrequency: 'monthly' },
    { url: `${base}/contacto/`,         lastModified: now, priority: 0.4,  changeFrequency: 'monthly' },
    { url: `${base}/terminos/`,         lastModified: now, priority: 0.3,  changeFrequency: 'yearly' },
    { url: `${base}/privacidad/`,       lastModified: now, priority: 0.3,  changeFrequency: 'yearly' },
  ]

  const categoryPages: MetadataRoute.Sitemap = categories.map(cat => ({
    url: `${base}/${cat.slug}/`,
    lastModified: now,
    priority: 0.9,
    changeFrequency: 'weekly' as const,
  }))

  const publishedGyms = getPublishedGyms()
  const gymPages: MetadataRoute.Sitemap = publishedGyms.map(g => ({
    url: `${base}/gimnasios/${g.slug}/`,
    lastModified: new Date(g.published_at!),
    priority: 0.8,
    changeFrequency: 'monthly' as const,
  }))

  return [...corePages, ...categoryPages, ...gymPages]
}
```

- [ ] **Step 2: Build and verify sitemap output**

Mark 2 gyms as published temporarily:

```bash
node -e "
const q = JSON.parse(require('fs').readFileSync('publish_queue.json'));
q[0].published_at = '2026-06-01T10:00:00Z';
q[1].published_at = '2026-06-01T14:00:00Z';
require('fs').writeFileSync('publish_queue.json', JSON.stringify(q, null, 2));
"
NEXT_PUBLIC_API_URL=https://gymbook-api-production-c43e.up.railway.app npm run build 2>&1 | grep -i sitemap
cat out/sitemap.xml | head -40
```

Expected: sitemap.xml contains entries for the 2 published gym slugs.

- [ ] **Step 3: Reset and commit**

```bash
node scripts/generate-queue.mjs
cd /Users/bathoriistvan/Desktop/gymbook-frontend
git add src/app/sitemap.ts publish_queue.json
git commit -m "feat(sitemap): dynamically include published gym pages from queue"
```

---

## Task 7: Add `NEXT_PUBLIC_API_URL` to deploy workflow

**Repo:** `/Users/bathoriistvan/Desktop/gymbook-frontend`

**Files:**
- Modify: `.github/workflows/deploy.yml`

The Railway API URL must be available during GitHub Actions build so `fetchGymDetail` can reach it. Add it as a secret in the workflow.

- [ ] **Step 1: Update deploy.yml**

Replace the full content of `/Users/bathoriistvan/Desktop/gymbook-frontend/.github/workflows/deploy.yml`:

```yaml
name: Deploy to Cloudflare Pages

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
          cache-dependency-path: package-lock.json

      - name: Install dependencies
        run: npm ci

      - name: Build
        env:
          NEXT_PUBLIC_API_URL: ${{ secrets.NEXT_PUBLIC_API_URL }}
          NEXT_PUBLIC_DOMAIN: gymbogota.co
          NEXT_PUBLIC_CITY_SLUG: bogota
          NEXT_PUBLIC_CITY_NAME: Bogotá
          NEXT_PUBLIC_COUNTRY: CO
          NEXT_PUBLIC_LANG: es-CO
        run: npm run build

      - name: Deploy to Cloudflare Pages
        uses: cloudflare/wrangler-action@v3
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
          command: pages deploy out --project-name gymbook-frontend
```

- [ ] **Step 2: Add `NEXT_PUBLIC_API_URL` secret to GitHub repository**

Go to: GitHub → gymbook-frontend repo → Settings → Secrets and variables → Actions → New repository secret

Name: `NEXT_PUBLIC_API_URL`
Value: `https://gymbook-api-production-c43e.up.railway.app`

(This step must be done manually in the GitHub UI — cannot be automated.)

- [ ] **Step 3: Commit**

```bash
cd /Users/bathoriistvan/Desktop/gymbook-frontend
git add .github/workflows/deploy.yml
git commit -m "ci: add NEXT_PUBLIC_API_URL env var to build step"
```

---

## Task 8: Create `daily-publish.yml` GitHub Action

**Repo:** `/Users/bathoriistvan/Desktop/gymbook-frontend`

**Files:**
- Create: `.github/workflows/daily-publish.yml`

This Action runs daily at 09:00 UTC (= 11:00 Budapest CEST), Monday–Friday. It runs `daily-publish.mjs`, and if any gyms were published (queue file changed), commits and pushes — which automatically triggers `deploy.yml`.

- [ ] **Step 1: Create the workflow file**

Create `/Users/bathoriistvan/Desktop/gymbook-frontend/.github/workflows/daily-publish.yml`:

```yaml
name: Daily gym publish

on:
  schedule:
    - cron: '0 9 * * 1-5'   # 11:00 Budapest (CEST = UTC+2), weekdays
  workflow_dispatch:          # allow manual trigger for testing

jobs:
  publish:
    runs-on: ubuntu-latest
    permissions:
      contents: write

    steps:
      - uses: actions/checkout@v4
        with:
          token: ${{ secrets.GITHUB_TOKEN }}

      - uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Run daily publisher
        id: publisher
        run: |
          node scripts/daily-publish.mjs | tee /tmp/publish_output.txt
          PUBLISHED=$(grep "^PUBLISHED=" /tmp/publish_output.txt | cut -d= -f2)
          echo "published_count=$PUBLISHED" >> $GITHUB_OUTPUT

      - name: Commit and push if gyms were published
        if: steps.publisher.outputs.published_count != '0'
        run: |
          git config user.email "bot@gymbogota.co"
          git config user.name "GymBogota Publisher"
          git add publish_queue.json
          COUNT=${{ steps.publisher.outputs.published_count }}
          DATE=$(date +%Y-%m-%d)
          git commit -m "publish: $DATE — $COUNT new gym profiles live"
          git push
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}

      - name: Summary
        run: |
          COUNT=${{ steps.publisher.outputs.published_count }}
          if [ "$COUNT" = "0" ]; then
            echo "✅ No gyms due today — nothing to publish."
          else
            echo "✅ Published $COUNT gyms — deploy triggered automatically."
          fi
```

- [ ] **Step 2: Commit**

```bash
cd /Users/bathoriistvan/Desktop/gymbook-frontend
git add .github/workflows/daily-publish.yml
git commit -m "feat(ci): add daily gym publish GitHub Action (weekdays 11:00 Budapest)"
```

- [ ] **Step 3: Push all commits to main**

```bash
cd /Users/bathoriistvan/Desktop/gymbook-frontend
git push origin main
```

Expected: deploy.yml triggers, Cloudflare Pages builds and deploys. Check GitHub Actions tab.

- [ ] **Step 4: Test the daily-publish Action manually**

On GitHub: Actions tab → "Daily gym publish" → "Run workflow" → Run

Expected:
- If no gyms are due: Action completes, no commit, no deploy triggered
- If gyms are due: Action commits `publish_queue.json`, deploy workflow triggers automatically

---

## Self-Review

**Spec coverage check:**
- ✅ All 1625 gyms pre-generated in queue (generate-queue.mjs)
- ✅ 5/day publishing (publish_config.json + daily-publish.mjs)
- ✅ Random times within 9–17h Budapest (randomWorkingTime in generate-queue.mjs)
- ✅ Human-paced appearance (5/day at working hours)
- ✅ Sitemap auto-updates on publish (sitemap.ts reads queue)
- ✅ SportsActivityLocation schema on every gym page (buildSchema in page.tsx)
- ✅ Only published gyms get built (generateStaticParams filters queue)
- ✅ Portal-configurable (publish_config.json)
- ✅ Auto-deploy cascade (push to main → deploy.yml)
- ✅ No manual steps needed after initial setup

**Reuse for other portals (CDMX, Lima, etc.):**
- `publish_config.json` changes only `api_url` and `portal` fields
- `generate-queue.mjs` and `daily-publish.mjs` are portal-agnostic
- Each portal's frontend repo gets the same 3 scripts + 1 workflow
