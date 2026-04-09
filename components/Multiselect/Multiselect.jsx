import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import classes from './Multiselect.module.scss';
import Validation from '../Input/Validation/Validation';
import { Form } from 'react-bootstrap';
import { Controller } from 'react-hook-form';

/**
 * Interactable MultiSelect component
 * * See https://react-select.com/home for examples and documentation
 * * https://react-select.com/styles#inner-components for styling this component

 * @param {Object} props - Object with all of the properties used within the react component, listed below.
 * @property {String} [ariaLabel=''] - Replaces what is read to the screenreader
 * @property {String} error - Applies a error message for the user to see
 * @property {String} label - Label shown on the button
 * @property {Boolean} [required] - Assigns if the field is required or not
 * @property {String} name - Defines the name of the Select
 * @property {Boolean} [disabled] - Disables the Select field
 * @property {Array{Object}} [defaultValue=''] - loads in the default data
 * @property {Object} control - React-Hook-Form Control interface for the form you are putting this in
 * @property {Object} [validationRules] - set of validation rules that React-Hook-Form can utilize with the controller
* @property {String} valueProp - Defines the value of the Select items inside its options array
 * @property {String} labelProp - Defines the label of the Select items inside its options array
 * @property {String} [containerClass=''] - Manually change the styling of the Select group by passing in a className.  Allows the use of custom CSS.
 * @property {String} [labelClass=''] - Manually change the styling of the label by passing in a className.  Allows the use of custom CSS.
 * @property {Array} options - Array of objects that contain page label and value for the Select
 * @property {Boolean} [inline] - Shows inline validation message instead of on alert
 * @returns {JSX} MultiSelect Component
 */

const Multiselect = forwardRef((props, ref) => {
    const {
        ariaLabel,
        error,
        label,
        required,
        name,
        control,
        disabled,
        containerClass,
        labelClass,
        options,
        inline,
        defaultValue,
        validationRules,
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
        <Form.Group controlId={name} className={`${classes.selectContainer} ${containerClass}`}>
            {label && (
                <div>
                    <Form.Label className={`${classes.labelFont} ${labelClass}`}>{required ? requiredLabel : label}</Form.Label>
                    <Validation inline={inline} touched={!!error} errorMessage={message} />
                </div>
            )}
            <Controller
                name={name}
                control={control}
                defaultValue={defaultValue}
                rules={validationRules}
                render={({ field }) => (
                    <Select
                        id={name}
                        {...field}
                        isMulti
                        aria-label={ariaLabel}
                        styles={{
                            control: (styles) => ({
                                ...styles,
                                borderColor: !error ? 'black' : '#ff5353',
                                borderWidth: !error ? '1px' : '2px',
                                borderRadius: '7px',
                                '&:hover': {
                                    borderColor: '#00889d',
                                },
                            }),
                            placeholder: (styles) => ({
                                ...styles,
                                color: 'black',
                            }),
                            dropdownIndicator: (styles) => ({
                                ...styles,
                                color: 'black',
                            }),
                        }}
                        name={name}
                        ref={ref}
                        isDisabled={disabled}
                        options={options}
                    />
                )}
            />
        </Form.Group>
    );
});

Multiselect.displayName = 'Select';

Multiselect.propTypes = {
    ariaLabel: PropTypes.string,
    containerClass: PropTypes.string,
    control: PropTypes.object,
    defaultValue: PropTypes.arrayOf(PropTypes.object),
    disabled: PropTypes.bool,
    error: PropTypes.object,
    inline: PropTypes.bool,
    label: PropTypes.string,
    labelClass: PropTypes.string,
    labelProp: PropTypes.string,
    name: PropTypes.string,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    options: PropTypes.arrayOf(PropTypes.object),
    required: PropTypes.bool,
    selectClass: PropTypes.string,
    validationRules: PropTypes.any,
    valueProp: PropTypes.string,
};

Multiselect.defaultProps = {
    containerClass: '',
    disabled: false,
    error: null,
    label: '',
    labelProp: 'label',
    options: [],
    required: false,
    selectClass: '',
    valueProp: 'value',
};

export default Multiselect;
