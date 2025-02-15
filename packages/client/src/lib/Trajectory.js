class Trajectory {
  static #EARTH_PERIOD = 365.25;
  static #J2000 = new Date("2000-01-01");
  static #MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;

  /**
   * Create a Planet instance with its orbital parameters.
   *
   * @param {number} name
   * @param {number} M0 - Mean anomaly at epoch J2000.0 (in degree).
   * @param {number} P  - Orbital period (in the same time unit as t).
   * @param {number} e  - Orbital eccentricity.
   * @param {number} a  - Semi-major axis.
   * @param {number} N  - Longitude of ascending node (in degree).
   * @param {number} w  - Argument of periapsis (in degree).
   * @param {number} i  - Inclination (in degree).
   */
  constructor(name, M0, P, e, a, N, w, i) {
    this.name = name;
    this.M0 = this.#degToRad(M0);
    this.P = P * Trajectory.#EARTH_PERIOD;
    this.e = e;
    this.a = a;
    this.N = this.#degToRad(N);
    this.w = this.#degToRad(w);
    this.i = this.#degToRad(i);

    this.orbitCoords = this.#traceOrbit();
  }

  #traceOrbit() {
    const steps = this.P > 50 ? 3000 : 100;
    const dt = this.P / steps;
    let orbit = [];

    for (let i = 0; i <= steps; i++) {
      let t = i * dt; // Time in days
      let coords = this.#getCoordinates(t);
      orbit.push(coords);
    }

    return orbit;
  }

  /**
   * Converts degrees to radians.
   * @param {number} degrees
   * @returns {number} radians
   */
  #degToRad(degrees) {
    return degrees * (Math.PI / 180);
  }

  /**
   * Compute the mean anomaly at time t.
   *
   * Formula:
   *    M = M0 + n * t
   * where n = 2π / P
   *
   * @param {number} t - Time elapsed since the J2000.0 epoch.
   * @return {number} Mean anomaly (in radians).
   */
  #getMeanAnomaly(t) {
    const n = (2 * Math.PI) / this.P;
    return this.M0 + n * t;
  }

  /**
   * Compute the true anomaly (v) using the Equation of the Center approximation.
   *
   * Formula:
   *    v = M + (2e - e³/4)*sin(M) + (5/4)*e²*sin(2M) + (13/12)*e³*sin(3M)
   *
   * @param {number} M - Mean anomaly (in radians).
   * @return {number} True anomaly (in radians).
   */
  #getTrueAnomaly(M) {
    const e = this.e;
    const term1 = (2 * e - Math.pow(e, 3) / 4) * Math.sin(M);
    const term2 = (5 / 4) * Math.pow(e, 2) * Math.sin(2 * M);
    const term3 = (13 / 12) * Math.pow(e, 3) * Math.sin(3 * M);
    return M + term1 + term2 + term3;
  }

  /**
   * Compute the distance (r) from the planet to the Sun.
   *
   * Formula:
   *    r = a * (1 - e²) / (1 + e*cos(v))
   *
   * @param {number} v - True anomaly (in radians).
   * @return {number} Distance.
   */
  #getDistance(v) {
    return (this.a * (1 - this.e * this.e)) / (1 + this.e * Math.cos(v));
  }

  /**
   * Calculate the coordinates (x, y, z) of the planet at time t.
   *
   * The coordinate transformation uses:
   *
   *    x = r [ cos(N) cos(v+w) - sin(N) sin(v+w) cos(i) ]
   *    y = r [ sin(N) cos(v+w) + cos(N) sin(v+w) cos(i) ]
   *    z = r sin(v+w) sin(i)
   *
   * @param {number} t - Time elapsed since the J2000.0 epoch.
   * @return {Object} An object containing x, y, and z coordinates.
   */
  #getCoordinates(t) {
    // Compute the mean anomaly
    const M = this.#getMeanAnomaly(t);

    // Compute the true anomaly (v) using the Equation of the Center
    const v = this.#getTrueAnomaly(M);

    // Compute the distance from the Sun to the planet
    const r = this.#getDistance(v);

    // The angle v+w is used in the coordinate transformation.
    const angle = v + this.w;

    // Calculate the final coordinates
    const x =
      r *
      (Math.cos(this.N) * Math.cos(angle) -
        Math.sin(this.N) * Math.sin(angle) * Math.cos(this.i));
    const y =
      r *
      (Math.sin(this.N) * Math.cos(angle) +
        Math.cos(this.N) * Math.sin(angle) * Math.cos(this.i));
    const z = r * Math.sin(angle) * Math.sin(this.i);

    return { x, y, z };
  }

  getCoordinatesByDate(date) {
    const simTimeInDays =
      (date.getTime() - Trajectory.#J2000.getTime()) /
      Trajectory.#MILLISECONDS_PER_DAY;

    return this.#getCoordinates(simTimeInDays);
  }
}

export default Trajectory;
