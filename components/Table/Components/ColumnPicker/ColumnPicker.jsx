/* eslint-disable indent */
/* eslint-disable multiline-ternary */
import PropTypes from 'prop-types';
import React from 'react';
import classes from './ColumnPicker.module.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Dropdown, DropdownButton, Button } from 'react-bootstrap';
import Checkbox from '../../../Checkbox/BasicCheckbox';
import ColumnsIcon from '../../../Images/svg/ColumnsIcon';

/**
 * Column Picker component
 *
 * Works in tandem with our Tanstack tables.  Bootstrap handles the style of the Table.
 * https://tanstack.com/table/v8/docs/guide/column-visibility for Column Visiblity/Column Picker
 *
 * @param {Object} props - Object with all of the properties used within the react component, listed below.
 * @property {Array{Object}} tableColumns - Array of Objects of the table columns. These same columns were passed to the relating Table component as well from the shared parent component. See Study Explorer
 * @property {Function} [setColumnVisibility] - Set state function to update columnVisibility list from parent. See Study Explorer
 * @property {Object} [columnVisibility] - List from parent to track visibility of columns. Meant to mimic the list Tanstack Table uses. See Study Explorer
 * @property {Object} [className=''] - Class extension parameter. Use this to pass through the CSS object if any overwrites need to happen.
 * @returns {JSX} Column Picker Component
 */

const ColumnPicker = (props) => {
    const { tableColumns, columnVisibility, setColumnVisibility, className } = props;

    return (
        <DropdownButton
            className={`${classes.manageColumns} ${className}`}
            title={
                <>
                    <ColumnsIcon /> Manage Columns
                </>
            }
            role="menuitemcheckbox"
        >
            {tableColumns &&
                tableColumns.map((column) => {
                    return (
                        <Dropdown.ItemText key={column.id}>
                            <div className="px-1">
                                <Checkbox
                                    {...{
                                        label: column.header,
                                        type: 'checkbox',
                                        checked: !(column.accessorKey in columnVisibility) || columnVisibility[column.accessorKey],
                                        onChange: () => {
                                            if (column.accessorKey in columnVisibility) {
                                                columnVisibility[column.accessorKey] = !columnVisibility[column.accessorKey];
                                                setColumnVisibility({ ...columnVisibility });
                                            } else {
                                                setColumnVisibility({ ...columnVisibility, [column.accessorKey]: false });
                                            }
                                        },
                                        disabled: column.locked,
                                    }}
                                />
                            </div>
                        </Dropdown.ItemText>
                    );
                })}
            <Dropdown.Divider />
            <Dropdown.ItemText>
                <Button variant="link" className={classes.selectAllColumns} onClick={() => setColumnVisibility({})}>
                    Select All
                </Button>
            </Dropdown.ItemText>
        </DropdownButton>
    );
};

ColumnPicker.propTypes = {
    className: PropTypes.string,
    columnVisibility: PropTypes.object,
    setColumnVisibility: PropTypes.func,
    tableColumns: PropTypes.array,
};

export default ColumnPicker;
