import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

import { PLANET_OUTLINE } from "@/data/config";

const CircleSprite = ({ color, onClick }) => {
  const spriteRef = useRef();

  const texture = useMemo(() => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = PLANET_OUTLINE.canvas.width;
    canvas.height = PLANET_OUTLINE.canvas.height;

    ctx.beginPath();
    const arc = PLANET_OUTLINE.arc;
    ctx.arc(arc.centerX, arc.centerY, arc.radius, 0, Math.PI * 2);
    ctx.lineWidth = PLANET_OUTLINE.line.width;
    ctx.strokeStyle = color;
    ctx.stroke();

    return new THREE.CanvasTexture(canvas);
  }, []);

  const worldPos = new THREE.Vector3();
  useFrame(({ camera }) => {
    if (spriteRef.current) {
      spriteRef.current.getWorldPosition(worldPos);

      const scale = worldPos.distanceTo(camera.position) / 20;
      spriteRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <mesh>
      <sprite ref={spriteRef} onClick={onClick}>
        {texture && <spriteMaterial attach="material" map={texture} />}
      </sprite>
    </mesh>
  );
};

export default CircleSprite;
