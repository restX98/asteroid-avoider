import { useRef, useMemo, memo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import Disposable from "@/components/Disposable";

import { SCALE_FACTOR, PLANET_OUTLINE } from "@/data/config.js";

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
    ctx.lineWidth = 15;
    ctx.strokeStyle = `rgb(255 0 0)`;
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

const Planet = memo(
  ({
    trajectory,
    color,
    radius,
    planetRef,
    selectPlanet,
    component,
    active,
  }) => {
    const PlanetComponent = component;
    return (
      <>
        <group ref={planetRef}>
          {active && (
            <Disposable>
              <PlanetComponent diameter={radius * 2} />
            </Disposable>
          )}
          <CircleSprite onClick={() => selectPlanet(planetRef)} />
        </group>

        <OrbitCurve coords={trajectory.orbitCoords} color={color} />
      </>
    );
  }
);

export default Planet;
