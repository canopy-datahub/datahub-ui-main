import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button as ButtonComponent } from 'react-bootstrap';
import classes from './SideWidget.module.scss';
import ChevronRightIcon from '../Images/svg/ChevronRightIcon';
import CloseIcon from '../Images/svg/CloseIcon';
import { sendGAEvent } from '@next/third-parties/google';

/**
 * A widget pulled to the right-side of screen to provide additional access to information.
 * @param {Object} props - Object with all of the properties used within the react component, listed below.
 * @property {String} [label=''] - Widget label
 * @property {String} [ariaLabel=label] - Replaces what is read to the screenreader
 * @property {Object} [iconRight] - Icon to show with label
 * @property {Boolean} [variant] - changes the style of the card for the 2 types of widgets (feedback, sitemap)
 * @property {String} [popupText=''] - Text of popup when widget is clicked
 * @property {String} [buttonText=''] - Label of button within the popup
 * @property {Function} [handleAction] - Function to call when button inside popup is clicked
 * @property {String} [className=''] - Manually change the styling of the button by passing in a className.  Allows the use of custom CSS.
 * @property {String} [externalContainerClass=''] - Additional class for Parent Component of SideWidget
 * @returns {JSX} A Button and Popup Component
 */

const SideWidget = (props) => {
    const { label, ariaLabel, iconRight, variant, className, popupText, buttonText, handleAction, externalContainerClass } = props;

    const [show, setShow] = useState(false);

    const widgetContainer = externalContainerClass ? `${externalContainerClass} ${classes.widgetContainer}` : `${classes.widgetContainer}`;
    let widgetClass = `${classes.widget}`;

    // This is down here for overwrites
    widgetClass += className ? ` ${className}` : '';

    switch (variant) {
        case 'primary':
            widgetClass += ` ${classes.primary}`;
            break;
        default:
            widgetClass += ` ${classes.primary}`;
            break;
    }

    const handleClick = () => {
        setShow(true);
    };

    const handleClose = () => {
        setShow(false);
    };

    return (
        <div className={widgetContainer}>
            <ButtonComponent bsPrefix="a" aria-label={ariaLabel || label} className={widgetClass} onClick={handleClick}>
                <div className={classes.labelContainer}>
                    <div className={classes.label}>{label}</div>
                    <div>{iconRight}</div>
                </div>
            </ButtonComponent>
            <div className={classes.popup} style={{ display: show ? 'flex' : 'none' }}>
                <button
                    className={classes.popupClose}
                    onClick={() => {
                        sendGAEvent({ event: 'close_button' });
                        handleClose();
                    }}
                >
                    <CloseIcon />
                </button>
                <p>{popupText}</p>
                <hr></hr>
                <button
                    className={classes.popupButton}
                    onClick={() => {
                        handleClose();
                        handleAction();
                    }}
                >
                    {buttonText} <ChevronRightIcon />
                </button>
            </div>
        </div>
    );
};

SideWidget.defaultProps = {
    variant: 'feedback',
    className: '',
};

SideWidget.propTypes = {
    ariaLabel: PropTypes.string,
    buttonText: PropTypes.string.isRequired,
    className: PropTypes.string,
    externalContainerClass: PropTypes.string,
    handleAction: PropTypes.func.isRequired,
    iconRight: PropTypes.object,
    label: PropTypes.string.isRequired,
    popupText: PropTypes.string.isRequired,
    variant: PropTypes.oneOf(['primary']),
};

export default SideWidget;
