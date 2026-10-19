import type { Metadata } from "next";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa6";
import {
  FiArrowLeft,
  FiArrowRight,
  FiCalendar,
  FiCheck,
  FiFileText,
  FiInfo,
  FiMapPin,
  FiPhone,
  FiShield,
  FiX,
} from "react-icons/fi";
import { LuBed, LuTag } from "react-icons/lu";
import {
  days,
  discountPct,
  durationLabel,
  formatINR,
  landingHref,
  packagePath,
  packageSlides,
  unitFor,
  type LandingConfig,
  type TourPackage,
} from "@/data/landing";
import { SITE, siteUrl, whatsappLink } from "@/data/site";
import AosInit from "../AosInit";
import Header from "../Header";
import MobileActionBar from "../MobileActionBar";
import WhatsAppFloat from "../WhatsAppFloat";
import EnquireButton from "../enquiry/EnquireButton";
import EnquiryProvider from "../enquiry/EnquiryProvider";
import LeadForm from "../enquiry/LeadForm";
import { publicConfig } from "../LandingPage";
import PackageCard from "../packages/PackageCard";
import { INCLUDE_META } from "../packages/includes";
import Faq from "../sections/Faq";
import Footer from "../sections/Footer";
import "./package-page.css";

type Props = { config: LandingConfig; pkg: TourPackage };

const pad = (n: number) => String(n).padStart(2, "0");

export function findPackage(config: LandingConfig, id: string) {
  return config.packages.find(p => p.id === id);
}

export function packageMetadata(config: LandingConfig, pkg: TourPackage): Metadata {
  const title = `${pkg.title}, ${durationLabel(pkg.nights)} from ${formatINR(pkg.price)} | ${SITE.brand}`;
  const description =
    pkg.summary ?? `${durationLabel(pkg.nights)} ${config.name} tour: ${pkg.highlights.join(", ")}. Plan it with ${SITE.brand}.`;
  const image = pkg.heroImage ?? pkg.image;
  return {
    title,
    description,
    alternates: { canonical: packagePath(config, pkg) },
    openGraph: {
      type: "website",
      locale: "en_IN",
      url: packagePath(config, pkg),
      siteName: SITE.brand,
      title,
      description,
      images: [{ url: image.src, width: image.width, height: image.height, alt: pkg.heroImageAlt ?? pkg.imageAlt }],
    },
    twitter: { card: "summary_large_image", title, description, images: [image.src] },
  };
}

function structuredData(config: LandingConfig, pkg: TourPackage) {
  const url = siteUrl();
  const pageUrl = `${url}${packagePath(config, pkg)}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TouristTrip",
        "@id": `${pageUrl}#trip`,
        name: pkg.title,
        description: pkg.summary ?? pkg.highlights.join(", "),
        url: pageUrl,
        image: `${url}${(pkg.heroImage ?? pkg.image).src}`,
        touristType: pkg.types,
        itinerary: {
          "@type": "ItemList",
          itemListElement: (pkg.itinerary ?? []).map((d, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: `Day ${i + 1}: ${d.title}`,
            description: d.detail,
          })),
        },
        offers: {
          "@type": "Offer",
          price: pkg.price,
          priceCurrency: "INR",
          availability: "https://schema.org/InStock",
          url: pageUrl,
        },
        provider: { "@type": "TravelAgency", name: SITE.legalName, url: SITE.mainSite, telephone: SITE.phoneE164 },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: `${config.name} Tour Packages`, item: `${url}${config.path === "/" ? "" : config.path}` },
          { "@type": "ListItem", position: 2, name: pkg.title, item: pageUrl },
        ],
      },
    ],
  };
}

/** Distinct photos of the trip for the "glimpses" grid: the hero, each day's photo (captioned with
 *  that day), the card photo, then photos of the route's places (captioned with the place). */
function tripPhotos(config: LandingConfig, pkg: TourPackage) {
  const items: { image: StaticImageData; alt: string; caption?: string }[] = [];
  const add = (image: StaticImageData | undefined, alt: string, caption?: string) => {
    if (image && !items.some(i => i.image.src === image.src)) items.push({ image, alt, caption });
  };
  add(pkg.heroImage, pkg.heroImageAlt ?? pkg.imageAlt);
  pkg.itinerary?.forEach((d, i) => add(d.image, d.imageAlt ?? d.title, `Day ${i + 1} · ${d.title}`));
  add(pkg.image, pkg.imageAlt);
  config.places.items.filter(p => pkg.route.includes(p.name)).forEach(p => add(p.image, p.alt, p.name));
  return items.slice(0, 5);
}

/** A package's own page — hero, day-wise plan, inclusions, photos, enquiry form, FAQs and related trips. */
export default function PackagePage({ config: source, pkg }: Props) {
  const config = publicConfig(source);
  const home = config.path;
  const unit = unitFor(config, pkg);
  const off = discountPct(pkg);
  const save = pkg.oldPrice ? pkg.oldPrice - pkg.price : 0;
  const greeting = `Hi! I'm interested in the ${pkg.title} (${durationLabel(pkg.nights)}).`;
  const itinerary = pkg.itinerary ?? [];
  const photos = tripPhotos(config, pkg);
  const related = [
    ...config.packages.filter(p => p.id !== pkg.id && p.types.some(t => pkg.types.includes(t))),
    ...config.packages.filter(p => p.id !== pkg.id && !p.types.some(t => pkg.types.includes(t))),
  ].slice(0, 3);

  return (
    <EnquiryProvider config={config}>
      <script
        type="application/ld+json"
        // JSON.stringify output from our own data; "<" escaped so it can't close the script tag.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData(config, pkg)).replace(/</g, "\\u003c") }}
      />
      <AosInit />
      <Header home={home} />

      <main>
        {/* ---------- hero ---------- */}
        <section id="top" className="sr-pd-hero" aria-labelledby="sr-pd-title">
          <Image
            quality={80}
            src={pkg.heroImage ?? pkg.image}
            alt={pkg.heroImageAlt ?? pkg.imageAlt}
            fill
            priority
            placeholder="blur"
            sizes="100vw"
            className="sr-pd-hero-img"
          />
          <div className="sr-pd-hero-shade" aria-hidden="true" />

          <div className="sr-container sr-pd-hero-grid">
            <div className="sr-hero-in">
              <Link href={landingHref(config, "packages")} className="sr-pd-crumb">
                <FiArrowLeft aria-hidden="true" /> All {config.name} packages
              </Link>
              <p className="sr-hero-eyebrow">
                <span className="sr-hero-eyebrow-dot" aria-hidden="true" />
                {durationLabel(pkg.nights)} · {pkg.route.join(" · ")}
              </p>
              <h1 id="sr-pd-title" className="sr-pd-title">{pkg.title}</h1>
              {pkg.summary && <p className="sr-pd-sub">{pkg.summary}</p>}

              <p className="sr-pd-price">
                <strong>{formatINR(pkg.price)}</strong>
                {unit && <span className="sr-pd-price-unit">{unit}</span>}
                {pkg.oldPrice && <s>{formatINR(pkg.oldPrice)}</s>}
                {save > 0 && (
                  <span className="sr-pd-save">
                    <LuTag aria-hidden="true" /> Save {formatINR(save)} · {off}% off
                  </span>
                )}
              </p>

              <div className="sr-hero-ctas">
                <EnquireButton packageId={pkg.id} source="package-hero" className="sr-hero-btn sr-hero-btn--primary">
                  Get best price <FiArrowRight aria-hidden="true" />
                </EnquireButton>
                <a href={whatsappLink(greeting)} target="_blank" rel="noopener noreferrer" className="sr-hero-btn sr-hero-btn--glass sr-pd-wa-btn">
                  <FaWhatsapp aria-hidden="true" /> Chat on WhatsApp
                </a>
              </div>

              {!!pkg.includes?.length && (
                <ul className="sr-pd-includes" aria-label="Included">
                  {pkg.includes.map(key => {
                    const { icon: Icon, label } = INCLUDE_META[key];
                    return (
                      <li key={key}>
                        <Icon aria-hidden="true" /> {label}
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

            {itinerary.length > 0 && (
              <aside className="sr-pd-route sr-hero-in" aria-label="Your route">
                <p className="sr-pd-route-hd">
                  <FiMapPin aria-hidden="true" /> Your route
                </p>
                <ol>
                  {itinerary.map((d, i) => (
                    <li key={d.title + i}>
                      {d.image && (
                        <span className="sr-pd-route-thumb">
                          <Image src={d.image} alt="" fill sizes="68px" />
                        </span>
                      )}
                      <span className="sr-pd-route-text">
                        <span className="sr-pd-route-day">Day {i + 1}</span>
                        <span className="sr-pd-route-city">{d.city ?? d.title}</span>
                        {d.city && <span className="sr-pd-route-note">{d.title}</span>}
                      </span>
                      <span className="sr-pd-route-num" aria-hidden="true">{i + 1}</span>
                    </li>
                  ))}
                </ol>
              </aside>
            )}
          </div>
        </section>

        {/* ---------- day-wise plan ---------- */}
        <section id="itinerary" className="sr-section" aria-labelledby="sr-pd-itin-title">
          <div className="sr-container">
            <div className="sr-section-hd sr-section-hd--center" data-aos="fade-up">
              <p className="sr-eyebrow">Day-wise plan</p>
              <h2 id="sr-pd-itin-title" className="sr-title">
                Your {days(pkg.nights)}-Day Journey
              </h2>
              <p className="sr-lead">
                {durationLabel(pkg.nights)} · {pkg.route.join(" → ")}
              </p>
            </div>

            {itinerary.length > 0 ? (
              <ol className="sr-pd-days">
                {itinerary.map((d, i) => (
                  <li key={d.title + i} data-aos="fade-up">
                    <span className="sr-pd-day-num" aria-hidden="true">{pad(i + 1)}</span>
                    <article className="sr-pd-day">
                      <header className="sr-pd-day-hd">
                        {d.image && (
                          <span className="sr-pd-day-thumb">
                            <Image src={d.image} alt="" fill sizes="48px" />
                          </span>
                        )}
                        <h3>
                          <span className="sr-pd-day-kicker">
                            Day {i + 1}
                            {d.city && ` · ${d.city}`}
                          </span>
                          <span className="sr-pd-day-title">{d.title}</span>
                        </h3>
                      </header>
                      <div className={`sr-pd-day-body${d.image ? "" : " sr-pd-day-body--text"}`}>
                        {d.image && (
                          <div className="sr-pd-day-media">
                            <Image
                              quality={80}
                              src={d.image}
                              alt={d.imageAlt ?? d.title}
                              fill
                              placeholder="blur"
                              sizes="(max-width: 767px) 90vw, 440px"
                            />
                          </div>
                        )}
                        <div>
                          <p className="sr-pd-day-label">Today&apos;s plan</p>
                          <p className="sr-pd-day-text">{d.detail}</p>
                          {!!d.highlights?.length && (
                            <ul className="sr-pd-chips">
                              {d.highlights.map(h => (
                                <li key={h}>
                                  <FiCheck aria-hidden="true" /> {h}
                                </li>
                              ))}
                            </ul>
                          )}
                          {d.stay && (
                            <p className="sr-pd-day-stay">
                              <LuBed aria-hidden="true" /> {d.stay}
                            </p>
                          )}
                        </div>
                      </div>
                    </article>
                  </li>
                ))}
              </ol>
            ) : (
              <ul className="sr-pd-chips sr-pd-chips--center" data-aos="fade-up">
                {pkg.highlights.map(h => (
                  <li key={h}>
                    <FiCheck aria-hidden="true" /> {h}
                  </li>
                ))}
              </ul>
            )}

            <div className="sr-pd-band" data-aos="fade-up">
              <Image src={pkg.image} alt="" fill placeholder="blur" sizes="(max-width: 1100px) 100vw, 1040px" className="sr-pd-band-img" />
              <div className="sr-pd-band-shade" aria-hidden="true" />
              <div className="sr-pd-band-copy">
                <p className="sr-pd-band-title">Want this plan on WhatsApp?</p>
                <p className="sr-pd-band-sub">Get the day-wise plan and a quote for your dates, free.</p>
              </div>
              <EnquireButton packageId={pkg.id} source="package-plan" className="sr-hero-btn sr-hero-btn--primary">
                <FiFileText aria-hidden="true" /> Get the day-wise plan
              </EnquireButton>
            </div>
          </div>
        </section>

        {/* ---------- inclusions ---------- */}
        {!!(pkg.inclusions?.length || pkg.exclusions?.length) && (
          <section className="sr-section sr-section--cream" aria-labelledby="sr-pd-incl-title">
            <div className="sr-container">
              <div className="sr-section-hd sr-section-hd--center" data-aos="fade-up">
                <p className="sr-eyebrow">Transparent pricing</p>
                <h2 id="sr-pd-incl-title" className="sr-title">
                  What Your {formatINR(pkg.price)} Covers
                </h2>
                <p className="sr-lead">Exactly what is and isn&apos;t included, so there are no surprises.</p>
              </div>

              <div className="sr-pd-incl">
                {!!pkg.inclusions?.length && (
                  <div className="sr-pd-incl-card sr-pd-incl-card--yes" data-aos="fade-up">
                    <h3>
                      <span className="sr-pd-incl-icon" aria-hidden="true"><FiCheck /></span>
                      What&apos;s included
                    </h3>
                    <ul>
                      {pkg.inclusions.map(x => (
                        <li key={x}>
                          <span className="sr-pd-incl-dot" aria-hidden="true"><FiCheck /></span>
                          {x}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {!!pkg.exclusions?.length && (
                  <div className="sr-pd-incl-card sr-pd-incl-card--no" data-aos="fade-up" data-aos-delay="80">
                    <h3>
                      <span className="sr-pd-incl-icon" aria-hidden="true"><FiX /></span>
                      What&apos;s not included
                    </h3>
                    <ul>
                      {pkg.exclusions.map(x => (
                        <li key={x}>
                          <span className="sr-pd-incl-dot" aria-hidden="true"><FiX /></span>
                          {x}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {!!pkg.onRequest?.length && (
                <p className="sr-pd-onrequest" data-aos="fade-up">
                  <FiInfo aria-hidden="true" />
                  <span>
                    <strong>On request: </strong>
                    {pkg.onRequest.join(" · ")}
                  </span>
                </p>
              )}
            </div>
          </section>
        )}

        {/* ---------- photos ---------- */}
        {photos.length >= 3 && (
          <section className="sr-section" aria-labelledby="sr-pd-gallery-title">
            <div className="sr-container">
              <div className="sr-section-hd sr-section-hd--center" data-aos="fade-up">
                <p className="sr-eyebrow">Glimpses of your trip</p>
                <h2 id="sr-pd-gallery-title" className="sr-title">{pkg.route.join(", ")} in Pictures</h2>
              </div>
              <div className={`sr-pd-gallery${photos.length >= 5 ? "" : " sr-pd-gallery--row"}`}>
                {photos.slice(0, photos.length >= 5 ? 5 : 3).map((p, i) => (
                  <figure key={p.image.src} data-aos="fade-up" data-aos-delay={i * 60}>
                    <Image
                      quality={80}
                      src={p.image}
                      alt={p.alt}
                      fill
                      placeholder="blur"
                      sizes={i === 0 && photos.length >= 5 ? "(max-width: 767px) 100vw, 600px" : "(max-width: 767px) 50vw, 300px"}
                    />
                    {p.caption && <figcaption>{p.caption}</figcaption>}
                  </figure>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ---------- enquiry ---------- */}
        <section id="enquire" className="sr-pd-lead" aria-labelledby="sr-pd-lead-title">
          <div className="sr-container sr-pd-lead-grid">
            <div data-aos="fade-right">
              <p className="sr-eyebrow">Free itinerary + quote</p>
              <h2 id="sr-pd-lead-title" className="sr-title sr-pd-lead-title">
                Plan this trip with our {config.specialist}
              </h2>
              <ul className="sr-pd-benefits">
                <li>
                  <span aria-hidden="true"><FiFileText /></span> Day-wise plan and best price, sent on WhatsApp
                </li>
                <li>
                  <span aria-hidden="true"><FiCalendar /></span> Your dates, hotels and pace, tailored to your group
                </li>
                <li>
                  <span aria-hidden="true"><FiShield /></span> Pickup, stays and sightseeing arranged before you arrive
                </li>
              </ul>
              <div className="sr-pd-talk">
                <p className="sr-pd-talk-title">Prefer to talk to a person?</p>
                <p className="sr-pd-talk-sub">Our {SITE.address.locality}-based travel team is a call away.</p>
                <div className="sr-pd-talk-actions">
                  <a href={`tel:${SITE.phoneE164}`} className="sr-pd-talk-btn">
                    <FiPhone aria-hidden="true" /> {SITE.phoneDisplay}
                  </a>
                  <a href={whatsappLink(greeting)} target="_blank" rel="noopener noreferrer" className="sr-pd-talk-btn sr-pd-talk-btn--wa">
                    <FaWhatsapp aria-hidden="true" /> WhatsApp us
                  </a>
                </div>
              </div>
            </div>

            <div className="sr-quote sr-pd-quote" data-aos="fade-left">
              <p className="sr-quote-eyebrow">Free quote</p>
              <h3 className="sr-quote-title">Get this itinerary</h3>
              <p className="sr-quote-sub">
                {pkg.title} · {durationLabel(pkg.nights)} · from {formatINR(pkg.price)}
                {unit}
              </p>
              <LeadForm variant="compact" source="package-page" packageName={pkg.title} submitLabel="Get quote on WhatsApp" />
            </div>
          </div>
        </section>

        <Faq config={config} />

        {/* ---------- related ---------- */}
        {related.length > 0 && (
          <section className="sr-section sr-section--cream" aria-labelledby="sr-pd-more-title">
            <div className="sr-container">
              <div className="sr-section-hd sr-section-hd--row" data-aos="fade-up">
                <div>
                  <p className="sr-eyebrow">Keep exploring</p>
                  <h2 id="sr-pd-more-title" className="sr-title">More {config.name} Packages</h2>
                </div>
                <Link href={landingHref(config, "packages")} className="sr-btn sr-btn--outline-maroon">
                  View all packages
                </Link>
              </div>
              <div className="sr-grid sr-rail">
                {related.map((p, i) => (
                  <div key={p.id} data-aos="fade-up" data-aos-delay={i * 100}>
                    <PackageCard
                      pkg={p}
                      slides={packageSlides(config, p)}
                      href={packagePath(config, p)}
                      unit={unitFor(config, p)}
                      tag={config.offer.name}
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer config={config} home={home} />
      <WhatsAppFloat />
      <MobileActionBar greeting={greeting} />
    </EnquiryProvider>
  );
}
