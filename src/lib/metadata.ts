// src/lib/metadata.ts
// Shared OpenGraph base – minden page.tsx-ben használd ezt, hogy
// og:image, og:type, og:siteName, og:locale mindig jelen legyen.
// A Next.js page.tsx openGraph objektuma felváltja (nem mergeli)
// a layout.tsx openGraph-ját, ezért kötelező minden oldalon explicit megadni.

import type { Metadata } from 'next'
import { city } from '@/config/city'

const OG_IMAGE = 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&q=80&fm=webp&auto=format'

type OG = NonNullable<Metadata['openGraph']>

export function baseOpenGraph(overrides: Partial<OG> = {}): OG {
  return {
    siteName: city.siteName,
    locale: city.lang.replace('-', '_'),
    type: 'website',
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: `Gimnasios en ${city.name}` }],
    ...overrides,
  } as OG
}

export { OG_IMAGE }
