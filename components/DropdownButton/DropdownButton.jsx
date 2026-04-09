import React from 'react';
import PropTypes from 'prop-types';
import classes from './DropdownButton.module.scss';
import { Dropdown } from 'react-bootstrap';
import _ from 'lodash';

/**
 * Dropdown button component for a button in a table with actions to take on that row
 * @param {Object} props - Object with all of the properties used within the react component, listed below.
 * @property {Array(Objects)} menuItems - array of items to be listed in the dropdown when button clicked
 * @property {String} label - The label for the button
 * @property {Component} customComponent - if we want a menuitem to be a custom component we pass it here
 * @property {Boolean} [disabled=false] - if we want to disable the toggle
 * @returns {JSX} DropdownButton Component
 */

const DropdownButton = (props) => {
    const { label, menuItems, disabled } = props;
    return (
        <Dropdown>
            <Dropdown.Toggle id="dropdown-basic" className={classes.dropdownButton} disabled={disabled}>
                {label}
            </Dropdown.Toggle>

            <Dropdown.Menu>
                {menuItems.map((item) => (
                    <Dropdown.Item onClick={item.onClick} key={_.uniqueId()}>
                        {item.label}
                    </Dropdown.Item>
                ))}
            </Dropdown.Menu>
        </Dropdown>
    );
};

DropdownButton.defaultProps = {
    disabled: false,
};

DropdownButton.propTypes = {
    disabled: PropTypes.bool,
    label: PropTypes.string,
    menuItems: PropTypes.arrayOf(
        PropTypes.shape({
            onClick: PropTypes.func,
            label: PropTypes.string,
        })
    ).isRequired,
};

export default DropdownButton;
