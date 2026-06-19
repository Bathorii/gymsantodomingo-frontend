// src/data/cdmx/localidades.ts
export const localidades = [
  { name: 'Iztapalapa',          slug: 'iztapalapa',          gymCount: 187 },
  { name: 'Benito Juárez',       slug: 'benito-juarez',       gymCount: 176 },
  { name: 'Cuauhtémoc',          slug: 'cuauhtemoc',          gymCount: 163 },
  { name: 'Miguel Hidalgo',      slug: 'miguel-hidalgo',      gymCount: 147 },
  { name: 'Gustavo A. Madero',   slug: 'gustavo-a-madero',    gymCount: 141 },
  { name: 'Coyoacán',            slug: 'coyoacan',            gymCount: 129 },
  { name: 'Álvaro Obregón',      slug: 'alvaro-obregon',      gymCount: 118 },
  { name: 'Tlalpan',             slug: 'tlalpan',             gymCount: 94  },
  { name: 'Cuajimalpa',          slug: 'cuajimalpa',          gymCount: 62  },
  { name: 'Azcapotzalco',        slug: 'azcapotzalco',        gymCount: 87  },
  { name: 'Venustiano Carranza', slug: 'venustiano-carranza', gymCount: 75  },
  { name: 'Iztacalco',           slug: 'iztacalco',           gymCount: 68  },
  { name: 'Xochimilco',          slug: 'xochimilco',          gymCount: 51  },
  { name: 'Magdalena Contreras', slug: 'magdalena-contreras', gymCount: 41  },
  { name: 'Tláhuac',             slug: 'tlahuac',             gymCount: 37  },
  { name: 'Milpa Alta',          slug: 'milpa-alta',          gymCount: 13  },
] as const

export type Localidad = typeof localidades[number]
