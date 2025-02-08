import React from "react";
import Planet from "@/components/Planet";

function SolarSystem() {
  return (
    <>
      {/* Sun */}
      <mesh>
        <sphereGeometry args={[2, 32, 32]} />
        <meshStandardMaterial
          color="orange"
          emissive="yellow"
          emissiveIntensity={1}
        />
      </mesh>

      {/* Planets */}
      {/* Mercury */}
      <Planet distance={4} size={0.5} color="gray" speed={1.5} />
      {/* Venus */}
      <Planet distance={6} size={0.8} color="gold" speed={1.2} />
      {/* Earth */}
      <Planet distance={8} size={1} color="blue" speed={1} />
      {/* Mars */}
      <Planet distance={10} size={0.7} color="red" speed={0.8} />
    </>
  );
}

export default SolarSystem;
