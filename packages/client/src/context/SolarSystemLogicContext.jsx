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
import { useSolarSystemActionContext } from "@/context/SolarSystemActionContext";

import Asteroid from "@/models/Asteroid";

import Trajectory from "@/lib/Trajectory";

import planetData from "@/data/planets";
import { SCALE_FACTOR, TRANSITION, SUN, ORBIT_CONTROL } from "@/data/config";

const utilityVector3 = new THREE.Vector3(0, 0, 0);
const initialOffset = new THREE.Vector3(0, 0, 5 * SCALE_FACTOR);
const relativeOffset = new THREE.Vector3(0, 0.4, 2);

const SolarSystemLogicContext = createContext();

const SolarSystemLogicProvider = ({ children }) => {
  const { simulationTimeRef, multiplierRef } = useSolarSystemInfoContext();
  const { selectedPlanet, asteroidList } = useSolarSystemActionContext();

  const controlsRef = useRef();
  const sunRef = useRef();

  const orbitalObjectRefs = useRef({});
  const planetsRef = useRef([]);
  const asteroidsRef = useRef([]);

  const offsetRef = useRef(initialOffset.clone());
  const isTransitioningRef = useRef(false);
  const epsilonRef = useRef(TRANSITION.bigEpsilon);

  const { camera } = useThree();

  useEffect(() => {
    if (!selectedPlanet) {
      controlsRef.current.minDistance =
        SUN.radius * SCALE_FACTOR * ORBIT_CONTROL.minDistanceScalar;
      offsetRef.current.copy(initialOffset);
      epsilonRef.current = TRANSITION.bigEpsilon;
    } else {
      controlsRef.current.minDistance =
        selectedPlanet.radius * ORBIT_CONTROL.minDistanceScalar;
      offsetRef.current.copy(relativeOffset);
      offsetRef.current.multiplyScalar(selectedPlanet.radius);
      epsilonRef.current =
        selectedPlanet.radius * TRANSITION.littleEpsilonScalar;
    }
    isTransitioningRef.current = true;
  }, [selectedPlanet]);

  planetsRef.current = useMemo(
    () =>
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

        if (!orbitalObjectRefs.current[planetKey]) {
          orbitalObjectRefs.current[planetKey] = createRef();
        }

        return {
          name: planetKey,
          trajectory,
          color: data.color,
          radius: data.radius * SCALE_FACTOR,
          objectRef: orbitalObjectRefs.current[planetKey],
          component: data.component,
        };
      }),
    []
  );

  asteroidsRef.current = useMemo(
    () =>
      Object.keys(asteroidList).map((asteroidId) => {
        const data = asteroidList[asteroidId];
        const trajectory = new Trajectory(
          asteroidId,
          data.meanAnomaly,
          data.orbitalPeriod,
          data.eccentricity,
          data.semiMajorAxis,
          data.ascendingNodeLongitude,
          data.perihelionArgument,
          data.inclination,
          data.epochOsculation
        );

        if (!orbitalObjectRefs.current[asteroidId]) {
          orbitalObjectRefs.current[asteroidId] = createRef();
        }

        return {
          name: asteroidId,
          trajectory,
          radius:
            (data.estimatedDiameter.astronomicalUnit.max * SCALE_FACTOR) / 2,
          objectRef: orbitalObjectRefs.current[asteroidId],
          component: Asteroid,
        };
      }),
    [asteroidList]
  );

  useFrame((_, delta) => {
    simulationTimeRef.current = new Date(
      simulationTimeRef.current.getTime() + delta * multiplierRef.current * 1000
    );

    [...planetsRef.current, ...asteroidsRef.current].forEach(
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

  const logicValue = useMemo(
    () => ({
      sunRef,
      asteroidsRef,
      planetsRef,
      controlsRef,
      offsetRef,
      isTransitioningRef,
    }),
    []
  );

  return (
    <SolarSystemLogicContext.Provider value={logicValue}>
      {children}
    </SolarSystemLogicContext.Provider>
  );
};

const useSolarSystemLogicContext = () => {
  const context = useContext(SolarSystemLogicContext);
  if (!context) {
    throw new Error(
      "useSolarSystemLogicContext must be used within a SolarSystemLogicProvider"
    );
  }
  return context;
};

export { SolarSystemLogicProvider, useSolarSystemLogicContext };
