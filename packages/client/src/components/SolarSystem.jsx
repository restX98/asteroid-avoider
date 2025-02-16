import { useRef, useMemo, createRef } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

import { useSolarSystemLogicContext } from "@/context/SolarSystemLogicContext";
import OrbitalObject from "@/components/OrbitalObject";
import Sun from "@/components/Sun";
import Asteroids from "@/components/Asteroids";

import Trajectory from "@/lib/Trajectory";

import planetData from "@/data/planets.js";
import { SCALE_FACTOR, ENVIRONMENT } from "@/data/config.js";

const EPSILON = 1;
const utilityVector3 = new THREE.Vector3(0, 0, 0);

function SolarSystem() {
  console.count("Solar System rendering");

  const {
    controlsRef,
    sunRef,
    planets,
    camera,
    domElement,
    orbitOnChange,
    asteroidsListRef,
  } = useSolarSystemLogicContext();

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
          enableZoom={true}
          enableRotate={true}
          enablePan={true}
          enableDamping={true}
          onChange={orbitOnChange}
        />
      </mesh>

      <Sun sunRef={sunRef} />

      {planets.map(
        ({ name, trajectory, color, radius, model, objectRef, component }) => {
          return (
            <OrbitalObject
              key={name}
              trajectory={trajectory}
              color={color}
              radius={radius}
              model={model}
              objectRef={objectRef}
              component={component}
            />
          );
        }
      )}

      <Asteroids asteroidsListRef={asteroidsListRef} />
    </>
  );
}

export default SolarSystem;
