/* eslint-disable max-len */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Container } from 'react-bootstrap';
import { CheckCircle, ExclamationTriangleFill, DashLg } from 'react-bootstrap-icons';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import useRest from '../../lib/hooks/useRest';
import classes from './StudyFileSubmissions.module.scss';
import Banner from '../../components/Banner/Banner';
import Button from '../../components/Button/Button';
import Table from '../../components/Table/Table';
import Alert from '../../components/Notifications/Alert';
import { submissionsTableColumns } from './Components/DetailsPageColumnDef';
import RejectModal from './Components/RejectModal';
import { SUBMIT_STUDY_FILE_REVIEW, DOWNLOAD_STUDY_FILES } from '../../constants/apiRoutes';
import { downloadLink } from '../../lib/pageHelpers/downloadLink';
import DownloadIcon from '../../components/Images/svg/DownloadIcon';

/**
 * View for the Study File Submission Details Page
 *
 * @property {String} submissionId - ID of study file submission
 * @property {Object} studySubmissionInfo - Information of study file submission. Includes study name, phs, dcc, dcc rep, and the submitted bundle(s)
 * @property {String} baseUrl - base url for donwloading the study files as a zip
 * @returns {Node} object rendering the Study File Submission Details Page
 */

const StudyFileSubmissionDetailsPage = (props) => {
    const { submissionId, studySubmissionInfo, baseUrl } = props;
    const [rejectedBundles, setRejectedBundles] = useState([]);
    const [rejectModalVisible, setRejectModalVisible] = useState(false);
    const closeRejectModal = () => {
        setRejectModalVisible(false);
    };

    const { restPost, restGet } = useRest();
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm({
        mode: 'onSubmit',
        reValidateMode: 'onSubmit',
    });

    const crumbs = [
        {
            page: 'Home',
            pageLink: '/',
            ariaLabel: 'Link to Homepage',
        },
        {
            page: 'Study File Submissions',
            pageLink: '/studyFileSubmissions',
            ariaLabel: 'Study File Submissions',
        },
        {
            page: `#${submissionId}`,
            ariaLabel: `#${submissionId}`,
        },
    ];

    function getAllIndexes(arr, val) {
        const indexes = [];
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] === val) {
                indexes.push(i);
            }
        }
        return indexes;
    }

    // Submit full form
    const handleFormSubmit = async (data) => {
        const updatedBundles = [];

        studySubmissionInfo?.bundles?.forEach((bundle) => {
            if (rejectedBundles.includes(bundle.sourceFileName)) {
                updatedBundles.push({ ...bundle, reviewDecision: 'rejected' });
            } else {
                updatedBundles.push({ ...bundle, reviewDecision: 'approved' });
            }
        });

        const body = {
            fileRejectionReason: data ? data.comment : '',
            submissionDetails: { ...studySubmissionInfo, bundles: updatedBundles },
        };

        const submitReviewResponse = await restPost(SUBMIT_STUDY_FILE_REVIEW, body, {
            showLoading: true,
            showSuccess: true,
            successMessage: 'Successfully submitted study file submission review',
            errorMessage: 'Error with submitting study file submission review',
        });
        if (submitReviewResponse.status === 200) {
            setTimeout(function () {
                router.push('/studyFileSubmissions');
            }, 500);
        }
    };

    // On initial form submit, determine if Reject modal needs to appear
    const onSubmit = (data) => {
        if (Object.values(data).includes('Reject')) {
            const temp = [];
            const rejectRows = getAllIndexes(Object.values(data), 'Reject');
            rejectRows.forEach((rowId) => temp.push(studySubmissionInfo.bundles[rowId].sourceFileName));

            setRejectedBundles([...temp]);
            setRejectModalVisible(true);
        } else {
            handleFormSubmit();
        }
    };

    // Apply Accept or Reject all rows, using the react hook form's field registered name
    const applyToAll = (acceptance) => {
        const numOfRows = studySubmissionInfo.bundles.length;
        for (let i = 0; i < numOfRows; i++) {
            setValue(`acceptance-${i}`, acceptance);
        }
    };

    // TODO: Download all files API call

    return (
        <>
            <Banner
                title={`Study File Submission #${submissionId}`}
                manualCrumbs={crumbs}
                variant="lab4"
                ariaLabel="Study File Submission Breadcrumb"
                topic="Studies"
            />
            {Object.keys(studySubmissionInfo).length === 0 && (
                <Container className={classes.Container}>This submission ID does not exist</Container>
            )}
            {Object.keys(studySubmissionInfo).length && (
                <>
                    {Object.keys(errors).length > 0 && (
                        <Alert variant="danger" dismissible className={classes.alert}>
                            <Container>
                                {Object.keys(errors).map((error, index) => {
                                    return (
                                        <Row key={index} className="py-1">
                                            <Col className={classes.errorText}>Error: {errors[error]?.message}</Col>
                                        </Row>
                                    );
                                })}
                            </Container>
                        </Alert>
                    )}

                    <Container className={classes.Container}>
                        <Row className={classes.topInfo}>
                            <Col lg={12} xl={6}>
                                <div className={`${classes.details} narrowTextBackground`}>
                                    <div>
                                        <b>Study Name:</b> {studySubmissionInfo.studyName}
                                    </div>
                                    <div>
                                        <b>Center:</b> {studySubmissionInfo.center}
                                    </div>
                                </div>
                            </Col>
                            <Col lg={12} xl={6}>
                                <div className={classes.referenceBox}>
                                    <b>
                                        <span className={classes.red}>*</span> Note for Reference:
                                    </b>
                                    <div className={classes.indented}>
                                        <div>
                                            <span className={classes.acknowledgedCheck}>
                                                <ExclamationTriangleFill />
                                            </span>{' '}
                                            Indicates a file has validation warnings
                                        </div>
                                        <div>
                                            <span className={classes.validationCheck}>
                                                <CheckCircle />
                                            </span>{' '}
                                            Indicates a file has passed a validation check
                                        </div>
                                        <div>
                                            <span className={classes.notApplicable}>
                                                <DashLg />
                                            </span>{' '}
                                            Indicates the validation type is not applicable to a file
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                    <Container className={classes.Container}>
                        <div className={classes.buttons}>
                            <Button
                                className={classes.download}
                                label="Download All Files"
                                iconLeft={<DownloadIcon />}
                                variant="secondary"
                                size="auto"
                                handleClick={async () => {
                                    downloadLink(`${baseUrl}${DOWNLOAD_STUDY_FILES}${submissionId}`, restGet);
                                }}
                            ></Button>
                            <span className={classes.acceptRejectAll}>
                                <Button label="Accept All" variant="primary" size="auto" handleClick={() => applyToAll('Accept')}></Button>
                                <Button label="Reject All" variant="primary" size="auto" handleClick={() => applyToAll('Reject')}></Button>
                            </span>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Table
                                className={classes.tableContainer}
                                tableRows={studySubmissionInfo.bundles}
                                tableHeaders={submissionsTableColumns(register, errors)}
                                ariaCaption="Submitted Bundles Table"
                                noHover
                                responsive={false}
                            ></Table>
                            <div className={classes.submit}>
                                <Button type="submit" label="Submit" variant="primary" size="auto"></Button>
                            </div>
                        </form>
                    </Container>
                    <RejectModal
                        visible={rejectModalVisible}
                        closeModal={closeRejectModal}
                        rejectedBundles={rejectedBundles}
                        handleFormSubmit={handleFormSubmit}
                    />
                </>
            )}
        </>
    );
};

StudyFileSubmissionDetailsPage.propTypes = {
    baseUrl: PropTypes.string,
    studySubmissionInfo: PropTypes.object,
    submissionId: PropTypes.string,
};

export default StudyFileSubmissionDetailsPage;
