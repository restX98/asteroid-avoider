# 🌍🚀 Asteroid Avoider

Ever wanted to **navigate around the solar system** without crashing into asteroids? 🚀 Well, now you can! **Asteroid Avoider** is like a **galactic GPS for space travelers**, helping you dodge asteroids like an interstellar pro—just like avoiding speed cameras on a road trip. 😉

This app fetches real-time asteroid data from **NASA's Asteroids - NeoWs API** and visualizes their motion along with the planets. You can travel forward and backward in time to see how celestial bodies move and avoid potential asteroid traffic jams!

### ⚠️ Accuracy Disclaimer

While the app provides an accurate visualization of the planet orbits, the asteroid orbits trajectories may not be perfectly precise. Over time, the gravitational influence of planets and other celestial bodies can slightly alter asteroid paths, meaning their future positions might differ from the projections shown here.
The trajectories are calculated using the formula described by [Planetoweb](http://planetoweb.net/en/how-it-works).

## ✨ Features

- **Real-time asteroid tracking** using NASA's NeoWs API.
- **3D visualization** with **React Three Fiber**.
- **Time travel**: move forward and backward to see orbital paths.
- **Detailed asteroid information**.
- **Optimized caching** with Redis for better performance.

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:

- **Node.js v23.7.0**
- **pnpm v10.1.0**
- **Docker** (optionally required to run Redis locally for caching API responses)
- **NASA API Key** (Required to fetch asteroid data from NASA)
  - Get your free API key here: [https://api.nasa.gov/](https://api.nasa.gov/)

### Installation

```sh
# Clone the repository
git clone git@github.com:restX98/asteroid-avoider.git
cd asteroid-avoider

# Set Node.js version
nvm use

# Install dependencies
pnpm i

# Set up environment variables
cp apps/client/.env.template apps/client/.env
cp apps/server/.env.template apps/server/.env

# Set your NASA API key in the server environment file (.env)
```

### Running the Project

```sh
# Optional:
# Start Redis locally:
pnpm start:redis`
# or set the Redis URL of your hosted DB in the server .env file

# Run the client and server concurrently
pnpm dev
```

The client will be available at **http://localhost:5173** and the server at **http://localhost:3001**.

## 📦 Packages Breakdown

### Client (Frontend)

- **Vite** - Fast development environment.
- **ReactJS** - Component-based UI.
- **React Three Fiber** - 3D rendering engine.
- **TailwindCSS** - Utility-first styling.
- **Shadcn/UI** - UI components.

### Server (Backend)

- **ExpressJS** - Backend framework.
- **Redis** - Caching for API requests.
- **NASA NeoWs API** - Fetching asteroid data.

---

## 🌎 Deployment

This project is hosted on **Vercel**.

## 📜 License

This project is licensed under the **MIT License**.

---

🌠 **Enjoy navigating the cosmos (and dodging asteroids) with Asteroid Avoider!** 🚀
