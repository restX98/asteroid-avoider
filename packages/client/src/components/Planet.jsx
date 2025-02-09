import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { SCALE_FACTOR } from "@/data/config.json";

const OrbitCurve = ({ coords, color = 0x00ff00 }) => {
  const points = useMemo(() => {
    const pts = [];
    for (let i = 0; i < coords.length; i++) {
      const { x, y, z } = coords[i];
      pts.push(
        new THREE.Vector3(x * SCALE_FACTOR, y * SCALE_FACTOR, z * SCALE_FACTOR)
      );
    }
    const { x, y, z } = coords[0];
    pts.push(
      new THREE.Vector3(x * SCALE_FACTOR, y * SCALE_FACTOR, z * SCALE_FACTOR)
    );
    return pts;
  }, [coords]);

  const geometry = useMemo(() => {
    return new THREE.BufferGeometry().setFromPoints(points);
  }, [points]);

  return (
    <lineLoop geometry={geometry}>
      <lineBasicMaterial attach="material" color={color} />
    </lineLoop>
  );
};

function Planet({ trajectory, color, size, followRef = null }) {
  const internalMeshRef = useRef();
  const meshRef = followRef || internalMeshRef;

  useFrame((state, delta) => {
    if (meshRef.current) {
      const { x, y, z } = trajectory.getCoordinates(0);
      meshRef.current.position.set(
        x * SCALE_FACTOR,
        y * SCALE_FACTOR,
        z * SCALE_FACTOR
      );
    }
  });

  return (
    <>
      <mesh ref={meshRef}>
        <sphereGeometry args={[size, 32, 32]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <OrbitCurve coords={trajectory.orbitCoords} color={color} />
    </>
  );
}

export default Planet;
