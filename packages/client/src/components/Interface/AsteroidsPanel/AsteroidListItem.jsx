import { useState, useEffect } from "react";
import { useAsteroidDetail } from "@/hooks/useAsteroidDetail";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

import emitter from "@/utils/emitter";

function AsteroidListItem({ asteroid }) {
  const [checked, setChecked] = useState(false);
  const [asteroidId, setAsteroidId] = useState(null);

  const { asteroidDetail, loading, error } = useAsteroidDetail(asteroidId);

  useEffect(() => {
    if (checked) {
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
  }, [checked, asteroidDetail]);

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
          checked={checked}
          onCheckedChange={(value) => {
            setChecked(value);
            setAsteroidId(asteroid.id);
          }}
          className="w-10 h-6 bg-muted p-1 data-[state=checked]:bg-chart-1 transition-colors"
        >
          <Switch.Thumb className="block w-4 h-4 bg-foreground rounded-full shadow transition-transform data-[state=checked]:translate-x-4" />
        </Switch>
        <Label htmlFor={asteroid.id} className="text-sm">
          Show Asteroid
        </Label>
      </div>
    </div>
  );
}

export default AsteroidListItem;
