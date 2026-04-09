import { Pagination as PaginationComponent } from 'react-bootstrap';
import { updateStateObject } from '../hooks/updateStateObject';

/**
 * Generates pagingation for any pagination component
 * @param {Object} pagination - pagination object that contains the page, size of the list user can view, and the total number of pages
 * @param {Array<Node>} pages - array of react elements containing pagination elements.
 * @param {Function} handleSearch - function to handle the search API call
 * @param {Function} setPagination - setState Function to update pagination
 * WARN: pagination.page needs to basically always be wrapped in parseInt() during these comparisons with number order
 */
export function generatePagination(pagination, setPagination, pages, handleSearch) {
    // generate first page

    pages.push(
        <PaginationComponent.Item
            key={1}
            active={parseInt(pagination.page) === 1}
            onClick={() => {
                updateStateObject('page', 1, pagination, setPagination);
                handleSearch();
            }}
        >
            {1}
        </PaginationComponent.Item>
    );
    if (pagination.totalPages > 3) {
        // Generate left side ellipsis if we are more than one away from 2 pages
        if (parseInt(pagination.page) >= 4) {
            pages.push(<PaginationComponent.Ellipsis disabled />);
        }

        generateActivePageSet(pagination, setPagination, pages, handleSearch);

        // Generate the last one if the active page isn't the last page
        if (pagination.totalPages !== parseInt(pagination.page)) {
            pages.push(
                <PaginationComponent.Item
                    key={pagination.totalPages}
                    onClick={() => {
                        updateStateObject('page', pagination.totalPages, pagination, setPagination);
                        handleSearch();
                    }}
                >
                    {pagination.totalPages}
                </PaginationComponent.Item>
            );
        }
    } else {
        // if page total is between 2 and 3, just generate the other 1-2 tabs
        for (let i = 2; i <= pagination.totalPages; i++) {
            pages.push(
                <PaginationComponent.Item
                    key={i}
                    active={parseInt(pagination.page) === i}
                    onClick={() => {
                        updateStateObject('page', i, pagination, setPagination);
                        handleSearch();
                    }}
                >
                    {i}
                </PaginationComponent.Item>
            );
        }
    }
}

/**
 * Generates the tabs around the active page
 * @param {*} pagination - pagination object that contains the page, size of the list user can view, and the total number of pages
 * @param {*} pages - array of react elements containing pagination elements.
 * @param {Function} handleSearch - function to handle the search API call
 * @param {Function} setPagination - setState Function to update pagination
 */
function generateActivePageSet(pagination, setPagination, pages, handleSearch) {
    // Generate pagination for the active item and the 2 around it
    if (parseInt(pagination.page) > 2) {
        pages.push(
            <PaginationComponent.Item
                key={parseInt(pagination.page) - 1}
                onClick={() => {
                    updateStateObject('page', parseInt(parseInt(pagination.page)) - 1, pagination, setPagination);
                    handleSearch();
                }}
            >
                {parseInt(pagination.page) - 1}
            </PaginationComponent.Item>
        );
        pages.push(
            <PaginationComponent.Item key={parseInt(pagination.page)} active>
                {pagination.page}
            </PaginationComponent.Item>
        );
        // Else the page is 2
    } else if (parseInt(pagination.page) === 2) {
        pages.push(
            <PaginationComponent.Item key={parseInt(pagination.page)} active>
                {pagination.page}
            </PaginationComponent.Item>
        );
    }
    // if the page is more than 2 away from max, we need an ellipsis in the middle
    if (parseInt(pagination.page) < pagination.totalPages - 2) {
        pages.push(
            <PaginationComponent.Item
                key={parseInt(pagination.page) + 1}
                onClick={() => {
                    updateStateObject('page', parseInt(pagination.page) + 1, pagination, setPagination);
                    handleSearch();
                }}
            >
                {parseInt(pagination.page) + 1}
            </PaginationComponent.Item>
        );
        pages.push(<PaginationComponent.Ellipsis disabled />);
        // if the page is 2 away, generate the second to last item
    } else if (parseInt(pagination.page) === pagination.totalPages - 2) {
        pages.push(
            <PaginationComponent.Item
                key={parseInt(pagination.page) + 1}
                onClick={() => {
                    updateStateObject('page', parseInt(pagination.page) + 1, pagination, setPagination);
                    handleSearch();
                }}
            >
                {parseInt(pagination.page) + 1}
            </PaginationComponent.Item>
        );
    }
}
