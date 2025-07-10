import { updateStateObject } from '../hooks/updateStateObject';

export function buildSearchQuery({
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
}) {
    // make search query string
    let searchQuery = '';
    // add search query
    // if advanced search query is open, we are adding adv search
    if (advancedSearch) {
        searchQuery += `&adv=${encodeURIComponent(JSON.stringify(advancedQuery).replace(/"id":"[a-zA-Z0-9-]*",/g, ''))}`;
    } else if (query) {
        searchQuery += `&q=${query}`;
    }
    // add filters if they're selected
    if (facetList?.length > 0) {
        let facetString = '&facets=%5B';

        for (const facetGroup in facetList) {
            facetString += '%7B';
            facetString += `"name":"${facetList[facetGroup].name}","facets":%5B`;
            for (const facet in facetList[facetGroup].facets) {
                facetString += `"${facetList[facetGroup].facets[facet]}",`;
            }
            facetString = facetString.slice(0, -1);

            facetString += '%5D%7D,';
        }
        facetString = facetString.slice(0, -1);
        facetString += '%5D';

        searchQuery += facetString;
    }
    // add sort
    if (sorting?.sort) {
        if (newQuery) {
            searchQuery += `&sort=desc&prop=relevance`;
            setSorting({ sort: 'desc', field: 'relevance' });
        } else {
            searchQuery += `&sort=${sorting.sort}&prop=${sorting.field}`;
            setSorting({ sort: sorting.sort, field: sorting.field });
        }
    }
    // add pagination
    if (resetPagination) {
        updateStateObject('page', 1, pagination, setPagination);
        searchQuery += `&page=1&size=${pagination.size}`;
    } else {
        searchQuery += `&page=${pagination.page}&size=${pagination.size}`;
    }
    return searchQuery;
}
