import type { IconType } from "react-icons";
import { LuBed, LuBus, LuCamera, LuCoffee, LuPlane, LuShip, LuUserRound } from "react-icons/lu";
import type { Include } from "@/data/landing";

/** Icon + label for each "what's included" key on a package. */
export const INCLUDE_META: Record<Include, { icon: IconType; label: string }> = {
  hotel: { icon: LuBed, label: "Hotel" },
  breakfast: { icon: LuCoffee, label: "Breakfast" },
  transfers: { icon: LuBus, label: "Transfers" },
  sightseeing: { icon: LuCamera, label: "Sightseeing" },
  guide: { icon: LuUserRound, label: "Guide" },
  cruise: { icon: LuShip, label: "Cruise" },
  flights: { icon: LuPlane, label: "Flights" },
};
