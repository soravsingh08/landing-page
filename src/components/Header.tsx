"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { FiPhone } from "react-icons/fi";
import logo from "@/assets/images/srivastava-route-logo.png";
import { SITE } from "@/data/site";
import { maxDiscountPct } from "@/data/landing";
import ContactPill from "./ContactPill";
import { CountdownInline } from "./Countdown";
import { useEnquiry, useLanding } from "./enquiry/EnquiryProvider";

/** Ad landing header: logo, phone and one "Enquire Now". No menu links, so nothing pulls a visitor
 *  off the page. `home` is the landing page's URL when the header sits on one of its package pages. */
export default function Header({ home = "" }: { home?: string }) {
  const { open } = useEnquiry();
  const config = useLanding();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`sr-header${scrolled ? " is-scrolled" : ""}`}>
      <div className="sr-topbar">
        <div className="sr-container sr-topbar-inner">
          <p>
            <span className="sr-topbar-spark" aria-hidden="true">✦</span>
            {/* phones get a shorter line so the countdown fits */}
            <span className="sr-topbar-long">
              <strong>{config.offer.name}</strong>: up to {maxDiscountPct(config)}% off {config.name} packages · ends in <CountdownInline />
            </span>
            <span className="sr-topbar-short">
              <strong>{maxDiscountPct(config)}% off</strong> {config.name} yatras · ends in <CountdownInline trim />
            </span>
          </p>
        </div>
      </div>

      <div className="sr-nav">
        <a href={`${home}#top`} className="sr-logo" aria-label={home ? `${SITE.brand}: ${config.name} packages` : `${SITE.brand}: back to top`}>
          <Image quality={90} src={logo} alt={`${SITE.brand} Travel Company`} priority sizes="170px" />
        </a>

        <div className="sr-nav-actions">
          <ContactPill greeting={config.whatsapp.greeting} />
          {/* phones: the phone pill is hidden, so a call icon takes its place */}
          <a href={`tel:${SITE.phoneE164}`} className="sr-nav-call" aria-label={`Call ${SITE.phoneDisplay}`}>
            <FiPhone aria-hidden="true" />
          </a>
          <button type="button" className="sr-btn sr-btn--book sr-btn--sm" onClick={() => open({ source: "header", quote: true })}>
            Enquire Now
          </button>
        </div>
      </div>
    </header>
  );
}
