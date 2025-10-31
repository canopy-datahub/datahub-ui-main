/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import { Col, Container, Row, Form } from 'react-bootstrap';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import classes from './StudyExplorer.module.scss';
import FacetCard from './Components/Facets/FacetCard';
import ResultsSection from './Components/Results/ResultsSection';
import { useRouter } from 'next/router';
import useRest from '../../lib/hooks/useRest';
import SearchActions from './Components/Misc/SearchActions';
import ResultsActions from './Components/Results/ResultsActions';
import { updateStateObject } from '../../lib/hooks/updateStateObject';
import BadgeSection from './Components/Facets/BadgeSection';
import Banner from '../../components/Banner/Banner';
import Tooltip from '../../components/Tooltip/Tooltip';
import Button from '../../components/Button/Button';
import CrossEntityModalIcon from '../../components/Images/svg/CrossEntityModalIcon';
import CrossEntityListModal from './Components/Results/CrossEntityListModal';
import SelectedStudiesModal from './Components/Results/SelectedStudiesModal';
import { buildSearchQuery } from '../../lib/utils/searchQueryBuilder';
import CollapsibleSideBar from '../../components/CollapsibleSideBar/CollapsibleSideBar';
import { sendGAEvent } from '@next/third-parties/google';
import Link from 'next/link';
import { GET_STUDY_VARIABLES } from '../../constants/apiRoutes';
import { QuestionCircle, Check2Square } from 'react-bootstrap-icons';

/**
 * View for the Study Explorer Page
 * @property {Array<Object>} searchResults - List of every result's data, so we can grab its source values (the meta data)
 * @property {Array<Object>} variablesResults - List of every variable result's data, so we can grab its source values (the meta data)
 * @property {Number} variablesTotal - Total number of variables results
 * @property {Array<Object>} facetList - List of Objects containing each facets entity name and its value
 * @property {Array<Object>} variableAggregations - For Variables tab, list of possible aggregations for each facet
 * @property {Array<Object>} properties - List of all Representative Properties entity name and their values and if they are sortable
 * @property {Array<Object>} variablesProperties - List of all Properties entity name and their values for Variables tab
 * @property {Array<Object>} variables - List of all variables, to match against for variable results coming from DUG API (variable id numbers are in our system, not DUG's)
 * @property {Object} initialQuery - an Object of Objects containing everything in the URL query from the current page load
 * @property {String} CSV_URL - URL for the CSV download of the current result
 * @property {String} tab - String to flag which tab is active
 * @returns {Node} object rendering the Study Explorer
 */

const StudyExplorer = (props) => {
    const {
        searchResults,
        variablesResults,
        variablesTotal,
        facetList,
        variableAggregations,
        properties,
        variablesProperties,
        variables,
        initialQuery,
        CSV_URL,
        tab,
    } = props;

    const router = useRouter();
    const { restGet } = useRest();
    const { user } = useSelector((state) => state.userProfile);
    const isLoggedIn = user ? { loggedIn: true } : { loggedIn: false };

    // Breadcrumbs
    const crumbs = [
        {
            page: 'Home',
            pageLink: '/',
            ariaLabel: 'home',
        },
        {
            page: 'Study Explorer',
            ariaLabel: 'Study Explorer',
        },
        {
            page: tab.charAt(0).toUpperCase() + tab.slice(1),
            ariaLabel: tab.charAt(0).toUpperCase() + tab.slice(1),
        },
    ];

    // Cross Entity Tab
    const [crossEntityKey, setCrossEntityKey] = useState(tab || 'studies');

    // Cross Entity List Modal
    const [crossEntityListModalVisible, setCrossEntityListModalVisible] = useState(false);
    const [listLabel, setListLabel] = useState(tab === 'studies' ? 'Variables' : 'Studies');
    const closeCrossEntityListModal = () => {
        setCrossEntityListModalVisible(false);
    };
    const [crossEntityList, setCrossEntityList] = useState([]);
    const [selectedVariable, setSelectedVariable] = useState('');
    const [selectedStudy, setSelectedStudy] = useState('');

    // Select Studies
    //selectedStudiesModalVisible
    const [selectedStudies, setSelectedStudies] = useState([]);
    const [selectedStudiesModalVisible, setSelectedStudiesModalVisible] = useState(false);
    const closeSelectedStudiesModal = () => {
        setSelectedStudiesModalVisible(false);
    };

    // URL Query Parameters -> These should all be strings
    const [query, setQuery] = useState(initialQuery?.search || '');
    const [facets, setFacets] = useState(initialQuery?.facets);
    const [sorting, setSorting] = useState({
        sort: initialQuery?.sorting?.sort,
        field: initialQuery?.sorting?.field,
    });
    const [pagination, setPagination] = useState(initialQuery?.pagination);
    const [paginationInit, setPageInit] = useState(pagination);
    const [view, toggleView] = useState(initialQuery?.view);
    const [advancedSearch, toggleAdvancedSearch] = useState(initialQuery?.advancedQuery ? true : false);
    const [advancedQuery, setAdvancedQuery] = useState(initialQuery?.advancedQuery);

    // Only show partial of variables results based on pagination
    const [partialVariablesResults, setPartialVariablesResults] = useState(
        variablesResults?.slice(
            Number(pagination.size) * Number(pagination.page - 1),
            Number(pagination.size) * Number(pagination.page - 1) + Number(pagination.size)
        ) || []
    );

    useEffect(() => {
        // Update results when page changes - server already handles pagination
        setPartialVariablesResults(variablesResults);
        setPagination(initialQuery?.pagination);
    }, [JSON.stringify(initialQuery)]);

    // This makes it clean up and sync up, even though I don't use the corresponding variable.  I don't know, don't touch this
    useEffect(() => {
        setPageInit(initialQuery?.pagination);
    });

    // Set up all of the pagination updates that need to render per page
    useEffect(() => {
        updateStateObject('total', { value: initialQuery?.pagination?.total?.value }, pagination, setPagination);
        const totalPages = Math.ceil(initialQuery?.pagination.total.value / initialQuery?.pagination.size);
        updateStateObject('totalPages', totalPages, pagination, setPagination);
        const firstNum = 1 + (parseInt(initialQuery?.pagination.page) - 1) * parseInt(initialQuery?.pagination.size);
        updateStateObject('firstNum', firstNum, pagination, setPagination);
        const secondNum = Math.min(
            parseInt(initialQuery?.pagination.page) * parseInt(initialQuery?.pagination.size),
            initialQuery?.pagination.total.value
        );
        updateStateObject('secondNum', secondNum, pagination, setPagination);
    });

    // Sidebar variables
    const [sidebarOpen, setSideBarOpen] = useState(true);
    const handleViewSidebar = () => {
        setSideBarOpen(!sidebarOpen);
    };

    const sidebarClass = sidebarOpen ? classes.sidebarContainer : `${classes.sidebarContainer} ${classes.sidebarClosed}`;
    const resultsClass = sidebarOpen ? classes.resultSection : `${classes.resultSection} ${classes.sidebarClosed}`;

    // Manage Columns: Defining state and columns to send to Table and ColumnPicker components
    const [columnVisibility, setColumnVisibility] = useState({});

    const handleCheckboxChange = (e, row) => {
        if (e.target.checked) {
            setSelectedStudies([...selectedStudies, { title: row.title, phs: row.phs }]);
        } else {
            setSelectedStudies(selectedStudies.filter((item) => item.phs !== row.phs));
        }
    };

    // Table Columns for Tabs
    const tableColumns = [];
    const variablesColumns = [];

    if (tab === 'studies') {
        if (view === 'table') {
            tableColumns.push({
                id: 'check',
                accessorKey: 'check',
                cell: (props) => {
                    return (
                        <div>
                            <Form.Check
                                className={classes.selectCheckbox}
                                type="checkbox"
                                id={`selectStudy-table-${props.row.original.phs}`}
                                checked={
                                    selectedStudies.find(
                                        (item) => item.title === props.row.original.title && item.phs === props.row.original.phs
                                    ) || false
                                }
                                onChange={(e) => handleCheckboxChange(e, props.row.original)}
                            />
                        </div>
                    );
                },
                header: (
                    <Tooltip id="downloadTooltip" title={`Select Study`}>
                        <Check2Square size={28} className="m-0" />
                    </Tooltip>
                ),
                manageColumnsLabel: 'Select Study',
                size: 80,
            });

            tableColumns.push({
                id: 'study_variable_count',
                accessorKey: 'study_variable_count',
                cell: (props) => {
                    const count = props.getValue();
                    const studyId = props.row.original.study_id;
                    const studyName = props.row.original.title;
                    let list = [];

                    const getStudyVariables = async () => {
                        const response = await restGet(`${GET_STUDY_VARIABLES}${studyId}`, {
                            showLoading: true,
                            errorMessage: 'Error with viewing variables',
                        });
                        if (response.status === 200) {
                            list = response.data.data;
                            setCrossEntityListModalVisible(true);
                            setCrossEntityList(list);
                            setSelectedStudy(studyName);
                        }
                    };

                    if (count) {
                        return (
                            <div className={classes.center}>
                                <Tooltip id="downloadTooltip" title={`View List of ${listLabel} (${count})`}>
                                    <a>
                                        <Button
                                            className={classes.crossEntityModalIcon}
                                            ariaLabel={`View List of ${listLabel} (${count})`}
                                            variant="icon"
                                            iconCenter={<CrossEntityModalIcon />}
                                            size="icon"
                                            handleClick={() => {
                                                getStudyVariables();
                                            }}
                                        ></Button>
                                    </a>
                                </Tooltip>
                            </div>
                        );
                    }
                },
                header: (
                    <Tooltip id="downloadTooltip" title={`List of Variables`}>
                        <a className="m-0" style={{ color: 'white', cursor: 'unset' }}>
                            <CrossEntityModalIcon width="30" height="27" />
                        </a>
                    </Tooltip>
                ),
                manageColumnsLabel: 'List of Variables',
                size: 80,
            });

            tableColumns.push({
                id: 'title',
                accessorKey: 'title',
                cell: (props) => {
                    return (
                        <Link href={`/study/${props.row.original.study_id}`} legacyBehavior>
                            {<a className={classes.bold}>{props.getValue()}</a>}
                        </Link>
                    );
                },
                header: 'Study Name',
                size: 300,
                alignLeft: true,
                locked: true,
            });

            for (const property in properties.Representative) {
                const temp = {
                    id: properties.Representative[property].entityPropertyName,
                    accessorKey: properties.Representative[property].entityPropertyName,
                    cell: (props) => <span className={classes.bold}>{props.getValue()}</span>,
                    header: properties.Representative[property].displayLabel,
                    size: 130,
                    alignLeft: true,
                };

                switch (properties.Representative[property].entityPropertyName) {
                    case 'study_population_focus':
                        temp.size = 200;
                        break;
                    case 'topics':
                        temp.size = 200;
                        break;
                    case 'source':
                        temp.size = 180;
                        break;
                    default:
                        temp.size = 130;
                        break;
                }

                tableColumns.push(temp);
            }
        }
    } else {
        // Always need columns for variables tab. Used for table view. Used for CSV download on list view
        variablesColumns.push(
            {
                id: 'list',
                accessorKey: 'list',
                cell: (props) => {
                    const list = props.row.original.studies;
                    return (
                        <div className={classes.center}>
                            <Tooltip id="downloadTooltip" title={`View List of ${listLabel} (${list.length})`}>
                                <a>
                                    <Button
                                        className={classes.crossEntityModalIcon}
                                        ariaLabel={`View List of ${listLabel} (${list.length})`}
                                        variant="icon"
                                        iconCenter={<CrossEntityModalIcon />}
                                        size="icon"
                                        handleClick={() => {
                                            setCrossEntityListModalVisible(true);
                                            setCrossEntityList(list);
                                            setSelectedVariable(props.row.original.id);
                                        }}
                                    ></Button>
                                </a>
                            </Tooltip>
                        </div>
                    );
                },
                header: (
                    <Tooltip id="downloadTooltip" title={`List of Studies`}>
                        <a className="m-0" style={{ color: 'white', cursor: 'unset' }}>
                            <CrossEntityModalIcon width="30" height="27" />
                        </a>
                    </Tooltip>
                ),
                manageColumnsLabel: 'List of Studies',
                size: 80,
            },
            {
                id: 'id',
                accessorKey: 'id',
                cell: (props) => {
                    const matchingVariable = variables.find((variable) => variable.variableName === props.getValue());

                    if (matchingVariable?.hasOverview) {
                        return (
                            <Link href={`/variable/${matchingVariable.variableId}`} legacyBehavior>
                                {<a className={classes.bold}>{props.getValue()}</a>}
                            </Link>
                        );
                    } else {
                        return (
                            <>
                                <span className={classes.bold}>{props.getValue()}</span>{' '}
                            </>
                        );
                    }
                },
                header: 'Variable Name',
                size: 300,
                alignLeft: true,
                locked: true,
            },
            {
                id: 'name',
                accessorKey: 'name',
                cell: (props) => <span className={classes.bold}>{props.getValue()}</span>,
                header: 'Label',
                size: 300,
                alignLeft: true,
            },
            {
                id: 'datatype',
                accessorKey: 'datatype',
                cell: (props) => {
                    const value = props.getValue();
                    return <span className={classes.bold}>{value === 'unknown' ? '' : value}</span>;
                },
                header: 'Data Type',
                size: 130,
                alignLeft: true,
            }
        );
    }

    /**
     *
     * @param {*} facetList - List of Objects containing each facets entity name and it's value
     * @param {*} resetPagination - Bool describing if pagination needs to be reset.
     * @param {*} resetSearch - Bool describing if search and params need to be reset.
     * @param {*} newQuery - Bool describing if new query was entered.
     * @param {*} newView - Bool describing if view was toggled.
     * @param {*} tab - String denoting the tab needed for the search.
     */
    const handleSearch = async (
        facetList = facets,
        resetPagination = false,
        resetSearch = false,
        newQuery = false,
        newView = null,
        tab = crossEntityKey
    ) => {
        // fastest condition
        if (resetSearch) {
            if (tab === 'studies') {
                setSorting({ sort: 'asc', field: 'title' });
                updateStateObject('page', '1', pagination, setPagination);
                updateStateObject('size', '50', pagination, setPagination);
                await router.push(`/studyExplorer/${tab}?&sort=asc&prop=title&page=1&size=50&view=${view}`, undefined, {
                    scroll: false,
                });
                return;
            } else {
                setSorting({ sort: 'asc', field: 'id' });
                updateStateObject('page', '1', pagination, setPagination);
                updateStateObject('size', '50', pagination, setPagination);
                await router.push(`/studyExplorer/${tab}?&sort=asc&prop=id&page=1&size=50&view=${view}`, undefined, {
                    scroll: false,
                });
                return;
            }
        }

        const searchQueryBuilderProps = {
            query,
            advancedSearch,
            advancedQuery,
            facetList,
            sorting,
            newQuery,
            pagination,
            setPagination,
            resetPagination,
            setSorting,
            view,
            newView,
        };

        const gaSearchObj = { ...searchQueryBuilderProps, ...isLoggedIn };
        sendGAEvent('event', 'studyExplorer', { value: 'Study Explorer Search Made', query: JSON.stringify(gaSearchObj) });
        const searchQuery = buildSearchQuery(searchQueryBuilderProps);

        await router.push(`/studyExplorer/${tab}?${searchQuery}`, undefined, { scroll: false });
    };

    return (
        <>
            <Banner title="Study Explorer" manualCrumbs={crumbs} variant="virus5" ariaLabel="Study Explorer Breadcrumb" />
            <div className={classes.Container}>
                <Container fluid>
                    <Row className={classes.Row}>
                        <SearchActions
                            propertyList={properties}
                            view={view}
                            toggleView={toggleView}
                            handleSearch={handleSearch}
                            query={query}
                            setQuery={setQuery}
                            advancedQuery={advancedQuery}
                            setAdvancedQuery={setAdvancedQuery}
                            advancedSearch={advancedSearch}
                            toggleAdvancedSearch={toggleAdvancedSearch}
                        />
                    </Row>
                    <Row className={classes.Row}>
                        <a href="#study-explorer-results" className="skipLink">
                            Skip to main content
                        </a>
                        <CollapsibleSideBar isOpen={sidebarOpen} toggleSidebar={handleViewSidebar} className={sidebarClass} title="Filters">
                            <>
                                <BadgeSection
                                    facetList={facetList}
                                    setFacets={setFacets}
                                    activeFacets={facets}
                                    handleSearch={handleSearch}
                                    query={initialQuery?.search || ''}
                                    setQuery={setQuery}
                                />
                                <FacetCard
                                    aggregations={searchResults.aggregations}
                                    facetList={facetList}
                                    variableAggregations={variableAggregations}
                                    setFacets={setFacets}
                                    activeFacets={facets}
                                    handleSearch={handleSearch}
                                    tab={crossEntityKey}
                                />
                            </>
                        </CollapsibleSideBar>

                        <Col lg="9" className={resultsClass}>
                            <Tabs
                                className={classes.crossEntityTabs}
                                id="controlled-tab-example"
                                activeKey={crossEntityKey}
                                onSelect={(k) => {
                                    if (k !== crossEntityKey) {
                                        if (router.query?.q) {
                                            router.push(
                                                `/studyExplorer/${k}?&q=${router.query.q}&sort=desc&prop=relevance&page=1&size=50&view=${view}`
                                            );
                                        } else {
                                            router.push(`/studyExplorer/${k}?&view=${view}`);
                                        }
                                    } else {
                                        router.reload();
                                    }
                                }}
                                fill
                            >
                                <Tab
                                    eventKey="studies"
                                    title={
                                        searchResults?.hits?.total?.value ? `Studies (${searchResults.hits.total.value})` : 'Studies (0)'
                                    }
                                ></Tab>
                                <Tab
                                    eventKey="variables"
                                    title={
                                        <>
                                            Variables ({variablesTotal}){' '}
                                            <Tooltip
                                                id="downloadTooltip"
                                                placement="top"
                                                title="Core Variables are now available to search. Additional variables are being processed and will be available to search soon."
                                            >
                                                <a tabIndex="0">
                                                    <QuestionCircle />
                                                </a>
                                            </Tooltip>
                                        </>
                                    }
                                ></Tab>
                            </Tabs>
                            <div className={classes.resultContainer} id="study-explorer-results">
                                <ResultsActions
                                    propertyList={properties}
                                    variablesProperties={variablesProperties}
                                    view={view}
                                    sorting={sorting}
                                    setSorting={setSorting}
                                    pagination={pagination}
                                    setPagination={setPagination}
                                    handleSearch={handleSearch}
                                    hasResults={searchResults?.hits?.total?.value > 0}
                                    hasVariablesResults={partialVariablesResults?.length > 0}
                                    CSV_URL={CSV_URL}
                                    restGet={restGet}
                                    variablesResults={variablesResults}
                                    tableColumns={tableColumns}
                                    variablesColumns={variablesColumns}
                                    setColumnVisibility={setColumnVisibility}
                                    columnVisibility={columnVisibility}
                                    sidebarOpen={sidebarOpen}
                                    tab={crossEntityKey}
                                    setSelectedStudiesModalVisible={setSelectedStudiesModalVisible}
                                    setSelectedStudies={setSelectedStudies}
                                />
                                <ResultsSection
                                    resultList={searchResults?.hits?.hits}
                                    variablesList={partialVariablesResults}
                                    propertyList={properties?.Representative}
                                    variablesProperties={variablesProperties}
                                    variables={variables}
                                    view={view}
                                    listLabel={listLabel}
                                    setCrossEntityListModalVisible={setCrossEntityListModalVisible}
                                    setCrossEntityList={setCrossEntityList}
                                    setSelectedVariable={setSelectedVariable}
                                    setSelectedStudy={setSelectedStudy}
                                    tableColumns={tableColumns}
                                    variablesColumns={variablesColumns}
                                    setColumnVisibility={setColumnVisibility}
                                    columnVisibility={columnVisibility}
                                    tab={crossEntityKey}
                                    restGet={restGet}
                                    selectedStudies={selectedStudies}
                                    handleCheckboxChange={handleCheckboxChange}
                                />
                                <ResultsActions
                                    hasResults={searchResults?.hits?.total?.value > 0}
                                    hasVariablesResults={partialVariablesResults?.length > 0}
                                    resultFooter={true}
                                    pagination={pagination}
                                    setPagination={setPagination}
                                    handleSearch={handleSearch}
                                    tab={crossEntityKey}
                                />
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
            <CrossEntityListModal
                visible={crossEntityListModalVisible}
                closeModal={closeCrossEntityListModal}
                crossEntityKey={crossEntityKey}
                list={crossEntityList}
                listLabel={listLabel}
                selectedVariable={selectedVariable}
                selectedStudy={selectedStudy}
                handleSearch={handleSearch}
                setCrossEntityKey={setCrossEntityKey}
                setSorting={setSorting}
                setPagination={setPagination}
                view={view}
            />
            <SelectedStudiesModal
                visible={selectedStudiesModalVisible}
                closeModal={closeSelectedStudiesModal}
                selectedStudies={selectedStudies}
            />
        </>
    );
};

StudyExplorer.propTypes = {
    CSV_URL: PropTypes.string,
    facetList: PropTypes.array,
    initialQuery: PropTypes.shape({
        advancedQuery: PropTypes.object,
        facets: PropTypes.array,
        pagination: PropTypes.shape({
            page: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            size: PropTypes.string,
            total: PropTypes.shape({
                value: PropTypes.number,
            }),
        }),
        search: PropTypes.string,
        sorting: PropTypes.shape({
            sort: PropTypes.string,
            field: PropTypes.string,
        }),
        view: PropTypes.oneOf(['list', 'table']),
    }),
    properties: PropTypes.object,
    searchResults: PropTypes.object,
    tab: PropTypes.string,
    variableAggregations: PropTypes.object,
    variables: PropTypes.array,
    variablesProperties: PropTypes.array,
    variablesResults: PropTypes.array,
    variablesTotal: PropTypes.number,
};

export default StudyExplorer;
