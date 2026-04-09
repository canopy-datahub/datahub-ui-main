/* eslint-disable react/jsx-indent-props */
import Button from '../../../components/Button/Button';
import { dateFormatter } from '../SupportFunctions/dateFormatter';

const metricsTooltips = {
    Variables: 'Total number of variables',
    'Harmonizable Variables (Tier 1)': 'Number of variables that can be harmonized according to the Global Codebook',
    'Harmonized Variables (Tier 1)': 'Number of variables that have been harmonized according to the Global Codebook',
    'Harmonizable Variables (Tier 2)': 'Number of variables that can be harmonized according to Tier 2 data dictionaries provided by the DCCs',
    'Harmonized Variables (Tier 2)': 'Number of variables that have been harmonized according to Tier 2 data dictionaries provided by the DCCs'
};

/**
 * Function to create Metrics related Table definitions
 * @param {Array<String>} headerList - Array of all of the headers
 * @param {Function} setVariablesList - state call to set variables list for modal
 * @param {Function} setVariablesModalVisible - function to make modal visible
 * @param {String} classes - CSS class used
 * @returns Column definitions to use with the general Tanstack table specific to the Metrics reports tables
 */

export function createMetricsColumns(headerList, setVariablesList, setVariablesModalVisible, classes) {
    const tableColumns = [];
    // go through each header and generate tanstack's column definition to pass to the table
    for (const header in headerList) {
        tableColumns.push({
            id: headerList[header],
            accessorKey: headerList[header],
            accessorFn: (props) => props[headerList[header]],
            cell: (props) => {
                switch (headerList[header]) {
                    case 'Data Size':
                        return (
                            <span className={classes.bold} >
                                {
                                    props.getValue() >= 1000
                                        ? Math.round((props.getValue() / 1000 + Number.EPSILON) * 100) / 100 + 'GB'
                                        : Number.parseFloat((props.getValue() + Number.EPSILON) * 100 / 100).toFixed(1) + 'MB'
                                }
                            </span>
                        );
                    case 'Variables':
                        return getVariablesCell(props, 'allVariables', setVariablesList, setVariablesModalVisible, classes);
                    case 'Variables (Orig)':
                        return getVariablesCell(props, 'origVariables', setVariablesList, setVariablesModalVisible, classes);
                    case 'Variables (Trans)':
                        return getVariablesCell(props, 'transformVariables', setVariablesList, setVariablesModalVisible, classes);
                    case 'Harmonizable Variables (Tier 1)':
                        return getVariablesCell(props, 'harmonizableVariablesT1', setVariablesList, setVariablesModalVisible, classes);
                    case 'Harmonized Variables (Tier 1)':
                        return getVariablesCell(props, 'harmonizedVariablesT1', setVariablesList, setVariablesModalVisible, classes);
                    case 'Harmonizable Variables (Tier 2)':
                        return getVariablesCell(props, 'harmonizableVariablesT2', setVariablesList, setVariablesModalVisible, classes);
                    case 'Harmonized Variables (Tier 2)':
                        return getVariablesCell(props, 'harmonizedVariablesT2', setVariablesList, setVariablesModalVisible, classes);
                    case 'Total Harmonizable':
                        return getVariablesCell(props, 'totalHarmonizable', setVariablesList, setVariablesModalVisible, classes);
                    case 'Total Harmonized':
                        return getVariablesCell(props, 'totalHarmonized', setVariablesList, setVariablesModalVisible, classes);
                    case 'Registration Date':
                    case 'Last Login':
                        if (props.getValue()) {
                            return (
                                <span className={classes.bold}>{dateFormatter(props.getValue())}</span>
                            );
                        }
                        break;
                    default:
                        return <span className={classes.bold}>{props.getValue()}</span>;
                }
            },
            header: headerList[header],
            size: headerList[header] === 'Study Name' ? 400 : 170,
            alignLeft: true,
            tooltip: headerList[header] in metricsTooltips ? metricsTooltips[headerList[header]] : null
        });
    }
    return tableColumns;
}

/**
 * Function to return Variables cell/list for Metrics
 * @param {Object} props - Prop from table column definitions
 * @param {String} entityName - identifier in row prop
 * @param {Function} setVariablesList - state call to set variables list for modal
 * @param {Function} setVariablesModalVisible - function to make modal visible
 * @param {String} classes - CSS class used
 * @returns Variables cell
 */
export function getVariablesCell(props, entityName, setVariablesList, setVariablesModalVisible, classes) {
    let variablesList = '';

    switch (entityName) {
        case 'totalHarmonizable':
            variablesList = props.row.original.harmonizableVariablesT1 ? props.row.original.harmonizableVariablesT1 : '';
            variablesList += props.row.original.harmonizableVariablesT2 ? (variablesList.length > 0 ? ',' : '') + props.row.original.harmonizableVariablesT2 : '';

            return (
                variablesList.length > 0
                    ? <Button
                        className={classes.variablesLink}
                        label={`${props.getValue()}`}
                        ariaLabel={`View ${props.getValue()} Variables`}
                        size="auto"
                        handleClick={() => {
                            setVariablesModalVisible(true);
                            setVariablesList(variablesList);
                        }}
                    ></Button>
                    : <span className={classes.bold}>{props.getValue()}</span>
            );
        case 'totalHarmonized':
            variablesList = props.row.original.harmonizedVariablesT1 ? props.row.original.harmonizedVariablesT1 : '';
            variablesList += props.row.original.harmonizedVariablesT2 ? (variablesList.length > 0 ? ',' : '') + props.row.original.harmonizedVariablesT2 : '';

            return (
                variablesList.length > 0
                    ? <Button
                        className={classes.variablesLink}
                        label={`${props.getValue()}`}
                        ariaLabel={`View ${props.getValue()} Variables`}
                        size="auto"
                        handleClick={() => {
                            setVariablesModalVisible(true);
                            setVariablesList(variablesList);
                        }}
                    ></Button>
                    : <span className={classes.bold}>{props.getValue()}</span>
            );
        default:
            return (
                props.row.original[entityName]
                    ? <Button
                        className={classes.variablesLink}
                        label={`${props.getValue()}`}
                        ariaLabel={`View ${props.getValue()} Variables`}
                        size="auto"
                        handleClick={() => {
                            setVariablesModalVisible(true);
                            setVariablesList(props.row.original[entityName]);
                        }}
                    ></Button>
                    : <span className={classes.bold}>{props.getValue()}</span>
            );
    }
}

/**
 * Function to create an array of rows to be loaded by the table
 * @param {Array} rows - All of the row data to be sorted out
 * @returns Array containing all of the sorted rows.
 */
export function generateMetricsRows(rows) {
    const tableRows = [];
    for (let i = 0; i <= rows.length - 1; i++) {
        tableRows.push(rows[i]);
    }
    return tableRows;
}
