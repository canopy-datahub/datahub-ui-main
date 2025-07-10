import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import Modal from '../../../components/GeneralModal/GeneralModal';
import { Container, Row, Col } from 'react-bootstrap';
import classes from './UserDashModal.module.scss';
import Input from '../../../components/Input/Input';
import Select from '../../../components/Select/Select';
import Toggle from '../../../components/Toggle/Toggle';
import MultiCheck from '../../../components/MultiCheck/MultiCheck';
import Button from '../../../components/Button/Button';
import { GET_USER_INFO, UPDATE_USER_INFO } from '../../../constants/apiRoutes';
import useRest from '../../../lib/hooks/useRest';
import { map, isEmpty } from 'lodash';
import Alert from '../../../components/Notifications/Alert';

// TODO: Bigger overhaul to change dhpUser to DHPUser after backend updates

/**
 * User Dashboard Info Modal
 * @param {Object} props - Object with all of the properties used within the react component, listed below.
 * @property {Array} visible - State used to manage if the modal is visible or not
 * @property {Function} [closeModal=()=>{}] - Function handling closing of the modal
 * @property {Array} roles - Array of all the different type of user roles
 * @property {Array} institutions - Array of all approved institutions
 * @property {Array} status - Array of all the different types status for a user
 * @property {String} userId - ID of user used to populate info in the modal
 * @property {Array<Object>} researcherLevels - Array object of all the different levels of researcher
 * @returns {JSX} User Dashboard Info Modal
 */

const UserManageDashModal = (props) => {
    const { visible, closeModal, roles, institutions, userId, status, researcherLevels, dccs } = props;
    const { restGet, restPut } = useRest();
    const [dhpUser, setdhpUser] = useState();
    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors },
    } = useForm({
        mode: 'onSubmit',
        reValidateMode: 'onSubmit',
        defaultValues: {
            roles: [],
        },
    });

    // Used to prepopulate user info modal upon opening
    const getUserInfo = async (id) => {
        const userInfoRequest = await restGet(GET_USER_INFO.replace('[id]', id), {
            showLoading: true,
            errorMessage: 'Error sending data.',
        });
        // Need this so that the user can change value for dhpUser
        setdhpUser(userInfoRequest.data.data.dhpUser);
        // Needed to be able to prepopullate form values upon opening of the modal
        reset({
            firstName: userInfoRequest.data.data.firstName,
            dcc: userInfoRequest.data.data.dcc,
            lastName: userInfoRequest.data.data.lastName,
            middleInitial: userInfoRequest.data.data.middleInitial,
            email: userInfoRequest.data.data.email,
            institution: userInfoRequest.data.data.institution,
            jobTitle: userInfoRequest.data.data.jobTitle,
            status: userInfoRequest.data.data.status,
            dhpUser: userInfoRequest.data.data.dhpUser,
            roles: userInfoRequest.data.data.roles,
            researcherLevel: userInfoRequest.data.data.researcherLevel,
        });
    };

    useMemo(() => {
        if (visible) {
            getUserInfo(userId);
        }
    }, [visible, userId]);

    const handleFormSubmitHelper = async (data, e) => {
        // Since we are holding state for the dhpUser toggle, need to set it to react hook form
        setValue('dhpUser', dhpUser);

        const userInfoResult = await restPut(UPDATE_USER_INFO.replace('[id]', userId), data, {
            showLoading: true,
            showSuccess: true,
            successMessage: 'Successfully updated user profile',
            errorMessage: 'Error with updating user profile',
        });

        if (userInfoResult.status === 200) {
            setTimeout(function () {
                closeModal();
            }, 2000);
        }
    };

    const bodyComp = (
        <div className={classes.modalBody}>
            <div className={classes.alertContainer}>
                {!isEmpty(errors) && (
                    <Alert variant="danger" dismissible>
                        <Container>
                            {map(errors, (error, index) => {
                                return (
                                    <Row key={index} className="py-3">
                                        <Col className={classes.errorText}>Error: {error?.message}</Col>
                                    </Row>
                                );
                            })}
                        </Container>
                    </Alert>
                )}
            </div>
            <Container>
                <form onSubmit={handleSubmit(handleFormSubmitHelper)}>
                    <Row className="mb-5">
                        <Col>
                            <Input
                                {...register('email', {
                                    required: 'Email is missing.',
                                })}
                                ariaLabel="email"
                                controlId="email"
                                error={errors?.email}
                                label="Email"
                                name="email"
                                required
                                type="text"
                            />
                        </Col>
                    </Row>
                    <Row className="mb-5">
                        <Col sm={4}>
                            <Input
                                {...register('firstName', {
                                    required: 'First Name is missing.',
                                })}
                                ariaLabel="first name"
                                controlId="firstName"
                                error={errors?.firstName}
                                label="First Name"
                                name="firstName"
                                required
                                type="text"
                            />
                        </Col>
                        <Col sm={4}>
                            <Input
                                {...register('lastName', {
                                    required: 'Last Name is missing.',
                                })}
                                ariaLabel="last name"
                                controlId="lastName"
                                error={errors?.lastName}
                                label="Last Name"
                                name="lastName"
                                required
                                type="text"
                            />
                        </Col>
                        <Col sm={2}>
                            <Input
                                {...register('middleInitial')}
                                ariaLabel="middle initial"
                                controlId="middleInitial"
                                label="M.I."
                                name="middleInitial"
                                type="text"
                            />
                        </Col>
                    </Row>
                    <Row className="mb-5">
                        <Col md={6}>
                            <Input
                                {...register('jobTitle', {
                                    required: 'Job Title/Position is missing.',
                                })}
                                ariaLabel="job title/position"
                                controlId="jobTitle"
                                error={errors?.jobTitle}
                                label="Job Title/Position"
                                name="jobTitle"
                                required
                                type="text"
                            />
                        </Col>
                        <Col md={6}>
                            <Select
                                {...register('dcc')}
                                ariaLabel="dcc"
                                controlId="dcc"
                                error={errors?.dcc}
                                label="(C)DCC Affiliation"
                                name="dcc"
                                options={dccs}
                                placeholder="None"
                                required
                                type="text"
                            />
                        </Col>
                    </Row>
                    <Row className="mb-5">
                        <Col>
                            <Select
                                {...register('institution', {
                                    required: 'Institution must be selected.',
                                })}
                                ariaLabel="institution"
                                controlId="institution"
                                error={errors?.institution}
                                label="Institution"
                                name="institution"
                                options={institutions}
                                placeholder="---"
                                required
                                type="text"
                            />
                        </Col>
                    </Row>
                    <Row className="mb-5">
                        <Col>
                            <Select
                                {...register('researcherLevel', {
                                    required: 'Researcher Level must be selected.',
                                })}
                                ariaLabel="researcherLevel"
                                controlId="researcherLevel"
                                error={errors?.researcherLevel}
                                label="Researcher Level"
                                name="researcherLevel"
                                options={researcherLevels}
                                placeholder="---"
                                required
                                type="text"
                            />
                        </Col>
                    </Row>
                    <Row className="mb-5 align-items-center justify-content-between">
                        <Col md={6}>
                            <Select
                                {...register('status', {
                                    required: 'Status must be selected.',
                                })}
                                ariaLabel="status"
                                controlId="status"
                                error={errors?.status}
                                label="Status"
                                name="status"
                                options={status}
                                placeholder="---"
                                required
                                type="text"
                            />
                        </Col>
                        <Col>
                            <div className={classes.dhpUserToggleContainer}>
                                <Toggle
                                    {...register('dhpUser')}
                                    handleChange={(e) => {
                                        setdhpUser(e.target.checked);
                                        setValue('dhpUser', e.target.checked);
                                    }}
                                    containerOverride={true}
                                    selected={dhpUser}
                                    className={classes.dhpUserToggle}
                                    controlId="dhpUser"
                                    label="DHP User"
                                    name="dhpUser"
                                    type="checkbox"
                                />
                            </div>
                        </Col>
                    </Row>
                    <Row className="mb-5">
                        <Col>
                            <MultiCheck
                                ariaLabel="user roles"
                                options={roles}
                                type="checkbox"
                                label="User Roles"
                                controlId="roles"
                                checkBoxGroupClass={classes.multigroup}
                                error={errors?.roles}
                                name="roles"
                                register={register}
                                required
                            />
                        </Col>
                    </Row>
                    <Row className={`mb-4 d-flex justify-content-end align-items-center ${classes.submitButton}`}>
                        <Button
                            ariaLabel="cancel"
                            handleClick={() => closeModal()}
                            label="Cancel"
                            size="auto"
                            type="button"
                            variant="primary"
                        />
                        <Button ariaLabel="submit" handleClick={() => {}} label="Submit" size="auto" type="submit" variant="primary" />
                    </Row>
                </form>
            </Container>
        </div>
    );

    return (
        <>
            <Modal
                show={visible}
                onHide={closeModal}
                closable={true}
                title="Edit User Information"
                bodyChildren={bodyComp}
                dialogClassName={classes.modalWidth}
                formInstructions={true}
            />
        </>
    );
};

UserManageDashModal.propTypes = {
    closeModal: PropTypes.func,
    dccs: PropTypes.arrayOf(PropTypes.object),
    institutions: PropTypes.arrayOf(PropTypes.object),
    researcherLevels: PropTypes.arrayOf(PropTypes.object),
    roles: PropTypes.arrayOf(PropTypes.string),
    status: PropTypes.arrayOf(PropTypes.string),
    userId: PropTypes.string,
    visible: PropTypes.string,
};

export default UserManageDashModal;
