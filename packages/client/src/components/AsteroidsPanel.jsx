import { useState, useMemo } from "react";
import { useAsteroidData } from "@/hooks/useAsteroidData";
import { formatDate } from "@/utils/formatDate";

const AsteroidListItem = ({ asteroid }) => {
  return (
    <div style={{ borderBottom: "1px solid gray", padding: "5px 0" }}>
      <h4>
        {asteroid.name} ID: {asteroid.id}
      </h4>
      <p>
        Diameter: {asteroid.diameter.min.toFixed(2)} -{" "}
        {asteroid.diameter.max.toFixed(2)} {asteroid.diameter.unit}
      </p>
      <p>
        Velocity: {asteroid.velocity.value.toFixed(2)} {asteroid.velocity.unit}
      </p>
      <p>
        Miss Distance: {asteroid.miss_distance.value.toFixed(2)}{" "}
        {asteroid.miss_distance.unit}
      </p>
      <p style={{ color: asteroid.is_potentially_hazardous ? "red" : "green" }}>
        {asteroid.is_potentially_hazardous
          ? "Potentially Hazardous"
          : "Not Hazardous"}
      </p>
    </div>
  );
};

const AsteroidList = ({ asteroids }) => {
  return (
    <div style={{ maxHeight: "200px", overflowY: "auto" }}>
      {asteroids.length > 0 ? (
        asteroids.map((asteroid) => (
          <AsteroidListItem key={asteroid.id} asteroid={asteroid} />
        ))
      ) : (
        <p>No asteroids found.</p>
      )}
    </div>
  );
};

const AsteroidsPanel = () => {
  const nowDate = useMemo(() => formatDate(new Date()), []);

  const [startDate, setStartDate] = useState(nowDate);
  const [endDate, setEndDate] = useState(nowDate);

  const { asteroids, loading, error } = useAsteroidData({ startDate, endDate });

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
      {asteroids && <AsteroidList asteroids={asteroids} />}
    </div>
  );
};

export default AsteroidsPanel;
