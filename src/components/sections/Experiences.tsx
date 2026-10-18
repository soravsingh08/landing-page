import Image from "next/image";
import type { LandingConfig } from "@/data/landing";

/** Thrillophilia-style "Things to do" — image cards with a numbered overlay. */
export default function Experiences({ config }: { config: LandingConfig }) {
  const ex = config.experiences;
  if (!ex?.items.length) return null;

  return (
    <section id="experiences" className="sr-section" aria-labelledby="sr-exp-title">
      <div className="sr-container">
        <div className="sr-section-hd sr-section-hd--row" data-aos="fade-up">
          <div>
            <p className="sr-eyebrow">{ex.eyebrow}</p>
            <h2 id="sr-exp-title" className="sr-title">{ex.title}</h2>
            <p className="sr-lead">{ex.lead}</p>
          </div>
        </div>

        <div className="sr-exp-grid sr-rail">
          {ex.items.map((item, i) => (
            <article key={item.name} className="sr-exp" data-aos="fade-up" data-aos-delay={(i % 3) * 90}>
              <div className="sr-exp-media">
                <Image quality={90} src={item.image} alt={item.alt} fill placeholder="blur" sizes="(max-width: 767px) 80vw, (max-width: 1100px) 45vw, 380px" />
                <span className="sr-exp-num" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <div className="sr-exp-body">
                <h3>{item.name}</h3>
                <p>{item.tagline}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
