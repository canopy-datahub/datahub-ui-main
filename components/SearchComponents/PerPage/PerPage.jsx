import React from 'react';
import classes from './PerPage.module.scss';
import PropTypes from 'prop-types';
import Select from '../../Select/Select';
import { updateStateObject } from '../../../lib/hooks/updateStateObject';
import { scrollToTop } from '../../../lib/componentHelpers/scrollHelpers';

/**
 * Per Page: show number of results per page
 * @param {Object} props - Object with all of the properties used within the react component, listed below.
 * @property {Object} pagination - Object containing the total results, the page we're on, and the amount of results returned
 * @property {Function} setPagination - React setState Function to update the object and inform react that the state has changed
 * @property {Function} handleSearch - function that sets up the search query and routes the page so we can fetch the appropriate results
 * @returns {JSX} Per Page component
 */

const PerPage = (props) => {
    const { pagination, setPagination, handleSearch } = props;

    const sizeOptions = [
        { label: '10', value: '10' },
        { label: '25', value: '25' },
        { label: '50', value: '50' },
        { label: '100', value: '100' },
    ];

    return (
        <>
            <span className={classes.text}>Show: </span>
            <Select
                selectClass={classes.selectClass}
                containerClass={classes.selectContainer}
                options={sizeOptions}
                value={pagination.size}
                onChange={(e) => {
                    updateStateObject('size', e.target.value, pagination, setPagination);
                    scrollToTop();
                    handleSearch(undefined, true);
                }}
            />
        </>
    );
};

PerPage.propTypes = {
    handleSearch: PropTypes.func.isRequired,
    pagination: PropTypes.shape({
        firstNum: PropTypes.number,
        page: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        secondNum: PropTypes.number,
        size: PropTypes.string,
        total: PropTypes.shape({
            value: PropTypes.number,
            relation: PropTypes.string,
        }),
        totalPages: PropTypes.number,
    }),
    setPagination: PropTypes.func.isRequired,
};

export default PerPage;
