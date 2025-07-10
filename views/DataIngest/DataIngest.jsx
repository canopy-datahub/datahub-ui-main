/* eslint-disable multiline-ternary */
import React, { useState } from 'react';
import DataIngestForm from './Components/Form/DataIngestForm';
import Banner from '../../components/Banner/Banner';
import { Container } from 'react-bootstrap';
import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';
import _ from 'lodash';
import classes from './DataIngest.module.scss';
import { Check } from 'react-bootstrap-icons';

/**
 * The container shell of Data ingest form
 * @param {Array(Object)} props - Object with all of the properties used within the react component, listed below.
 * @property {Array(Object)} studiesData - Array of all objects with all studies for the study select dropdown in upload files
 * @property {Array(Object)} categoriesData - Array of all objects for file type dropdowns in categorize files step
 * @property {Object} submissionData - Object holding current step and description of step
 * @property {Array(Object)} uploadedFilesData - Array of objects which holds all files that have been uploaded to this submission thus far
 * @property {Number} submissionId - id of the submission we are working with
 * @property {Object} bundlesData - Files of the submission prebundled by the backend
 * @property {Object} reviewBundlesData - The finalized bundle strucutre of the files in the submission
 * @property {Object} reviewStudyData - The information related to what study the submission is for
 * @property {String} baseUrl - The url used for downloading files
 * @property {String} fileUploadSOP - The URL for the File Upload SOP.
 * @returns {JSX} DataIngest component
 */

const DataIngest = (props) => {
    const {
        studiesData,
        categoriesData,
        submissionData,
        uploadedFilesData,
        submissionId,
        bundlesData,
        reviewBundlesData,
        reviewStudyData,
        baseUrl,
        fileUploadSOP,
    } = props;
    const DIFormStepper = dynamic(() => import('../../components/FormStepper/FormStepper'), { ssr: false });

    const currentStep = _.isEmpty(submissionData) ? 0 : submissionData.id - 1;
    const [activeStep, setActiveStep] = useState(currentStep);
    const uploadFilesLabel =
        activeStep > 0 ? (
            <span className={classes.stepper}>
                Upload Files <Check className={classes.completeStep} />
            </span>
        ) : (
            <span className={classes.stepper}>Upload Files</span>
        );
    const categorizeLabel =
        activeStep > 1 ? (
            <span className={classes.stepper}>
                Categorize Files <Check className={classes.completeStep} />
            </span>
        ) : (
            <span className={classes.stepper}>Categorize Files</span>
        );
    const validationLabel =
        activeStep > 2 ? (
            <span className={classes.stepper}>
                Validation <Check className={classes.completeStep} />
            </span>
        ) : (
            <span className={classes.stepper}>Validation</span>
        );
    const reviewLabel =
        activeStep > 3 ? (
            <span className={classes.stepper}>
                Review & Submit <Check className={classes.completeStep} />
            </span>
        ) : (
            <span className={classes.stepper}>Review & Submit</span>
        );

    // the steps of the form, this is where we can add more steps

    const steps = [{ label: uploadFilesLabel }, { label: categorizeLabel }, { label: validationLabel }, { label: reviewLabel }];

    const crumbs = [
        {
            page: 'Home',
            pageLink: '/',
            ariaLabel: 'home',
        },
        {
            page: 'Upload Study Files',
            pageLink: '/dataIngest',
            ariaLabel: 'upload study files',
        },
    ];

    return (
        <>
            <Banner title="Upload Study Files" manualCrumbs={crumbs} variant="virus6" ariaLabel="Data Ingest Breadcrumb" />
            <Container>
                <DIFormStepper activeStep={activeStep} steps={steps} className={classes.stepper} />
            </Container>
            <hr />
            <DataIngestForm
                activeStep={activeStep}
                setActiveStep={setActiveStep}
                totalSteps={steps.length}
                studies={studiesData}
                fileTypes={categoriesData}
                submissionData={submissionData}
                uploadedFiles={uploadedFilesData}
                submissionId={submissionId}
                bundlesData={bundlesData}
                reviewBundlesData={reviewBundlesData}
                reviewStudyData={reviewStudyData?.studies}
                baseUrl={baseUrl}
                fileUploadSOP={fileUploadSOP}
            />
        </>
    );
};

DataIngest.propTypes = {
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
    categoriesData: PropTypes.objectOf(
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
        dcc: PropTypes.string,
        studyId: PropTypes.string,
        studies: PropTypes.object,
    }),
    studiesData: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string,
            name: PropTypes.string,
        })
    ),
    submissionData: PropTypes.shape({
        id: PropTypes.number,
        description: PropTypes.string,
    }),
    submissionId: PropTypes.number,
    uploadedFilesData: PropTypes.arrayOf(
        PropTypes.shape({
            fileName: PropTypes.string,
            checksumHash: PropTypes.string,
            dataFileId: PropTypes.number,
            uploadSuccessful: PropTypes.bool,
        })
    ),
};

export default DataIngest;
