import { useSolarSystemInfoContext } from "@/context/SolarSystemInfoContext";
import TimeTravelPanel from "./TimeTravelPanel";
import AsteroidsPanel from "./AsteroidsPanel";
import { TopBar, BottomBar } from "./NavBars";
import BackButton from "./BackButton";
import { Toaster } from "@/components/ui/toaster";

const Interface = () => {
  const { isLoaded } = useSolarSystemInfoContext();

  return (
    isLoaded && (
      <>
        <TopBar className="flex items-center justify-between pointer-events-none">
          <BackButton className="pointer-events-auto" />

          <AsteroidsPanel className="pointer-events-auto" />
        </TopBar>

        <BottomBar className="mb-6 pointer-events-none">
          <TimeTravelPanel className="pointer-events-auto" />
        </BottomBar>

        <Toaster />
      </>
    )
  );
};

export default Interface;
