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
 * Formats a Date object into YYYY-MM-DD.
 * @param {Date} date - The Date object.
 * @returns {string} - Formatted date string.
 */
const formatDate = (date) => date.toISOString().split("T")[0];

/**
 * Splits the overall date range into segments of at most maxDays days.
 * @param {Date} startDate - Start of the range.
 * @param {Date} endDate - End of the range.
 * @param {number} maxDays - Maximum number of days per segment.
 * @returns {Array} - Array of objects with start and end properties.
 */
const splitDateRange = (startDate, endDate, maxDays = 7) => {
  const segments = [];
  let currentStart = new Date(startDate);

  while (currentStart <= endDate) {
    let currentEnd = new Date(currentStart);
    currentEnd.setDate(currentEnd.getDate() + maxDays - 1);
    if (currentEnd > endDate) {
      currentEnd = new Date(endDate);
    }
    segments.push({
      start: formatDate(currentStart),
      end: formatDate(currentEnd),
    });
    currentStart = new Date(currentEnd);
    currentStart.setDate(currentStart.getDate() + 1);
  }

  return segments;
};

module.exports = { validateDates, formatDate, splitDateRange };
