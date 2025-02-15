import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

import AsteroidListItem from "./AsteroidListItem";
import AsteroidFilterBar from "./AsteroidFilterBar";

import { cn } from "@/lib/utils";

function AsteroidList({ className, asteroids }) {
  const [filters, setFilters] = useState({
    search: "",
    velocityMin: "",
    velocityMax: "",
    lowerDiameterMin: "",
    lowerDiameterMax: "",
    higherDiameterMin: "",
    higherDiameterMax: "",
    missDistanceMin: "",
    missDistanceMax: "",
    hazardous: "",
  });

  const filteredAsteroids = asteroids.map((asteroid) => {
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      if (
        !asteroid.name.toLowerCase().includes(searchLower) &&
        !asteroid.id.toLowerCase().includes(searchLower)
      ) {
        return { visible: false, ...asteroid };
      }
    }

    // // Filter by Velocity
    if (
      filters.velocityMin &&
      asteroid.velocity.value < Number(filters.velocityMin)
    ) {
      return { visible: false, ...asteroid };
    }
    if (
      filters.velocityMax &&
      asteroid.velocity.value > Number(filters.velocityMax)
    ) {
      return { visible: false, ...asteroid };
    }

    // Filter by Lower Diameter (asteroid.diameter.min)
    if (
      filters.lowerDiameterMin &&
      asteroid.diameter.min < Number(filters.lowerDiameterMin)
    ) {
      return { visible: false, ...asteroid };
    }
    if (
      filters.lowerDiameterMax &&
      asteroid.diameter.min > Number(filters.lowerDiameterMax)
    ) {
      return { visible: false, ...asteroid };
    }

    // Filter by Higher Diameter (asteroid.diameter.max)
    if (
      filters.higherDiameterMin &&
      asteroid.diameter.max < Number(filters.higherDiameterMin)
    ) {
      return { visible: false, ...asteroid };
    }
    if (
      filters.higherDiameterMax &&
      asteroid.diameter.max > Number(filters.higherDiameterMax)
    ) {
      return { visible: false, ...asteroid };
    }

    // Filter by Miss Distance
    if (
      filters.missDistanceMin &&
      asteroid.miss_distance.value < Number(filters.missDistanceMin)
    ) {
      return { visible: false, ...asteroid };
    }
    if (
      filters.missDistanceMax &&
      asteroid.miss_distance.value > Number(filters.missDistanceMax)
    ) {
      return { visible: false, ...asteroid };
    }

    // Filter by Hazardous
    if (filters.hazardous !== "") {
      const isHazardous = filters.hazardous === "true";
      if (asteroid.is_potentially_hazardous !== isHazardous) {
        return { visible: false, ...asteroid };
      }
    }

    return { visible: true, ...asteroid };
  });

  return (
    <>
      <AsteroidFilterBar filters={filters} setFilters={setFilters} />
      <ScrollArea className={cn("h-full w-full rounded-md border", className)}>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[-1]">
          <p className="center">No asteroids found.</p>
        </div>
        {filteredAsteroids.map((asteroid) => (
          <div key={asteroid.id} className={!asteroid.visible ? "hidden" : ""}>
            <AsteroidListItem asteroid={asteroid} />
            <Separator className="my-2 last:hidden" />
          </div>
        ))}
      </ScrollArea>
    </>
  );
}

export default AsteroidList;
