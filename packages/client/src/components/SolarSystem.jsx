import { useState, useRef, useMemo, createRef, useEffect } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

import OrbitalObject from "@/components/OrbitalObject";
import Sun from "@/components/Sun";
import Asteroids from "@/components/Asteroids";

import Trajectory from "@/utils/Trajectory";
import emitter from "@/utils/emitter";

import planetData from "@/data/planets.js";
import { SCALE_FACTOR, ENVIRONMENT } from "@/data/config.js";

const EPSILON = 0.01;
const sunOffset = new THREE.Vector3(0, 0, 5000);
const defaultOffset = new THREE.Vector3(0, 0, 0.1);
const utilityVector3 = new THREE.Vector3(0, 0, 0);

function SolarSystem({ simulationTimeRef, multiplier }) {
  const controlsRef = useRef();
  const sunRef = useRef();
  const planetRefs = useRef({});
  const asteroidsListRef = useRef([]);

  const {
    camera,
    gl: { domElement },
  } = useThree();

  // TODO: Try to make is a simple ref to fix sun bug
  // the bug seams caused that the rerender of the scene on unselect planet.
  const [selectedPlanetRef, setSelectedPlanetRef] = useState(sunRef);

  const offsetRef = useRef(new THREE.Vector3(0, 0, 0.1));
  const isTransitioning = useRef(false);

  useEffect(() => {
    if (selectedPlanetRef?.current) {
      if (selectedPlanetRef === sunRef) {
        offsetRef.current.copy(sunOffset);
      } else {
        // TODO: edit based on planet radius
        offsetRef.current.copy(defaultOffset);
      }
    }
  }, [selectedPlanetRef]);

  useEffect(() => {
    const unselectPlanetHandler = () => {
      setSelectedPlanetRef(sunRef);
      isTransitioning.current = true;
    };

    emitter.on("unselectPlanet", unselectPlanetHandler);

    return () => {
      emitter.off("unselectPlanet", unselectPlanetHandler);
    };
  }, []);

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
      simulationTimeRef.current.getTime() + delta * multiplier * 1000
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

    if (selectedPlanetRef?.current && controlsRef.current) {
      const planet = selectedPlanetRef.current;
      controlsRef.current.target.lerp(planet.position, 1);

      const offset = offsetRef.current;
      utilityVector3.copy(planet.position);
      utilityVector3.add(offset);
      camera.position.lerp(utilityVector3, isTransitioning.current ? 0.1 : 1);

      if (
        isTransitioning.current &&
        camera.position.distanceTo(utilityVector3) < EPSILON
      ) {
        isTransitioning.current = false;
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
            if (!isTransitioning?.current && selectedPlanetRef?.current) {
              offsetRef.current.copy(camera.position);
              offsetRef.current.sub(selectedPlanetRef.current.position);
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
              active={selectedPlanetRef === objectRef}
              selectPlanet={(ref) => {
                if (selectedPlanetRef === ref) return;
                setSelectedPlanetRef(ref);
                isTransitioning.current = true;
              }}
            />
          );
        }
      )}

      <Asteroids
        asteroidsListRef={asteroidsListRef}
        selectedPlanetRef={selectedPlanetRef}
        setSelectedPlanetRef={setSelectedPlanetRef}
      />
    </>
  );
}

export default SolarSystem;
