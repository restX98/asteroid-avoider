import { Canvas } from "@react-three/fiber";
import SolarSystem from "@/components/SolarSystem";

function App() {
  return (
    <div id="canvas-container" style={{ width: "100vw", height: "100vh" }}>
      <Canvas camera={{ position: [0, 0, 2100], far: 10000000 }}>
        <SolarSystem />
      </Canvas>
    </div>
  );
}

export default App;
