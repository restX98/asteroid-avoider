/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.5.3 ./mars.glb --transform 
Files: ./mars.glb [4.03MB] > /home/enrico/Documents/development/bounce-insights-prj/asteroid-avoider/packages/client/public/models/mars-transformed.glb [117.05KB] (97%)
*/

import { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useAutoScale } from "@/hooks/useAutoScale";

const Mars = ({ diameter }) => {
  const group = useRef();
  const { nodes, materials } = useGLTF("/models/mars-transformed.glb");

  useAutoScale(group, diameter);

  return (
    <group ref={group} dispose={null}>
      <mesh
        geometry={nodes.Cube008.geometry}
        material={materials["Default OBJ.005"]}
      />
    </group>
  );
};

export default Mars;

useGLTF.preload("/models/mars-transformed.glb");
