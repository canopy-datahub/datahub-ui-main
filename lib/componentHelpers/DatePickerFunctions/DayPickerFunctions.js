/**
 * Function to tell you if the day is after the second date
 * @param {String} firstDate - String containing the first date
 * @param {String} secondDate - String containing the second date
 * @returns true if start date is after end date, false if otherwise
 */

export function isFirstDateAfterSecondDate(firstDate, secondDate) {
    if (Date.parse(firstDate) < Date.parse(secondDate)) {
        return false;
    } else {
        return true;
    }
}

/**
 * Function to tell you if the day is after today
 * @param {String} date - string containing the date in some format
 * @returns true if entered date is after today, false otherwise
 */
export function isDateAfterToday(date) {
    if (Date.parse(date) > Date.now()) {
        return true;
    } else {
        return false;
    }
}
