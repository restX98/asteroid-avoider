import { useState, useEffect, useMemo } from "react";
import { useAsteroids } from "@/hooks/useAsteroids";
import { formatDate } from "@/utils/formatDate";
import AsteroidList from "./AsteroidList";

function AsteroidsPanel({ onToggleDetail }) {
  const nowDate = useMemo(() => formatDate(new Date()), []);

  const [startDate, setStartDate] = useState(nowDate);
  const [endDate, setEndDate] = useState(nowDate);

  const { asteroids, loading, error } = useAsteroids({ startDate, endDate });

  const maxStart = useMemo(() => {
    if (endDate) {
      const end = new Date(endDate);
      end.setDate(end.getDate());
      return formatDate(end);
    }
    return "";
  }, [endDate]);

  const minEnd = useMemo(() => {
    if (startDate) {
      const start = new Date(startDate);
      start.setDate(start.getDate());
      return formatDate(start);
    }
    return "";
  }, [startDate]);

  return (
    <div
      style={{
        position: "absolute",
        top: "10px",
        right: "10px",
        background: "rgba(0,0,0,0.5)",
        color: "white",
        padding: "10px",
        borderRadius: "4px",
        zIndex: 1000,
      }}
    >
      <h3>Near Asteroids</h3>
      <div style={{ marginBottom: "5px" }}>
        <label>
          Start Date:&nbsp;
          <input
            type="date"
            value={startDate}
            max={maxStart}
            onChange={(e) => {
              setStartDate(formatDate(new Date(e.target.value)));
            }}
          />
        </label>
      </div>
      <div style={{ marginBottom: "5px" }}>
        <label>
          End Date:&nbsp;
          <input
            type="date"
            value={endDate}
            min={minEnd}
            onChange={(e) => {
              setEndDate(formatDate(new Date(e.target.value)));
            }}
          />
        </label>
      </div>
      {asteroids && (
        <AsteroidList asteroids={asteroids} onToggleDetail={onToggleDetail} />
      )}
    </div>
  );
}

export default AsteroidsPanel;
