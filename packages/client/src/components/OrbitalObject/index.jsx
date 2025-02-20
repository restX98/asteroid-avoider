import { useEffect, useRef, useMemo, memo } from "react";
import { useFrame } from "@react-three/fiber";

import Disposable from "@/components/Disposable";
import OrbitCurve from "./OrbitCurve";
import CircleSprite from "./CircleSprite";

import { ORBITAL_OBJECT } from "@/data/config";

const OrbitalObject = ({
  active,
  orbitCoords,
  color = ORBITAL_OBJECT.defaultColor,
  radius,
  objectRef,
  component,
  orbitalCurveThresholdScalar = ORBITAL_OBJECT.orbitalCurveThresholdScalar,
  selectPlanet,
}) => {
  const ObjectComponent = component;

  const orbitCurveRef = useRef();

  const orbitalCurveThreshold = useMemo(
    () => orbitalCurveThresholdScalar * radius,
    []
  );

  useEffect(() => {
    orbitCurveRef.current.visible = true;

    return () => {
      if (active) {
        selectPlanet(null);
      }
    };
  }, [active]);

  useFrame(({ camera }) => {
    if (active) {
      orbitCurveRef.current.visible =
        camera.position.distanceTo(objectRef.current.position) >
        orbitalCurveThreshold;
    }
  });

  return (
    <>
      <group ref={objectRef}>
        {active && (
          <Disposable>
            <ObjectComponent diameter={radius * 2} />
          </Disposable>
        )}
        <CircleSprite
          color={color}
          onClick={() => {
            selectPlanet({
              radius: radius,
              ref: objectRef,
            });
          }}
        />
      </group>

      <OrbitCurve ref={orbitCurveRef} coords={orbitCoords} color={color} />
    </>
  );
};

const areEqualProps = (prevProps, nextProps) => {
  return prevProps.active === nextProps.active;
};

export default memo(OrbitalObject, areEqualProps);
