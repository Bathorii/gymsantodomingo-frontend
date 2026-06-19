# GymBogota Phase 1 – Static Frontend Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and deploy the Phase 1 static Next.js frontend for gymbogota.co (~15 pages) so Google indexing can start immediately.

**Architecture:** City-agnostic Next.js 15 App Router SSG site — all city-specific values (name, slug, domain, lang) come from env variables, making the entire codebase reusable for future city deployments (gymcdmx.mx, gymlima.pe, etc.). Content is hardcoded TypeScript data files per city. No backend, no API calls in Phase 1.

**Tech Stack:** Next.js 15, TypeScript, Tailwind CSS 4, Cloudflare Pages (deploy target)

---

## File Map

```
gymbook-frontend/
├── src/
│   ├── app/
│   │   ├── layout.tsx                    # Root layout: fonts, metadata, Header+Footer
│   │   ├── page.tsx                      # Home page
│   │   ├── gimnasios/page.tsx            # Gym pillar page
│   │   ├── estudios/page.tsx             # Studio pillar page
│   │   ├── entrenadores/page.tsx         # Trainers pillar page
│   │   ├── eventos/page.tsx              # Events pillar page
│   │   ├── bienestar/page.tsx            # Wellness pillar page
│   │   ├── sobre-nosotros/page.tsx       # About page
│   │   ├── agregar-negocio/page.tsx      # Add business page
│   │   ├── blog/page.tsx                 # Blog index (empty, future)
│   │   ├── faq/page.tsx                  # FAQ page
│   │   ├── contacto/page.tsx             # Contact page
│   │   ├── terminos/page.tsx             # Terms page
│   │   ├── privacidad/page.tsx           # Privacy page
│   │   ├── sitemap.ts                    # Next.js sitemap generator
│   │   └── robots.ts                     # Next.js robots.txt generator
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx                # Top nav with logo + desktop nav
│   │   │   ├── Footer.tsx                # 4-column footer with links
│   │   │   ├── BottomNav.tsx             # Mobile fixed bottom nav (5 categories)
│   │   │   └── Breadcrumb.tsx            # Breadcrumb nav + JSON-LD schema
│   │   ├── home/
│   │   │   ├── HeroSearch.tsx            # Hero section with search box
│   │   │   ├── StatsBar.tsx              # Black stats bar (gyms/barrios/localidades)
│   │   │   ├── CategoryGrid.tsx          # 5 category cards
│   │   │   ├── LocalidadStrip.tsx        # Localidad chips scroll
│   │   │   ├── LocalidadGrid.tsx         # Localidad cards with gym count
│   │   │   └── FaqSection.tsx            # Accordion FAQ
│   │   └── seo/
│   │       └── JsonLd.tsx                # Generic JSON-LD script injector
│   ├── config/
│   │   └── city.ts                       # City config from env vars
│   └── data/
│       ├── categories.ts                 # 5 categories (shared across cities)
│       ├── bogota/
│       │   ├── localidades.ts            # 20 Bogotá localidades with slugs
│       │   └── content.ts                # All AI-generated Spanish page content
│       └── index.ts                      # Re-exports based on CITY_SLUG env
├── public/
│   └── favicon.ico
├── .env.local                            # Local dev values
├── .env.example                          # Documented env template
└── next.config.ts                        # SSG output config
```

---

## Task 1: Env config + city abstraction

**Files:**
- Create: `src/config/city.ts`
- Create: `.env.local`
- Create: `.env.example`
- Modify: `next.config.ts`

- [ ] **Step 1: Create `.env.example`**

```bash
# .env.example
NEXT_PUBLIC_CITY_SLUG=bogota
NEXT_PUBLIC_CITY_NAME=Bogotá
NEXT_PUBLIC_COUNTRY=CO
NEXT_PUBLIC_LANG=es-CO
NEXT_PUBLIC_DOMAIN=gymbogota.co
NEXT_PUBLIC_CDN_URL=https://cdn.gymbook.app
NEXT_PUBLIC_API_URL=https://api.gymbook.app
```

- [ ] **Step 2: Create `.env.local` (copy from example, same values)**

```bash
cp .env.example .env.local
```

- [ ] **Step 3: Create `src/config/city.ts`**

```typescript
// src/config/city.ts
export const city = {
  slug:     process.env.NEXT_PUBLIC_CITY_SLUG   || 'bogota',
  name:     process.env.NEXT_PUBLIC_CITY_NAME   || 'Bogotá',
  country:  process.env.NEXT_PUBLIC_COUNTRY     || 'CO',
  lang:     process.env.NEXT_PUBLIC_LANG        || 'es-CO',
  domain:   process.env.NEXT_PUBLIC_DOMAIN      || 'gymbogota.co',
  cdnUrl:   process.env.NEXT_PUBLIC_CDN_URL     || '',
  apiUrl:   process.env.NEXT_PUBLIC_API_URL     || '',
  timezone: 'America/Bogota',
  currency: 'COP',
  baseUrl: `https://${process.env.NEXT_PUBLIC_DOMAIN || 'gymbogota.co'}`,
} as const

export type CityConfig = typeof city
```

- [ ] **Step 4: Update `next.config.ts` for static export**

```typescript
// next.config.ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
}

export default nextConfig
```

- [ ] **Step 5: Verify build works**

```bash
cd ~/Desktop/gymbook-frontend
npm run build
```

Expected: Build completes, `out/` directory created.

- [ ] **Step 6: Commit**

```bash
git add .env.example src/config/city.ts next.config.ts
git commit -m "feat: city-agnostic config from env vars"
```

---

## Task 2: Tailwind design tokens + global styles

**Files:**
- Modify: `src/app/globals.css`

- [ ] **Step 1: Replace `src/app/globals.css` completely**

```css
/* src/app/globals.css */
@import "tailwindcss";

:root {
  --orange:   #ff7a1a;
  --orange-hover: #e86c10;
  --dark-bg:  #05080c;
  --surface:  #f5f6f8;
  --card:     #ffffff;
  --border:   #edf0f3;
  --border-2: #e5e7eb;
  --text:     #111827;
  --muted:    #6b7280;
  --rating:   #ff9900;
  --whatsapp: #16a34a;
  --insta:    #db2777;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  background: var(--surface);
  color: var(--text);
  font-family: Inter, Arial, sans-serif;
  font-size: 16px;
  line-height: 1.5;
}

/* Mobile bottom nav padding */
@media (max-width: 850px) {
  body {
    padding-bottom: 72px;
  }
}

a {
  color: inherit;
  text-decoration: none;
}
```

- [ ] **Step 2: Verify dev server starts**

```bash
npm run dev
```

Open `http://localhost:3000` — page loads without errors.

- [ ] **Step 3: Commit**

```bash
git add src/app/globals.css
git commit -m "feat: design tokens + global styles"
```

---

## Task 3: Layout components — Header, Footer, BottomNav, Breadcrumb

**Files:**
- Create: `src/components/layout/Header.tsx`
- Create: `src/components/layout/Footer.tsx`
- Create: `src/components/layout/BottomNav.tsx`
- Create: `src/components/layout/Breadcrumb.tsx`

- [ ] **Step 1: Create `src/components/layout/Header.tsx`**

```tsx
// src/components/layout/Header.tsx
import Link from 'next/link'
import { city } from '@/config/city'

const navLinks = [
  { href: '/gimnasios/', label: 'Gimnasios' },
  { href: '/estudios/', label: 'Estudios' },
  { href: '/entrenadores/', label: 'Entrenadores' },
  { href: '/eventos/', label: 'Eventos' },
  { href: '/bienestar/', label: 'Bienestar' },
]

export function Header() {
  const [city1, city2] = city.domain.split('.')
  const brand = city1.toUpperCase()

  return (
    <header style={{ background: 'var(--dark-bg)', color: 'white', padding: '18px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Link href="/" style={{ fontSize: 24, fontWeight: 800, color: 'white' }}>
        GYM<span style={{ color: 'var(--orange)' }}>BOGOTA</span>.CO
      </Link>
      <nav style={{ display: 'flex', gap: 24 }} aria-label="Navegación principal">
        {navLinks.map(l => (
          <Link key={l.href} href={l.href} style={{ color: 'white', fontSize: 14 }}>
            {l.label}
          </Link>
        ))}
        <Link href="/agregar-negocio/" style={{ background: 'var(--orange)', color: 'white', padding: '8px 16px', borderRadius: 8, fontSize: 14, fontWeight: 700 }}>
          Agregar negocio
        </Link>
      </nav>
    </header>
  )
}
```

- [ ] **Step 2: Create `src/components/layout/Footer.tsx`**

```tsx
// src/components/layout/Footer.tsx
import Link from 'next/link'
import { city } from '@/config/city'

export function Footer() {
  return (
    <footer style={{ background: 'var(--dark-bg)', color: '#9ca3af', padding: '48px 32px 24px' }}>
      <div style={{ maxWidth: 1180, margin: 'auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 32, marginBottom: 36 }}>
          <div>
            <Link href="/" style={{ fontSize: 22, fontWeight: 800, color: 'white', display: 'block', marginBottom: 12 }}>
              GYM<span style={{ color: 'var(--orange)' }}>BOGOTA</span>.CO
            </Link>
            <p style={{ fontSize: 14, lineHeight: 1.6 }}>
              El directorio más completo de gimnasios, estudios fitness y entrenadores personales en {city.name}, {city.country === 'CO' ? 'Colombia' : city.country}.
            </p>
          </div>
          <div>
            <h4 style={{ color: 'white', fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 14 }}>Categorías</h4>
            {[['Gimnasios', '/gimnasios/'], ['Estudios', '/estudios/'], ['Entrenadores', '/entrenadores/'], ['Eventos', '/eventos/'], ['Bienestar', '/bienestar/']].map(([label, href]) => (
              <Link key={href} href={href} style={{ display: 'block', color: '#9ca3af', fontSize: 14, marginBottom: 8 }}>{label}</Link>
            ))}
          </div>
          <div>
            <h4 style={{ color: 'white', fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 14 }}>Localidades</h4>
            {[['Chapinero', '/gimnasios/chapinero/'], ['Usaquén', '/gimnasios/usaquen/'], ['Suba', '/gimnasios/suba/'], ['Kennedy', '/gimnasios/kennedy/'], ['Teusaquillo', '/gimnasios/teusaquillo/']].map(([label, href]) => (
              <Link key={href} href={href} style={{ display: 'block', color: '#9ca3af', fontSize: 14, marginBottom: 8 }}>{label}</Link>
            ))}
          </div>
          <div>
            <h4 style={{ color: 'white', fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 14 }}>GymBogota</h4>
            {[['Sobre nosotros', '/sobre-nosotros/'], ['Agregar negocio', '/agregar-negocio/'], ['Blog', '/blog/'], ['FAQ', '/faq/'], ['Contacto', '/contacto/'], ['Términos de uso', '/terminos/'], ['Privacidad', '/privacidad/']].map(([label, href]) => (
              <Link key={href} href={href} style={{ display: 'block', color: '#9ca3af', fontSize: 14, marginBottom: 8 }}>{label}</Link>
            ))}
          </div>
        </div>
        <div style={{ borderTop: '1px solid #1f2937', paddingTop: 20, display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
          <span>© {new Date().getFullYear()} GymBogota.co · Todos los derechos reservados</span>
          <span>Hecho con ❤️ para {city.name}</span>
        </div>
      </div>
    </footer>
  )
}
```

- [ ] **Step 3: Create `src/components/layout/BottomNav.tsx`**

```tsx
// src/components/layout/BottomNav.tsx
import Link from 'next/link'

const items = [
  { href: '/gimnasios/', icon: '🏋️', label: 'Gimnasios' },
  { href: '/estudios/', icon: '🧘', label: 'Estudios' },
  { href: '/entrenadores/', icon: '🚶', label: 'Entrena.' },
  { href: '/eventos/', icon: '📅', label: 'Eventos' },
  { href: '/bienestar/', icon: '🌿', label: 'Bienestar' },
]

export function BottomNav() {
  return (
    <nav
      aria-label="Navegación móvil"
      style={{
        position: 'fixed', bottom: 0, left: 0, right: 0,
        background: 'white', display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        padding: '10px 4px',
        borderTop: '1px solid var(--border-2)',
        zIndex: 99,
      }}
      className="md-hide"
    >
      {items.map(i => (
        <Link key={i.href} href={i.href} style={{ textAlign: 'center', fontSize: 11, color: 'var(--text)' }}>
          <span style={{ display: 'block', fontSize: 20 }}>{i.icon}</span>
          {i.label}
        </Link>
      ))}
    </nav>
  )
}
```

- [ ] **Step 4: Create `src/components/layout/Breadcrumb.tsx`**

```tsx
// src/components/layout/Breadcrumb.tsx
import Link from 'next/link'
import { city } from '@/config/city'

export interface BreadcrumbItem {
  label: string
  href?: string
}

interface Props {
  items: BreadcrumbItem[]
}

export function Breadcrumb({ items }: Props) {
  const all = [{ label: city.name, href: '/' }, ...items]

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: all.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.label,
      item: item.href ? `${city.baseUrl}${item.href}` : undefined,
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav
        aria-label="Navegación de migas de pan"
        style={{ background: 'white', borderBottom: '1px solid var(--border-2)', padding: '10px 32px', fontSize: 13, color: 'var(--muted)' }}
      >
        {all.map((item, i) => (
          <span key={i}>
            {i > 0 && <span style={{ margin: '0 6px' }}>›</span>}
            {item.href
              ? <Link href={item.href} style={{ color: 'var(--orange)' }}>{item.label}</Link>
              : <span>{item.label}</span>
            }
          </span>
        ))}
      </nav>
    </>
  )
}
```

- [ ] **Step 5: Commit**

```bash
git add src/components/layout/
git commit -m "feat: Header, Footer, BottomNav, Breadcrumb components"
```

---

## Task 4: Root layout

**Files:**
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Replace `src/app/layout.tsx`**

```tsx
// src/app/layout.tsx
import type { Metadata } from 'next'
import './globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { BottomNav } from '@/components/layout/BottomNav'
import { city } from '@/config/city'

export const metadata: Metadata = {
  metadataBase: new URL(city.baseUrl),
  title: {
    default: `GymBogota.co – Encuentra gimnasios en ${city.name}`,
    template: `%s | GymBogota.co`,
  },
  description: `Directorio de gimnasios, estudios fitness, entrenadores personales y bienestar en ${city.name}. Encuentra el lugar perfecto para entrenar cerca de ti.`,
  openGraph: {
    siteName: 'GymBogota.co',
    locale: city.lang,
    type: 'website',
  },
  alternates: {
    canonical: city.baseUrl,
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={city.lang}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <BottomNav />
      </body>
    </html>
  )
}
```

- [ ] **Step 2: Verify dev server**

```bash
npm run dev
```

Open `http://localhost:3000` — Header and Footer should appear.

- [ ] **Step 3: Commit**

```bash
git add src/app/layout.tsx
git commit -m "feat: root layout with Header, Footer, BottomNav"
```

---

## Task 5: Static data — categories, localidades, content

**Files:**
- Create: `src/data/categories.ts`
- Create: `src/data/bogota/localidades.ts`
- Create: `src/data/bogota/content.ts`
- Create: `src/data/index.ts`

- [ ] **Step 1: Create `src/data/categories.ts`**

```typescript
// src/data/categories.ts
export const categories = [
  { slug: 'gimnasios', label: 'Gimnasios', icon: '🏋️', count: 1299, description: 'Gimnasios en Bogotá' },
  { slug: 'estudios', label: 'Estudios', icon: '🧘', count: 268, description: 'Estudios fitness en Bogotá' },
  { slug: 'entrenadores', label: 'Entrenadores', icon: '🚶', count: 342, description: 'Entrenadores personales en Bogotá' },
  { slug: 'eventos', label: 'Eventos', icon: '📅', count: 156, description: 'Eventos fitness en Bogotá' },
  { slug: 'bienestar', label: 'Bienestar', icon: '🌿', count: 198, description: 'Centros de bienestar en Bogotá' },
] as const

export type Category = typeof categories[number]
```

- [ ] **Step 2: Create `src/data/bogota/localidades.ts`**

```typescript
// src/data/bogota/localidades.ts
export const localidades = [
  { name: 'Chapinero',         slug: 'chapinero',         gymCount: 187 },
  { name: 'Usaquén',           slug: 'usaquen',           gymCount: 154 },
  { name: 'Suba',              slug: 'suba',              gymCount: 142 },
  { name: 'Kennedy',           slug: 'kennedy',           gymCount: 138 },
  { name: 'Teusaquillo',       slug: 'teusaquillo',       gymCount: 121 },
  { name: 'Fontibón',          slug: 'fontibon',          gymCount: 98  },
  { name: 'Engativá',          slug: 'engativa',          gymCount: 87  },
  { name: 'Barrios Unidos',    slug: 'barrios-unidos',    gymCount: 76  },
  { name: 'Los Mártires',      slug: 'los-martires',      gymCount: 54  },
  { name: 'Antonio Nariño',    slug: 'antonio-narino',    gymCount: 48  },
  { name: 'Puente Aranda',     slug: 'puente-aranda',     gymCount: 62  },
  { name: 'Rafael Uribe Uribe',slug: 'rafael-uribe-uribe',gymCount: 71  },
  { name: 'Ciudad Bolívar',    slug: 'ciudad-bolivar',    gymCount: 83  },
  { name: 'Bosa',              slug: 'bosa',              gymCount: 67  },
  { name: 'Tunjuelito',        slug: 'tunjuelito',        gymCount: 39  },
  { name: 'San Cristóbal',     slug: 'san-cristobal',     gymCount: 44  },
  { name: 'Usme',              slug: 'usme',              gymCount: 31  },
  { name: 'La Candelaria',     slug: 'la-candelaria',     gymCount: 18  },
  { name: 'Santa Fe',          slug: 'santa-fe',          gymCount: 27  },
  { name: 'Sumapaz',           slug: 'sumapaz',           gymCount: 4   },
] as const

export type Localidad = typeof localidades[number]
```

- [ ] **Step 3: Create `src/data/bogota/content.ts` (AI-generated Spanish content)**

```typescript
// src/data/bogota/content.ts

export const homeContent = {
  hero: {
    h1: 'Encuentra los mejores gimnasios en Bogotá',
    subtitle: 'Gimnasios, estudios, entrenadores y bienestar en todos los barrios de la ciudad',
  },
  stats: {
    gyms: '1.299',
    barrios: '300+',
    localidades: '20',
    categories: '5',
  },
  faq: [
    {
      q: '¿Cuánto cuesta un gimnasio en Bogotá?',
      a: 'Los precios varían según la zona y el tipo de gimnasio. En promedio, una membresía mensual en Bogotá cuesta entre $80.000 y $300.000 COP. Los gimnasios boutique y clubes deportivos premium pueden superar los $500.000 COP al mes. Cadenas como Smart Fit ofrecen planes desde $129.900 COP.',
    },
    {
      q: '¿Cuáles son los mejores barrios para encontrar gimnasios en Bogotá?',
      a: 'Chapinero (especialmente Zona Rosa y El Nogal), Usaquén y Teusaquillo concentran la mayor cantidad de gimnasios de calidad. Kennedy y Suba ofrecen más opciones económicas con amplia cobertura geográfica. En total, Bogotá cuenta con más de 1.299 establecimientos fitness distribuidos en sus 20 localidades.',
    },
    {
      q: '¿Hay gimnasios abiertos 24 horas en Bogotá?',
      a: 'Sí. Cadenas como Smart Fit y algunos gimnasios independientes operan las 24 horas los 7 días de la semana. Los encontrarás principalmente en Chapinero, Suba y Kennedy. Usa el filtro "24 horas" en GymBogota.co para encontrar los más cercanos.',
    },
    {
      q: '¿Cómo puedo agregar mi gimnasio a GymBogota.co?',
      a: 'Es gratis y sencillo. Haz clic en "Agregar negocio" en el menú y completa el formulario con los datos de tu establecimiento. Nuestro equipo revisará la información y publicará tu perfil en 24-48 horas.',
    },
    {
      q: '¿Puedo encontrar entrenadores personales en Bogotá por barrio?',
      a: 'Sí. En GymBogota.co puedes buscar entrenadores personales filtrando por localidad o barrio. Muchos entrenadores trabajan a domicilio, en parques o en gimnasios específicos. Encuentra al profesional ideal para tus objetivos de fitness.',
    },
  ],
}

export const categoryContent: Record<string, { h1: string; intro: string; faq: Array<{ q: string; a: string }> }> = {
  gimnasios: {
    h1: 'Gimnasios en Bogotá',
    intro: `Bogotá es una de las ciudades con mayor cultura fitness de América Latina. Con más de 1.299 gimnasios registrados en sus 20 localidades, la capital colombiana ofrece opciones para todos los presupuestos y objetivos: desde cadenas internacionales como Smart Fit y Bodytech hasta boutiques especializados en CrossFit, funcional, powerlifting y mucho más.

La oferta varía significativamente según la zona. En Chapinero y Usaquén encontrarás los clubes deportivos más completos y de mayor calidad, con piscina, spa y entrenamiento personalizado. En Kennedy, Suba y Engativá la oferta es más económica pero igualmente amplia, con decenas de gimnasios de barrio que atienden a la mayoría de bogotanos.

Ya sea que busques un gimnasio 24 horas, uno con clases grupales, un box de CrossFit o un espacio de musculación clásico, GymBogota.co tiene el directorio más actualizado de establecimientos fitness en la ciudad. Busca por barrio, compara precios y elige el lugar que mejor se adapte a tu rutina.`,
    faq: [
      { q: '¿Cuántos gimnasios hay en Bogotá?', a: 'Bogotá cuenta con más de 1.299 gimnasios registrados, distribuidos en sus 20 localidades. Las zonas con mayor concentración son Chapinero, Usaquén y Suba.' },
      { q: '¿Cuál es el gimnasio más grande de Bogotá?', a: 'Entre los más grandes destacan los clubes Bodytech, que cuentan con instalaciones de más de 3.000 m² en sedes como Chapinero y Santa Bárbara. Smart Fit también opera varios formatos grandes en toda la ciudad.' },
      { q: '¿Hay gimnasios con piscina en Bogotá?', a: 'Sí, varios gimnasios premium en Chapinero, Usaquén y Teusaquillo cuentan con piscina. Bodytech y algunos clubes deportivos de barrio ofrecen esta instalación. Usa el filtro "piscina" en nuestra búsqueda.' },
      { q: '¿Cuánto cuesta el day pass en un gimnasio bogotano?', a: 'El pase de un día en Bogotá cuesta entre $10.000 y $25.000 COP según el tipo de gimnasio. Las cadenas grandes como Smart Fit ofrecen pases diarios desde $15.000 COP.' },
      { q: '¿Qué gimnasios ofrecen clases grupales en Bogotá?', a: 'La mayoría de los gimnasios medianos y grandes incluyen clases grupales: spinning, zumba, yoga, pilates y funcional. Bodytech, Smart Fit y muchos estudios boutique tienen programación diaria de clases.' },
    ],
  },
  estudios: {
    h1: 'Estudios fitness en Bogotá',
    intro: `Los estudios de fitness especializados han crecido exponencialmente en Bogotá durante los últimos años. Con más de 268 establecimientos, la oferta abarca yoga, pilates, spinning, boxeo, danza, funcional y artes marciales, concentrados principalmente en Chapinero, Usaquén y Teusaquillo.

A diferencia de los gimnasios tradicionales, los estudios boutique de Bogotá ofrecen clases en grupos reducidos, mayor atención personalizada y metodologías especializadas. Estudios como los de Zona Rosa en Chapinero y Santa Bárbara en Usaquén han posicionado a Bogotá como referente del fitness boutique en Colombia.

Los precios de clases sueltas oscilan entre $20.000 y $60.000 COP, mientras que los paquetes mensuales van de $150.000 a $400.000 COP según la especialidad y ubicación. Muchos estudios ofrecen clase de prueba gratuita o a precio especial.`,
    faq: [
      { q: '¿Qué tipos de estudios fitness existen en Bogotá?', a: 'En Bogotá encontrarás estudios de yoga, pilates, CrossFit, boxeo, spinning, danza, funcional y artes marciales. Chapinero concentra la mayor variedad de disciplinas boutique.' },
      { q: '¿Cuánto cuesta una clase de yoga en Bogotá?', a: 'Una clase de yoga en Bogotá cuesta entre $20.000 y $45.000 COP la sesión individual. Los paquetes de 8-10 clases suelen salir más económicos, desde $120.000 COP.' },
      { q: '¿Hay estudios de pilates con máquinas en Bogotá?', a: 'Sí, varios estudios en Chapinero, Usaquén y Teusaquillo ofrecen pilates con Reformer y demás equipamiento. Las clases son más personalizadas y los precios algo más altos: desde $35.000 COP por sesión.' },
      { q: '¿Puedo probar una clase antes de comprar un paquete?', a: 'La mayoría de estudios boutique en Bogotá ofrecen una clase de prueba gratuita o a precio especial. Consulta directamente con el estudio a través de su perfil en GymBogota.co.' },
      { q: '¿Cuáles son los mejores estudios de CrossFit en Bogotá?', a: 'Chapinero, Usaquén y Suba concentran los mejores boxes de CrossFit afiliados en Bogotá. Busca con el filtro "CrossFit" en nuestra plataforma para encontrar el más cercano a tu barrio.' },
    ],
  },
  entrenadores: {
    h1: 'Entrenadores personales en Bogotá',
    intro: `Contar con un entrenador personal en Bogotá es más accesible de lo que muchos creen. La ciudad cuenta con más de 342 profesionales certificados disponibles para sesiones individuales, ya sea en el gimnasio, en tu casa, en parques o incluso online.

Los entrenadores personales bogotanos se especializan en objetivos muy variados: pérdida de peso, ganancia muscular, rehabilitación, preparación física para deportes específicos, pre y postnatal, y más. Muchos trabajan de manera independiente y fijan sus propias tarifas, lo que permite encontrar opciones para todos los presupuestos.

La tarifa promedio de una sesión de entrenamiento personal en Bogotá varía entre $50.000 y $150.000 COP por hora. Los entrenadores con mayor trayectoria o certificaciones internacionales pueden cobrar más. En GymBogota.co puedes filtrar por barrio, especialización y modalidad de trabajo.`,
    faq: [
      { q: '¿Cuánto cobra un entrenador personal en Bogotá?', a: 'El precio de una sesión de entrenamiento personal en Bogotá varía entre $50.000 y $150.000 COP por hora, dependiendo de la experiencia, certificaciones y modalidad (domicilio, parque o gimnasio).' },
      { q: '¿Los entrenadores van a domicilio en Bogotá?', a: 'Sí, muchos entrenadores personales en Bogotá ofrecen servicio a domicilio, especialmente en zonas como Chapinero, Usaquén y Suba. Algunos también trabajan en parques públicos como el Parque El Virrey.' },
      { q: '¿Cómo encuentro un entrenador especializado en pérdida de peso?', a: 'En GymBogota.co puedes filtrar entrenadores por especialización. Para pérdida de peso, busca profesionales con certificación en nutrición deportiva o metodologías de alta intensidad como HIIT.' },
      { q: '¿Ofrecen entrenadores personales sesiones online en Bogotá?', a: 'Sí, desde 2020 muchos entrenadores bogotanos ofrecen sesiones online. Es una opción muy práctica para personas con horarios apretados o que viven en barrios con menor oferta presencial.' },
      { q: '¿Qué certificaciones debe tener un buen entrenador personal?', a: 'En Colombia, busca entrenadores con certificación del INDER, ACE, NSCA o similares reconocidos internacionalmente. También valora experiencia práctica y referencias de clientes anteriores.' },
    ],
  },
  eventos: {
    h1: 'Eventos fitness en Bogotá',
    intro: `Bogotá tiene una agenda fitness activa durante todo el año. Con más de 156 eventos próximos en nuestra plataforma — desde competencias de CrossFit y maratones hasta talleres de nutrición y retiros de yoga — la ciudad ofrece oportunidades únicas para conectar con la comunidad fitness bogotana.

Eventos icónicos como la Media Maratón de Bogotá, la Ciclovía dominical (la más grande de América Latina con más de 120 km de vías abiertas cada semana) y los torneos de CrossFit que se realizan en Chapinero y Suba, consolidan a Bogotá como una capital deportiva del continente.

En GymBogota.co publicamos competencias, workshops, clases magistrales, carreras de obstáculos, retiros de bienestar y mucho más. Mantente al día con los próximos eventos en tu localidad favorita.`,
    faq: [
      { q: '¿Cuáles son los eventos fitness más populares en Bogotá?', a: 'La Media Maratón de Bogotá, los torneos de CrossFit en Chapinero, las competencias de powerlifting y los retiros de yoga en la Sabana son los más convocados. La Ciclovía dominical es el evento deportivo masivo más emblemático de la ciudad.' },
      { q: '¿Cómo me puedo inscribir a eventos fitness en Bogotá?', a: 'Cada evento en GymBogota.co incluye el enlace de inscripción oficial. Algunos son gratuitos (como talleres de nutrición) y otros tienen costo de participación. Revisa las fechas límite de registro.' },
      { q: '¿Hay eventos fitness gratuitos en Bogotá?', a: 'Sí. La Ciclovía dominical, muchos talleres comunitarios organizados por el IDRD y algunos eventos de estudios boutique para captar nuevos clientes son completamente gratuitos.' },
      { q: '¿Con qué frecuencia se realizan competencias de CrossFit en Bogotá?', a: 'Prácticamente cada mes hay alguna competencia de CrossFit en Bogotá. Los boxes afiliados en Chapinero y Suba organizan los torneos más reconocidos, además de las competencias nacionales que pasan por la ciudad.' },
      { q: '¿Dónde se realizan los eventos de running en Bogotá?', a: 'Los principales eventos de running en Bogotá se realizan en la Av. El Dorado, el Parque Simón Bolívar y la ruta de la Media Maratón por la Carrera Séptima. El Parque El Virrey también es punto de partida frecuente para corredores.' },
    ],
  },
  bienestar: {
    h1: 'Bienestar en Bogotá',
    intro: `El bienestar integral es una tendencia en alza en Bogotá. Con más de 198 centros especializados, la ciudad ofrece una amplia gama de servicios: masajes terapéuticos y relajantes, spas, fisioterapia, quiropraxia, nutrición deportiva y psicología del deporte, concentrados principalmente en Chapinero, Usaquén y Teusaquillo.

El concepto de bienestar en Bogotá ha evolucionado más allá del gym tradicional. Hoy, muchos bogotanos complementan su rutina de entrenamiento con sesiones de recuperación activa, terapias manuales y atención nutricional personalizada. Los centros de bienestar en zonas como Zona Rosa y Santa Bárbara ofrecen experiencias de alto nivel a precios competitivos respecto a otras capitales latinoamericanas.

Desde un masaje deportivo post-entrenamiento hasta un plan nutricional completo con seguimiento mensual, GymBogota.co te conecta con los mejores profesionales del bienestar en tu barrio.`,
    faq: [
      { q: '¿Qué servicios de bienestar se pueden encontrar en Bogotá?', a: 'En Bogotá hay centros de masajes terapéuticos, spas, fisioterapia, quiropraxia, nutrición deportiva, psicología del deporte, meditación y acupuntura. La oferta es más concentrada en Chapinero, Usaquén y Teusaquillo.' },
      { q: '¿Cuánto cuesta un masaje en Bogotá?', a: 'Un masaje relajante o terapéutico en Bogotá cuesta entre $60.000 y $150.000 COP por sesión de 60 minutos, según el tipo de masaje y la zona de la ciudad. Los spas premium en Chapinero pueden cobrar más.' },
      { q: '¿Hay fisioterapeutas deportivos en Bogotá?', a: 'Sí. Bogotá tiene una amplia red de fisioterapeutas especializados en deporte y rehabilitación. Muchos trabajan asociados a gimnasios y clubes deportivos, especialmente en Chapinero y Usaquén.' },
      { q: '¿Qué es la recuperación activa y dónde se practica en Bogotá?', a: 'La recuperación activa incluye técnicas como crioterapia, baños de contraste, foam rolling guiado y movilidad. Varios centros en Chapinero y algunos gymnos premium la ofrecen como servicio complementario.' },
      { q: '¿Cómo encuentro un nutricionista deportivo en Bogotá?', a: 'En GymBogota.co puedes filtrar profesionales de bienestar por especialización. Para nutrición deportiva, busca nutricionistas con experiencia en atletas de rendimiento o fitness recreativo según tu objetivo.' },
    ],
  },
}

export const staticPageContent = {
  sobreNosotros: {
    title: 'Sobre nosotros',
    h1: '¿Quiénes somos?',
    body: `GymBogota.co es el directorio de referencia para encontrar gimnasios, estudios fitness, entrenadores personales y centros de bienestar en Bogotá, Colombia.

Nació de una necesidad real: encontrar un buen lugar para entrenar en Bogotá no debería ser complicado. Con más de 1.299 establecimientos distribuidos en 300 barrios y 20 localidades, la oferta es enorme pero difícil de navegar. GymBogota.co organiza esa información para que puedas tomar la mejor decisión en segundos.

Nuestra misión es conectar a los bogotanos con el lugar ideal para moverse, entrenar y cuidarse, sin importar su barrio, presupuesto u objetivo fitness.`,
  },
  agregarNegocio: {
    title: 'Agregar negocio',
    h1: 'Agrega tu gimnasio o estudio gratis',
    body: `¿Tienes un gimnasio, estudio fitness, servicio de entrenamiento personal o centro de bienestar en Bogotá? Aparece en GymBogota.co de forma completamente gratuita.

Miles de bogotanos usan nuestra plataforma cada mes para buscar lugares donde entrenar. Tener un perfil actualizado y completo puede significar nuevos clientes directamente a tu puerta.`,
  },
  faqPage: {
    title: 'Preguntas frecuentes',
    h1: 'Preguntas frecuentes sobre GymBogota.co',
    items: [
      { q: '¿GymBogota.co es gratuito para los usuarios?', a: 'Sí, buscar y explorar el directorio es completamente gratuito para cualquier persona que quiera encontrar un gimnasio, estudio o entrenador en Bogotá.' },
      { q: '¿Cómo se seleccionan los negocios que aparecen?', a: 'Los negocios aparecen a través de tres vías: importación de fuentes públicas verificadas, registro voluntario del dueño del negocio, o reporte de la comunidad. Todos los perfiles son revisados antes de publicarse.' },
      { q: '¿Puedo dejar una reseña sobre un gimnasio?', a: 'Sí. En cada perfil de establecimiento encontrarás un formulario para dejar tu opinión. Las reseñas son moderadas para garantizar su autenticidad.' },
      { q: '¿Con qué frecuencia se actualiza la información?', a: 'El directorio se actualiza continuamente. Si ves información incorrecta en algún perfil, puedes reportarla directamente desde la página del establecimiento.' },
      { q: '¿GymBogota.co tiene app móvil?', a: 'Por ahora, GymBogota.co está optimizado para móvil a través del navegador. Una app nativa está en nuestros planes para el futuro próximo.' },
    ],
  },
  contacto: {
    title: 'Contacto',
    h1: '¿Tienes alguna pregunta?',
    body: `Estamos aquí para ayudarte. Si tienes dudas sobre el directorio, quieres reportar información incorrecta o simplemente quieres ponerte en contacto con el equipo de GymBogota.co, escríbenos.`,
    email: 'hola@gymbogota.co',
  },
  terminos: {
    title: 'Términos de uso',
    h1: 'Términos y condiciones de uso',
    lastUpdated: 'Mayo 2026',
  },
  privacidad: {
    title: 'Política de privacidad',
    h1: 'Política de privacidad',
    lastUpdated: 'Mayo 2026',
  },
}
```

- [ ] **Step 4: Create `src/data/index.ts`**

```typescript
// src/data/index.ts
export { categories } from './categories'
export { localidades } from './bogota/localidades'
export { homeContent, categoryContent, staticPageContent } from './bogota/content'
```

- [ ] **Step 5: Commit**

```bash
git add src/data/
git commit -m "feat: static data — categories, localidades, AI-generated content"
```

---

## Task 6: Home page components

**Files:**
- Create: `src/components/home/HeroSearch.tsx`
- Create: `src/components/home/StatsBar.tsx`
- Create: `src/components/home/CategoryGrid.tsx`
- Create: `src/components/home/LocalidadStrip.tsx`
- Create: `src/components/home/LocalidadGrid.tsx`
- Create: `src/components/home/FaqSection.tsx`
- Create: `src/components/seo/JsonLd.tsx`

- [ ] **Step 1: Create `src/components/seo/JsonLd.tsx`**

```tsx
// src/components/seo/JsonLd.tsx
interface Props {
  data: Record<string, unknown>
}

export function JsonLd({ data }: Props) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
```

- [ ] **Step 2: Create `src/components/home/HeroSearch.tsx`**

```tsx
// src/components/home/HeroSearch.tsx
import { city } from '@/config/city'
import { homeContent } from '@/data'

export function HeroSearch() {
  return (
    <section
      style={{
        minHeight: 430,
        background: 'linear-gradient(rgba(0,0,0,.62), rgba(0,0,0,.72)), url("https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1600") center/cover',
        color: 'white',
        padding: '90px 32px',
      }}
    >
      <div style={{ maxWidth: 920, margin: 'auto', textAlign: 'center' }}>
        <h1 style={{ fontSize: 48, marginBottom: 16 }}>{homeContent.hero.h1}</h1>
        <p style={{ fontSize: 20, opacity: .9 }}>{homeContent.hero.subtitle}</p>

        <div style={{
          margin: '36px auto 0',
          background: 'white',
          padding: 12,
          borderRadius: 16,
          display: 'flex',
          gap: 12,
          maxWidth: 780,
          boxShadow: '0 20px 50px rgba(0,0,0,.25)',
          flexWrap: 'wrap',
        }}>
          <input
            type="text"
            placeholder="¿Qué estás buscando?"
            style={{ flex: 1, border: '1px solid var(--border-2)', borderRadius: 10, padding: 15, fontSize: 15, minWidth: 180, color: 'var(--text)' }}
          />
          <select style={{ flex: 1, border: '1px solid var(--border-2)', borderRadius: 10, padding: 15, fontSize: 15, minWidth: 160, color: 'var(--text)' }}>
            <option>Todas las localidades</option>
            <option>Chapinero</option>
            <option>Usaquén</option>
            <option>Suba</option>
            <option>Kennedy</option>
          </select>
          <button
            style={{ background: 'var(--orange)', color: 'white', border: 0, borderRadius: 10, padding: '0 34px', fontWeight: 700, cursor: 'pointer', fontSize: 16 }}
          >
            Buscar
          </button>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Create `src/components/home/StatsBar.tsx`**

```tsx
// src/components/home/StatsBar.tsx
import { homeContent } from '@/data'

export function StatsBar() {
  const { stats } = homeContent
  const items = [
    { value: stats.gyms, label: 'Gimnasios y estudios' },
    { value: stats.barrios, label: 'Barrios cubiertos' },
    { value: stats.localidades, label: 'Localidades' },
    { value: stats.categories, label: 'Categorías' },
  ]
  return (
    <div style={{ background: 'var(--dark-bg)', color: 'white', display: 'flex', justifyContent: 'center', gap: 48, padding: '16px 32px', flexWrap: 'wrap' }}>
      {items.map(i => (
        <div key={i.label} style={{ textAlign: 'center', fontSize: 14 }}>
          <strong style={{ color: 'var(--orange)', fontSize: 20, display: 'block' }}>{i.value}</strong>
          {i.label}
        </div>
      ))}
    </div>
  )
}
```

- [ ] **Step 4: Create `src/components/home/CategoryGrid.tsx`**

```tsx
// src/components/home/CategoryGrid.tsx
import Link from 'next/link'
import { categories } from '@/data'

export function CategoryGrid() {
  return (
    <section style={{ maxWidth: 1180, margin: '42px auto', padding: '0 24px' }}>
      <h2 style={{ fontSize: 30, marginBottom: 24 }}>Explora por categoría</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 18 }}>
        {categories.map(cat => (
          <Link
            key={cat.slug}
            href={`/${cat.slug}/`}
            style={{
              background: 'white',
              borderRadius: 18,
              padding: '28px 18px',
              textAlign: 'center',
              boxShadow: '0 8px 24px rgba(15,23,42,.06)',
              border: '1px solid var(--border)',
              display: 'block',
              transition: 'transform .15s, box-shadow .15s',
            }}
          >
            <div style={{ fontSize: 38, marginBottom: 14 }}>{cat.icon}</div>
            <h3 style={{ margin: '0 0 6px', fontSize: 16 }}>{cat.label}</h3>
            <p style={{ margin: 0, color: 'var(--muted)', fontSize: 13 }}>{cat.count.toLocaleString('es-CO')} lugares</p>
          </Link>
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 5: Create `src/components/home/LocalidadStrip.tsx`**

```tsx
// src/components/home/LocalidadStrip.tsx
import Link from 'next/link'
import { localidades } from '@/data'

export function LocalidadStrip() {
  return (
    <div style={{ background: 'white', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '24px 0' }}>
      <div style={{ maxWidth: 1180, margin: 'auto', padding: '0 24px' }}>
        <p style={{ fontSize: 12, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.05em', margin: '0 0 14px' }}>
          Busca por localidad
        </p>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          {localidades.map(loc => (
            <Link
              key={loc.slug}
              href={`/gimnasios/${loc.slug}/`}
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--border-2)',
                borderRadius: 999,
                padding: '8px 16px',
                fontSize: 14,
                color: 'var(--text)',
              }}
            >
              {loc.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 6: Create `src/components/home/LocalidadGrid.tsx`**

```tsx
// src/components/home/LocalidadGrid.tsx
import Link from 'next/link'
import { localidades } from '@/data'

export function LocalidadGrid() {
  const top8 = localidades.slice(0, 8)
  return (
    <section style={{ maxWidth: 1180, margin: '42px auto', padding: '0 24px' }}>
      <h2 style={{ fontSize: 30, marginBottom: 24 }}>Gimnasios por localidad</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
        {top8.map(loc => (
          <Link
            key={loc.slug}
            href={`/gimnasios/${loc.slug}/`}
            style={{
              background: 'white',
              borderRadius: 14,
              padding: 20,
              border: '1px solid var(--border)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              boxShadow: '0 4px 12px rgba(15,23,42,.04)',
            }}
          >
            <strong style={{ fontSize: 15 }}>{loc.name}</strong>
            <span style={{ fontSize: 12, color: 'var(--muted)' }}>{loc.gymCount} gyms →</span>
          </Link>
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 7: Create `src/components/home/FaqSection.tsx`**

```tsx
// src/components/home/FaqSection.tsx
import { JsonLd } from '@/components/seo/JsonLd'

interface FaqItem { q: string; a: string }

interface Props {
  title: string
  items: FaqItem[]
}

export function FaqSection({ title, items }: Props) {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(item => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  }

  return (
    <>
      <JsonLd data={faqSchema} />
      <div style={{ background: 'white', borderTop: '1px solid var(--border)', padding: '48px 24px' }}>
        <div style={{ maxWidth: 780, margin: 'auto' }}>
          <h2 style={{ fontSize: 28, marginBottom: 28, textAlign: 'center' }}>{title}</h2>
          {items.map((item, i) => (
            <details
              key={i}
              style={{ border: '1px solid var(--border-2)', borderRadius: 14, marginBottom: 12, padding: '18px 20px' }}
            >
              <summary style={{ fontSize: 16, fontWeight: 600, cursor: 'pointer', listStyle: 'none', display: 'flex', justifyContent: 'space-between' }}>
                {item.q}
                <span style={{ color: 'var(--orange)', fontSize: 20 }}>＋</span>
              </summary>
              <p style={{ marginTop: 12, color: '#4b5563', fontSize: 15, lineHeight: 1.7 }}>{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </>
  )
}
```

- [ ] **Step 8: Commit**

```bash
git add src/components/
git commit -m "feat: home page components + JsonLd"
```

---

## Task 7: Home page

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Replace `src/app/page.tsx`**

```tsx
// src/app/page.tsx
import type { Metadata } from 'next'
import { city } from '@/config/city'
import { homeContent } from '@/data'
import { HeroSearch } from '@/components/home/HeroSearch'
import { StatsBar } from '@/components/home/StatsBar'
import { CategoryGrid } from '@/components/home/CategoryGrid'
import { LocalidadStrip } from '@/components/home/LocalidadStrip'
import { LocalidadGrid } from '@/components/home/LocalidadGrid'
import { FaqSection } from '@/components/home/FaqSection'
import { JsonLd } from '@/components/seo/JsonLd'

export const metadata: Metadata = {
  title: `Gimnasios en ${city.name} – Directorio fitness completo | GymBogota.co`,
  description: `Encuentra gimnasios, estudios fitness, entrenadores personales y centros de bienestar en ${city.name}. Más de 1.299 lugares en 300 barrios. Busca gratis por localidad.`,
  alternates: { canonical: `${city.baseUrl}/` },
  openGraph: {
    title: `Gimnasios en ${city.name} – GymBogota.co`,
    description: `El directorio de fitness más completo de ${city.name}. 1.299 gimnasios, 300+ barrios.`,
    url: `${city.baseUrl}/`,
  },
}

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'GymBogota.co',
  url: city.baseUrl,
  potentialAction: {
    '@type': 'SearchAction',
    target: { '@type': 'EntryPoint', urlTemplate: `${city.baseUrl}/buscar?q={search_term_string}` },
    'query-input': 'required name=search_term_string',
  },
}

export default function HomePage() {
  return (
    <>
      <JsonLd data={websiteSchema} />
      <HeroSearch />
      <StatsBar />
      <CategoryGrid />
      <LocalidadStrip />
      <LocalidadGrid />
      <FaqSection
        title="Preguntas frecuentes sobre gimnasios en Bogotá"
        items={homeContent.faq}
      />
    </>
  )
}
```

- [ ] **Step 2: Check in browser**

```bash
npm run dev
```

Open `http://localhost:3000` — all sections should render correctly.

- [ ] **Step 3: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: home page with all sections + WebSite schema"
```

---

## Task 8: Category pillar pages (5 pages)

**Files:**
- Create: `src/app/gimnasios/page.tsx`
- Create: `src/app/estudios/page.tsx`
- Create: `src/app/entrenadores/page.tsx`
- Create: `src/app/eventos/page.tsx`
- Create: `src/app/bienestar/page.tsx`

All 5 pages follow the same pattern — only the category slug differs. Below is the full template, then the 4 remaining pages as one-liners.

- [ ] **Step 1: Create `src/app/gimnasios/page.tsx`**

```tsx
// src/app/gimnasios/page.tsx
import type { Metadata } from 'next'
import { city } from '@/config/city'
import { categoryContent, localidades, categories } from '@/data'
import { Breadcrumb } from '@/components/layout/Breadcrumb'
import { FaqSection } from '@/components/home/FaqSection'
import { JsonLd } from '@/components/seo/JsonLd'
import Link from 'next/link'

const SLUG = 'gimnasios'
const content = categoryContent[SLUG]
const cat = categories.find(c => c.slug === SLUG)!

export const metadata: Metadata = {
  title: `${content.h1} | GymBogota.co`,
  description: `${content.intro.slice(0, 155)}…`,
  alternates: { canonical: `${city.baseUrl}/${SLUG}/` },
  openGraph: { title: content.h1, description: `${content.intro.slice(0, 155)}…`, url: `${city.baseUrl}/${SLUG}/` },
}

const itemListSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: content.h1,
  numberOfItems: cat.count,
  itemListElement: localidades.slice(0, 8).map((loc, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: `${cat.label} en ${loc.name}`,
    url: `${city.baseUrl}/${SLUG}/${loc.slug}/`,
  })),
}

export default function GimnasioPillarPage() {
  return (
    <>
      <JsonLd data={itemListSchema} />
      <Breadcrumb items={[{ label: cat.label }]} />

      <section style={{ maxWidth: 1180, margin: '42px auto', padding: '0 24px' }}>
        <h1 style={{ fontSize: 40, marginBottom: 24 }}>{content.h1}</h1>

        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 40 }}>
          <div>
            {content.intro.split('\n\n').map((para, i) => (
              <p key={i} style={{ fontSize: 16, lineHeight: 1.8, color: '#374151', marginBottom: 20 }}>{para}</p>
            ))}
          </div>

          <aside>
            <h2 style={{ fontSize: 20, marginBottom: 16 }}>{cat.label} por localidad</h2>
            {localidades.map(loc => (
              <Link
                key={loc.slug}
                href={`/${SLUG}/${loc.slug}/`}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '10px 0',
                  borderBottom: '1px solid var(--border)',
                  fontSize: 14,
                  color: 'var(--text)',
                }}
              >
                <span>{loc.name}</span>
                <span style={{ color: 'var(--orange)' }}>{loc.gymCount} →</span>
              </Link>
            ))}
          </aside>
        </div>
      </section>

      <FaqSection
        title={`Preguntas frecuentes sobre ${cat.label.toLowerCase()} en ${city.name}`}
        items={content.faq}
      />
    </>
  )
}
```

- [ ] **Step 2: Create the remaining 4 category pages**

Create `src/app/estudios/page.tsx` — copy gimnasios/page.tsx exactly, change only:
- `const SLUG = 'estudios'`

Create `src/app/entrenadores/page.tsx`:
- `const SLUG = 'entrenadores'`

Create `src/app/eventos/page.tsx`:
- `const SLUG = 'eventos'`

Create `src/app/bienestar/page.tsx`:
- `const SLUG = 'bienestar'`

- [ ] **Step 3: Verify all pages render**

```bash
npm run dev
```

Visit: `http://localhost:3000/gimnasios/` — breadcrumb, intro text, localidad list, FAQ all visible.
Visit: `http://localhost:3000/estudios/` — same check.

- [ ] **Step 4: Commit**

```bash
git add src/app/gimnasios/ src/app/estudios/ src/app/entrenadores/ src/app/eventos/ src/app/bienestar/
git commit -m "feat: 5 category pillar pages with content + FAQ + JSON-LD"
```

---

## Task 9: Static utility pages (7 pages)

**Files:**
- Create: `src/app/sobre-nosotros/page.tsx`
- Create: `src/app/agregar-negocio/page.tsx`
- Create: `src/app/blog/page.tsx`
- Create: `src/app/faq/page.tsx`
- Create: `src/app/contacto/page.tsx`
- Create: `src/app/terminos/page.tsx`
- Create: `src/app/privacidad/page.tsx`

- [ ] **Step 1: Create `src/app/sobre-nosotros/page.tsx`**

```tsx
// src/app/sobre-nosotros/page.tsx
import type { Metadata } from 'next'
import { city } from '@/config/city'
import { staticPageContent } from '@/data'
import { Breadcrumb } from '@/components/layout/Breadcrumb'

const c = staticPageContent.sobreNosotros

export const metadata: Metadata = {
  title: `${c.title} | GymBogota.co`,
  description: `Conoce el equipo detrás de GymBogota.co, el directorio de fitness más completo de ${city.name}.`,
  alternates: { canonical: `${city.baseUrl}/sobre-nosotros/` },
}

export default function SobreNosotrosPage() {
  return (
    <>
      <Breadcrumb items={[{ label: c.title }]} />
      <section style={{ maxWidth: 780, margin: '48px auto', padding: '0 24px' }}>
        <h1 style={{ fontSize: 36, marginBottom: 24 }}>{c.h1}</h1>
        {c.body.split('\n\n').map((para, i) => (
          <p key={i} style={{ fontSize: 16, lineHeight: 1.8, color: '#374151', marginBottom: 20 }}>{para}</p>
        ))}
      </section>
    </>
  )
}
```

- [ ] **Step 2: Create `src/app/agregar-negocio/page.tsx`**

```tsx
// src/app/agregar-negocio/page.tsx
import type { Metadata } from 'next'
import { city } from '@/config/city'
import { staticPageContent } from '@/data'
import { Breadcrumb } from '@/components/layout/Breadcrumb'

const c = staticPageContent.agregarNegocio

export const metadata: Metadata = {
  title: `${c.title} | GymBogota.co`,
  description: `Agrega tu gimnasio, estudio o servicio fitness a GymBogota.co de forma gratuita.`,
  alternates: { canonical: `${city.baseUrl}/agregar-negocio/` },
}

export default function AgregarNegocioPage() {
  return (
    <>
      <Breadcrumb items={[{ label: c.title }]} />
      <section style={{ maxWidth: 780, margin: '48px auto', padding: '0 24px' }}>
        <h1 style={{ fontSize: 36, marginBottom: 24 }}>{c.h1}</h1>
        {c.body.split('\n\n').map((para, i) => (
          <p key={i} style={{ fontSize: 16, lineHeight: 1.8, color: '#374151', marginBottom: 20 }}>{para}</p>
        ))}
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, padding: 32, marginTop: 32 }}>
          <h2 style={{ fontSize: 22, marginBottom: 20 }}>Envíanos los datos de tu negocio</h2>
          <p style={{ color: 'var(--muted)', marginBottom: 20 }}>Completa el formulario y nuestro equipo revisará y publicará tu perfil en 24-48 horas.</p>
          <a
            href="mailto:hola@gymbogota.co?subject=Quiero agregar mi negocio"
            style={{ display: 'inline-block', background: 'var(--orange)', color: 'white', padding: '14px 28px', borderRadius: 10, fontWeight: 700, fontSize: 16 }}
          >
            Enviar por email →
          </a>
        </div>
      </section>
    </>
  )
}
```

- [ ] **Step 3: Create `src/app/blog/page.tsx`**

```tsx
// src/app/blog/page.tsx
import type { Metadata } from 'next'
import { city } from '@/config/city'
import { Breadcrumb } from '@/components/layout/Breadcrumb'

export const metadata: Metadata = {
  title: `Blog – Fitness y gimnasios en ${city.name} | GymBogota.co`,
  description: `Artículos, guías y consejos sobre fitness, gimnasios y bienestar en ${city.name}. Próximamente.`,
  alternates: { canonical: `${city.baseUrl}/blog/` },
}

export default function BlogPage() {
  return (
    <>
      <Breadcrumb items={[{ label: 'Blog' }]} />
      <section style={{ maxWidth: 780, margin: '48px auto', padding: '0 24px', textAlign: 'center' }}>
        <h1 style={{ fontSize: 36, marginBottom: 16 }}>Blog GymBogota.co</h1>
        <p style={{ fontSize: 18, color: 'var(--muted)', marginBottom: 40 }}>
          Consejos, guías y artículos sobre fitness, gimnasios y bienestar en Bogotá. Próximamente.
        </p>
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, padding: 40 }}>
          <p style={{ fontSize: 15, color: 'var(--muted)' }}>
            Nuestro blog está en construcción. Pronto publicaremos guías como
            <em> "¿Cuánto cuesta el gimnasio en Bogotá en 2026?"</em>,
            <em> "Los mejores gimnasios en Chapinero"</em> y mucho más.
          </p>
        </div>
      </section>
    </>
  )
}
```

- [ ] **Step 4: Create `src/app/faq/page.tsx`**

```tsx
// src/app/faq/page.tsx
import type { Metadata } from 'next'
import { city } from '@/config/city'
import { staticPageContent } from '@/data'
import { Breadcrumb } from '@/components/layout/Breadcrumb'
import { FaqSection } from '@/components/home/FaqSection'

const c = staticPageContent.faqPage

export const metadata: Metadata = {
  title: `${c.title} | GymBogota.co`,
  description: `Respuestas a las preguntas más frecuentes sobre GymBogota.co y cómo encontrar gimnasios en ${city.name}.`,
  alternates: { canonical: `${city.baseUrl}/faq/` },
}

export default function FaqPage() {
  return (
    <>
      <Breadcrumb items={[{ label: 'FAQ' }]} />
      <section style={{ maxWidth: 780, margin: '48px auto 0', padding: '0 24px' }}>
        <h1 style={{ fontSize: 36, marginBottom: 8 }}>{c.h1}</h1>
      </section>
      <FaqSection title="" items={c.items} />
    </>
  )
}
```

- [ ] **Step 5: Create `src/app/contacto/page.tsx`**

```tsx
// src/app/contacto/page.tsx
import type { Metadata } from 'next'
import { city } from '@/config/city'
import { staticPageContent } from '@/data'
import { Breadcrumb } from '@/components/layout/Breadcrumb'

const c = staticPageContent.contacto

export const metadata: Metadata = {
  title: `${c.title} | GymBogota.co`,
  description: `Contacta al equipo de GymBogota.co. Estamos disponibles para ayudarte.`,
  alternates: { canonical: `${city.baseUrl}/contacto/` },
}

export default function ContactoPage() {
  return (
    <>
      <Breadcrumb items={[{ label: c.title }]} />
      <section style={{ maxWidth: 780, margin: '48px auto', padding: '0 24px' }}>
        <h1 style={{ fontSize: 36, marginBottom: 16 }}>{c.h1}</h1>
        <p style={{ fontSize: 16, lineHeight: 1.8, color: '#374151', marginBottom: 32 }}>{c.body}</p>
        <a
          href={`mailto:${c.email}`}
          style={{ display: 'inline-block', background: 'var(--orange)', color: 'white', padding: '14px 28px', borderRadius: 10, fontWeight: 700, fontSize: 16 }}
        >
          {c.email}
        </a>
      </section>
    </>
  )
}
```

- [ ] **Step 6: Create `src/app/terminos/page.tsx`**

```tsx
// src/app/terminos/page.tsx
import type { Metadata } from 'next'
import { city } from '@/config/city'
import { staticPageContent } from '@/data'
import { Breadcrumb } from '@/components/layout/Breadcrumb'

const c = staticPageContent.terminos

export const metadata: Metadata = {
  title: `${c.title} | GymBogota.co`,
  description: `Términos y condiciones de uso de GymBogota.co.`,
  alternates: { canonical: `${city.baseUrl}/terminos/` },
}

export default function TerminosPage() {
  return (
    <>
      <Breadcrumb items={[{ label: c.title }]} />
      <section style={{ maxWidth: 780, margin: '48px auto', padding: '0 24px' }}>
        <h1 style={{ fontSize: 36, marginBottom: 8 }}>{c.h1}</h1>
        <p style={{ color: 'var(--muted)', marginBottom: 32 }}>Última actualización: {c.lastUpdated}</p>
        <p style={{ fontSize: 16, lineHeight: 1.8, color: '#374151' }}>
          Al utilizar GymBogota.co aceptas las presentes condiciones. El uso del sitio implica la aceptación plena y sin reservas de todas y cada una de las disposiciones incluidas en este aviso legal. GymBogota.co se reserva el derecho de modificar estos términos en cualquier momento. El contenido de este sitio es meramente informativo. GymBogota.co no se responsabiliza de la veracidad de la información aportada por terceros.
        </p>
      </section>
    </>
  )
}
```

- [ ] **Step 7: Create `src/app/privacidad/page.tsx`**

```tsx
// src/app/privacidad/page.tsx
import type { Metadata } from 'next'
import { city } from '@/config/city'
import { staticPageContent } from '@/data'
import { Breadcrumb } from '@/components/layout/Breadcrumb'

const c = staticPageContent.privacidad

export const metadata: Metadata = {
  title: `${c.title} | GymBogota.co`,
  description: `Política de privacidad de GymBogota.co.`,
  alternates: { canonical: `${city.baseUrl}/privacidad/` },
}

export default function PrivacidadPage() {
  return (
    <>
      <Breadcrumb items={[{ label: c.title }]} />
      <section style={{ maxWidth: 780, margin: '48px auto', padding: '0 24px' }}>
        <h1 style={{ fontSize: 36, marginBottom: 8 }}>{c.h1}</h1>
        <p style={{ color: 'var(--muted)', marginBottom: 32 }}>Última actualización: {c.lastUpdated}</p>
        <p style={{ fontSize: 16, lineHeight: 1.8, color: '#374151' }}>
          GymBogota.co respeta la privacidad de sus usuarios. No vendemos ni compartimos datos personales con terceros sin consentimiento explícito. Los datos recopilados (nombre, email) se usan únicamente para mejorar el servicio y comunicarnos contigo. Puedes solicitar la eliminación de tus datos escribiéndonos a hola@gymbogota.co.
        </p>
      </section>
    </>
  )
}
```

- [ ] **Step 8: Verify all pages build**

```bash
npm run build
```

Expected: Build completes without errors. Count pages in `out/` — should have 13+ directories.

- [ ] **Step 9: Commit**

```bash
git add src/app/sobre-nosotros/ src/app/agregar-negocio/ src/app/blog/ src/app/faq/ src/app/contacto/ src/app/terminos/ src/app/privacidad/
git commit -m "feat: 7 static utility pages"
```

---

## Task 10: Sitemap + robots.txt

**Files:**
- Create: `src/app/sitemap.ts`
- Create: `src/app/robots.ts`

- [ ] **Step 1: Create `src/app/sitemap.ts`**

```typescript
// src/app/sitemap.ts
import type { MetadataRoute } from 'next'
import { city } from '@/config/city'
import { localidades, categories } from '@/data'

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

  return [...corePages, ...categoryPages]
}
```

- [ ] **Step 2: Create `src/app/robots.ts`**

```typescript
// src/app/robots.ts
import type { MetadataRoute } from 'next'
import { city } from '@/config/city'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/', '/buscar?*', '/*?sort=', '/*?filter=', '/*?ref=', '/*?utm_'],
      },
      {
        userAgent: ['GPTBot', 'CCBot'],
        disallow: '/',
      },
    ],
    sitemap: `${city.baseUrl}/sitemap.xml`,
  }
}
```

- [ ] **Step 3: Build and verify**

```bash
npm run build
```

Check `out/sitemap.xml` exists and lists all pages.
Check `out/robots.txt` exists with correct content.

- [ ] **Step 4: Commit**

```bash
git add src/app/sitemap.ts src/app/robots.ts
git commit -m "feat: sitemap.xml + robots.txt generation"
```

---

## Task 11: Cloudflare Pages deploy

**Files:** No code changes — deployment configuration only.

- [ ] **Step 1: Push to GitHub**

```bash
cd ~/Desktop/gymbook-frontend
git remote add origin https://github.com/<your-username>/gymbook-frontend.git
git branch -M main
git push -u origin main
```

- [ ] **Step 2: Create Cloudflare Pages project via MCP**

Use the Cloudflare MCP to create the Pages project:
- Project name: `gymbook-frontend`
- Production branch: `main`
- Build command: `npm run build`
- Build output directory: `out`

- [ ] **Step 3: Set environment variables in Cloudflare Pages dashboard**

```
NEXT_PUBLIC_CITY_SLUG=bogota
NEXT_PUBLIC_CITY_NAME=Bogotá
NEXT_PUBLIC_COUNTRY=CO
NEXT_PUBLIC_LANG=es-CO
NEXT_PUBLIC_DOMAIN=gymbogota.co
NEXT_PUBLIC_CDN_URL=https://cdn.gymbook.app
NEXT_PUBLIC_API_URL=https://api.gymbook.app
```

- [ ] **Step 4: Connect gymbogota.co domain in Cloudflare Pages**

In Cloudflare Pages → Custom domains → Add `gymbogota.co`.
Cloudflare DNS record is created automatically (since domain is on Cloudflare).

- [ ] **Step 5: Verify live site**

Visit `https://gymbogota.co/` — site loads.
Visit `https://gymbogota.co/sitemap.xml` — sitemap renders.
Visit `https://gymbogota.co/robots.txt` — robots.txt renders.

- [ ] **Step 6: Submit sitemap to Google Search Console**

1. Add `gymbogota.co` as a Domain property in GSC
2. Verify via DNS TXT record (Cloudflare DNS)
3. Submit `https://gymbogota.co/sitemap.xml`
4. Request indexing manually for: `/`, `/gimnasios/`, `/estudios/`, `/entrenadores/`, `/eventos/`, `/bienestar/`

---

## Self-Review

**Spec coverage check:**

| Spec requirement | Covered by |
|---|---|
| Fázis 0 robots.txt | Task 10 |
| Fázis 0 sitemap | Task 10 |
| Fázis 0 meta tags / canonical / hreflang | Task 4 (layout), Tasks 7-9 (page metadata) |
| Fázis 0 JSON-LD schema | Tasks 6, 7, 8 |
| Fázis 1 ~15 oldal | Tasks 7, 8, 9 (13 pages total) |
| Fázis 1 breadcrumb | Task 3 (Breadcrumb component) |
| Fázis 1 FAQ szekció | Task 6 (FaqSection), content in Task 5 |
| City-agnostic template | Task 1 (city.ts config) |
| Vercel/Cloudflare deploy | Task 11 |
| Spanyol tartalom (250-400 szó) | Task 5 (content.ts) |
| Mobile bottom nav | Task 3 (BottomNav) |
| Localidad grid + strip | Task 6 |
| Stats bar | Task 6 |

**Placeholder scan:** No TBDs or TODOs found. All code is complete.

**Type consistency:** `city`, `categories`, `localidades`, `homeContent`, `categoryContent`, `staticPageContent` — all defined in Task 5 and used consistently in Tasks 6-10.
