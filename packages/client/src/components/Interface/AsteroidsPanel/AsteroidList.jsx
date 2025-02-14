import { ScrollArea } from "@/components/ui/scroll-area";

import AsteroidListItem from "./AsteroidListItem";
import { cn } from "@/lib/utils";

function AsteroidList({ className, asteroids }) {
  return (
    <ScrollArea className={cn("h-full w-full rounded-md border", className)}>
      {asteroids.length > 0 ? (
        asteroids.map((asteroid) => (
          <AsteroidListItem key={asteroid.id} asteroid={asteroid} />
        ))
      ) : (
        <p>No asteroids found.</p>
      )}
    </ScrollArea>
  );
}

export default AsteroidList;
