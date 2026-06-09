import React from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import classes from './ReturnModal.module.scss';
import Modal from '../../../../components/GeneralModal/GeneralModal';
import Button from '../../../../components/Button/Button';

/**
 * Modal for Return to Dashboard on Study Registration Edit
 *
 * @property {Boolean} visible - Flag to show/hide modal
 * @property {Function} closeModal - Function to close/hide modal
 * @returns {Node} object rendering the Return to Dashboard modal
 */
const ReturnToDashModal = (props) => {
    const { visible, closeModal, handleSave, type } = props;

    const router = useRouter();

    const bodyComp = (
        <div className={classes.modalBody}>
            <div className={classes.header}>
                <span>Would you like to save your changes before leaving?</span>
            </div>
            <div className={classes.buttonGroup}>
                <Button label="Save" variant="primary" handleClick={handleSave} />
                <Button
                    label="Do Not Save"
                    variant="secondary"
                    handleClick={() => {
                        router.push(`/${type.toLowerCase()}/studyRegistration`);
                    }}
                />
            </div>
        </div>
    );

    return (
        <>
            <Modal
                show={visible}
                onHide={() => {
                    closeModal();
                }}
                closable={true}
                title="Save Before Exiting?"
                bodyChildren={bodyComp}
                dialogClassName={classes.modal}
            />
        </>
    );
};

ReturnToDashModal.propTypes = {
    closeModal: PropTypes.func,
    rapidsLink: PropTypes.shape({
        label: PropTypes.string,
        propertyValue: PropTypes.arrayOf(PropTypes.string)
    }),
    visible: PropTypes.bool,
};

export default ReturnToDashModal;
