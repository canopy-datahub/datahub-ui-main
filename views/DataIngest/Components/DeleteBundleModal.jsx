import React, { useState } from 'react';
import Modal from '../../../components/Modal/Modal';
import useRest from '../../../lib/hooks/useRest';
import { Container, Row, Col } from 'react-bootstrap';
import Alert from '../../../components/Notifications/Alert';
import { useRouter } from 'next/router';
import classes from '../DataIngest.module.scss';
import { DI_DELETE_BUNDLE, DI_GET_BUNDLE_FILES, SUBMITTER_DELETE_SUBMISSION } from '../../../constants/apiRoutes';
import { Trash } from 'react-bootstrap-icons';
import _ from 'lodash';
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
 * @returns {JSX} DeleteBundleModal component
 */

const DeleteBundleModal = (props) => {
    const { fileId, currentFile, setFiles, files, variant, submissionId } = props;
    const [openErrorModal, setOpenErrorModal] = useState(false);
    const [isLastBundle, setIsLastBundle] = useState(false);
    const [bundleFiles, setBundleFiles] = useState([]);
    const { restDelete, restGet } = useRest();

    const router = useRouter();

    const bodyComp = (
        <div>
            <div className={classes.alertContainer}>
                {isLastBundle && (
                    <Alert variant="danger">
                        <Container>
                            <Row className="py-3">
                                <Col className={classes.errorText}>
                                    This is the last bundle in your submission. If you choose to delete it, your entire submission will also be
                                    deleted and you will be taken back to the Submitter Dashboard.
                                </Col>
                            </Row>
                        </Container>
                    </Alert>
                )}
            </div>
            <p>
                Deleting{' '}
                <b>
                    <i>{currentFile}</i>
                </b>{' '}
                will result in the entire bundle being deleted from the submission package. If you need to upload the bundle, you may upload
                it in a separate submission. The entire bundle is as follows:
            </p>
            <div className={classes.deleteBundleContainer}>
                <table className={classes.table}>
                    <thead>
                        <th>File Name</th>
                        <th>File Type</th>
                    </thead>
                    <tbody>
                        {bundleFiles.map((fi) => (
                            <tr key={_.uniqueId()}>
                                <td key={_.uniqueId()}>{fi?.sourceFileName}</td>
                                <td key={_.uniqueId()}>{fi?.dataFileCategory}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

    const openButtonLabel =
        variant === 'review' ? <Trash className={classes.deletion} /> : <span className={classes.deleteBundleLabel}>Delete Bundle</span>;
    const closeButtonLabel = <span className={classes.submitModalButton}>Delete Bundle</span>;
    const modalTitle = (
        <div>
            <span>Confirm Bundle Deletion</span>
        </div>
    );

    const getFiles = async () => {
        if (!openErrorModal) {
            const filesResult = await restGet(DI_GET_BUNDLE_FILES + `?fileId=${fileId}`, {
                showLoading: true,
                showSuccess: false,
                errorMessage: 'Error retrieving all files in bundle',
            });
            if (filesResult.status === 200) {
                setBundleFiles(filesResult?.data.data.files);
                setIsLastBundle(filesResult?.data.data.isLastBundle);
                setOpenErrorModal(!openErrorModal);
            }
        } else {
            setOpenErrorModal(!openErrorModal);
        }
    };

    const deleteSubmission = async () => {
        const deleteSubmissionResult = await restDelete(SUBMITTER_DELETE_SUBMISSION, {
            showLoading: true,
            showSuccess: true,
            successMessage: `Successfully deleted submission ${submissionId}`,
            errorMessage: `Error deleting submission ${submissionId}`,
            data: parseInt(submissionId),
        });
        if (deleteSubmissionResult.status === 200) {
            setOpenErrorModal(!openErrorModal);
            router.push('/submitterDashboard');
        }
    };

    const deleteBundle = async () => {
        const deleteBundleResult = await restDelete(DI_DELETE_BUNDLE, {
            showLoading: true,
            data: fileId,
            showSuccess: true,
            successMessage: 'Successfully deleted bundle',
            errorMessage: 'Error with deleting bundle',
        });
        if (deleteBundleResult.status === 200) {
            if (variant === 'review') {
                removeFiles();
                setOpenErrorModal(!openErrorModal);
                router.reload();
            } else {
                removeDeletedFile();
                setOpenErrorModal(!openErrorModal);
                router.reload();
            }
        }
    };

    const removeDeletedFile = () => {
        const arr = [...files];
        const newArr = arr.filter((file) => file.fileId !== fileId);
        setFiles([...newArr]);
    };

    const removeFiles = () => {
        const arr = [...files];
        const newArr = arr.filter((file) => file.id !== fileId);
        setFiles([...newArr]);
    };

    return (
        <>
            <Modal
                buttonLabel={closeButtonLabel}
                openButtonLabel={openButtonLabel}
                openButtonSize={variant === 'review' ? 'medium' : 'small'}
                openButtonStyle={variant === 'review' ? `${classes.deletion}` : `${classes.deleteBundleLabel}`}
                closeButtonStyle={classes.downloadReport}
                handlePrimaryAction={isLastBundle ? deleteSubmission : deleteBundle}
                title={modalTitle}
                backdrop={true}
                size="lg"
                show={openErrorModal}
                setShow={getFiles}
            >
                {bodyComp}
            </Modal>
        </>
    );
};

DeleteBundleModal.propTypes = {
    currentFile: PropTypes.string,
    fileId: PropTypes.number,
    files: PropTypes.arrayOf(
        PropTypes.shape({
            fileId: PropTypes.number,
            fileName: PropTypes.string,
            fileType: PropTypes.string,
            fileSize: PropTypes.number,
            acknowledged: PropTypes.bool,
            validationType: PropTypes.string,
            validationResultsStatus: PropTypes.string,
            missingHeaders: PropTypes.arrayOf(PropTypes.string),
            dataEntryWarningCount: PropTypes.number,
            cdeErrors: PropTypes.shape({
                key: PropTypes.arrayOf(
                    PropTypes.shape({
                        errorType: PropTypes.string,
                        message: PropTypes.string,
                        lineNumber: PropTypes.number,
                        solution: PropTypes.string,
                    })
                ),
            }),
            dictErrors: PropTypes.shape({
                key: PropTypes.arrayOf(
                    PropTypes.shape({
                        errorType: PropTypes.string,
                        message: PropTypes.string,
                        lineNumber: PropTypes.number,
                        solution: PropTypes.string,
                    })
                ),
            }),
            metaErrors: PropTypes.shape({
                key: PropTypes.arrayOf(
                    PropTypes.shape({
                        errorType: PropTypes.string,
                        message: PropTypes.string,
                        lineNumber: PropTypes.number,
                        solution: PropTypes.string,
                    })
                ),
            }),
            piiErrors: PropTypes.shape({
                key: PropTypes.arrayOf(
                    PropTypes.shape({
                        errorType: PropTypes.string,
                        message: PropTypes.string,
                        lineNumber: PropTypes.number,
                        solution: PropTypes.string,
                    })
                ),
            }),
        })
    ),
    setFiles: PropTypes.func,
    submissionId: PropTypes.number,
    variant: PropTypes.string,
};

export default DeleteBundleModal;
