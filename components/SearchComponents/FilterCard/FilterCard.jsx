import React from 'react';
import PropTypes from 'prop-types';
import classes from './FilterCard.module.scss';

//TODO: this whole component

/**
 * Interactable FilterCard component
 * * See https://react-bootstrap.github.io/components/buttons/ for examples and documentation

 * @param {Object} props - Object with all of the properties used within the react component, listed below.
 * @property {String} label - Label shown on the FilterCard
 * @property {String} [ariaLabel=label] - Replaces what is read to the screenreader
 * @property {String} [variant='primary'] - Changes the design style to one of our presets
 * cases 'primary'[Default], 'secondary', 'danger', 'warning', 'success', 'light', 'dark', 'info', 'link'
 * @property {String} [size] - Changes the size style to one of our presets 'small', 'medium', 'large', or 'auto' if nothing is passed through
 * @property {Function} handleClick - Function to call when the FilterCard is clicked
 * @property {String} [className=''] - Manually change the styling of the FilterCard by passing in a className.  Allows the use of custom CSS.
 * @returns {JSX} FilterCard Component
 */

const FilterCard = (props) => {
    const { label, size, ariaLabel, handleClick, variant, className } = props;
};

FilterCard.defaultProps = {
    variant: 'primary',
    className: '',
};

FilterCard.propTypes = {
    ariaLabel: PropTypes.string,
    className: PropTypes.string,
    handleClick: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
    size: PropTypes.oneOf(['small', 'medium', 'large', 'auto']),
    variant: PropTypes.oneOf(['primary', 'secondary', 'danger', 'warning', 'success', 'light', 'dark', 'info', 'link']),
};

export default FilterCard;
