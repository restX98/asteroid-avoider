// SolarSystemInfoProvider.js
import React, { createContext, useState, useRef, useContext } from "react";

export const SolarSystemInfoContext = createContext();

export const SolarSystemInfoProvider = ({ children }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const simulationTimeRef = useRef(new Date());
  const multiplierRef = useRef(1);

  return (
    <SolarSystemInfoContext.Provider
      value={{ isLoaded, setIsLoaded, simulationTimeRef, multiplierRef }}
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
