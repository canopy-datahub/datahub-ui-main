import React from 'react';
import classes from './SessionModal.module.scss';
import Modal from '../../../components/GeneralModal/GeneralModal';
import Button from '../../../components/Button/Button';
import PropTypes from 'prop-types';

/**
 * Session Modal
 * @property {Boolean} visible - Boolean handling when the modal is visible
 * @property {Function} [closeModal=()=>{}] - function handling closing of the modal
 * @property {Number} remainingTime - remaining time till idle shown on modal
 * @property {Funcion} handleStillHere - function handling token refresh on "I'm here" click
 * @property {Funcion} onIdle - function handling logout on "Logout" click
 * @returns {JSX} Session Modal Component
 */

const SessionModal = (props) => {
    const { visible, closeModal, remainingTime, handleStillHere, onIdle } = props;

    function secondsToMinutesAndSeconds(time) {
        const minutes = Math.floor(time / 60);
        const seconds = (time % 60).toFixed(0);
        return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
    }

    const bodyComp = (
        <div className={classes.modalBody}>
            <div className={classes.header}>
                <span>You are about to be logged out due to inactivity.</span>
            </div>
            <div className={classes.counter}>{secondsToMinutesAndSeconds(remainingTime)}</div>
            <div className={classes.subBody}>
                <span>To continue, select the&nbsp;</span>
                <q className={classes.quote}>{"I'm Here"}</q>
                <span>&nbsp;button.</span>
            </div>
            <div className={classes.buttonGroup}>
                <Button
                    label="I'm Here"
                    variant="secondary"
                    handleClick={() => {
                        handleStillHere();
                    }}
                />
                <Button label="Logout" variant="primary" handleClick={() => onIdle()} />
            </div>
        </div>
    );

    return (
        <>
            <Modal
                show={visible}
                onHide={closeModal}
                closable={false}
                animation={true}
                backdrop={true}
                title="Are you still here?"
                bodyChildren={bodyComp}
                dialogClassName={classes.modalWidth}
            />
        </>
    );
};

SessionModal.propTypes = {
    closeModal: PropTypes.func,
    handleStillHere: PropTypes.func,
    onIdle: PropTypes.func,
    remainingTime: PropTypes.number,
    visible: PropTypes.bool,
};

export default SessionModal;
