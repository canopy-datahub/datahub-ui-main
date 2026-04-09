import React, { useState } from 'react';
import Modal from '../../../components/Modal/Modal';
import classes from '../SubmitterDashboard.module.scss';
import { SUBMITTER_DELETE_SUBMISSION } from '../../../constants/apiRoutes';
import useRest from '../../../lib/hooks/useRest';
import PropTypes from 'prop-types';
import { Trash } from 'react-bootstrap-icons';
import { useRouter } from 'next/router';

/**
 * Modal that shows validation errors in the data ingest form that allows users to upload data files for studies
 * @param {Object} props - Object with all of the properties used within the react component, listed below.
 * @property {Number} submissionId - the ID of the file we are looking at validation warnings for
 * @property {Array{Object}} userSubmissions - An array of objects of user submissions
 * @property {Function} setUserSubmissions - Function to set userSubmissions
 * @returns {JSX} DeleteSubmissionModal component
 */

const DeleteSubmissionModal = (props) => {
    const { submissionId } = props;
    const [openModal, setOpenModal] = useState(false);

    const { restDelete } = useRest();
    const router = useRouter();

    const deleteSubmission = async () => {
        const deleteSubmissionResult = await restDelete(SUBMITTER_DELETE_SUBMISSION, {
            showLoading: true,
            showSuccess: true,
            successMessage: `Successfully deleted submission ${submissionId}`,
            errorMessage: `Error deleting submission ${submissionId}`,
            data: parseInt(submissionId),
        });
        if (deleteSubmissionResult.status === 200) {
            setOpenModal(!openModal);
            router.reload();
        }
    };

    const bodyComp = (
        <div className={`${classes.textContent} ${classes.sftpModalContent}`}>
            You are about to delete an entire submission package. This will permantly delete all files in the package. This cannot be
            undone.
        </div>
    );

    const openButtonLabel = <Trash className={classes.deletion} />;
    const closeButtonLabel = <span>Delete Submission</span>;
    const modalTitle = (
        <div>
            <span>Confirm Delete</span>
        </div>
    );

    return (
        <>
            <Modal
                buttonLabel={closeButtonLabel}
                openButtonLabel={openButtonLabel}
                openButtonSize="medium"
                openButtonStyle={classes.deletion}
                handlePrimaryAction={() => deleteSubmission()}
                title={modalTitle}
                backdrop={true}
                size="lg"
                show={openModal}
                setShow={setOpenModal}
            >
                {bodyComp}
            </Modal>
        </>
    );
};

DeleteSubmissionModal.propTypes = {
    setUserSubmissions: PropTypes.func,
    submissionId: PropTypes.number,
    userSubmissions: PropTypes.arrayOf(
        PropTypes.shape({
            creationDate: PropTypes.date,
            id: PropTypes.number,
            status: PropTypes.string,
            studyName: PropTypes.string,
        })
    ),
};

export default DeleteSubmissionModal;
