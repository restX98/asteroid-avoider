import React, { useRef, useMemo } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";

import { SCALE_FACTOR } from "@/data/config.json";

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

const CircleSprite = ({ circleRef, color }) => {
  const texture = useMemo(() => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = 256;
    canvas.height = 256;

    ctx.beginPath();
    ctx.arc(128, 128, 128, 0, Math.PI * 2);
    ctx.lineWidth = 15;
    ctx.strokeStyle = `rgb(
        255
        0
        0)`;
    ctx.stroke();

    return new THREE.CanvasTexture(canvas);
  }, []);

  return (
    <mesh>
      <sprite ref={circleRef}>
        {texture && <spriteMaterial attach="material" map={texture} />}
      </sprite>
    </mesh>
  );
};

function Planet({ trajectory, color, radius, followRef = null }) {
  const internalMeshRef = useRef();
  const planetRef = followRef || internalMeshRef;
  const circleRef = useRef();

  const { camera } = useThree();

  useFrame((state, delta) => {
    if (planetRef.current) {
      const { x, y, z } = trajectory.getCoordinates(0);
      planetRef.current.position.set(
        x * SCALE_FACTOR,
        y * SCALE_FACTOR,
        z * SCALE_FACTOR
      );

      if (circleRef.current) {
        circleRef.current.position.set(
          x * SCALE_FACTOR,
          y * SCALE_FACTOR,
          z * SCALE_FACTOR
        );
        const scale =
          circleRef.current.position.distanceTo(camera.position) / 20;

        circleRef.current.scale.set(scale, scale, scale);
      }
    }
  });

  return (
    <>
      <mesh ref={planetRef}>
        <sphereGeometry args={[radius, 32, 32]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <CircleSprite circleRef={circleRef} />
      <OrbitCurve coords={trajectory.orbitCoords} color={color} />
    </>
  );
}

export default Planet;
