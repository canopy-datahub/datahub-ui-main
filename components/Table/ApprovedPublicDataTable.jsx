/* eslint-disable indent */
/* eslint-disable multiline-ternary */
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Table as BTable } from 'react-bootstrap';
import classes from './Table.module.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from '../Button/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Select, { components } from 'react-select';
import SortIcon from '../Images/svg/SortIcon';
import {
    flexRender,
    getCoreRowModel,
    useReactTable,
    getSortedRowModel,
    getExpandedRowModel,
    getFacetedUniqueValues,
} from '@tanstack/react-table';
import { PUT_FILES_TO_WORKBENCH, MOVE_PUBLIC_TO_WORKBENCH, GET_SELECTED_FILES, GET_SELECTED_PUBLIC_DATA } from '../../constants/apiRoutes';
import useRest from '../../lib/hooks/useRest';
import { downloadLink } from '../../lib/pageHelpers/downloadLink';

/**
 * Interactable Table component
 *
 * This table is specifically for Approved Data and Public Data which have sorting, child rows, and manual filtering for the file type/file category column.
 *
 * Manual Filtering:
 * Unable to use tanstack's built-in filter APIs because there was no way to show child rows while hiding its parent row. How the manual custom filtering works:
 * - Use dynamic rows for the main table on display
 * - Declare a second table to keep track of original data, make use of tanstack's built-in APIs, and get the file type filter options in dropdown
 * - Filter rows from the original data table and set these as the main table's new rows to display
 *
 * Information on the MultiValue component used for Filtering:
 * https://react-select.com/components for MultiValue component example
 * https://react-select.com/props#multivaluecontainer for MultiValue component prop docs
 * https://react-select.com/styles#the-styles-prop for Styling MultiValue component
 *
 *
 * Tanstack handles the Table State in this component.  Bootstrap handles the style of the Table.
 * https://react-bootstrap.github.io/docs/components/table for Bootstrap tables
 * https://tanstack.com/table/v8/docs/guide/introduction for Tanstack Table handler tutorial
 * https://tanstack.com/table/v8/docs/api/features/sorting for Sorting
 * https://tanstack.com/table/v8/docs/api/features/expanding for Showing Child Rows
 *
 * NOTE: TanStack code examples are in Typescript, so keep that in mind when transcribing it into Javascript
 * https://www.w3.org/WAI/tutorials/tables/caption-summary/ for 508 Caption tutorial
 *
 * To make specific columns left aligned, add `alignLeft: true,` into the desired column header definition
 *
 * @param {Object} props - Object with all of the properties used within the react component, listed below.
 * @property {Boolean} publicData - Flag to determine if this is Approved Data or Public Data to call correct endpoint
 * @property {Array{Object}} tableRows - Array of Objects with the keys being the accessorKeys of the table Columns
 * @property {String} ariaCaption - Summary of what the table shows, which is read to the screenreader
 * @property {Array{Object}} tableHeaders - Array of Objects with accessor keys/cells/header names.  Look at storybook for an example.
 * @property {Boolean} [allowSort] - Boolean whether to show the icon images or not
 * @property {Boolean} [noHover] - Prevent styling for row hovering
 * @property {Boolean} [responsive] - When false, header row remains at the top of the table. Usually used with setting height in parent component for scroll
 * @property {Boolean} hasWorkbench - Flag to determine if "Add to Workbench" button should be shown
 * @property {Boolean} hasSASLicense - Flag to determine if "Add to SAS Instance" button should be shown
 * @property {String} baseUrl - base url to use for download links
 * @returns {JSX} Table Component
 */

const ApprovedPublicDataTable = (props) => {
    const { publicData, tableRows, tableHeaders, ariaCaption, allowSort, noHover, responsive, hasWorkbench, baseUrl, studyId } = props;

    // API related variables
    const { restPut, restGet } = useRest();
    const { user } = useSelector((state) => state.userProfile);

    // Tanstack state tracker
    const [rows, setRows] = useState(tableRows);
    const [sorting, setSorting] = useState([]);
    const [expanded, setExpanded] = useState({});
    const [rowSelection, setRowSelection] = useState({});

    // Controls "Select All/Unselect All" button
    const [buttonLabel, setButtonLabel] = useState('Select All');
    const [allSelected, setAllSelected] = useState(false);

    // Controls right side Action buttons for selected rows
    const [showActionButtons, setShowActionButtons] = useState(false);

    // Tanstack table state manager
    const table = useReactTable({
        data: rows,
        columns: tableHeaders,
        state: {
            sorting,
            expanded,
            rowSelection,
        },
        enableSorting: allowSort,
        enableSortingRemoval: allowSort,
        getSubRows: (row) => row.children,
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getExpandedRowModel: getExpandedRowModel(),
        onExpandedChange: setExpanded,
        enableRowSelection: true,
        onRowSelectionChange: setRowSelection,
    });

    // Table with original data. Used for reference and default state for filtering.
    const originalTable = useReactTable({
        data: tableRows,
        columns: tableHeaders,
        getSubRows: (row) => row.children,
        getCoreRowModel: getCoreRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
    });

    useEffect(() => {
        table.toggleAllRowsExpanded();
    }, []);

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

    const MultiValueContainer = (props) => {
        return <components.MultiValueContainer {...props} />;
    };

    // Filter by File Type variables and functions. "fileType" accessor key for Approved Date. "fileCategory" accessor key for Public Data.
    const fileTypeColumn = originalTable.getHeaderGroups()[0].headers.find((o) => o.id === 'fileType' || o.id === 'fileCategory');
    const sortedUniqueValues = Array.from(fileTypeColumn.column.getFacetedUniqueValues().keys()).sort();

    const fileTypeOptions = () => {
        const options = [];
        sortedUniqueValues.map((type) => {
            return options.push({ label: type, value: type });
        });
        return options;
    };

    const filterByFileType = (fileTypes) => {
        // Reset row selection
        table.resetRowSelection();
        setAllSelected(false);
        setButtonLabel('Select All');

        // Show all rows or filter rows by given file type(s)
        if (fileTypes.length === 0) {
            setRows(tableRows);
        } else {
            const filteredRows = originalTable.getRowModel().flatRows.filter((row) => {
                let found = false;
                fileTypes.forEach((f) => {
                    if (row.original.fileType === f.value || row.original.fileCategory === f.value) {
                        found = true;
                    }
                });
                return found;
            });

            // Remove any child rows from parent
            const newFilteredRows = filteredRows.map((row) => {
                const newRow = { ...row.original };
                delete newRow.children;
                return newRow;
            });
            setRows(newFilteredRows);
        }
    };

    // Function to get selected files
    // If Public Data, returns a string. If Approved Data, returns object with strings for sasFiles and dataFiles
    const getSelectedFiles = () => {
        const selectedFiles = [];
        if (publicData) {
            Object.keys(rowSelection).forEach((rowIndex) => {
                selectedFiles.push(table.getRowModel().rowsById[rowIndex].original.id);
            });
            const fileIDString = selectedFiles.join();
            return fileIDString;
        } else {
            Object.keys(rowSelection).forEach((rowIndex) => {
                selectedFiles.push({
                    id: table.getRowModel().rowsById[rowIndex].original.id,
                    isSasFile: table.getRowModel().rowsById[rowIndex].original.isSasFile,
                });
            });

            const sasFileIds = selectedFiles
                .filter((file) => file.isSasFile === true)
                .map((file) => file.id)
                .join(',');
            const dataFileIds = selectedFiles
                .filter((file) => file.isSasFile === false)
                .map((file) => file.id)
                .join(',');

            return { sasFileIds: sasFileIds, dataFileIds: dataFileIds };
        }
    };

    // Function to add selected files to workbench
    const addToWorkbench = async () => {
        const selectedFiles = getSelectedFiles();
        let fileCount;
        if (publicData) {
            fileCount = selectedFiles.split(',').length;

            await restPut(
                MOVE_PUBLIC_TO_WORKBENCH.replace('[fileIDs]', selectedFiles).replace('[studyId]', studyId),
                {},
                {
                    showLoading: true,
                    showSuccess: true,
                    successMessage: `${fileCount} File(s) Successfully Moved to Workbench`,
                    errorMessage: 'Error with adding to workbench',
                }
            );
        } else {
            const sasLen = selectedFiles.sasFileIds.split(',')[0] ? selectedFiles.sasFileIds?.split(',').length : 0;
            const dataLen = selectedFiles.dataFileIds.split(',')[0] ? selectedFiles.dataFileIds?.split(',').length : 0;
            fileCount = sasLen + dataLen;

            await restPut(
                PUT_FILES_TO_WORKBENCH.replace('[sasFileIDs]', selectedFiles.sasFileIds).replace(
                    '[dataFileIDs]',
                    selectedFiles.dataFileIds
                ).replace('[studyId]', studyId),
                {},
                {
                    showLoading: true,
                    showSuccess: true,
                    successMessage: `${fileCount} File(s) Successfully Moved to Workbench`,
                    errorMessage: 'Error with adding to workbench',
                }
            );
        }

        table.resetRowSelection();
        setButtonLabel('Select All');
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
                    <Select
                        className="multiselect"
                        closeMenuOnSelect={false}
                        components={{ MultiValueContainer }}
                        styles={{
                            container: (base) => ({
                                ...base,
                                zIndex: 3,
                            }),
                            control: (base) => ({
                                ...base,
                                minWidth: '200px',
                                maxWidth: '50vw',
                                borderColor: 'black',
                                ':hover': {
                                    borderColor: '#00889d',
                                },
                                color: 'black',
                            }),
                            dropdownIndicator: (base) => ({
                                ...base,
                                color: 'black',
                                ':hover': {
                                    color: '#00889d',
                                },
                            }),
                            clearIndicator: (base) => ({
                                ...base,
                                color: 'black',
                                ':hover': {
                                    color: '#00889d',
                                },
                            }),
                        }}
                        isMulti
                        options={fileTypeOptions()}
                        onChange={(e) => filterByFileType(e)}
                        placeholder="Filter by File Type"
                        aria-label="Filter by File Type"
                    />
                </div>

                <div className="pullRight">
                    <Button
                        className={classes.generalButton}
                        label="Zip & Download"
                        variant="primary"
                        disabled={!showActionButtons}
                        handleClick={async () => {
                            if (publicData) {
                                downloadLink(
                                    `${baseUrl}${GET_SELECTED_PUBLIC_DATA.replace('[sessionID]', user?.sessionID).replace(
                                        '[fileIDs]',
                                        getSelectedFiles()
                                    )}`,
                                    restGet
                                );
                            } else {
                                downloadLink(
                                    `${baseUrl}${GET_SELECTED_FILES.replace('[sessionID]', user?.sessionID)
                                        .replace('[sasFileIDs]', getSelectedFiles().sasFileIds)
                                        .replace('[dataFileIDs]', getSelectedFiles().dataFileIds)}`,
                                    restGet
                                );
                            }
                        }}
                    />
                    {hasWorkbench && (
                        <Button
                            className={classes.generalButton}
                            label="Add to Workbench"
                            variant="primary"
                            handleClick={addToWorkbench}
                            disabled={!showActionButtons}
                        />
                    )}
                    {!hasWorkbench && (
                        <OverlayTrigger
                            delay={{ hide: 450, show: 100 }}
                            overlay={(props) => (
                                <Tooltip {...props}>To transfer files to the Workbench, you must first create a workbench.</Tooltip>
                            )}
                            placement="top"
                        >
                            <a>
                                <Button
                                    className={classes.generalButton}
                                    label="Add to Workbench"
                                    variant="primary"
                                    ariaLabel="To transfer files to the Workbench, you must first create a workbench"
                                    disabled={true}
                                />
                            </a>
                        </OverlayTrigger>
                    )}
                </div>
            </div>
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
                                        {header.isPlaceholder ? null : (
                                            <div
                                                {...{
                                                    className: header.column.getCanSort() && allowSort ? 'cursor-pointer select-none' : '',
                                                    onClick: allowSort ? header.column.getToggleSortingHandler() : () => null,
                                                }}
                                            >
                                                {allowSort ? (
                                                    <div className={classes.row}>
                                                        <div className={classes.sortTextHeader}>
                                                            {flexRender(header.column.columnDef.header, header.getContext())}
                                                        </div>
                                                        <div className={classes.sortHeader}>
                                                            {allowSort
                                                                ? {
                                                                      asc: <SortIcon asc={true} />,
                                                                      desc: <SortIcon asc={false} />,
                                                                  }[header.column.getIsSorted()] ?? <SortIcon unSorted={true} />
                                                                : null}
                                                        </div>
                                                    </div>
                                                ) : (
                                                    flexRender(header.column.columnDef.header, header.getContext())
                                                )}
                                            </div>
                                        )}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>

                    <tbody>
                        {table.getRowModel().rows.map((row) => (
                            <tr key={row.id} className={noHover ? `${classes.noHover}` : ''}>
                                {row.getVisibleCells().map((cell) => (
                                    <td
                                        tabIndex="0"
                                        key={cell.id}
                                        className={cell.column.columnDef.alignLeft ? `${classes.alignLeft}` : ''}
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

ApprovedPublicDataTable.propTypes = {
    allowSort: PropTypes.bool,
    ariaCaption: PropTypes.string.isRequired,
    baseUrl: PropTypes.string,
    hasSASLicense: PropTypes.bool,
    hasWorkbench: PropTypes.bool,
    noHover: PropTypes.bool,
    publicData: PropTypes.bool,
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

export default ApprovedPublicDataTable;
