/* eslint-disable indent */
/* eslint-disable multiline-ternary */
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import classes from './Table.module.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import SortIcon from '../Images/svg/SortIcon';
import { QuestionCircle } from 'react-bootstrap-icons';
import Tooltip from '../Tooltip/Tooltip';
import { Table as BTable } from 'react-bootstrap';
import { flexRender, getCoreRowModel, useReactTable, getSortedRowModel, getExpandedRowModel } from '@tanstack/react-table';
import { uniqueId } from 'lodash';

/**
 * Interactable Table component
 * Tanstack handles the Table State in this component.  Bootstrap handles the style of the Table.
 * https://react-bootstrap.github.io/docs/components/table for Bootstrap tables
 * https://tanstack.com/table/v8/docs/guide/introduction for Tanstack Table handler tutorial
 * https://tanstack.com/table/v8/docs/api/features/sorting for Sorting
 * https://tanstack.com/table/v8/docs/api/features/filters for Filters (Not implemented by the frontend at the moment)
 * https://tanstack.com/table/v8/docs/guide/column-visibility for Column Visiblity/Column Picker
 *
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
 * @property {String} [modification] - modification style variants for the table
 * @property {Boolean} [responsive] - When false, header row remains at the top of the table. Usually used with setting height in parent component for scroll
 * @property {Function} [getRowCanExpand] - Can this row expand?
 * @property {Function} [renderSubComponent] - Sub component rendered within the row
 * @property {Array} [totalRow] - Total Row optionally rendered at the bottom on the table  **Always left aligned right now
 * @property {Function} [setColumnVisibility] - Used for column picker. Set state function to update columnVisibility list from parent. See Study Explorer
 * @property {Object} [columnVisibility] - Used for column picker. List from parent to track visibility of columns. See Study Explorer
 * @returns {JSX} Table Component
 */

const Table = (props) => {
    const {
        tableRows,
        tableHeaders,
        ariaCaption,
        variant,
        modification,
        className,
        allowSort,
        noHover,
        responsive,
        getRowCanExpand,
        renderSubComponent,
        totalRow,
        setColumnVisibility,
        columnVisibility,
    } = props;

    // Tanstack sorting state tracker
    const [sorting, setSorting] = useState([]);
    const [expanded, setExpanded] = useState({});

    // Tanstack table state manager
    const table = useReactTable({
        data: tableRows,
        columns: tableHeaders,
        state: {
            sorting,
            expanded,
            columnVisibility,
        },
        enableSorting: allowSort,
        enableSortingRemoval: allowSort,
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getRowCanExpand,
        getExpandedRowModel: getExpandedRowModel(),
        onExpandedChange: setExpanded,
        onColumnVisibilityChange: setColumnVisibility,
    });

    let tableClass = `${className}`;

    // placeholder for potential future functionality
    switch (variant) {
        case 'narrow':
            tableClass += ` ${classes.narrowPadding} ${classes.container}`;
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

    switch (modification) {
        case 'offWhite':
            tableClass += ` ${classes.offWhite}`;
            break;
        case 'allWhite':
            tableClass += ` ${classes.allWhite}`;
            break;
        default:
            break;
    }

    return (
        <div tabIndex="0" className={tableClass}>
            <BTable responsive={responsive} striped bordered size="sm" className={classes.table} role="table">
                <caption className="sr-only">{ariaCaption}</caption>
                <thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <th
                                    key={header.id}
                                    tabIndex="0"
                                    colSpan={header.colSpan}
                                    style={{ width: header.getSize() ? `${header.getSize()}px` : '150px' }}
                                    className={header.column.columnDef.alignLeft ? `${classes.alignLeft}` : ''}
                                >
                                    {header.isPlaceholder ? null : (
                                        <div
                                            {...{
                                                className:
                                                    header.column.getCanSort() && allowSort && !header.column.columnDef.removeSort
                                                        ? 'cursor-pointer select-none'
                                                        : '',
                                                onClick:
                                                    allowSort && !header.column.columnDef.removeSort
                                                        ? header.column.getToggleSortingHandler()
                                                        : () => null,
                                            }}
                                        >
                                            {allowSort ? (
                                                <div
                                                    className={`${classes.row} ${
                                                        header.column.columnDef.removeSort && !header.column.columnDef.alignLeft
                                                            ? 'justify-content-center'
                                                            : ''
                                                    }`}
                                                >
                                                    <div
                                                        className={`${classes.textHeader} ${
                                                            header.column.columnDef.removeSort ? '' : `${classes.sortTextHeader}`
                                                        }`}
                                                    >
                                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                                        {header.column.columnDef.tooltip && (
                                                            <Tooltip
                                                                id="downloadTooltip"
                                                                placement="bottom"
                                                                title={header.column.columnDef.tooltip}
                                                            >
                                                                <a>
                                                                    <QuestionCircle />
                                                                </a>
                                                            </Tooltip>
                                                        )}
                                                    </div>
                                                    {!header.column.columnDef.removeSort
                                                        ? {
                                                              asc: (
                                                                  <div className={`${classes.sortHeader}`}>
                                                                      <SortIcon asc={true} />
                                                                  </div>
                                                              ),
                                                              desc: (
                                                                  <div className={`${classes.sortHeader}`}>
                                                                      <SortIcon asc={false} />
                                                                  </div>
                                                              ),
                                                          }[header.column.getIsSorted()] ?? (
                                                              <div className={`${classes.sortHeader}`}>
                                                                  <SortIcon unSorted={true} />
                                                              </div>
                                                          )
                                                        : null}
                                                </div>
                                            ) : (
                                                <div className={classes.textHeader}>
                                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                                    {header.column.columnDef.tooltip && (
                                                        <Tooltip
                                                            id="downloadTooltip"
                                                            placement="bottom"
                                                            title={header.column.columnDef.tooltip}
                                                        >
                                                            <a>
                                                                <QuestionCircle />
                                                            </a>
                                                        </Tooltip>
                                                    )}
                                                </div>
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
                        <React.Fragment key={row.id}>
                            <tr className={noHover ? `${classes.noHover}` : ''} role="row">
                                {row.getVisibleCells().map((cell, id) => (
                                    <>
                                        {id === 0 ? (
                                            <th
                                                tabIndex="0"
                                                key={cell.id}
                                                className={cell.column.columnDef.alignLeft ? `${classes.alignLeft}` : ''}
                                            >
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </th>
                                        ) : (
                                            <td
                                                tabIndex="0"
                                                key={cell.id}
                                                className={cell.column.columnDef.alignLeft ? `${classes.alignLeft}` : ''}
                                            >
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </td>
                                        )}
                                    </>
                                ))}
                            </tr>
                            {row.getIsExpanded() && (
                                <tr key={`${row.id}-sub`} className={noHover ? `${classes.noHover}` : ''}>
                                    {/* expanded row is a custom 1 cell row */}
                                    <td
                                        key={`${row.id}-subCell`}
                                        colSpan={row.getVisibleCells().length}
                                        className={classes.expandedSection}
                                    >
                                        {renderSubComponent({ row })}
                                    </td>
                                </tr>
                            )}
                        </React.Fragment>
                    ))}
                    {totalRow && (
                        <tr key="total" className={noHover ? `${classes.noHover}` : ''} role="row">
                            {/* eslint-disable-next-line react/prop-types */}
                            {totalRow.map((totalCell, id) => (
                                <>
                                    {id === 0 ? (
                                        <th tabIndex="0" key={`total-subCell-${totalCell}-${uniqueId()}`} className={classes.alignLeft}>
                                            {totalCell}
                                        </th>
                                    ) : (
                                        <td tabIndex="0" key={`total-subCell-${totalCell}-${uniqueId()}`} className={classes.alignLeft}>
                                            {totalCell}
                                        </td>
                                    )}
                                </>
                            ))}
                        </tr>
                    )}
                </tbody>
            </BTable>
        </div>
    );
};

Table.defaultProps = {
    className: '',
};

Table.propTypes = {
    allowSort: PropTypes.bool,
    ariaCaption: PropTypes.string.isRequired,
    className: PropTypes.string,
    columnVisibility: PropTypes.object,
    getRowCanExpand: PropTypes.func,
    modification: PropTypes.string,
    noHover: PropTypes.bool,
    renderSubComponent: PropTypes.func,
    responsive: PropTypes.bool,
    setColumnVisibility: PropTypes.func,
    tableHeaders: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            accessorKey: PropTypes.string.isRequired,
            cell: PropTypes.func.isRequired,
            header: PropTypes.string.isRequired,
            size: PropTypes.number,
        })
    ).isRequired,
    tableRows: PropTypes.arrayOf(PropTypes.object).isRequired,
    totalRow: PropTypes.array,
    variant: PropTypes.oneOf(['narrow', 'full', 'dataIngest']),
};

export default Table;
