import React from 'react';
import PropTypes from 'prop-types';
import classes from './FacetCard.module.scss';
import FacetAggregate from './FacetAggregate';

/**
 * A visual container for other visual React components.
 * @param {Object} props - Object with all of the properties used within the react component, listed below.
 * @returns {JSX} A FacetCard React Component
 */

const FacetCard = (props) => {
    const { aggregations, facetList, activeFacets, setFacets, handleSearch } = props;
    const body = [];

    for (const facet of facetList) {
        const aggregateName = `filters#${facet.entityPropertyName}`;
        const aggregateBucket = aggregations[aggregateName]?.buckets[0][`sterms#${facet.entityPropertyName}`]?.buckets;
        if (aggregateBucket) {
            if (aggregateBucket.length > 0) {
                body.push(
                    <FacetAggregate
                        key={facet.displayLabel}
                        header={facet.displayLabel}
                        entityName={facet.entityPropertyName}
                        options={aggregateBucket}
                        activeFacets={activeFacets}
                        setFacets={setFacets}
                        handleSearch={handleSearch}
                    ></FacetAggregate>
                );
            }
        }
    }
    if (!body) {
        body.push(<span className={classes.noneFound}>No Filters Found...</span>);
    }
    return <>{body}</>;
};

FacetCard.propTypes = {
    activeFacets: PropTypes.array,
};

export default FacetCard;
