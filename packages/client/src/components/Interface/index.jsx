import TimeTravelPanel from "./TimeTravelPanel";
import AsteroidsPanel from "./AsteroidsPanel";
import { TopBar, BottomBar } from "./NavBars";
import BackButton from "./BackButton";

function Interface({ simulationTimeRef, multiplierRef }) {
  return (
    <>
      <TopBar className="flex items-center justify-between pointer-events-none">
        <BackButton className="pointer-events-auto" />

        <AsteroidsPanel className="pointer-events-auto" />
      </TopBar>

      <BottomBar className="mb-6 pointer-events-none">
        <TimeTravelPanel
          className="pointer-events-auto"
          simulationTimeRef={simulationTimeRef}
          multiplierRef={multiplierRef}
        />
      </BottomBar>
    </>
  );
}

export default Interface;
