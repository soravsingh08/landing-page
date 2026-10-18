import type { Metadata } from "next";
import AosInit from "./AosInit";
import Header from "./Header";
import MobileActionBar from "./MobileActionBar";
import WhatsAppFloat from "./WhatsAppFloat";
import EnquiryProvider from "./enquiry/EnquiryProvider";
import Destinations from "./sections/Destinations";
import Experiences from "./sections/Experiences";
import BestPackages from "./sections/BestPackages";
import Faq from "./sections/Faq";
import Footer from "./sections/Footer";
import Hero from "./sections/Hero";
import OfferBanner from "./sections/OfferBanner";
import PackagesSection from "./sections/PackagesSection";
import PhotoGallery from "./sections/PhotoGallery";
import Reviews from "./sections/Reviews";
import WhyUs from "./sections/WhyUs";
import { days, packagePath, type LandingConfig } from "@/data/landing";
import { SITE, siteUrl } from "@/data/site";

export function landingMetadata(config: LandingConfig): Metadata {
  const { seo } = config;
  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    alternates: { canonical: config.path },
    openGraph: {
      type: "website",
      locale: "en_IN",
      url: config.path,
      siteName: SITE.brand,
      title: seo.title,
      description: seo.description,
      images: [{ url: seo.ogImage, width: 1200, height: 630, alt: seo.ogAlt }],
    },
    twitter: { card: "summary_large_image", title: seo.title, description: seo.description, images: [seo.ogImage] },
  };
}

function structuredData(config: LandingConfig) {
  const url = siteUrl();
  const pageUrl = `${url}${config.path === "/" ? "" : config.path}`;
  const agencyId = `${SITE.mainSite}/#organization`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TravelAgency",
        "@id": agencyId,
        name: SITE.legalName,
        alternateName: SITE.brand,
        url: SITE.mainSite,
        logo: `${url}/srivastava-route-logo.png`,
        telephone: SITE.phoneE164,
        email: SITE.email,
        priceRange: "₹₹",
        address: {
          "@type": "PostalAddress",
          streetAddress: SITE.address.street,
          addressLocality: SITE.address.locality,
          addressRegion: SITE.address.region,
          postalCode: SITE.address.postalCode,
          addressCountry: SITE.address.country,
        },
        areaServed: "IN",
      },
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: `${config.name} Tour Packages`,
        inLanguage: "en-IN",
        image: `${url}${config.seo.ogImage}`,
        about: { "@id": agencyId },
      },
      {
        "@type": "ItemList",
        name: `${config.name} Tour Packages`,
        itemListElement: config.packages.map((p, i) => ({
          "@type": "ListItem",
          position: i + 1,
          item: {
            "@type": "TouristTrip",
            name: p.title,
            description: `${p.nights} nights / ${days(p.nights)} days: ${p.highlights.join(", ")}.`,
            touristType: p.types,
            itinerary: {
              "@type": "ItemList",
              itemListElement: p.route.map((city, j) => ({
                "@type": "ListItem",
                position: j + 1,
                item: { "@type": "City", name: city },
              })),
            },
            offers: {
              "@type": "Offer",
              price: p.price,
              priceCurrency: "INR",
              availability: "https://schema.org/InStock",
              url: `${url}${packagePath(config, p)}`,
              offeredBy: { "@id": agencyId },
            },
            provider: { "@id": agencyId },
          },
        })),
      },
      {
        "@type": "FAQPage",
        mainEntity: config.faq.items.map(f => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };
}

/** Sample reviews are layout placeholders — drop them from production builds entirely,
 *  so they're neither rendered nor serialised into the page data for client components. */
export function publicConfig(source: LandingConfig): LandingConfig {
  return process.env.NODE_ENV === "production" && source.reviews
    ? { ...source, reviews: { ...source.reviews, items: source.reviews.items.filter(r => !r.sample) } }
    : source;
}

/** One destination landing page, entirely driven by its config. */
export default function LandingPage({ config: source }: { config: LandingConfig }) {
  const config = publicConfig(source);
  return (
    <EnquiryProvider config={config}>
      <script
        type="application/ld+json"
        // JSON.stringify output from our own data; "<" escaped so it can't close the script tag.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData(config)).replace(/</g, "\\u003c") }}
      />
      <AosInit />
      <Header />
      <main>
        <Hero config={config} />
        <PhotoGallery config={config} />
        <BestPackages config={config} />
        <PackagesSection config={config} />
        <OfferBanner config={config} source="offer-banner-1" />
        <Experiences config={config} />
        <Destinations config={config} />
        <WhyUs config={config} />
        <Reviews config={config} />
        <Faq config={config} />
      </main>
      <Footer config={config} />
      <WhatsAppFloat />
      <MobileActionBar greeting={config.whatsapp.greeting} />
    </EnquiryProvider>
  );
}
