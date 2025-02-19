import { useSolarSystemInfoContext } from "@/context/SolarSystemInfoContext";
import { useSolarSystemLogicContext } from "@/context/SolarSystemLogicContext";
import OrbitalObject from "@/components/OrbitalObject";

const OrbitalObjects = () => {
  const { selectedPlanet, setSelectedPlanet } = useSolarSystemInfoContext();
  const { planetsRef, asteroidsRef } = useSolarSystemLogicContext();

  return (
    <>
      {planetsRef.current.map(
        ({ name, trajectory, color, radius, model, objectRef, component }) => {
          return (
            <OrbitalObject
              active={selectedPlanet?.ref === objectRef}
              key={name}
              orbitCoords={trajectory.orbitCoords}
              color={color}
              radius={radius}
              model={model}
              objectRef={objectRef}
              component={component}
              selectPlanet={setSelectedPlanet}
            />
          );
        }
      )}

      {asteroidsRef.current.map(
        ({ name, trajectory, radius, model, objectRef, component }) => (
          <OrbitalObject
            active={selectedPlanet?.ref === objectRef}
            key={name}
            orbitCoords={trajectory.orbitCoords}
            radius={radius}
            model={model}
            objectRef={objectRef}
            component={component}
            orbitalCurveThresholdScalar={5000000}
            selectPlanet={setSelectedPlanet}
          />
        )
      )}
    </>
  );
};

export default OrbitalObjects;
