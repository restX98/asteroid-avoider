import { memo } from "react";

import { useSolarSystemInfoContext } from "@/context/solar-system-info-context";
import Disposable from "@/components/Disposable";
import OrbitCurve from "./OrbitCurve";
import CircleSprite from "./CircleSprite";

const OrbitalObject = memo(
  ({ trajectory, color, radius, objectRef, component }) => {
    const ObjectComponent = component;

    const { selectedPlanet, setSelectedPlanet } = useSolarSystemInfoContext();

    return (
      <>
        <group ref={objectRef}>
          {selectedPlanet === objectRef && (
            <Disposable>
              <ObjectComponent diameter={radius * 2} />
            </Disposable>
          )}
          <CircleSprite
            onClick={() => {
              setSelectedPlanet(objectRef);
            }}
          />
        </group>

        <OrbitCurve coords={trajectory.orbitCoords} color={color} />
      </>
    );
  }
);

export default OrbitalObject;
