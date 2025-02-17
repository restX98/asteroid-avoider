/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.5.3 ./packages/client/public/models/sun.glb --transform 
Files: ./packages/client/public/models/sun.glb [2.12MB] > /home/enrico/Documents/development/bounce-insights-prj/asteroid-avoider/sun-transformed.glb [476.5KB] (77%)
Author: SebastianSosnowski (https://sketchfab.com/SebastianSosnowski)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/sun-9ef1c68fbb944147bcfcc891d3912645
Title: Sun
*/

import { useRef, memo } from "react";
import { useGLTF } from "@react-three/drei";
import { useAutoScale } from "@/hooks/useAutoScale";

import { SCALE_FACTOR, SUN } from "@/data/config";

function Model({ diameter, sunRef }) {
  const group = sunRef || useRef();
  const { nodes, materials } = useGLTF("/models/sun-transformed.glb");

  useAutoScale(group, diameter);

  return (
    <group ref={group} dispose={null}>
      <group name="Sketchfab_Scene">
        <group name="RootNode">
          <group name="UnstableStarCore" rotation={[-Math.PI / 2, 0, 0]}>
            <mesh
              name="UnstableStarCore_1_0"
              geometry={nodes.UnstableStarCore_1_0.geometry}
              material={materials.material}
            />
          </group>
          <group
            name="UnstableStarref"
            rotation={[-Math.PI / 2, 0, 0]}
            scale={1.01}
          >
            <mesh
              name="UnstableStarref_2_0"
              geometry={nodes.UnstableStarref_2_0.geometry}
              material={materials.material_1}
            />
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("models/sun-transformed.glb");

const Sun = memo(({ sunRef }) => {
  const { radius, position, intensity, decay } = SUN;
  return (
    <>
      <Model sunRef={sunRef} diameter={radius * 2 * SCALE_FACTOR} />
      <pointLight position={position} intensity={intensity} decay={decay} />
    </>
  );
});

export default Sun;
