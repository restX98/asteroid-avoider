import { useMemo, memo, forwardRef } from "react";
import * as THREE from "three";

import { SCALE_FACTOR } from "@/data/config";

const OrbitCurve = forwardRef(({ coords, color }, ref) => {
  const geometry = useMemo(() => {
    const pts = coords.map(
      ({ x, y, z }) =>
        new THREE.Vector3(x * SCALE_FACTOR, y * SCALE_FACTOR, z * SCALE_FACTOR)
    );
    return new THREE.BufferGeometry().setFromPoints(pts);
  }, [coords]);

  return (
    <lineLoop ref={ref} geometry={geometry}>
      <lineBasicMaterial attach="material" color={color} />
    </lineLoop>
  );
});

const areEqualProps = (prevProps, nextProps) => {
  return (
    prevProps.coords === nextProps.coords && prevProps.color === nextProps.color
  );
};

export default memo(OrbitCurve, areEqualProps);
