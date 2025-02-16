import React, { createContext, useState, useRef, useContext } from "react";
import { useEffect } from "react";
import * as THREE from "three";

const sunOffset = new THREE.Vector3(0, 0, 5000);
const defaultOffset = new THREE.Vector3(0, 0, 0.1);

const SolarSystemInfoContext = createContext();

export const SolarSystemInfoProvider = ({ children }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedPlanet, setSelectedPlanet] = useState(null);

  const simulationTimeRef = useRef(new Date());
  const multiplierRef = useRef(1);

  const offsetRef = useRef(sunOffset.clone());
  const isTransitioningRef = useRef(false);

  useEffect(() => {
    offsetRef.current.copy(!selectedPlanet ? sunOffset : defaultOffset);
    isTransitioningRef.current = true;
  }, [selectedPlanet]);

  return (
    <SolarSystemInfoContext.Provider
      value={{
        isLoaded,
        setIsLoaded,
        simulationTimeRef,
        multiplierRef,
        selectedPlanet,
        setSelectedPlanet,
        offsetRef,
        isTransitioningRef,
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
