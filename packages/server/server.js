require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3001;

const asteroidRoutes = require("./routes/asteroids");

app.use(express.json());
app.use(cors());

app.use("/api/asteroids", asteroidRoutes);

app.listen(port, () => {
  console.log(`Express server is running on port ${port}`);
});
