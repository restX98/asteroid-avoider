import { useSolarSystemInfoContext } from "@/context/SolarSystemInfoContext";
import { useSolarSystemLogicContext } from "@/context/SolarSystemLogicContext";
import OrbitalObject from "@/components/OrbitalObject";

function OrbitalObjects() {
  const { selectedPlanet, setSelectedPlanet } = useSolarSystemInfoContext();
  const { planetsRef } = useSolarSystemLogicContext();

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
    </>
  );
}

export default OrbitalObjects;
