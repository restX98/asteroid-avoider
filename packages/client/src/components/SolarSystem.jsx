import { Environment, OrbitControls } from "@react-three/drei";

import { useSolarSystemLogicContext } from "@/context/SolarSystemLogicContext";
import OrbitalObject from "@/components/OrbitalObject";
import Sun from "@/components/Sun";
import Asteroids from "@/components/Asteroids";

import { ENVIRONMENT, ORBIT_CONTROL } from "@/data/config";

function SolarSystem() {
  const { controlsRef, sunRef, planets, camera, domElement, orbitOnChange } =
    useSolarSystemLogicContext();

  return (
    <>
      <Environment
        files={ENVIRONMENT.file}
        background
        backgroundBlurriness={ENVIRONMENT.backgroundBlurriness}
        resolution={ENVIRONMENT.resolution}
      />
      <mesh>
        <ambientLight intensity={ENVIRONMENT.ambientLight} />
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
      </mesh>

      <Sun sunRef={sunRef} />

      {planets.map(
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

export default SolarSystem;
