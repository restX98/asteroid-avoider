import React, { useState, useRef, useMemo, createRef, useEffect } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";

import Planet from "@/components/Planet";
import Sun from "@/components/Sun";
import Trajectory from "@/utils/Trajectory";

import planetData from "@/data/planets.json";
import { SCALE_FACTOR } from "@/data/config.json";

function SolarSystem({ simulationTime, setSimulationTime, multiplier }) {
  const controlsRef = useRef();
  const planetRefs = useRef({});
  const circleRefs = useRef({}); //TODO: merge planet and circle mesh to try to remove this ref

  const { camera } = useThree();

  const [selectedPlanetRef, setSelectedPlanetRef] = useState(null);

  useEffect(() => {
    if (selectedPlanetRef?.current && controlsRef.current) {
      const planet = selectedPlanetRef.current;
      const { x, y, z } = planet.position;
      controlsRef.current.target.set(x, y, z);
      controlsRef.current.update();

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
        circleRefs.current[planetKey] = createRef();
      }

      return {
        name: planetKey,
        trajectory,
        color: data.color,
        radius: data.radius * SCALE_FACTOR,
        planetRef: planetRefs.current[planetKey],
        circleRef: circleRefs.current[planetKey],
        model: data.model,
      };
    })
  );

  useFrame((state, delta) => {
    setSimulationTime((prevTime) => {
      return new Date(prevTime.getTime() + delta * multiplier * 1000);
    });

    planets.forEach(({ trajectory, planetRef, circleRef }) => {
      const { x, y, z } = trajectory.getCoordinatesByDate(simulationTime);
      const scaledX = x * SCALE_FACTOR;
      const scaledY = y * SCALE_FACTOR;
      const scaledZ = z * SCALE_FACTOR;

      if (planetRef.current) {
        planetRef.current.position.set(scaledX, scaledY, scaledZ);
      }

      if (circleRef.current) {
        circleRef.current.position.set(scaledX, scaledY, scaledZ);
        const scale =
          circleRef.current.position.distanceTo(camera.position) / 20;
        circleRef.current.scale.set(scale, scale, scale);
      }
    });
  });

  return (
    <>
      <Environment
        files="/textures/starmap_g8k.jpg"
        background
        backgroundBlurriness={0}
      />
      <mesh>
        <ambientLight intensity={0.2} />
        <OrbitControls ref={controlsRef} />
      </mesh>

      <Sun />

      {planets.map(
        ({ name, trajectory, color, radius, model, planetRef, circleRef }) => (
          <Planet
            key={name}
            trajectory={trajectory}
            color={color}
            radius={radius}
            model={model}
            planetRef={planetRef}
            circleRef={circleRef}
            selectPlanet={(ref) => {
              if (selectedPlanetRef === ref) return;
              setSelectedPlanetRef(ref);
            }}
          />
        )
      )}
    </>
  );
}

export default SolarSystem;
