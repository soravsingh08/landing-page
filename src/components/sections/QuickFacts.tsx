import type { IconType } from "react-icons";
import { LuCalendarDays, LuCar, LuClock3, LuPlane, LuStamp, LuWallet } from "react-icons/lu";
import type { FactIcon, LandingConfig } from "@/data/landing";

const ICONS: Record<FactIcon, IconType> = {
  calendar: LuCalendarDays,
  plane: LuPlane,
  car: LuCar,
  currency: LuWallet,
  clock: LuClock3,
  passport: LuStamp,
};

/** "Good to know" strip — the practical facts first-time visitors look for. */
export default function QuickFacts({ config }: { config: LandingConfig }) {
  if (!config.facts?.length) return null;
  return (
    <section className="sr-facts" aria-label="Good to know">
      <div className="sr-container">
        <ul className="sr-facts-list">
          {config.facts.map((f, i) => {
            const Icon = ICONS[f.icon];
            return (
              <li key={f.label} data-aos="fade-up" data-aos-delay={i * 60}>
                <span className="sr-facts-icon"><Icon aria-hidden="true" /></span>
                <span>
                  <span className="sr-facts-label">{f.label}</span>
                  <strong>{f.value}</strong>
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
