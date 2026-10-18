"use client";

import { useEffect, useRef, useState } from "react";
import { FaWhatsapp } from "react-icons/fa6";
import { FiChevronDown, FiMail, FiPhone } from "react-icons/fi";
import { SITE, whatsappLink } from "@/data/site";

/** atravelq-style header contact: WhatsApp icon + phone pill whose chevron opens Call / WhatsApp / Email. */
export default function ContactPill({ greeting }: { greeting: string }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const pointerType = useRef("");
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Mouse users get hover-to-open; touch keeps tap-to-toggle.
  const hoverOpen = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
  };
  const hoverClose = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    closeTimer.current = setTimeout(() => setOpen(false), 150);
  };

  useEffect(() => () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const wa = whatsappLink(greeting);

  return (
    <div className="sr-contact" ref={rootRef} onPointerLeave={hoverClose}>
      <a className="sr-contact-wa" href={wa} target="_blank" rel="noopener noreferrer" aria-label="Chat with us on WhatsApp">
        <FaWhatsapp aria-hidden="true" />
      </a>

      <button
        type="button"
        className="sr-contact-pill"
        aria-haspopup="menu"
        aria-expanded={open}
        onPointerEnter={hoverOpen}
        onPointerDown={e => (pointerType.current = e.pointerType)}
        // A mouse click after hover-open shouldn't snap it shut; touch/keyboard still toggle.
        onClick={e => setOpen(o => (pointerType.current === "mouse" && e.detail > 0 ? true : !o))}
      >
        {SITE.phoneDisplay}
        <span className="sr-contact-chevron" aria-hidden="true">
          <FiChevronDown />
        </span>
      </button>

      {/* Always mounted so it can unroll top → bottom and roll back up; inert while closed. */}
      <ul className={`sr-contact-menu${open ? " is-open" : ""}`} role="menu" inert={!open} onPointerEnter={hoverOpen}>
        <li role="none">
          <a role="menuitem" href={`tel:${SITE.phoneE164}`} onClick={() => setOpen(false)}>
            <FiPhone aria-hidden="true" /> Call {SITE.phoneDisplay}
          </a>
        </li>
        <li role="none">
          <a role="menuitem" href={wa} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}>
            <FaWhatsapp aria-hidden="true" /> Chat on WhatsApp
          </a>
        </li>
        <li role="none">
          <a role="menuitem" href={`mailto:${SITE.email}`} onClick={() => setOpen(false)}>
            <FiMail aria-hidden="true" /> {SITE.email}
          </a>
        </li>
      </ul>
    </div>
  );
}
