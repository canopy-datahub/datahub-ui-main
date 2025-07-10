/**
 * Calculates the amount of time it took to resolve a ticket (in days)
 * @param {String} time - Date object that is used to format
 * @param {String} formatType - String dictating how you want the date to be formatted.
 * @return 'US Date' - returns 'MM/DD/YY' format dates
 * @return Passing nothing returns 'm/dd/YYYY, h:mm:ss AM' format strings
 */

export function dateFormatter(time, formatType) {
    if (formatType === 'US Date') {
        const parsed = new Date(time).toLocaleDateString('en-US');
        return parsed;
    } else {
        const parsed = new Date(time).toLocaleString();
        return parsed;
    }
}
