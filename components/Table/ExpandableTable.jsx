import React, { useEffect } from 'react';
import { Table as BTable } from 'react-bootstrap';
import classes from './Table.module.scss';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useTable, useExpanded } from 'react-table';

const ExpandableTable = (props) => {
    const { tableColumns, tableData, ariaCaption, className } = props;
    const { getTableProps, getTableBodyProps, toggleAllRowsExpanded, headerGroups, rows, prepareRow, state } = useTable(
        {
            columns: tableColumns,
            data: tableData,
            autoResetExpanded: false,
            getSubRows: (row) => row.childFiles,
        },
        useExpanded
    );

    useEffect(() => {
        toggleAllRowsExpanded();
    }, []);

    const tableStriping = (row) => {
        let className = '';
        switch(row) {
            case 0:
                className += classes.nestedRow0;
                break;
            case 1:
                className += classes.nestedRow1;
                break;
            default:
                className += classes.nestedRow0;
                break;
        }
        return className;
    }

    return (
        <div tabIndex="0" className={`${classes.expandableContainer} ${className}`}>
            <BTable bordered size="sm" role="table" className={classes.table} {...getTableProps()}>
                <caption>{ariaCaption}</caption>
                <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <th
                                    {...column.getHeaderProps()}
                                    style={{ width: column.size !== 150 ? column.size : 150 }}
                                    className={column.alignLeft ? `${classes.alignLeft}` : ''}
                                >
                                    {column.render('Header')}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map((row) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map((cell) => {
                                    return (
                                        <td {...cell.getCellProps()} className={`${cell.row.depth > 0 ? tableStriping(cell.row.index) : ''} ${cell.column.alignLeft ? `${classes.alignLeft}` : ''}`}>
                                            {cell.render('Cell')}
                                        </td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </BTable>
        </div>
    );
};

ExpandableTable.defaultProps = {
    className: '',
};

ExpandableTable.propTypes = {
    ariaCaption: PropTypes.string.isRequired,
    className: PropTypes.string,
    tableColumns: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string,
            Header: PropTypes.string | PropTypes.func,
            accessorKey: PropTypes.string,
            Cell: PropTypes.func,
        })
    ),
    tableRows: PropTypes.arrayOf(PropTypes.object).isRequired,
    variant: PropTypes.oneOf(['lite', 'full']),
};

export default ExpandableTable;
