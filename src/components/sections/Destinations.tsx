import Image from "next/image";
import type { LandingConfig } from "@/data/landing";
import EnquireButton from "../enquiry/EnquireButton";

export default function Destinations({ config }: { config: LandingConfig }) {
  const { places } = config;
  return (
    <section id="destinations" className="sr-section" aria-labelledby="sr-dest-title">
      <div className="sr-container">
        <div className="sr-section-hd sr-section-hd--center" data-aos="fade-up">
          <p className="sr-eyebrow">{places.eyebrow}</p>
          <h2 id="sr-dest-title" className="sr-title">{places.title}</h2>
          <p className="sr-lead">{places.lead}</p>
        </div>

        <div className="sr-dest-grid">
          {places.items.map((d, i) => (
            <div key={d.name} className={`sr-dest${i === 0 ? " sr-dest--tall" : ""}`} data-aos="zoom-in" data-aos-delay={i * 70}>
              <Image quality={80} src={d.image} alt={d.alt} fill placeholder="blur" sizes="(max-width: 767px) 50vw, 33vw" />
              <div className="sr-dest-shade" aria-hidden="true" />
              <div className="sr-dest-body">
                <h3>{d.name}</h3>
                <p>{d.tagline}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="sr-center" data-aos="fade-up">
          <EnquireButton source="destinations" className="sr-btn sr-btn--maroon">
            {places.cta}
          </EnquireButton>
        </div>
      </div>
    </section>
  );
}
