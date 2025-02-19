import { useState } from "react";

import { SolarSystemInfoProvider } from "@/context/SolarSystemInfoContext";

import CanvasWrapper from "@/components/CanvasWrapper";
import Interface from "@/components/Interface";

function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <SolarSystemInfoProvider>
      <CanvasWrapper setIsLoaded={setIsLoaded} />

      {isLoaded && <Interface isLoaded={isLoaded} />}
    </SolarSystemInfoProvider>
  );
}

export default App;
