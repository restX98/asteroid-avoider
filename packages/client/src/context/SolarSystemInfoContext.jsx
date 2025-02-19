import { createContext, useState, useRef, useContext, useMemo } from "react";

const SolarSystemInfoContext = createContext();

const SolarSystemInfoProvider = ({ children }) => {
  const simulationTimeRef = useRef(new Date());
  const multiplierRef = useRef(1);

  const logicValue = useMemo(
    () => ({
      simulationTimeRef,
      multiplierRef,
    }),
    []
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
