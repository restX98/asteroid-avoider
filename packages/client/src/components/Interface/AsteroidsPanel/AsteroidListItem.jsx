import { useState, useEffect } from "react";

import { useSolarSystemInfoContext } from "@/context/SolarSystemInfoContext";

import { useAsteroidDetail } from "@/hooks/useAsteroidDetail";
import { useToast } from "@/hooks/use-toast";

import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const AsteroidListItem = ({ asteroid }) => {
  const [asteroidState, setAsteroidState] = useState({
    checked: false,
    asteroidId: null,
  });

  const { setAsteroidList } = useSolarSystemInfoContext();

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

  const addAsteroid = (id, asteroidDetail) => {
    setAsteroidList((prevState) => ({
      [id]: asteroidDetail,
      ...prevState,
    }));
  };

  const removeAsteroid = (id) => {
    setAsteroidList((prevState) => {
      const asteroidList = { ...prevState };
      delete asteroidList[id];
      return asteroidList;
    });
  };

  useEffect(() => {
    if (asteroidState.checked) {
      asteroidDetail && addAsteroid(asteroid.id, asteroidDetail);
    } else {
      removeAsteroid(asteroid.id);
    }

    return () => {
      removeAsteroid(asteroid.id);
    };
  }, [asteroidState, asteroidDetail]);

  return (
    <div className="px-4 py-3 bg-card text-card-foreground shadow-sm">
      <div className="flex justify-between items-center mb-2">
        <h4 className="text-lg font-bold text-color-900">
          {asteroid.name}{" "}
          <span className="text-sm font-normal text-muted-foreground">
            ID: {asteroid.id}
          </span>
        </h4>
        <a
          className="flex items-center gap-1 text-sm text-blue-500"
          href={asteroid.nasaJplUrl}
          target="_blank"
        >
          <img className="h-6" src="/nasa-logo.svg" nasa-alt="logo" />
          Compare Orbit
        </a>
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
          {asteroid.missDistance.value.toFixed(2)} {asteroid.missDistance.unit}
        </p>
        <p
          className={`font-medium ${
            asteroid.isPotentiallyHazardous
              ? "text-destructive"
              : "text-[hsl(120,100%,40%)]"
          }`}
        >
          {asteroid.isPotentiallyHazardous
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
};

export default AsteroidListItem;
