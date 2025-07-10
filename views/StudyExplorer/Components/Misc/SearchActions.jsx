/* eslint-disable max-len */
import React from 'react';
import { Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import classes from './SearchActions.module.scss';
import Button from '../../../../components/Button/Button';
import Pagination from '../../../../components/SearchComponents/Pagination/Pagination';
import PerPage from '../../../../components/SearchComponents/PerPage/PerPage';
import ResultNumbers from './ResultNumbers';
import SearchResultViewToggle from '../../../../components/Toggle/SpecificToggles/SearchResultViewToggle/SearchResultViewToggle';
import Sorting from './Sorting';
import SearchBar from '../../../../components/SearchComponents/SearchBar/SearchBar';
import ColumnPicker from '../../../../components/Table/Components/ColumnPicker/ColumnPicker';
import ChevronUp from '../../../../components/Images/svg/ChevronUpIcon';
import DownloadIcon from '../../../../components/Images/svg/DownloadIcon';
import QueryBuilder from '../../../../components/QueryBuilder/QueryBuilder';
import { generateQueryFields } from '../../../../lib/componentHelpers/QueryBuilderFunctions/generateQueryFields';
import { sendGAEvent } from '@next/third-parties/google';
import { downloadLink } from '../../../../lib/pageHelpers/downloadLink';

/**
 * Search Actions Component -> Search Bar, View Toggle, Pagination, Result Numbers, Per Page, Sorting, Column Picker
 * @property {String} view - state which tells you if the view is "list" or "table"
 * @property {Function} toggleView - function to swap the state for table/list view
 * @property {Object} sorting - active sorting variables for the field and direction
 * @property {Function} setSorting - Function to change the field and direction values for sort
 * @property {Object} pagination - Object containing the total results, the page we're on, and the amount of results returned
 * @property {Function} setPagination - React setState Function to update the object and inform react that the state has changed
 * @property {Function} handleSearch - function that sets up the search query and routes the page so we can fetch the appropriate results
 * @property {Boolean} resultFooter - If True, show the actions that only show on the footer, which should only be pagination and result numbers
 * @property {Array<Object>} propertyList - List of all Representative Properties entity name and their values and if they are sortable
 * @property {String} query - The current query in the search box
 * @property {Function} setQuery - The useState setter for the current search box query
 * @property {Boolean} advancedSearch - If true, shows the query builder component and disables the search bar.
 * @property {Function} toggleAdvancedSearch - The useState setter for showing the query builder and disabling the normal search box.
 * @property {Object} advancedQuery - The current Advanced Search query.  See https://react-querybuilder.js.org/docs/intro for details
 * @property {Function} setAdvancedQuery - The useState setter for the current Advanced Search Query.
 * @property {Boolean} hasResults - tells this component and it's children if results were found in the last search made.  Used for hiding certain actions.
 * @property {String} CSV_URL - URL for the CSV download of the current result
 * @property {Function} restGet - REST api for download
 * @property {Array} tableColumns - Table columns to be passed into ColumnPicker component
 * @property {Function} setColumnVisibility - Set state functional to be passed into ColumnPicker component
 * @property {Object} columnVisibility - Visibility list for columns to be passed into ColumnPicker component
 * @property {Boolean} sidebarOpen - Boolean for sidebar state. Used for styling purposes.
 * @returns {Node} object containing all actions a user may interact with on Explorer type pages
 */

const SearchActions = (props) => {
    const {
        view,
        toggleView,
        sorting,
        setSorting,
        pagination,
        setPagination,
        handleSearch,
        resultFooter,
        propertyList,
        query,
        setQuery,
        advancedSearch,
        toggleAdvancedSearch,
        advancedQuery,
        setAdvancedQuery,
        hasResults,
        CSV_URL,
        restGet,
        tableColumns,
        setColumnVisibility,
        columnVisibility,
        sidebarOpen,
    } = props;

    return (
        <>
            {!resultFooter && (
                <div className={`${classes.searchRow}`}>
                    <Row className={classes.tossGutter}>
                        <div className={`${classes.rowAlign} ${classes.topSection}`}>
                            <div className={classes.searchContainer}>
                                <SearchBar
                                    topic="Studies"
                                    query={query}
                                    setQuery={setQuery}
                                    handleClick={handleSearch}
                                    advancedSearch={advancedSearch}
                                />
                            </div>

                            <div className={`${classes.buttonAndToggle} ${classes.desktop}`}>
                                <SearchResultViewToggle setView={toggleView} view={view} />
                            </div>
                        </div>
                    </Row>
                    <Row className="mb-4">
                        {/* <div>
                            <Button
                                label={
                                    <div>
                                        Advanced Search <ChevronUp />
                                    </div>
                                }
                                className={advancedSearch ? `${classes.AdvSearchButton}` : `${classes.AdvSearchButton} ${classes.hideAdv}`}
                                handleClick={(e) => {
                                    if (!advancedSearch) {
                                        sendGAEvent('event', 'advancedSearch', { value: 'Opened Advanced Search' });
                                    } else {
                                        sendGAEvent('event', 'advancedSearch', { value: 'Closed Advanced Search' });
                                    }

                                    toggleAdvancedSearch(!advancedSearch);
                                }}
                            />
                        </div>
                        {advancedSearch && (
                            <>
                                <Row className={`mb-4 ${classes.tossGutter}`}>
                                    <div className={classes.rowAlign}>
                                        <QueryBuilder
                                            fields={generateQueryFields([...propertyList.Title, ...propertyList.Representative])}
                                            query={advancedQuery}
                                            setQuery={setAdvancedQuery}
                                            handleSearch={handleSearch}
                                        />
                                    </div>
                                </Row>
                            </>
                        )} */}
                    </Row>
                    <div className={`${classes.buttonAndToggle} ${classes.mobile}`}>
                        <SearchResultViewToggle setView={toggleView} view={view} />
                    </div>
                </div>
            )}

            <Row className={`mb-3 narrowTextBackground ${classes.tableFunctionsContainer} ${sidebarOpen ? classes.sidebarOpen : ''}`}>
                <div className={`${classes.searchActions} ${classes.left}`}>
                    {!resultFooter && hasResults && (
                        <div className={classes.resultNumber}>
                            <ResultNumbers pagination={pagination} />
                        </div>
                    )}
                    {hasResults && (
                        <div className={classes.results}>
                            <Pagination pagination={pagination} setPagination={setPagination} handleSearch={handleSearch} />
                        </div>
                    )}
                </div>
                {!resultFooter && hasResults && (
                    <div className={`${classes.searchActions} ${classes.right}`}>
                        <div className={`${classes.tableFunctionButtonContainer}`}>
                            <Button
                                className={`${classes.tableFunctionButton} ${classes.download}`}
                                label="Download Results"
                                ariaLabel="Download Results into an Excel Spreadsheet"
                                variant="tertiary"
                                iconLeft={<DownloadIcon fill="black" />}
                                size="auto"
                                rounded="lite"
                                handleClick={async () => {
                                    downloadLink(CSV_URL, restGet);
                                    sendGAEvent('event', 'studyExplorer', {
                                        value: 'Download Results',
                                    });
                                }}
                            />
                            {view === 'table' && (
                                <ColumnPicker
                                    className={classes.columnPickerButton}
                                    tableColumns={tableColumns}
                                    setColumnVisibility={setColumnVisibility}
                                    columnVisibility={columnVisibility}
                                />
                            )}
                        </div>

                        <div className={classes.rowAlign}>
                            <PerPage pagination={pagination} setPagination={setPagination} handleSearch={handleSearch} />
                            <Sorting sorting={sorting} setSorting={setSorting} propertyList={propertyList} handleSearch={handleSearch} />
                        </div>
                    </div>
                )}
            </Row>
        </>
    );
};

SearchActions.propTypes = {
    CSV_URL: PropTypes.string,
    advancedQuery: PropTypes.bool,
    advancedSearch: PropTypes.bool,
    columnVisibility: PropTypes.object,
    handleSearch: PropTypes.func.isRequired,
    hasResults: PropTypes.bool.isRequired,
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
    }).isRequired,
    propertyList: PropTypes.object,
    query: PropTypes.string,
    restGet: PropTypes.func,
    resultFooter: PropTypes.bool,
    setAdvancedQuery: PropTypes.func,
    setColumnVisibility: PropTypes.func,
    setPagination: PropTypes.func.isRequired,
    setQuery: PropTypes.func,
    setSorting: PropTypes.func,
    sidebarOpen: PropTypes.bool,
    sorting: PropTypes.shape({
        field: PropTypes.string,
        sort: PropTypes.string,
    }),
    tableColumns: PropTypes.array,
    toggleAdvancedSearch: PropTypes.func,
    toggleView: PropTypes.func,
    view: PropTypes.oneOf(['list', 'table']),
};

export default SearchActions;
