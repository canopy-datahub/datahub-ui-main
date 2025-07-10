/* eslint-disable indent */
/* eslint-disable multiline-ternary */
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import classes from './UserDashboardTable.module.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import SortIcon from '../../../components/Images/svg/SortIcon';
import { Table as BTable, Row } from 'react-bootstrap';
import { flexRender, getCoreRowModel, useReactTable, getSortedRowModel, getFilteredRowModel } from '@tanstack/react-table';
import SearchClearIcon from '../../../components/Images/svg/SearchClearIcon';

/**
 * Interactable User Dashboard Table component
 * Tanstack handles the Table State in this component.  Bootstrap handles the style of the Table.
 * https://react-bootstrap.github.io/docs/components/table for Bootstrap tables
 * https://tanstack.com/table/v8/docs/guide/introduction for Tanstack Table handler tutorial
 * https://tanstack.com/table/v8/docs/api/features/sorting for Sorting
 * https://tanstack.com/table/v8/docs/api/features/filters for Filters (Not implemented by the frontend at the moment)
 * NOTE: TanStack code examples are in Typescript, so keep that in mind when transcribing it into Javascript
 * https://www.w3.org/WAI/tutorials/tables/caption-summary/ for 508 Caption tutorial
 *
 * To make specific columns left aligned, add `alignLeft: true,` into the desired column header definition
 *
 * @param {Object} props - Object with all of the properties used within the react component, listed below.
 * @property {Array{Object}} tableRows - Array of Objects with the keys being the accessorKeys of the table Columns
 * @property {String} ariaCaption - Summary of what the table shows, which is read to the screenreader
 * @property {String} [variant='full'] - Tells the component which kind of table it should be.
 *   Only options for now is "full" for full functionality and "lite" for smaller tables used for the study details pages.
 * @property {Array{Object}} tableHeaders - Array of Objects with accessor keys/cells/header names.  Look at storybook for an example.
 * @property {Object} [className=''] - Class extension parameter.  Use this to pass through the CSS object if any overwrites need to happen.
 * @property {Boolean} [allowSort] - Boolean whether to show the icon images or not
 * @property {Boolean} [noHover] - Prevent styling for row hovering
 * @property {Boolean} [responsive] - When false, header row remains at the top of the table. Usually used with setting height in parent component for scroll
 * @returns {JSX} User Dashboard Table Component
 */

const UserDashboardTable = (props) => {
    const { tableRows, tableHeaders, ariaCaption, variant, className, allowSort, noHover, responsive } = props;

    // Tanstack sorting state tracker
    const [sorting, setSorting] = useState([]);
    const [globalFilter, setGlobalFilter] = useState('');

    // Tanstack table state manager
    const table = useReactTable({
        data: tableRows,
        columns: tableHeaders,
        state: {
            sorting,
            globalFilter,
        },
        enableSorting: allowSort,
        enableSortingRemoval: allowSort,
        onGlobalFilterChange: setGlobalFilter,
        getFilteredRowModel: getFilteredRowModel(),
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
    });

    let tableClass = `${className}`;

    // placeholder for potential future functionality
    switch (variant) {
        case 'lite':
            break;
        case 'full':
            break;
        case 'dataIngest':
            tableClass += ` ${classes.expandableContainer}`;
            break;
        default:
            tableClass += ` ${classes.container}`;
            break;
    }

    const handleInput = (e) => {
        const value = e.target.value;
        setGlobalFilter(value);
    };

    const handleClear = () => {
        setGlobalFilter('');
    };

    return (
        <>
            <div className={classes.searchContainer}>
                <Row className="mb-3">
                    <form className={classes.clearIconContainer}>
                        <input
                            aria-label="user dashboard search bar"
                            type="text"
                            placeholder="Search for email, institution, first name, last name..."
                            value={globalFilter || ''}
                            onChange={handleInput}
                        />
                        <span onClick={handleClear}>
                            <SearchClearIcon />
                        </span>
                    </form>
                </Row>
            </div>
            <div tabIndex="0" className={tableClass}>
                <BTable responsive={responsive} striped bordered size="sm" className={classes.table} role="table">
                    <caption className="sr-only">{ariaCaption}</caption>
                    <thead>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
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
                                                        className:
                                                            header.column.getCanSort() && header.column.columnDef.sort
                                                                ? 'cursor-pointer select-none'
                                                                : '',
                                                        onClick: header.column.columnDef.sort
                                                            ? header.column.getToggleSortingHandler()
                                                            : () => null,
                                                    }}
                                                >
                                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                                    {header.column.columnDef.sort
                                                        ? {
                                                              asc: <SortIcon asc={true} />,
                                                              desc: <SortIcon asc={false} />,
                                                          }[header.column.getIsSorted()] ?? <SortIcon unSorted={true} />
                                                        : null}
                                                </div>
                                            )}
                                        </th>
                                    );
                                })}
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
        </>
    );
};

UserDashboardTable.defaultProps = {
    className: '',
};

UserDashboardTable.propTypes = {
    allowSort: PropTypes.bool,
    ariaCaption: PropTypes.string.isRequired,
    className: PropTypes.string,
    noHover: PropTypes.bool,
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
    variant: PropTypes.oneOf(['lite', 'full']),
};

export default UserDashboardTable;
