"use client";

import { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa6";
import { whatsappLink } from "@/data/site";
import { useLanding } from "./enquiry/EnquiryProvider";

/** Desktop floating WhatsApp launcher; the teaser line rotates every 3.5s. The teaser waits until
 *  the visitor scrolls past most of the first screen, so it doesn't cover the hero's own cards. */
export default function WhatsAppFloat() {
  const { whatsapp } = useLanding();
  const teasers = whatsapp.teasers;
  const [i, setI] = useState(0);
  const [pastHero, setPastHero] = useState(false);

  useEffect(() => {
    const onScroll = () => setPastHero(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setI(n => (n + 1) % teasers.length), 3500);
    return () => clearInterval(id);
  }, [teasers.length]);

  return (
    <a
      className="sr-wa-float"
      href={whatsappLink(whatsapp.greeting)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
    >
      {pastHero && <span key={i} className="sr-wa-bubble" aria-hidden="true">{teasers[i]}</span>}
      <span className="sr-wa-btn"><FaWhatsapp aria-hidden="true" /></span>
    </a>
  );
}
