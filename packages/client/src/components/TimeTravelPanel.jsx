import React, { useState, useEffect } from "react";

import { formatDate } from "@/utils/formatDate";

const TimeTravelPanel = ({
  simulationTimeRef,
  onTimeChange,
  multiplier,
  setMultiplier,
}) => {
  const [displayTime, setDisplayTime] = useState(simulationTimeRef.current);

  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayTime(new Date(simulationTimeRef.current));
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
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
            value={formatDate(displayTime)}
            onChange={(e) => {
              const date = new Date(e.target.value);
              setDisplayTime(date);
              onTimeChange(date);
            }}
          />
        </label>
      </div>

      <div>
        <strong>Sim Time:</strong> {displayTime.toLocaleString()}
      </div>
    </div>
  );
};

export default TimeTravelPanel;
