import React from "react";
import Planet from "@/components/Planet";
import Trajectory from "@/utils/Trajectory";

import planetData from "@/data/planets.json";
import { SCALE_FACTOR } from "@/data/config.json";

function SolarSystem({ planetRef }) {
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
      size: data.radius * SCALE_FACTOR,
    };
  });

  return (
    <>
      {/* Sun */}
      <mesh>
        <sphereGeometry args={[0.0093 * SCALE_FACTOR, 32, 32]} />
        <meshStandardMaterial
          color="orange"
          emissive="yellow"
          emissiveIntensity={1}
        />
      </mesh>

      {planets.map(({ name, trajectory, color, size }) => (
        <Planet
          key={name}
          trajectory={trajectory}
          color={color}
          size={size}
          followRef={planetRef}
        />
      ))}
    </>
  );
}

export default SolarSystem;
