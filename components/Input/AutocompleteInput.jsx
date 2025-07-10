import React, { useRef, useEffect, useState } from 'react';
import classes from './Input.module.scss';
import PropTypes from 'prop-types';

/**
 * Autocomplete Text Box for user input
 * @param {Object} props - Object with all of the properties used within the react component, listed below.
 * @property {String} [ariaLabel=''] - Replaces what is read to the screenreader
 * @property {Function} [onChange=()=>{}] - When the Input changes, this function will occur
 * @property {String} [placeholder=''] - placeholder that displays when no input is in the box
 * @property {Function} [onKeyDown=()=>{}] - When the user presses a key in Input field, this function will occur
 * @property {Array(Object)} items - Array that holds the dropdown options for autocomplete
 * @property {String} query - the text query for the search bar
 * @property {Function} setQuery - function to set query
 * @property {Boolean} homePage - if this is the homepage search
 * @property {Boolean} openDropdown - if the dropdown is open or not
 * @property {Function} setOpenDropdown - will set the dropdown to open or closed
 * @property {Function} onClick - function to tell what to do when user uses mouse to click an option in the dropdown list
 * @property {Function} handleClick - this will run the current query and perform a search with it
 * @property {String} oldQuery - value of what the user typed in the search bar
 * @returns {JSX} AutocompleteInput Component
 */

const AutocompleteInput = (props) => {
    const {
        items,
        ariaLabel,
        onClick,
        handleClick,
        homePage,
        query,
        setQuery,
        onChange,
        onKeyDown,
        openDropdown,
        setOpenDropdown,
        placeholder,
        oldQuery,
    } = props;

    const list = useRef();

    // if the user clicks into the search input, open the dropdown, assuming that at least 3 characters have been typed
    const handleParentOnClick = () => {
        if (!openDropdown && query.length >= 3) {
            setOpenDropdown(true);
        }
    };

    // handling the key down for if we are in the parent (in this case the original text input search bar)
    // this is separate from the key down of the actual dropdown list
    // this will only handle key down while our focus is in the search bar
    const handleKeyDown = (e) => {
        if (!openDropdown && e.key === 'Enter') {
            setQuery(e.target.value);
            handleClick(homePage ? query : undefined, true, false, true);
            return;
        }
        switch (e.key) {
            case 'Enter':
                setOpenDropdown(false);
                break;
            case 'ArrowDown': {
                e.preventDefault();
                if (!openDropdown && items.length > 0) {
                    setOpenDropdown(true);
                    break;
                }
                list.current.childNodes[1].childNodes[0].focus();
                setQuery(list.current.childNodes[1].childNodes[0].innerText);
                break;
            }
            case 'Escape':
                if (openDropdown) {
                    setOpenDropdown(false);
                }
                break;
            default:
                break;
        }
        if (onKeyDown) {
            onKeyDown(e);
        }
    };

    // this method handles the click of an item in the dropdown list, see handleClick in SearchBar.jsx
    const handleItemClick = (e) => {
        onClick(e.target.innerText);
        setOpenDropdown(false);
    };

    // This will handle the key down while the focus is in the dropdown list with autocomplete suggestions
    // We need to account for what to do when user uses arrow keys
    // Focus must be manually set in order to update the styling and show where we are in the list
    // As we scroll through with arrow keys, search bar should update with the focused value
    const handleItemKeyDown = (e) => {
        if (!openDropdown && e.key === 'Enter') {
            setQuery(e.target.value);
            handleClick(homePage ? query : undefined, true, false, true);
            return;
        }
        switch (e.key) {
            case 'Enter':
                setQuery(e.target.innerText);
                handleClick(homePage ? query : undefined, true, false, true);
                setOpenDropdown(false);
                break;
            case 'ArrowDown': {
                e.preventDefault();
                const index = parseInt(e.target.getAttribute('index'), 10);
                const next = index === items.length - 1 ? 0 : index + 1;
                list.current.childNodes[1].childNodes[next].focus();
                setQuery(items[next]?.text);
                break;
            }
            case 'ArrowUp': {
                e.preventDefault();
                const index = parseInt(e.target.getAttribute('index'), 10);
                const next = index === 0 ? items.length - 1 : index - 1;
                list.current.childNodes[1].childNodes[next].focus();
                setQuery(items[next]?.text);
                break;
            }
            case 'Escape':
                if (openDropdown) {
                    setOpenDropdown(false);
                }
                list.current.focus();
                break;
            default:
                break;
        }
    };

    // if the user clicks outside of the dropdown list, we should close it
    const handleOutsideClick = (e) => {
        if (!list.current.contains(e.target)) {
            setOpenDropdown(false);
        }
    };

    // when we hover over the option in the dropdown with the mouse, populate the search bar with it
    const handleMouseEnter = (e) => {
        setQuery(e.target.innerText);
    };

    // when we leave the list, set the search bar back to what the user typed beforehand
    const handleMouseLeave = (e) => {
        setQuery(oldQuery);
    };

    // used for the listener so we know when the user clicks outside of the dropdown
    useEffect(() => {
        if (openDropdown) {
            document.addEventListener('mousedown', handleOutsideClick);
        } else {
            document.removeEventListener('mousedown', handleOutsideClick);
        }
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [openDropdown]);

    return (
        <div className={classes.autocompleteContainer} ref={list}>
            <input
                value={query}
                onChange={onChange}
                type="text"
                onClick={handleParentOnClick}
                onKeyDown={handleKeyDown}
                className={classes.searchInput}
                aria-label={ariaLabel || 'Search bar autocomplete'}
                placeholder={placeholder}
            />
            {openDropdown && (
                <ul role="menu" className={classes.autocompleteMenu}>
                    {items.map((item, index) => (
                        <li
                            key={item._id}
                            role="menuitem"
                            tabIndex="0"
                            value={item.text}
                            className={classes.autocompleteMenuItem}
                            // eslint-disable-next-line react/no-unknown-property
                            index={index}
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                            onClick={handleItemClick}
                            onKeyDown={handleItemKeyDown}
                        >
                            {item.text}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

AutocompleteInput.propTypes = {
    ariaLabel: PropTypes.string,
    handleClick: PropTypes.func,
    homePage: PropTypes.bool,
    items: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string,
            text: PropTypes.string,
        })
    ),
    oldQuery: PropTypes.string,
    onChange: PropTypes.func,
    onClick: PropTypes.func,
    onKeyDown: PropTypes.func,
    openDropdown: PropTypes.bool,
    placeholder: PropTypes.string,
    query: PropTypes.string,
    setOpenDropdown: PropTypes.func,
    setQuery: PropTypes.func,
};

export default AutocompleteInput;
