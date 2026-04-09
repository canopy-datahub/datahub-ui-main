import React from 'react';
import classes from './DataIngestForm.module.scss';
import { Container, Col, Row } from 'react-bootstrap';
import UploadFiles from './UploadFiles';
import CategorizeFiles from './CategorizeFiles';
import Validation from './Validation';
import ReviewSubmission from './ReviewSubmission';
import _ from 'lodash';
import PropTypes from 'prop-types';

/**
 * Data Ingest form that allows users to upload data files for studies
 * @param {Object} props - Object with all of the properties used within the react component, listed below.
 * @property {Number} activeStep - Step that you are currently on in the form, 0 indexed
 * @property {Function} setActiveStep - Function to set the current active step to keep track of step were on
 * @property {Number} totalSteps - How many steps in the form stepper in total
 * @property {Array(Object)} studies - Object that holds the studies data for the select study dropdown in upload step
 * @property {Array(Object)} fileTypes - Object that holds the file types for the dropdowns in the cateogorization step
 * @property {Array(Object)} uploadedFiles - Array holding the uploaded files for the current submission
 * @property {Number} submissionId - Integer of the submission id of the submission
 * @property {Object(Array(Object))} bundlesData - object with the data of bundles and unassigned files pre-categorized files
 * @property {Object(Array(Object))} reviewBundlesData - object with the data of bundles and unassigned files for review and submit
 * @property {Object} reviewStudyData - information on what study the submission is related to for review and submit
 * @property {String} baseUrl - Url used for helping download files
 * @property {String} fileUploadSOP - The URL for the File Upload SOP.
 * @returns {JSX} DataIngestForm component
 */

const DataIngestForm = (props) => {
    const {
        activeStep,
        setActiveStep,
        totalSteps,
        studies,
        fileTypes,
        uploadedFiles,
        submissionId,
        bundlesData,
        reviewBundlesData,
        reviewStudyData,
        submissionData,
        baseUrl,
        fileUploadSOP,
    } = props;

    const renderFormPage = (activeStep) => {
        let Component;
        switch (activeStep) {
            case 0:
                Component = (
                    <UploadFiles
                        studies={studies}
                        uploadedFiles={uploadedFiles?.upload}
                        isSubmissionCreated={_.isEmpty(uploadedFiles?.studies)}
                        subId={submissionId}
                        studySelected={uploadedFiles?.studies}
                        activeStep={activeStep}
                        setActiveStep={setActiveStep}
                        totalSteps={totalSteps}
                        fileUploadSOP={fileUploadSOP}
                        sftpKey={submissionData?.sftpKey}
                    />
                );
                break;
            case 1:
                Component = (
                    <CategorizeFiles
                        fileTypes={fileTypes}
                        activeStep={activeStep}
                        setActiveStep={setActiveStep}
                        totalSteps={totalSteps}
                        submissionId={submissionId}
                        bundlesData={bundlesData}
                    />
                );
                break;
            case 2:
                Component = (
                    <Validation
                        submissionId={submissionId}
                        activeStep={activeStep}
                        setActiveStep={setActiveStep}
                        totalSteps={totalSteps}
                        validated={submissionData.validated}
                        fileTypes={fileTypes}
                        baseUrl={baseUrl}
                    />
                );
                break;
            case 3:
                Component = (
                    <ReviewSubmission
                        submissionId={submissionId}
                        bundleFiles={reviewBundlesData}
                        studyInfo={reviewStudyData}
                        activeStep={activeStep}
                        setActiveStep={setActiveStep}
                        totalSteps={totalSteps}
                    />
                );
                break;
        }
        return Component;
    };

    return (
        <div>
            <Container className={classes.Container}>
                <Row className={`${classes.Row} mb-4`}>
                    <Col>{renderFormPage(activeStep)}</Col>
                </Row>
            </Container>
        </div>
    );
};

DataIngestForm.propTypes = {
    activeStep: PropTypes.number,
    baseUrl: PropTypes.string,
    bundlesData: PropTypes.shape({
        bundles: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.number,
                name: PropTypes.string,
                category: PropTypes.string,
                size: PropTypes.number,
                cdeValidation: PropTypes.bool,
                acknowledged: PropTypes.bool,
                piiPhiValidation: PropTypes.bool,
                childFiles: PropTypes.arrayOf(),
            })
        ),
        unassigned: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.number,
                name: PropTypes.string,
                category: PropTypes.string,
                size: PropTypes.number,
                cdeValidation: PropTypes.bool,
                acknowledged: PropTypes.bool,
                piiPhiValidation: PropTypes.bool,
                childFiles: PropTypes.arrayOf(),
            })
        ),
    }),
    fileTypes: PropTypes.objectOf(
        PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.number,
                name: PropTypes.string,
                categoryGroup: PropTypes.string,
            })
        )
    ),
    fileUploadSOP: PropTypes.string.isRequired,
    reviewBundlesData: PropTypes.shape({
        bundles: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.number,
                name: PropTypes.string,
                category: PropTypes.string,
                size: PropTypes.number,
                cdeValidation: PropTypes.bool,
                acknowledged: PropTypes.bool,
                piiPhiValidation: PropTypes.bool,
                childFiles: PropTypes.arrayOf(),
            })
        ),
        unassigned: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.number,
                name: PropTypes.string,
                category: PropTypes.string,
                size: PropTypes.number,
                cdeValidation: PropTypes.bool,
                acknowledged: PropTypes.bool,
                piiPhiValidation: PropTypes.bool,
                childFiles: PropTypes.arrayOf(),
            })
        ),
    }),
    reviewStudyData: PropTypes.shape({
        center: PropTypes.string,  // Contains study name formatted as "(studyId) Title"
        studyId: PropTypes.number,
    }),
    setActiveStep: PropTypes.func,
    studies: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string,
            name: PropTypes.string,
        })
    ),
    submissionData: PropTypes.shape({
        id: PropTypes.number,
        description: PropTypes.string,
        validated: PropTypes.bool,
        sftpKey: PropTypes.string,
    }),
    submissionId: PropTypes.number,
    totalSteps: PropTypes.number,
    uploadedFiles: PropTypes.arrayOf(
        PropTypes.shape({
            fileName: PropTypes.string,
            checksumHash: PropTypes.string,
            dataFileId: PropTypes.number,
            uploadSuccessful: PropTypes.bool,
        })
    ),
};

export default DataIngestForm;
