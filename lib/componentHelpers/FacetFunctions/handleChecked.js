/**
 *
 * @param {*} checkState - is this already checked when we render the page?  Faster than checking facet state in this function
 * @param {*} facetName - Name of the facet
 * @param {*} aggregateName - Name of the aggregation the facet is under
 * @param {*} activeFacets - useState of facets from the url query - READ ONLY
 * @param {*} setFacets - function to set
 * @param {*} handleSearch - Function to handle the search
 */

export function handleChecked(checkState, facetName, entityName, activeFacets, setFacets, handleSearch) {
    // state should be read only, so make a copy
    const tempFacets = activeFacets;
    let found = null;
    found = activeFacets.findIndex((facetAggregate) => facetAggregate.name === entityName);

    // if we don't see the aggregate, it can't be checked either, so add the aggregate to the array, and the new facet
    if (found < 0) {
        const newEntry = { name: entityName, facets: [facetName] };
        tempFacets.push(newEntry);
        setFacets(tempFacets);
        handleSearch(undefined, true);

        // if we find the aggregate,
    } else {
        // and it's checked initially, then we need to remove it from the aggregate and see if it's empty after
        if (checkState) {
            tempFacets[found].facets.splice(tempFacets[found].facets.indexOf(facetName), 1);
            if (tempFacets[found].facets.length === 0) {
                tempFacets.splice(found, 1);
            }
            setFacets(tempFacets);
            handleSearch(undefined, true);
            // and it's not checked, then we need to append it to that aggregate
        } else {
            tempFacets[found].facets.push(facetName);
            setFacets(tempFacets);
            handleSearch(undefined, true);
        }
    }
}
