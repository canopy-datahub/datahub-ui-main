import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import classes from './SupportForm.module.scss';
import { useRouter } from 'next/router';
import { Col, Container, Row } from 'react-bootstrap';
import { validateEmail } from '../../../../lib/validators/emailValidator';
import Input from '../../../../components/Input/Input';
import Button from '../../../../components/Button/Button';
import TextArea from '../../../../components/TextArea/TextArea';
import Select from '../../../../components/Select/Select';
import Alert from '../../../../components/Notifications/Alert';
import { map } from 'lodash';
import useRest from '../../../../lib/hooks/useRest';
import { SUPPORT } from '../../../../constants/apiRoutes';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import CalloutBox from '../../../../components/CalloutBox/CalloutBox';

/**
 * Support Request Form
 * @param {Object} props - Object with all of the properties used within the react component, listed below.
 * @property {Array} requestTypes - Array of all request types
 * @property {Array} approvedInstitutions - Array of all the approved institutions
 * @returns {JSX} Support Request Form Component
 */

const SupportRequestForm = (props) => {
    const { requestTypes } = props;
    const { user } = useSelector((state) => state.userProfile);
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({
        mode: 'onSubmit',
        reValidateMode: 'onSubmit',
    });
    const router = useRouter();
    const { restPost } = useRest();

    useEffect(() => {
        if (user && !user?.roles?.includes('Support Team')) {
            setValue('fullName', `${user.firstName} ${user.lastName}`);
            setValue('email', `${user.email}`);
            setValue('institution', `${user.institution}`);
        }
    }, [user]);

    const formatRequestTypes = (types) => {
        return map(types, (type) => {
            return { label: type, value: type };
        });
    };

    const handleFormSubmitHelper = async (data, e) => {
        const supportRequestResult = await restPost(SUPPORT, data, {
            showLoading: true,
            showSuccess: true,
            successMessage: 'Successfully submitted support request',
            errorMessage: 'Error with submitting support request',
        });
        if (supportRequestResult.status === 200) {
            setTimeout(function () {
                router.reload();
            }, 3000);
        }
    };

    return (
        <>
            <div className={classes.alertContainer}>
                {Object.keys(errors).length > 0 && (
                    <Alert variant="danger" dismissible>
                        <Container>
                            {Object.keys(errors).map((error, index) => {
                                return (
                                    <Row key={index} className="py-1">
                                        <Col className={classes.errorText}>Error: {errors[error]?.message}</Col>
                                    </Row>
                                );
                            })}
                        </Container>
                    </Alert>
                )}
            </div>
            <Container className={`py-3 px-4`}>
            <CalloutBox
                    className={classes.instructionsContainer}
                    body={
                         <div className={classes.instructions}>
                            <div>
                            Complete the form below with the details of your support request. Upon submission, you will receive a confirmation email.
                            </div>                    
                            <div>
                            If you need to provide screenshots or any other attachments, please reply to the confirmation email with the necessary documentation.
                            </div>
                        </div>
                    }
                />               
            </Container>
            <Container className={`py-2 px-4`}>
                <Row className="mb-4">
                    <Col className={classes.spanText}>
                        <span>All fields marked with asterisk (</span>
                        <span className={classes.spanTextAsterisk}>*</span>
                        <span>) are required.</span>
                    </Col>
                </Row>
                <form onSubmit={handleSubmit(handleFormSubmitHelper)}>
                    <Row className="mb-4">
                        <Col>
                            <Input
                                {...register('email', {
                                    validate: { validateEmail },
                                })}
                                label="Email"
                                ariaLabel="email"
                                required
                                error={errors?.email}
                                controlId="email"
                                type="text"
                                name="email"
                                disabled={!!(user && !user?.roles?.includes('Support Team'))}
                            />
                        </Col>
                        <Col>
                            <Input
                                {...register('fullName', {
                                    required: 'Full Name is missing.',
                                })}
                                label="Full Name"
                                ariaLabel="full name"
                                required
                                error={errors?.fullName}
                                controlId="fullName"
                                type="text"
                                name="fullName"
                                disabled={!!(user && !user?.roles?.includes('Support Team'))}
                            />
                        </Col>
                    </Row>
                    <Row className="mb-4">
                        <Col>
                            <Input
                                {...register('institution', {
                                    required: 'Institution is missing.',
                                })}
                                label="Institution"
                                ariaLabel="institution"
                                required
                                error={errors?.fullName}
                                controlId="institution"
                                type="text"
                                name="institution"
                                disabled={!!(user && !user?.roles?.includes('Support Team'))}
                            />
                        </Col>
                    </Row>
                    <Row className="mb-4">
                        <Col>
                            <Select
                                {...register('requestType', {
                                    required: 'Request Type must be selected.',
                                })}
                                className={classes.select}
                                label="Request Type"
                                ariaLabel="request type"
                                placeholder="---"
                                options={formatRequestTypes(requestTypes)}
                                required
                                error={errors?.requestType}
                                controlId="requestType"
                                type="text"
                                name="requestType"
                            />
                        </Col>
                        <Col>
                            <Input
                                {...register('requestTitle', {
                                    required: 'Request Title is missing.',
                                    minLength: {
                                        value: 2,
                                        message: `The Request Title must be between 2 - 128 characters.`,
                                    },
                                    maxLength: {
                                        value: 128,
                                        message: 'The Request Title must be between 2 - 128 characters',
                                    },
                                })}
                                label="Request Title"
                                ariaLabel="request title"
                                required
                                error={errors?.requestTitle}
                                controlId="requestTitle"
                                type="text"
                                name="requestTitle"
                            />
                        </Col>
                    </Row>
                    <Row className="mb-4">
                        <TextArea
                            {...register('requestDetail', {
                                required: 'Request Details are missing.',
                                minLength: {
                                    value: 2,
                                    message: 'The Request Detail must be  2 - 512 characters',
                                },
                                maxLength: {
                                    value: 512,
                                    message: 'The Request Detail must be between 2 - 512 characters',
                                },
                            })}
                            label="Request Details"
                            ariaLabel="Request Details"
                            required
                            error={errors?.requestDetail}
                            controlId="requestDetail"
                            type="text"
                            name="requestDetail"
                            className={classes.textArea}
                        />
                    </Row>
                    <Row className={`mb-4 d-flex justify-content-center align-items-center`}>
                        <div className={`d-flex justify-content-center align-items-center`}>
                            <Button ariaLabel="submit" handleClick={() => {}} label="Submit" size="auto" type="submit" variant="primary" />
                        </div>
                    </Row>
                </form>
            </Container>
        </>
    );
};

SupportRequestForm.propTypes = {
    approvedInstitutions: PropTypes.arrayOf(PropTypes.string),
    requestTypes: PropTypes.arrayOf(PropTypes.string),
};

export default SupportRequestForm;
