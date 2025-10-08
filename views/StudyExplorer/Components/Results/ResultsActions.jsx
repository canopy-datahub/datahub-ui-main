/* eslint-disable max-len */
import React from 'react';
import { Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import classes from './ResultsActions.module.scss';
import Button from '../../../../components/Button/Button';
import Pagination from '../../../../components/SearchComponents/Pagination/Pagination';
import PerPage from '../../../../components/SearchComponents/PerPage/PerPage';
import ResultNumbers from './ResultNumbers';
import Sorting from './Sorting';
import ColumnPicker from '../../../../components/Table/Components/ColumnPicker/ColumnPicker';
import DownloadIcon from '../../../../components/Images/svg/DownloadIcon';
import { sendGAEvent } from '@next/third-parties/google';
import { downloadLink } from '../../../../lib/pageHelpers/downloadLink';
import { CSVLink } from 'react-csv';
import { Check2Square, ArrowCounterclockwise } from 'react-bootstrap-icons';
import Tooltip from '../../../../components/Tooltip/Tooltip';

/**
 * Results Actions Component -> Pagination, Result Numbers, Per Page, Sorting, Column Picker
 * @property {String} view - state which tells you if the view is "list" or "table"
 * @property {Object} sorting - active sorting variables for the field and direction
 * @property {Function} setSorting - Function to change the field and direction values for sort
 * @property {Object} pagination - Object containing the total results, the page we're on, and the amount of results returned
 * @property {Function} setPagination - React setState Function to update the object and inform react that the state has changed
 * @property {Function} handleSearch - function that sets up the search query and routes the page so we can fetch the appropriate results
 * @property {Boolean} resultFooter - If True, show the actions that only show on the footer, which should only be pagination and result numbers
 * @property {Array<Object>} propertyList - List of all Representative Properties entity name and their values and if they are sortable
 * @property {Array<Object>} variablesProperties - List of all Properties entity name and their values for Variables tab
 * @property {String} query - The current query in the search box
 * @property {Function} setQuery - The useState setter for the current search box query
 * @property {Boolean} advancedSearch - If true, shows the query builder component and disables the search bar.
 * @property {Function} toggleAdvancedSearch - The useState setter for showing the query builder and disabling the normal search box.
 * @property {Object} advancedQuery - The current Advanced Search query.  See https://react-querybuilder.js.org/docs/intro for details
 * @property {Function} setAdvancedQuery - The useState setter for the current Advanced Search Query.
 * @property {Boolean} hasResults - tells this component and it's children if results were found in the last search made.  Used for hiding certain actions.
 * @property {Boolean} hasVariablesResults - tells this component and it's children if variable results were found in the last search made.  Used for hiding certain actions.
 * @property {String} CSV_URL - URL for the CSV download of the current result
 * @property {Function} restGet - REST api for download
 * @property {Array<Object>} variablesResults - List of variables results, used for CSV download
 * @property {Array} tableColumns - Table columns to be passed into ColumnPicker component
 * @property {Array} variablesColumns - Table columns to be passed into ColumnPicker component for Variables tab
 * @property {Function} setColumnVisibility - Set state functional to be passed into ColumnPicker component
 * @property {Object} columnVisibility - Visibility list for columns to be passed into ColumnPicker component
 * @property {Boolean} sidebarOpen - Boolean for sidebar state. Used for styling purposes.
 * @property {String} tab - String to flag which tab is active
 * @property {Function} setSelectedStudiesModalVisible - Set state function for selected studies modal visibility
 * @property {Function} setSelectedStudies - Set state function for list of selected studies (to clear studies)
 * @returns {Node} object containing all actions a user may interact with on Explorer type pages
 */

const ResultsActions = (props) => {
    const {
        view,
        sorting,
        setSorting,
        pagination,
        setPagination,
        handleSearch,
        resultFooter,
        propertyList,
        variablesProperties,
        query,
        setQuery,
        advancedSearch,
        toggleAdvancedSearch,
        advancedQuery,
        setAdvancedQuery,
        hasResults,
        hasVariablesResults,
        CSV_URL,
        restGet,
        variablesResults,
        tableColumns,
        variablesColumns,
        setColumnVisibility,
        columnVisibility,
        sidebarOpen,
        tab,
        setSelectedStudiesModalVisible,
        setSelectedStudies,
    } = props;

    const getVariablesData = () => {
        // get headers, not including "List of..."
        const headers = variablesColumns
            .filter((col) => !col.manageColumnsLabel?.includes('List of') && !col.manageColumnsLabel?.includes('Select Study'))
            .map((col) => {
                return col.header;
            });

        // get accessorKeys
        const accessors = variablesColumns
            .filter((col) => !col.manageColumnsLabel?.includes('List of') && !col.manageColumnsLabel?.includes('Select Study'))
            .map((col) => {
                return col.accessorKey;
            });

        const data = [headers];

        // for each result, grab the pertinent data using the accessors
        for (const res of variablesResults) {
            const resData = accessors.map((accessor) => {
                return res[accessor];
            });
            data.push(resData);
        }
        return data;
    };

    if (tab === 'studies') {
        return (
            <>
                <Row className={`mb-3 narrowTextBackground ${classes.tableFunctionsContainer} ${sidebarOpen ? classes.sidebarOpen : ''}`}>
                    {!resultFooter && hasResults && (
                        <div className={`${classes.resultNumber}`}>
                            <ResultNumbers pagination={pagination} />
                        </div>
                    )}
                    <div className={`${classes.searchActions} ${classes.left}`}>
                        {hasResults && (
                            <div className={classes.results}>
                                <Pagination pagination={pagination} setPagination={setPagination} handleSearch={handleSearch} />
                            </div>
                        )}
                        {!resultFooter && hasResults && (
                            <div className={`${classes.tableFunctionButtonContainer} ${classes.selectStudiesContainer}`}>
                                <Button
                                    className={`${classes.tableFunctionButton} ${classes.selectStudiesButton}`}
                                    label="Selected Studies"
                                    ariaLabel="View Selected Studies"
                                    variant="secondary"
                                    iconLeft={<Check2Square size={15} className="" />}
                                    size="auto"
                                    rounded="lite"
                                    handleClick={() => {
                                        setSelectedStudiesModalVisible(true);
                                    }}
                                />
                                <Tooltip id="downloadTooltip" title={`Clear Studies`}>
                                    <a>
                                        <Button
                                            className={`${classes.tableFunctionButton} ${classes.selectStudiesReset}`}
                                            label=""
                                            ariaLabel="Clear Selected Studies"
                                            variant="secondary"
                                            iconCenter={<ArrowCounterclockwise size={15} className="" />}
                                            size="auto"
                                            rounded="lite"
                                            handleClick={() => {
                                                setSelectedStudies([]);
                                            }}
                                        />
                                    </a>
                                </Tooltip>
                            </div>
                        )}
                    </div>
                    {!resultFooter && hasResults && (
                        <div className={`${classes.searchActions} ${classes.right}`}>
                            <div className={classes.rowAlign}>
                                <PerPage pagination={pagination} setPagination={setPagination} handleSearch={handleSearch} />
                                <Sorting
                                    sorting={sorting}
                                    setSorting={setSorting}
                                    propertyList={propertyList}
                                    handleSearch={handleSearch}
                                    tab={tab}
                                />
                            </div>

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
                        </div>
                    )}
                </Row>
            </>
        );
    } else {
        return (
            <>
                <Row className={`mb-3 narrowTextBackground ${classes.tableFunctionsContainer} ${sidebarOpen ? classes.sidebarOpen : ''}`}>
                    <div className={`${classes.searchActions} ${classes.left}`}>
                        {!resultFooter && hasVariablesResults && (
                            <div className={classes.resultNumber}>
                                <ResultNumbers pagination={pagination} />
                            </div>
                        )}
                        {hasVariablesResults && (
                            <div className={classes.results}>
                                <Pagination pagination={pagination} setPagination={setPagination} handleSearch={handleSearch} />
                            </div>
                        )}
                    </div>
                    {!resultFooter && hasVariablesResults && (
                        <div className={`${classes.searchActions} ${classes.right}`}>
                            <div className={classes.rowAlign}>
                                <PerPage pagination={pagination} setPagination={setPagination} handleSearch={handleSearch} />
                                <Sorting
                                    sorting={sorting}
                                    setSorting={setSorting}
                                    propertyList={variablesProperties}
                                    handleSearch={handleSearch}
                                    tab={tab}
                                />
                            </div>

                            <div className={`${classes.tableFunctionButtonContainer}`}>
                                <CSVLink data={getVariablesData()} filename={'StudyExplorerResults'}>
                                    <Button
                                        className={`${classes.tableFunctionButton} ${classes.download}`}
                                        label="Download Results"
                                        ariaLabel="Download Results into an Excel Spreadsheet"
                                        variant="tertiary"
                                        iconLeft={<DownloadIcon fill="black" />}
                                        size="auto"
                                        rounded="lite"
                                        handleClick={() => {
                                            sendGAEvent('event', 'studyExplorer', {
                                                value: 'Download Variables Results',
                                            });
                                        }}
                                    />
                                </CSVLink>

                                {view === 'table' && (
                                    <ColumnPicker
                                        className={classes.columnPickerButton}
                                        tableColumns={variablesColumns}
                                        setColumnVisibility={setColumnVisibility}
                                        columnVisibility={columnVisibility}
                                    />
                                )}
                            </div>
                        </div>
                    )}
                </Row>
            </>
        );
    }
};

ResultsActions.propTypes = {
    CSV_URL: PropTypes.string,
    advancedQuery: PropTypes.bool,
    advancedSearch: PropTypes.bool,
    columnVisibility: PropTypes.object,
    handleSearch: PropTypes.func.isRequired,
    hasResults: PropTypes.bool,
    hasVariablesResults: PropTypes.bool,
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
    setSelectedStudies: PropTypes.func,
    setSelectedStudiesModalVisible: PropTypes.func,
    setSorting: PropTypes.func,
    sidebarOpen: PropTypes.bool,
    sorting: PropTypes.shape({
        field: PropTypes.string,
        sort: PropTypes.string,
    }),
    tab: PropTypes.string,
    tableColumns: PropTypes.array,
    toggleAdvancedSearch: PropTypes.func,
    variablesColumns: PropTypes.array,
    variablesProperties: PropTypes.array,
    variablesResults: PropTypes.array,
    view: PropTypes.oneOf(['list', 'table']),
};

export default ResultsActions;
