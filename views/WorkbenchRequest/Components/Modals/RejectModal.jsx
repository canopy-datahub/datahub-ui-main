import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import PropTypes from 'prop-types';
import classes from './Modal.module.scss';
import { Col, Container, Row } from 'react-bootstrap';
import Modal from '../../../../components/GeneralModal/GeneralModal';
import Button from '../../../../components/Button/Button';
import TextArea from '../../../../components/TextArea/TextArea';
import Select from '../../../../components/Select/Select';
import FormCheckbox from '../../../../components/Checkbox/FormCheckbox';
import Alert from '../../../../components/Notifications/Alert';
import ExclamationIcon from '../../../../components/Images/svg/ExclamationIcon';
import { map, isEmpty } from 'lodash';

/**
 * SAS License Modal
 * @param {Object} props - Object with all of the properties used within the react component, listed below.
 * @property {Boolean} visible - Determines whether to show/hide modal
 * @property {Function} closeModal - Function to close modal
 * @property {Function} setHasSASLicense - Function to change parent's flag of SAS License after clicking Submit button
 *
 * @returns {JSX} SAS License Modal Component
 */

const RejectModal = (props) => {
    const { visible, closeModal } = props;

    const methods = useForm({
        mode: 'onSubmit',
        reValidateMode: 'onSubmit',
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
        clearErrors,
        reset,
    } = methods;

    const onSubmit = (data) => {
        // TODO: POST for rejection
        closeModal();
    };

    const bodyComp = (
        <div className={classes.modalBody}>
            {!isEmpty(errors) && (
                <Alert variant="danger" dismissible className={classes.alert}>
                    <Container>
                        {map(errors, (error, index) => {
                            return (
                                <Row key={index} className="py-1">
                                    <Col className={classes.errorText}>
                                        <ExclamationIcon />
                                        Error: {error?.message}
                                    </Col>
                                </Row>
                            );
                        })}
                    </Container>
                </Alert>
            )}
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={classes.section}>
                        <TextArea
                            {...register('reason', {
                                required: 'Please provide a reason for rejection',
                                minLength: {
                                    value: 2,
                                    message: `The Reason for Rejection must be betweem 2 - 128 characters.`,
                                },
                                maxLength: {
                                    value: 128,
                                    message: 'The Reason for Rejection must be betweem 2 - 128 characters',
                                },
                            })}
                            label="Reason for Rejection"
                            ariaLabel="Reason for Rejection"
                            required
                            type="text"
                            name="reason"
                            controlId="reason"
                            className={classes.textArea}
                            rows={5}
                        />
                    </div>
                    <div className={classes.centered}>
                        <Button label="Submit" variant="primary" size="auto"></Button>
                    </div>
                </form>
            </FormProvider>
        </div>
    );

    return (
        <>
            <Modal
                show={visible}
                onHide={() => {
                    clearErrors();
                    reset();
                    closeModal();
                }}
                closable={true}
                title="Reject Request"
                bodyChildren={bodyComp}
                dialogClassName={classes.modalWidth}
                formInstructions={true}
            />
        </>
    );
};

RejectModal.propTypes = {
    closeModal: PropTypes.func,
    setHasSASLicense: PropTypes.func,
    visible: PropTypes.bool,
};

export default RejectModal;
