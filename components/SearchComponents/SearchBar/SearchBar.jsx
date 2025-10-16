import React, { useState } from 'react';
import classes from './SearchBar.module.scss';
import PropTypes from 'prop-types';
import Button from '../../Button/Button';
import SearchIcon from '../../Images/svg/SearchIcon';
import { EXPLORER_AUTOCOMPLETE } from '../../../constants/apiRoutes';
import useRest from '../../../lib/hooks/useRest';
import AutocompleteInput from '../../Input/AutocompleteInput';

/**
 * Interactable SearchBar component
 * * See https://react-bootstrap.github.io/components/buttons/ and  for examples and documentation
 * @param {Object} props - Object with all of the properties used within the react component, listed below.
 * @property {String} topic - topic the search bar is covering, like "studies" or "datasets".  Fills a section in the placeholder.
 * @property {Function} handleClick - Function trigger when the search button is pressed (what happens to the value inside the search)
 * @property {Function} setQuery - function to update the search query
 * @property {String} query - string denoting what is searched
 * @property {Boolean} advancedSearch - tells the search bar to disable if advanced search is on
 * @property {Boolean} homePage - tells if search bar is the home page search bar because our handleClicks are different
 * @returns {JSX} SearchBar Component
 */

const SearchBar = (props) => {
    const { topic, query, setQuery, handleClick, advancedSearch, homePage } = props;

    const [autocomplete, setAutocomplete] = useState([]);
    const [openDropdown, setOpenDropdown] = useState(false);
    /*
     * we need to save the state of what the user typed beforehand so we know what to show in the bar after we
     * mouse out of the auotcomplete list
     */
    const [oldQuery, setOldQuery] = useState('');

    const { restGet } = useRest();

    const autocompleteSuggestions = async () => {
        const suggestionResult = await restGet(`${EXPLORER_AUTOCOMPLETE}?q=${query}`, {
            showLoading: false,
            showSuccess: false,
            successMessage: 'Successfully fetched autocomplete suggestions',
            errorMessage: 'Error with retrieving autocomplete suggestions',
        });
        if (suggestionResult.status === 200) {
            setAutocomplete(suggestionResult?.data.data.suggest['phrase.completion'][0].options);
            setOpenDropdown(true);
        }
    };

    // will handle what to do when the user types
    // once 3 characters have been typed we want to get autocomplete results
    const handleChange = (e) => {
        setQuery(e.target.value);
        setOldQuery(query);
        if (e.target.value.length >= 3) {
            autocompleteSuggestions();
        } else {
            setAutocomplete([]);
            setOpenDropdown(false);
        }
    };

    // If the user just clicks enter without interacting with any autocomplete features, run the query
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleClick(homePage ? query : undefined, true, false, true);
        }
    };

    // if the user clicks an item in the autocomplete dropdown, populate the text input
    const handleItemClick = (value) => {
        setQuery(value);
        setOldQuery(query);
    };

    return (
        <div className={classes.searchBar}>
            <AutocompleteInput
                id="search-bar"
                query={query}
                setQuery={setQuery}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                items={autocomplete}
                onClick={handleItemClick}
                handleClick={handleClick}
                homePage={homePage}
                openDropdown={openDropdown}
                setOpenDropdown={setOpenDropdown}
                placeholder={`Search for ${topic}...`}
                oldQuery={oldQuery}
            />
            <Button
                className={classes.searchButton}
                disabled={advancedSearch}
                type="submit"
                variant="primary"
                ariaLabel={
                    homePage
                        ? 'Click this button to navigate to the Study explorer populated with your search results.'
                        : 'Click this button to perform your search.'
                }
                label="Search"
                iconLeft={<SearchIcon />}
                handleClick={() => (homePage ? handleClick(query) : handleClick(undefined, true, false, true))}
            />
        </div>
    );
};

SearchBar.propTypes = {
    advancedSearch: PropTypes.any,
    handleClick: PropTypes.func,
    homePage: PropTypes.any,
    query: PropTypes.string,
    setQuery: PropTypes.func,
    topic: PropTypes.string,
};

export default SearchBar;
