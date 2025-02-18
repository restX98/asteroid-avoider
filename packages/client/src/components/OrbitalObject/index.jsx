import { useEffect, useRef, useMemo, memo } from "react";
import { useFrame } from "@react-three/fiber";

import { useSolarSystemInfoContext } from "@/context/SolarSystemInfoContext";
import Disposable from "@/components/Disposable";
import OrbitCurve from "./OrbitCurve";
import CircleSprite from "./CircleSprite";

import { ORBITAL_OBJECT } from "@/data/config";

const OrbitalObject = memo(
  ({
    orbitCoords,
    color = ORBITAL_OBJECT.defaultColor,
    radius,
    objectRef,
    component,
    orbitalCurveThresholdScalar = ORBITAL_OBJECT.orbitalCurveThresholdScalar,
  }) => {
    const ObjectComponent = component;

    const { selectedPlanet, setSelectedPlanet } = useSolarSystemInfoContext();
    const orbitCurveRef = useRef();

    const isActive = selectedPlanet?.ref === objectRef;

    const orbitalCurveThreshold = useMemo(
      () => orbitalCurveThresholdScalar * radius
    );

    useEffect(() => {
      if (selectedPlanet?.ref !== objectRef) {
        orbitCurveRef.current.visible = true;
      }
    }, [selectedPlanet]);

    useFrame(({ camera }) => {
      if (isActive) {
        orbitCurveRef.current.visible =
          camera.position.distanceTo(selectedPlanet.ref.current.position) >
          orbitalCurveThreshold;
      }
    });

    return (
      <>
        <group ref={objectRef}>
          {isActive && (
            <Disposable>
              <ObjectComponent diameter={radius * 2} />
            </Disposable>
          )}
          <CircleSprite
            color={color}
            onClick={() => {
              setSelectedPlanet({
                radius: radius,
                ref: objectRef,
              });
            }}
          />
        </group>

        <OrbitCurve
          orbitCurveRef={orbitCurveRef}
          coords={orbitCoords}
          color={color}
        />
      </>
    );
  }
);

export default OrbitalObject;
