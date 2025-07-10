import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { Button as ButtonComponent } from 'react-bootstrap';
import classes from './Button.module.scss';

/**
 * Interactable Button component
 * * See https://react-bootstrap.github.io/components/buttons/ for examples and documentation

 * @param {Object} props - Object with all of the properties used within the react component, listed below.
 * @property {String} [label=''] - Label shown on the button
 * @property {String} [type] - Indicate what the button should do
 * @property {Element} [iconCenter] - Provides icon for button in the center
 * @property {Element} [iconRight] - Provides icon for button on the right
 * @property {Element} [iconLeft] - Provides icon for button on the left
 * @property {String} [ariaLabel=label] - Replaces what is read to the screenreader
 * @property {String} [variant='primary'] - Changes the design style to one of our presets
 * cases 'primary'[Default], 'secondary', 'danger', 'warning', 'success', 'light', 'dark', 'info', 'link'
 * @property {String} [size] - Changes the size style to one of our presets 'small', 'medium', 'large', or 'auto' if nothing is passed through.
 * You can also use 'none' to apply your own.
 * @property {Function} handleClick - Function to call when the button is clicked
 * @property {String} [className=''] - Manually change the styling of the button by passing in a className.  Allows the use of custom CSS.
 * @property {Boolean} [rounded] - If true, round the edges by 3px
 * @property {Boolean} [disabled] - If true, button is disabled
 * @property {Function} [onMouseOver] - - Function enacted when the user moves their mouse off of the button.  Is usually used for svg style switches on buttons.
 * @property {Function} [onMouseLeave] - Function enacted when the user moves their mouse off of the button.  Is usually used for svg style switches on buttons.
 * @returns {JSX} Button Component
 */

const Button = forwardRef((props, ref) => {
    const {
        label,
        type,
        iconCenter,
        iconRight,
        iconLeft,
        size,
        ariaLabel,
        handleClick,
        variant,
        modification,
        className,
        rounded,
        disabled,
        onMouseOver,
        onMouseLeave,
        border,
    } = props;

    let buttonClass = `${classes.button}`;
    switch (size) {
        case 'small':
            buttonClass += ` ${classes.small}`;
            break;
        case 'medium':
            buttonClass += ` ${classes.medium}`;
            break;
        case 'large':
            buttonClass += ` ${classes.large}`;
            break;
        case 'icon':
            buttonClass += ` ${classes.icon}`;
            break;
        case 'none':
            break;
        default:
            buttonClass += ` ${classes.auto}`;
            break;
    }

    switch (border) {
        case 'thin':
            buttonClass += ` ${classes.thinBorder}`;
            break;
        case 'thick':
            buttonClass += ` ${classes.thickBorder}`;
            break;
    }

    switch (rounded) {
        case 'lite':
            buttonClass += ` ${classes.liteRounded}`;
            break;
        case 'round':
            buttonClass += ` ${classes.fullRounded}`;
            break;
        default:
            break;
    }

    switch (modification) {
        case 'whiteText':
            buttonClass += ` ${classes.whiteText}`;
            break;
        default:
            break;
    }
    // buttonClass += rounded ? ` ${classes.liteRounded}` : '';
    // This is down here for overwrites
    buttonClass += className ? ` ${className}` : '';

    switch (variant) {
        case 'primary':
            buttonClass += ` ${classes.primary}`;
            break;
        case 'inverted':
            buttonClass += ` ${classes.invertedPrimary}`;
            break;
        case 'secondary':
            buttonClass += ` ${classes.secondary}`;
            break;
        case 'tertiary':
            buttonClass += ` ${classes.tertiary}`;
            break;
        case 'quaternary':
            buttonClass += ` ${classes.quaternary}`;
            break;
        case 'danger':
            buttonClass += ` ${classes.danger}`;
            break;
        case 'warning':
            buttonClass += ` ${classes.warning}`;
            break;
        case 'success':
            buttonClass += ` ${classes.success}`;
            break;
        case 'light':
            buttonClass += ` ${classes.light}`;
            break;
        case 'dark':
            buttonClass += ` ${classes.dark}`;
            break;
        case 'info':
            buttonClass += ` ${classes.info}`;
            break;
        case 'link':
            buttonClass += ` ${classes.link}`;
            break;
        case 'login':
            buttonClass += ` ${classes.login}`;
            break;
        case 'icon':
            buttonClass += ` ${classes.iconColor}`;
            break;
        case 'homepage':
            buttonClass += ` ${classes.homepage}`;
            break;
        case 'roleBased':
            buttonClass += ` ${classes.roleBased}`;
            break;
        case 'siteMap':
            buttonClass += ` ${classes.siteMap}`;
            break;
        case 'userRole':
            buttonClass += ` ${classes.userRole}`;
            break;
        default:
            buttonClass += ` ${classes.primary}`;
            break;
    }

    return (
        <ButtonComponent
            ref={ref}
            type={type}
            bsPrefix="a"
            aria-label={ariaLabel || label}
            className={buttonClass}
            onClick={handleClick}
            disabled={disabled}
            onMouseOver={onMouseOver}
            onMouseLeave={onMouseLeave}
        >
            {iconLeft && <span className={classes.iconLeft}>{iconLeft}</span>}
            {iconCenter}
            {label}
            {iconRight && <span className={classes.iconRight}>{iconRight}</span>}
        </ButtonComponent>
    );
});

Button.displayName = 'Button';

Button.defaultProps = {
    variant: 'primary',
    className: '',
    label: '',
};

Button.propTypes = {
    ariaLabel: PropTypes.string,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    handleClick: PropTypes.func,
    iconCenter: PropTypes.element,
    iconLeft: PropTypes.element,
    iconRight: PropTypes.element,
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    modification: PropTypes.oneOf(['whiteText']),
    onMouseLeave: PropTypes.func,
    onMouseOver: PropTypes.func,
    rounded: PropTypes.oneOf(['lite', 'round']),
    size: PropTypes.oneOf(['small', 'medium', 'large', 'auto', 'icon', 'none']),
    type: PropTypes.string,
    variant: PropTypes.oneOf([
        'primary',
        'altPrimary',
        'inverted',
        'secondary',
        'tertiary',
        'quaternary',
        'danger',
        'warning',
        'success',
        'light',
        'dark',
        'info',
        'link',
        'login',
        'icon',
        'homepage',
        'roleBased',
        'siteMap',
        'userRole',
    ]),
};

export default Button;
