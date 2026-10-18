import { NextResponse } from "next/server";
import { validateLead, type Lead } from "@/lib/lead";

// Receives enquiry-form submissions and forwards them as JSON to LEAD_WEBHOOK_URL:
// the travel company's dashboard / CRM endpoint (or Google Apps Script, Zapier, Make...).
// If LEAD_WEBHOOK_SECRET is set it is sent as `Authorization: Bearer <secret>` so the
// dashboard can reject anything that didn't come from this site. The visitor is already
// on WhatsApp by the time this runs, so a missing or failing webhook never loses the lead.

const clip = (v: unknown) => (typeof v === "string" ? v.slice(0, 200) : "");

export async function POST(req: Request) {
  let body: Partial<Lead>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Bots fill every field; pretend success so they don't retry.
  if (body.website) return NextResponse.json({ ok: true, delivered: true });

  const error = validateLead(body);
  if (error) return NextResponse.json({ ok: false, error }, { status: 422 });

  const lead = {
    name: body.name!.trim(),
    phone: `${body.countryCode} ${body.phone!.replace(/\D/g, "")}`,
    travelDate: body.travelDate?.slice(0, 40) || "Flexible",
    travellers: body.travellers?.slice(0, 40) || "Not specified",
    destination: body.destination?.slice(0, 60) || "Not specified",
    packageName: body.packageName?.slice(0, 120) || "Not specified",
    message: body.message?.trim().slice(0, 1000) || "",
    source: `${String(body.destination ?? "Landing").slice(0, 60)} landing page, ${String(body.source ?? "form").slice(0, 40)}`,
    page: req.headers.get("referer") ?? "",
    utm_source: clip(body.attribution?.utm_source),
    utm_medium: clip(body.attribution?.utm_medium),
    utm_campaign: clip(body.attribution?.utm_campaign),
    utm_term: clip(body.attribution?.utm_term),
    utm_content: clip(body.attribution?.utm_content),
    gclid: clip(body.attribution?.gclid),
    submittedAt: new Date().toISOString(),
  };

  const digits = body.phone!.replace(/\D/g, "");
  // Also sent under the field names of srivastavaroute.in's own forms: the package enquiry form
  // (mobno, travel_date, adult, children, utm_*, gclid) and the contact form (email, subject,
  // message), so the company's Enquiry tables can store landing-page leads as they are.
  const payload = {
    ...lead,
    mobno: body.countryCode === "+91" ? digits : lead.phone,
    travel_date: body.travelDate?.slice(0, 40) || "",
    adult: "",
    children: "",
    package: lead.packageName,
    email: "",
    subject: "booking",
    message: [
      lead.message,
      `Phone / WhatsApp: ${lead.phone}`,
      `Package: ${lead.packageName}`,
      `From: ${lead.source}`,
    ]
      .filter(Boolean)
      .join("\n"),
  };

  const webhook = process.env.LEAD_WEBHOOK_URL;
  if (!webhook) {
    console.warn("[enquiry] LEAD_WEBHOOK_URL is not set, lead only handed off via WhatsApp:", lead.phone);
    return NextResponse.json({ ok: true, delivered: false });
  }

  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(process.env.LEAD_WEBHOOK_SECRET ? { Authorization: `Bearer ${process.env.LEAD_WEBHOOK_SECRET}` } : {}),
      },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
    return NextResponse.json({ ok: true, delivered: true });
  } catch (err) {
    console.error("[enquiry] webhook delivery failed", err);
    return NextResponse.json({ ok: true, delivered: false });
  }
}
