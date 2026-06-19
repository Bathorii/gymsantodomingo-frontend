// src/app/page.tsx
import type { Metadata } from 'next'
import { baseOpenGraph, OG_IMAGE } from '@/lib/metadata'
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
  title: `Gimnasios en ${city.name} – Directorio fitness | ${city.siteName}`,
  description: `Directorio de gimnasios, estudios fitness y entrenadores en ${city.name}. Busca gratis por sector.`,
  alternates: { canonical: `${city.baseUrl}/` },
  openGraph: baseOpenGraph({
    title: `Gimnasios en ${city.name} – ${city.siteName}`,
    description: `El directorio de fitness más completo de ${city.name}. Gimnasios, estudios y entrenadores en todos los sectores. Busca gratis.`,
    url: `${city.baseUrl}/`,
  }),
  twitter: { card: 'summary_large_image' as const, images: [OG_IMAGE] },
}

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: city.siteName,
  url: city.baseUrl,
  potentialAction: {
    '@type': 'SearchAction',
    target: { '@type': 'EntryPoint', urlTemplate: `${city.baseUrl}/gimnasios/?q={search_term_string}` },
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
        title={`Preguntas frecuentes sobre gimnasios en ${city.name}`}
        items={homeContent.faq}
      />
    </>
  )
}
