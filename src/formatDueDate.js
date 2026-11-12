/**
 * Formats a valid Date object (or date input) into YYYY-MM-DD format.
 *
 * @param {Date|string|number} dateInput - A valid Date instance or parseable date representation.
 * @returns {string} The formatted date in YYYY-MM-DD format.
 * @throws {TypeError} If the input is not a valid date.
 */
export function formatDueDate(dateInput) {
  const date = dateInput instanceof Date ? dateInput : new Date(dateInput);

  if (Number.isNaN(date.getTime())) {
    throw new TypeError('Invalid date: provided input cannot be parsed into a valid Date.');
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

export default formatDueDate;
