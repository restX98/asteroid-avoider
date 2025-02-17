import { useState, useEffect } from "react";

import { useAsteroidDetail } from "@/hooks/useAsteroidDetail";
import { useToast } from "@/hooks/use-toast";

import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

import emitter from "@/lib/emitter";

function AsteroidListItem({ asteroid }) {
  const [asteroidState, setAsteroidState] = useState({
    checked: false,
    asteroidId: null,
  });

  const { toast } = useToast();
  const { asteroidDetail, error } = useAsteroidDetail(asteroidState.asteroidId);

  useEffect(() => {
    if (error) {
      toast({
        title: "Error fetching asteroid details",
        description:
          error?.message ||
          "An error occurred while fetching asteroid details.",
      });
      setAsteroidState({
        checked: false,
        asteroidId: null,
      });
    }
  }, [error]);

  useEffect(() => {
    if (asteroidState.checked) {
      asteroidDetail &&
        emitter.emit("addAsteroid", {
          asteroidId: asteroid.id,
          asteroidDetail: asteroidDetail,
        });
    } else {
      emitter.emit("removeAsteroid", {
        asteroidId: asteroid.id,
      });
    }

    return () => {
      emitter.emit("removeAsteroid", {
        asteroidId: asteroid.id,
      });
    };
  }, [asteroidState, asteroidDetail]);

  return (
    <div className="px-4 py-3 bg-card text-card-foreground shadow-sm">
      <div className="mb-2">
        <h4 className="text-lg font-bold text-color-900">
          {asteroid.name}{" "}
          <span className="text-sm font-normal text-muted-foreground">
            ID: {asteroid.id}
          </span>
        </h4>
      </div>

      <div className="text-sm space-y-1">
        <p>
          <span className="font-medium">Diameter:</span>{" "}
          {asteroid.diameter.min.toFixed(2)} -{" "}
          {asteroid.diameter.max.toFixed(2)} {asteroid.diameter.unit}
        </p>
        <p>
          <span className="font-medium">Velocity:</span>{" "}
          {asteroid.velocity.value.toFixed(2)} {asteroid.velocity.unit}
        </p>
        <p>
          <span className="font-medium">Miss Distance:</span>{" "}
          {asteroid.miss_distance.value.toFixed(2)}{" "}
          {asteroid.miss_distance.unit}
        </p>
        <p
          className={`font-medium ${
            asteroid.is_potentially_hazardous
              ? "text-destructive"
              : "text-[hsl(120,100%,40%)]"
          }`}
        >
          {asteroid.is_potentially_hazardous
            ? "Potentially Hazardous"
            : "Not Hazardous"}
        </p>
      </div>

      <div className="mt-3 flex items-center space-x-2">
        <Switch
          id={asteroid.id}
          checked={asteroidState.checked}
          onCheckedChange={(value) =>
            setAsteroidState({
              checked: value,
              asteroidId: asteroid.id,
            })
          }
          className="w-10 h-6 bg-muted p-1 data-[state=checked]:bg-chart-1 transition-colors"
        />
        <Label htmlFor={asteroid.id} className="text-sm">
          Show Asteroid
        </Label>
      </div>
    </div>
  );
}

export default AsteroidListItem;
