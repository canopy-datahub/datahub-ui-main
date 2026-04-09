import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';
import Validation from '../../components/Input/Validation/Validation';
import classes from './MultiCheck.module.scss';

/**
 * Multi radio or checkbox for user input
 * See https://react-bootstrap.github.io/forms/overview/ for examples and documentation of Form Controls
 * @param {Object} props - Object with all of the properties used within the react component, listed below.
 * @property {String} [ariaLabel=''] - Replaces what is read to the screenreader
 * @property {String} error - Applies a error message for the user to see
 * @property {String} label - Label for the Input
 * @property {Boolean} [required] - Assigns if the field is required or not
 * @property {String} name - Defines the name of the Input
 * @property {String} [labelClass=''] - Manually change the styling of the label by passing in a className.  Allows the use of custom CSS.
 * @property {String} [containerClass=''] - Manually change the styling of the multiCheck container by passing in a className.  Allows the use of custom CSS.
 * @property {Boolean} [inline] - Shows inline validation message instead of on alert
 * @property {String} [checkBoxGroupClass=''] - Manually change the styling of the group of checkboxes by passing in a className.  Allows the use of custom CSS.
 * @property {String} [inputLabelContainer=''] - Manually change the styling of each individual input and label by passing in a className.  Allows the use of custom CSS.
 * @property {Object} [register] - React Hook From property that handles input changes and validation
 * @property {Object} [rules] - React Hook From property tied to register that handles validation
 * @property {String} [type='text'] - Type of input
 * @property {JSX} [children] - Any children to be rendered below the component
 * @property {Boolean} [inline] - Shows inline validation message instead of on alert
 * @returns {JSX} Input Component
 */

const MultiCheck = forwardRef((props, ref) => {
    const {
        ariaLabel,
        error,
        label,
        required,
        name,
        options,
        labelClass,
        containerClass,
        type,
        inline,
        checkBoxGroupClass,
        inputLabelContainer,
        register,
        rules,
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
        <Form.Group controlId={name} className={containerClass} aria-label={ariaLabel}>
            {label && (
                <>
                    <Form.Label className={`${classes.labelFont} ${labelClass}`}>{required ? requiredLabel : label}</Form.Label>
                    <Validation inline={inline} touched={!!error} validationMessage={message} />
                </>
            )}
            <div className={`${classes.checkBoxGroupClass} ${checkBoxGroupClass}`}>
                {options?.map((option) => (
                    <div key={option.value} className={`${classes.inputLabelContainer} ${inputLabelContainer}`}>
                        <input type={type} value={option.value} disabled={option.disabled} {...register(`${name}`, rules)} />
                        <label htmlFor={option.value}>{option.label}</label>
                    </div>
                ))}
            </div>
        </Form.Group>
    );
});

MultiCheck.displayName = 'MultiCheck';

MultiCheck.defaultProps = {
    error: null,
    ariaLabel: '',
    name: '',
    type: 'text',
};

MultiCheck.propTypes = {
    ariaLabel: PropTypes.string,
    checkBoxGroupClass: PropTypes.string,
    containerClass: PropTypes.string,
    error: PropTypes.object,
    inline: PropTypes.bool,
    inputLabelContainer: PropTypes.string,
    label: PropTypes.string,
    labelClass: PropTypes.string,
    name: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.object),
    register: PropTypes.object,
    required: PropTypes.bool,
    rules: PropTypes.object,
    type: PropTypes.string,
};

export default MultiCheck;
