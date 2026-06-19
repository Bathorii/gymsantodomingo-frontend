// src/app/faq/page.tsx
import type { Metadata } from 'next'
import { city } from '@/config/city'
import { staticPageContent } from '@/data'
import { Breadcrumb } from '@/components/layout/Breadcrumb'
import { FaqSection } from '@/components/home/FaqSection'
import { baseOpenGraph, OG_IMAGE } from '@/lib/metadata'

const c = staticPageContent.faqPage

export const metadata: Metadata = {
  title: `${c.title}`,
  description: `Respuestas a las preguntas más frecuentes sobre ${city.siteName} y cómo encontrar gimnasios en ${city.name}.`,
  alternates: { canonical: `${city.baseUrl}/faq/` },
  openGraph: baseOpenGraph({ url: `${city.baseUrl}/faq/` }),
  twitter: { card: 'summary_large_image' as const, images: [OG_IMAGE] },
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
