import { createContext, useState, useRef, useContext } from "react";

const SolarSystemInfoContext = createContext();

export const SolarSystemInfoProvider = ({ children }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedPlanet, setSelectedPlanet] = useState(null);

  const simulationTimeRef = useRef(new Date());
  const multiplierRef = useRef(1);

  return (
    <SolarSystemInfoContext.Provider
      value={{
        isLoaded,
        setIsLoaded,
        simulationTimeRef,
        multiplierRef,
        selectedPlanet,
        setSelectedPlanet,
      }}
    >
      {children}
    </SolarSystemInfoContext.Provider>
  );
};

export function useSolarSystemInfoContext() {
  const context = useContext(SolarSystemInfoContext);
  if (!context) {
    throw new Error(
      "useSnakeGameContext must be used within a SnakeGameContext"
    );
  }
  return context;
}
