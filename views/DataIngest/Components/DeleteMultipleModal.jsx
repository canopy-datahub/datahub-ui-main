import React from 'react';
import Modal from '../../../components/GeneralModal/GeneralModal';
import classes from '../DataIngest.module.scss';
import { DELETE_MULTIPLE_FILES } from '../../../constants/apiRoutes';
import useRest from '../../../lib/hooks/useRest';
import PropTypes from 'prop-types';
import Button from '../../../components/Button/Button';

/**
 * Modal that shows validation errors in the data ingest form that allows users to upload data files for studies
 * @param {Object} props - Object with all of the properties used within the react component, listed below.
 * @property {Boolean} visible - whether the modal is visible or not
 * @property {Function} closeModal - function to close the modal
 * @property {Array{Object}} filesToDelete - An array of objects of user submissions
 * @property {Array(Object)} files - Array of the files that are in the uploaded files table
 * @property {Function} setFiles - Function to set files after deletion
 * @property {String} fileName - the name of the file for the modal information
 * @property {Function} setRowSelection - sets if rows are selected in the actual table
 * @returns {JSX} DeleteMultipleModal component
 */

const DeleteMultipleModal = (props) => {
    const { visible, closeModal, filesToDelete, files, setFiles, setRowSelection } = props;
    const { restDelete } = useRest();

    const handleDeleteMultiple = async () => {
        const fileField = filesToDelete.filter(file => file.dataFileId);
        let fileIds = fileField.map(file => file.dataFileId);
        const deleteFileResult = await restDelete(DELETE_MULTIPLE_FILES, {
            showLoading: true,
            showSuccess: true,
            successMessage: `Successfully deleted selected file(s)`,
            errorMessage: 'Error with deleting file',
            data: fileIds,
        });

        if (deleteFileResult.status === 200) {
            const fileArr = Array.from(files);
            const newFileArr = fileArr.filter(file => !fileIds.includes(file.dataFileId));
            setFiles([...newFileArr]);
            setRowSelection({});
        }
    };

    const bodyComp = (
        <div className={classes.modalBody}>
            <span>
                The following files are marked for deletion. Are you sure you would like to proceed?
            </span>
            <div>
                <ul>
                    {filesToDelete.map(file => <li key={file?.dataFileId}>{file?.fileName}</li>)}
                </ul>
            </div>
            <div className={classes.centered}>
                <Button
                    label="Delete File(s)"
                    variant="primary"
                    handleClick={() => {
                        handleDeleteMultiple();
                        closeModal();
                    }}
                ></Button>
            </div>
        </div>
    );

    return (
        <Modal
            show={visible}
            onHide={closeModal}
            closable={true}
            title="Confirm File Deletion"
            bodyChildren={bodyComp}
            dialogClassName={classes.modalWidth}
        />
    );
};

DeleteMultipleModal.propTypes = {
    closeModal: PropTypes.func,
    files: PropTypes.arrayOf(PropTypes.shape({
        dataFileId: PropTypes.number,
        fileName: PropTypes.string,
        fileSize: PropTypes.number,
    })),
    filesToDelete: PropTypes.arrayOf(PropTypes.string),
    setFiles: PropTypes.func,
    setRowSelection: PropTypes.func,
    visible: PropTypes.bool,
};

export default DeleteMultipleModal;
