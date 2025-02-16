import { useRef, useMemo, createRef } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

import { useSolarSystemInfoContext } from "@/context/solar-system-info-context";
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
    simulationTimeRef,
    multiplierRef,
    selectedPlanet,
    offsetRef,
    isTransitioningRef,
  } = useSolarSystemInfoContext();

  const controlsRef = useRef();
  const sunRef = useRef();
  const planetRefs = useRef({});
  const asteroidsListRef = useRef([]);

  const {
    camera,
    gl: { domElement },
  } = useThree();

  const planets = useMemo(() =>
    Object.keys(planetData).map((planetKey) => {
      const data = planetData[planetKey];
      const trajectory = new Trajectory(
        planetKey,
        data.mean_anomaly,
        data.orbital_period,
        data.eccentricity,
        data.semi_major_axis,
        data.ascending_node_longitude,
        data.perihelion_argument,
        data.inclination
      );

      if (!planetRefs.current[planetKey]) {
        planetRefs.current[planetKey] = createRef();
      }

      return {
        name: planetKey,
        trajectory,
        color: data.color,
        radius: data.radius * SCALE_FACTOR,
        objectRef: planetRefs.current[planetKey],
        component: data.component,
      };
    })
  );

  useFrame(({ camera }, delta) => {
    simulationTimeRef.current = new Date(
      simulationTimeRef.current.getTime() + delta * multiplierRef.current * 1000
    );

    [...planets, ...asteroidsListRef.current].forEach(
      ({ trajectory, objectRef }) => {
        const { x, y, z } = trajectory.getCoordinatesByDate(
          simulationTimeRef.current
        );
        const scaledX = x * SCALE_FACTOR;
        const scaledY = y * SCALE_FACTOR;
        const scaledZ = z * SCALE_FACTOR;
        if (objectRef.current) {
          objectRef.current.position.set(scaledX, scaledY, scaledZ);
        }
      }
    );

    if (controlsRef.current) {
      const planet = selectedPlanet?.current || sunRef.current;
      controlsRef.current.target.lerp(planet.position, 1);

      const offset = offsetRef.current;
      utilityVector3.copy(planet.position);
      utilityVector3.add(offset);
      camera.position.lerp(
        utilityVector3,
        isTransitioningRef.current ? 0.25 : 1
      );

      if (
        isTransitioningRef.current &&
        camera.position.distanceTo(utilityVector3) < EPSILON
      ) {
        isTransitioningRef.current = false;
      }
      controlsRef.current.update();
    }
  });

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
          onChange={() => {
            if (!isTransitioningRef?.current) {
              const planetRef = selectedPlanet?.current || sunRef.current;
              offsetRef.current.copy(camera.position);
              offsetRef.current.sub(planetRef.position);
            }
          }}
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
