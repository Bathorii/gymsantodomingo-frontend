// src/app/contacto/page.tsx
import type { Metadata } from 'next'
import { city } from '@/config/city'
import { staticPageContent } from '@/data'
import { Breadcrumb } from '@/components/layout/Breadcrumb'
import { baseOpenGraph, OG_IMAGE } from '@/lib/metadata'

const c = staticPageContent.contacto

export const metadata: Metadata = {
  title: `${c.title}`,
  description: `Contacta al equipo de ${city.siteName}. Estamos disponibles para ayudarte.`,
  alternates: { canonical: `${city.baseUrl}/contacto/` },
  openGraph: baseOpenGraph({ url: `${city.baseUrl}/contacto/` }),
  twitter: { card: 'summary_large_image' as const, images: [OG_IMAGE] },
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
