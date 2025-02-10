import { useGLTF } from "@react-three/drei";
import { useScaledScene } from "@/hooks/useScaleScene";
import { SCALE_FACTOR, SUN_RADIUS } from "@/data/config.json";

function Sun() {
  const { scene } = useGLTF("/models/sun.glb");

  const scaledScene = useScaledScene(scene, SUN_RADIUS * SCALE_FACTOR);

  return (
    <>
      <primitive object={scaledScene} />
      <pointLight position={[0, 0, 0]} intensity={10} decay={0.05} />
    </>
  );
}

export default Sun;
