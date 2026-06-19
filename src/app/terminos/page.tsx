// src/app/terminos/page.tsx
import type { Metadata } from 'next'
import { city } from '@/config/city'
import { staticPageContent } from '@/data'
import { Breadcrumb } from '@/components/layout/Breadcrumb'
import { baseOpenGraph, OG_IMAGE } from '@/lib/metadata'

const c = staticPageContent.terminos

export const metadata: Metadata = {
  title: `${c.title}`,
  description: `Términos y condiciones de uso de ${city.siteName}.`,
  alternates: { canonical: `${city.baseUrl}/terminos/` },
  openGraph: baseOpenGraph({ url: `${city.baseUrl}/terminos/` }),
  twitter: { card: 'summary_large_image' as const, images: [OG_IMAGE] },
}

export default function TerminosPage() {
  return (
    <>
      <Breadcrumb items={[{ label: c.title }]} />
      <section style={{ maxWidth: 780, margin: '48px auto', padding: '0 24px' }}>
        <h1 style={{ fontSize: 36, marginBottom: 8 }}>{c.h1}</h1>
        <p style={{ color: 'var(--muted)', marginBottom: 32 }}>Última actualización: {c.lastUpdated}</p>
        <p style={{ fontSize: 16, lineHeight: 1.8, color: '#374151' }}>
          Al utilizar {city.siteName} aceptas las presentes condiciones. El uso del sitio implica la aceptación plena y sin reservas de todas y cada una de las disposiciones incluidas en este aviso legal. {city.siteName} se reserva el derecho de modificar estos términos en cualquier momento. El contenido de este sitio es meramente informativo. {city.siteName} no se responsabiliza de la veracidad de la información aportada por terceros.
        </p>
      </section>
    </>
  )
}
