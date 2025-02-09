import React, { useRef } from "react";
import Planet from "@/components/Planet";
import Trajectory from "@/utils/Trajectory";
import { useFrame } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";

import planetData from "@/data/planets.json";
import { SCALE_FACTOR } from "@/data/config.json";

function SolarSystem() {
  const controlsRef = useRef();
  const planetRef = useRef();

  // TODO: Remove to manage it on planet click
  useFrame(() => {
    if (planetRef.current && controlsRef.current) {
      controlsRef.current.target.copy(planetRef.current.position);
      controlsRef.current.update();
    }
  });

  const planets = Object.keys(planetData).map((planetKey) => {
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
    return {
      name: planetKey,
      trajectory,
      color: data.color,
      radius: data.radius * SCALE_FACTOR,
    };
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
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <OrbitControls ref={controlsRef} />
      </mesh>

      {/* Sun */}
      <mesh>
        <sphereGeometry args={[0.004655 * SCALE_FACTOR, 32, 32]} />
        <meshStandardMaterial
          color="orange"
          emissive="yellow"
          emissiveIntensity={1}
        />
      </mesh>

      {planets.map(({ name, trajectory, color, radius }) => (
        <Planet
          key={name}
          trajectory={trajectory}
          color={color}
          radius={radius}
          followRef={null}
        />
      ))}
    </>
  );
}

export default SolarSystem;
