import React, { createContext, useContext, useRef, useMemo } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";

import { useSolarSystemInfoContext } from "@/context/SolarSystemInfoContext";

import Trajectory from "@/lib/Trajectory";

import planetData from "@/data/planets.js";
import {
  SCALE_FACTOR,
  ALPHA_DEFAULT,
  ALPHA_TRANSITION,
} from "@/data/config.js";

const EPSILON = 1;
const utilityVector3 = new THREE.Vector3(0, 0, 0);

const SolarSystemLogicContext = createContext();

export const SolarSystemLogicProvider = ({ children }) => {
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
        planetRefs.current[planetKey] = React.createRef();
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

  const orbitOnChange = () => {
    if (!isTransitioningRef.current) {
      const planet = selectedPlanet?.current || sunRef.current;
      offsetRef.current.copy(camera.position);
      offsetRef.current.sub(planet.position);
    }
  };

  useFrame((_, delta) => {
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
      controlsRef.current.target.lerp(planet.position, ALPHA_DEFAULT);

      utilityVector3.copy(planet.position);
      utilityVector3.add(offsetRef.current);
      camera.position.lerp(
        utilityVector3,
        isTransitioningRef.current ? ALPHA_TRANSITION : ALPHA_DEFAULT
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

  const logicValue = {
    controlsRef,
    sunRef,
    planetRefs,
    asteroidsListRef,
    planets,
    camera,
    domElement,
    orbitOnChange,
  };

  return (
    <SolarSystemLogicContext.Provider value={logicValue}>
      {children}
    </SolarSystemLogicContext.Provider>
  );
};

export function useSolarSystemLogicContext() {
  const context = useContext(SolarSystemLogicContext);
  if (!context) {
    throw new Error(
      "useSolarSystemLogicContext must be used within a SolarSystemLogicProvider"
    );
  }
  return context;
}
