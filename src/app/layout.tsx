// src/app/layout.tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], weight: ['400', '700'], display: 'swap' })
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { BottomNav } from '@/components/layout/BottomNav'
import { city } from '@/config/city'
import { OG_IMAGE } from '@/lib/metadata'

export const metadata: Metadata = {
  metadataBase: new URL(city.baseUrl),
  title: {
    default: `${city.siteName} – Encuentra gimnasios en ${city.name}`,
    template: `%s | ${city.siteName}`,
  },
  description: `Directorio de gimnasios, estudios fitness, entrenadores personales y bienestar en ${city.name}. Encuentra el lugar perfecto para entrenar cerca de ti.`,
  openGraph: {
    siteName: city.siteName,
    locale: city.lang.replace('-', '_'),
    type: 'website',
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: `Gimnasios en ${city.name}` }],
  },
  twitter: {
    card: 'summary_large_image',
    images: [OG_IMAGE],
  },
  alternates: {
    canonical: city.baseUrl + '/',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={city.lang}>
      <head>
        <link rel="preload" as="image" href="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80&fm=webp&auto=format" fetchPriority="high" />
      </head>
      <body className={inter.className}>
        <Header />
        <main>{children}</main>
        <Footer />
        <BottomNav />
      </body>
    </html>
  )
}
