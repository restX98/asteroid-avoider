import { useState, useEffect } from "react";
import { useAsteroidDetail } from "@/hooks/useAsteroidDetail";

import emitter from "@/utils/emitter";

function AsteroidListItem({ asteroid }) {
  const [checked, setChecked] = useState(false);
  const [asteroidId, setAsteroidId] = useState(null);

  const { asteroidDetail, loading, error } = useAsteroidDetail(asteroidId);

  useEffect(() => {
    if (checked) {
      asteroidDetail &&
        emitter.emit("addAsteroid", {
          asteroidId: asteroid.id,
          asteroidDetail: asteroidDetail,
        });
    } else {
      emitter.emit("removeAsteroid", {
        asteroidId: asteroid.id,
      });
    }

    return () => {
      emitter.emit("removeAsteroid", {
        asteroidId: asteroid.id,
      });
    };
  }, [checked, asteroidDetail]);

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
      <label style={{ display: "block", marginBottom: "5px" }}>
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => {
            setChecked(e.target.checked);
            setAsteroidId(asteroid.id);
          }}
        />
        &nbsp;Show Asteroid
      </label>
    </div>
  );
}

export default AsteroidListItem;
