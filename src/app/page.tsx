import LandingPage, { landingMetadata } from "@/components/LandingPage";
import { HOME_LANDING } from "@/data/destinations";

export const metadata = landingMetadata(HOME_LANDING);

export default function Home() {
  return <LandingPage config={HOME_LANDING} />;
}
