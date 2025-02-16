import { memo } from "react";
import { Canvas } from "@react-three/fiber";
import { Perf } from "r3f-perf";

import { SolarSystemInfoProvider } from "@/context/solar-system-info-context";
import Loader from "@/components/Loader";
import SolarSystem from "@/components/SolarSystem";
import Interface from "@/components/Interface";

const performancePanelEnabled = process.env.PERFORMANCE_PANEL_ENABLED;

const Scene = memo(() => {
  // TODO: Deep on near and far
  return (
    <div className="w-screen h-screen">
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
        <Loader>
          <SolarSystem />
        </Loader>
        {performancePanelEnabled && <Perf position="bottom-right" />}
      </Canvas>
    </div>
  );
});

function App() {
  return (
    <SolarSystemInfoProvider>
      <Scene />

      <Interface />
    </SolarSystemInfoProvider>
  );
}

export default App;
