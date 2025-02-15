import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

import AsteroidListItem from "./AsteroidListItem";
import { cn } from "@/lib/utils";

function AsteroidList({ className, asteroids }) {
  return (
    <ScrollArea className={cn("h-full w-full rounded-md border", className)}>
      {asteroids.length > 0 ? (
        asteroids.map((asteroid) => (
          <div key={asteroid.id}>
            <AsteroidListItem asteroid={asteroid} />
            <Separator className="my-2 last:hidden" />
          </div>
        ))
      ) : (
        <p>No asteroids found.</p>
      )}
    </ScrollArea>
  );
}

export default AsteroidList;
