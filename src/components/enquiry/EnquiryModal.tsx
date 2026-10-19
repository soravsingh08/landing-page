"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { FiX } from "react-icons/fi";
import LeadForm from "./LeadForm";
import { CountdownInline } from "../Countdown";
import { durationLabel, formatINR, maxDiscountPct, unitFor } from "@/data/landing";
import { useLanding } from "./EnquiryProvider";

type Props = {
  packageId?: string;
  source: string;
  /** The short "free itinerary & quote" form: name, WhatsApp number, travel month. */
  quote?: boolean;
  onClose: (submitted: boolean) => void;
};

export default function EnquiryModal({ packageId, source, quote = false, onClose }: Props) {
  const config = useLanding();
  const pkg = packageId ? config.packages.find(p => p.id === packageId) : undefined;
  const [submitted, setSubmitted] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const submittedRef = useRef(false);

  useEffect(() => {
    submittedRef.current = submitted;
  }, [submitted]);

  useEffect(() => {
    const prevFocus = document.activeElement as HTMLElement | null;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose(submittedRef.current);
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    // Focus the first field so keyboard and screen-reader users land inside the dialog.
    dialogRef.current?.querySelector<HTMLInputElement>("input:not([tabindex='-1'])")?.focus({ preventScroll: true });
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      prevFocus?.focus?.({ preventScroll: true });
    };
  }, [onClose]);

  return (
    <div className="sr-modal-backdrop" onClick={() => onClose(submitted)}>
      <div
        ref={dialogRef}
        className="sr-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="sr-modal-title"
        onClick={e => e.stopPropagation()}
      >
        <div className="sr-modal-banner">
          <span className="sr-modal-banner-text">
            <span className="sr-topbar-spark" aria-hidden="true">✦</span>
            <strong>{config.offer.name}</strong> is LIVE
          </span>
          <span className="sr-modal-banner-timer">
            Ends in <CountdownInline trim />
          </span>
          <button type="button" className="sr-modal-banner-close" aria-label="Close" onClick={() => onClose(submitted)}>
            <FiX aria-hidden="true" />
          </button>
        </div>

        <div className={`sr-modal-body${quote ? " sr-modal-body--quote" : ""}`}>
          {quote ? (
            <div className="sr-modal-quote">
              <p id="sr-modal-title" className="sr-modal-quote-title">Get free itinerary &amp; quote</p>
              <p className="sr-modal-quote-sub">Just your name and number. A {config.specialist} sends the day-wise plan and prices on WhatsApp.</p>
            </div>
          ) : pkg ? (
            <div className="sr-modal-pkg">
              <span className="sr-modal-pkg-thumb">
                <Image quality={80} src={pkg.image} alt="" fill sizes="72px" />
              </span>
              <div>
                <p id="sr-modal-title" className="sr-modal-pkg-title">{pkg.title}</p>
                <p className="sr-modal-pkg-meta">{pkg.stops?.join(" · ") ?? durationLabel(pkg.nights)}</p>
                <p className="sr-modal-pkg-price">
                  <strong>{formatINR(pkg.price)}</strong>
                  {pkg.oldPrice && <s>{formatINR(pkg.oldPrice)}</s>}
                  <span>{unitFor(config, pkg)}</span>
                </p>
              </div>
            </div>
          ) : (
            <div className="sr-modal-offer">
              <span className="sr-modal-offer-lotus" aria-hidden="true" />
              <p className="sr-modal-offer-save">Save up to {maxDiscountPct(config)}%</p>
              <p id="sr-modal-title" className="sr-modal-offer-title">Claim your yatra offer</p>
              <p className="sr-modal-offer-sub">
                Our {config.specialist} will call you with the best price and an itinerary planned around darshan timings.
              </p>
            </div>
          )}

          <LeadForm
            variant={quote ? "compact" : "modal"}
            source={source}
            packageName={pkg?.title}
            submitLabel={quote ? "Get quote on WhatsApp" : "Connect with an Expert"}
            onSuccess={() => setSubmitted(true)}
          />
        </div>
      </div>
    </div>
  );
}
