/* eslint-disable multiline-ternary */
import React, { useState, useEffect } from 'react';
import DataIngestForm from './Components/Form/DataIngestForm';
import Banner from '../../components/Banner/Banner';
import { Container } from 'react-bootstrap';
import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';
import _ from 'lodash';
import classes from './DataIngest.module.scss';
import { Check } from 'react-bootstrap-icons';
import useRest from '../../lib/hooks/useRest';
import useKeycloak from '../../lib/hooks/useKeycloak';
import { useRouter } from 'next/router';

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
        studiesData: studiesDataProp,
        categoriesData: categoriesDataProp,
        submissionData: submissionDataProp,
        uploadedFilesData: uploadedFilesDataProp,
        submissionId: submissionIdProp,
        bundlesData: bundlesDataProp,
        reviewBundlesData: reviewBundlesDataProp,
        reviewStudyData: reviewStudyDataProp,
        baseUrl,
        fileUploadSOP,
    } = props;
    const DIFormStepper = dynamic(() => import('../../components/FormStepper/FormStepper'), { ssr: false });
    const { restGet } = useRest();
    const { token } = useKeycloak();
    const router = useRouter();

    const [studiesData, setStudiesData] = useState(studiesDataProp || []);
    const [categoriesData, setCategoriesData] = useState(categoriesDataProp || {});
    const [submissionData, setSubmissionData] = useState(submissionDataProp || {});
    const [uploadedFilesData, setUploadedFilesData] = useState(uploadedFilesDataProp || {});
    const [submissionId] = useState(submissionIdProp);
    const [bundlesData, setBundlesData] = useState(bundlesDataProp || {});
    const [reviewBundlesData, setReviewBundlesData] = useState(reviewBundlesDataProp || {});
    const [reviewStudyData, setReviewStudyData] = useState(reviewStudyDataProp || {});

    // Fetch studies + categories for new submissions (no submissionId)
    useEffect(() => {
        if (!token || submissionId) return;
        restGet('/api/launch/DataIngest/DataIngestConfig', { showLoading: true })
            .then((response) => {
                const data = response?.data?.data;
                if (data) {
                    if (Array.isArray(data.studiesData)) setStudiesData(data.studiesData);
                    if (data.categoriesData && typeof data.categoriesData === 'object') setCategoriesData(data.categoriesData);
                }
            })
            .catch((e) => console.error('Failed to load data ingest config', e));
    }, [token, submissionId]);

    // Fetch submission-specific data when resuming an existing submission
    useEffect(() => {
        if (!token || !submissionId) return;
        restGet(`/api/launch/DataIngest/DataIngestSubmissionData?submissionId=${submissionId}`, { showLoading: true })
            .then((response) => {
                const data = response?.data?.data;
                if (!data) return;
                if (data.isCompleted) {
                    router.replace('/submitterDashboard');
                    return;
                }
                setSubmissionData(data.submissionData || {});
                setUploadedFilesData(data.uploadedFilesData || {});
                setCategoriesData(data.categoriesData || {});
                setBundlesData(data.bundlesData || {});
                setReviewBundlesData(data.reviewBundlesData || {});
                setReviewStudyData(data.reviewStudyData || {});
            })
            .catch((e) => console.error('Failed to load submission data', e));
    }, [token, submissionId]);

    const currentStep = _.isEmpty(submissionData) ? 0 : submissionData.id - 1;
    const [activeStep, setActiveStep] = useState(currentStep);

    // Sync active step when submission data loads client-side
    useEffect(() => {
        if (!_.isEmpty(submissionData)) {
            setActiveStep(submissionData.id - 1);
        }
    }, [submissionData]);
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
            <Banner title="Upload Study Files" manualCrumbs={crumbs} variant="lab6" ariaLabel="Data Ingest Breadcrumb" />
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
        upload: PropTypes.array,
        studies: PropTypes.shape({
            studyId: PropTypes.number,
            center: PropTypes.string,  // Contains study name formatted as "(studyId) Title"
        }),
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
