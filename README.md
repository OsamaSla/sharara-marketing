# עלי שאראה בע״מ — marketing site sample

A working sample of the company site: Hebrew RTL catalog of **14 products in 4 groups** — dumpster skips,
sheet-metal works, HVAC ducting (including the new **פלינום** line) and custom metal products — with a
real skip price list, a plenum size table, duct price calculators, and a demo price editor.

Built with Next.js 15 (App Router), React 19, Tailwind v4, TypeScript 5.

## Run

```bash
npm install
npm run dev      # http://localhost:3000
```

```bash
npm run build && npm start   # production check (use this before Lighthouse)
npm run typecheck            # fast TS gate
```

## Routes

| Route | What it shows |
|---|---|
| `/` | Home: skip hero, 4 product groups, featured products, volume table, contact CTA |
| `/products` | Catalog with group chips, search, sort (`?group=` deep links supported) |
| `/products/ashpaon` | **מכולת אשפתון**: 5 standard lengths, volume, estimated weight, price list, drawing |
| `/products/plenum` | **פלינום**: 6 provisional W×H×L sizes, 5 front-view design sketches, adder table |
| `/products/spiral-duct` | Spiral duct **calculator**: diameter × length × thickness → area, weight, price range |
| `/products/rect-duct` | Rect duct **calculator**: W × H × length × thickness |
| `/products/*` (10 more) | Fire cabinets, smoke ducts, silencers, AHU, grilles, accessories, CNC, angles, heaters, metalwork — quote-only |
| `/admin` | **Demo editor**: price-list status, per-size editing (incl. W/H), bulk % by group, calc rates, CSV, reset |

## What the sample proves

- **Three pricing paths** — `table` (fixed rows), `calc` (estimated range from sheet m²), `quote`
  ("לפי הצעה" + quote dialog). No price is ever invented silently: plenum rows are flagged `provisional`.
- **Price display matrix** — one toggle, three states: consumer incl. 18% VAT, consumer ex-VAT, and
  contractor (per-quantity quote). Persisted in `localStorage`.
- **Dimensions + price table** — length/volume/weight/price for skips, W×H×L for plenum; desktop table +
  mobile cards; printable.
- **Draft vs verified price list** — an unverified list shows prices but no "updated on" date; provisional
  plenum prices show a "משוער" badge and a disclaimer.
- **Editing loop** — change a price or a sheet rate in `/admin`, open the product page, the new value is live
  (gross and VAT values are computed, never stored twice).

## What is demo-only

- Data lives in `lib/data.ts` + `localStorage` (`sharara.store.v3`). No Firebase yet.
- `/admin` has no login. The quote form does not send anything.
- 12 product photos come from the old site and are only **292×238 px**; ashpaon, plenum and metalwork still
  use inline SVG placeholders. No upscaling.
- Plenum prices and design adders are our provisional numbers, waiting for the shop's sheet + drawings.
- Server metadata/JSON-LD/sitemap read `seedProducts`; admin edits therefore do not affect them.
- Skip prices are seeded **net** from the shop flyer, but the flyer's VAT basis is still unconfirmed.

See `PROJECT_NOTES.md` for verified quirks, the pricing model, and the path to production.
