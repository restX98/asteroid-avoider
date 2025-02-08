import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";

function Planet({ distance, size, color, speed }) {
  const pivotRef = useRef();
  useFrame((state, delta) => {
    if (pivotRef.current) {
      pivotRef.current.rotation.y += speed * delta;
    }
  });

  return (
    <group ref={pivotRef}>
      <mesh position={[distance, 0, 0]}>
        <sphereGeometry args={[size, 32, 32]} />
        <meshStandardMaterial color={color} />
      </mesh>
    </group>
  );
}

export default Planet;
