# public/specs — שרטוטים וחתכים

Drawings supplied by the shop. A product shows one through `drawing` in `lib/data.ts`.

| File | Where it appears |
| --- | --- |
| `ashpaon-baby-my.png` | מכולת אשפתון — "שרטוט מידות" card (the product photo stays in the hero) |
| `plenum-sections.png` | פלינום — "שרטוטים" card under the hero |
| `slotted-round-duct.png` | תעלה עגולה עם חריצים — not wired yet, waiting on the owner's decision |

Rules:

- Keep the background white — the pages place them on white cards.
- 1280×720 is the size in use; the file is optimised by `next/image`.
- If the pixel size changes, update `drawing.width` / `drawing.height` in `lib/data.ts`, otherwise the
  aspect ratio will be off.
- `photoFirst: true` on a product keeps the product shot in the hero and moves the drawing into a drawing
  card ("שרטוט מידות" for skips, "שרטוטים" for the rest); without it the drawing becomes the hero banner.
- A referenced file that does not exist is detected with a `HEAD` request and the page falls back to the
  photo / illustration, so a half-finished set is safe to ship. Restart `npm start` after adding files.
