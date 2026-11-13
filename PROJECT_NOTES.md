# PROJECT NOTES — עלי שאראה בע״מ (marketing + catalog sample)

Last verified: 2026-11-13, git `main` — live at https://osamasla.github.io/sharara-marketing/

## 1. What this is

- Marketing/catalog site for **עלי שאראה בע״מ** — מסגרות מתכת · מיזוג אוויר · עבודות מתכת.
- **14 products in 4 groups**, mirroring the live site's menu plus the shop's own skip line:
  - `skips` מכולות אשפתון (ashpaon) — the only family the flyer prices.
  - `tin` תעשיות פח — ארונות כיבוי אש, צינורות ספירל, תעלות מיזוג ושחרור עשן, מניעת רעשים ומדפי אש.
  - `hvac` עבודות מיזוג אוויר ואוורור — תעלות פח ללחץ נמוך/בינוני/גבוה, **פלינומים**, יחידות טיפול
    באוויר, גרילים ומפזרים, אבזרי מיזוג.
  - `products` מוצרים — חיתוך CNC, זוויות, תנורי חימום, עבודות מתכת.
- Three price modes per product (`kind`): `table` (fixed rows — skips, plenum), `calc` (estimated range —
  spiral + rect duct), `quote` ("לפי הצעה" — the other 10).
- Real contact data is the **flyer's**, not the live site's: tel `04-6082264`, פארס 053-581-9466,
  מג׳די 053-538-9378, `Fares1.sharara@gmail.it` (**suspected typo for `.com`/`.co.il`, not confirmed**),
  address "אזור תעשייה". Do **not** import contacts from sharara.co.il (050-5215192 / fax / socials).
- Sample, not live: data is seeded locally, edits persist in `localStorage`. No backend/Firebase yet.
- **Deployed (2026-11-13): https://osamasla.github.io/sharara-marketing/** — public repo
  `OsamaSla/sharara-marketing`, GitHub Pages via Actions (static export, sub-path build).
- Live site: `https://www.sharara.co.il` (PHP `index.php?todo=…`, built by AHLANNET). Scraped 2026-11-13;
  it spells the brand **עלי שרארה בע"מ** — and its logo (now used here) says the same, while the flyer says
  שאראה. Spelling unresolved; `company.name` still follows the flyer. Its product photos were downloaded
  from `sharara.co.il/pics/…`; all are **292×238 px** thumbnails.
- Hebrew RTL, ₪ ILS, VAT 18% (`VAT_RATE` in `lib/types.ts`).

## 2. Stack & versions + surprising config flags

- Next.js **15.5.29** (App Router), React **19.3.1**, Tailwind **4.3.5** (`@tailwindcss/postcss`), TypeScript **5.x**.
- **TypeScript must stay on v5.** `typescript@7` breaks `next.config.ts` with
  `TypeError: Cannot read properties of undefined (reading 'fileExists')`.
- Tailwind v4: custom colors live in `@theme` in `app/globals.css`. Palette is taken from the company
  **logo**: gold `#dfaf00` (`--color-brand-50..900`, 500 = logo gold) and charcoal `#6e6e6d`
  (`--color-night: #201d18`, `--color-ink: #1c1a16`, `--color-page: #f8f7f3`).
  **Gold is a surface colour, not a text colour** — see the contrast rules in §7.
- **All base component classes are in `@layer components`** (`.card/.btn/.field/.chip`). Unlayered CSS beats
  Tailwind utilities, which previously broke `w-28` on admin inputs.
- Fonts: Google Fonts `<link>` for Heebo in `app/layout.tsx` (not `next/font`, avoids build-time network).

## 3. Repo map

- `app/layout.tsx` — RTL shell, providers, header/footer, skip link, metadata (brand + description).
- `app/page.tsx` — home: hero (skip), 4 group cards, featured products, why-us, skip volume table, CTA.
- `app/products/page.tsx` — **static** catalog page; wraps `CatalogClient` in `Suspense`.
- `components/CatalogClient.tsx` — group chips (`?group=`), search, sort, products grouped by `Group`.
- `app/products/[slug]/page.tsx` — SSG per slug: metadata + `Product`/`AggregateOffer` JSON-LD (only when
  the product has priced sizes), kind-aware titles.
- `components/ProductView.tsx` — product page: photo/hero, sticky quote card, specs, then one of
  `PriceTable` / `PriceCalculator` / quote card (plus `PlenumDesigns` for plenum).
- `components/PriceTable.tsx` — length-based table (skip) **or** W×H×L table (plenum), price + "משוער" flag.
- `components/PriceCalculator.tsx` — spiral/rect calculator UI (client), reads `settings.calcRates`.
- `components/PlenumDesigns.tsx` — adder table only (percent of base size); the cross-sections are the shop's
  own sheet (`product.drawing`), not generated art.
- `components/DimensionDiagram.tsx` — skip SVG section drawing (1,433 / 500 / 1,184 mm + variable length);
  used only when no real drawing exists.
- `components/ProductImage.tsx` — picks drawing → photo → SVG, with a `HEAD` check so a drawing referenced in
  `lib/data.ts` before the file exists falls through instead of showing a broken image.
- `components/DrawingFigure.tsx` — renders one shop drawing with the same missing-file fallback.
- `components/ProductVisual.tsx` — inline SVG art per category; `artByCategory` maps the 14 categories onto
  5 drawings, so unknown categories never render empty. Now only a last-resort fallback: every product has a
  real photo, and the home page (hero + 4 group cards) uses real photos via `groupArt` in `app/page.tsx`.
- `components/AdminClient.tsx` — price-list status, bulk %, calc-rate editor, per-size editor, CSV, reset.
- `lib/data.ts` — company, `skipGeometry`, `groups`, 14 `categories`, `defaultSettings.calcRates`,
  `seedProducts`, helpers (`cheapestSize`, `groupName`, `productsOfGroup`).
- `lib/types.ts` — `Group`, `Category`, `ProductKind`, `Size` (with optional W/H), `CalcRate`, `CalcConfig`,
  `Adder`, `Settings`, `VAT_RATE`.
- `lib/pricing.ts` — agorot storage, `withVat`, `priceFor`, `formatILS`, per-mode notes.
- `lib/calc.ts` — `sheetAreaSqm`, `estimate` (area, weight, range, min charge).
- `lib/store.tsx` — context + `localStorage` key **`sharara.store.v4`** (bump when `Product` gains fields:
  a saved store replaces `seedProducts` wholesale, so new fields would never reach returning visitors);
  `applyBulk({group, category, …})`, `setCalcRate`.
- `lib/price-mode.tsx` — 3-way price toggle, key `sharara.priceMode.v2`.
- `public/products/` — 12 photos (292×238) + `ashpaon-hopper.jpg` (1024×768) and `plenum.jpg` (1303×816,
  both supplied by the owner) + `metalwork.jpg` (1280×853, Wiki CC BY 2.0, credited via `photoCredit`).
- `public/specs/` — the shop's real drawings: `ashpaon-baby-my.png`, `plenum-sections.png`,
  `slotted-round-duct.png` (1280×720 each). A product references one through `drawing` in `lib/data.ts`;
  `photoFirst: true` (ashpaon, plenum) keeps the product shot in the hero and moves the drawing into a
  drawing card — "שרטוט מידות" for skips, "שרטוטים" for everything else. Without `photoFirst` the drawing
  becomes the full-width hero banner.
- `public/brand/logo.png` (237×135), `logo-mark.png` (65×92 crop of the A&S emblem), `logo-mobile.png`
  (314×184) — downloaded from the live site; `app/icon.png` (192×192, mark on cream) is the favicon.
- `SiteHeader` shows the mark + the company name; `SiteFooter` shows the full logo.

## 4. Commands that work here

- `npm install` → `npm run dev` (http://localhost:3000) → `npm run build` → `npm start`.
- `npm run typecheck` (`tsc --noEmit`) — fast gate, passes.
- `npm run build` — **22 pages**: `/`, `/products`, `/admin` static (○), 14 `/products/[slug]` SSG (●).
- Killing the server on Windows: `Get-NetTCPConnection -LocalPort 3000 -State Listen | Select-Object
  -ExpandProperty OwningProcess -Unique | ForEach-Object { Stop-Process -Id $_ -Force }`.
- **Lighthouse is only meaningful against `npm start`**, not dev (dev streams metadata → false
  "missing meta description"). Verified 2026-11-13 on the production build: 100 a11y / 100 best-practices /
  100 SEO on home, `/products`, `/products/plenum`, `/products/spiral-duct`.
- **Deploy target is GitHub Pages, static export** (`output: "export"`, `trailingSlash: true`,
  `images.unoptimized: true`). Workflow `.github/workflows/deploy.yml` publishes `out/`;
  `npm start` now runs `serve out` (Page's rules can't be reproduced by `next start`).
  `NEXT_PUBLIC_BASE_PATH=/sharara-marketing` + `NEXT_PUBLIC_SITE_URL` are set in the workflow and read by
  `lib/site.ts`. **`/public` paths must go through `asset()`** — Next only prefixes `<Link>`/`href`.
  `robots.ts`/`sitemap.ts` need `export const dynamic = "force-static"` or the export build fails.
  Git repo initialised 2026-11-13 (branch `main`), remote `OsamaSla/sharara-marketing`.
- **Live check 2026-11-13:** `https://osamasla.github.io/sharara-marketing/` returns 200, Hebrew title,
  hero images load (plenum 1303×816, ashpaon 1024×768, drawing 1280×720), Lighthouse **100/100/100** on the
  live home page. All `/public` files 200 under the sub-path. Lazy images below the fold read `0x0` in the
  headless tab — that is the hidden-window gotcha, not a broken deploy.
- Verifying the catalog without a screenshot: `browser.evaluate` reading `document.querySelectorAll`
  (screenshots need a visible desktop window; `naturalWidth` is scaled by page zoom, so 292 px sources
  report 222).

## 5. Data model, pricing & settings

- `Product`: id, slug, name, subtitle, category, **group**, description, highlights, `included`, specs,
  documents, status, **kind**, `image?` (+`imageWidth`/`imageHeight`/`photoCredit`), `drawing?`
  (`src`/`alt`/`width`/`height`/`caption`), `photoFirst?`, `calc?`, `adders?`, `sizes[]`.
- `Size`: id, label, `lengthCm`, optional `widthCm`/`heightCm`, `volumeM3`, `weightKg`, `weightEstimated`,
  `priceNetAgorot`, `dealerNetAgorot` (**null = "לפי הצעה"**), `provisional?` (price awaiting confirmation).
- **Money is stored net (ex-VAT) as integer agorot.** Gross = `roundShekel(net * 1.18)`; never store a gross copy.
- Skip cross-section from the shop's own drawing: (1,433 + 500) / 2 × 1,184 mm = **1.144 m²**, so
  **0.0114 m³ per cm of length** — volume is derived, not measured.
- Skip seed price list (net): 100 cm 3,500 · 125 4,500 · 150 5,500 · 170 6,500 · 200 7,500 ₪.
  Weights 155/170/190/205/230 kg are **estimated** (3 mm body / 4 mm base), flagged "משוער".
- **Plenum prices are provisional** (`provisional: true` on all 6 sizes): W×H×L in cm,
  `40×30×50 → 650 ₪ net` … `120×80×150 → 3,600 ₪ net`. Replace with the shop's real sheet.
  Volume = w·h·l/10⁶ m³, weight from 0.7 mm sheet (area × 0.7 × 7.85 kg).
- Plenum adders (percent of the base size, editable in `seedProducts[].adders`): מעבר +15, מרפק L +25,
  הסתעפות T +30, פתח גישה +8, בידוד +12. **Provisional too.**
- **Calculators** (`lib/calc.ts`): spiral area = π·D·L, rect area = 2·(W+H)·L (metres);
  weight = area × thicknessMm × 7.85; price = max(area × rate/m² × `rateFactor`, `minCharge`) ± `spreadPercent`.
  Spiral factor 1 / ±12% / min ₪250; rect factor 1.15 / ±15% / min ₪300.
- `Settings.calcRates` — six thicknesses (0.5–1.2 mm), net agorot/m²: 120 / 135 / 150 / 165 / 195 / 230 ₪.
  Edited from `/admin` ("תעריפי פח"), applies to both calculators.
- `Settings.priceListStatus`: `draft` = no "updated on" date; `verified` + `priceListDate` = date is shown.
  The flyer's VAT basis is unconfirmed → currently `draft`.
- `/admin` has "המחירון הוזן כולל מע״מ — המר לנטו" (`convertListToNet`, ÷1.18); it does **not** touch calc rates.

## 6. Conventions

- Hebrew copy; English technical terms kept (model codes, units). Numbers via `Intl.NumberFormat('he-IL')`.
- Currency renders as `4,130 ₪` (symbol after the number).
- RTL layout uses logical utilities (`ps-/pe-/ms-/me-/text-start/start-/end-`), never `left/right`.
- **Any numeric range (`1.14–2.29`, `440 ₪–561 ₪`, `100–200`) must be wrapped in `<bdi dir="ltr">`.** In an
  RTL paragraph the range otherwise renders reversed (verified visually: showed `2.29–1.14`).
- Accessibility is a legal requirement in Israel (IS 5568 / WCAG 2.1 AA) — keep Lighthouse a11y at 100.
- Price disclaimers are per-mode (`priceModeNote`) and always visible under the table/calculator.
- Category = product family (14); Group = menu column (4). Catalog chips and all `?group=` links use groups.

## 7. Verified gotchas

- Next 15 **dev** streaming hides `title`/`meta description` from the initial HTML → Lighthouse false positive.
  Production HTML contains them. Do not "fix" by hardcoding meta tags.
- A page that reads `searchParams` on the server becomes dynamic (ƒ) and streams metadata → SEO 0.8 even in
  production. `/products` is static: the group filter comes from `useSearchParams` inside `Suspense`.
- Demo state hydrates in `useEffect`, so the first paint shows seed prices; reading the DOM immediately after
  a click returns the **previous** mode's prices. Read again after React re-renders (verified while testing
  the toggle: gross 767 ₪ → net 650 ₪ → dealer "לפי הצעה").
- **The old-site photos are thumbnail-sized (292×238).** `next/image` will not upscale them: requesting
  `w=3840` returns 292×238 (verified with System.Drawing). They are rendered at `max-w-[380px]` only —
  never stretch them into a full-width hero. Products without a photo fall back to `ProductVisual` SVG;
  plenum and ashpaon now use the owner's drawings/photo instead.
- **Chat attachments are readable from the session DB** — images the owner pastes are base64 in
  `~/.local/share/opencode/opencode.db` → `session_message.data` → `files[].data` (rows `type='user'`).
  Decode with Python `sqlite3` + `base64`; they are *not* files anywhere on disk.
- `next/image` optimises from a list built **at server start**, so a file dropped into `public/` while
  `npm start` runs 404s until restart (and a replaced file may keep serving the cached optimised copy —
  rename the file instead when swapping artwork).
- `localStorage` moved to **`sharara.store.v3`**; v2 data lacks `group`/`kind`/`calcRates` and is not migrated
  (old admin edits are dropped on purpose). The reset button clears v3 only.
- **PowerShell 5.1 `Set-Content` writes ANSI and destroys Hebrew.** Use the `write`/`edit` tools, or pass
  `-Encoding UTF8`.
- `.field { width:100% }` from unlayered CSS silently overrode `w-28` on admin inputs — see `@layer components`.
- Heading order: `/products` keeps an `sr-only` h2 before the group h2s; product cards stay `h3`.
- Small labels at `text-slate-500` on `bg-slate-100`/`bg-page` land at 4.34–4.45:1 (fail). Use `slate-600`.
  Reproduced on the `/admin` header after the page background moved to `#f8f7f3` (4.44:1, fixed 2026-11-13).
- Touch targets: bare phone links in the sidebar were 18px tall (`target-size` failure); now `min-h-7` + padding.
- **Gold contrast:** `#dfaf00` on white is 2.04:1 and on `night` 7.4:1. So `.btn-primary` is dark text on
  gold (never `text-white` on `brand-500/600` — that fails at 3:1), `brand-700` (#8f6e00, 4.8:1) is the
  lightest safe gold for text on white, and `brand-800` for text on `brand-50`. On the dark hero use
  `brand-200`, not `brand-300` (measured 4.31:1 — Lighthouse `color-contrast` failure, fixed 2026-11-13).

## 8. Known issues / cleanup candidates (do not "fix" accidentally)

- Data is duplicated: `seedProducts` (server — metadata, sitemap, JSON-LD) vs `lib/store.tsx` (client edits).
  After an admin edit **metadata/JSON-LD stay stale**. Live build reads both from one DB; don't paper over it.
- Price list is `draft`; **plenum rows and plenum adders are `provisional`** until the shop sends its real
  price sheet. The plenum cross-sections now come from the shop's own sheet, so only the numbers are open.
- `public/specs/slotted-round-duct.png` (round duct with slots, standard L 1,230 mm) has **no product yet** —
  the owner has not said whether it is a 15th catalogue item or a variant of `spiral-duct`. Do not wire it up
  without asking.
- The 12 old-site photos are 292 px wide, so they are useless for print or large hero use. Ask the shop for originals.
- The logo is a 237×135 raster from the old site (the header mark is a 65×92 crop). **Ask for the vector/AI
  file** — at header size the logo's own Hebrew line is unreadable, so the readable name is HTML text next to it.
- `/admin` is open (no auth) — intentional for the demo, already `noindex`.
- CSV export uses a BOM (`\uFEFF`) for Excel Hebrew — keep it. Columns now include group + W/H + משוער flag.
- Documents/downloads links are `#` placeholders (price list PDF, drawings).
- No dealer price is seeded → contractor mode shows "לפי הצעה" everywhere. Intended default.
- `robots.ts` / `sitemap.ts` use the placeholder domain `sharara-metal.co.il`; confirm the real domain.
- `lib/calc.ts` is an **estimate model**, not the shop's rate card: no fittings, flanges, access doors,
  insulation, installation or pressure-class adjustments.

## 9. Definition of done (for this sample)

- `npm run typecheck` and `npm run build` pass (22 pages, 14 product routes). ✔
- Price toggle (כולל מע״מ / ללא מע״מ / קבלן) changes tables and calculators, persists across reload. ✔
- Admin edit → product page reflects it: skip price 3,500 → 3,600 (earlier build) and calc rate 120 → 130 ₪/m²
  showed up in the spiral calculator. ✔
- Bulk % by group, per-size editing (incl. W/H + משוער), calc-rate editing, price-list status, reset. ✔
- Draft mode hides the "updated on" date; plenum shows the "משוערים" disclaimer instead. ✔
- Quote dialog prefills the product, validates, offers both sales WhatsApps. ✔
- Plenum page: 6-size table + 5 sketches + adder table; spiral/rect calculators compute area/weight/range
  (300 mm × 3 m × 0.7 → 2.83 m², 15.5 kg, 440–561 ₪ gross; 600×400 × 3 m × 0.7 → 6.00 m², 33 kg). ✔
- Production Lighthouse: **100 a11y / 100 best-practices / 100 SEO** on home, `/products`,
  `/products/plenum`, `/products/spiral-duct`, `/admin` (2026-11-13, production build). ✔
- Open for the user: confirm VAT basis, real plenum price sheet + drawings, plate thickness/weights,
  updated skip price sheet, logo file, factory address, email correctness, and the real domain.
