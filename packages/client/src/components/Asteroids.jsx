import { useMemo, useRef, createRef } from "react";

import OrbitalObject from "@/components/OrbitalObject";
import Asteroid from "@/components/planets/Asteroid";

import Trajectory from "@/utils/Trajectory";
import { SCALE_FACTOR } from "@/data/config.js";

function Asteroids({
  asteroidsListRef,
  selectedPlanetRef,
  setSelectedPlanetRef,
}) {
  const asteroidRefs = useRef({});

  asteroidsListRef.current = useMemo(() => {
    const trajectory = new Trajectory(
      "(2010 CT)",
      126.3593486415702,
      305.5954395061387,
      0.6576925585297526,
      0.8879032138910856,
      176.030347571535,
      104.3412966115674,
      19.7595504485604
    );

    if (!asteroidRefs.current["(2010 CT)"]) {
      asteroidRefs.current["(2010 CT)"] = createRef();
    }

    return [
      {
        name: "(2010 CT)",
        trajectory,
        color: "grey",
        radius: 0.002 * SCALE_FACTOR,
        objectRef: asteroidRefs.current["(2010 CT)"],
        component: Asteroid,
      },
    ];
  }, []);

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
            active={selectedPlanetRef == objectRef}
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
