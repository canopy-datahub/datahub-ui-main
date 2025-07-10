import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { Form, InputGroup } from 'react-bootstrap';
import classes from './TextArea.module.scss';
import Validation from '../Input/Validation/Validation';

/**
 * Text Area component
 * * See https://react-bootstrap.github.io/forms/form-control/ for Bootstrap Form Control
 * @param {Object} props - Object with all of the properties used within the tooltip, listed below.
 * @property {String} [ariaLabel] - Replaces what is read to the screenreader
 * @property {String} controlId - A Unique ID
 * @property {String} error - Applies a error message for the user to see
 * @property {String} [label=''] - Label for the Text Area
 * @property {Boolean} [required] - Assigns if the field is required or not
 * @property {String} name - Defines the name of the Text Area
 * @property {Boolean} [rows=3] - Number of Rows the text area will display on screen by default
 * @property {Boolean} [disabled] - Disables the Text Area field
 * @property {Function} [onBlur=()=>{}] - When the Text Area is clicked off, this function will occur
 * @property {Function} [onChange=()=>{}] - When the Text Area changes, this function will occur
 * @property {String} [value=''] - Control for Text Area data
 * @property {String} [className=''] - Manually change the styling of the Text Area by passing in a className.  Allows the use of custom CSS.
 * @property {String} [placeholder=''] - Placeholder text when the Text Area is blank
 * @property {Boolean} [readOnly] - Disables input
 * @property {String} [type='text'] - Type of input into the Text Area
 * @property {Function} [onFocus=()=>{}] - When the user clicks on Text Area field, this function will occur
 * @property {Function} [onKeyDown=()=>{}] - When the user presses a key in Text Area field, this function will occur
 * @property {Boolean} [inline] - Shows inline validation message instead of on alert
 * @returns {JSX} Text Area Component
 */

const TextArea = forwardRef((props, ref) => {
    const {
        ariaLabel,
        controlId,
        error,
        label,
        required,
        name,
        rows,
        disabled,
        onBlur,
        onChange,
        value,
        className,
        placeholder,
        readOnly,
        type,
        onFocus,
        onKeyDown,
        inline,
        labelClass,
    } = props;

    const requiredLabel = (
        <>
            <span className={classes.required}>*</span> {label}
        </>
    );
    let inputContainerClass = ` ${classes.textArea} ${className}`;
    inputContainerClass += error ? ` ${classes.textArea.error}` : '';
    let message = '';

    if (error) {
        if (error.type === 'required') {
            message = `required`;
        }

        if (error.type === 'maxLength') {
            message = `${label} is over max length`;
        }

        message = error.message || message;
    }

    // In the future if we ever need to focus this, we need to add ForwardRef to the props section
    return (
        <Form.Group controlId={controlId} className={`${classes.formGroup} ${classes.textArea} ${inputContainerClass}`}>
            {label && (
                <>
                    <Form.Label className={`${classes.labelFont} ${labelClass}`}>{required ? requiredLabel : label}</Form.Label>{' '}
                    <Validation touched={!!error} validationMessage={message} />
                </>
            )}
            <Validation inline={inline} touched={!!error} errorMessage={message} />
            <InputGroup>
                <Form.Control
                    ref={ref}
                    name={name}
                    aria-label={ariaLabel}
                    as="textarea"
                    className={error ? classes.error : ''}
                    data-test={name}
                    placeholder={placeholder}
                    onBlur={onBlur}
                    onChange={onChange}
                    rows={rows}
                    type={type}
                    disabled={disabled}
                    value={value}
                    readOnly={readOnly}
                    onFocus={onFocus}
                    onKeyDown={onKeyDown}
                />
            </InputGroup>
        </Form.Group>
    );
});

TextArea.displayName = 'TextArea';

TextArea.propTypes = {
    ariaLabel: PropTypes.string,
    className: PropTypes.string,
    controlId: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    error: PropTypes.object,
    label: PropTypes.string,
    name: PropTypes.string.isRequired,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onKeyDown: PropTypes.func,
    placeholder: PropTypes.string,
    readOnly: PropTypes.bool,
    required: PropTypes.bool,
    rows: PropTypes.number,
    type: PropTypes.string,
    value: PropTypes.string,
};

TextArea.defaultProps = {
    label: '',
    onBlur: () => {
        /* This is intentional */
    },
    onChange: () => {
        /* This is intentional */
    },
    placeholder: '',
    rows: 3,
    type: 'text',
};

export default TextArea;
