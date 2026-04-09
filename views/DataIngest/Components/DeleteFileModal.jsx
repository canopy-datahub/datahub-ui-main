import React, { useState } from 'react';
import Modal from '../../../components/Modal/Modal';
import classes from '../DataIngest.module.scss';
import { DELETE_MULTIPLE_FILES } from '../../../constants/apiRoutes';
import useRest from '../../../lib/hooks/useRest';
import PropTypes from 'prop-types';
import { Trash } from 'react-bootstrap-icons';

/**
 * Modal that shows validation errors in the data ingest form that allows users to upload data files for studies
 * @param {Object} props - Object with all of the properties used within the react component, listed below.
 * @property {Number} fileId - the ID of the file we are looking at validation warnings for
 * @property {Array{Object}} files - An array of objects of user submissions
 * @property {Function} setFiles - Function to set userSubmissions
 * @property {String} fileName - the name of the file for the modal information
 * @returns {JSX} DeleteSubmissionModal component
 */

const DeleteFileModal = (props) => {
    const { fileId, fileName, files, setFiles } = props;
    const [openModal, setOpenModal] = useState(false);

    const { restDelete } = useRest();

    const handleDeleteFile = async (fileId) => {
        const deleteFileResult = await restDelete(DELETE_MULTIPLE_FILES, {
            showLoading: true,
            showSuccess: true,
            successMessage: `Successfully deleted file ${fileName}`,
            errorMessage: 'Error with deleting file',
            data: fileId,
        });

        if (deleteFileResult.status === 200) {
            setTimeout(function () {
                const fileArr = Array.from(files);
                let newFileArr;
                if (fileArr[0].dataFileId) {
                    newFileArr = fileArr.filter((file) => file.dataFileId !== fileId);
                } else {
                    newFileArr = fileArr.filter((file) => file.id !== fileId);
                }
                setFiles([...newFileArr]);
                setOpenModal(!openModal);
            }, 500);
        }
    };

    const bodyComp = (
        <div className={`${classes.textContent} ${classes.sftpModalContent}`}>
            You are about to delete file <b>{fileName}</b>. Please confirm below to delete your file.
        </div>
    );

    const openButtonLabel = <Trash className={classes.deletion} />;
    const closeButtonLabel = <span>Delete File</span>;
    const modalTitle = (
        <div>
            <span>Confirm File Deletion</span>
        </div>
    );

    return (
        <>
            <Modal
                buttonLabel={closeButtonLabel}
                openButtonLabel={openButtonLabel}
                openButtonSize="medium"
                openButtonStyle={classes.deletion}
                handlePrimaryAction={() => handleDeleteFile(fileId)}
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

DeleteFileModal.propTypes = {
    fileId: PropTypes.number,
    fileName: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number,
            name: PropTypes.string
        })
    ),
    files: PropTypes.number,
    setFiles: PropTypes.func,
};

export default DeleteFileModal;
