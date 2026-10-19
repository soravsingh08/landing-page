import Image from "next/image";
import { FaWhatsapp } from "react-icons/fa6";
import { FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import logo from "@/assets/images/srivastava-route-logo.png";
import type { LandingConfig } from "@/data/landing";
import { SITE, whatsappLink } from "@/data/site";

/** `home`: the landing page's URL when rendered on one of its package pages (see Header). */
export default function Footer({ config, home = "" }: { config: LandingConfig; home?: string }) {
  const { address } = SITE;
  return (
    <footer className="sr-footer">
      <div className="sr-container sr-footer-grid">
        <div>
          <span className="sr-footer-logo">
            <Image quality={80} src={logo} alt={`${SITE.brand} Travel Company`} sizes="180px" />
          </span>
          <p className="sr-footer-about">
            Crafting extraordinary travel experiences for the modern explorer. We believe in journeys that transform.
          </p>
        </div>

        <div>
          <h2 className="sr-footer-hd">Explore</h2>
          <ul className="sr-footer-links">
            <li><a href={`${home}#packages`}>{config.name} Packages</a></li>
            <li><a href={`${home}#destinations`}>Destinations</a></li>
            <li><a href={`${home}#why-us`}>Why Us</a></li>
            <li><a href={`${home}#faq`}>FAQs</a></li>
          </ul>
        </div>

        <div>
          <h2 className="sr-footer-hd">Contact Info</h2>
          <address className="sr-footer-contact">
            <p>
              <FiMapPin aria-hidden="true" />
              <span>
                {address.street}, {address.locality}, {address.region} {address.postalCode}
              </span>
            </p>
            <p>
              <FiPhone aria-hidden="true" /> <a href={`tel:${SITE.phoneE164}`}>{SITE.phoneDisplay}</a>
            </p>
            <p>
              <FaWhatsapp aria-hidden="true" />{" "}
              <a href={whatsappLink(config.whatsapp.greeting)} target="_blank" rel="noopener noreferrer">
                WhatsApp us
              </a>
            </p>
            <p>
              <FiMail aria-hidden="true" /> <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            </p>
          </address>
        </div>
      </div>

      <div className="sr-container sr-footer-bottom">
        <p>© {new Date().getFullYear()} {SITE.legalName}. All rights reserved.</p>
        <nav aria-label="Legal" className="sr-footer-legal">
          <a href={SITE.legal.privacy}>Privacy Policy</a>
          <a href={SITE.legal.terms}>Terms &amp; Conditions</a>
          <a href={SITE.legal.refund}>Refund Policy</a>
        </nav>
      </div>

      <details className="sr-container sr-credits">
        <summary>Photo credits</summary>
        <ul>
          {config.credits.map(c => (
            <li key={c.url}>
              <a href={c.url} target="_blank" rel="noopener noreferrer nofollow">{c.what}</a> by {c.who}, {c.license}
            </li>
          ))}
        </ul>
      </details>
    </footer>
  );
}
