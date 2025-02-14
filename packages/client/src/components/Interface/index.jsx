import TimeTravelPanel from "./TimeTravelPanel";
import AsteroidsPanel from "./AsteroidsPanel";
import TopBar from "./TopBar";

function Interface({ simulationTimeRef, multiplier, setMultiplier }) {
  return (
    <>
      <TopBar />
      <TimeTravelPanel
        simulationTimeRef={simulationTimeRef}
        onTimeChange={(newTime) => {
          simulationTimeRef.current = newTime;
        }}
        multiplier={multiplier}
        setMultiplier={setMultiplier}
      />

      <AsteroidsPanel />
    </>
  );
}

export default Interface;
