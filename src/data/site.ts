// Brand + contact details, taken from srivastavaroute.in. Everything the page
// says about the business lives here so it can be updated in one place.

export const SITE = {
  brand: "Srivastava Route",
  legalName: "Srivastava Route Travel Company",
  mainSite: "https://srivastavaroute.in",
  phoneDisplay: "+91 95199 34422",
  phoneE164: "+919519934422",
  whatsapp: "919519934422",
  email: "srivastavaroute@gmail.com",
  address: {
    street: "2nd Floor, 5/601, Mamta Palace, Vikas Khand-5, Near Koushal Vikash Karyalaya",
    locality: "Lucknow",
    region: "Uttar Pradesh",
    postalCode: "226010",
    country: "IN",
  },
  legal: {
    privacy: "https://srivastavaroute.in/privacy-policy",
    terms: "https://srivastavaroute.in/terms-conditions",
    refund: "https://srivastavaroute.in/refund-policy",
  },
} as const;

export function siteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel}`;
  return "http://localhost:3000";
}

export const whatsappLink = (text: string) =>
  `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`;
