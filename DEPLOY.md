# Deploy to GitHub Pages

The site is a **static export** (`output: "export"` in `next.config.ts`), built and published by
`.github/workflows/deploy.yml` on every push to `main`.

- Live URL: **https://osamasla.github.io/sharara-marketing/**
- Build output: `out/` (uploaded as a Pages artifact — nothing is committed to a `gh-pages` branch)
- Node 22, `npm ci`, `npm run typecheck`, `npm run build`

## One-time setup (already done except step 2)

1. Repo exists: `OsamaSla/sharara-marketing`, branch `main`.
2. **Enable Pages**: GitHub → *Settings* → *Pages* → **Build and deployment → Source = GitHub Actions**.
   Without this the build job runs but the deploy job fails with "Pages site not found".
3. Push (or re-run the workflow from the *Actions* tab). First publish takes ~2 minutes.

## How the sub-path works

A project site is served from `https://<user>.github.io/<repo>/`, so the build sets:

| Variable | Value |
| --- | --- |
| `NEXT_PUBLIC_BASE_PATH` | `/sharara-marketing` |
| `NEXT_PUBLIC_SITE_URL` | `https://osamasla.github.io/sharara-marketing` |

`lib/site.ts` reads them. `<Link>`/`href` are prefixed by Next automatically, but files from
`/public` are not — every `<Image src>` goes through `asset()` there, and the "does this drawing
exist?" `HEAD` check uses the same helper. **Never hardcode a `/public` path in a component
without `asset()`**, or it will 404 on Pages.

`trailingSlash: true` makes every page a folder with `index.html`, which is what Pages needs.

## Local preview of the real (exported) build

```powershell
npm run build     # writes out/
npm start         # serves out/ on http://localhost:3000
```

For day-to-day work `npm run dev` is unchanged and runs at the root (no base path).

## Custom domain later

1. GitHub → *Settings* → *Pages* → **Custom domain** → enter the domain (this writes `CNAME`).
2. At the registrar: `A` records to `185.199.108.153 / .109 / .110 / .111` for the apex, or a
   `CNAME` to `osamasla.github.io` for `www`.
3. In `.github/workflows/deploy.yml` set **both** env vars to the new domain:

   ```yaml
   NEXT_PUBLIC_BASE_PATH: ""
   NEXT_PUBLIC_SITE_URL: https://your-domain.co.il
   ```

   Leave the base path empty — a custom domain serves from the root, and the sub-path would 404.

## Before the site is public — checklist

- [ ] **Prices**: `/admin` writes to `localStorage`, so a visitor never sees your edits. Either
      freeze the final price list in `lib/data.ts` and remove `/admin` from the public build, or
      add a shared database (Supabase/Firebase). `robots.txt` already disallows `/admin/`, but that
      is not access control.
- [ ] **Brand spelling**: logo says **שרארה**, the flyer says **שאראה** — `company.name` in
      `lib/data.ts` must match the answer.
- [ ] **Downloads** (`הורדות`) are `#` placeholders — link the real PDFs or drop the section.
- [ ] Contact details: `04-6082264`, פארס `053-581-9466`, מג׳די `053-538-9378`; check the email
      (`Fares1.sharara@gmail.it` looks like it should be `.com`).

## Updating the live site

Commit and push to `main`. Pages rebuilds automatically; a drawing or photo added under `public/`
ships with the next build (no manual upload step).
