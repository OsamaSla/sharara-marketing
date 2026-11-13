# Deploy to Netlify

The site is a standard Next.js 15 app, so **no code changes are needed** — Netlify's Next.js
runtime handles the SSG pages and `next/image` optimisation. Config lives in `netlify.toml`.

## What Netlify uses

| Setting | Value |
| --- | --- |
| Build command | `npm run build` |
| Publish directory | `.next` |
| Node version | 22 (`NODE_VERSION` in `netlify.toml`) |
| Plugin | `@netlify/plugin-nextjs` (installed automatically from `netlify.toml`) |

Do **not** set the publish directory to `out/` — that is static export, which drops image
optimisation and is not what this config uses.

## First deploy (GitHub route)

1. Create an empty repository on GitHub (private is fine), e.g. `sharara-marketing`.
2. From this folder:

   ```powershell
   git remote add origin https://github.com/<user>/sharara-marketing.git
   git push -u origin main
   ```

3. netlify.com → **Add new site → Import an existing project** → **GitHub** → pick the repo.
4. Netlify reads `netlify.toml`, so leave the build settings alone → **Deploy**.
   First build takes ~2 minutes. You get a `https://<name>.netlify.app` address immediately.

## First deploy (no GitHub)

```powershell
npx netlify-cli login
npx netlify-cli deploy --build --prod
```

This uploads and builds in one step. Re-run the same command to publish an update, or link
GitHub later from the Netlify dashboard.

## Custom domain

1. Netlify → **Domain management → Add a domain** → enter e.g. `sharara-hvac.co.il`.
2. Netlify shows the DNS records to create at your registrar (usually an `A` record for the
   apex and a `CNAME` for `www`). If the registrar is also the DNS host, you can instead point
   the nameservers at Netlify (`dns1.p01.nsone.net`, …) and manage everything there.
3. HTTPS is issued automatically once DNS resolves (a few minutes).

Remember to also set the canonical URL in the code once the domain is final:
`app/layout.tsx` (`metadataBase`) and `app/sitemap.ts` / `app/robots.ts`.

## Before the site is public — checklist

- [ ] **Prices**: `/admin` writes to `localStorage`, so a visitor never sees your edits.
      Either freeze the final price list in `lib/data.ts` and remove `/admin` from the public
      build, or add a shared database (Supabase/Firebase).
- [ ] **Brand spelling**: logo says **שרארה**, the flyer says **שאראה** — `company.name` in
      `lib/data.ts` must match the answer.
- [ ] **Downloads** (`הורדות`) are `#` placeholders — link the real PDFs or drop the section.
- [ ] Contact details: keep `04-6082264`, פארס `053-581-9466`, מג׳די `053-538-9378`; check the
      email (`Fares1.sharara@gmail.it` looks like it should be `.com`).
- [ ] `robots.ts` / `sitemap.ts` point at the production domain.

## Updating the live site

Push to `main` (or re-run the CLI deploy). Netlify rebuilds automatically; the 22 pages are
pre-rendered at build time, so a drawing or photo added under `public/` ships on the next build.
