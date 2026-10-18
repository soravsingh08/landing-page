import type { LandingConfig } from "@/data/landing";
import PackagesExplorer from "../packages/PackagesExplorer";

export default function PackagesSection({ config }: { config: LandingConfig }) {
  const { eyebrow, title, lead, highlight } = config.packagesSection;
  const at = highlight ? title.indexOf(highlight) : -1;
  return (
    <section id="packages" className="sr-section sr-section--cream" aria-labelledby="sr-packages-title">
      <div className="sr-container">
        <div className="sr-section-hd sr-section-hd--center" data-aos="fade-up">
          <p className="sr-eyebrow">{eyebrow}</p>
          <h2 id="sr-packages-title" className="sr-title">
            {at < 0 ? (
              title
            ) : (
              <>
                {title.slice(0, at)}
                <span className="sr-shimmer">{highlight}</span>
                {title.slice(at + highlight!.length)}
              </>
            )}
          </h2>
          <p className="sr-lead">{lead}</p>
        </div>
        <div data-aos="fade-up" data-aos-delay="100">
          <PackagesExplorer />
        </div>
      </div>
    </section>
  );
}
