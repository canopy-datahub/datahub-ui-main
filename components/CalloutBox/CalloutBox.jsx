import React from 'react';
import PropTypes from 'prop-types';
import classes from './CalloutBox.module.scss';

/**
 * A box to house instructions or text we want to draw a user's attention to
 * @param {Object} props - Object with all of the properties used within the react component, listed below.
 * @property {Node} body - Body of the text
 * @property {String} [className=''] - Manually change the styling of the box by passing in a className.  Allows the use of custom CSS.
 * @returns {JSX} A Callout Box Component
 */

const CalloutBox = (props) => {
    const { body, className } = props;

    return <div className={`${classes.container} ${className}`}>{body}</div>;
};

CalloutBox.propTypes = {
    body: PropTypes.node,
    className: PropTypes.string,
};

export default CalloutBox;
