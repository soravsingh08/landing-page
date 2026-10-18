# Banaras Tour Packages — Srivastava Route landing page

A single-page Next.js 16 landing page for Srivastava Route's Varanasi (Banaras/Kashi) packages. It follows the atravelq destination landing-page layout and uses the [srivastavaroute.in](https://srivastavaroute.in) brand: navy `#0A1F44`, gold `#C49A45`, Playfair Display and Inter.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (statically pre-rendered)
npm start
```

## Pages

| URL | Config |
| --- | --- |
| `/` | Banaras: `src/data/destinations/banaras.ts` |
| `/landing/thailand` | Bangkok Pattaya: `src/data/destinations/thailand.ts` |
| `/packages/<id>`, `/landing/<slug>/packages/<id>` | One page per package (hero, day-wise plan, inclusions, photos, enquiry form). Package cards link here. |

Every section of a page is driven by its config: hero, offer, packages (each with its own page), places, things to do, quick facts, FAQs and photo credits. To add a destination (e.g. `/landing/dubai`), copy `thailand.ts`, edit it, and register it in `src/data/destinations/index.ts`. It is pre-rendered automatically and added to the sitemap.

## Where to edit content

| What | File |
| --- | --- |
| Phone, WhatsApp, email, address, legal links | `src/data/site.ts` |
| Everything for one destination (packages, prices, offer, FAQs...) | `src/data/destinations/<slug>.ts` |
| Config shape and price helpers | `src/data/landing.ts` |
| Colours, fonts, spacing | `src/app/globals.css` (`:root` tokens) |

> **Before launch:** only the Banaras bestseller (Varanasi Prayagraj Ayodhya, ₹11,999) comes from the live site. Every other package, and all "was" prices on both pages, are suggested placeholders. Have Srivastava Route confirm or replace them.

## Lead capture

Every form posts to `POST /api/enquiry`. The route validates the lead, rejects bots with a honeypot field, and forwards the lead as JSON to `LEAD_WEBHOOK_URL`. That can be a Google Apps Script web app that writes to a Sheet, a Zapier, Make or Pabbly webhook, or a CRM endpoint.

If the webhook is missing or fails, the visitor sees a **"Send on WhatsApp"** button with their details pre-filled, so the lead isn't lost. Successful submits also fire `gtag('event','generate_lead')` and `fbq('track','Lead')` when those tags are installed.

## Deploy on Vercel

1. Push this repo and import it in Vercel. No build settings needed.
2. Set these environment variables:
   - `NEXT_PUBLIC_SITE_URL`: the final domain, e.g. `https://banaras.srivastavaroute.in`. This drives the canonical URL, sitemap and OG tags. If it is unset, the Vercel production URL is used.
   - `LEAD_WEBHOOK_URL`: where leads go (see above).

## SEO built in

- Metadata, canonical URL, Open Graph and Twitter cards, plus a custom 1200×630 share image.
- JSON-LD for `TravelAgency`, `ItemList` of `TouristTrip` + `Offer`, and `FAQPage`.
- `robots.txt`, `sitemap.xml`, web manifest and favicons made from the SR monogram.
- One `h1` per page, semantic sections, and a crawlable page per package with its own title, description and `TouristTrip` data.
- Static pre-rendering, `next/image` (AVIF/WebP, blur placeholders) and self-hosted fonts through `next/font`.
- The hero animates with CSS, not AOS, so the first paint doesn't wait for JavaScript.

## Images

The client's own photos come from srivastavaroute.in. The rest come from Wikimedia Commons under CC BY-SA, CC0 or GODL-India; the footer's "Photo credits" lists each one, as the licences require. Replace them with the client's own photos whenever possible.
