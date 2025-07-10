import React from 'react';
import classes from './Sidebar.module.scss';
import PropTypes from 'prop-types';

// props will be the array of values for the list and maybe an onChange to handle whats active
// do the handlechange in parent and call function here

/**
 * Interactable Sidebar component
 * @param {Object} props - Object with all of the properties used within the react component, listed below.
 * @property {Array} [menuItems] - Label shown on the button
 * @property {Function} onSelectedMenuItem - Function to call when the user clicks on a menu item
 * @property {Object} [selectedItem] - handles marking the selected item in list
 * @returns {JSX} Sidebar Component
 */

const Sidebar = (props) => {
    const { menuItems, onSelectedMenuItem, selectedItem } = props;

    const handleMenuClick = (menuItem) => {
        onSelectedMenuItem(menuItem);
    };

    const handleKeyDown = (event, item) => {
        if (event.key === 'Enter') {
            onSelectedMenuItem(item);
        }
    };

    return (
        <>
            <ul className={classes.container}>
                {menuItems.map((item) => {
                    return (
                        <li
                            tabIndex="0"
                            key={item.value}
                            className={`${classes.menuItems} ${
                                selectedItem.value === item.value.split('?')[0] ? classes.selected : ''
                            } : }`}
                            onClick={() => handleMenuClick(item)}
                            onKeyDown={() => handleKeyDown(event, item)}
                        >
                            {item.label}
                        </li>
                    );
                })}
            </ul>
        </>
    );
};

Sidebar.propTypes = {
    menuItems: PropTypes.array.isRequired,
    onSelectedMenuItem: PropTypes.func.isRequired,
    selectedItem: PropTypes.object.isRequired,
};

export default Sidebar;
