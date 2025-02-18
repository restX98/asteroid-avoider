import { memo } from "react";

import { useSolarSystemInfoContext } from "@/context/SolarSystemInfoContext";
import Disposable from "@/components/Disposable";
import OrbitCurve from "./OrbitCurve";
import CircleSprite from "./CircleSprite";

const OrbitalObject = memo(
  ({ orbitCoords, color = "gray", radius, objectRef, component }) => {
    const ObjectComponent = component;

    const { selectedPlanet, setSelectedPlanet } = useSolarSystemInfoContext();

    return (
      <>
        <group ref={objectRef}>
          {selectedPlanet?.ref === objectRef && (
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

        <OrbitCurve coords={orbitCoords} color={color} />
      </>
    );
  }
);

export default OrbitalObject;
