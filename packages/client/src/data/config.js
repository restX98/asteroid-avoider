export const SCALE_FACTOR = 1000;

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
