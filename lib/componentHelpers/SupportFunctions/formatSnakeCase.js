/**
 * Formats string back to regular text from snake case
 * @param {String} s - snake case string
 */

export function formatSnakeCase(s) {
    return s
        .replace(/^[-_]*(.)/, (_, c) => c.toUpperCase()) // Initial char (after -/_)
        .replace(/[-_]+(.)/g, (_, c) => ' ' + c.toUpperCase()); // First char after each -/_
}
