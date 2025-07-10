import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classes from './FacetAggregate.module.scss';
import Accordion from '../../../../components/Accordion/Accordion';
import { Row } from 'react-bootstrap';
import Toggle from '../../../../components/Toggle/Toggle';
import { handleChecked } from '../../../../lib/componentHelpers/FacetFunctions/handleChecked';
import SearchClearIcon from '../../../../components/Images/svg/SearchClearIcon';

/**
 * Adds Facet Aggregate, search, and its options with checkboxes.
 * @param {String} header - aggregate display name we use as the header for the section
 * @param {String} entityName - entity name we use to find out if it's an active filter
 * @param {Array<Object>} options - facet options we need checkboxes for.  This should be what is in the buckets key.
 * @param {Array<Object>} activeFacets - All facets currently being used in the search query - READ ONLY
 * @param {Function} setFacets - Function to change the facets.  Forwarded to handleChecked to handle what it is being set to.
 * @param {Function} handleSearch - Function to handle any search change
 */
const FacetAggregate = ({ header, entityName, options, activeFacets, setFacets, handleSearch }) => {
    const [keySearch, setKeySearch] = useState('');

    const createAccordion = () => {
        return (
            <React.Fragment key={header}>
                <Accordion variant="filter" title={header}>
                    {options.length > 9 && (
                        <div className={classes.searchContainer} role="region" aria-live="polite">
                            <Row className="mb-3">
                                <form className={classes.clearIconContainer}>
                                    <input
                                        aria-label={`${header} filter search bar`}
                                        type="text"
                                        placeholder={`Search for filter...`}
                                        value={keySearch}
                                        onChange={(e) => setKeySearch(e.target.value)}
                                    />
                                    <span onClick={() => setKeySearch('')}>
                                        <SearchClearIcon />
                                    </span>
                                </form>
                            </Row>
                        </div>
                    )}
                    {createToggles()}
                </Accordion>
            </React.Fragment>
        );
    };

    const createToggles = () => {
        const toggles = [];
        for (const i in options) {
            const name = options[i].key;
            let checked;
            // Since activeFacets is an array of objects with another array in it, we have to use this unholy line
            // Basically, if we find the header in it in our current aggregations, then check for the facet the toggle corresponds to within that aggregate group
            // if backend folks change this from an array to objects, we can make this way faster, because rn it's 2 for loops.
            if (
                activeFacets.find(
                    (facetAggregate) =>
                        facetAggregate.name === entityName && facetAggregate.facets.find((facet) => facet === options[i].key)
                )
            ) {
                checked = true;
            } else {
                checked = false;
            }

            const totalDocs = options[i].doc_count;

            if (name.toLowerCase().includes(keySearch)) {
                toggles.push(
                    <React.Fragment key={name}>
                        <Toggle
                            controlId={name}
                            selected={checked}
                            label={`${name} (${totalDocs})`}
                            handleChange={(e) => {
                                handleChecked(checked, name, entityName, activeFacets, setFacets, handleSearch);
                            }}
                        />
                    </React.Fragment>
                );
            }
        }
        return toggles;
    };

    return <>{createAccordion()}</>;
};

FacetAggregate.propTypes = {
    activeFacets: PropTypes.array,
    entityName: PropTypes.string,
    handleSearch: PropTypes.func,
    header: PropTypes.string,
    options: PropTypes.array,
    setFacets: PropTypes.func,
};

export default FacetAggregate;
