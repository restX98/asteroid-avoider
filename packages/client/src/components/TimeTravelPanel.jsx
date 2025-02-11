import React from "react";
import { Html } from "@react-three/drei";

const TimeTravelPanel = ({
  simulationTime,
  setSimulationTime,
  multiplier,
  setMultiplier,
}) => {
  return (
    <Html fullscreen={true}>
      <div
        style={{
          position: "absolute",
          top: "10px",
          left: "10px",
          background: "rgba(0,0,0,0.5)",
          color: "white",
          padding: "10px",
          borderRadius: "4px",
          zIndex: 1000,
        }}
      >
        <h3>Time Travel Controls</h3>

        <div style={{ marginBottom: "5px" }}>
          <label>
            Speed:&nbsp;
            <select
              value={multiplier}
              onChange={(e) => setMultiplier(Number(e.target.value))}
            >
              <option value={1}>1 sec/sec</option>
              <option value={10}>10 sec/sec</option>
              <option value={30}>30 sec/sec</option>
              <option value={60}>1 min/sec</option>
              <option value={600}>10 min/sec</option>
              <option value={3600}>1 hour/sec</option>
              <option value={86400}>1 day/sec</option>
              <option value={31536000}>1 year/sec</option>
            </select>
          </label>
        </div>

        <div style={{ marginBottom: "5px" }}>
          <label>
            Select Date:&nbsp;
            <input
              type="date"
              onChange={(e) => {
                const selectedDate = new Date(e.target.value);
                setSimulationTime(selectedDate);
              }}
            />
          </label>
        </div>

        <div>
          <strong>Sim Time:</strong> {simulationTime.toLocaleString()}
        </div>
      </div>
    </Html>
  );
};

export default TimeTravelPanel;
