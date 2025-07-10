import React, { useState } from 'react';
import Modal from '../../../components/Modal/Modal';
import classes from '../DataIngest.module.scss';
import PropTypes from 'prop-types';
import { InfoCircle } from 'react-bootstrap-icons';

/**
 * Modal that shows the directions for SFTP upload to user
 * @param {Object} props - Object with all of the properties used within the react component, listed below.
 * @property {String} variant - The variant of the SFTP modal we want
 * @property {String} title - The title of the modal
 * @property {String} fileUploadSOP - The URL for the File Upload SOP.
 * @property {String} sftpKey - The SFTP Key for this particular study
 * @returns {JSX} ErrorModalTable component
 */

const SftpModal = (props) => {
    const { variant, title, fileUploadSOP, sftpKey } = props;
    const [openSftpModal, setOpenSftpModal] = useState(false);

    const content = (
        <>
            <p className={classes.textContent}>
                IMPORTANT: You will not be able to use your RADx Data Hub account for SFTP. You will need a separate set of credentials for
                your SFTP account. If you do not have SFTP credentials already, please contact our support team by using the ‘Contact Us’
                link in the main navigation bar. Our team will help you set your SFTP credentials up, so that you can use the SFTP upload
                feature.
            </p>
            <p className={classes.textContent}>
                For a more in-depth explanation of the SFTP process, read the{' '}
                <a href={fileUploadSOP} download>
                    File Upload SOP
                </a>
                .
            </p>
            <p className={classes.textContent}>The SFTP Key for this study is: <b>{sftpKey}</b></p>
        </>
    );

    let label = '';
    switch (variant) {
        case 'multi':
            label = 'Multi-Study SFTP Upload';
            break;
        case 'single':
            label = 'SFTP Upload';
            break;
    }

    const bodyComp = <div className={classes.sftpModalContent}>{content}</div>;

    const openButtonLabel = (
        <span>
            <u>{label}</u> <InfoCircle className={classes.infoIcon} />
        </span>
    );
    const closeButtonLabel = <span>Close</span>;
    const modalTitle = <div>{title}</div>;
    const tipStyling = variant === 'single' ? `${classes.singleSftpUploadModal}` : `${classes.multiSftpUploadModal}`;
    return (
        <>
            <Modal
                buttonLabel={closeButtonLabel}
                openButtonLabel={openButtonLabel}
                openButtonStyle={tipStyling}
                openButtonSize="large"
                closeButtonStyle={classes.downloadReport}
                handlePrimaryAction={() => setOpenSftpModal(!openSftpModal)}
                title={modalTitle}
                backdrop={true}
                size="lg"
                show={openSftpModal}
                setShow={setOpenSftpModal}
            >
                {bodyComp}
            </Modal>
        </>
    );
};

SftpModal.defaultProps = {
    variant: 'single',
};

SftpModal.propTypes = {
    fileUploadSOP: PropTypes.string,
    sftpKey: PropTypes.string,
    title: PropTypes.string,
    variant: PropTypes.oneOf(['single', 'multi']),
};

export default SftpModal;
