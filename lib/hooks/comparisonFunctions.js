/**
 * Function figuring out if your string is empty in some way
 * @param {String} value
 * @returns {Boolean} dictating if the string is null, undefined, or ""
 */
export function isEmpty(value) {
    return value == null || (typeof value === 'string' && value.trim().length === 0);
}
