import { useEffect } from "react";
import * as THREE from "three";

/**
 * A hook to automatically scale a Three.js object to a desired diameter.
 *
 * @param {React.RefObject} ref - The ref of the Three.js object (e.g., a group).
 * @param {number} targetDiameter - The desired diameter for the object.
 */
export function useAutoScale(ref, targetDiameter) {
  useEffect(() => {
    if (!ref.current) return;

    const box = new THREE.Box3().setFromObject(ref.current);
    const size = new THREE.Vector3();
    box.getSize(size);

    const scaleVec = new THREE.Vector3(
      targetDiameter,
      targetDiameter,
      targetDiameter
    ).divide(size);
    const scale = Math.min(scaleVec.x, scaleVec.y, scaleVec.z);

    ref.current.scale.setScalar(scale);
  }, [ref, targetDiameter]);
}
