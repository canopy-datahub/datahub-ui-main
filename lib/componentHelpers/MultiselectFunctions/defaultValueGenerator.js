/**
 * This formats your data so that react hook form can load the return values as defaults on page load
 * @param {Array<String> || String} data - array or string that doesn't follow the {label, value} standard of Multiselect default values
 * @returns an array of objects following Multiselect data formatting for default values
 */
export const defaultValueGeneratorForMultiSelect = (data) => {
    if (data === undefined || data === null) {
        return [];
    } else if (Array.isArray(data)) {
        const defaultValues = [];
        data.map((string) => {
            return defaultValues.push({ label: string, value: string });
        });
        return defaultValues;
    } else {
        return [{ label: data, value: data }];
    }
};
