import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import SolarSystem from "@/components/SolarSystem";

function App() {
  return (
    <div id="canvas-container" style={{ width: "100vw", height: "100vh" }}>
      <Canvas camera={{ position: [0, 0, 10] }}>
        <mesh>
          <ambientLight intensity={0.2} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
          <SolarSystem />
          <OrbitControls target={[0, 0, 0]} />
        </mesh>
      </Canvas>
    </div>
  );
}

export default App;
