import { createContext, useState, useRef, useContext, useMemo } from "react";

const SolarSystemInfoContext = createContext();

const SolarSystemInfoProvider = ({ children }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedPlanet, setSelectedPlanet] = useState(null);
  const [asteroidList, setAsteroidList] = useState({});

  const simulationTimeRef = useRef(new Date());
  const multiplierRef = useRef(1);

  const logicValue = useMemo(
    () => ({
      isLoaded,
      setIsLoaded,
      simulationTimeRef,
      multiplierRef,
      selectedPlanet,
      setSelectedPlanet,
      asteroidList,
      setAsteroidList,
    }),
    [selectedPlanet, asteroidList]
  );

  return (
    <SolarSystemInfoContext.Provider value={logicValue}>
      {children}
    </SolarSystemInfoContext.Provider>
  );
};

const useSolarSystemInfoContext = () => {
  const context = useContext(SolarSystemInfoContext);
  if (!context) {
    throw new Error(
      "useSnakeGameContext must be used within a SnakeGameContext"
    );
  }
  return context;
};

export { SolarSystemInfoProvider, useSolarSystemInfoContext };
