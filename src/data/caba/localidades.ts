// src/data/caba/localidades.ts
export const localidades = [
  { name: 'Palermo',          slug: 'palermo',          gymCount: 198 },
  { name: 'Belgrano',         slug: 'belgrano',         gymCount: 156 },
  { name: 'Recoleta',         slug: 'recoleta',         gymCount: 143 },
  { name: 'Caballito',        slug: 'caballito',        gymCount: 128 },
  { name: 'Flores',           slug: 'flores',           gymCount: 112 },
  { name: 'Villa Crespo',     slug: 'villa-crespo',     gymCount: 97  },
  { name: 'Almagro',          slug: 'almagro',          gymCount: 88  },
  { name: 'Balvanera',        slug: 'balvanera',        gymCount: 87  },
  { name: 'Villa Urquiza',    slug: 'villa-urquiza',    gymCount: 72  },
  { name: 'Boedo',            slug: 'boedo',            gymCount: 69  },
  { name: 'Núñez',            slug: 'nunez',            gymCount: 78  },
  { name: 'Colegiales',       slug: 'colegiales',       gymCount: 63  },
  { name: 'Chacarita',        slug: 'chacarita',        gymCount: 54  },
  { name: 'San Telmo',        slug: 'san-telmo',        gymCount: 52  },
  { name: 'Villa del Parque', slug: 'villa-del-parque', gymCount: 58  },
  { name: 'Devoto',           slug: 'devoto',           gymCount: 61  },
  { name: 'Saavedra',         slug: 'saavedra',         gymCount: 65  },
  { name: 'Barracas',         slug: 'barracas',         gymCount: 47  },
  { name: 'Mataderos',        slug: 'mataderos',        gymCount: 44  },
  { name: 'Puerto Madero',    slug: 'puerto-madero',    gymCount: 31  },
] as const

export type Localidad = typeof localidades[number]
