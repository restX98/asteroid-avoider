import { SolarSystemInfoProvider } from "@/context/SolarSystemInfoContext";

import CanvasWrapper from "@/components/CanvasWrapper";
import Interface from "@/components/Interface";

function App() {
  return (
    <SolarSystemInfoProvider>
      <CanvasWrapper />

      <Interface />
    </SolarSystemInfoProvider>
  );
}

export default App;
