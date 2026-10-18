import type { LandingConfig } from "@/data/landing";

export default function Faq({ config }: { config: LandingConfig }) {
  const { faq } = config;
  return (
    <section id="faq" className="sr-section" aria-labelledby="sr-faq-title">
      <div className="sr-container sr-faq">
        <div className="sr-section-hd" data-aos="fade-up">
          <p className="sr-eyebrow">Good to Know</p>
          <h2 id="sr-faq-title" className="sr-title">{faq.title}</h2>
          <p className="sr-lead">{faq.lead}</p>
        </div>
        <div className="sr-faq-list">
          {faq.items.map((f, i) => (
            <details key={f.q} className="sr-faq-item" data-aos="fade-up" data-aos-delay={i * 50} open={i === 0}>
              <summary>
                <h3>{f.q}</h3>
              </summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
