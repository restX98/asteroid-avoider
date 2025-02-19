import { memo } from "react";
import { Environment } from "@react-three/drei";

import { useSolarSystemLogicContext } from "@/context/SolarSystemLogicContext";
import OrbitControlHandler from "@/components/OrbitControlsHandler";
import OrbitalObjects from "@/components/OrbitalObjects";

import Sun from "@/models/Sun";

import { ENVIRONMENT } from "@/data/config";

const SolarSystem = () => {
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
    </>
  );
};

export default memo(SolarSystem);
