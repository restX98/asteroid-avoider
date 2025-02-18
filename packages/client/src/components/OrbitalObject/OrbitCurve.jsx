import { useMemo } from "react";
import * as THREE from "three";

import { SCALE_FACTOR } from "@/data/config";

const OrbitCurve = ({ orbitCurveRef, coords, color }) => {
  const geometry = useMemo(() => {
    const pts = [];
    for (let i = 0; i < coords.length; i++) {
      const { x, y, z } = coords[i];
      pts.push(
        new THREE.Vector3(x * SCALE_FACTOR, y * SCALE_FACTOR, z * SCALE_FACTOR)
      );
    }
    return new THREE.BufferGeometry().setFromPoints(pts);
  }, [coords]);

  return (
    <lineLoop ref={orbitCurveRef} geometry={geometry}>
      <lineBasicMaterial attach="material" color={color} />
    </lineLoop>
  );
};

export default OrbitCurve;
