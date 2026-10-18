import type { StaticImageData } from "next/image";

// Everything a destination landing page renders comes from one LandingConfig
// (see src/data/destinations/). Keep it plain data — it is passed to client
// components, so no functions or JSX in here.

export type Include = "hotel" | "breakfast" | "transfers" | "sightseeing" | "guide" | "cruise" | "flights";

export type ItineraryDay = {
  title: string;
  detail: string;
  /** "Ayodhya", "Varanasi → Bodhgaya" — shown above the day's title on the package page. */
  city?: string;
  /** Places covered that day, shown as chips on the package page. */
  highlights?: string[];
  /** "Overnight stay in Ayodhya" / "Tour ends with airport drop". */
  stay?: string;
  image?: StaticImageData;
  imageAlt?: string;
};

export type TourPackage = {
  id: string;
  title: string;
  /** Cities in order — used for the route line and structured data. */
  route: string[];
  /** Thrillophilia-style nights per stop, e.g. ["2N Pattaya", "2N Bangkok"]. */
  stops?: string[];
  nights: number;
  price: number;
  oldPrice?: number;
  /** Overrides the page's priceUnit, e.g. "" while the client hasn't confirmed the price basis. */
  priceUnit?: string;
  image: StaticImageData;
  imageAlt: string;
  /** Large photo behind the package page's hero; falls back to `image`. */
  heroImage?: StaticImageData;
  heroImageAlt?: string;
  /** One or two sentences introducing the trip on its package page. */
  summary?: string;
  /** Extra photos for the card slider; when left out, the slider uses this config's place photos for the route's cities. */
  images?: Slide[];
  types: string[];
  highlights: string[];
  badge?: string;
  /** Short freebie shown on the card, e.g. "FREE Coral Island Tour". */
  perk?: string;
  includes?: Include[];
  /** Full package page on the main site, when one exists. */
  detailsUrl?: string;
  itinerary?: ItineraryDay[];
  inclusions?: string[];
  exclusions?: string[];
  /** Extras arranged on request at extra cost, e.g. a boat ride. */
  onRequest?: string[];
};

export type Slide = { image: StaticImageData; alt: string };

export type Review = {
  name: string;
  location?: string;
  /** 1–5 */
  rating: number;
  text: string;
  /** Opens this package's quick view from "View this package". */
  packageId?: string;
  photo?: StaticImageData;
  photoAlt?: string;
  /** Short muted clip in /public, e.g. "/reviews/aditya.mp4"; the photo is its poster. */
  video?: string;
  /** Layout-only placeholder — rendered in development, never in a production build. */
  sample?: boolean;
};

export type ImageItem = { name: string; tagline: string; image: StaticImageData; alt: string };

export type FactIcon = "calendar" | "plane" | "car" | "currency" | "clock" | "passport";

export type Credit = { what: string; who: string; license: string; url: string };

export type LandingConfig = {
  slug: string;
  /** Canonical path of the page. */
  path: string;
  /** Destination as it reads in sentences: "Banaras", "Bangkok Pattaya". */
  name: string;
  /** "Kashi yatra", "Thailand holiday" — used in "Plan your …" copy. */
  tripLabel: string;
  /** "Kashi specialist", "Thailand expert". */
  specialist: string;
  seo: { title: string; description: string; keywords: string[]; ogImage: string; ogAlt: string };
  offer: { name: string; endsAt: string | null };
  hero: {
    eyebrow: string;
    titleLead: string;
    titleAccent: string;
    sub: string;
    image: StaticImageData;
    imageAlt: string;
    /** Short trust points under the copy on phones, e.g. "Hotel + breakfast". Keep them factual. */
    proof?: string[];
    /** Background photos that crossfade behind the copy; when left out, `image` is shown on its own. */
    /** `position` is the CSS object-position for that photo; photos are pinned to their top edge by default. */
    slides?: { image: StaticImageData; alt: string; caption: string; position?: string }[];
  };
  priceUnit: string;
  /** Small print under package grids, e.g. "excl. flights". */
  priceNote?: string;
  /** `short` is the label on phones, where the filter bar has to fit one line. */
  packageTypes: { key: string; label: string; short?: string }[];
  /** "Our best yatras" row right under the hero: packages in order, each with a small badge. */
  bestsellers?: { eyebrow: string; title: string; lead: string; items: { packageId: string; badge?: string }[] };
  packagesSection: { eyebrow: string; title: string; lead: string; /** word in the title that gets the shimmer highlight */ highlight?: string };
  packages: TourPackage[];
  facts?: { label: string; value: string; icon: FactIcon }[];
  places: { eyebrow: string; title: string; lead: string; cta: string; items: ImageItem[] };
  experiences?: { eyebrow: string; title: string; lead: string; items: ImageItem[] };
  /** "Thailand in pictures" carousel. */
  gallery?: { title: string; items: { image: StaticImageData; alt: string; caption: string }[] };
  why: {
    eyebrow: string;
    title: string;
    lead: string;
    main: StaticImageData;
    mainAlt: string;
    inset: StaticImageData;
    insetAlt: string;
    stamp: [string, string];
    items: { title: string; text: string; icon: "compass" | "shield" | "guide" | "temple" | "food" | "passport" }[];
  };
  /** Traveller reviews — only real ones go live; entries marked `sample` stay dev-only. */
  reviews?: { eyebrow: string; title: string; items: Review[] };
  steps: { title: string; text: string }[];
  faq: { title: string; lead: string; items: { q: string; a: string }[] };
  credits: Credit[];
  whatsapp: { greeting: string; teasers: string[] };
  messagePlaceholder: string;
};

export const days = (nights: number) => nights + 1;

export const durationLabel = (nights: number) =>
  `${nights} Night${nights > 1 ? "s" : ""} & ${days(nights)} Days`;

/** atravelq-style card label: "5 days & 4 nights". */
export const daysNightsLabel = (nights: number) =>
  `${days(nights)} day${days(nights) > 1 ? "s" : ""} & ${nights} night${nights > 1 ? "s" : ""}`;

export const formatINR = (n: number) => `₹${n.toLocaleString("en-IN")}`;

/** "/person", "/adult" — or "" when the package's price basis isn't confirmed yet. */
export const unitFor = (c: LandingConfig, p: TourPackage) => p.priceUnit ?? c.priceUnit;

/** URL of a package's own page: /packages/<id> on the home landing, /landing/<slug>/packages/<id> otherwise. */
export const packagePath = (c: LandingConfig, p: TourPackage) => `${c.path === "/" ? "" : c.path}/packages/${p.id}`;

/** Link back to a section of the landing page from one of its package pages. */
export const landingHref = (c: LandingConfig, hash: string) => `${c.path}#${hash}`;

export const discountPct = (p: TourPackage) =>
  p.oldPrice && p.oldPrice > p.price ? Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100) : 0;

export const maxDiscountPct = (c: LandingConfig) => Math.max(0, ...c.packages.map(discountPct));

export const cheapestPackage = (c: LandingConfig) => c.packages.reduce((a, b) => (b.price < a.price ? b : a));

export const packagesOfType = (c: LandingConfig, type: string | null) =>
  type ? c.packages.filter(p => p.types.includes(type)) : c.packages;

/** Photos for a package card's slider: the cover first, then its own extras, or else the route's
 *  place photos topped up with the page's experiences. */
export const packageSlides = (c: LandingConfig, p: TourPackage, max = 5): Slide[] => {
  const toSlide = (i: ImageItem): Slide => ({ image: i.image, alt: i.alt });
  const extras = p.images ?? [
    ...p.route.flatMap(city => c.places.items.filter(i => i.name === city).map(toSlide)),
    ...(c.experiences?.items.map(toSlide) ?? []),
  ];
  const slides = [{ image: p.image, alt: p.imageAlt }, ...extras];
  return slides.filter((s, i) => slides.findIndex(o => o.image.src === s.image.src) === i).slice(0, max);
};
