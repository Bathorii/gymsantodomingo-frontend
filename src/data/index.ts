// src/data/index.ts
import * as bogota from './bogota/content'
import { localidades as bogotaLocalidades } from './bogota/localidades'
import * as cdmx from './cdmx/content'
import { localidades as cdmxLocalidades } from './cdmx/localidades'
import * as lima from './lima/content'
import { localidades as limaLocalidades } from './lima/localidades'
import * as santiago from './santiago/content'
import { localidades as santiagoLocalidades } from './santiago/localidades'
import * as caba from './caba/content'
import { localidades as cabaLocalidades } from './caba/localidades'
import * as santodomingo from './santodomingo/content'
import { localidades as santodomingolocalidades } from './santodomingo/localidades'

const slug = process.env.NEXT_PUBLIC_CITY_SLUG || 'bogota'

const contentMap = {
  bogota,
  cdmx,
  lima,
  santiago,
  caba,
  santodomingo,
} as const

const localidadesMap = {
  bogota:       bogotaLocalidades,
  cdmx:         cdmxLocalidades,
  lima:         limaLocalidades,
  santiago:     santiagoLocalidades,
  caba:         cabaLocalidades,
  santodomingo: santodomingolocalidades,
} as const

type CitySlug = keyof typeof contentMap

const citySlug = (slug in contentMap ? slug : 'bogota') as CitySlug

const content = contentMap[citySlug]

export const localidades     = localidadesMap[citySlug]
export const homeContent     = content.homeContent
export const categoryContent = content.categoryContent
export const staticPageContent = content.staticPageContent
export const categories      = content.categories
