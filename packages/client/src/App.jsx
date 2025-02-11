import { useState } from "react";
import { Canvas } from "@react-three/fiber";

import Loader from "@/components/Loader";
import SolarSystem from "@/components/SolarSystem";
import TimeTravelPanel from "@/components/TimeTravelPanel";

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [simulationTime, setSimulationTime] = useState(new Date());
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
      <Canvas camera={{ position: [0, 0, 2100], far: 10000000 }}>
          <Loader setIsLoaded={setIsLoaded}>
          <SolarSystem
            simulationTime={simulationTime}
            setSimulationTime={setSimulationTime}
            multiplier={multiplier}
          />
          </Loader>
        </Canvas>
      </div>

      {isLoaded && (
        <div>
          <TimeTravelPanel
            simulationTime={simulationTime}
            setSimulationTime={setSimulationTime}
            multiplier={multiplier}
            setMultiplier={setMultiplier}
          />
        </Loader>
      </Canvas>
    </div>
      )}
    </>
  );
}

export default App;
