/**
 * Calculates the amount of time it took to resolve a ticket (in days)
 * @param {String} assignedAt - assigned at date
 * @param {String} resolvedAt - end date
 */

// TODO changed to assignedAt and resolvedAtAt
export function calculateResolutionTime(assignedAt, resolvedAt) {
    if (!assignedAt || !resolvedAt) {
        return 'n/a';
    }
    const oneDayMilli = 24 * 60 * 60 * 1000;
    const parseDate1 = new Date(assignedAt);
    const parseDate2 = new Date(resolvedAt);

    //calculate time difference in milliseconds
    const timeDifference = Math.abs(parseDate2 - parseDate1);

    //Calculate number of days + hours
    const numberOfDays = Math.floor(timeDifference / oneDayMilli);
    const numberOfHours = Math.floor((timeDifference % oneDayMilli) / (1000 * 60 * 60));
    if (numberOfDays > 1) {
        return `${numberOfDays} days`;
    } else if (numberOfDays > 0 && numberOfDays < 2) {
        return `${numberOfDays} day ${numberOfHours} hours`;
    } else {
        return `< 1 day`;
    }
}
