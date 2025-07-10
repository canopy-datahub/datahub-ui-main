/**
 * A visual container for other visual React components.
 * @param {Object} query - NextJS Query object from the request context.  Contains everything we need for setting up a search page
 * @returns {Object} initialQuery - A better organized object for each function of search
 */

export function queryHelper(query) {
    let facets = [];
    let advancedQuery;
    if (query.facets) {
        facets = JSON.parse(query.facets);
    }
    if (query.adv) {
        advancedQuery = JSON.parse(query.adv);
    }

    const initialQuery = {
        search: query?.q || '',
        facets: facets || [],
        sorting: {
            sort: query?.sort || 'asc',
            field: query?.prop || 'title',
        },
        pagination: {
            page: query?.page || 1,
            size: query?.size || 50,
        },
        view: query?.view || 'table',
        advancedQuery: advancedQuery || null,
    };
    return initialQuery;
}
