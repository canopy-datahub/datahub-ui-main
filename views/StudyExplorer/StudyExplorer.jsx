/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import classes from './StudyExplorer.module.scss';
import FacetCard from './Components/Facets/FacetCard';
import ResultsSection from './Components/Results/ResultsSection';
import { useRouter } from 'next/router';
import useRest from '../../lib/hooks/useRest';
import { downloadLink } from '../../lib/pageHelpers/downloadLink';
import SearchActions from './Components/Misc/SearchActions';
import { updateStateObject } from '../../lib/hooks/updateStateObject';
import BadgeSection from './Components/Facets/BadgeSection';
import Banner from '../../components/Banner/Banner';
import { buildSearchQuery } from '../../lib/utils/searchQueryBuilder';
import CollapsibleSideBar from '../../components/CollapsibleSideBar/CollapsibleSideBar';
import { sendGAEvent } from '@next/third-parties/google';
import Link from 'next/link';

/**
 * View for the Study Explorer Page
 * @property {Array<Object>} searchResults - List of every result's data, so we can grab it's source values (the meta data)
 * @property {Array<Object>} facetList - List of Objects containing each facets entity name and it's value
 * @property {Array<Object>} properties - List of all Representative Properties entity name and their values and if they are sortable
 * @property {Object} initialQuery - an Object of Objects containing everything in the URL query from the current page load
 * @property {String} CSV_URL - URL for the CSV download of the current result
 * @returns {Node} object rendering the Study Explorer
 */

const StudyExplorer = (props) => {
    const { searchResults, facetList, properties, initialQuery, CSV_URL } = props;
    const router = useRouter();
    const { restGet } = useRest();
    const { user } = useSelector((state) => state.userProfile);
    const isLoggedIn = user ? { loggedIn: true } : { loggedIn: false };

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

    // Sidebar variables
    const [sidebarOpen, setSideBarOpen] = useState(true);
    const handleViewSidebar = () => {
        setSideBarOpen(!sidebarOpen);
    };

    const sidebarClass = sidebarOpen ? classes.sidebarContainer : `${classes.sidebarContainer} ${classes.sidebarClosed}`;
    const resultsClass = sidebarOpen ? classes.resultSection : `${classes.resultSection} ${classes.sidebarClosed}`;

    // Manage Columns: Defining state and columns to send to Table and ColumnPicker components
    const [columnVisibility, setColumnVisibility] = useState({});

    const tableColumns = [];

    if (view === 'table') {
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

    // This makes it clean up and sync up, even though I don't use the corresponding variable.  I don't know, don't touch this
    useEffect(() => {
        setPageInit(initialQuery?.pagination);
    });

    // Set up all of the pagination updates that need to render per page
    useEffect(() => {
        updateStateObject('total', { value: initialQuery?.pagination.total.value }, pagination, setPagination);
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

    async function handleSort(sorting, setSorting, handleSearch, field) {
        // If the field isn't already present in the field section of sorting, we set that to asc in the object
        if (field !== sorting.field) {
            setSorting({ sort: 'asc', field: field });
            await handleSearch(undefined, true);
            // Otherwise, We have to check which sort it is, because we know it is the field.
        } else if (sorting.sort === 'asc') {
            setSorting({ sort: 'desc', field: field });
            await handleSearch(undefined, true);
        } else {
            setSorting({ sort: '', field: '' });
            await handleSearch(undefined, true);
        }
    }

    /**
     *
     * @param {*} facetList - List of Objects containing each facets entity name and it's value
     * @param {*} resetPagination - Bool describing if pagination needs to be reset.
     */
    const handleSearch = async (facetList = facets, resetPagination = false, resetSearch = false, newQuery = false) => {
        // fastest condition
        if (resetSearch) {
            setSorting({ sort: 'asc', field: 'title' });
            updateStateObject('page', '1', pagination, setPagination);
            updateStateObject('size', '50', pagination, setPagination);
            await router.push(`/studyExplorer?&sort=asc&prop=title&page=1&size=50`, undefined, { scroll: false });
            return;
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
        };

        const gaSearchObj = { ...searchQueryBuilderProps, ...isLoggedIn };
        sendGAEvent('event', 'studyExplorer', { value: 'Study Explorer Search Made', query: JSON.stringify(gaSearchObj) });
        const searchQuery = buildSearchQuery(searchQueryBuilderProps);

        await router.push(`/studyExplorer?${searchQuery}`, undefined, { scroll: false });
    };

    return (
        <>
            <Banner title="Study Explorer" path={router.asPath} variant="virus5" ariaLabel="Study Explorer Breadcrumb" />
            <div className={classes.Container}>
                <Container fluid>
                    <Row className={classes.Row}>
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
                                    setFacets={setFacets}
                                    activeFacets={facets}
                                    handleSearch={handleSearch}
                                />
                            </>
                        </CollapsibleSideBar>

                        <Col lg="9" className={resultsClass}>
                            <SearchActions
                                propertyList={properties}
                                view={view}
                                toggleView={toggleView}
                                sorting={sorting}
                                setSorting={setSorting}
                                pagination={pagination}
                                setPagination={setPagination}
                                handleSearch={handleSearch}
                                handleSort={handleSort}
                                query={query}
                                setQuery={setQuery}
                                advancedQuery={advancedQuery}
                                setAdvancedQuery={setAdvancedQuery}
                                advancedSearch={advancedSearch}
                                toggleAdvancedSearch={toggleAdvancedSearch}
                                hasResults={searchResults.hits.total.value > 0}
                                CSV_URL={CSV_URL}
                                restGet={restGet}
                                tableColumns={tableColumns}
                                setColumnVisibility={setColumnVisibility}
                                columnVisibility={columnVisibility}
                                sidebarOpen={sidebarOpen}
                            />
                            <ResultsSection
                                resultList={searchResults.hits.hits}
                                propertyList={properties.Representative}
                                view={view}
                                tableColumns={tableColumns}
                                setColumnVisibility={setColumnVisibility}
                                columnVisibility={columnVisibility}
                            />
                            <SearchActions
                                hasResults={searchResults.hits.total.value > 0}
                                resultFooter
                                pagination={pagination}
                                setPagination={setPagination}
                                handleSearch={handleSearch}
                            />
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
};

StudyExplorer.propTypes = {
    CSV_URL: PropTypes.string.isRequired,
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
};

export default StudyExplorer;
