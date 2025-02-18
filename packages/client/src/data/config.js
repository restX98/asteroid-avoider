export const SCALE_FACTOR = 1000;

export const TRANSITION = {
  alphaDefault: 1,
  alpha: 0.25,
  littleEpsilon: 0.01,
  bigEpsilon: 1,
};

export const MAX_RANGE_DATE = 31;

export const CAMERA = {
  near: 0.0001,
  far: 100000,
};

export const ORBIT_CONTROL = {
  maxDistance: 50000,
  minDistanceScalar: 1.2,
};

export const ENVIRONMENT = {
  file: "/textures/hiptyc_2020_4k.exr",
  backgroundBlurriness: 0,
  resolution: 256,
  ambientLight: 0.2,
};

export const SUN = {
  radius: 0.004655,
  position: [0, 0, 0],
  intensity: 10,
  decay: 0.05,
};

export const PLANET_OUTLINE = {
  canvas: {
    width: 256,
    height: 256,
  },
  arc: {
    centerX: 128,
    centerY: 128,
    radius: 118,
  },
  line: {
    lineWidth: 15,
  },
};

export const TIME_MAPPING = [
  { label: "REAL TIME", multiplier: 1 },
  { label: "2 sec/s", multiplier: 2 },
  { label: "4 sec/s", multiplier: 4 },
  { label: "8 sec/s", multiplier: 8 },
  { label: "16 sec/s", multiplier: 16 },
  { label: "32 sec/s", multiplier: 32 },
  { label: "1 min/s", multiplier: 60 },
  { label: "2 min/s", multiplier: 60 * 2 },
  { label: "3 min/s", multiplier: 60 * 3 },
  { label: "5 min/s", multiplier: 60 * 5 },
  { label: "7 min/s", multiplier: 60 * 7 },
  { label: "10 min/s", multiplier: 60 * 10 },
  { label: "20 min/s", multiplier: 60 * 20 },
  { label: "30 min/s", multiplier: 60 * 30 },
  { label: "40 min/s", multiplier: 60 * 40 },
  { label: "50 min/s", multiplier: 60 * 50 },
  { label: "1 hour/s", multiplier: 60 * 60 },
  { label: "2 hour/s", multiplier: 60 * 60 * 2 },
  { label: "3 hour/s", multiplier: 60 * 60 * 3 },
  { label: "4 hour/s", multiplier: 60 * 60 * 4 },
  { label: "5 hour/s", multiplier: 60 * 60 * 5 },
  { label: "6 hour/s", multiplier: 60 * 60 * 6 },
  { label: "9 hour/s", multiplier: 60 * 60 * 9 },
  { label: "12 hour/s", multiplier: 60 * 60 * 12 },
  { label: "18 hour/s", multiplier: 60 * 60 * 18 },
  { label: "1 day/s", multiplier: 60 * 60 * 24 },
  { label: "2 day/s", multiplier: 60 * 60 * 24 * 2 },
  { label: "3 day/s", multiplier: 60 * 60 * 24 * 3 },
  { label: "4 day/s", multiplier: 60 * 60 * 24 * 4 },
  { label: "5 day/s", multiplier: 60 * 60 * 24 * 5 },
  { label: "6 day/s", multiplier: 60 * 60 * 24 * 6 },
  { label: "1 week/s", multiplier: 60 * 60 * 24 * 7 },
  { label: "2 week/s", multiplier: 60 * 60 * 24 * 7 * 2 },
  { label: "3 week/s", multiplier: 60 * 60 * 24 * 7 * 3 },
  { label: "1 month/s", multiplier: 60 * 60 * 24 * 30 },
  { label: "2 month/s", multiplier: 60 * 60 * 24 * 30 * 2 },
  { label: "3 month/s", multiplier: 60 * 60 * 24 * 30 * 3 },
  { label: "4 month/s", multiplier: 60 * 60 * 24 * 30 * 4 },
  { label: "5 month/s", multiplier: 60 * 60 * 24 * 30 * 5 },
  { label: "6 month/s", multiplier: 60 * 60 * 24 * 30 * 6 },
  { label: "9 month/s", multiplier: 60 * 60 * 24 * 30 * 9 },
  { label: "1 year/s", multiplier: 60 * 60 * 24 * 365 },
];
