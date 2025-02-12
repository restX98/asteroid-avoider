import { memo } from "react";

import OrbitCurve from "./OrbitCurve";
import CircleSprite from "./CircleSprite";
import Disposable from "@/components/Disposable";

const OrbitalObject = memo(
  ({
    trajectory,
    color,
    radius,
    objectRef,
    selectPlanet,
    component,
    active,
  }) => {
    const ObjectComponent = component;
    return (
      <>
        <group ref={objectRef}>
          {active && (
            <Disposable>
              <ObjectComponent diameter={radius * 2} />
            </Disposable>
          )}
          <CircleSprite onClick={() => selectPlanet(objectRef)} />
        </group>

        <OrbitCurve coords={trajectory.orbitCoords} color={color} />
      </>
    );
  }
);

export default OrbitalObject;
