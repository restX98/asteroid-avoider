import AsteroidListItem from "./AsteroidListItem";

function AsteroidList({ asteroids }) {
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
}

export default AsteroidList;
