import React from 'react';
import PropTypes from 'prop-types';
import { ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import classes from './SearchResultViewToggle.module.scss';
import TableIcon from '../../../Images/svg/TableIcon';
import ListIcon from '../../../Images/svg/ListIcon';
import { sendGAEvent } from '@next/third-parties/google';

/**
 * SearchResultViewToggle
 * * See https://react-bootstrap.github.io/docs/components/buttons#checkbox--radio for examples and documentation on Radio type buttons
 * * WARN: This component is heavily styled and overwrites some bootstrap CSS typing.  It may run into issues down the road.
 *  @param {Object} props Object with all of the properties used within the react component, listed below.
 *  @property {Function} setView - Page's useState function managing the changing of the page in response to the toggle
 *  @property {String} view - Page's state value managing the changing of the page in response to the toggle.
 * This should always read "table" or "list"
 * @returns {JSX} View Toggle Component for Search Result views
 */

const SearchResultViewToggle = (props) => {
    const { setView, view } = props;

    return (
        <>
            <ToggleButtonGroup type="radio" name="options" defaultValue={view}>
                <ToggleButton
                    onChange={(e) => {
                        sendGAEvent('event', 'toggleResults', { value: 'List View' });
                        setView('list');
                    }}
                    className={classes.toggle}
                    id="tbg-radio-2"
                    value="list"
                >
                    <ListIcon checked={view} /> <span className={view === 'list' ? classes.bold : classes.inactive}>List</span>
                </ToggleButton>
                <ToggleButton
                    onChange={(e) => {
                        sendGAEvent('event', 'toggleResults', { value: 'Table View' });
                        setView('table');
                    }}
                    className={classes.toggle}
                    id="tbg-radio-1"
                    value="table"
                >
                    <TableIcon checked={view} /> <span className={view === 'table' ? classes.bold : classes.inactive}>Table</span>
                </ToggleButton>
            </ToggleButtonGroup>
        </>
    );
};

SearchResultViewToggle.propTypes = {
    setView: PropTypes.func.isRequired,
    view: PropTypes.oneOf(['table', 'list']),
};

export default SearchResultViewToggle;
