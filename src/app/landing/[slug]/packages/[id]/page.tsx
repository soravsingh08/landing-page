import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PackagePage, { findPackage, packageMetadata } from "@/components/package/PackagePage";
import { HOME_LANDING, LANDINGS } from "@/data/destinations";

type Route = { params: Promise<{ slug: string; id: string }> };

// One pre-rendered page per package on every other landing; unknown slugs or ids 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return Object.values(LANDINGS)
    .filter(l => l !== HOME_LANDING)
    .flatMap(l => l.packages.map(p => ({ slug: l.slug, id: p.id })));
}

async function resolve(params: Route["params"]) {
  const { slug, id } = await params;
  const config = LANDINGS[slug];
  if (!config || config === HOME_LANDING) return null;
  const pkg = findPackage(config, id);
  return pkg ? { config, pkg } : null;
}

export async function generateMetadata({ params }: Route): Promise<Metadata> {
  const found = await resolve(params);
  return found ? packageMetadata(found.config, found.pkg) : {};
}

export default async function Page({ params }: Route) {
  const found = await resolve(params);
  if (!found) notFound();
  return <PackagePage config={found.config} pkg={found.pkg} />;
}
