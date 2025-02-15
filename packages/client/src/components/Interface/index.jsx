import TimeTravelPanel from "./TimeTravelPanel";
import AsteroidsPanel from "./AsteroidsPanel";
import TopBar from "./TopBar";
import BackButton from "./BackButton";

function Interface({ simulationTimeRef, multiplier, setMultiplier }) {
  return (
    <>
      <TopBar className="pointer-events-none justify-between">
        <BackButton className="pointer-events-auto" />

        <AsteroidsPanel className="pointer-events-auto" />
      </TopBar>

      <TimeTravelPanel
        simulationTimeRef={simulationTimeRef}
        onTimeChange={(newTime) => {
          simulationTimeRef.current = newTime;
        }}
        multiplier={multiplier}
        setMultiplier={setMultiplier}
      />
    </>
  );
}

export default Interface;
