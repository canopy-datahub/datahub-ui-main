import React, { useState } from 'react';
import Modal from '../../../components/Modal/Modal';
import classes from '../DataIngest.module.scss';
import PropTypes from 'prop-types';
import useRest from '../../../lib/hooks/useRest';
import { DI_SUBMIT } from '../../../constants/apiRoutes';
import { useRouter } from 'next/router';

/**
 * Modal that shows validation errors in the data ingest form that allows users to upload data files for studies
 * @param {Object} props - Object with all of the properties used within the react component, listed below.
 * @property {String} studyName - Name of the study the submission is for
 * @property {Number} submissionId - The ID of the submission
 * @returns {JSX} FinalSubmissionModal component
 */

const FinalSubmissionModal = (props) => {
    const { submissionId, studyName } = props;
    const [openSubmitModal, setOpenSubmitModal] = useState(false);
    const { restPost } = useRest();
    const router = useRouter();
    const bodyComp = (
        <div className={classes.textContent}>
            <p>You are about to submit a file package with the following details:</p>
            <span>
                <b>Submission ID:</b> {submissionId}
            </span>
            <br />
            <p>
                <b>Study:</b> {studyName}
            </p>
            <br />
            <p>
                Upon clicking the button below, your submission will be subject to review by our Data Curators. Click 'Submit' to complete your submission.
            </p>
            <hr />
        </div>
    );

    const openButtonLabel = <span className={classes.finalSubmissionButton}>Submit</span>;
    const closeButtonLabel = <span className={classes.submitModalButton}>Submit</span>;
    const modalTitle = (
        <div>
            <span>Confirm Submission</span>
        </div>
    );

    const submitSubmission = async () => {
        const body = {
            submissionId: parseInt(submissionId),
        };
        const submitResult = await restPost(DI_SUBMIT, body, {
            showLoading: true,
            showSuccess: true,
            successMessage: 'Successfully submitted submission',
            errorMessage: 'Error refreshing token',
        });
        if (submitResult.status === 200 || submitResult.status === 201) {
            setTimeout(function () {
                setOpenSubmitModal(!openSubmitModal);
                router.push('/submitterDashboard');
            }, 500);
        }
    };

    return (
        <>
            <Modal
                buttonLabel={closeButtonLabel}
                openButtonLabel={openButtonLabel}
                openButtonSize="medium"
                openButtonStyle={classes.finalSubmissionButton}
                closeButtonStyle={classes.downloadReport}
                handlePrimaryAction={submitSubmission}
                title={modalTitle}
                backdrop={true}
                size="lg"
                show={openSubmitModal}
                setShow={setOpenSubmitModal}
            >
                {bodyComp}
            </Modal>
        </>
    );
};

FinalSubmissionModal.propTypes = {
    studyName: PropTypes.string,
    submissionId: PropTypes.number,
};

export default FinalSubmissionModal;
