import { useState, useMemo } from "react";

export function useAsteroidFilter(asteroids) {
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

  const filteredAsteroids = useMemo(
    () =>
      asteroids.map((asteroid) => {
        if (filters.search) {
          const searchLower = filters.search.toLowerCase();
          if (
            !asteroid.name.toLowerCase().includes(searchLower) &&
            !asteroid.id.toLowerCase().includes(searchLower)
          ) {
            return { visible: false, ...asteroid };
          }
        }

        // Filter by Velocity
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
          asteroid.missDistance.value < Number(filters.missDistanceMin)
        ) {
          return { visible: false, ...asteroid };
        }
        if (
          filters.missDistanceMax &&
          asteroid.missDistance.value > Number(filters.missDistanceMax)
        ) {
          return { visible: false, ...asteroid };
        }

        // Filter by Hazardous
        if (filters.hazardous !== "") {
          const isHazardous = filters.hazardous === "true";
          if (asteroid.isPotentiallyHazardous !== isHazardous) {
            return { visible: false, ...asteroid };
          }
        }

        return { visible: true, ...asteroid };
      }),
    [asteroids, filters]
  );

  return { filters, setFilters, filteredAsteroids };
}
