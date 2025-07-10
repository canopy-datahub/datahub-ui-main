import React, { useState, useEffect } from 'react';
import classes from './Pagination.module.scss';
import PropTypes from 'prop-types';
import Select from '../../Select/Select';
import Input from '../../Input/Input';
import Button from '../../Button/Button';
import { Pagination as PaginationComponent } from 'react-bootstrap';
import { generatePagination } from '../../../lib/componentHelpers/generatePagination';
import { updateStateObject } from '../../../lib/hooks/updateStateObject';
import { scrollToTop } from '../../../lib/componentHelpers/scrollHelpers';

/**
 * Interactable Pagination, untied to the table component; used to do api queries to return small subsets of data
 * @param {Object} props - Object with all of the properties used within the react component, listed below.
 * @property {Object} pagination - Object containing the total results, the page we're on, and the amount of results returned
 * @property {Function} setPagination - React setState Function to update the object and inform react that the state has changed
 * @property {Function} handleSearch - function that sets up the search query and routes the page so we can fetch the appropriate results
 * @returns {JSX} Pagination component
 */

const Pagination = (props) => {
    const { pagination, setPagination, handleSearch } = props;

    // This is a string representation temp object for the page number.
    const [inputPlaceholder, setInput] = useState(pagination.page);

    const arrowClass = classes.paginationBorder + classes.paginationArrows;
    const pages = [];

    useEffect(() => {
        setInput(pagination.page);
    }, [pagination.page]);

    generatePagination(pagination, setPagination, pages, handleSearch);

    return (
        <>
            <div className={classes.row}>
                <PaginationComponent bsPrefix="" className={classes.pagination}>
                    <PaginationComponent.Prev
                        className={arrowClass}
                        disabled={parseInt(pagination.page) === 1}
                        onClick={() => {
                            updateStateObject('page', parseInt(pagination.page) - 1, pagination, setPagination);
                            scrollToTop();
                            handleSearch();
                        }}
                    />
                    {pages}
                    <PaginationComponent.Next
                        disabled={parseInt(pagination.page) === pagination.totalPages}
                        onClick={() => {
                            updateStateObject('page', parseInt(pagination.page) + 1, pagination, setPagination);
                            scrollToTop();
                            handleSearch();
                        }}
                    />
                </PaginationComponent>
                <span className={classes.text}>Page</span>
            </div>
        </>
    );
};

Pagination.propTypes = {
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

export default Pagination;
