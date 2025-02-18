import {
  useEffect,
  createContext,
  useContext,
  useRef,
  createRef,
  useMemo,
} from "react";
import { useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";

import { useSolarSystemInfoContext } from "@/context/SolarSystemInfoContext";

import Trajectory from "@/lib/Trajectory";

import planetData from "@/data/planets";
import { SCALE_FACTOR, TRANSITION, SUN, ORBIT_CONTROL } from "@/data/config";

const utilityVector3 = new THREE.Vector3(0, 0, 0);
const sunOffset = new THREE.Vector3(0, 0, 5000);
const defaultOffset = new THREE.Vector3(0, 0.2, 1);

const SolarSystemLogicContext = createContext();

export const SolarSystemLogicProvider = ({ children }) => {
  const { simulationTimeRef, multiplierRef, selectedPlanet } =
    useSolarSystemInfoContext();

  const controlsRef = useRef();
  const sunRef = useRef();
  const planetRefs = useRef({});
  const asteroidsListRef = useRef([]);
  const offsetRef = useRef(sunOffset.clone());
  const isTransitioningRef = useRef(false);
  const epsilonRef = useRef(TRANSITION.bigEpsilon);

  useEffect(() => {
    if (!selectedPlanet) {
      controlsRef.current.minDistance =
        SUN.radius * SCALE_FACTOR * ORBIT_CONTROL.minDistanceScalar;
      offsetRef.current.copy(sunOffset);
      epsilonRef.current = TRANSITION.bigEpsilon;
    } else {
      controlsRef.current.minDistance =
        selectedPlanet.radius * ORBIT_CONTROL.minDistanceScalar;
      offsetRef.current.copy(defaultOffset);
      offsetRef.current.multiplyScalar(selectedPlanet.radius * 2);
      epsilonRef.current = TRANSITION.littleEpsilon;
    }
    isTransitioningRef.current = true;
  }, [selectedPlanet]);

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

  const orbitOnChange = () => {
    if (!isTransitioningRef.current) {
      const planet = selectedPlanet?.ref.current || sunRef.current;
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
      const planet = selectedPlanet?.ref.current || sunRef.current;
      controlsRef.current.target.lerp(planet.position, TRANSITION.alphaDefault);

      utilityVector3.copy(planet.position);
      utilityVector3.add(offsetRef.current);
      camera.position.lerp(
        utilityVector3,
        isTransitioningRef.current ? TRANSITION.alpha : TRANSITION.alphaDefault
      );

      if (
        isTransitioningRef.current &&
        camera.position.distanceTo(utilityVector3) < epsilonRef.current
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
