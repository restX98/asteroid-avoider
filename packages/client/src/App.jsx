import { useState, useRef, memo } from "react";
import { Canvas } from "@react-three/fiber";
import { Perf } from "r3f-perf";

import Loader from "@/components/Loader";
import SolarSystem from "@/components/SolarSystem";
import Interface from "@/components/Interface";

const performancePanelEnabled = process.env.PERFORMANCE_PANEL_ENABLED;

  // TODO: Deep on near and far
  return (
    <Canvas
      camera={{
        near: 0.001,
        far: 10000000,
      }}
      gl={{
        logarithmicDepthBuffer: true,
        antialias: true,
        physicallyCorrectLights: false,
      }}
    >
      <Loader setIsLoaded={setIsLoaded}>
        <SolarSystem
          simulationTimeRef={simulationTimeRef}
          multiplier={multiplier}
        />
      </Loader>

      {performancePanelEnabled && <Perf position="bottom-right" />}
    </Canvas>
  );
});

function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  const simulationTimeRef = useRef(new Date());
  const [multiplier, setMultiplier] = useState(1);

  return (
    <>
      <div
        style={{
          position: "relative",
          width: "100vw",
          height: "100vh",
        }}
      >
        <Scene
          setIsLoaded={setIsLoaded}
          simulationTimeRef={simulationTimeRef}
          multiplier={multiplier}
        />
      </div>

      {isLoaded && (
        <Interface
          simulationTimeRef={simulationTimeRef}
          multiplier={multiplier}
          setMultiplier={setMultiplier}
        />
      )}
    </>
  );
}

export default App;
