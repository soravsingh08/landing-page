import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LandingPage, { landingMetadata } from "@/components/LandingPage";
import { HOME_LANDING, LANDINGS } from "@/data/destinations";

type Route = { params: Promise<{ slug: string }> };

// Pre-render every destination at build time; unknown slugs 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(LANDINGS)
    .filter(slug => slug !== HOME_LANDING.slug)
    .map(slug => ({ slug }));
}

export async function generateMetadata({ params }: Route): Promise<Metadata> {
  const config = LANDINGS[(await params).slug];
  return config ? landingMetadata(config) : {};
}

export default async function Page({ params }: Route) {
  const config = LANDINGS[(await params).slug];
  if (!config || config === HOME_LANDING) notFound();
  return <LandingPage config={config} />;
}
