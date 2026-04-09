import React, { useState } from 'react';
import Modal from '../../../components/Modal/Modal';
import { Trash } from 'react-bootstrap-icons';
import classes from './StudyRegistrationDash.module.scss';
import PropTypes from 'prop-types';

/**
 * Modal that shows the other files in the bundle which will be deleted upon action taken.
 * @param {Object} props - Object with all of the properties used within the react component, listed below.
 * @property {Number} fileId - File ID of one of the files in a given bundle
 * @property {String} currentFile - The file that was in the validation table that we are taking action on
 * @property {Function} setFiles - Sets what files should be shown in the validation screen
 * @property {Array} files - The files that have errors and are shown in the validation screen
 * @property {String} variant - Variant for conditional rending of the body in the modal
 * @property {Number} submissionId - the Id of the current submission
 * @returns {JSX} DeleteStudyRegModal component
 */

const DeleteStudyRegModal = (props) => {
    let { handleDelete, studyId, bodyComp, closeButtonLabel, modalTitle } = props;
    const [openModal, setOpenModal] = useState(false);

    const openButtonLabel = <Trash className={classes.deletion} />;

    return (
        <>
            <Modal
                buttonLabel={closeButtonLabel}
                openButtonLabel={openButtonLabel}
                openButtonSize="medium"
                openButtonStyle={classes.deletion}
                closeButtonStyle={classes.downloadReport}
                handlePrimaryAction={() => handleDelete(studyId)}
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

DeleteStudyRegModal.propTypes = {
    handleDelete: PropTypes.func,
    studyId: PropTypes.number,
    study: PropTypes.string,
};

export default DeleteStudyRegModal;
