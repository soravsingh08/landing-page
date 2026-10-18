import { FiArrowRight } from "react-icons/fi";
import { maxDiscountPct, type LandingConfig } from "@/data/landing";
import { CountdownTiles } from "../Countdown";
import EnquireButton from "../enquiry/EnquireButton";

/** Compact sale strip between sections — lotus badge, offer, live countdown, CTA. */
export default function OfferBanner({ config, source }: { config: LandingConfig; source: string }) {
  return (
    <section className="sr-offer-wrap" aria-label="Current offer">
      <div className="sr-container">
        <div className="sr-offer" data-aos="fade-up">
          <span className="sr-offer-badge" aria-hidden="true">
            <span className="sr-offer-lotus" />
          </span>

          <div className="sr-offer-copy">
            <p className="sr-offer-eyebrow">
              <span className="sr-offer-live" aria-hidden="true" /> Limited-time offer
            </p>
            <p className="sr-offer-text">
              <strong>{config.offer.name}</strong>: up to <strong>{maxDiscountPct(config)}% off</strong> on selected yatras
            </p>
          </div>

          <CountdownTiles label="Ends in" tone="dark" />

          <EnquireButton source={source} className="sr-offer-btn">
            Grab this deal <FiArrowRight aria-hidden="true" />
          </EnquireButton>
        </div>
      </div>
    </section>
  );
}
