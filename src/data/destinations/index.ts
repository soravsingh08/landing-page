import type { LandingConfig } from "../landing";
import { banaras } from "./banaras";
import { thailand } from "./thailand";

// Every landing page. `/` renders Banaras; `/landing/<slug>` renders the rest.
// To add a destination: create a config next to these and list it here.
export const LANDINGS: Record<string, LandingConfig> = { banaras, thailand };

export const HOME_LANDING = banaras;
