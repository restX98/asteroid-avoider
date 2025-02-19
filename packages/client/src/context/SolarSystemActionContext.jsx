import { createContext, useState, useContext, useMemo } from "react";

const SolarSystemActionContext = createContext();

const SolarSystemActionProvider = ({ children }) => {
  const [selectedPlanet, setSelectedPlanet] = useState(null);
  const [asteroidList, setAsteroidList] = useState({});

  const logicValue = useMemo(
    () => ({
      selectedPlanet,
      setSelectedPlanet,
      asteroidList,
      setAsteroidList,
    }),
    [selectedPlanet, asteroidList]
  );

  return (
    <SolarSystemActionContext.Provider value={logicValue}>
      {children}
    </SolarSystemActionContext.Provider>
  );
};

const useSolarSystemActionContext = () => {
  const context = useContext(SolarSystemActionContext);
  if (!context) {
    throw new Error(
      "useSnakeGameContext must be used within a SnakeGameContext"
    );
  }
  return context;
};

export { SolarSystemActionProvider, useSolarSystemActionContext };
