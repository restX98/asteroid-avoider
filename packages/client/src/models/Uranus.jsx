/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.5.3 ./uranus.glb --transform 
Files: ./uranus.glb [172.65KB] > /home/enrico/Documents/development/bounce-insights-prj/asteroid-avoider/packages/client/public/models/uranus-transformed.glb [25.37KB] (85%)
*/

import { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useAutoScale } from "@/hooks/useAutoScale";

const Uranus = ({ diameter }) => {
  const group = useRef();
  const { nodes, materials } = useGLTF("/models/uranus-transformed.glb");

  useAutoScale(group, diameter);

  return (
    <group ref={group} dispose={null}>
      <mesh
        geometry={nodes.Uranus.geometry}
        material={materials["Default OBJ.001"]}
        rotation={[Math.PI / 2, 0, 0]}
      />
    </group>
  );
};

export default Uranus;

useGLTF.preload("/models/uranus-transformed.glb");
