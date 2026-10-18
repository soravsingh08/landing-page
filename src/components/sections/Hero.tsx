import { FiArrowRight, FiCheck, FiPhone } from "react-icons/fi";
import { cheapestPackage, formatINR, maxDiscountPct, unitFor, type LandingConfig } from "@/data/landing";
import { SITE } from "@/data/site";
import EnquireButton from "../enquiry/EnquireButton";
import LeadForm from "../enquiry/LeadForm";
import HeroSlideshow from "./HeroSlideshow";
import ScrollCue from "./ScrollCue";

export default function Hero({ config }: { config: LandingConfig }) {
  const { hero } = config;
  const from = cheapestPackage(config);
  const pct = maxDiscountPct(config);
  const slides = hero.slides?.length ? hero.slides : [{ image: hero.image, alt: hero.imageAlt, caption: config.name }];

  return (
    <section id="top" className="sr-hero" aria-labelledby="sr-hero-title">
      <HeroSlideshow slides={slides} />
      <div className="sr-hero-shade" aria-hidden="true" />

      {/* copy on the left, the quick enquiry form on the right: ad visitors can convert without scrolling */}
      <div className="sr-hero-wrap sr-hero-grid sr-hero-in">
        <div className="sr-hero-copy">
          <p className="sr-hero-eyebrow">
            <span className="sr-hero-eyebrow-dot" aria-hidden="true" />
            {hero.eyebrow}
          </p>
          <h1 id="sr-hero-title" className="sr-hero-title">
            {hero.titleLead} <span>{hero.titleAccent}</span>
          </h1>
          <p className="sr-hero-sub">{hero.sub}</p>

          <div className="sr-hero-ctas">
            <a href="#packages" className="sr-hero-btn sr-hero-btn--primary">
              Explore packages <FiArrowRight aria-hidden="true" />
            </a>
            <a href={`tel:${SITE.phoneE164}`} className="sr-hero-btn sr-hero-btn--glass">
              <FiPhone aria-hidden="true" /> {SITE.phoneDisplay}
            </a>
          </div>

          <p className="sr-hero-price">
            <span className="sr-hero-price-from">From</span>
            <strong>{formatINR(from.price)}</strong>
            <span className="sr-hero-price-unit">{unitFor(config, from)}</span>
            {pct > 0 && <span className="sr-hero-price-chip">Up to {pct}% off</span>}
          </p>

          {/* phones: trust points and one button that slides up the quote form */}
          {!!hero.proof?.length && (
            <ul className="sr-hero-proof">
              {hero.proof.map(p => (
                <li key={p}>
                  <FiCheck aria-hidden="true" /> {p}
                </li>
              ))}
            </ul>
          )}
          <EnquireButton source="hero-mobile" quote className="sr-hero-btn sr-hero-btn--primary sr-hero-sheet-btn">
            Get Free Itinerary &amp; Quote <FiArrowRight aria-hidden="true" />
          </EnquireButton>
        </div>

        <div id="enquire" className="sr-quote">
          <p className="sr-quote-eyebrow">Free quote</p>
          <h2 className="sr-quote-title">Plan your yatra</h2>
          <p className="sr-quote-sub">Prices and a day-wise plan on WhatsApp, in minutes.</p>
          <LeadForm variant="compact" source="hero-form" submitLabel="Get quote on WhatsApp" />
        </div>
      </div>

      <ScrollCue />
    </section>
  );
}
