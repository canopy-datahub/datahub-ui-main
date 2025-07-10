/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import classes from './Sorting.module.scss';
import Select from '../../../../components/Select/Select';
import { updateStateObject } from '../../../../lib/hooks/updateStateObject';

/*
 */

const Sorting = (props) => {
    const { sorting, setSorting, propertyList, handleSearch } = props;

    const sortOptions = [
        { label: 'Ascending', value: 'asc' },
        { label: 'Descending', value: 'desc' },
    ];

    const fieldOptions = [
        {
            label: 'Relevance',
            value: 'relevance',
        },
    ];

    for (const propertyGroup in propertyList) {
        for (const property in propertyList[propertyGroup]) {
            if (propertyList[propertyGroup][property].sortable === true) {
                fieldOptions.push({
                    label: propertyList[propertyGroup][property].displayLabel,
                    value: propertyList[propertyGroup][property].entityPropertyName,
                });
            }
        }
    }

    return (
        <>
            <div className={classes.selectRow}>
                <div className={classes.bolded}>Sort by:</div>
                <Select
                    selectClass={classes.selectClass}
                    containerClass={classes.selectContainer}
                    options={fieldOptions}
                    value={sorting.field}
                    name="field"
                    onChange={(e) => {
                        updateStateObject('field', e.target.value, sorting, setSorting);
                        handleSearch(undefined, true);
                    }}
                />
                <Select
                    selectClass={classes.selectClass}
                    containerClass={classes.selectContainer}
                    options={sortOptions}
                    value={sorting.sort}
                    name="sort"
                    onChange={(e) => {
                        updateStateObject('sort', e.target.value, sorting, setSorting);
                        handleSearch(undefined, true);
                    }}
                />
            </div>
        </>
    );
};

Sorting.propTypes = {
    handleSearch: PropTypes.func,
    propertyList: PropTypes.object,
    setSorting: PropTypes.func,
    sorting: PropTypes.shape({
        field: PropTypes.string,
        sort: PropTypes.string,
    }),
};

export default Sorting;
