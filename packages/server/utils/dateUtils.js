const { addDays } = require("date-fns");

const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

/**
 * Validates the provided start and end dates.
 * @param {string} start_date - The start date in YYYY-MM-DD format.
 * @param {string} end_date - The end date in YYYY-MM-DD format.
 * @returns {Object} - Object containing startDate and endDate as Date objects.
 * @throws {Object} - Error with status and message if validation fails.
 */
const validateDates = (start_date, end_date) => {
  if (!start_date || !end_date) {
    throw {
      status: 400,
      message:
        "Both start_date and end_date query parameters are required in the format YYYY-MM-DD.",
    };
  }
  if (!dateRegex.test(start_date) || !dateRegex.test(end_date)) {
    throw {
      status: 400,
      message: "Both start_date and end_date must be in the format YYYY-MM-DD.",
    };
  }

  const startDate = new Date(start_date);
  const endDate = new Date(end_date);

  if (isNaN(startDate) || isNaN(endDate)) {
    throw { status: 400, message: "Invalid date." };
  }
  if (startDate > endDate) {
    throw {
      status: 400,
      message: "start_date must be before or equal to end_date.",
    };
  }
  return { startDate, endDate };
};

/**
 * Returns an array of date strings (YYYY-MM-DD) from start to end (inclusive).
 * @param {Date} start - Start date in YYYY-MM-DD format.
 * @param {Date} end - End date in YYYY-MM-DD format.
 * @returns {Date[]} Array of date strings.
 */
const splitDate = (start, end) => {
  const dates = [];
  let currentDate = start;
  while (currentDate <= end) {
    dates.push(currentDate);
    currentDate = addDays(currentDate, 1);
  }
  return dates;
};

/**
 * Groups an array of dates into ranges where the maximum span within each range is 7 days.
 *
 * @param {Date[]} dates - An array of Date objects (must be valid JavaScript Date instances).
 * @returns {{ min: Date, max: Date }[]} An array of objects representing date ranges,
 *                                       each with `min` (start date) and `max` (end date).
 */
function groupDatesInRanges(dates) {
  dates.sort((a, b) => a - b);

  const ranges = [];
  let i = 0;
  while (i < dates.length) {
    const startDate = dates[i];
    const rangeLimit = addDays(startDate, 7);

    let j = i;
    while (j < dates.length && dates[j] <= rangeLimit) {
      j++;
    }

    ranges.push({ min: startDate, max: dates[j - 1] });
    i = j;
  }

  return ranges;
}

/**
 * Convert a Julian Date (JD) to Gregorian Date.
 * The conversion is based on the Fliegel-Van Flandern algorithm.
 *
 * @param {number} jd - The Julian Date.
 * @returns {Date} A JavaScript Date object in UTC.
 */
function julianToGregorian(jd) {
  // Adjust JD to start at midnight.
  const J = jd + 0.5;
  const j = Math.floor(J);
  const f = J - j;
  let A;
  if (j >= 2299161) {
    const alpha = Math.floor((j - 1867216.25) / 36524.25);
    A = j + 1 + alpha - Math.floor(alpha / 4);
  } else {
    A = j;
  }
  const B = A + 1524;
  const C = Math.floor((B - 122.1) / 365.25);
  const D = Math.floor(365.25 * C);
  const E = Math.floor((B - D) / 30.6001);

  // Compute day with fractional time.
  const day = B - D - Math.floor(30.6001 * E) + f;
  const month = E < 14 ? E - 1 : E - 13;
  const year = month > 2 ? C - 4716 : C - 4715;

  // Separate the day into its integer and fractional parts.
  const integerDay = Math.floor(day);
  const fractionalDay = day - integerDay;
  const hours = Math.floor(fractionalDay * 24);
  const minutes = Math.floor((fractionalDay * 24 - hours) * 60);
  const seconds = Math.floor(
    ((fractionalDay * 24 - hours) * 60 - minutes) * 60
  );
  const milliseconds = Math.floor(
    (((fractionalDay * 24 - hours) * 60 - minutes) * 60 - seconds) * 1000
  );

  // Create a Date object (months in JS Date are 0-indexed).
  return new Date(
    Date.UTC(year, month - 1, integerDay, hours, minutes, seconds, milliseconds)
  );
}

module.exports = {
  validateDates,
  splitDate,
  groupDatesInRanges,
  julianToGregorian,
};
