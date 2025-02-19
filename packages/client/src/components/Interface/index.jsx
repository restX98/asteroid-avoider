import { Toaster } from "@/components/ui/toaster";
import { TopBar, BottomBar } from "./NavBars";
import BackButton from "./BackButton";
import AsteroidsPanel from "./AsteroidsPanel";
import TimeTravelPanel from "./TimeTravelPanel";

const Interface = () => {
  return (
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
  );
};

export default Interface;
