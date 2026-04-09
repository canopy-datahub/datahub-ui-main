/**
 * Converts string into camel case
 * @param {String} string - word or phrase that needs to be converted
 */

export function toCamel(string) {
    return string.replace(/(?:_| |\b)(\w)/g, function ($1) {
        return $1.toUpperCase().replace('_', ' ');
    });
}
