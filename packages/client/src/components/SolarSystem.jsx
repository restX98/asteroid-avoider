import { useState, useRef, useMemo, createRef, useEffect } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";

import OrbitalObject from "@/components/OrbitalObject";
import Sun from "@/components/Sun";
import Asteroids from "@/components/Asteroids";

import Trajectory from "@/utils/Trajectory";

import planetData from "@/data/planets.js";
import { SCALE_FACTOR, ENVIRONMENT } from "@/data/config.js";

function SolarSystem({ simulationTimeRef, multiplier }) {
  const controlsRef = useRef();
  const planetRefs = useRef({});
  const asteroidsListRef = useRef([]);

  const { camera } = useThree();

  // TODO: Move this state to avoid rerendering at every planet selection
  const [selectedPlanetRef, setSelectedPlanetRef] = useState(null);

  useEffect(() => {
    if (selectedPlanetRef?.current && controlsRef.current) {
      const planet = selectedPlanetRef.current;
      const { x, y, z } = planet.position;
      controlsRef.current.target.set(x, y, z);
      controlsRef.current.update();

      //TODO: fix position on change
      camera.position.set(x, y, z - 10);
    }
  }, [selectedPlanetRef]);

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

  useFrame(({}, delta) => {
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
        <OrbitControls ref={controlsRef} />
      </mesh>

      <Sun />

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
