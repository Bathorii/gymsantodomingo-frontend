// src/data/categories.ts
export const categories = [
  { slug: 'gimnasios', label: 'Gimnasios', icon: '🏋️', count: 0, description: 'Gimnasios en Santo Domingo' },
  { slug: 'estudios', label: 'Estudios', icon: '🧘', count: 0, description: 'Estudios fitness en Santo Domingo' },
  { slug: 'entrenadores', label: 'Entrenadores', icon: '🚶', count: 0, description: 'Entrenadores personales en Santo Domingo' },
  { slug: 'eventos', label: 'Eventos', icon: '📅', count: 0, description: 'Eventos fitness en Santo Domingo' },
  { slug: 'bienestar', label: 'Bienestar', icon: '🌿', count: 0, description: 'Centros de bienestar en Santo Domingo' },
] as const

export type Category = typeof categories[number]
