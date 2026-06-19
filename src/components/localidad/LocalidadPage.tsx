// src/components/localidad/LocalidadPage.tsx
import { IMPLEMENTED_LOCALIDADES } from '@/config/localidades'
import Link from 'next/link'
import { readFileSync } from 'fs'
import path from 'path'
import { city } from '@/config/city'
import { Breadcrumb } from '@/components/layout/Breadcrumb'
import { FaqSection } from '@/components/home/FaqSection'
import { JsonLd } from '@/components/seo/JsonLd'
import { OG_IMAGE } from '@/lib/metadata'

function getDeployedBarriosForDistrict(districtSlug: string): { slug: string; name: string }[] {
  try {
    const map: Record<string, { slug: string; name: string }[]> = JSON.parse(
      readFileSync(path.join(process.cwd(), 'barrio_district_map.json'), 'utf-8')
    )
    return map[districtSlug] || []
  } catch {
    return []
  }
}

// ── PORTAL-SPECIFIC CONSTANTS ─────────────────────────────────────────────────
const AUTOR_NOMBRE = 'Sebastián'
const VECINOS_LABEL = 'Localidades cercanas'

// Localidades with a built static page — only these render as clickable links.
// Add new slugs here after each batch deploy.
// IMPLEMENTED_LOCALIDADES importálva a centrális config-ból
// ─────────────────────────────────────────────────────────────────────────────

interface LocalidadPageProps {
  localidadNombre: string
  localidadSlug: string
  categoriaSlug: string
  categoriaLabel: string
  h1: string
  intro: string
  stats: { label: string; value: string }[]
  vecinos: { name: string; slug: string }[]
  categoriaLinks: { slug: string; label: string }[]
  sobreBarrio: string
  publishDate: string
  faq: { q: string; a: string }[]
  autorTip: string
}

export function LocalidadPage({
  localidadNombre,
  localidadSlug,
  categoriaSlug,
  categoriaLabel,
  h1,
  intro,
  stats,
  vecinos,
  categoriaLinks,
  sobreBarrio,
  publishDate,
  faq,
  autorTip,
}: LocalidadPageProps) {
  const deployedBarrios = getDeployedBarriosForDistrict(localidadSlug)
  const canonicalUrl = `${city.baseUrl}/${categoriaSlug}/${localidadSlug}/`

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
      url: `${city.baseUrl}/sobre-nosotros/`,
      worksFor: { '@type': 'Organization', name: city.siteName, url: city.baseUrl },
    },
    publisher: {
      '@type': 'Organization',
      name: city.siteName,
      url: city.baseUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${city.baseUrl}/logo.png`,
        width: 200,
        height: 60,
      },
    },
    url: canonicalUrl,
    inLanguage: city.lang,
    about: {
      '@type': 'Place',
      name: `${localidadNombre}, ${city.name}`,
      address: {
        '@type': 'PostalAddress',
        addressLocality: localidadNombre,
        addressRegion: city.name,
        addressCountry: city.country,
      },
    },
  }

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: h1,
    url: canonicalUrl,
    itemListElement: categoriaLinks.map((link, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: link.label,
      url: `${city.baseUrl}/${link.slug}/${localidadSlug}/`,
    })),
  }

  return (
    <>
      <JsonLd data={articleSchema} />
      <JsonLd data={itemListSchema} />

      <Breadcrumb
        items={[
          { label: categoriaLabel, href: `/${categoriaSlug}/` },
          { label: localidadNombre },
        ]}
      />

      <div style={{ maxWidth: 1180, margin: '0 auto', padding: '40px 24px 80px' }}>

        {/* Header */}
        <header style={{ marginBottom: 40 }}>
          <h1 style={{ fontSize: 38, fontWeight: 800, color: 'var(--text)', marginBottom: 8, lineHeight: 1.2 }}>
            {h1}
          </h1>
          <p style={{ fontSize: 14, color: 'var(--muted)', margin: 0 }}>
            Por <strong>{AUTOR_NOMBRE}</strong> · {city.siteName}
          </p>
        </header>

        {/* 2-col grid */}
        <div
          className="localidad-grid"
          style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 48, alignItems: 'start' }}
        >
          {/* Article */}
          <article>

            {/* Stats 2×2 */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12, marginBottom: 36 }}>
              {stats.map((s) => (
                <div key={s.label} style={{ background: 'white', border: '1px solid var(--border)', borderRadius: 12, padding: '14px 18px' }}>
                  <div style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 4 }}>{s.label}</div>
                  <div style={{ fontSize: 17, fontWeight: 700, color: 'var(--text)' }}>{s.value}</div>
                </div>
              ))}
            </div>

            {/* Intro */}
            {intro.split('\n\n').filter(Boolean).map((p, i) => (
              <p key={i} style={{ fontSize: 16, lineHeight: 1.85, color: '#374151', marginBottom: 20 }}>{p}</p>
            ))}

            {/* sobreBarrio card */}
            <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, padding: '28px 32px', marginTop: 40, marginBottom: 40 }}>
              <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16, marginTop: 0, color: 'var(--text)' }}>
                Sobre {localidadNombre} — el barrio
              </h2>
              {sobreBarrio.split('\n\n').filter(Boolean).map((p, i, arr) => (
                <p key={i} style={{ fontSize: 15, lineHeight: 1.8, color: '#4b5563', margin: i < arr.length - 1 ? '0 0 16px' : '0' }}>{p}</p>
              ))}
            </div>

            {/* Vecinos pills */}
            <div style={{ marginBottom: 40 }}>
              <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16, color: 'var(--text)' }}>
                {VECINOS_LABEL}
              </h2>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                {vecinos.map((v) => {
                  const hasPage = IMPLEMENTED_LOCALIDADES.has(v.slug)
                  return hasPage ? (
                    <Link
                      key={v.slug}
                      href={`/${categoriaSlug}/${v.slug}/`}
                      style={{ display: 'inline-block', padding: '8px 18px', background: 'white', border: '1px solid var(--border)', borderRadius: 20, fontSize: 14, color: 'var(--orange)', fontWeight: 600, textDecoration: 'none' }}
                    >
                      {v.name}
                    </Link>
                  ) : (
                    <span
                      key={v.slug}
                      style={{ display: 'inline-block', padding: '8px 18px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 20, fontSize: 14, color: 'var(--muted)', fontWeight: 500 }}
                    >
                      {v.name}
                    </span>
                  )
                })}
              </div>
            </div>

            {/* Barrios de esta localidad */}
            {deployedBarrios.length > 0 && (
              <div style={{ marginBottom: 40 }}>
                <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16, color: 'var(--text)' }}>
                  Barrios de {localidadNombre}
                </h2>
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                  {deployedBarrios.map((b) => (
                    <Link
                      key={b.slug}
                      href={`/${categoriaSlug}/${b.slug}/`}
                      style={{ display: 'inline-block', padding: '8px 18px', background: 'white', border: '1px solid var(--border)', borderRadius: 20, fontSize: 14, color: 'var(--orange)', fontWeight: 600, textDecoration: 'none' }}
                    >
                      {b.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* FAQ */}
            {faq.length > 0 && (
              <FaqSection
                title={`Preguntas frecuentes — ${categoriaLabel} en ${localidadNombre}`}
                items={faq}
              />
            )}
          </article>

          {/* Sidebar */}
          <aside style={{ position: 'sticky', top: 24, alignSelf: 'start' }}>

            {/* Category nav */}
            <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: 16, padding: 24, marginBottom: 20 }}>
              <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 16, marginTop: 0, color: 'var(--text)' }}>
                {localidadNombre} por categoría
              </h3>
              {categoriaLinks.map((link) => (
                <Link
                  key={link.slug}
                  href={`/${link.slug}/${localidadSlug}/`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '10px 12px',
                    borderRadius: 8,
                    fontSize: 14,
                    color: link.slug === categoriaSlug ? 'var(--orange)' : 'var(--text)',
                    fontWeight: link.slug === categoriaSlug ? 700 : 500,
                    background: link.slug === categoriaSlug ? '#fff3e8' : 'transparent',
                    textDecoration: 'none',
                    marginBottom: 4,
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Autor tip */}
            <div style={{ background: 'linear-gradient(135deg, #0f3460 0%, #16213e 100%)', borderRadius: 12, padding: '18px 20px', color: 'white' }}>
              <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 8, opacity: 0.8 }}>
                💬 Tip de {AUTOR_NOMBRE}
              </div>
              <p style={{ fontSize: 13, lineHeight: 1.65, margin: 0, opacity: 0.95 }}>
                {autorTip}
              </p>
            </div>

          </aside>
        </div>

        {/* CTA */}
        <div style={{ marginTop: 48, padding: 32, background: 'linear-gradient(135deg, #fff3e8 0%, #ffe8d0 100%)', borderRadius: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 20 }}>
          <div>
            <h3 style={{ margin: '0 0 6px', fontSize: 18, color: 'var(--text)' }}>
              ¿Tienes un negocio en {localidadNombre}?
            </h3>
            <p style={{ margin: 0, fontSize: 14, color: '#6b7280' }}>
              Agrégalo gratis y llega a quienes buscan entrenar en {localidadNombre}.
            </p>
          </div>
          <Link
            href="/agregar-negocio/"
            style={{ background: 'var(--orange)', color: 'white', padding: '12px 24px', borderRadius: 10, fontWeight: 700, fontSize: 15, textDecoration: 'none', whiteSpace: 'nowrap' }}
          >
            Agregar negocio
          </Link>
        </div>

      </div>

      <style>{`
        .localidad-grid { grid-template-columns: 1fr 320px; }
        @media (max-width: 900px) {
          .localidad-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 768px) {
          h1 { font-size: 28px !important; }
        }
      `}</style>
    </>
  )
}
