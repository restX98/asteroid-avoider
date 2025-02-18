import { memo } from "react";
import { Canvas } from "@react-three/fiber";
import { Perf } from "r3f-perf";

import { SolarSystemInfoProvider } from "@/context/SolarSystemInfoContext";
import { SolarSystemLogicProvider } from "@/context/SolarSystemLogicContext";

import Loader from "@/components/Loader";
import SolarSystem from "@/components/SolarSystem";
import Interface from "@/components/Interface";

import { CAMERA } from "@/data/config";

const performancePanelEnabled =
  import.meta.env.VITE_PERFORMANCE_PANEL === "true";

const Scene = memo(() => {
  return (
    <div className="w-screen h-screen">
      <Canvas
        camera={{
          near: CAMERA.near,
          far: CAMERA.far,
        }}
        gl={{
          logarithmicDepthBuffer: true,
          antialias: true,
          physicallyCorrectLights: false,
        }}
      >
        <Loader>
          <SolarSystemLogicProvider>
            <SolarSystem />
          </SolarSystemLogicProvider>
        </Loader>
        {performancePanelEnabled && <Perf position="bottom-left" />}
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
