// src/app/sitemap.ts
export const dynamic = 'force-static'

import { readFileSync } from 'fs'
import path from 'path'
import type { MetadataRoute } from 'next'
import { city } from '@/config/city'
import { categories } from '@/data'

type QueueEntry = {
  slug: string
  published_at: string | null
}

function getNoindexSlugs(): Set<string> {
  try {
    const data: { slug: string; noindex?: boolean }[] = JSON.parse(
      readFileSync(path.join(process.cwd(), 'gym-static-data.json'), 'utf-8')
    )
    return new Set(data.filter(g => g.noindex).map(g => g.slug))
  } catch {
    return new Set()
  }
}

function getPublishedGyms(): QueueEntry[] {
  try {
    const queue: QueueEntry[] = JSON.parse(
      readFileSync(path.join(process.cwd(), 'publish_queue.json'), 'utf-8')
    )
    const noindex = getNoindexSlugs()
    return queue.filter(g => g.published_at !== null && !noindex.has(g.slug))
  } catch {
    return []
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const base = city.baseUrl
  const now = new Date()

  const corePages: MetadataRoute.Sitemap = [
    { url: `${base}/`,                  lastModified: now, priority: 1.0,  changeFrequency: 'weekly' },
    { url: `${base}/sobre-nosotros/`,   lastModified: now, priority: 0.5,  changeFrequency: 'monthly' },
    { url: `${base}/agregar-negocio/`,  lastModified: now, priority: 0.6,  changeFrequency: 'monthly' },
    { url: `${base}/blog/`,             lastModified: now, priority: 0.5,  changeFrequency: 'weekly' },
    { url: `${base}/faq/`,              lastModified: now, priority: 0.6,  changeFrequency: 'monthly' },
    { url: `${base}/contacto/`,         lastModified: now, priority: 0.4,  changeFrequency: 'monthly' },
    { url: `${base}/terminos/`,         lastModified: now, priority: 0.3,  changeFrequency: 'yearly' },
    { url: `${base}/privacidad/`,       lastModified: now, priority: 0.3,  changeFrequency: 'yearly' },
  ]

  const categoryPages: MetadataRoute.Sitemap = categories.map(cat => ({
    url: `${base}/${cat.slug}/`,
    lastModified: now,
    priority: 0.9,
    changeFrequency: 'weekly' as const,
  }))

  // Kerület (localidad) szintű oldalak
  const implementedLocalidades = [
    'chapinero', 'usaquen', 'suba', 'kennedy', 'teusaquillo',
    'fontibon', 'engativa', 'ciudad-bolivar', 'barrios-unidos', 'rafael-uribe-uribe',
    'puente-aranda', 'bosa', 'antonio-narino', 'la-candelaria', 'los-martires',
    'san-cristobal', 'santa-fe', 'tunjuelito', 'sumapaz', 'usme']

  const localidadPages: MetadataRoute.Sitemap = implementedLocalidades.flatMap(slug =>
    categories.map(cat => ({
      url: `${base}/${cat.slug}/${slug}/`,
      lastModified: now,
      priority: 0.8,
      changeFrequency: 'weekly' as const,
    }))
  )

  // Városrész (barrio) szintű oldalak
  // Jun 16: boyaca-real, cedritos, ciudad-montes, el-chico, el-nogal, garces-navas, la-soledad, modelia, niza, santa-barbara
  // Jun 17: alto-de-serrezuela, balcones-de-vista-hermosa, balmoral-norte, bosque-de-san-antonio, buenavista, canaima, capellania, castilla, chaparral, restrepo
  // Jun 18: chapinero-alto, ciudad-jardin-sur, ciudad-tunal, colina-campestre, doce-de-octubre, el-codito, el-pite, el-verbenal, galerias, gran-yomasa
  // Jun 18 C: horizontes, ismael-perdomo, la-cita, la-frontera, la-granja-norte, la-macarena, la-uribe, marco-fidel-suarez, maturin, minuto-de-dios
  // Jun 19: muzu, nuevo-horizonte, pasadena, polo-club, quiroga, san-antonio-norte, santa-isabel, tibabita, torca
  const implementedBarrios = [
    'alto-de-serrezuela', 'balcones-de-vista-hermosa', 'balmoral-norte', 'bosque-de-san-antonio',
    'boyaca-real', 'buenavista', 'canaima', 'capellania', 'castilla', 'cedritos',
    'chapinero-alto', 'chaparral', 'ciudad-jardin-sur', 'ciudad-montes', 'ciudad-tunal',
    'colina-campestre', 'doce-de-octubre', 'el-chico', 'el-codito', 'el-nogal',
    'el-pite', 'el-verbenal', 'galerias', 'garces-navas', 'gran-yomasa',
    'horizontes', 'ismael-perdomo', 'la-cita', 'la-frontera', 'la-granja-norte',
    'la-macarena', 'la-soledad', 'la-uribe', 'marco-fidel-suarez', 'maturin',
    'minuto-de-dios', 'modelia', 'niza', 'restrepo', 'santa-barbara',
    'muzu', 'nuevo-horizonte', 'pasadena', 'polo-club', 'quiroga',
    'san-antonio-norte', 'santa-isabel', 'tibabita', 'torca']

  const barrioPages: MetadataRoute.Sitemap = implementedBarrios.flatMap(slug =>
    categories.map(cat => ({
      url: `${base}/${cat.slug}/${slug}/`,
      lastModified: now,
      priority: 0.7,
      changeFrequency: 'weekly' as const,
    }))
  )

  const publishedGyms = getPublishedGyms()
  const gymPages: MetadataRoute.Sitemap = publishedGyms.map(g => ({
    url: `${base}/gimnasios/${g.slug}/`,
    lastModified: new Date(g.published_at!),
    priority: 0.8,
    changeFrequency: 'monthly' as const,
  }))

  return [...corePages, ...categoryPages, ...localidadPages, ...barrioPages, ...gymPages]
}
