/**
 * Centralized API client for gymbook-frontend
 * Uses NEXT_PUBLIC_API_URL environment variable
 *
 * Local dev: http://localhost:8000
 * Railway deploy: https://gymbook-api.up.railway.app
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000'

interface FetchGymsParams {
  page?: number
  per_page?: number
  category?: string
  localidad?: string
}

/**
 * Fetch gyms with pagination and filtering
 */
export async function fetchGyms(params?: FetchGymsParams) {
  const url = new URL(`${API_URL}/gyms/`)
  if (params?.page) url.searchParams.set('page', String(params.page))
  if (params?.per_page) url.searchParams.set('per_page', String(params.per_page))
  if (params?.category) url.searchParams.set('category', params.category)
  if (params?.localidad) url.searchParams.set('localidad', params.localidad)

  const res = await fetch(url.toString(), { next: { revalidate: 300 } })
  if (!res.ok) {
    throw new Error(`Failed to fetch gyms: ${res.status} ${res.statusText}`)
  }
  return res.json()
}

/**
 * Search gyms by query string
 */
export async function searchGyms(q: string, page = 1) {
  const url = new URL(`${API_URL}/search/`)
  url.searchParams.set('q', q)
  url.searchParams.set('page', String(page))

  const res = await fetch(url.toString(), { next: { revalidate: 60 } })
  if (!res.ok) {
    throw new Error(`Failed to search gyms: ${res.status} ${res.statusText}`)
  }
  return res.json()
}

/**
 * Fetch overall statistics
 */
export async function fetchStats() {
  const res = await fetch(`${API_URL}/stats/`, { next: { revalidate: 3600 } })
  if (!res.ok) {
    throw new Error(`Failed to fetch stats: ${res.status} ${res.statusText}`)
  }
  return res.json()
}

export interface GymDetail {
  id: string
  name: string
  slug: string
  category: string
  localidad: string
  address: string | null
  phone: string | null
  website: string | null
  description: string | null
  rating: number | null
  review_count: number
  lat: number | null
  lng: number | null
  photos: string[]
  photo_urls?: string[]
  noindex?: boolean
  opening_hours: Record<string, string>
  featured: boolean
}

export async function fetchGymDetail(slug: string): Promise<GymDetail> {
  const res = await fetch(`${API_URL}/gyms/${slug}`, {
    cache: 'force-cache',
    signal: AbortSignal.timeout(25_000),
  })
  if (!res.ok) {
    throw new Error(`Failed to fetch gym detail: ${res.status}`)
  }
  return res.json()
}
