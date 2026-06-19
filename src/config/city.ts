// src/config/city.ts
export const city = {
  slug:     process.env.NEXT_PUBLIC_CITY_SLUG   || 'santodomingo',
  name:     process.env.NEXT_PUBLIC_CITY_NAME   || 'Santo Domingo',
  country:  process.env.NEXT_PUBLIC_COUNTRY     || 'DO',
  lang:     process.env.NEXT_PUBLIC_LANG        || 'es-DO',
  domain:   process.env.NEXT_PUBLIC_DOMAIN      || 'gymsantodomingo.com',
  siteName: process.env.NEXT_PUBLIC_SITE_NAME   || 'GymSantoDomingo.com',
  cdnUrl:   process.env.NEXT_PUBLIC_CDN_URL     || '',
  apiUrl:   process.env.NEXT_PUBLIC_API_URL     || '',
  timezone: 'America/Santo_Domingo',
  currency: 'DOP',
  currencySymbol: 'RD$',
  districtTerm: 'sector',
  districtTermPlural: 'sectores',
  languageRegister: 'tuteo',
  voseoRequired: false,
  altitudeM: 14,
  altitudeRelevant: false,
  authorName: 'Ramón',
  baseUrl: `https://${process.env.NEXT_PUBLIC_DOMAIN || 'gymsantodomingo.com'}`,
} as const

export type CityConfig = typeof city
