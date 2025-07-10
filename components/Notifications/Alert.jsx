import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Alert as AlertBS } from 'react-bootstrap';
import classes from './Alert.module.scss';

/**
 * Alert for user
 * See https://react-bootstrap.netlify.app/docs/components/alerts/ for examples and documentation of Alerts
 * @param {Object} props - Object with all of the properties used within the react component, listed below.
 * @property {JSX} [children] - Any children to be rendered below the component
 * @property {Boolean} [dismissible] - Allows the option for the user to close the Alert
 * @property {String} [variant='primary'] - Changes the design style to one of our presets
 * @property {String} [idx] - Index for the component if multiple Alerts are present
 * @property {String} [className] - Manually change the styling of the alert by passing in a className.  Allows the use of custom CSS.
 * @returns {JSX} Alert Component
 */

const Alert = (props) => {
    const [show, setShow] = useState(true);

    const { children, variant, idx, dismissible, className } = props;

    let alertClass = `${classes.alertContainer} ${className}`;

    switch (variant) {
        case 'success':
            alertClass += ` ${classes.success}`;
            break;
        case 'danger':
            alertClass += ` ${classes.danger}`;
            break;
        default:
            break;
    }

    return (
        <>
            {show && (
                <AlertBS key={idx} variant={variant} dismissible={dismissible} className={alertClass} onClose={() => setShow(false)}>
                    {children}
                </AlertBS>
            )}
        </>
    );
};

Alert.defaultProps = {
    idx: null,
    variant: 'primary',
};

Alert.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    dismissible: PropTypes.bool,
    idx: PropTypes.string,
    variant: PropTypes.string.isRequired,
};

export default Alert;
