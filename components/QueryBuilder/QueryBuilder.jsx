import React from 'react';
import PropTypes from 'prop-types';
import classes from './QueryBuilder.module.scss';
import { QueryBuilderBootstrap as BootstrapWrapper } from '@react-querybuilder/bootstrap';
import { QueryBuilder as BaseBuilder } from 'react-querybuilder';
import { Row } from 'react-bootstrap';
import Card from '../Card/Card';
import Button from '../Button/Button';
import DeleteCircleIcon from '../Images/svg/DeleteCircleIcon';
import { sendGAEvent } from '@next/third-parties/google';

// NOTE: Any style changes need to be plopped in globals.scss.  I plopped everything in this module file for now
// NOTE: This might have to have some changes based on requirements
/**
 * Query Builder
 * See https://react-querybuilder.js.org/docs/components/querybuilder for examples and documentation of the Query Builder
 * For returning on the backend, we are going to use Json without IDs to save space in the URL.  These IDs are long.  Do not change this or it will break the backend.
 * @param {Object} props - Object with all of the properties used within the react component, listed below.
 * @property {Array[Object]} fields - the fields you send to the Query Builder
 * @property {Array[Object]} query - The initial query you set the Query Builder to show to the user
 * @property {Function} setQuery - the useState function we use to change the data contained by the Query Builder
 * @property {Function} handleSearch - function that sets up the search query and routes the page so we can fetch the appropriate results
 * @returns {JSX} Query Builder Component
 * Styling for the actual Query Builder component has to be done in the Globals.scss file, not in this scss file.
 */
const QueryBuilder = (props) => {
    const { fields, query, setQuery, handleSearch } = props;

    return (
        <Card variant="advSearch">
            <Row>
                <BootstrapWrapper>
                    <BaseBuilder
                        controlClassnames={{ queryBuilder: 'queryBuilder-branches' }}
                        fields={fields}
                        query={query}
                        onQueryChange={(newQuery) => setQuery(newQuery)}
                        translations={{
                            addRule: {
                                label: (
                                    <>
                                        <span className={classes.plus}>+ Add Query</span>
                                    </>
                                ),
                                title: 'Add rule',
                            },
                            addGroup: {
                                label: (
                                    <>
                                        <span className={classes.plus}>+ Add Subquery</span>
                                    </>
                                ),
                                title: 'Add group',
                            },
                            removeRule: {
                                label: (
                                    <DeleteCircleIcon
                                        circleBorder="#D80000"
                                        circleFill="#D80000"
                                        xColor="#FFFFFF"
                                        dimensions={{ x: '20', y: '20' }}
                                    />
                                ),
                                title: 'Remove rule',
                            },
                            removeGroup: {
                                label: (
                                    <DeleteCircleIcon
                                        circleBorder="#D80000"
                                        circleFill="#D80000"
                                        xColor="#FFFFFF"
                                        dimensions={{ x: '20', y: '20' }}
                                    />
                                ),
                                title: 'Remove group',
                            },
                        }}
                    />
                </BootstrapWrapper>
            </Row>
            <Row className="mt-3">
                <div className={classes.submitSection}>
                    <Button
                        label="Clear Query"
                        className={classes.clearButton}
                        handleClick={() => setQuery({ rules: [], combinator: 'and', not: false })}
                    />
                    <Button
                        label="Apply Query"
                        variant="primary"
                        className={classes.applyButton}
                        handleClick={() => {
                            sendGAEvent('event', 'advancedSearch', { value: `Advanced Search Made`, query: JSON.stringify(query) });
                            handleSearch(undefined, true, false, true);
                        }}
                    />
                </div>
            </Row>
        </Card>
    );
};

QueryBuilder.propTypes = {
    fields: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string,
            label: PropTypes.string,
        })
    ).isRequired,
    query: PropTypes.shape({
        combinator: PropTypes.string,
        rules: PropTypes.arrayOf(
            PropTypes.shape({
                field: PropTypes.string,
                operator: PropTypes.string,
                value: PropTypes.string,
            })
        ),
    }).isRequired,
    setQuery: PropTypes.func.isRequired,
    handleSearch: PropTypes.func.isRequired,
};

export default QueryBuilder;
