import React from 'react';
import PropTypes from 'prop-types';
import classes from './BadgeSection.module.scss';
import Button from '../../../../components/Button/Button';
import { handleClear } from '../../../../lib/componentHelpers/FacetFunctions/handleClear';
import Badge from './Badge';
import DeleteCircleIcon from '../../../../components/Images/svg/DeleteCircleIcon';

/**
 * A visual container for other visual React components.
 * @param {Object} props - Object with all of the properties used within the react component, listed below.
 * @returns {JSX} A BadgeSection React Component
 */

const BadgeSection = (props) => {
    const { facetList, activeFacets, setFacets, handleSearch, query, setQuery } = props;
    const body = [];
    if (query) {
        body.push(
            <Badge
                key="title"
                header="Search Term"
                facet={query}
                entityName="Search Term"
                setFacets={setQuery}
                handleSearch={handleSearch}
            />
        );
    }
    for (const badgeFacet of activeFacets) {
        const headerIndex = facetList.findIndex((facet) => facet.entityPropertyName === badgeFacet.name);
        const header = facetList[headerIndex].displayLabel;

        for (const facet of badgeFacet.facets) {
            body.push(
                <Badge
                    key={facet}
                    header={header}
                    facet={facet}
                    entityName={badgeFacet.name}
                    activeFacets={activeFacets}
                    setFacets={setFacets}
                    handleSearch={handleSearch}
                />
            );
        }
    }

    return (
        <div className={classes.badgeContainer}>
            <div className={classes.badgeSection}></div>
            {body}
            {body.length > 0 && (
                <Button
                    label="Reset Search"
                    iconCenter={
                        <DeleteCircleIcon circleBorder="#FFFFFF" circleFill="#000" xColor="#FFFFFF" dimensions={{ x: '30', y: '20' }} />
                    }
                    variant="tertiary"
                    className={classes.clear}
                    handleClick={() => handleClear(setFacets, handleSearch, activeFacets, query, setQuery)}
                />
            )}
        </div>
    );
};

BadgeSection.propTypes = {
    activeFacets: PropTypes.array,
    facetList: PropTypes.array,
    handleSearch: PropTypes.func,
    query: PropTypes.string,
    setFacets: PropTypes.func,
    setQuery: PropTypes.func,
};

export default BadgeSection;
