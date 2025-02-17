const redis = require("redis");

const client = redis.createClient({
  url: process.env.REDIS_URL,
  socket: {
    reconnectStrategy: function (retries) {
      if (retries > 5) {
        console.log(
          "Too many attempts to reconnect. Redis connection was terminated"
        );
        return new Error("Too many retries.");
      } else {
        return retries * 500;
      }
    },
  },
});

client.on("error", (err) => {
  console.error("Redis Client Error", err);
});

(async () => {
  try {
    await client.connect();
    console.log("Connected to Redis");
  } catch (err) {
    console.error("Could not connect to Redis:", err);
  }
})();

module.exports = client;
