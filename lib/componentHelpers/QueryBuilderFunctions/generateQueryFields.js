import { defaultValidator } from 'react-querybuilder';

/**
 * Generates the query fields dynamically based on the property list you give it.
 * For field references for React QueryBuilder, reference https://react-querybuilder.js.org/docs/typescript#fields
 * @param {Array} properties - list of properties populated from the getProps call
 * @returns {Array<Object>} - Fields for use with the React-Query-Builder
 */
export const generateQueryFields = (properties) => {
    const fields = [];
    for (const property in properties) {
        fields.push({
            name: properties[property].entityPropertyName, // Name of the database entry
            label: properties[property].displayLabel, // User friendly label
            placeholder: `Enter ${properties[property].displayLabel}`, // Placeholder for empty values
            operators: [
                { name: 'equals', label: 'Equals' },
                { name: 'contains', label: 'Contains' },
                { name: 'beginsWith', label: 'Begins With' },
            ],
            //validator: defaultValidator, // Validator function
        });
    }
    return fields;
};
