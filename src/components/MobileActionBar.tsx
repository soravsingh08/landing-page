import { FaWhatsapp } from "react-icons/fa6";
import { FiPhone } from "react-icons/fi";
import { SITE, whatsappLink } from "@/data/site";
import EnquireButton from "./enquiry/EnquireButton";

/** Thumb-reach Call / WhatsApp / Enquire bar, phones only. */
export default function MobileActionBar({ greeting }: { greeting: string }) {
  return (
    <div className="sr-mobile-bar">
      <a href={`tel:${SITE.phoneE164}`} className="sr-mobile-bar-link">
        <FiPhone aria-hidden="true" /> Call
      </a>
      <a
        href={whatsappLink(greeting)}
        target="_blank"
        rel="noopener noreferrer"
        className="sr-mobile-bar-link sr-mobile-bar-link--wa"
      >
        <FaWhatsapp aria-hidden="true" /> WhatsApp
      </a>
      <EnquireButton source="mobile-bar" quote className="sr-mobile-bar-cta">
        Get Best Price
      </EnquireButton>
    </div>
  );
}
