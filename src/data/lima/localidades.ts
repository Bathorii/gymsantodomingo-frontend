// src/data/lima/localidades.ts
export const localidades = [
  { name: 'Surco',                  slug: 'surco',                   gymCount: 168 },
  { name: 'Miraflores',             slug: 'miraflores',              gymCount: 145 },
  { name: 'San Isidro',             slug: 'san-isidro',              gymCount: 122 },
  { name: 'Los Olivos',             slug: 'los-olivos',              gymCount: 134 },
  { name: 'San Martín de Porres',   slug: 'san-martin-de-porres',    gymCount: 112 },
  { name: 'Ate',                    slug: 'ate',                     gymCount: 89  },
  { name: 'La Molina',              slug: 'la-molina',               gymCount: 98  },
  { name: 'San Borja',              slug: 'san-borja',               gymCount: 87  },
  { name: 'San Miguel',             slug: 'san-miguel',              gymCount: 83  },
  { name: 'Callao',                 slug: 'callao',                  gymCount: 94  },
  { name: 'Lima Centro',            slug: 'lima-centro',             gymCount: 78  },
  { name: 'Chorrillos',             slug: 'chorrillos',              gymCount: 72  },
  { name: 'Pueblo Libre',           slug: 'pueblo-libre',            gymCount: 67  },
  { name: 'Jesús María',            slug: 'jesus-maria',             gymCount: 76  },
  { name: 'Magdalena del Mar',      slug: 'magdalena-del-mar',       gymCount: 62  },
  { name: 'Lince',                  slug: 'lince',                   gymCount: 58  },
  { name: 'Independencia',          slug: 'independencia',           gymCount: 71  },
  { name: 'La Victoria',            slug: 'la-victoria',             gymCount: 61  },
  { name: 'Barranco',               slug: 'barranco',                gymCount: 54  },
  { name: 'Breña',                  slug: 'brena',                   gymCount: 48  },
] as const

export type Localidad = typeof localidades[number]
