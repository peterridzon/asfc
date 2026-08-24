# ASFC — Amateur Storm Forecast Center

A small, fast website for publishing weather images.

Four pages, reachable from the buttons on the homepage:

| Button | Route | What it shows |
| --- | --- | --- |
| **SOURCES / ZDROJE** (green) | `/sources` | ECMWF, ALADIN and Deutscher Wetterdienst with their logos |
| **STORM OUTLOOK** (yellow) | `/outlook` | Your outlook images, one per screenful |
| **ALERTS / VAROVANIA** (red) | `/alerts` | Images with a block of text under each one |
| **UPDATE LOG** (white) | `/update-log` | What changed in each version |

> This is for experimental purposes only and this doesn’t replace official
> weather warnings or forecasts.

---

## Publishing images

Everything is published through the admin page at **`/admin`** — no code, no
files, no rebuild. It works from an iPad, a phone or a laptop.

1. Open `https://your-domain/admin`
2. Type the password
3. Pick **Storm Outlook** or **Alerts / Varovania**
4. Choose the image — on an iPad this opens Photos or the camera
5. Write the alt text, and the text that goes under the picture
6. Press **Publish**

It is live immediately. The list underneath shows everything published, with a
**Delete** button for each item.

Photos taken on an iPhone or iPad are HEIC, which no browser outside Apple can
display, and they are far bigger than a web page needs. The admin page fixes
both before uploading: the picture is re-encoded as JPEG and scaled down to
2400 px on its longest edge. SVG and GIF files are passed through untouched.

Images are stored in Cloudflare KV, so the maximum size is 20 MB per image.

---

## The project logo

The logo goes at:

```
public/logo.png
```

It is shown immediately to the left of the **ASFC** wordmark on the homepage and
in the footer, sized automatically from the text next to it. A square image
works best. PNG, WEBP or SVG are all fine — if you use SVG, name the file
`logo.png` anyway or change the path in `src/components/Logo.tsx`.

Export it with a **transparent background** if you can: the homepage is light
blue, so a white or grey background shows up as a visible tile behind the logo.

If the file is not there the site simply shows the wordmark on its own — nothing
breaks.

---

## The source logos

`public/images/logos/` currently holds **grey placeholders, not the real logos**.
To use the real ones, download each organisation’s official logo and overwrite
the file with the same name:

```
public/images/logos/ecmwf.svg
public/images/logos/aladin.svg
public/images/logos/dwd.svg
```

Nothing else needs changing. Check each organisation’s terms before publishing
their logo on a live site.

To change the list itself, edit `src/content/providers.ts`.

---

## The disclaimer pop-up

Opening `/outlook` or `/alerts` shows a disclaimer over half the screen.
**Got it!** closes it for that visit; **Don't show this again** stores
`asfc.disclaimerHidden` in the browser's localStorage so it never reappears
on that device.

To change the wording, edit `DISCLAIMER_TEXT` in
`src/components/DisclaimerDialog.tsx`. To see the pop-up again after hiding it,
clear the site data for localhost in your browser.

---

## The update log and version number

Two places, both one line each:

- `src/content/updateLog.ts` — the list shown on `/update-log`, newest at the top
- `src/lib/sections.ts` — `VERSION_LABEL`, the text in the homepage’s top-left corner

---

## Running it

```bash
npm install
```

```bash
npm run dev
```

Then open <http://localhost:5173>.

| Command | What it does |
| --- | --- |
| `npm run dev` | Development server with hot reload |
| `npm run build` | Type-check and build into `dist/` |
| `npm run preview` | Serve the built site locally |
| `npm run lint` | Lint the source |

Locally the admin works too, backed by a `.dev-data/` folder instead of KV. The
dev password is `admin` unless you set `ADMIN_PASSWORD` in a `.env` file.

---

## Deploying to Cloudflare

The site runs as a Cloudflare **Worker** with static assets: the built files in
`dist/` are served straight from Cloudflare's asset store, and `worker/index.ts`
handles `/api/*` only.

You have to run these yourself — they need your Cloudflare login.

**1. Create the storage for the images**

```bash
npx wrangler kv namespace create ASFC_KV
```

Copy the id it prints into `wrangler.jsonc`, replacing
`PASTE_YOUR_KV_NAMESPACE_ID_HERE`, then commit and push.

You can also create it in the dashboard under **Storage & Databases → KV**; the
id is shown next to the namespace.

**2. Connect the repository**

In the Cloudflare dashboard: **Workers & Pages → Create → Import a repository**,
pick the repo, then:

- **Build command:** `npm run build`
- **Deploy command:** `npx wrangler deploy`

Every push to `main` then redeploys automatically.

**3. Set the two secrets**

`ADMIN_PASSWORD` is the password you type at `/admin`. `AUTH_SECRET` signs the
login cookie — make it a long random string and never reuse your password for it.

```bash
npx wrangler secret put ADMIN_PASSWORD
```

```bash
npx wrangler secret put AUTH_SECRET
```

Or in the dashboard: **your Worker → Settings → Variables and Secrets → Add**,
type **Secret** for both.

**4. Connect your domain**

**Settings → Domains & Routes → Add → Custom domain**. The DNS record is created
for you, provided the domain is already active in the same Cloudflare account.

### Checking it worked

`/admin` tells you if something is missing: if it says publishing is not set up,
the KV binding or one of the secrets is absent.

Deep links such as `/outlook` survive a hard refresh because
`not_found_handling` is set to `single-page-application` in `wrangler.jsonc`.

## Project layout

```
worker/index.ts           the Worker behind /api/*
wrangler.jsonc            Worker config: assets, routing and the KV binding
shared/                   CMS logic shared by the Worker and local dev
vite-plugins/             local stand-in for KV so npm run dev behaves the same
public/images/logos/      the provider logos (placeholders for now)
src/pages/Admin.tsx       the publishing page
src/content/providers.ts  the three data providers
src/content/updateLog.ts  the update log
src/lib/sections.ts       button labels, colours and VERSION_LABEL
src/components/           header, footer, full-screen image list, disclaimer
```

Published images and their text live in Cloudflare KV, not in the repository.

## Tech

React 19 · TypeScript · Vite · Tailwind CSS 4 · React Router · Cloudflare Workers
+ KV. No third-party services.
