import React from 'react';
import PropTypes from 'prop-types';
import { Stepper } from 'react-form-stepper';
import classes from './FormStepper.module.scss';

/**
 * Form Stepper for identifying steps in a form
 * react-form-stepper handles styling via the styleConfig object prop
 * https://www.npmjs.com/package/react-form-stepper
 * @param {Object} props - Object with all of the properties used within the react component, listed below.
 * @property {Integer} activeStep - Step that you are currently on in the form, 0 indexed
 * @property {Array(Objects)} steps - The steps of the form with their labels for the bubbles
 * @property {Object} styleConfig - The object that holds styling for the form stepper
 * @property {String} ariaLabel - The 508 compliance label for the component
 * @returns {JSX} FormStepper Component
 */

const FormStepper = (props) => {
    const { ariaLabel, activeStep, steps, styleConfig } = props;

    return (
        <div className={classes.stepperContainer}>
            <Stepper activeStep={activeStep} steps={steps} styleConfig={styleConfig} aria-label={ariaLabel} />
        </div>
    );
};

FormStepper.defaultProps = {
    styleConfig: {
        activeBgColor: '#003E70',
        completedBgColor: '#003E70',
        inactiveTextColor: '#003E70',
        inactiveBgColor: '#DEDEDE',
        fontWeight: 700
    },
};

FormStepper.propTypes = {
    activeStep: PropTypes.number,
    ariaLabel: PropTypes.string,
    steps: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string,
        })
    ).isRequired,
    styleConfig: PropTypes.shape({
        activeBgColor: PropTypes.string,
        completedBgColor: PropTypes.string,
        inactiveBgColor: PropTypes.string,
    })
};

export default FormStepper;
