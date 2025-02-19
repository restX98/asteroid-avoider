import { memo } from "react";
import { Environment } from "@react-three/drei";

import { useSolarSystemLogicContext } from "@/context/SolarSystemLogicContext";
import OrbitControlHandler from "@/components/OrbitControlsHandler";
import Sun from "@/components/Sun";
import OrbitalObjects from "@/components/OrbitalObjects";
import Asteroids from "@/components/Asteroids";

import { ENVIRONMENT } from "@/data/config";

function SolarSystem() {
  const { sunRef } = useSolarSystemLogicContext();

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

      <OrbitalObjects />

      <Asteroids />
    </>
  );
}

export default memo(SolarSystem);
