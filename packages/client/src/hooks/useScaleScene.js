import { useMemo } from "react";
import * as THREE from "three";

export function useScaledScene(scene, diameter) {
  return useMemo(() => {
    const box = new THREE.Box3().setFromObject(scene);
    const size = new THREE.Vector3();
    box.getSize(size);

    const scaleVec = new THREE.Vector3(diameter, diameter, diameter).divide(
      size
    );
    const scale = Math.min(scaleVec.x, scaleVec.y, scaleVec.z);

    scene.scale.setScalar(scale);
    return scene;
  }, [scene, diameter]);
}
