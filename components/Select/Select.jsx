import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';
import classes from './Select.module.scss';
import Validation from '../Input/Validation/Validation';

/**
 * Interactable Select component
 * * See https://react-bootstrap.github.io/docs/forms/select/ for examples and documentation

 * @param {Object} props - Object with all of the properties used within the react component, listed below.
 * @property {String} [ariaLabel=''] - Replaces what is read to the screenreader
 * @property {String} error - Applies a error message for the user to see
 * @property {String} label - Label shown on the button
 * @property {Boolean} [required] - Assigns if the field is required or not
 * @property {String} name - Defines the name of the Select
 * @property {Boolean} [disabled] - Disables the Select field
 * @property {Function} [onBlur=()=>{}] - When the Select is clicked off, this function will occur
 * @property {Function} [onChange=()=>{}] - When the Select changes, this function will occur
 * @property {String} [value=''] - Control for Select data
 * @property {String} valueProp - Defines the value of the Select items inside its options array
 * @property {String} labelProp - Defines the label of the Select items inside its options array
 * @property {String} [containerClass=''] - Manually change the styling of the Select group by passing in a className.  Allows the use of custom CSS.
 * @property {String} [selectClass=''] - Manually change the styling of the Select by passing in a className.  Allows the use of custom CSS.
 * @property {String} [labelClass=''] - Manually change the styling of the label by passing in a className.  Allows the use of custom CSS.
 * @property {String} [placeholder=''] - Placeholder text when the Select is blank
 * @property {Array} options - Array of objects that contain page label and value for the Select
 * @property {Boolean} [inline] - Shows inline validation message instead of on alert
 * @returns {JSX} Select Component
 */

const Select = forwardRef((props, ref) => {
    const {
        ariaLabel,
        error,
        label,
        required,
        name,
        disabled,
        onBlur,
        onChange,
        value,
        valueProp,
        labelProp,
        containerClass,
        selectClass,
        labelClass,
        placeholder,
        options,
        inline,
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
        <Form.Group className={`${classes.selectContainer} ${containerClass}`}>
            {label && (
                <>
                    <Form.Label className={`${classes.labelFont} ${labelClass}`}>{required ? requiredLabel : label}</Form.Label>
                    <Validation inline={inline} touched={!!error} validationMessage={message} />
                </>
            )}
            <Form.Select
                aria-label={ariaLabel}
                className={`${error ? classes.error : ''} ${selectClass}`}
                name={name}
                ref={ref}
                disabled={disabled}
                onChange={onChange}
                onBlur={onBlur}
                value={value}
            >
                {placeholder && (
                    <option key="empty" value="">
                        {placeholder}
                    </option>
                )}
                {options.map((option) => {
                    return (
                        <option key={option[valueProp]} value={option[valueProp]}>
                            {option[labelProp]}
                        </option>
                    );
                })}
            </Form.Select>
        </Form.Group>
    );
});

Select.displayName = 'Select';

Select.propTypes = {
    ariaLabel: PropTypes.string,
    containerClass: PropTypes.string,
    disabled: PropTypes.bool,
    error: PropTypes.object,
    inline: PropTypes.bool,
    label: PropTypes.string,
    labelClass: PropTypes.string,
    labelProp: PropTypes.string,
    name: PropTypes.string,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    options: PropTypes.array,
    placeholder: PropTypes.any,
    required: PropTypes.bool,
    selectClass: PropTypes.string,
    value: PropTypes.any,
    valueProp: PropTypes.string,
};

Select.defaultProps = {
    containerClass: '',
    disabled: false,
    error: null,
    label: '',
    labelProp: 'label',
    onBlur: () => {},
    onChange: () => {},
    options: [],
    placeholder: '',
    required: false,
    selectClass: '',
    value: undefined,
    valueProp: 'value',
};

export default Select;
