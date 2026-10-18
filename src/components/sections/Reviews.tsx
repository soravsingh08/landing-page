import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import { MdStar, MdVerified } from "react-icons/md";
import { packagePath, type LandingConfig } from "@/data/landing";
import ReviewMedia from "../reviews/ReviewMedia";

/** Traveller stories — photo/clip, name, stars, review, link to the package they booked. */
export default function Reviews({ config }: { config: LandingConfig }) {
  const { reviews } = config;
  // LandingPage already strips sample entries from production builds.
  const items = reviews?.items ?? [];
  if (!reviews || items.length === 0) return null;

  return (
    <section id="reviews" className="sr-section" aria-labelledby="sr-reviews-title">
      <div className="sr-container">
        <div className="sr-section-hd" data-aos="fade-up">
          <p className="sr-eyebrow">{reviews.eyebrow}</p>
          <h2 id="sr-reviews-title" className="sr-title">{reviews.title}</h2>
        </div>

        <div className="sr-reviews">
          {items.map((r, i) => {
            const pkg = r.packageId ? config.packages.find(p => p.id === r.packageId) : undefined;
            return (
              <article key={`${r.name}-${i}`} className="sr-review" data-aos="fade-up" data-aos-delay={(i % 2) * 100}>
                {r.sample && <span className="sr-review-sample">Sample: replace before launch</span>}
                <ReviewMedia review={r} />

                <div className="sr-review-body">
                  <header className="sr-review-head">
                    <span className="sr-review-avatar" aria-hidden="true">{r.name.charAt(0)}</span>
                    <div>
                      <p className="sr-review-name">
                        {r.name} <MdVerified className="sr-review-verified" aria-label="Verified traveller" />
                      </p>
                      {r.location && <p className="sr-review-place">{r.location}</p>}
                    </div>
                  </header>

                  <p className="sr-review-stars" aria-label={`Rated ${r.rating} out of 5`}>
                    {Array.from({ length: 5 }, (_, s) => (
                      <MdStar key={s} aria-hidden="true" className={s < r.rating ? "is-on" : undefined} />
                    ))}
                  </p>

                  <blockquote className="sr-review-text">{r.text}</blockquote>

                  {pkg && (
                    <div className="sr-review-foot">
                      <Link href={packagePath(config, pkg)} className="sr-review-link">
                        View this package <FiArrowRight aria-hidden="true" />
                      </Link>
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
