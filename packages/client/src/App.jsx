import { useState } from "react";

import { SolarSystemInfoProvider } from "@/context/SolarSystemInfoContext";
import { SolarSystemActionProvider } from "@/context/SolarSystemActionContext";

import CanvasWrapper from "@/components/CanvasWrapper";
import Interface from "@/components/Interface";

function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <SolarSystemInfoProvider>
      <SolarSystemActionProvider>
        <CanvasWrapper setIsLoaded={setIsLoaded} />

        {isLoaded && <Interface isLoaded={isLoaded} />}
      </SolarSystemActionProvider>
    </SolarSystemInfoProvider>
  );
}

export default App;
