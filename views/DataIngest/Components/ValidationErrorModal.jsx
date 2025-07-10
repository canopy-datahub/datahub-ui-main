import React, { useState } from 'react';
import Modal from '../../../components/Modal/Modal';
import classes from '../DataIngest.module.scss';
import ErrorModalContent from './ErrorModalContent';
import { GET_DOWNLOAD_BY_FILE } from '../../../constants/apiRoutes';
import { downloadLink } from '../../../lib/pageHelpers/downloadLink';
import PropTypes from 'prop-types';
import DownloadIcon from '../../../components/Images/svg/DownloadIcon';

/**
 * Modal that shows validation errors in the data ingest form that allows users to upload data files for studies
 * @param {Object} props - Object with all of the properties used within the react component, listed below.
 * @property {Object} cdeErrors - Array of all cde errors to be displayed in the error modal
 * @property {Object} dictErrors - Array of all dict errors to be displayed in the error modal
 * @property {Object} piiErrors - Array of all pii errors to be displayed in the error modal
 * @property {Object} metaErrors - Array of all meta errors to be displayed in the error modal
 * @property {Array(String)} missingHeaders - Array of string missing headers to be displayed in the modal
 * @property {Number} errorCount - Total number of errors (missing header count + content errors)
 * @property {Number} fileId - the ID of the file we are looking at validation warnings for
 * @property {String} baseUrl - base url for downloading validation report
 * @property {Function} restGet - REST API used for download
 * @returns {JSX} ValidationErrorModal component
 */

const ValidationErrorModal = (props) => {
    const { cdeErrors, metaErrors, piiErrors, dictErrors, missingHeaders, errorCount, fileId, baseUrl, restGet } = props;
    const [openErrorModal, setOpenErrorModal] = useState(false);
    const bodyComp = (
        <div>
            <ErrorModalContent
                cdeErrors={cdeErrors}
                piiErrors={piiErrors}
                metaErrors={metaErrors}
                dictErrors={dictErrors}
                missingHeaders={missingHeaders}
            />
            <hr className={classes.modalBreak} />
        </div>
    );

    const openButtonLabel = <u>{`View ${errorCount} Warning(s)`}</u>;
    const closeButtonLabel = (
        <>
            <DownloadIcon /> Download Report
        </>
    );
    const modalTitle = (
        <div>
            <span>Warning Report</span>
        </div>
    );

    return (
        <>
            <Modal
                buttonLabel={closeButtonLabel}
                openButtonLabel={openButtonLabel}
                openButtonSize="medium"
                openButtonStyle={classes.errorCount}
                closeButtonStyle={classes.downloadButton}
                handlePrimaryAction={async () => {
                    downloadLink(`${baseUrl}${GET_DOWNLOAD_BY_FILE}${fileId}`, restGet);
                    setOpenErrorModal(!openErrorModal);
                }}
                title={modalTitle}
                backdrop={true}
                size="lg"
                show={openErrorModal}
                setShow={setOpenErrorModal}
            >
                {bodyComp}
            </Modal>
        </>
    );
};

ValidationErrorModal.propTypes = {
    baseUrl: PropTypes.string,
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
    errorCount: PropTypes.number,
    fileId: PropTypes.number,
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
    missingHeaders: PropTypes.arrayOf(PropTypes.string),
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
    restGet: PropTypes.func,
};

export default ValidationErrorModal;
