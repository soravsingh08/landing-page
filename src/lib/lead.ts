// Shared between the enquiry forms and the /api/enquiry route so both sides
// validate the same way.

import type { Attribution } from "./attribution";

export const COUNTRY_CODES = [
  { code: "+91", label: "🇮🇳 +91", min: 10, max: 10 },
  { code: "+1", label: "🇺🇸 +1", min: 10, max: 10 },
  { code: "+44", label: "🇬🇧 +44", min: 10, max: 10 },
  { code: "+971", label: "🇦🇪 +971", min: 9, max: 9 },
  { code: "+61", label: "🇦🇺 +61", min: 9, max: 9 },
  { code: "+65", label: "🇸🇬 +65", min: 8, max: 8 },
  { code: "+977", label: "🇳🇵 +977", min: 10, max: 10 },
] as const;

export const phoneRule = (code: string) =>
  COUNTRY_CODES.find(c => c.code === code) ?? { code, label: code, min: 7, max: 15 };

export type Lead = {
  name: string;
  countryCode: string;
  phone: string;
  travelDate?: string;
  travellers?: string;
  packageName?: string;
  /** Landing page destination, e.g. "Bangkok Pattaya". */
  destination?: string;
  message?: string;
  /** Which form on the page the lead came from. */
  source: string;
  /** Honeypot — real visitors never see or fill it. */
  website?: string;
  /** Which ad / campaign brought the visitor (utm_* tags, gclid). */
  attribution?: Attribution;
};

/** The phone field's own error, or null when the number is valid. */
export function phoneError(countryCode: string, raw: string): string | null {
  const rule = phoneRule(countryCode);
  const phone = raw.replace(/\D/g, "");
  if (!phone) return "Please enter your phone / WhatsApp number.";
  if (phone.length < rule.min || phone.length > rule.max) {
    return rule.min === rule.max
      ? `Please enter a valid ${rule.min}-digit number.`
      : "Please enter a valid phone number.";
  }
  if (countryCode === "+91") {
    if (!/^[6-9]/.test(phone)) return "Indian mobile numbers start with 6, 7, 8 or 9.";
    if (/^(\d)\1{9}$/.test(phone)) return "Please enter your real mobile number.";
  }
  return null;
}

/** Digits typed or pasted into the phone field, minus a leading country code or 0
 *  ("+91 98765 43210", "09876543210" → "9876543210"), capped at the country's length. */
export function cleanPhone(countryCode: string, raw: string): string {
  const max = phoneRule(countryCode).max;
  let digits = raw.replace(/\D/g, "");
  const cc = countryCode.replace(/\D/g, "");
  if (digits.length > max && digits.startsWith(cc)) digits = digits.slice(cc.length);
  if (digits.length > max && digits.startsWith("0")) digits = digits.slice(1);
  return digits.slice(0, max);
}

export function validateLead(lead: Partial<Lead>): string | null {
  if (!lead.name || lead.name.trim().length < 2) return "Please enter your name.";
  if (lead.name.length > 80) return "Name is too long.";
  const phone = phoneError(lead.countryCode ?? "+91", lead.phone ?? "");
  if (phone) return phone;
  if ((lead.message ?? "").length > 1000) return "Message is too long.";
  return null;
}

export function leadWhatsappText(lead: Lead) {
  return [
    `Hi! I'd like to plan a ${lead.destination ?? "holiday"} trip.`,
    `Name: ${lead.name}`,
    `Phone: ${lead.countryCode} ${lead.phone}`,
    lead.packageName && `Package: ${lead.packageName}`,
    lead.travelDate && `Travel date: ${lead.travelDate}`,
    lead.travellers && `Travellers: ${lead.travellers}`,
    lead.message && `Note: ${lead.message}`,
  ]
    .filter(Boolean)
    .join("\n");
}
