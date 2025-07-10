import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';
import { useFormContext } from 'react-hook-form';
import classes from './Checkbox.module.scss';
import Validation from '../Input/Validation/Validation';

/**
 * Interactable Checkbox component
 * * See https://react-bootstrap.github.io/docs/forms/select/ for examples and documentation

 * @param {Object} props - Object with all of the properties used within the react component, listed below.
 * @property {String} [ariaLabel=''] - Replaces what is read to the screenreader
 * @property {String} error - Denotes if there's an error and applies an error class to the checkboxes
 * @property {String} label - Label for checkbox group
 * @property {Boolean} [required] - Assigns if the checkbox group is required or not
 * @property {Boolean} [disabled] - Disables the checkbox group
 * @property {Function} [onChange=()=>{}] - When the checkbox changes, this function will occur
 * @property {String} [value=''] - Control for checkbox data
 * @property {String} valueProp - Defines the value of the checkbox items inside its options array
 * @property {String} labelProp - Defines the label of the checkbox items inside its options array
 * @property {String} [containerClass=''] - Manually change the styling of the checkbox group by passing in a className.  Allows the use of custom CSS.
 * @property {String} [checkboxClass=''] - Manually change the styling of the checkbox by passing in a className.  Allows the use of custom CSS.
 * @property {String} [labelClass=''] - Manually change the styling of the label by passing in a className.  Allows the use of custom CSS.
 * @property {Array} options - Array of objects that contain label and value for the checkboxes
 * @property {Boolean} inline - Shows inline validation message instead of on alert
 * @property {String} registerName - Name for checkbox group being registered for react hook form
 * @property {String} errorMessage - Message for react hook form's error object
 * @property {String} toggleValue - Defines the value of the checkbox that needs to act as a toggle for another field. Eaxmple: checking "Other" reveals a text input
 * @property {Function} toggleFunction - The onChange function the toggle checkbox needs to call. Example: changing the flag state to reveal a text input
 * @returns {JSX} Select Component
 */

const FormCheckbox = forwardRef((props, ref) => {
    const { register } = useFormContext();
    const {
        ariaLabel,
        error,
        inline,
        label,
        required,
        disabled,
        onChange,
        valueProp,
        labelProp,
        containerClass,
        checkboxClass,
        labelClass,
        options,
        registerName,
        errorMessage,
        toggleValue,
        toggleFunction,
    } = props;

    const requiredLabel = (
        <>
            <span className={classes.required}>*</span> {label}
        </>
    );

    let message = '';

    if (error) {
        if (error.type === 'required') {
            message = `required`;
        }

        message = error.message || message;
    }

    return (
        <Form.Group className={`${classes.checkboxContainer} ${containerClass}`}>
            {label && (
                <>
                    <Form.Label className={`${classes.labelFont} ${labelClass}`}>{required ? requiredLabel : label}</Form.Label>
                    <Validation inline={inline} touched={!!error} validationMessage={message} />
                </>
            )}
            {options.map((option) => {
                if (toggleValue && toggleValue === option[valueProp]) {
                    return (
                        <Form.Check
                            {...register(registerName, {
                                required: errorMessage,
                            })}
                            className={`${error ? classes.error : ''} ${checkboxClass}`}
                            type="checkbox"
                            disabled={disabled}
                            key={option[valueProp]}
                            id={option[valueProp]}
                            label={option[labelProp]}
                            aria-label={ariaLabel || option[labelProp]}
                            onChange={toggleFunction}
                            value={option[valueProp]}
                        />
                    );
                } else {
                    return (
                        <Form.Check
                            {...register(registerName, {
                                required: errorMessage,
                            })}
                            className={`${error ? classes.error : ''} ${checkboxClass}`}
                            type="checkbox"
                            disabled={disabled}
                            key={option[valueProp]}
                            id={option[valueProp]}
                            label={option[labelProp]}
                            aria-label={ariaLabel || option[labelProp]}
                            onChange={onChange}
                            value={option[valueProp]}
                        />
                    );
                }
            })}
        </Form.Group>
    );
});

FormCheckbox.displayName = 'Checkbox';

FormCheckbox.propTypes = {
    ariaLabel: PropTypes.string,
    checkboxClass: PropTypes.string,
    containerClass: PropTypes.string,
    disabled: PropTypes.bool,
    error: PropTypes.object,
    errorMessage: PropTypes.string,
    inline: PropTypes.bool,
    label: PropTypes.string,
    labelClass: PropTypes.string,
    labelProp: PropTypes.string,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    options: PropTypes.array,
    placeholder: PropTypes.any,
    registerName: PropTypes.string,
    required: PropTypes.bool,
    toggleFunction: PropTypes.func,
    toggleValue: PropTypes.string,
    valueProp: PropTypes.string,
};

FormCheckbox.defaultProps = {
    containerClass: '',
    disabled: false,
    error: null,
    label: '',
    labelProp: 'label',
    options: [],
    required: false,
    checkboxClass: '',
    valueProp: 'value',
};

export default FormCheckbox;
