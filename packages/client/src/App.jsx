import { useState, useRef, memo } from "react";
import { Canvas } from "@react-three/fiber";
import { Perf } from "r3f-perf";

import Loader from "@/components/Loader";
import SolarSystem from "@/components/SolarSystem";
import TimeTravelPanel from "@/components/TimeTravelPanel";
import AsteroidsPanel from "@/components/AsteroidsPanel";

const Scene = memo(({ setIsLoaded, simulationTimeRef, multiplier }) => {
  // TODO: Deep on near and far
  return (
    <Canvas
      camera={{
        position: [0, 0, 5000],
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

      {process.env.NODE_ENV === "development" && (
        <Perf position="bottom-left" />
      )}
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
        <div>
          <TimeTravelPanel
            simulationTimeRef={simulationTimeRef}
            onTimeChange={(newTime) => {
              simulationTimeRef.current = newTime;
            }}
            multiplier={multiplier}
            setMultiplier={setMultiplier}
          />

          <AsteroidsPanel />
        </div>
      )}
    </>
  );
}

export default App;
