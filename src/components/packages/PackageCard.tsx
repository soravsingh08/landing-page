import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import { daysNightsLabel, discountPct, formatINR, type Slide, type TourPackage } from "@/data/landing";
import EnquireButton from "../enquiry/EnquireButton";
import CardGallery from "./CardGallery";
import { INCLUDE_META } from "./includes";

type Props = {
  pkg: TourPackage;
  slides: Slide[];
  /** The package's own page. */
  href: string;
  unit: string;
  /** Sale name shown as the pill under the title, e.g. "Kashi Festive Sale". */
  tag?: string;
  priority?: boolean;
};

/** Package card: rounded inset photo slider with "Save ₹X" (and any badge), duration, title, sale pill,
 *  what's included, price with the old price struck through, View + Enquire. Photo, title and View open the package page. */
export default function PackageCard({ pkg, slides, href, unit, tag, priority = false }: Props) {
  const off = discountPct(pkg);
  const save = pkg.oldPrice ? pkg.oldPrice - pkg.price : 0;
  const honeymoon = pkg.badge && /honeymoon/i.test(pkg.badge);

  return (
    <article className="sr-card">
      <CardGallery slides={slides} href={href} priority={priority}>
        {save > 0 && <span className="sr-card-save">Save {formatINR(save)}</span>}
        {pkg.badge && <span className={`sr-card-badge${honeymoon ? " sr-card-badge--red" : ""}`}>{pkg.badge}</span>}
      </CardGallery>

      <div className="sr-card-body">
        <p className="sr-card-duration">{daysNightsLabel(pkg.nights)}</p>
        <h3 className="sr-card-title">
          <Link href={href} className="sr-card-link">
            {pkg.title}
          </Link>
        </h3>

        {off > 0 && <span className="sr-card-tag">{tag ?? `${off}% off`}</span>}

        {!!pkg.includes?.length && (
          <ul className="sr-card-includes" aria-label="Included">
            {pkg.includes.slice(0, 4).map(key => {
              const { icon: Icon, label } = INCLUDE_META[key];
              return (
                <li key={key}>
                  <Icon aria-hidden="true" /> {label}
                </li>
              );
            })}
          </ul>
        )}

        <p className="sr-card-price">
          <strong>{formatINR(pkg.price)}</strong>
          {off > 0 && <s>{formatINR(pkg.oldPrice!)}</s>}
          <span>{unit}</span>
        </p>

        <div className="sr-card-actions">
          <Link href={href} className="sr-card-btn">
            View
          </Link>
          <EnquireButton packageId={pkg.id} source="package-card" className="sr-card-btn sr-card-btn--primary">
            Enquire Now <FiArrowRight aria-hidden="true" />
          </EnquireButton>
        </div>
      </div>
    </article>
  );
}
