// Ad attribution: the utm_* tags and Google Ads click id (gclid) on the URL a visitor lands on.
// Remembered for the visit, so a lead still carries them after the visitor opens a package
// page (whose URL has no tags) and enquires there.

export type Attribution = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  gclid?: string;
};

const KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid"] as const;
const STORAGE_KEY = "sr-attribution";

/** Call once per page load: stores the URL's tags if it has any (a new ad click replaces the old). */
export function captureAttribution() {
  const params = new URLSearchParams(window.location.search);
  const found: Attribution = {};
  for (const k of KEYS) {
    const v = params.get(k);
    if (v) found[k] = v.slice(0, 200);
  }
  if (!Object.keys(found).length) return;
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(found));
  } catch {
    /* storage blocked: readAttribution falls back to the current URL */
  }
}

/** The tags for this visit, or {} for direct / organic visitors. */
export function readAttribution(): Attribution {
  try {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved) as Attribution;
  } catch {
    /* fall through */
  }
  const params = new URLSearchParams(window.location.search);
  const out: Attribution = {};
  for (const k of KEYS) {
    const v = params.get(k);
    if (v) out[k] = v.slice(0, 200);
  }
  return out;
}
