import Image from "next/image";
import Link from "next/link";
import { FiArrowRight, FiMoon } from "react-icons/fi";
import { formatINR, packagePath, unitFor, type LandingConfig } from "@/data/landing";

/** "Our best packages": tall photo cards (badge, savings, nights, route, title, price, Explore), a grid on
 *  desktop and a swipeable row on phones. */
export default function BestPackages({ config }: { config: LandingConfig }) {
  const best = config.bestsellers;
  if (!best) return null;
  const items = best.items
    .map(i => ({ ...i, pkg: config.packages.find(p => p.id === i.packageId) }))
    .filter((i): i is typeof i & { pkg: NonNullable<typeof i.pkg> } => !!i.pkg);
  if (!items.length) return null;

  return (
    <section id="best" className="sr-section" aria-labelledby="sr-best-title">
      <div className="sr-wide">
        <div className="sr-section-hd sr-section-hd--center" data-aos="fade-up">
          <p className="sr-eyebrow">{best.eyebrow}</p>
          <h2 id="sr-best-title" className="sr-title">{best.title}</h2>
          <p className="sr-lead">{best.lead}</p>
        </div>

        <div className="sr-best-row">
          {items.map(({ pkg, badge }, i) => {
            const save = pkg.oldPrice ? pkg.oldPrice - pkg.price : 0;
            const unit = unitFor(config, pkg);
            return (
              <Link key={pkg.id} href={packagePath(config, pkg)} className="sr-best" data-aos="fade-up" data-aos-delay={i * 80}>
                <Image quality={90} src={pkg.image} alt={pkg.imageAlt} fill placeholder="blur" sizes="(max-width: 767px) 80vw, (max-width: 1023px) 45vw, 360px" />
                <span className="sr-best-shade" aria-hidden="true" />

                {badge && <span className="sr-best-badge">{badge}</span>}
                {save > 0 && <span className="sr-best-save">Save {formatINR(save)}</span>}

                <span className="sr-best-body">
                  <span className="sr-best-nights">
                    <FiMoon aria-hidden="true" /> {pkg.nights} {pkg.nights > 1 ? "Nights" : "Night"}
                  </span>
                  <span className="sr-best-route">{pkg.route.join(", ")}</span>
                  <span className="sr-best-title">{pkg.title}</span>
                  <span className="sr-best-foot">
                    <span className="sr-best-price">
                      <small>{unit ? `From · per ${unit.replace("/", "")}` : "From"}</small>
                      <span>
                        <strong>{formatINR(pkg.price)}</strong>
                        {pkg.oldPrice && <s>{formatINR(pkg.oldPrice)}</s>}
                      </span>
                    </span>
                    <span className="sr-best-go">
                      Explore <FiArrowRight aria-hidden="true" />
                    </span>
                  </span>
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
