// src/components/barrio/BarrioPage.tsx
// Városrész (barrio) oldal komponens — a LocalidadPage testvére, hyper-lokális szintre
import Link from 'next/link'
import { readFileSync } from 'fs'
import path from 'path'
import { city } from '@/config/city'
import { Breadcrumb } from '@/components/layout/Breadcrumb'
import { FaqSection } from '@/components/home/FaqSection'
import { JsonLd } from '@/components/seo/JsonLd'
import { OG_IMAGE } from '@/lib/metadata'

function getDeployedBarrioSlugs(): Set<string> {
  try {
    const queue: { slug: string }[] = JSON.parse(
      readFileSync(path.join(process.cwd(), 'barrio_queue.json'), 'utf-8')
    )
    return new Set(queue.map(b => b.slug))
  } catch {
    return new Set()
  }
}

// ── PORTAL-SPECIFIC ────────────────────────────────────────────────────────────
const AUTOR_NOMBRE = 'Mariel'
const BARRIOS_LABEL = 'Barrios cercanos'
// ──────────────────────────────────────────────────────────────────────────────

interface BarrioPageProps {
  barrioNombre: string
  barrioSlug: string
  parentDistrictNombre: string
  parentDistrictSlug: string
  categoriaSlug: string
  categoriaLabel: string
  h1: string
  intro: string
  stats: { label: string; value: string }[]
  barrios: { name: string; slug: string; district: string }[]
  categoriaLinks: { slug: string; label: string }[]
  sobreBarrio: string
  publishDate: string
  faq: { q: string; a: string }[]
  autorTip: string
}

export function BarrioPage({
  barrioNombre,
  barrioSlug,
  parentDistrictNombre,
  parentDistrictSlug,
  categoriaSlug,
  categoriaLabel,
  h1,
  intro,
  stats,
  barrios,
  categoriaLinks,
  sobreBarrio,
  publishDate,
  faq,
  autorTip,
}: BarrioPageProps) {
  const canonicalUrl = `${city.baseUrl}/${categoriaSlug}/${barrioSlug}/`
  const deployedBarrios = getDeployedBarrioSlugs()

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: h1,
    description: intro.slice(0, 160),
    datePublished: publishDate,
    dateModified: publishDate,
    image: OG_IMAGE,
    author: {
      '@type': 'Person',
      name: AUTOR_NOMBRE,
      worksFor: { '@type': 'Organization', name: city.siteName },
    },
    publisher: {
      '@type': 'Organization',
      name: city.siteName,
      logo: { '@type': 'ImageObject', url: OG_IMAGE },
    },
    mainEntityOfPage: canonicalUrl,
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: city.name, item: city.baseUrl + '/' },
      { '@type': 'ListItem', position: 2, name: categoriaLabel, item: `${city.baseUrl}/${categoriaSlug}/` },
      { '@type': 'ListItem', position: 3, name: parentDistrictNombre, item: `${city.baseUrl}/${categoriaSlug}/${parentDistrictSlug}/` },
      { '@type': 'ListItem', position: 4, name: barrioNombre },
    ],
  }

  const faqSchema = faq.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  } : null

  return (
    <>
      <JsonLd data={articleSchema} />
      <JsonLd data={breadcrumbSchema} />
      {faqSchema && <JsonLd data={faqSchema} />}

      {/* Breadcrumb: Inicio > Categoría > Distrito > Barrio */}
      <Breadcrumb items={[
        { label: categoriaLabel, href: `/${categoriaSlug}/` },
        { label: parentDistrictNombre, href: `/${categoriaSlug}/${parentDistrictSlug}/` },
        { label: barrioNombre },
      ]} />

      <div style={{ maxWidth: 960, margin: '0 auto', padding: '0 16px 48px' }}>

        {/* H1 */}
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8, lineHeight: 1.3 }}>
          {h1}
        </h1>

        {/* Parent district link — belső link a kerületi oldalra */}
        <div style={{ marginBottom: 24, fontSize: 14, color: 'var(--muted)' }}>
          Parte de{' '}
          <Link
            href={`/${categoriaSlug}/${parentDistrictSlug}/`}
            style={{ color: 'var(--orange)', fontWeight: 600 }}
          >
            {parentDistrictNombre}
          </Link>
        </div>

        <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
          {/* Fő tartalom */}
          <div style={{ flex: '1 1 600px', minWidth: 0 }}>

            {/* Sobre el barrio */}
            <div style={{
              borderLeft: '3px solid var(--orange)',
              paddingLeft: 16,
              marginBottom: 32,
              color: 'var(--text-secondary)',
            }}>
              {sobreBarrio.split('\n\n').filter(Boolean).map((p, i, arr) => (
                <p key={i} style={{ fontSize: 15, lineHeight: 1.8, margin: i < arr.length - 1 ? '0 0 16px' : '0' }}>{p}</p>
              ))}
            </div>

            {/* Intro */}
            <div style={{ marginBottom: 40 }}>
              {intro.split('\n\n').filter(Boolean).map((p, i) => (
                <p key={i} style={{ fontSize: 15, lineHeight: 1.8, marginBottom: 16, color: 'var(--text)' }}>{p}</p>
              ))}
            </div>

            {/* Szomszéd városrészek */}
            {barrios.length > 0 && (
              <div style={{ marginBottom: 40 }}>
                <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>{BARRIOS_LABEL}</h2>
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                  {barrios.map((b) => deployedBarrios.has(b.slug) ? (
                    <Link
                      key={b.slug}
                      href={`/${categoriaSlug}/${b.slug}/`}
                      style={{
                        padding: '8px 18px',
                        background: 'white',
                        border: '1px solid var(--border)',
                        borderRadius: 20,
                        fontSize: 14,
                        color: 'var(--orange)',
                        fontWeight: 600,
                        textDecoration: 'none',
                      }}
                    >
                      {b.name}
                    </Link>
                  ) : (
                    <span
                      key={b.slug}
                      style={{
                        padding: '8px 18px',
                        background: 'var(--surface)',
                        border: '1px solid var(--border)',
                        borderRadius: 20,
                        fontSize: 14,
                        color: 'var(--muted)',
                        fontWeight: 500,
                      }}
                    >
                      {b.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* FAQ */}
            {faq.length > 0 && (
              <div style={{ marginBottom: 40 }}>
                <FaqSection title={"Preguntas frecuentes — " + categoriaLabel + " en " + barrioNombre} items={faq} />
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div style={{ flex: '0 0 280px', minWidth: 260 }}>

            {/* Stat kártyák */}
            <div style={{
              background: 'var(--surface)',
              borderRadius: 12,
              padding: 20,
              marginBottom: 20,
              border: '1px solid var(--border)',
            }}>
              <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 16, textTransform: 'uppercase', letterSpacing: '.05em', color: 'var(--muted)' }}>
                {barrioNombre} por categoría
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {categoriaLinks.map((c) => (
                  <Link
                    key={c.slug}
                    href={`/${c.slug}/${barrioSlug}/`}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      padding: '8px 12px',
                      borderRadius: 8,
                      textDecoration: 'none',
                      background: c.slug === categoriaSlug ? 'rgba(249,115,22,.1)' : 'transparent',
                      color: c.slug === categoriaSlug ? 'var(--orange)' : 'var(--text)',
                      fontWeight: c.slug === categoriaSlug ? 700 : 400,
                    }}
                  >
                    {c.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div style={{
              background: 'var(--surface)',
              borderRadius: 12,
              padding: 20,
              marginBottom: 20,
              border: '1px solid var(--border)',
            }}>
              {stats.map((s, i) => (
                <div key={i} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '10px 0',
                  borderBottom: i < stats.length - 1 ? '1px solid var(--border)' : 'none',
                  fontSize: 14,
                }}>
                  <span style={{ color: 'var(--muted)' }}>{s.label}</span>
                  <span style={{ fontWeight: 700, color: 'var(--text)' }}>{s.value}</span>
                </div>
              ))}
            </div>

            {/* Autor tip */}
            <div style={{
              background: 'var(--surface-dark)',
              borderRadius: 12,
              padding: 20,
              border: '1px solid var(--border)',
            }}>
              <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 8, color: 'var(--orange)' }}>
                💬 Tip de {AUTOR_NOMBRE}
              </div>
              <p style={{ fontSize: 13, lineHeight: 1.6, color: 'var(--text-secondary)', margin: 0 }}>
                {autorTip}
              </p>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}
