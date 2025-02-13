import { useState, useEffect, useMemo, useRef, createRef } from "react";

import OrbitalObject from "@/components/OrbitalObject";
import Asteroid from "@/components/planets/Asteroid";

import Trajectory from "@/utils/Trajectory";
import emitter from "@/utils/emitter";

import { SCALE_FACTOR } from "@/data/config.js";

function Asteroids({
  asteroidsListRef,
  selectedPlanetRef,
  setSelectedPlanetRef,
}) {
  const [asteroids, setAsteroids] = useState({});
  const asteroidRefs = useRef({});

  useEffect(() => {
    const addAsteroidHandler = ({ asteroidId, asteroidDetail }) => {
      setAsteroids((prevState) => ({
        [asteroidId]: asteroidDetail,
        ...prevState,
      }));
    };
    const removeAsteroidHandler = ({ asteroidId }) => {
      setAsteroids((prevState) => {
        const newItems = { ...prevState };
        delete newItems[asteroidId];
        return newItems;
      });
    };

    emitter.on("addAsteroid", addAsteroidHandler);
    emitter.on("removeAsteroid", removeAsteroidHandler);

    return () => {
      emitter.off("addAsteroid", addAsteroidHandler);
      emitter.off("removeAsteroid", removeAsteroidHandler);
    };
  }, []);

  asteroidsListRef.current = useMemo(() =>
    Object.keys(asteroids).map((asteroidId) => {
      const data = asteroids[asteroidId];
      const trajectory = new Trajectory(
        asteroidId,
        data.meanAnomaly,
        data.orbitalPeriod,
        data.eccentricity,
        data.semiMajorAxis,
        data.ascendingNodeLongitude,
        data.perihelionArgument,
        data.inclination
      );

      if (!asteroidRefs.current[asteroidId]) {
        asteroidRefs.current[asteroidId] = createRef();
      }

      return {
        name: asteroidId,
        trajectory,
        color: "grey",
        radius: 0.001 * SCALE_FACTOR,
        objectRef: asteroidRefs.current[asteroidId],
        component: Asteroid,
      };
    })
  );

  return (
    <>
      {asteroidsListRef.current.map(
        ({ name, trajectory, color, radius, model, objectRef, component }) => (
          <OrbitalObject
            key={name}
            trajectory={trajectory}
            color={color}
            radius={radius}
            model={model}
            objectRef={objectRef}
            component={component}
            active={selectedPlanetRef === objectRef}
            selectPlanet={(ref) => {
              if (selectedPlanetRef === ref) return;
              setSelectedPlanetRef(ref);
            }}
          />
        )
      )}
    </>
  );
}

export default Asteroids;
