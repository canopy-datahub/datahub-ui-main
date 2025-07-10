/**
 * Parses an HTTP Cookie header string
 * @param {String} str - Cookie string
 * @returns {Object} - Object of all cookie name-value pairs
 */

export const parseCookie = str =>
    str
        .split(';')
        .map(v => v.split('='))
        .reduce((acc, v) => {
            acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim());
            return acc;
        }, {});
