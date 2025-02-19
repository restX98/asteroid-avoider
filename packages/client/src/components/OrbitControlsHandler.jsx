import { useCallback } from "react";
import { useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

import { useSolarSystemLogicContext } from "@/context/SolarSystemLogicContext";

import { ORBIT_CONTROL } from "@/data/config";
import { useSolarSystemActionContext } from "@/context/SolarSystemActionContext";

const OrbitControlHandler = () => {
  const {
    camera,
    gl: { domElement },
  } = useThree();

  const { selectedPlanet } = useSolarSystemActionContext();
  const { controlsRef, isTransitioningRef, offsetRef, sunRef } =
    useSolarSystemLogicContext();

  const orbitOnChange = useCallback(() => {
    if (!isTransitioningRef.current) {
      const planet = selectedPlanet?.ref.current || sunRef.current;
      offsetRef.current.copy(camera.position);
      offsetRef.current.sub(planet.position);
    }
  }, [selectedPlanet]);

  return (
    <OrbitControls
      ref={controlsRef}
      args={[camera, domElement]}
      enableZoom={ORBIT_CONTROL.enableZoom}
      zoomSpeed={ORBIT_CONTROL.zoomSpeed}
      maxDistance={ORBIT_CONTROL.maxDistance}
      enableRotate={ORBIT_CONTROL.enableRotate}
      enablePan={ORBIT_CONTROL.enablePan}
      enableDamping={ORBIT_CONTROL.enableDamping}
      onChange={orbitOnChange}
    />
  );
};

export default OrbitControlHandler;
