import { memo } from "react";
import { Environment } from "@react-three/drei";

import { useSolarSystemLogicContext } from "@/context/SolarSystemLogicContext";
import OrbitControlHandler from "@/components/OrbitControlsHandler";
import OrbitalObject from "@/components/OrbitalObject";
import Sun from "@/components/Sun";
import Asteroids from "@/components/Asteroids";

import { ENVIRONMENT } from "@/data/config";

function SolarSystem() {
  const { sunRef, planetsRef } = useSolarSystemLogicContext();

  return (
    <>
      <Environment
        files={ENVIRONMENT.file}
        background
        backgroundBlurriness={ENVIRONMENT.backgroundBlurriness}
        resolution={ENVIRONMENT.resolution}
      />

      <ambientLight intensity={ENVIRONMENT.ambientLight} />

      <OrbitControlHandler />

      <Sun sunRef={sunRef} />

      {planetsRef.current.map(
        ({ name, trajectory, color, radius, model, objectRef, component }) => {
          return (
            <OrbitalObject
              key={name}
              orbitCoords={trajectory.orbitCoords}
              color={color}
              radius={radius}
              model={model}
              objectRef={objectRef}
              component={component}
            />
          );
        }
      )}

      <Asteroids />
    </>
  );
}

export default memo(SolarSystem);
