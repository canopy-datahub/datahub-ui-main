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
 * @returns {JSX} Select Component
 */

const BasicCheckbox = forwardRef((props, ref) => {
    const {
        ariaLabel,
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
        ...rest
    } = props;

    const requiredLabel = (
        <>
            <span className={classes.required}>*</span> {label}
        </>
    );

    let message = '';

    return (
        <Form.Group className={`${classes.checkboxContainer} ${containerClass}`}>
            {options.length > 0 &&
                options.map((option) => {
                    return (
                        <Form.Check
                            className={`${classes.checkbox} ${checkboxClass}`}
                            type="checkbox"
                            disabled={disabled}
                            key={option[valueProp]}
                            id={option[valueProp]}
                            label={option[labelProp]}
                            aria-label={ariaLabel || option[labelProp]}
                            onChange={onChange}
                            value={option[valueProp]}
                            {...rest}
                        />
                    );
                })}

            {options.length === 0 && (
                <Form.Check
                    className={`${classes.checkbox} ${checkboxClass}`}
                    type="checkbox"
                    disabled={disabled}
                    key={label}
                    id={label}
                    label={label}
                    aria-label={ariaLabel || label}
                    onChange={onChange}
                    value={label}
                    {...rest}
                />
            )}
        </Form.Group>
    );
});

BasicCheckbox.displayName = 'Checkbox';

BasicCheckbox.propTypes = {
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

BasicCheckbox.defaultProps = {
    containerClass: '',
    disabled: false,
    label: '',
    labelProp: 'label',
    options: [],
    required: false,
    checkboxClass: '',
    valueProp: 'value',
};

export default BasicCheckbox;
