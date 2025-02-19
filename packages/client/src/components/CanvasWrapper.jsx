import { Canvas } from "@react-three/fiber";
import { Perf } from "r3f-perf";

import { SolarSystemLogicProvider } from "@/context/SolarSystemLogicContext";

import Loader from "@/components/Loader";
import SolarSystem from "@/components/SolarSystem";

import { CAMERA, PERFORMANCE_PANEL_ENABLED } from "@/data/config";

const CanvasWrapper = () => {
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

        {PERFORMANCE_PANEL_ENABLED && <Perf position="bottom-left" />}
      </Canvas>
    </div>
  );
};

export default CanvasWrapper;
