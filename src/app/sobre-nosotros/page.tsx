// src/app/sobre-nosotros/page.tsx
import type { Metadata } from 'next'
import { city } from '@/config/city'
import { staticPageContent } from '@/data'
import { Breadcrumb } from '@/components/layout/Breadcrumb'
import { baseOpenGraph, OG_IMAGE } from '@/lib/metadata'

const c = staticPageContent.sobreNosotros

export const metadata: Metadata = {
  title: `${c.title}`,
  description: `Conoce el equipo detrás de ${city.siteName}, el directorio de fitness más completo de ${city.name}.`,
  alternates: { canonical: `${city.baseUrl}/sobre-nosotros/` },
  openGraph: baseOpenGraph({ url: `${city.baseUrl}/sobre-nosotros/` }),
  twitter: { card: 'summary_large_image' as const, images: [OG_IMAGE] },
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
