import Image from "next/image";
import type { IconType } from "react-icons";
import { LuCompass, LuShieldCheck, LuStamp, LuUsers, LuUtensils } from "react-icons/lu";
import { MdTempleHindu } from "react-icons/md";
import type { LandingConfig } from "@/data/landing";

const ICONS: Record<LandingConfig["why"]["items"][number]["icon"], IconType> = {
  compass: LuCompass,
  shield: LuShieldCheck,
  guide: LuUsers,
  temple: MdTempleHindu,
  food: LuUtensils,
  passport: LuStamp,
};

export default function WhyUs({ config }: { config: LandingConfig }) {
  const { why, steps } = config;
  return (
    <section id="why-us" className="sr-section sr-section--cream" aria-labelledby="sr-why-title">
      <div className="sr-container sr-why">
        <div className="sr-why-media" data-aos="fade-right">
          <div className="sr-why-img sr-why-img--main">
            <Image quality={90} src={why.main} alt={why.mainAlt} fill placeholder="blur" sizes="(max-width: 900px) 90vw, 460px" />
          </div>
          <div className="sr-why-img sr-why-img--inset">
            <Image quality={90} src={why.inset} alt={why.insetAlt} fill placeholder="blur" sizes="220px" />
          </div>
          <div className="sr-why-stamp" aria-hidden="true">
            <span>{why.stamp[0]}</span>
            <strong>{why.stamp[1]}</strong>
          </div>
        </div>

        <div>
          <div className="sr-section-hd" data-aos="fade-up">
            <p className="sr-eyebrow">{why.eyebrow}</p>
            <h2 id="sr-why-title" className="sr-title">{why.title}</h2>
            <p className="sr-lead">{why.lead}</p>
          </div>

          <div className="sr-features">
            {why.items.map((f, i) => {
              const Icon = ICONS[f.icon];
              return (
                <div key={f.title} className="sr-feature" data-aos="fade-up" data-aos-delay={i * 80}>
                  <span className="sr-feature-icon"><Icon aria-hidden="true" /></span>
                  <h3>{f.title}</h3>
                  <p>{f.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="sr-container">
        <ol className="sr-steps" aria-label="How booking works">
          {steps.map((s, i) => (
            <li key={s.title} className="sr-step" data-aos="fade-up" data-aos-delay={i * 100}>
              <span className="sr-step-num">0{i + 1}</span>
              <div>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
