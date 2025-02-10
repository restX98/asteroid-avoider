import { useState } from "react";
import { Canvas } from "@react-three/fiber";

import SolarSystem from "@/components/SolarSystem";
import TimeTravelPanel from "@/components/TimeTravelPanel";

function App() {
  const [simulationTime, setSimulationTime] = useState(new Date());
  const [multiplier, setMultiplier] = useState(1);

  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
      }}
    >
      <Canvas camera={{ position: [0, 0, 2100], far: 10000000 }}>
        <SolarSystem
          simulationTime={simulationTime}
          setSimulationTime={setSimulationTime}
          multiplier={multiplier}
        />
      </Canvas>

      <div
        style={{
          position: "absolute",
          top: "10px",
          left: "10px",
          zIndex: 1000,
        }}
      >
        <TimeTravelPanel
          simulationTime={simulationTime}
          setSimulationTime={setSimulationTime}
          multiplier={multiplier}
          setMultiplier={setMultiplier}
        />
      </div>
    </div>
  );
}

export default App;
