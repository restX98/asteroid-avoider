import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import SolarSystem from "@/components/SolarSystem";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

const MyMesh = () => {
  const controlsRef = useRef();
  const planetRef = useRef();

  // TODO: Remove to manage it on planet click
  useFrame(() => {
    if (planetRef.current && controlsRef.current) {
      controlsRef.current.target.copy(planetRef.current.position);
      controlsRef.current.update();
    }
  });

  return (
    <mesh>
      <ambientLight intensity={0.2} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <SolarSystem planetRef={planetRef} />
      <OrbitControls ref={controlsRef} />
    </mesh>
  );
};

function App() {
  return (
    <div id="canvas-container" style={{ width: "100vw", height: "100vh" }}>
      <Canvas camera={{ position: [0, 0, 2100], far: 400000 }}>
        <MyMesh />
      </Canvas>
    </div>
  );
}

export default App;
