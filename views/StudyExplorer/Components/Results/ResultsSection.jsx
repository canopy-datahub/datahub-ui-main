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
 * @property {Array<Object>} propertyList - List of all Representative Properties
 * @property {String} view - Contains either 'List' or 'Table' to denote which result type component we need to show
 * @property {Array} tableColumns - Table columns to be passed into Table component for ColumnPicker functionality
 * @property {Function} setColumnVisibility - Set state functional to be passed into Table component for ColumnPicker functionality
 * @property {Object} columnVisibility - Visibility list for columns to be passed into Table component for ColumnPicker functionality
 * @returns {JSX} A ResultsSection React Component
 */

const ResultsSection = (props) => {
    const { resultList, propertyList, view, tableColumns, setColumnVisibility, columnVisibility } = props;
    const resultCards = [];
    const tableRows = [];
    // add functions //
    const addResult = (result, properties, i, highlight) => {
        resultCards.push(
            <>
                <Row className={`mb-4 ${classes.listCard}`}>
                    <SearchResult key={i} propertyList={properties} resultData={result} highlight={highlight} />
                </Row>
            </>
        );
    };
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
                addResult(resultList[i]._source, propertyList, i, resultList[i].highlight);
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
};

ResultsSection.propTypes = {
    columnVisibility: PropTypes.object,
    propertyList: PropTypes.array,
    resultList: PropTypes.array,
    setColumnVisibility: PropTypes.func,
    tableColumns: PropTypes.array,
    view: PropTypes.string,
};

export default ResultsSection;
