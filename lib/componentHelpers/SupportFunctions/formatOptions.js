import { formatSnakeCase } from './formatSnakeCase';
import { map } from 'lodash';

/**
 * Formats the options used for the Select dropdown component
 * @param {Object} types - list of values need to be converted to {label, value}
 */
export function formatOptions(types) {
    return map(types, (type) => {
        return { label: type === typeof 'string' ? formatSnakeCase(type) : type, value: type };
    });
}
