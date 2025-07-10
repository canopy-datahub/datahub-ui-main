/* eslint-disable indent */
/* eslint-disable multiline-ternary */
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { Table as BTable } from 'react-bootstrap';
import classes from './Table.module.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from '../Button/Button';
import {
    flexRender,
    getCoreRowModel,
    useReactTable,
    getSortedRowModel,
} from '@tanstack/react-table';
import { Trash } from 'react-bootstrap-icons';
import DeleteMultipleModal from '../../views/DataIngest/Components/DeleteMultipleModal';

/**
 * Interactable Table component
 *
 * This table is for a table with a checkbox column for selecting actions to take on rows
 *
 * Tanstack handles the Table State in this component.  Bootstrap handles the style of the Table.
 * https://react-bootstrap.github.io/docs/components/table for Bootstrap tables
 * https://tanstack.com/table/v8/docs/guide/introduction for Tanstack Table handler tutorial
 *
 * NOTE: TanStack code examples are in Typescript, so keep that in mind when transcribing it into Javascript
 * https://www.w3.org/WAI/tutorials/tables/caption-summary/ for 508 Caption tutorial
 *
 * To make specific columns left aligned, add `alignLeft: true,` into the desired column header definition
 *
 * @param {Object} props - Object with all of the properties used within the react component, listed below.
 * @property {Array{Object}} tableRows - Array of Objects with the keys being the accessorKeys of the table Columns
 * @property {String} ariaCaption - Summary of what the table shows, which is read to the screenreader
 * @property {Array{Object}} tableHeaders - Array of Objects with accessor keys/cells/header names.  Look at storybook for an example.
 * @returns {JSX} CheckboxTable Component
 */

const CheckboxTable = (props) => {
    const { tableRows, tableHeaders, ariaCaption, responsive, files, setFiles } = props;

    // Tanstack state tracker
    const [rowSelection, setRowSelection] = useState({});

    // Controls "Select All/Unselect All" button
    const [buttonLabel, setButtonLabel] = useState('Select All');
    const [allSelected, setAllSelected] = useState(false);
    const [showActionButtons, setShowActionButtons] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [filesToDelete, setFilesToDelete] = useState([]);

    const closeDeleteModal = () => {
        setShowDeleteModal(!showDeleteModal);
    };

    // Tanstack table state manager
    const table = useReactTable({
        data: tableRows,
        columns: tableHeaders,
        state: {
            rowSelection,
        },
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        enableRowSelection: true,
        onRowSelectionChange: setRowSelection,
    });

    // Checks if any rows are selected to determine if actions buttons should be disabled or not and determine label of "Select All/Unselect All" button
    useEffect(() => {
        if (Object.keys(rowSelection).length) {
            setShowActionButtons(true);
            if (Object.keys(rowSelection).length < table.getRowModel().flatRows.length) {
                setAllSelected(false);
                setButtonLabel('Select All');
            } else {
                setAllSelected(true);
                setButtonLabel('Unselect All');
            }
        } else {
            setShowActionButtons(false);
        }
    }, [rowSelection]);

    // Function to get selected filesIds for deleting
    const getSelectedFiles = () => {
        const selectedFiles = [];
        Object.keys(rowSelection).forEach((rowIndex) => {
            selectedFiles.push(table.getRowModel()?.rowsById[rowIndex]?.original);
        });
        return selectedFiles;
    };


    return (
        <div className={classes.studyTable}>
            <div className={classes.buttonSection}>
                <div className={classes.leftSide}>
                    <Button
                        className={classes.generalButton}
                        label={buttonLabel}
                        variant="primary"
                        handleClick={() => {
                            table.toggleAllRowsSelected();
                            if (table.getIsSomeRowsSelected()) {
                                // toggle will end up selecting all if any rows are selected
                                setAllSelected(true);
                            } else {
                                setAllSelected(!allSelected);
                            }
                            if (!allSelected) {
                                setButtonLabel('Unselect All');
                            } else {
                                setButtonLabel('Select All');
                            }
                        }}
                    />
                </div>
                <div className={classes.rightSide}>
                    <Button
                        className={`${classes.generalButton} py-1`}
                        label="Delete Selected File(s)"
                        iconLeft={<Trash />}
                        variant="danger"
                        disabled={!showActionButtons}
                        handleClick={() => {
                            if (table.getIsSomeRowsSelected() || table.getIsAllRowsSelected()) {
                                setShowDeleteModal(true);
                            } else {
                                setShowActionButtons(false);
                            }
                        }}
                    />
                </div>
            </div>
            <DeleteMultipleModal
                visible={showDeleteModal}
                closeModal={closeDeleteModal}
                filesToDelete={getSelectedFiles()}
                files={files}
                setFiles={setFiles}
                setRowSelection={setRowSelection}
            />
            <div tabIndex="0" className={`${classes.expandableContainer} ${classes.container}`}>
                <BTable
                    responsive={responsive}
                    striped
                    bordered
                    size="sm"
                    className={`${classes.table} ${classes.approvedPublicTable}`}
                    role="table"
                >
                    <caption className="sr-only">{ariaCaption}</caption>
                    <thead>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <th
                                        key={header.id}
                                        tabIndex="0"
                                        colSpan={header.colSpan}
                                        // this is where I can set the column widths, getSize() not working tho
                                        style={{ width: header.getSize() !== 150 ? header.getSize() : 150 }}
                                        className={header.column.columnDef.alignLeft ? `${classes.alignLeft}` : ''}
                                    >
                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>

                    <tbody>
                        {table.getRowModel().rows.map((row) => (
                            <tr key={row.id}>
                                {row.getVisibleCells().map((cell) => (
                                    <td
                                        tabIndex="0"
                                        key={cell.id}
                                        className={cell.column.columnDef.alignLeft ? `${classes.alignLeft}` : `${classes.alignCenter}`}
                                    >
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </BTable>
            </div>
        </div>
    );
};

CheckboxTable.propTypes = {
    ariaCaption: PropTypes.string.isRequired,
    responsive: PropTypes.bool,
    tableHeaders: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            accessorKey: PropTypes.string.isRequired,
            cell: PropTypes.func.isRequired,
            header: PropTypes.string.isRequired,
            size: PropTypes.string,
        })
    ).isRequired,
    tableRows: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default CheckboxTable;
