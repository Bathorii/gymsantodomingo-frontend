// src/app/blog/page.tsx
import type { Metadata } from 'next'
import { city } from '@/config/city'
import { Breadcrumb } from '@/components/layout/Breadcrumb'
import { baseOpenGraph, OG_IMAGE } from '@/lib/metadata'

export const metadata: Metadata = {
  title: `Blog – Fitness y gimnasios en ${city.name}`,
  description: `Artículos, guías y consejos sobre fitness, gimnasios y bienestar en ${city.name}. Próximamente.`,
  alternates: { canonical: `${city.baseUrl}/blog/` },
  openGraph: baseOpenGraph({ url: `${city.baseUrl}/blog/` }),
  twitter: { card: 'summary_large_image' as const, images: [OG_IMAGE] },
}

export default function BlogPage() {
  return (
    <>
      <Breadcrumb items={[{ label: 'Blog' }]} />
      <section style={{ maxWidth: 780, margin: '48px auto', padding: '0 24px', textAlign: 'center' }}>
        <h1 style={{ fontSize: 36, marginBottom: 16 }}>Blog {city.siteName}</h1>
        <p style={{ fontSize: 18, color: 'var(--muted)', marginBottom: 40 }}>
          Consejos, guías y artículos sobre fitness, gimnasios y bienestar en {city.name}. Próximamente.
        </p>
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, padding: 40 }}>
          <p style={{ fontSize: 15, color: 'var(--muted)' }}>
            Nuestro blog está en construcción. Pronto publicaremos guías como
            <em> "¿Cuánto cuesta el gimnasio en {city.name} en 2026?"</em> y mucho más.
          </p>
        </div>
      </section>
    </>
  )
}
