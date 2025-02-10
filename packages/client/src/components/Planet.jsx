import React, { useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { useScaledScene } from "@/hooks/useScaleScene";

import { SCALE_FACTOR, PLANET_OUTLINE } from "@/data/config.json";

const OrbitCurve = ({ coords, color = 0x00ff00 }) => {
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
    <lineLoop geometry={geometry}>
      <lineBasicMaterial attach="material" color={color} />
    </lineLoop>
  );
};

const CircleSprite = ({ circleRef, color, onClick }) => {
  const texture = useMemo(() => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = PLANET_OUTLINE.canvas.width;
    canvas.height = PLANET_OUTLINE.canvas.height;

    ctx.beginPath();
    const arc = PLANET_OUTLINE.arc;
    ctx.arc(arc.centerX, arc.centerY, arc.radius, 0, Math.PI * 2);
    ctx.lineWidth = 15;
    ctx.strokeStyle = `rgb(255 0 0)`;
    ctx.stroke();

    return new THREE.CanvasTexture(canvas);
  }, []);

  return (
    <mesh>
      <sprite ref={circleRef} onClick={onClick}>
        {texture && <spriteMaterial attach="material" map={texture} />}
      </sprite>
    </mesh>
  );
};

function Planet({
  trajectory,
  color,
  radius,
  model,
  planetRef,
  circleRef,
  selectPlanet,
}) {
  const { scene } = useGLTF(model);
  const scaledScene = useScaledScene(
    useMemo(() => scene.clone(), [scene]),
    radius * 2
  );

  return (
    <>
      <primitive ref={planetRef} object={scaledScene} />
      <CircleSprite
        circleRef={circleRef}
        onClick={() => selectPlanet(planetRef)}
      />
      <OrbitCurve coords={trajectory.orbitCoords} color={color} />
    </>
  );
}

// useGLTF.preload(model);

export default Planet;
