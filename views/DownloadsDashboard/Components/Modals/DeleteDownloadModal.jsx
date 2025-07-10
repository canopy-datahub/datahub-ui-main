import React, { useState } from 'react';
import Modal from '../../../../components/Modal/Modal';
import classes from './DeleteDownloadModal.module.scss';
import { UPLOAD_FILE_DELETION } from '../../../../constants/apiRoutes';
import useRest from '../../../../lib/hooks/useRest';
import PropTypes from 'prop-types';
import { Trash } from 'react-bootstrap-icons';
import { useRouter } from 'next/router';

/**
 * Modal that shows confirmation modal to delete uploaded file package from study portal
 * @property {Number} uploadID - the ID of the file package to be deleted
 * @returns {JSX} Delete Download Modal component
 */

const DeleteDownloadModal = (props) => {
    const { uploadID } = props;
    const [openModal, setOpenModal] = useState(false);

    const { restDelete } = useRest();
    const router = useRouter();

    const deleteSubmission = async () => {
        const deleteSubmissionResult = await restDelete(UPLOAD_FILE_DELETION, {
            showLoading: true,
            showSuccess: true,
            successMessage: `Successfully deleted submission ${uploadID}`,
            errorMessage: `Error deleting submission ${uploadID}`,
            data: parseInt(uploadID),
        });
        if (deleteSubmissionResult.status === 200) {
            setOpenModal(!openModal);
            router.reload();
        }
    };

    const bodyComp = (
        <div className={classes.textContent}>
            You are about to delete an entire upload package. This will permantly delete all files in the package. This cannot be undone.
        </div>
    );

    const openButtonLabel = <Trash className={classes.deletion} />;
    const closeButtonLabel = <span>Delete File Package</span>;
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

DeleteDownloadModal.propTypes = {
    uploadID: PropTypes.number,
};

export default DeleteDownloadModal;
