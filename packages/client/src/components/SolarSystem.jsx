import { useState, useRef, useMemo, createRef, useEffect } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";

import Planet from "@/components/Planet";
import Sun from "@/components/Sun";
import Trajectory from "@/utils/Trajectory";

import planetData from "@/data/planets.js";
import { SCALE_FACTOR, ENVIRONMENT } from "@/data/config.js";

function SolarSystem({ simulationTimeRef, multiplier }) {
  const controlsRef = useRef();
  const planetRefs = useRef({});

  const { camera } = useThree();

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
        planetRef: planetRefs.current[planetKey],
        component: data.component,
      };
    })
  );

  useFrame(({}, delta) => {
    simulationTimeRef.current = new Date(
      simulationTimeRef.current.getTime() + delta * multiplier * 1000
    );

    planets.forEach(({ trajectory, planetRef, circleRef }) => {
      const { x, y, z } = trajectory.getCoordinatesByDate(
        simulationTimeRef.current
      );
      const scaledX = x * SCALE_FACTOR;
      const scaledY = y * SCALE_FACTOR;
      const scaledZ = z * SCALE_FACTOR;
      if (planetRef.current) {
        planetRef.current.position.set(scaledX, scaledY, scaledZ);
      }
    });
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
        ({ name, trajectory, color, radius, model, planetRef, component }) => {
          return (
            <Planet
              key={name}
              trajectory={trajectory}
              color={color}
              radius={radius}
              model={model}
              planetRef={planetRef}
              component={component}
              active={selectedPlanetRef == planetRef}
              selectPlanet={(ref) => {
                if (selectedPlanetRef === ref) return;
                setSelectedPlanetRef(ref);
              }}
            />
          );
        }
      )}
    </>
  );
}

export default SolarSystem;
