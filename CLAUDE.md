@AGENTS.md

## ⚠️ KÖTELEZŐ: Publikálási és SEO stratégia

**Minden tartalom-publikálási döntés előtt olvasd el:**  
[`docs/publikálási-stratégia.md`](docs/publikálási-stratégia.md)

**Ezt a stratégiát KÖTELEZŐ alkalmazni** minden új oldal, gym profil, kategória-oldal vagy lokalidad-oldal indexelésekor.

**Indulás dátuma:** 2026-05-17 (ebből számítjuk a Google Sandbox periódust és a fázishatárokat)

**Legfontosabb szabályok (részletek a fenti dokumentumban):**
- Thin content tilos indexelni (üres/félkész profilok → `noindex`)
- 3 fázisú ütemterv: Alap (3 hónap) → Növekedés (3 hónap) → Teljes skála
- LocalBusiness / SportsActivityLocation Schema markup minden gym profilon
- Google Search Console beállítása az első naptól
- Fázisváltás csak mérhetőható organikus forgalom után

---

## ⚠️ LocalidadPage — kritikus kódszabályok (gymbogota-specifikus)

### 1. Meta description DESC template

❌ **TILOS** — `stats.value` puszta szám kontextus főnév nélkül:
```tsx
// "50+ en Chapinero, Bogotá." → Googlenak értelmetlen!
const DESC = `${eventos.stats[0].value} en ${nombre}, Bogotá.`
```
✅ **KÖTELEZŐ** — mindig jön kontextus főnév a szám után:
```tsx
// "50+ eventos al año en Chapinero, Bogotá."
const DESC = `${eventos.stats[0].value} eventos al año en ${nombre}, Bogotá.`
```
**Megjegyezni:** Ha `stats[N].value` = `"50+"`, az önmagában semmit nem mond — add hozzá, hogy mik ezek.

### 2. Meta description hossz mérése

```bash
# MINDIG python3-mal mérj — wc -c BÁJT, nem karakter! UTF-8 ékezetek felülbecslést okoznak.
python3 -c "print(len('A leírás szövege'))"
# SEO limit: ≤ 160 unicode karakter
```

### 3. Adathozzáférés — gymbogota struktúra ⚠️

**A `vecinos` és `categoriaLinks` NINCS top-level szinten** — minden kategória-objektumba be van másolva!

```tsx
// ❌ HIBÁS — chapineroContent.vecinos nem létezik!
vecinos={chapineroContent.vecinos}

// ✅ HELYES — a section-ből kell venni
const section = chapineroContent.gimnasios  // vagy estudios, stb.
vecinos={section.vecinos}
categoriaLinks={section.categoriaLinks}

// A h1 és metaDesc is a data fájlból jön:
// metadata: { title: section.h1, description: section.metaDesc }
```

### 4. Teljes LocalidadPage integráció → ld. checklist

`docs/uj-portal-inditasi-checklist.md` — **8. fejezet** tartalmazza az összes portál adatstruktúráját, a LocalidadPageProps interfészt és az élő audit parancsokat.

---

## ⚠️ SEO / OG / AEO — kötelező szabályok (2026-05-29 frissítve)

**Teljes referencia:** `docs/uj-portal-inditasi-checklist.md` — **9. fejezet**

### Gyors emlékeztető — leggyakoribb hibák:

| Hiba | Helyes |
|---|---|
| `locale: city.lang` | `locale: city.lang.replace('-', '_')` — OG spec aláhúzást vár |
| Hiányzó `openGraph:` egy page.tsx-ből | `openGraph: baseOpenGraph({...})` — NEM örökölhető layout-ból |
| Hiányzó `twitter:` egy page.tsx-ből | `twitter: { card: 'summary_large_image' as const, images: [OG_IMAGE] }` |
| `ItemList` ListItem url nélkül | `url: \`\${city.baseUrl}/\${SLUG}/\${loc.slug}/\`` hozzáadandó |
| Hardcode brand: `GymBogota.co` | `${city.siteName}` — minden utility page.tsx-ben |
| Raw Unsplash URL metadata-ban | `import { OG_IMAGE } from '@/lib/metadata'` — konstans |
| `IN_LANGUAGE`, `ADDRESS_COUNTRY`, `CITY_NAME_LONG` konstansok | Törölve! → `city.lang`, `city.country`, `city.name` |

### Audit futtatása deploy előtt:

```bash
# Gyors sweep — 0 issue = kész, bármi más = javítani kell
python3 << 'EOF'
import os, glob, re
base = '/Users/bathoriistvan/Desktop/gym-portalok'
portals = ['gymbogota', 'gymcaba', 'gymcdmx', 'gymlima', 'gymsantiago']
issues = []
for portal in portals:
    portal_base = f"{base}/{portal}-frontend/src"
    for path in glob.glob(f"{portal_base}/**/*.tsx", recursive=True):
        with open(path) as f: content = f.read()
        rel = path.replace(portal_base + '/', f'{portal}/')
        if re.search(r"locale: city\.lang(?!\.replace)", content): issues.append(f"❌ locale hyphen: {rel}")
        if 'export const metadata' in content and 'openGraph:' not in content and 'layout.tsx' not in path: issues.append(f"❌ missing openGraph: {rel}")
        if 'export const metadata' in content and 'twitter:' not in content and 'layout.tsx' not in path: issues.append(f"❌ missing twitter: {rel}")
        for brand in ['GymCABA.com', 'GymCDMX.mx', 'GymLima.com', 'GymSantiago.com', 'GymBogota.co']:
            if brand in content: issues.append(f"⚠️  hardcoded brand: {rel}")
        if "'@type': 'ItemList'" in content and "url: `${city.baseUrl}" not in content: issues.append(f"⚠️  ItemList no url: {rel}")
print('\n'.join(issues) if issues else "✅ CLEAN — zero issues across all 5 portals.")
EOF
```
