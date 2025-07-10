/**
 * Handles the clear button triggering clearing facets and searching
 * @param {Function} setFacets - Function to change the facets.  Forwarded to handleChecked to handle what it is being set to.
 * @param {Function} handleSearch - Function to handle any search change
 * @param {Array<Object>} activeFacets - All facets currently being used in the search query - READ ONLY
 */

export function handleClear(setFacets, handleSearch, activeFacets, query, setQuery) {
    // check for length to avoid spamming calls
    if (activeFacets.length > 0 || query) {
        setQuery('');
        setFacets([]);
        handleSearch([], true, true);
    }
}
