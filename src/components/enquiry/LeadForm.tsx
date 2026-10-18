"use client";

import { useId, useState } from "react";
import { FaWhatsapp } from "react-icons/fa6";
import { FiCheck } from "react-icons/fi";
import { COUNTRY_CODES, cleanPhone, leadWhatsappText, phoneError, phoneRule, validateLead, type Lead } from "@/lib/lead";
import { whatsappLink } from "@/data/site";
import { readAttribution } from "@/lib/attribution";
import { useLanding, useLeadSubmitted } from "./EnquiryProvider";

/** compact: quick enquiry (name + phone) · full: package page · modal: popup (name + phone only). */
type Variant = "compact" | "full" | "modal";

type Props = {
  variant?: Variant;
  source: string;
  packageName?: string;
  submitLabel?: string;
  onSuccess?: () => void;
};

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

const TRAVELLER_OPTIONS = ["1 Adult", "2 Adults", "3 Adults", "4 Adults", "5 to 8 People", "9+ (Group)"];

export default function LeadForm({ variant = "compact", source, packageName, submitLabel = "Get Free Itinerary", onSuccess }: Props) {
  const uid = useId();
  const config = useLanding();
  const leadSubmitted = useLeadSubmitted();
  const [form, setForm] = useState({
    name: "",
    countryCode: "+91",
    phone: "",
    travelDate: "",
    travellers: "2 Adults",
    message: "",
    website: "",
  });
  const [status, setStatus] = useState<"idle" | "done">("idle");
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState<Lead | null>(null);

  const [phoneTouched, setPhoneTouched] = useState(false);
  const rule = phoneRule(form.countryCode);
  // Shown once the visitor leaves the field or has typed a full-length number, so it doesn't nag mid-typing.
  const livePhoneError = phoneError(form.countryCode, form.phone);
  const shownPhoneError = (phoneTouched || form.phone.length >= rule.max) && form.phone ? livePhoneError : null;
  const set = (k: keyof typeof form, v: string) => setForm(f => ({ ...f, [k]: v }));

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const lead: Lead = {
      name: form.name.trim(),
      countryCode: form.countryCode,
      phone: form.phone,
      travelDate: variant === "full" ? form.travelDate || undefined : undefined,
      travellers: variant === "full" ? form.travellers : undefined,
      message: variant === "full" ? form.message.trim() : undefined,
      packageName,
      destination: config.name,
      source,
      website: form.website,
      attribution: readAttribution(),
    };
    const invalid = validateLead(lead);
    setPhoneTouched(true);
    if (invalid) {
      setError(invalid);
      return;
    }
    setError("");

    // Open WhatsApp right away, inside the click, so browsers don't block it as a popup.
    // The visitor sends the pre-filled message; on phones this opens the WhatsApp app.
    window.open(whatsappLink(leadWhatsappText(lead)), "_blank", "noopener,noreferrer");

    // Also record the lead on our server, which forwards it to the company's dashboard
    // once LEAD_WEBHOOK_URL is set. keepalive lets it finish even if the tab is left.
    fetch("/api/enquiry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(lead),
      keepalive: true,
    }).catch(() => {});

    window.gtag?.("event", "generate_lead", { form_source: source, package: packageName });
    window.fbq?.("track", "Lead", { content_name: packageName ?? `${config.name} Tour Packages` });
    setSubmitted(lead);
    setStatus("done");
    leadSubmitted();
    onSuccess?.();
  };

  if (status === "done" && submitted) {
    return (
      <div className="sr-form-done" role="status">
        <span className="sr-form-done-icon"><FiCheck aria-hidden="true" /></span>
        <p className="sr-form-done-title">Thank you, {submitted.name.split(" ")[0]}!</p>
        <p className="sr-form-done-text">
          {`WhatsApp has opened with your details. Just tap send and our ${config.specialist} will reply with your itinerary and best price. Didn't open? Use the button below.`}
        </p>
        <a
          className="sr-btn sr-btn--whatsapp"
          href={whatsappLink(leadWhatsappText(submitted))}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaWhatsapp aria-hidden="true" /> Send on WhatsApp
        </a>
      </div>
    );
  }

  return (
    <form className={`sr-form sr-form--${variant}`} onSubmit={submit} noValidate>
      <div className="sr-field">
        <label htmlFor={`${uid}-name`}>Full name</label>
        <input
          id={`${uid}-name`}
          type="text"
          placeholder="Your name *"
          autoComplete="name"
          value={form.name}
          onChange={e => set("name", e.target.value)}
          required
        />
      </div>

      <div className="sr-field">
        <label htmlFor={`${uid}-phone`}>Phone / WhatsApp</label>
        <div className="sr-phone">
          <select
            aria-label="Country code"
            value={form.countryCode}
            onChange={e => {
              set("countryCode", e.target.value);
              set("phone", cleanPhone(e.target.value, form.phone));
            }}
          >
            {COUNTRY_CODES.map(c => (
              <option key={c.code} value={c.code}>{c.label}</option>
            ))}
          </select>
          <input
            id={`${uid}-phone`}
            type="tel"
            inputMode="numeric"
            placeholder="Phone / WhatsApp *"
            autoComplete="tel-national"
            value={form.phone}
            onChange={e => set("phone", cleanPhone(form.countryCode, e.target.value))}
            onBlur={() => setPhoneTouched(!!form.phone)}
            aria-invalid={!!shownPhoneError}
            aria-describedby={shownPhoneError ? `${uid}-phone-error` : undefined}
            required
          />
        </div>
        {shownPhoneError && (
          <p id={`${uid}-phone-error`} className="sr-field-error" role="alert">
            {shownPhoneError}
          </p>
        )}
      </div>

      {variant === "full" && (
        <div className="sr-field">
          <label htmlFor={`${uid}-date`}>Travel date</label>
          <input
            id={`${uid}-date`}
            type="date"
            value={form.travelDate}
            onChange={e => set("travelDate", e.target.value)}
          />
        </div>
      )}

      {variant === "full" && (
        <div className="sr-field">
          <label htmlFor={`${uid}-pax`}>Travellers</label>
          <select id={`${uid}-pax`} value={form.travellers} onChange={e => set("travellers", e.target.value)}>
            {TRAVELLER_OPTIONS.map(o => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </div>
      )}

      {variant === "full" && (
        <div className="sr-field sr-field--wide">
          <label htmlFor={`${uid}-msg`}>Anything we should know?</label>
          <textarea
            id={`${uid}-msg`}
            rows={3}
            placeholder={config.messagePlaceholder}
            value={form.message}
            onChange={e => set("message", e.target.value)}
          />
        </div>
      )}

      {/* Honeypot: hidden from people and screen readers, irresistible to bots. */}
      <div className="sr-hp" aria-hidden="true">
        <label>
          Website
          <input tabIndex={-1} autoComplete="off" value={form.website} onChange={e => set("website", e.target.value)} />
        </label>
      </div>

      {error && <p className="sr-form-error" role="alert">{error}</p>}

      <button
        type="submit"
        className={variant === "modal" ? "sr-modal-submit" : "sr-btn sr-btn--maroon sr-btn--block"}
      >
        {variant === "compact" && <FaWhatsapp aria-hidden="true" />}
        {submitLabel}
      </button>
      <p className="sr-form-note">
        {variant === "full" ? `No spam, no obligation. A ${config.specialist} will call you back.` : "No spam. Your details stay with us."}
      </p>
    </form>
  );
}
