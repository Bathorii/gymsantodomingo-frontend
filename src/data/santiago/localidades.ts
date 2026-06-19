// src/data/santiago/localidades.ts
export const localidades = [
  { name: 'Providencia',         slug: 'providencia',          gymCount: 182 },
  { name: 'Las Condes',          slug: 'las-condes',           gymCount: 168 },
  { name: 'Vitacura',            slug: 'vitacura',             gymCount: 145 },
  { name: 'Ñuñoa',               slug: 'nunoa',                gymCount: 131 },
  { name: 'Santiago Centro',     slug: 'santiago-centro',      gymCount: 124 },
  { name: 'La Florida',          slug: 'la-florida',           gymCount: 112 },
  { name: 'Maipú',               slug: 'maipu',                gymCount: 108 },
  { name: 'San Miguel',          slug: 'san-miguel',           gymCount: 94  },
  { name: 'Macul',               slug: 'macul',                gymCount: 87  },
  { name: 'Peñalolén',           slug: 'penalolen',            gymCount: 79  },
  { name: 'La Reina',            slug: 'la-reina',             gymCount: 72  },
  { name: 'Pudahuel',            slug: 'pudahuel',             gymCount: 65  },
  { name: 'Recoleta',            slug: 'recoleta',             gymCount: 68  },
  { name: 'Lo Barnechea',        slug: 'lo-barnechea',         gymCount: 58  },
  { name: 'Estación Central',    slug: 'estacion-central',     gymCount: 61  },
  { name: 'Quilicura',           slug: 'quilicura',            gymCount: 52  },
  { name: 'Independencia',       slug: 'independencia',        gymCount: 57  },
  { name: 'Conchalí',            slug: 'conchali',             gymCount: 47  },
  { name: 'Huechuraba',          slug: 'huechuraba',           gymCount: 45  },
  { name: 'La Cisterna',         slug: 'la-cisterna',          gymCount: 49  },
] as const

export type Localidad = typeof localidades[number]
