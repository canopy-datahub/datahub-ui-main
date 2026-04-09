import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';
import classes from './Toggle.module.scss';
import Validation from '../Input/Validation/Validation';

/**
 * Toggle with Aria and onChange functionality
 * See https://react-bootstrap.github.io/forms/checks-radios/ for examples and documentation on Form Checks
 * @param {Object} props - Object with all of the properties used within the react component, listed below.
 * @property {String} [ariaLabel=''] - Replaces what is read to the screenreader
 * @property {String} error - Applies a error message for the user to see
 * @property {Boolean} [required] - Assigns if the field is required or not
 * @property {String} name - Defines the name of the Toggle
 * @property {Boolean} selected - Manually controls the checkbox
 * @property {String} controlId - A Unique ID
 * @property {Boolean} [disabled=false] - Disables the functionality of the Checkbox and greys it out
 * @property {Function} [handleChange=()=>{}] - On Change Passthrough
 * @property {String} label - Label for the checkbox
 * @property {Boolean} [small=false] - If on, small checkbox
 * @property {String} [className=''] - Manually change the styling of the Text Area by passing in a className.  Allows the use of custom CSS.
 * @property {String} [containerOverride=''] - Manually change the styling to take the class passed in rather than the toggleContainer class
 * @property {String} [type='checkbox'] - Switches the type of the Toggle
 * @property {Boolean} [inline] - Shows inline validation message instead of on alert
 * @returns {JSX} Checkbox Component
 */

const Toggle = (props) => {
    const {
        controlId,
        label,
        small,
        disabled,
        ariaLabel,
        selected,
        handleChange,
        type,
        className,
        name,
        error,
        required,
        inline,
        containerOverride,
    } = props;

    const requiredLabel = (
        <>
            <span className={classes.required}>*</span> {label}
        </>
    );
    let inputClass = small ? ` ${classes.small}` : ` ${classes.large}`;
    inputClass += disabled ? ` ${classes.disabled}` : '';
    inputClass += error ? ` ${classes.toggleContainer.error}` : '';
    inputClass += !containerOverride ? ` ${classes.toggleContainer}` : '';

    let message = '';

    if (error) {
        if (error.type === 'required') {
            message = `required`;
        }
        message = error.message || message;
    }

    return (
        <>
            <Form.Group controlId={controlId} className={`${className} ${inputClass}`}>
                <Form.Check
                    label={required ? requiredLabel : label}
                    aria-label={ariaLabel}
                    type={type}
                    checked={selected}
                    disabled={disabled}
                    onChange={handleChange}
                    className={`${className} ${error ? classes.error : ''}`}
                    name={name}
                />
                <Validation inline={inline} touched={!!error} validationMessage={message} />
            </Form.Group>
        </>
    );
};

Toggle.defaultProps = {
    disabled: false,
    small: false,
    ariaLabel: '',
    type: 'checkbox',
};

Toggle.propTypes = {
    ariaLabel: PropTypes.string,
    className: PropTypes.string,
    containerOverride: PropTypes.string,
    controlId: PropTypes.string,
    disabled: PropTypes.bool,
    error: PropTypes.string,
    handleChange: PropTypes.func,
    inline: PropTypes.bool,
    label: PropTypes.string.isRequired,
    name: PropTypes.string,
    required: PropTypes.bool,
    selected: PropTypes.bool,
    small: PropTypes.bool,
    type: PropTypes.string,
};

export default Toggle;
