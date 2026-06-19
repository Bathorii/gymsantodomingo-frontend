// src/app/gimnasios/page.tsx
import type { Metadata } from 'next'
import { IMPLEMENTED_LOCALIDADES } from '@/config/localidades'
import { baseOpenGraph, OG_IMAGE } from '@/lib/metadata'
import { city } from '@/config/city'
import { categoryContent, localidades, categories } from '@/data'
import { Breadcrumb } from '@/components/layout/Breadcrumb'
import { FaqSection } from '@/components/home/FaqSection'
import { JsonLd } from '@/components/seo/JsonLd'
import Link from 'next/link'

const SLUG = 'gimnasios'
// Kerületek amelyeknek van oldala — bővíteni a következő batch után
const content = categoryContent[SLUG]
const cat = categories.find(c => c.slug === SLUG)!

export const metadata: Metadata = {
  title: `${content.h1}`,
  description: `${content.intro.slice(0, 155)}…`,
  alternates: { canonical: `${city.baseUrl}/${SLUG}/` },
  openGraph: baseOpenGraph({ title: content.h1, description: `${content.intro.slice(0, 155)}…`, url: `${city.baseUrl}/${SLUG}/` }),
  twitter: { card: 'summary_large_image' as const, images: [OG_IMAGE] },
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
            <h2 style={{ fontSize: 20, marginBottom: 16 }}>{cat.label} por sector</h2>
            {localidades.map(loc => {
              const hasPage = IMPLEMENTED_LOCALIDADES.has(loc.slug)
              return hasPage ? (
                <Link
                  key={loc.slug}
                  href={`/gimnasios/${loc.slug}/`}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '10px 0',
                    borderBottom: '1px solid var(--border)',
                    fontSize: 14,
                    color: 'var(--text)',
                    textDecoration: 'none',
                  }}
                >
                  <span>{loc.name}</span>
                  <span style={{ color: 'var(--orange)' }}>{loc.gymCount}</span>
                </Link>
              ) : (
                <div
                  key={loc.slug}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '10px 0',
                    borderBottom: '1px solid var(--border)',
                    fontSize: 14,
                    color: 'var(--muted)',
                  }}
                >
                  <span>{loc.name}</span>
                  <span>{loc.gymCount}</span>
                </div>
              )
            })}
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
