import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PackagePage, { findPackage, packageMetadata } from "@/components/package/PackagePage";
import { HOME_LANDING } from "@/data/destinations";

type Route = { params: Promise<{ id: string }> };

// One pre-rendered page per package on the home landing; unknown ids 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return HOME_LANDING.packages.map(p => ({ id: p.id }));
}

export async function generateMetadata({ params }: Route): Promise<Metadata> {
  const pkg = findPackage(HOME_LANDING, (await params).id);
  return pkg ? packageMetadata(HOME_LANDING, pkg) : {};
}

export default async function Page({ params }: Route) {
  const pkg = findPackage(HOME_LANDING, (await params).id);
  if (!pkg) notFound();
  return <PackagePage config={HOME_LANDING} pkg={pkg} />;
}
