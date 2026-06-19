# Új gym portál indítási checklist

> Referencia: az első 5 portálon (gymbogota, gymcaba, gymcdmx, gymlima, gymsantiago) szerzett tapasztalatok alapján.  
> Minden új portálnál ezt kövesd **sorban** — ha valami kimarad, utólag kell visszamenni és javítani.

---

## 1. Repo létrehozás és alap konfig

```bash
# Másold le a gymbogota-frontend-et (ez a referencia)
cp -r gymbogota-frontend gym[varos]-frontend
cd gym[varos]-frontend

# Töröld a git history-t, kezdj frissről
rm -rf .git
git init && git add -A && git commit -m "init: [varos] portál alap"
```

**Módosítandó fájlok:**

| Fájl | Mit kell átírni |
|---|---|
| `src/config/city.ts` | `name`, `siteName`, `baseUrl`, `lang`, `country`, `flag` |
| `src/data/bogota/content.ts` | Teljes tartalom (ld. 4. pont) |
| `public/favicon.ico` | Város-specifikus (opcionális) |
| `package.json` | `"name"` mező |

---

## 2. Teljesítmény – KÖTELEZŐ beépíteni az első perctől

Ezek **nem utólagos optimalizációk** — az első commit része kell legyenek.

### 2a. `src/app/layout.tsx` — helyes minta

```tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'   // ← self-hosted font, NEM CDN link!
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '700'],   // ← csak 2 súly! 400+700 elég, 600+800 felesleges letöltés
  display: 'swap',
})

// ... metadata ...

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={city.lang}>
      <head>
        {/* Hero kép preload — LCP-hez kritikus */}
        <link
          rel="preload"
          as="image"
          href="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&q=80&fm=webp&auto=format"
          fetchPriority="high"
        />
      </head>
      <body className={inter.className}>
        <Header />
        <main>{children}</main>
        <Footer />
        <BottomNav />
      </body>
    </html>
  )
}
```

**Mi és miért:**
- `next/font/google` → a Next.js build-időben letölti a fontot és `/_next/static/media/` alá rakja. Nincs külső CDN-hívás, nincs render-blocking. **Soha ne használj `<link href="https://fonts.googleapis.com/...">` taget!**
- `fetchPriority="high"` preload → a böngésző az első HTML parse során már tudja, hogy a hero kép fontos, azonnal elkezdi tölteni. Nélküle a CSS background-image csak a stylesheet parse után derül ki → magas LCP.

### 2b. `public/_headers` — Cloudflare Pages cache

Hozd létre ezt a fájlt (pontos másolat, módosítás nélkül):

```
/*
  X-Content-Type-Options: nosniff
  X-Frame-Options: DENY
  Referrer-Policy: strict-origin-when-cross-origin
  Strict-Transport-Security: max-age=31536000; includeSubDomains; preload

/*.html
  Cache-Control: public, max-age=0, must-revalidate

/_next/static/*
  Cache-Control: public, max-age=31536000, immutable

/*.js
  Cache-Control: public, max-age=31536000, immutable

/*.css
  Cache-Control: public, max-age=31536000, immutable
```

**Hatás:**
- `Strict-Transport-Security` → HSTS: a böngésző a következő 1 évben soha nem próbál HTTP-n csatlakozni, még ha az URL http://-vel kezdődik is. SEO szignál, Chrome preload lista előfeltétel.
- A Next.js által generált hash-es statikus fájlok (JS/CSS/font) egy évig cachelve lesznek a Cloudflare edge-en → visszatérő látogatóknál ~0ms betöltési idő ezekre.

### 2c. Hero kép — városonként specifikus

Az első 5 portálnál ugyanaz az Unsplash gym kép van mindenhol (`photo-1534438327276-14e5300c3a48`). Az E-E-A-T és a hitelesség szempontjából jobb, ha városonként más.

**Optimális Unsplash URL formátum:**
```
https://images.unsplash.com/photo-XXXXXXXXXX?w=800&q=80&fm=webp&auto=format
```
- `w=800` — elegendő mobilra (412px viewport × 2x DPR = 824px), kisebb fájl = jobb LCP
- `fm=webp` — WebP formátum (~40% kisebb JPEG-nél)
- `q=80` — jó minőség, kis méret

**Elért PageSpeed eredmény ezekkel a beállításokkal (gymbogota.co, 2026-05-27):**
- Performance: **96** | Accessibility: **100** | Best Practices: **100** | SEO: **100**
- FCP: 0.9s | LCP: 2.7s | TBT: 60ms | CLS: 0 | Speed Index: 2.2s

Frissítsd a preload `href`-et **és** a CSS background URL-t is ugyanerre — karakterre egyezzenek!

---

## 3. GitHub Actions deploy (Cloudflare Pages)

Hozd létre: `.github/workflows/deploy.yml`

```yaml
name: Deploy to Cloudflare Pages

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm run build
      - uses: cloudflare/wrangler-action@v3
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
          command: pages deploy out --project-name=gym[varos]-frontend
```

**Secrets** (GitHub repo → Settings → Secrets):
- `CLOUDFLARE_API_TOKEN` — ugyanaz mint a többi portálnál
- `CLOUDFLARE_ACCOUNT_ID` — ugyanaz

**Cloudflare Pages projekt létrehozás** (egyszeri):
```bash
npx wrangler pages project create gym[varos]-frontend
```

---

## 4. Tartalom — személyes hangvételű szerző

Minden portálnak van egy névvel rendelkező szerzője (E-E-A-T stratégia):

| Portál | Szerző | Persona |
|---|---|---|
| gymbogota.co | Sebastián | Bogotái fitness enthuziasta |
| gymcaba.com | Matías | Buenos Aires-i sportoló |
| gymcdmx.com | Rodrigo | México City-i edzésmániás |
| gymlima.com | Camila | Limai wellness coach |
| gymsantiago.com | Tomás | Santiago-i triatlonos |

Az új portálokhoz is hasonló személyt kell alkotni:
- Valószerű latin-amerikai név
- A városhoz kötődő háttér
- Az `intro` mezőkben első személyű hang ("Yo descubrí...", "En mi barrio...", "Llevo años...")

**Content fájl helye:** `src/data/bogota/content.ts` (minden portálban `bogota` marad a mappa neve — csak a tartalom változik)

Referencia: `gymbogota-frontend/docs/publishing-voice-gymbogota.md`

---

## 5. Ellenőrzőlista deploy előtt

```
[ ] city.ts — helyes domain, név, lang, country
[ ] layout.tsx — next/font/google (NEM googleapis CDN link), weight: ['400', '700']
[ ] layout.tsx — hero kép preload (fetchPriority="high"), URL = HeroSearch.tsx URL-lel AZONOS
[ ] HeroSearch.tsx — background URL ?w=800&q=80&fm=webp&auto=format (NEM ?w=1600, NEM ?w=1200)
[ ] HeroSearch.tsx — <select> rendelkezik aria-label attribútummal
[ ] Footer.tsx — section fejlécek <p fontWeight:700> tagek (NEM <h4> — heading hierarchy hiba)
[ ] globals.css — .header-cta és .hero-search-btn background: #c45200 (NEM var(--orange) = #ff7a1a)
[ ] public/_headers — létezik és tartalmazza a cache szabályokat
[ ] .github/workflows/deploy.yml — helyes project-name
[ ] Cloudflare Pages projekt létrehozva
[ ] GitHub Secrets beállítva (CLOUDFLARE_API_TOKEN, CLOUDFLARE_ACCOUNT_ID)
[ ] content.ts — személyes hangvételű introk (5 kategória)
[ ] Hero kép — városspecifikus Unsplash URL

— LocalidadPage specifikus —
[ ] LocalidadPage.tsx — AUTOR_NOMBRE, VECINOS_LABEL portal-specifikus értékek (IN_LANGUAGE/ADDRESS_COUNTRY/CITY_NAME_LONG → automatikus city.* alapján)
[ ] LocalidadPage.tsx — IMPLEMENTED_LOCALIDADES Set tartalmazza az élő slug-okat
[ ] page.tsx (minden kategória) — DESC template: stats.value után MINDIG kontextus főnév (ld. 8. fejezet!)
[ ] page.tsx (minden kategória) — Meta description hossza ≤ 160 unicode karakter: python3 -c "print(len('szöveg'))"
[ ] page.tsx (minden kategória) — vecinos és categoriaLinks adathozzáférés helyes az adott portál struktúrájához (ld. 8. fejezet!)
[ ] TypeScript: npx tsc --noEmit — 0 hiba

— SEO / OG / AEO ellenőrzés (ld. 9. fejezet) —
[ ] layout.tsx — locale: city.lang.replace('-', '_') (aláhúzás, NEM kötőjel — OG spec!)
[ ] layout.tsx — OG_IMAGE konstans használata (NEM raw Unsplash URL)
[ ] MINDEN page.tsx — openGraph: baseOpenGraph({...}) — NEM inline objektum, NEM csak layout-ra hagyatkozva
[ ] MINDEN page.tsx — twitter: { card: 'summary_large_image', images: [OG_IMAGE] } — explicit, NEM csak layout-ból örökölve
[ ] MINDEN page.tsx — alternates: { canonical: ... } trailing slash-sal
[ ] Kategória page.tsx (gimnasios/estudios/eventos/entrenadores/bienestar) — ItemList ListItem tartalmaz url mezőt
[ ] Localidad page.tsx (MINDEN kategória, NEM csak gimnasios) — twitter: card hozzáadva
[ ] Blog/faq/contacto/privacidad/terminos/sobre-nosotros/agregar-negocio — city.siteName dinamikus (NEM hardcode)
[ ] Automata audit szkript futtatása: python3 scripts/seo_audit.py (ld. 9. fejezet)
```

---

## 6. Deploy utáni ellenőrzés

### 6a. Technikai ellenőrzések

1. **PageSpeed Insights**: `https://pagespeed.web.dev/analysis?url=https://gym[varos].com/`
   - Célérték: Performance **≥ 85** (mobile), LCP **< 2.5s**
   - Ha az LCP magas: ellenőrizd a preload taget és a hero kép URL-t

2. **Cloudflare headers**: `curl -sI https://gym[varos].com/ | grep -E "(cache|x-content|x-frame)"`
   - Kell látni: `x-content-type-options: nosniff`, `x-frame-options: DENY`

3. **Font CDN mentes**: `curl -sL https://gym[varos].com/ | grep googleapis`
   - Üres outputot kell kapni — ha megjelenik a googleapis.com, a layout.tsx-et javítani kell

4. **Hero URL egyezés ellenőrzés** (kritikus!):
   ```bash
   # Preload URL a live HTML-ben:
   curl -sL https://gym[varos].com/ | grep -o 'preload.*unsplash[^"]*'
   # CSS background URL a HeroSearch.tsx-ben:
   grep "unsplash" src/components/home/HeroSearch.tsx
   ```
   A két URL-nek **karakterre pontosan** meg kell egyeznie — különben a böngésző kétszer tölti le a képet, és a preload teljesen hiábavaló (sőt ront a score-on!).

### 6b. Tartalom és SEO élő audit (minden LocalidadPage deploy után)

Ezeket a parancsokat **mindig futtasd le** mielőtt befejezettnek nyilvánítod a munkát.
Cseréld `[DOMAIN]`-t (pl. `gymbogota.co`) és `[SLUG]`-ot (pl. `chapinero`) a megfelelő értékekre.

```bash
# 1. Mind az 5 kategóriaoldal HTTP státusza — mind 200-at kell mutatni
for cat in gimnasios estudios entrenadores eventos bienestar; do
  status=$(curl -s -o /dev/null -w "%{http_code}" "https://[DOMAIN]/${cat}/[SLUG]/")
  echo "${cat}: ${status}"
done

# 2. H1 tagek — portal-specifikus, nincs cross-portal szivárgás
for cat in gimnasios estudios entrenadores eventos bienestar; do
  h1=$(curl -s "https://[DOMAIN]/${cat}/[SLUG]/" | grep -o '<h1[^>]*>[^<]*</h1>' | sed 's/<[^>]*>//g')
  echo "${cat}: ${h1}"
done

# 3. Meta description karakterhossz (≤ 160 unicode char!)
for cat in gimnasios estudios entrenadores eventos bienestar; do
  desc=$(curl -s "https://[DOMAIN]/${cat}/[SLUG]/" | grep -o '<meta name="description" content="[^"]*"' | sed 's/.*content="//;s/"//')
  len=$(python3 -c "print(len('${desc}'))")
  flag=$([ "$len" -gt 160 ] && echo "⚠️  TÚLLÉP!" || echo "✅")
  echo "${cat}: ${len} char ${flag}"
done

# 4. Canonical URL helyesség
for cat in gimnasios estudios entrenadores eventos bienestar; do
  canonical=$(curl -s "https://[DOMAIN]/${cat}/[SLUG]/" | grep -o 'rel="canonical" href="[^"]*"' | sed 's/.*href="//;s/"//')
  expected="https://[DOMAIN]/${cat}/[SLUG]/"
  [ "$canonical" = "$expected" ] && echo "✅ ${cat}" || echo "⚠️  ${cat}: got $canonical"
done

# 5. Cross-portal szivárgás ellenőrzése (cseréld a leak-szavakat a szomszéd portálok neveire!)
# Pl. gymbogota esetén: Palermo, Cuauhtémoc, Miraflores, Las Condes
curl -s "https://[DOMAIN]/gimnasios/[SLUG]/" | grep -o "Palermo\|Cuauhtémoc\|Miraflores\|Las Condes" | sort -u \
  && echo "⚠️  SZIVÁRGÁS TALÁLVA!" || echo "✅ Nincs cross-portal szivárgás"

# 6. JSON-LD sémák jelenléte
curl -s "https://[DOMAIN]/gimnasios/[SLUG]/" | python3 -c "
import sys, json, re
html = sys.stdin.read()
schemas = re.findall(r'<script type=\"application/ld\+json\">(.*?)</script>', html, re.DOTALL)
found = [json.loads(s).get('@type','?') for s in schemas if s.strip()]
print('Sémák:', found)
# Kellene: Article, ItemList, FAQPage, BreadcrumbList
"

# 7. Sitemap URL-szám
count=$(curl -s "https://[DOMAIN]/sitemap.xml" | grep -c "<url>")
echo "Sitemap: ${count} URL (várt: 18)"

# 8. Szerző neve, szomszédok felirata, sobreBarrio fejléc
curl -s "https://[DOMAIN]/gimnasios/[SLUG]/" | grep -o "Por <strong>[^<]*</strong>"
curl -s "https://[DOMAIN]/gimnasios/[SLUG]/" | grep -o "Localidades cercanas\|Barrios vecinos\|Alcaldías vecinas\|Distritos cercanos\|Comunas cercanas"
curl -s "https://[DOMAIN]/gimnasios/[SLUG]/" | grep -o "el barrio\|la alcaldía\|el distrito\|la comuna"
```

---

## 7. Tipikus hibák (amit az első 5 portálnál tanultunk)

| Hiba | Tünet | Javítás |
|---|---|---|
| Google Fonts CDN maradt | PageSpeed: "Eliminate render-blocking resources", LCP magas | `layout.tsx`: cseréld `next/font/google`-ra |
| Nincs hero preload | LCP > 3s, "Largest Contentful Paint image was not prioritized" | `<link rel="preload" as="image" fetchPriority="high">` a `<head>`-be |
| **Hero preload URL ≠ CSS background URL** | **LCP nem javul, score csökkent (75→65), dupla kép-letöltés** | **`HeroSearch.tsx` background URL-t igazítsd a `layout.tsx` preload URL-hez — karakterre pontosan** |
| Túl sok font weight | Felesleges font fájlok letöltve | `layout.tsx`: csak `['400', '700']` kell, ne `['400', '600', '700', '800']` |
| `<select>` nincs label | Accessibility 88, "kijelölt elemekhez nem tartoznak címkeelemek" | `HeroSearch.tsx` `<select>`-re: `aria-label="Selecciona una localidad"` |
| `<h4>` a footer-ben | Accessibility: "fejlécelemek nem csökkenő sorrendben" (h1→h4 ugrás) | `Footer.tsx`: `<h4>` → `<p style={{fontWeight:700,...}}>` |
| Narancs gombok kontrasztja | Accessibility: "nem megfelelő kontrasztarány", `#ff7a1a` fehér szöveggel = 2.6:1 (kell: 4.5:1) | `globals.css`: `.header-cta`, `.hero-search-btn` → `background: #c45200` |
| Hiányzó `_headers` | Cloudflare nem cacheli a statikus fájlokat | `public/_headers` létrehozása |
| Régi path a server.py-ban | Dashboard: "publish_queue.json not found" | `gymportal-dashboard/server.py` → `PUBLISHING_PORTALS` dict frissítése |
| Alembic migration nem futott | API: `relation "gyms" does not exist` | `docker compose exec db psql -U gymbook -d gymbook < schema.sql` |
| **DESC bare szám kontextus nélkül** | **"50+ en Las Condes, Santiago." — Google számára értelmetlen, CTR romlik** | **`stats[N].value` után mindig jön kontextus főnév: `${eventos.stats[0].value} eventos al año en...`** |
| **Meta description hossz `wc -c`-vel mérve** | **163-nak mutat, valójában 157 unicode char — felesleges rövidítés** | **Mindig `python3 -c "print(len('szöveg'))"` — `wc -c` bájtot mér, UTF-8 ékezeteknél felülbecsül** |
| **vecinos/categoriaLinks rossz szintről** | **TypeScript hiba vagy futásidőn üres vecinos lista** | **Bogotá/CABA: `section.vecinos`; CDMX/Lima/Santiago: `localidadContent.vecinos` (ld. 8. fejezet!)** |
| **CDMX `canonicalUrl` prop** | **TypeScript: 'canonicalUrl' does not exist in type** | **Az új LocalidadPage interfész nem fogad `canonicalUrl`-t — távolítsd el a page.tsx-ből** |
| **Lima/Santiago régi `localidad`+`section` props** | **TypeScript: Object literal may only specify known properties** | **Az új interfész lapos props-okat vár: `h1`, `intro`, `stats`, `faq` külön-külön** |
| **`og:locale` kötőjel formátum** | **Facebook/OG debugger warning: invalid locale `es-CO`** | **`layout.tsx` és minden `page.tsx`: `locale: city.lang.replace('-', '_')` — az OG spec aláhúzást vár (`es_CO`), a BCP47 (schema.org) kötőjelet (`es-CO`) — nem keverendő!** |
| **`openGraph:` hiányzik egyes oldalakon** | **Twitter/X kártya nem jelenik meg, Google Discover kizárás** | **Next.js `openGraph` NEM öröklődik automatikusan a layout-ból! Minden `page.tsx`-ben kötelező: `openGraph: baseOpenGraph({...})`** |
| **`twitter:` hiányzik egyes oldalakon** | **Twitter card nem jelenik meg, X/LinkedIn preview generikus** | **Minden `page.tsx`-ben explicit: `twitter: { card: 'summary_large_image' as const, images: [OG_IMAGE] }` — a layout-ból való öröklés megbízhatatlan** |
| **`ItemList` ListItem url nélkül** | **Google Rich Results Test: ListItem missing required field `url`** | **Minden kategória page.tsx ItemList-ben: `url: \`\${city.baseUrl}/\${SLUG}/\${loc.slug}/\`` hozzáadandó** |
| **Localidad page nem-gimnasios kategóriák twitter nélkül** | **20 oldal hiányzó Twitter card (estudios/eventos/entrenadores/bienestar × 5 portál)** | **Minden nem-gimnasios lokalidad page.tsx-be: `twitter: { card: 'summary_large_image' as const, images: [OG_IMAGE] }`** |
| **Hardcode brand név utility oldalakon** | **Portál klónozásnál a GymXxx.com szöveg megmarad a céldomain helyett** | **blog/faq/contacto/privacidad/terminos/sobre-nosotros/agregar-negocio: minden brand hivatkozás → `${city.siteName}` template literal** |
| **`Article.image` hardcode Unsplash URL** | **OG_IMAGE URL változásakor 1 helyen kell frissíteni, nem N helyen** | **`LocalidadPage.tsx`: `image: OG_IMAGE` (nem raw URL string)** |
| **`layout.tsx` raw Unsplash URL** | **OG_IMAGE URL változásakor nem frissül automatikusan** | **`layout.tsx`: `import { OG_IMAGE } from '@/lib/metadata'`, majd `images: [OG_IMAGE]` mindkét helyen** |
| **Homepage cím >60 karakter** | **Google SERPs csonkítja a title taget (~60 char limit)** | **Rövidítés: "Gimnasios en Ciudad de México" (30ch) + `\| ${city.siteName}` (13ch) → ~43ch; "Directorio fitness" felesleges ha a siteName már informatív** |

---

---

## 8. LocalidadPage integráció — teljes útmutató

> Ez a fejezet **kötelező olvasmány** minden új localidad-oldal írásához.  
> A `LocalidadPage` komponens egységes az 5 portálon — csak a konstansok és az adathozzáférés tér el.

### 8a. A komponens interfész (src/components/localidad/LocalidadPage.tsx)

```tsx
interface LocalidadPageProps {
  localidadNombre: string        // pl. "Chapinero"
  localidadSlug: string          // pl. "chapinero"
  categoriaSlug: string          // pl. "gimnasios"
  categoriaLabel: string         // pl. "Gimnasios"
  h1: string                     // teljes H1 szöveg — mindig explicit, sosem a komponens építi!
  intro: string                  // a főszöveg bekezdés (plain string, NEM JSX)
  stats: { label: string; value: string }[]
  vecinos: { name: string; slug: string }[]
  categoriaLinks: { slug: string; label: string }[]
  sobreBarrio: string            // a "Sobre X — el barrio/la comuna/..." szekció szövege
  publishDate: string            // "YYYY-MM-DD" formátum
  faq: { q: string; a: string }[]
  autorTip: string               // a szerző személyes tippje (1-3 mondat)
}
```

**Amit a komponens NEM vár (régi props — eltávolítandók ha megjelennek):**
- ~~`canonicalUrl`~~ — a canonical URL a page.tsx metadata-jából jön
- ~~`categoriaNombre`~~ — helyette `categoriaLabel`
- ~~`categoriaIcon`~~ — el lett távolítva
- ~~`localidad`~~ + ~~`section`~~ objektumok — lapos props váltotta fel

---

### 8b. Portal-specifikus konstansok (LocalidadPage.tsx tetején)

Minden portálon ezek a konstansok **eltérők** — soha ne másold át egyik portálból a másikba:

| Konstans | gymbogota | gymcaba | gymcdmx | gymlima | gymsantiago |
|---|---|---|---|---|---|
| `AUTOR_NOMBRE` | `'Sebastián'` | `'Matías'` | `'Rodrigo'` | `'Camila'` | `'Tomás'` |
| `VECINOS_LABEL` | `'Localidades cercanas'` | `'Barrios vecinos'` | `'Alcaldías vecinas'` | `'Distritos cercanos'` | `'Comunas cercanas'` |
| `IMPLEMENTED_LOCALIDADES` | `new Set(['chapinero'])` | `new Set(['palermo'])` | `new Set(['cuauhtemoc'])` | `new Set(['miraflores'])` | `new Set(['las-condes'])` |
| sobreBarrio fejléc | `— el barrio` | `— el barrio` | `— la alcaldía` | `— el distrito` | `— la comuna` |

> ⚠️ **Eltávolítva (2026-05-29):** `IN_LANGUAGE`, `ADDRESS_COUNTRY`, `CITY_NAME_LONG` — ezek a konstansok már **nem léteznek** a `LocalidadPage.tsx`-ben. Helyettük a komponens automatikusan `city.lang`, `city.country`, `city.name` értékeket használja a `city.ts` configból. **Ne add vissza ezeket a konstansokat!**

Az `IMPLEMENTED_LOCALIDADES` Set-be csak azok a slug-ok kerülnek, amelyek **ténylegesen meg vannak valósítva** (van page.tsx-ük). A többi szomszéd `<span>`-ként jelenik meg (nem kattintható), a set-ben lévők `<Link>`-ként.

---

### 8c. Adathozzáférési minták portálonként ⚠️

**Ez a leggyakoribb hibaforrás.** Az 5 portál adatfájlja eltérő struktúrával rendelkezik.

#### gymbogota-frontend (Chapinero)
Az adatfájl: `src/data/bogota/localidad-chapinero.ts`

```tsx
// A vecinos és categoriaLinks MINDEN kategória-objektumba BE VAN MÁSOLVA
// NEM létezik chapineroContent.vecinos top-level szinten!

const section = chapineroContent.gimnasios  // vagy estudios, entrenadores, stb.

<LocalidadPage
  h1={section.h1}                         // ← a data fájlból jön
  intro={section.intro}
  stats={section.stats}
  vecinos={section.vecinos}               // ← section szintjén!
  categoriaLinks={section.categoriaLinks} // ← section szintjén!
  sobreBarrio={chapineroContent.sobreBarrio}
  faq={section.faq}
  // autorTip és publishDate: hardcode-olva a page.tsx-ben
/>
```
> A `h1` és `metaDesc` is a data fájlból jön — a page.tsx `metadata` exportja `section.metaDesc`-et használ.

---

#### gymcaba-frontend (Palermo)
Az adatfájl: `src/data/bogota/localidad-palermo.ts`

```tsx
// Ugyanolyan struktúra mint Bogotánál — vecinos/categoriaLinks NESTED a section-be
// NEM létezik localidadContent.vecinos top-level szinten!

const section = localidadContent.gimnasios  // LocalidadCategoryContent

<LocalidadPage
  h1={section.h1}
  intro={section.intro}
  stats={section.stats}
  vecinos={section.vecinos}               // ← section szintjén!
  categoriaLinks={section.categoriaLinks} // ← section szintjén!
  sobreBarrio={localidadContent.sobreBarrio}
  faq={section.faq}
/>
```
> CABA-specifikus: a CTA `vos` formát használ — `"¿Tenés un negocio en...? Agregalo gratis"`. Ez a komponensben be van égetve, nem a page.tsx-ben.

---

#### gymcdmx-frontend (Cuauhtémoc)
Az adatfájl: `src/data/bogota/localidad-cuauhtemoc.ts`

```tsx
// ⚠️ TELJESEN ELTÉRŐ STRUKTÚRA!
// localidadContent.gimnasios → SIMA STRING (nem objektum!)
// localidadContent.stats.gimnasios → stats tömb (stats.{kategória} szintaxissal!)
// vecinos és categoriaLinks → TOP-LEVEL
// faq → külön exportált objektum: faq.gimnasios

import { localidadContent, faq } from '@/data/bogota/localidad-cuauhtemoc'

const CATEGORIA = 'gimnasios'

<LocalidadPage
  intro={localidadContent.gimnasios}          // ← direkt string!
  stats={localidadContent.stats.gimnasios}    // ← stats.{kategória}!
  vecinos={localidadContent.vecinos}          // ← TOP-LEVEL ✓
  categoriaLinks={localidadContent.categoriaLinks}  // ← TOP-LEVEL ✓
  sobreBarrio={localidadContent.sobreBarrio}
  faq={faq.gimnasios}                         // ← külön faq export!
  // h1, categoriaLabel, stb.: hardcode-olva a page.tsx-ben
/>
```

---

#### gymlima-frontend (Miraflores)
Az adatfájl: `src/data/bogota/localidad-miraflores.ts`

```tsx
// localidadContent.gimnasios → OBJEKTUM { titulo, intro, stats, faq, queEsperar, ... }
// vecinos és categoriaLinks → TOP-LEVEL

import { localidadContent } from '@/data/bogota/localidad-miraflores'

const section = localidadContent.gimnasios   // objektum, nem string!

<LocalidadPage
  intro={section.intro}
  stats={section.stats}
  vecinos={localidadContent.vecinos}           // ← TOP-LEVEL ✓
  categoriaLinks={localidadContent.categoriaLinks}  // ← TOP-LEVEL ✓
  sobreBarrio={localidadContent.sobreBarrio}
  faq={section.faq}
  // h1: hardcode-olva a page.tsx-ben
/>
```

---

#### gymsantiago-frontend (Las Condes)
Az adatfájl: `src/data/bogota/localidad-las-condes.ts`

```tsx
// localidadContent.gimnasios → OBJEKTUM { intro, stats, faq }
// vecinos és categoriaLinks → TOP-LEVEL
// Tipikus destructuring:

const { nombre, slug, gimnasios, vecinos, categoriaLinks, sobreBarrio } = localidadContent

<LocalidadPage
  localidadNombre={nombre}
  localidadSlug={slug}
  intro={gimnasios.intro}
  stats={gimnasios.stats}
  vecinos={vecinos}                    // ← TOP-LEVEL ✓
  categoriaLinks={categoriaLinks}      // ← TOP-LEVEL ✓
  sobreBarrio={sobreBarrio}
  faq={gimnasios.faq}
  // h1: hardcode-olva a page.tsx-ben
/>
```

---

### 8d. Meta description (DESC) sablon — kötelező szabályok

#### ❌ A leggyakoribb hiba: bare szám kontextus nélkül

```tsx
// ❌ HIBÁS — "50+ en Las Condes, Santiago." → Mit jelent a 50+? Google nem tudja.
const DESC = `${eventos.stats[0].value} en ${nombre}, Santiago. Trail runs...`

// ❌ HIBÁS — "45+ en Las Condes, Santiago." → Teljesen értelmetlen.
const DESC = `${bienestar.stats[0].value} en ${nombre}, Santiago. Kinesiología...`
```

#### ✅ Helyes minta: stats.value + kontextus főnév/kifejezés

```tsx
// ✅ HELYES — "50+ eventos al año en Las Condes, Santiago."
const DESC = `${eventos.stats[0].value} eventos al año en ${nombre}, Santiago. Trail runs...`

// ✅ HELYES — "45+ centros de bienestar en Las Condes, Santiago."
const DESC = `${bienestar.stats[0].value} centros de bienestar en ${nombre}, Santiago. Kinesiología...`

// ✅ HELYES — Szám helyett inkább mondattal kezd (Lima/CABA minta):
const DESC = `CrossFit, yoga y Pilates en Miraflores, Lima. Más de ${section.stats[0].value} estudios...`
```

**Szabály:** Ha a DESC `stats[N].value`-val kezdődik (pl. "50+", "168", "45+"), az önmagában SOHA nem elég — a rákövetkező szónak meg kell mondania, hogy mik ezek a számok.

#### Meta description hossz ellenőrzése

```bash
# Mindig python3-mal mérj — wc -c bájtot mér, UTF-8 ékezeteknél felülbecsül!
python3 -c "print(len('A leírás szövege itt'))"

# Példa: "Guía de los 165 gimnasios en Cuauhtémoc, CDMX..."
# wc -c → 163 (HAMIS)
# python3 → 157 unicode karakter (VALÓS)
# SEO limit: ≤ 160 unicode karakter
```

---

### 8e. Gyors refencia: mi hol van az egyes portálokon

| | gymbogota | gymcaba | gymcdmx | gymlima | gymsantiago |
|---|---|---|---|---|---|
| `section.intro` típusa | `string` | `string` | `localidadContent.gimnasios` **string** | `section.intro` string | `gimnasios.intro` string |
| stats hozzáférés | `section.stats` | `section.stats` | `localidadContent.stats.gimnasios` | `section.stats` | `gimnasios.stats` |
| vecinos hozzáférés | `section.vecinos` 🔴 nested | `section.vecinos` 🔴 nested | `localidadContent.vecinos` 🟢 top | `localidadContent.vecinos` 🟢 top | `vecinos` 🟢 top (destructured) |
| categoriaLinks | `section.categoriaLinks` 🔴 nested | `section.categoriaLinks` 🔴 nested | `localidadContent.categoriaLinks` 🟢 top | `localidadContent.categoriaLinks` 🟢 top | `categoriaLinks` 🟢 top (destructured) |
| faq hozzáférés | `section.faq` | `section.faq` | `faq.gimnasios` **külön import** | `section.faq` | `gimnasios.faq` |
| h1 forrása | `section.h1` | `section.h1` | hardcode page.tsx-ben | hardcode page.tsx-ben | hardcode page.tsx-ben |
| metaDesc forrása | `section.metaDesc` | `section.metaDesc` | hardcode DESC konstans | hardcode DESC konstans | hardcode DESC konstans |

---

## ⚠️ Hero preload szabály — részletes magyarázat

A leggyakoribb és legravaszabb hiba. A browser preload csak akkor működik, ha az URL **100%-ban azonos**:

```
# HELYES — azonos URL mindkét helyen:
layout.tsx preload:   ?w=1200&q=80&fm=webp&auto=format
HeroSearch.tsx CSS:   ?w=1200&q=80&fm=webp&auto=format  ✅

# HIBÁS — eltérő URL → dupla letöltés, preload hiábavaló:
layout.tsx preload:   ?w=1200&q=80&fm=webp&auto=format
HeroSearch.tsx CSS:   ?w=1600                            ❌
```

Ajánlott Unsplash URL formátum: `?w=1200&q=80&fm=webp&auto=format`
- `w=1200` elegendő mobil + asztali méretekhez (1600 felesleges, nagyobb fájl)
- `fm=webp` WebP formátum (~30% kisebb JPEG-nél)
- `q=80` jó minőség, kis méret (a sötét overlay-el úgyis alig látszik a különbség)
- `auto=format` Unsplash fallback ha WebP nem támogatott

---

## 9. SEO / OG / AEO szabványok — teljes referencia

> Hozzáadva: 2026-05-29 (Round 4–5 audit tanulságai alapján, 160 fájl × 5 portál)

### 9a. Open Graph locale — kötelező aláhúzás formátum

Az OG spec **aláhúzást** vár (`es_CO`), a BCP47 / schema.org **kötőjelet** (`es-CO`). Ne keverd!

```tsx
// ❌ HIBÁS — kötőjel az OG locale-ban
openGraph: { locale: city.lang, ... }          // city.lang = 'es-CO' → invalid OG locale

// ✅ HELYES — aláhúzás az OG locale-ban
openGraph: { locale: city.lang.replace('-', '_'), ... }  // → 'es_CO'

// ✅ HELYES — schema.org inLanguage (itt kötőjel a szabvány)
inLanguage: city.lang,   // → 'es-CO' (BCP47)
```

**Érintett helyek minden portálban:**
- `src/app/layout.tsx` — openGraph.locale
- `src/lib/metadata.ts` — `baseOpenGraph()` visszatérési értéke (már javítva: `city.lang.replace('-', '_')`)
- `src/app/gimnasios/[slug]/page.tsx` — minden metadata path

---

### 9b. `baseOpenGraph()` — kötelező minden page.tsx-ben

A Next.js **NEM örökíti** a layout-szintű `openGraph` objektumot az oldalakra. Ha egy `page.tsx`-ből hiányzik az `openGraph:`, a megosztott link nem tartalmaz og:title-t, og:image-t, og:siteName-t.

```tsx
// ❌ HIBÁS — csak layout.tsx-re hagyatkozni
export const metadata: Metadata = {
  title: 'Foo',
  description: 'Bar',
}

// ✅ HELYES — minden page.tsx-ben kötelező
import { baseOpenGraph, OG_IMAGE } from '@/lib/metadata'

export const metadata: Metadata = {
  title: 'Foo',
  description: 'Bar',
  alternates: { canonical: `${city.baseUrl}/foo/` },
  openGraph: baseOpenGraph({ title: 'Foo', description: 'Bar', url: `${city.baseUrl}/foo/` }),
  twitter: { card: 'summary_large_image' as const, images: [OG_IMAGE] },
}
```

**Szabály:** Minden `page.tsx`-ben (kivéve `layout.tsx`) kötelező:
1. `openGraph: baseOpenGraph({...})` — soha ne adj meg raw objektumot
2. `twitter: { card: 'summary_large_image' as const, images: [OG_IMAGE] }` — explicit
3. `alternates: { canonical: '...' }` — trailing slash-sal

---

### 9c. ItemList schema — kötelező `url` mező

Google Rich Results Test elvárja, hogy minden `ListItem` tartalmazzon `url` mezőt:

```tsx
// ❌ HIBÁS — url nélkül
itemListElement: localidades.slice(0, 8).map((loc, i) => ({
  '@type': 'ListItem',
  position: i + 1,
  name: `${cat.label} en ${loc.name}`,
})),

// ✅ HELYES — url mezővel
itemListElement: localidades.slice(0, 8).map((loc, i) => ({
  '@type': 'ListItem',
  position: i + 1,
  name: `${cat.label} en ${loc.name}`,
  url: `${city.baseUrl}/${SLUG}/${loc.slug}/`,
})),
```

---

### 9d. Nem-gimnasios localidad oldalak — kötelező twitter card

Az összes 5 kategória (gimnasios, estudios, eventos, entrenadores, bienestar) × összes localidad oldalra kell twitter card. Nem elég csak a gimnasios oldalakra.

```tsx
// src/app/estudios/[LOCALIDAD]/page.tsx — minta
import { baseOpenGraph, OG_IMAGE } from '@/lib/metadata'

export const metadata: Metadata = {
  ...
  openGraph: baseOpenGraph({ type: 'article', title: H1, description: DESC, url: `...` }),
  twitter: { card: 'summary_large_image' as const, images: [OG_IMAGE] },  // ← KÖTELEZŐ
}
```

---

### 9e. Dinamikus brand nevek — tilos a hardcode

Minden fájlban, ahol `GymXxx.com` szerepelne, a `city.siteName` értékét kell használni. Ez biztosítja, hogy portál-klónozásnál nem marad bent a régi brand.

```tsx
// ❌ HIBÁS — hardcode brand
description: `Agrega tu gimnasio a GymCABA.com de forma gratuita.`,
<h1>Blog GymCABA.com</h1>

// ✅ HELYES — dinamikus
description: `Agrega tu gimnasio a ${city.siteName} de forma gratuita.`,
<h1>Blog {city.siteName}</h1>
```

**Érintett oldalak minden portálnál:** `blog`, `faq`, `contacto`, `privacidad`, `terminos`, `sobre-nosotros`, `agregar-negocio`

---

### 9f. OG_IMAGE konstans — NEM raw URL

Az `OG_IMAGE` konstans a `src/lib/metadata.ts`-ben van definiálva. Ha az Unsplash URL-t bármikor cserélni kell, EGY helyen kell módosítani:

```tsx
// src/lib/metadata.ts
export const OG_IMAGE = 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&q=80&fm=webp&auto=format'
```

**Szabály:** Sehol ne szerepeljen raw Unsplash URL metadata-ban vagy schema-ban — mindig az `OG_IMAGE` konstanst importáld.

```tsx
// layout.tsx, page.tsx — KÖTELEZŐ import
import { OG_IMAGE } from '@/lib/metadata'

// LocalidadPage.tsx — Article.image
image: OG_IMAGE,  // ← NEM hardcode URL string
```

---

### 9g. Automata audit parancs — kötelező minden deploy előtt

```bash
python3 << 'EOF'
import os, glob, re

base = '/Users/bathoriistvan/Desktop/gym-portalok'
portals = ['gymbogota', 'gymcaba', 'gymcdmx', 'gymlima', 'gymsantiago']
OG_URL = "images.unsplash.com/photo-1534438327276"
issues = []

for portal in portals:
    portal_base = f"{base}/{portal}-frontend/src"
    for path in glob.glob(f"{portal_base}/**/*.tsx", recursive=True):
        with open(path) as f:
            content = f.read()
        rel = path.replace(portal_base + '/', f'{portal}/')

        if re.search(r"locale: city\.lang(?!\.replace)", content):
            issues.append(f"❌ locale hyphen: {rel}")
        if 'export const metadata' in content and 'openGraph:' not in content and 'layout.tsx' not in path:
            issues.append(f"❌ missing openGraph: {rel}")
        if 'export const metadata' in content and 'twitter:' not in content and 'layout.tsx' not in path:
            issues.append(f"❌ missing twitter: {rel}")
        if 'export const metadata' in content and 'canonical:' not in content and 'layout.tsx' not in path and '[slug]' not in path:
            issues.append(f"⚠️  missing canonical: {rel}")
        for brand in ['GymCABA.com', 'GymCDMX.mx', 'GymLima.com', 'GymSantiago.com', 'GymBogota.co']:
            if brand in content:
                issues.append(f"⚠️  hardcoded brand '{brand}': {rel}")
        if "'@type': 'ItemList'" in content and "url: `${city.baseUrl}" not in content:
            issues.append(f"⚠️  ItemList no url: {rel}")
        for i, line in enumerate(content.split('\n')):
            if OG_URL in line and 'background:' not in line and 'preload' not in line and 'OG_IMAGE' not in line:
                issues.append(f"⚠️  raw OG URL (line {i+1}): {rel}")

if issues:
    for i in issues: print(i)
    print(f"\n{'='*40}\n{len(issues)} issue(s) found!")
else:
    print("✅ CLEAN — zero issues across all 5 portals.")
EOF
```

**Elvárt eredmény minden commit előtt:** `✅ CLEAN — zero issues across all 5 portals.`

---

### 9h. Article schema — kötelező mezők (LocalidadPage.tsx)

A Google Discover és Google News eligibilitáshoz az Article schema minimálisan tartalmazza:

```json
{
  "@type": "Article",
  "headline": "...",
  "description": "...",
  "datePublished": "YYYY-MM-DD",
  "dateModified": "YYYY-MM-DD",
  "image": "https://...",
  "author": { "@type": "Person", "name": "Sebastián" },
  "publisher": {
    "@type": "Organization",
    "name": "GymBogota.co",
    "logo": { "@type": "ImageObject", "url": "https://gymbogota.co/logo.png", "width": 200, "height": 60 }
  },
  "inLanguage": "es-CO"
}
```

A `publisher.logo` **KÖTELEZŐ** a Google Discover eligibilitáshoz — ha hiányzik, kizárja az oldalt.

---

### 9i. Homepage title hossz — ≤ 60 karakter

```
Portál        | Title                                                    | Hossz
gymbogota.co  | Gimnasios en Bogotá – Directorio fitness | GymBogota.co | 56 ✅
gymcaba.com   | Gimnasios en Buenos Aires – Directorio fitness | GymCABA.com | 60 ✅
gymcdmx.mx    | Gimnasios y Fitness en Ciudad de México | GymCDMX.mx   | 52 ✅
gymlima.com   | Gimnasios en Lima – Directorio fitness | GymLima.com   | 52 ✅
gymsantiago.com | Gimnasios en Santiago – Directorio fitness | GymSantiago.com | 60 ✅
```

Mérési módszer:
```bash
python3 -c "print(len('Gimnasios en Ciudad de México – Directorio fitness | GymCDMX.mx'))"
# 63 → TOO LONG → Rövidíteni: 'Gimnasios y Fitness en Ciudad de México | GymCDMX.mx' = 52 ✅
```
