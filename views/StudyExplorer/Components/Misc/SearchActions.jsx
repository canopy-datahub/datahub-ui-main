/* eslint-disable max-len */
import React from 'react';
import { Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import classes from './SearchActions.module.scss';
import Button from '../../../../components/Button/Button';
import Pagination from '../../../../components/SearchComponents/Pagination/Pagination';
import PerPage from '../../../../components/SearchComponents/PerPage/PerPage';
import ResultNumbers from '../Results/ResultNumbers';
import SearchResultViewToggle from '../../../../components/Toggle/SpecificToggles/SearchResultViewToggle/SearchResultViewToggle';
import Sorting from '../Results/Sorting';
import SearchBar from '../../../../components/SearchComponents/SearchBar/SearchBar';
import ColumnPicker from '../../../../components/Table/Components/ColumnPicker/ColumnPicker';
import ChevronUp from '../../../../components/Images/svg/ChevronUpIcon';
import DownloadIcon from '../../../../components/Images/svg/DownloadIcon';
import QueryBuilder from '../../../../components/QueryBuilder/QueryBuilder';
import { generateQueryFields } from '../../../../lib/componentHelpers/QueryBuilderFunctions/generateQueryFields';
import { sendGAEvent } from '@next/third-parties/google';

/**
 * Search Actions Component -> Search Bar, View Toggle
 * @property {String} view - state which tells you if the view is "list" or "table"
 * @property {Function} toggleView - function to swap the state for table/list view
 * @property {Function} handleSearch - function that sets up the search query and routes the page so we can fetch the appropriate results
 * @property {Array<Object>} propertyList - List of all Representative Properties entity name and their values and if they are sortable
 * @property {String} query - The current query in the search box
 * @property {Function} setQuery - The useState setter for the current search box query
 * @property {Boolean} advancedSearch - If true, shows the query builder component and disables the search bar.
 * @property {Function} toggleAdvancedSearch - The useState setter for showing the query builder and disabling the normal search box.
 * @property {Object} advancedQuery - The current Advanced Search query.  See https://react-querybuilder.js.org/docs/intro for details
 * @property {Function} setAdvancedQuery - The useState setter for the current Advanced Search Query.
 * @returns {Node} object containing all actions a user may interact with on Explorer type pages
 */

const SearchActions = (props) => {
    const {
        view,
        toggleView,
        handleSearch,
        propertyList,
        query,
        setQuery,
        advancedSearch,
        toggleAdvancedSearch,
        advancedQuery,
        setAdvancedQuery,
    } = props;

    return (
        <>
            <div className={`${classes.searchRow}`}>
                <Row className={classes.tossGutter}>
                    <div className={`${classes.rowAlign} ${classes.topSection}`}>
                        <div className={classes.searchContainer}>
                            <SearchBar
                                topic="studies and variables"
                                query={query}
                                setQuery={setQuery}
                                handleClick={handleSearch}
                                advancedSearch={advancedSearch}
                            />
                        </div>

                        <div className={`${classes.buttonAndToggle} ${classes.desktop}`}>
                            <SearchResultViewToggle setView={toggleView} view={view} handleSearch={handleSearch} />
                        </div>
                    </div>
                </Row>
                <div className={`${classes.buttonAndToggle} ${classes.mobile}`}>
                    <SearchResultViewToggle setView={toggleView} view={view} handleSearch={handleSearch} />
                </div>
            </div>
        </>
    );
};

SearchActions.propTypes = {
    advancedQuery: PropTypes.bool,
    advancedSearch: PropTypes.bool,
    handleSearch: PropTypes.func.isRequired,
    propertyList: PropTypes.object,
    query: PropTypes.string,
    setAdvancedQuery: PropTypes.func,
    setQuery: PropTypes.func,
    toggleAdvancedSearch: PropTypes.func,
    toggleView: PropTypes.func,
    view: PropTypes.oneOf(['list', 'table']),
};

export default SearchActions;
