# GymBogotá.co – Publikálási és SEO stratégia

**Létrehozva:** 2026-05-17  
**Domain indulás:** 2026-05-17 (innen számítjuk a Google Sandbox periódust)  
**Cél:** organikus forgalom felépítése Bogotá fitneszpiacon, Google-barát, fenntartható módszerrel

---

## ⚠️ Kötelező alapelv – Thin Content tilalom

A Google 2024 márciusi „Scaled Content Abuse" spam policy frissítése után a programmatikusan generált, tartalom nélküli oldalak (pl. üres gym profilok) **rankingelimináló** kockázatot jelentenek.

**Tilos indexelni:**
- Üres vagy közel üres gym profilt (hiányzó leírás, fotók, nyitvatartás)
- Olyan lokalidad-oldalt, ahol kevesebb mint 5 aktív, teljes profil van
- Olyan kategória-oldalt, ahol kevesebb mint 3 aktív, teljes profil van

**Minden publikus oldal minimumkövetelménye:**
- Legalább 150 szó egyedi leírás (nem csak cím + cím)
- Legalább 1 fotó (Google Places photo_urls kitöltve)
- Nyitvatartás (ha elérhető)
- LocalBusiness / SportsActivityLocation Schema markup
- OG image + Twitter Card image meta tag (ha van fotó)
- JSON-LD `image` mező kitöltve (ha van fotó)
- `<img alt>` kitöltve (nem üres string)

---

## 3 fázisú publikálási ütemterv

### 1. Fázis – Alap (2026-05-17 → 2026-08-17, ~3 hónap)

**Cél:** 50–100 magas minőségű oldal, amely mérhető forgalmat hoz.

**Mit indexelünk:**
- Csak a legjobban feltöltött, legtöbb Google Reviews-szal rendelkező edzőtermek profiljait
- Fő hub oldalak: `/localidades/` (Bogotá kerületei), `/categorias/` (gimnasios, crossfit, yoga, pilates, boxeo)
- Statikus tartalom: főoldal, `/privacidad/`, `/contacto/`, `/sobre-nosotros/`

**Mit NEM indexelünk (noindex):**
- Félkész gym profilok
- Kevesebb mint 5 tagot tartalmazó kategória/localidad oldalak

**Feladatok:**
- [ ] Google Search Console regisztráció (első nap!)
- [ ] Sitemap.xml csak a kész oldalakkal
- [ ] robots.txt: `/api/`, `/admin/` tiltva
- [ ] LocalBusiness Schema minden gym profilon
- [ ] Google Business Profile ellenőrzés (own a listinget ahol lehet)

---

### 2. Fázis – Növekedés (2026-08-17 → 2026-11-17, ~3 hónap)

**Cél:** 300–500 oldal, ha a Sandbox periódus lejárt és vannak első orgánus kattintások.

**Feltétel a léptetéshez:**
- GSC-ben legalább 100 impresszió/nap organikusan
- Legalább 5 gyűjtött felhasználói értékelés a platformon (trust jel)

**Mit indexelünk:**
- Minden teljesen feltöltött gym profil
- Localidad × kategória kombinált oldalak (pl. `/chapinero/crossfit/`)
- Blog / editorial tartalom (legalább havi 2 cikk Bogotá fitnesz témában)

**Blog témák (javaslat):**
- "Los mejores gimnasios en Chapinero 2026"
- "Diferencia entre CrossFit y gimnasio tradicional en Bogotá"
- "Cuánto cuesta el gimnasio en Bogotá"

---

### 3. Fázis – Teljes skála (2026-11-17 →)

**Cél:** Minden oldal indexelve, hosszú farok kulcsszavak lefedése.

**Mit indexelünk:**
- Maradék gym profilok (minimum quality bar teljesítése után)
- Összes lokalidad × kategória kombináció
- Keresési intention alapú landing oldalak

---

## ⚠️ Adatminőség – publish_queue.json tisztítása

A `publish_queue.json` a Google Places "gimnasio" keresés alapján lett generálva. Ez pontatlan – a Places API kulturális és közösségi centrumokat is visszaad, ha az épületben fitnesz-funkció is van.

### Ismert hamis gym típusok
| Típus | Példa | Jel |
|---|---|---|
| Kulturális központ | Centro Felicidad (CEFE) | Google: "Kulturális központ", üzemelteti: Secretaría de Cultura |
| Közösségi ház | — | Google: "Közösségi központ" |
| Hotel fitness szoba | — | Google: "Szálloda", fitnesz terem a leírásban |
| Iskola tornacsarnok | — | Google: "Általános iskola" / "Colegio" |
| Katonai / rendőrségi sportlétesítmény | — | Zárt belépés, nem publikus |

### Ellenőrzési folyamat publikálás előtt
1. **Google Maps kategória**: a vállalkozás elsődleges kategóriája legyen "Gimnasio" vagy "Fitness center" – ha "Kulturális központ", "Szálloda", "Iskola" stb. → kizárni
2. **Fotók szemrevételezése**: edzőtermi felszerelés látszik-e? (lásd: képellenőrzési standard)
3. **Weboldal ellenőrzése**: van-e saját gym weboldal tagságvásárlással?
4. **publish_queue-ból kizárás**: `published_at: null`, `scheduled_at: null`

### Becsült arány
Az 1625 fős queue-ban várhatóan 5–15% hamis vagy nem-publikus gym. Prioritás: a magas review_count-os gymeknél kisebb a kockázat (nagy, valódi edzőtermek), az alacsony értékelésű bejegyzéseknél magasabb.

---

## Backlink stratégia

**Prioritás sorrend (Bogotá-fókusz):**

1. **Lokális médium és blogok** – Bogotá-specifikus lifestyle blogok, El Tiempo, Semana egészség rovat
2. **Gym tulajdonosok saját weboldalai** – "Enlistados en GymBogotá.co" badge + link
3. **Fitness influencerek** (Instagram + TikTok Bogotá fitness creators) – ne fizetett, hanem értékalapú
4. **Localidad.com / City guides** – ingyen direktória linkek
5. **Google Business Profile** – minden gym-nél töltsd ki a website mezőt gymbogota.co-ra is

**Kerülendő:**
- Tömeges direktória link building
- PBN (private blog network) linkek
- Fizetett cikkek "dofollow" linkkel (Google spam policy)

---

## Kép SEO – kötelező elemek

Minden gym profilon, ahol van fotó:

### 1. `<img>` alt szöveg
```html
<img src="{photo_url}" alt="{gym.name}" />
```
- Kötelező, nem maradhat üres
- Format: a gym neve (nem kulcsszó-stuffing!)

### 2. Open Graph + Twitter Card meta tagek (`generateMetadata`)
```ts
openGraph: {
  images: [{ url: photo_urls[0], width: 800, alt: gym.name }],
  type: 'website',
  siteName: city.siteName,
  locale: city.lang,   // pl. 'es-CO', 'es-MX'
},
twitter: {
  card: 'summary_large_image',   // ha van kép; különben 'summary'
  images: [photo_urls[0]],
},
```

### 3. JSON-LD `image` mező (Schema.org)
```json
{
  "@type": "SportsActivityLocation",
  "image": ["https://lh3.googleusercontent.com/..."],
  ...
}
```
- Az `image` tömb tartalmazza az összes elérhető photo_url-t (max 3)
- Google Rich Results test validálandó minden új gym típusnál

### 4. `photo_urls` a statikus adatban
- A `gym-static-data.json` generálásakor minden gymnél le kell kérdezni a Google Places Photos API-t
- Endpoint: `GET https://places.googleapis.com/v1/{photoName}/media?maxWidthPx=800&key={API_KEY}`
- Tárolás: `photo_urls: string[]` mező a JSON-ban (max 3 URL)
- API kulcs: `GOOGLE_PLACES_API_KEY` (gymbook-api `.env` és Railway env)

### ⚠️ Kötelező kézi képellenőrzés publikálás előtt
A Google Places fotók **nem mindig a gymről szólnak** – különösen ha a gym egy nagyobb létesítmény (kulturális központ, hotel, bevásárlóközpont) része. Ebben az esetben a Google Maps fotói az épület más területeit is mutathatják (pl. nézőtér, lobby, étterem).

**Szabály:**
- Publikálás előtt minden gym első fotóját SZEMREVÉTELEZÉSSEL kell ellenőrizni
- Ha a fotó nem a gymről szól → `photo_urls: []` (üres tömb) → emoji placeholder jelenik meg
- Jobb az emoji placeholder, mint egy félrevezető kép
- Alternatíva: manuálisan töltsd fel a megfelelő képet a gym admin felületen

---

## Schema markup kötelező elemek

Minden gym profilon:

```json
{
  "@context": "https://schema.org",
  "@type": "SportsActivityLocation",
  "name": "Gym neve",
  "image": ["https://lh3.googleusercontent.com/..."],
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "...",
    "addressLocality": "Bogotá",
    "addressCountry": "CO"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "...",
    "longitude": "..."
  },
  "telephone": "...",
  "url": "https://gymbogota.co/gimnasios/slug",
  "openingHoursSpecification": [...],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.5",
    "reviewCount": "120"
  }
}
```

Hub oldalakra (LocalBusiness helyett BreadcrumbList + ItemList):

```json
{
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Mejores gimnasios en Chapinero, Bogotá",
  "itemListElement": [...]
}
```

---

## Internal linking – Hub & Spoke modell

```
Főoldal
├── /localidades/ (hub)
│   ├── /chapinero/ (spoke) → gym profilok
│   ├── /usaquén/ (spoke)
│   └── ...
├── /categorias/ (hub)
│   ├── /gimnasios/ (spoke)
│   ├── /crossfit/ (spoke)
│   └── ...
└── /blog/ (hub)
    └── [cikkek visszalinknek a spoke oldalakra]
```

**Szabály:** Minden gym profil linkeljen vissza saját localidad + kategória oldalára. Minden localidad oldal linkeljen a főoldalra.

---

## Google Search Console – azonnali teendők

1. Regisztráció: search.google.com/search-console → Add property → Domain
2. DNS TXT rekord hitelesítés (Cloudflare/domain kezelő)
3. Sitemap beküldés: `https://gymbogota.co/sitemap.xml`
4. **Core Web Vitals figyelés** – Next.js statikus build = jó alapból, de ellenőrizd
5. Heti GSC ellenőrzés – Coverage hibák, Manual Actions panel

---

## Mikor tekinthető sikeresnek a Sandbox periódus?

- **3. hónap vége** (2026-08-17): GSC-ben első organikus kattintások
- **6. hónap** (2026-11-17): 500+ organikus kattintás/hó, ha a 2. fázis tartalma kész
- **12. hónap** (2027-05-17): 5000+ organikus kattintás/hó = komoly direktória forgalom

---

## Ami garantáltan nem működik

| ❌ Elkerülendő | Miért |
|---|---|
| Minden oldal egyszerre indexelve | Thin content → spam filter |
| AI-generált leírások emberi szerkesztés nélkül | Scaled content abuse policy |
| Tömeges link vásárlás | Penguin penalty |
| Kulcsszó stuffing a title/h1-ben | On-page spam |
| Valós felhasználói értékelések nélkül indulni | Trust jelek hiánya |
