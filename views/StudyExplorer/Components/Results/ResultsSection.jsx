import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'react-bootstrap';
import classes from './ResultsSection.module.scss';
import SearchResult from '../../../../components/SearchComponents/SearchResult/SearchResult';
import Table from '../../../../components/Table/Table';
import Link from 'next/link';
import Card from '../../../../components/Card/Card';

/**
 * A visual container for other visual React components.
 * @param {Object} props - Object with all of the properties used within the react component, listed below.
 * @property {Array<Object>} resultList - List of every result's data, so we can grab it's source values (the meta data)
 * @property {Array<Object>} variablesList - List of every variable result's data, so we can grab it's source values (the meta data)
 * @property {Array<Object>} propertyList - List of all Representative Properties
 * @property {Array<Object>} variablesProperties - List of all Properties for Variables tab
 * @property {Array<Object>} variables - List of all variables, to match against for variable results coming from DUG API (variable id numbers are in our system, not DUG's)
 * @property {String} view - Contains either 'List' or 'Table' to denote which result type component we need to show
 * @property {String} listLabel - Label for list modal
 * @property {Func} setCrossEntityListModalVisible - Function to control visibility of list modal
 * @property {Func} setCrossEntityList - Function to set list content for list modal
 * @property {Func} setSelectedVariable - Function to set the selected variable for search button in list modal
 * @property {Func} setSelectedStudy - Function to set the selected study for search button in list modal
 * @property {Array} tableColumns - Table columns to be passed into Table component for ColumnPicker functionality
 * @property {Array} variablesColumns - Table columns to be passed into ColumnPicker component for Variables tab
 * @property {Function} setColumnVisibility - Set state functional to be passed into Table component for ColumnPicker functionality
 * @property {Object} columnVisibility - Visibility list for columns to be passed into Table component for ColumnPicker functionality
 * @property {Function} restGet - REST api to grab study's data for list modal
 * @property {String} tab - String to flag which tab is active
 * @property {Array} selectedStudies - list of selected studies for modal
 * @property {Function} handleCheckboxChange - function for selected studies checkbox
 * @returns {JSX} A ResultsSection React Component
 */

const ResultsSection = (props) => {
    const {
        resultList,
        variablesList,
        propertyList,
        variablesProperties,
        variables,
        view,
        listLabel,
        setCrossEntityListModalVisible,
        setCrossEntityList,
        setSelectedVariable,
        setSelectedStudy,
        tableColumns,
        variablesColumns,
        setColumnVisibility,
        columnVisibility,
        restGet,
        tab,
        selectedStudies,
        handleCheckboxChange,
    } = props;
    const resultCards = [];
    const tableRows = [];

    const variablesCards = [];

    // add functions //
    const addResult = (cards, result, properties, i, highlight = [], list = [], matchingVariable = null) => {
        cards.push(
            <>
                <Row className={`mb-4 ${classes.listCard}`}>
                    <SearchResult
                        key={i}
                        propertyList={properties}
                        resultData={result}
                        matchingVariable={matchingVariable}
                        highlight={highlight}
                        list={list}
                        listLabel={listLabel}
                        setCrossEntityListModalVisible={setCrossEntityListModalVisible}
                        setCrossEntityList={setCrossEntityList}
                        setSelectedVariable={setSelectedVariable}
                        setSelectedStudy={setSelectedStudy}
                        tab={tab}
                        restGet={restGet}
                        selectedStudies={selectedStudies}
                        handleCheckboxChange={handleCheckboxChange}
                    />
                </Row>
            </>
        );
    };

    if (tab === 'studies') {
        if (resultList.length === 0) {
            return (
                <Card title="No results found for this search." variant="noResults">
                    <h4>Suggestions:</h4>
                    <Row>
                        <Col>
                            <ul>
                                <li>Make sure all words are spelled correctly.</li>
                                <li>Try different keywords.</li>
                            </ul>
                        </Col>
                        <Col>
                            <ul>
                                <li>Try more general keywords.</li>
                                <li>Try fewer filters.</li>
                            </ul>
                        </Col>
                    </Row>
                </Card>
            );
        }

        if (view === 'list') {
            if (resultList) {
                for (let i = 0; i <= resultList.length - 1; i++) {
                    addResult(resultCards, resultList[i]._source, propertyList, i, resultList[i].highlight);
                }
            }
            return <>{resultCards}</>;
        } else {
            // add representative properties
            if (resultList) {
                for (let i = 0; i <= resultList.length - 1; i++) {
                    tableRows.push(resultList[i]._source);
                }
            }

            return (
                <div className={`mb-4 ${classes.tableResults}`}>
                    <Table
                        tableRows={tableRows}
                        tableHeaders={tableColumns}
                        ariaCaption="Study Search Results Table"
                        setColumnVisibility={setColumnVisibility}
                        columnVisibility={columnVisibility}
                    />
                </div>
            );
        }
    } else {
        if (variablesList.length === 0) {
            return (
                <Card title="No results found for this search." variant="noResults">
                    <h4>Suggestions:</h4>
                    <Row>
                        <Col>
                            <ul>
                                <li>Make sure all words are spelled correctly.</li>
                                <li>Try different keywords.</li>
                            </ul>
                        </Col>
                        <Col>
                            <ul>
                                <li>Try more general keywords.</li>
                                <li>Try fewer filters.</li>
                            </ul>
                        </Col>
                    </Row>
                </Card>
            );
        }

        if (view === 'list') {
            if (variablesList) {
                for (let i = 0; i <= variablesList.length - 1; i++) {
                    const matchingVariable = variables.find((variable) => variable.variableName === variablesList[i].id);
                    addResult(variablesCards, variablesList[i], variablesProperties, i, null, variablesList[i].studies, matchingVariable);
                }
            }
            return <>{variablesCards}</>;
        } else {
            return (
                <div className={`mb-4 ${classes.tableResults}`}>
                    <Table
                        tableRows={variablesList}
                        tableHeaders={variablesColumns}
                        ariaCaption="Variable Search Results Table"
                        setColumnVisibility={setColumnVisibility}
                        columnVisibility={columnVisibility}
                    />
                </div>
            );
        }
    }
};

ResultsSection.propTypes = {
    columnVisibility: PropTypes.object,
    handleCheckboxChange: PropTypes.func,
    listLabel: PropTypes.string,
    propertyList: PropTypes.array,
    restGet: PropTypes.func,
    resultList: PropTypes.array,
    selectedStudies: PropTypes.array,
    setColumnVisibility: PropTypes.func,
    setCrossEntityList: PropTypes.func,
    setCrossEntityListModalVisible: PropTypes.func,
    setSelectedStudy: PropTypes.func,
    setSelectedVariable: PropTypes.func,
    tab: PropTypes.string,
    tableColumns: PropTypes.array,
    variables: PropTypes.array,
    variablesColumns: PropTypes.array,
    variablesList: PropTypes.array,
    variablesProperties: PropTypes.array,
    view: PropTypes.string,
};

export default ResultsSection;
