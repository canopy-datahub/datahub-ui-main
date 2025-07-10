import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { renderNextButton, renderPreviousButton, renderSaveButton } from '../../../../lib/DataIngest/FormBase/formControlUtils';
import classes from './DataIngestForm.module.scss';
import PropTypes from 'prop-types';

/**
 * The bottom of the data ingest form that holds the
 * @param {Object} props - Object with all of the properties used within the react component, listed below.
 * @property {Integer} activeStep - Number step of the form that the user is on
 * @property {Function} setActiveStep - function to set the active step of the form the user is on
 * @property {Integer} totalSteps - total number of steps in the form
 * @property {Boolean} disabled - whether or not one or some of the buttons in the navigation are disabled
 * @property {Integer} submissionId - the Id of the submission we are currently working on
 * @property {Function} handleNextPage - The onClick function for the next page button
 * @property {Function} handlePrevious - The onClick function for the previous page button
 * @property {Function} handleSave - The onClick function for the save button on validation step
 * @property {Boolean} isValidated - checks whether validation has already happened for a submission
 * @property {Boolean} renderSave - whether to render the save button on validation step - dont do so if theres no files to take action on
 * @returns {JSX} DataIngestFormNavigation component
 */

const DataIngestFormNavigation = (props) => {
    const { activeStep, totalSteps, disabled, handleNextPage, handleSave, isValidated, handlePrevious, renderSave } = props;
    return (
        <Row className={classes.buttonGroup}>
            <Col className={classes.previousButton}>
                {renderPreviousButton(activeStep, handlePrevious)}
                {renderSave && (renderSaveButton(activeStep, isValidated, handleSave))}
            </Col>
            <Col className={classes.nextButton}>{renderNextButton(activeStep, totalSteps, disabled, handleNextPage)}</Col>
        </Row>
    );
};

DataIngestFormNavigation.propTypes = {
    activeStep: PropTypes.number,
    disabled: PropTypes.bool,
    handleNextPage: PropTypes.func,
    handlePrevious: PropTypes.func,
    handleSave: PropTypes.func,
    isValidated: PropTypes.bool,
    renderSave: PropTypes.bool,
    totalSteps: PropTypes.number,
};
 
export default DataIngestFormNavigation;
