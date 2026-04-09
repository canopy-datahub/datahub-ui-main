import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import PropTypes from 'prop-types';
import classes from './Modal.module.scss';
import { Col, Container, Row } from 'react-bootstrap';
import Modal from '../../../components/GeneralModal/GeneralModal';
import Button from '../../../components/Button/Button';
import TextArea from '../../../components/TextArea/TextArea';
import Alert from '../../../components/Notifications/Alert';
import ExclamationIcon from '../../../components/Images/svg/ExclamationIcon';

/**
 * Reject Bundles Modal
 * @param {Object} props - Object with all of the properties used within the react component, listed below.
 * @property {Boolean} visible - Determines whether to show/hide modal
 * @property {Function} closeModal - Function to close modal
 * @property {Array} rejectedBundles - List of rejected bundles to show in modal
 * @property {Function} handleFormSubmit - Function to handle form submission
 *
 * @returns {JSX} Reject Bundles Component
 */

const RejectModal = (props) => {
    const { visible, closeModal, rejectedBundles, handleFormSubmit } = props;

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
        closeModal();
        handleFormSubmit(data);
    };

    const renderRejectedBundlesList = rejectedBundles.map((bundle) => {
        return <li key={bundle}>{bundle}</li>;
    });

    const bodyComp = (
        <div className={classes.modalBody}>
            {Object.keys(errors).length > 0 && (
                <Alert variant="danger" dismissible className={classes.alert}>
                    <Container>
                        {Object.keys(errors).map((error, index) => {
                            return (
                                <Row key={index} className="py-1">
                                    <Col className={classes.errorText}>
                                        <ExclamationIcon />
                                        Error: {errors[error]?.message}
                                    </Col>
                                </Row>
                            );
                        })}
                    </Container>
                </Alert>
            )}
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <span>
                        <p>
                            All fields marked with asterisk (<span className={classes.red}>*</span>) are required.
                        </p>
                        <ul className={classes.list}>{renderRejectedBundlesList}</ul>
                        <div>
                            <div className={classes.section}>
                                <TextArea
                                    {...register('comment', {
                                        required: 'Comment on rejected bundle(s) is missing',
                                        minLength: {
                                            value: 2,
                                            message: 'The Comment on Rejected Bundle(s) must be between 2 - 512 characters',
                                        },
                                        maxLength: {
                                            value: 512,
                                            message: 'The Comment on Rejected Bundle(s) must be between 2 - 512 characters',
                                        },
                                    })}
                                    labelClass={classes.label}
                                    label="Comment"
                                    ariaLabel="Comment"
                                    required
                                    error={errors?.comment}
                                    controlId="comment"
                                    type="text"
                                    name="comment"
                                />
                            </div>
                        </div>
                    </span>
                    <div className={classes.centered}>
                        <Button label="Submit" variant="primary" size="auto" handleClick={() => {}}></Button>
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
                title="Rejected Bundles"
                bodyChildren={bodyComp}
                dialogClassName={classes.modalWidth}
            />
        </>
    );
};

RejectModal.propTypes = {
    closeModal: PropTypes.func,
    handleFormSubmit: PropTypes.func,
    rejectedBundles: PropTypes.array,
    visible: PropTypes.bool,
};

export default RejectModal;
