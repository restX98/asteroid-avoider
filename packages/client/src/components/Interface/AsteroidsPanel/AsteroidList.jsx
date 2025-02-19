import { useAsteroidFilter } from "@/hooks/useAsteroidFilters";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

import AsteroidListItem from "./AsteroidListItem";
import AsteroidFilterBar from "./AsteroidFilterBar";

import { cn } from "@/lib/utils";

const AsteroidList = ({ className, asteroids }) => {
  const { filteredAsteroids, filters, setFilters } =
    useAsteroidFilter(asteroids);

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
            <Separator />
          </div>
        ))}
      </ScrollArea>
    </>
  );
};

export default AsteroidList;
