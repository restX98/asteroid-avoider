import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

import AsteroidListItem from "./AsteroidListItem";
import AsteroidFilterBar from "./AsteroidFilterBar";

import { cn } from "@/lib/utils";

function AsteroidList({ className, asteroids }) {
  const [filters, setFilters] = useState({
    search: "",
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
