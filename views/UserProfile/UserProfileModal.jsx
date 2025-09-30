import React, { useState, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import Modal from '../../components/GeneralModal/GeneralModal';
import { Container, Row, Col } from 'react-bootstrap';
import classes from './UserProfileModal.module.scss';
import Input from '../../components/Input/Input';
import Select from '../../components/Select/Select';
import Button from '../../components/Button/Button';
import { GET_USER_PROFILE, EDIT_USER_PROFILE, GET_RESEARCHER_LEVEL_VALUES, GET_INSTITUTION_VALUES } from '../../constants/apiRoutes';
import useRest from '../../lib/hooks/useRest';
import useKeycloak from '../../lib/hooks/useKeycloak';
import { map, isEmpty } from 'lodash';
import Alert from '../../components/Notifications/Alert';

/**
 * User Profile Modal
 * @param {Object} props - Object with all of the properties used within the react component, listed below.
 * @property {Array} visible - State used to manage if the modal is visible or not
 * @property {Function} [closeModal=()=>{}] - Function handling closing of the modal *
 * @property {String} userId - ID of user used to populate info in the modal
 * @returns {JSX} User Dashboard Info Modal
 */

const UserProfileModal = (props) => {
    const { visible, closeModal, userId } = props;
    const { restGet, restPut } = useRest();
    const [institutions] = useState([]);
    const [researcherLevels] = useState([]);
    const [email, setEmail] = useState();
    const [formatted, setFormatted] = useState();
    const { loading: keycloakLoading } = useKeycloak();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        mode: 'onSubmit',
        reValidateMode: 'onSubmit',
    });

    // Used to prepopulate user info modal upon opening
    const getUserInfo = async (id) => {
        const userInfoRequest = await restGet(GET_USER_PROFILE.replace('[id]', id), {
            hideErrorMessage: true,
        });
        if (userInfoRequest.data) {
            setEmail(userInfoRequest.data.data.email);

            reset({
                institution: userInfoRequest.data.data.institution,
                jobTitle: userInfoRequest.data.data.jobTitle,
                researcherLevel: userInfoRequest.data.data.researcherLevel,
                orcidId: userInfoRequest.data.data.orcidId,
            });
        }
    };

    useEffect(() => {
        // Only fetch after Keycloak is loaded
        if (!keycloakLoading) {
            getResearcherLevels();
        }
    }, [keycloakLoading]);

    useEffect(() => {
        // Only fetch after Keycloak is loaded
        if (!keycloakLoading) {
            getInstitutions();
        }
    }, [keycloakLoading]);

    const getResearcherLevels = async () => {
        const researcherLevelRequest = await restGet(GET_RESEARCHER_LEVEL_VALUES, {
            showLoading: true,
            errorMessage: 'Error sending data.',
        });
        if (researcherLevelRequest?.data?.data && researcherLevels && researcherLevels.length === 0) {
            researcherLevelRequest.data.data.forEach((obj) => {
                const setup = {
                    label: obj,
                    value: obj,
                };
                researcherLevels.push(setup);
            });
        }
    };

    const getInstitutions = async () => {
        const institutionsRequest = await restGet(GET_INSTITUTION_VALUES, {
            showLoading: true,
            errorMessage: 'Error sending data.',
        });

        if (institutionsRequest?.data?.data && institutions && institutions.length === 0) {
            institutionsRequest.data.data.forEach((obj) => {
                const setup = {
                    label: obj.name,
                    value: obj.name,
                };

                institutions.push(setup);
            });
        }
    };

    useMemo(() => {
        if (visible) {
            getUserInfo(userId);
        }
    }, [visible, userId]);

    const handleFormSubmitHelper = async (data, e) => {
        const userInfoResult = await restPut(EDIT_USER_PROFILE, data, {
            showLoading: true,
            showSuccess: true,
            successMessage: 'Successfully updated user profile',
            errorMessage: 'Error with updating user profile',
        });

        if (userInfoResult.status === 200) {
            closeModal();
        }
    };

    const orcidIdFormatter = (value) => {
        const formattedValue = value.replace(/[^0-9x]/gi, '').replace(/(\d{4})(?=\d)/g, '$1-');
        setFormatted(formattedValue);
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
                    </Row>
                    <Row className="mb-5">
                        <Col md={6}>
                            <Input
                                {...register('orcidId', {
                                    maxLength: {
                                        value: 19,
                                        message: 'Incorrect orchid id format',
                                    },
                                    minLength: {
                                        value: 19,
                                        message: 'Incorrect orchid id format',
                                    },
                                })}
                                onChange={(e) => orcidIdFormatter(e.target.value)}
                                value={formatted}
                                ariaLabel="ORCID ID"
                                controlId="orcidId"
                                error={errors?.orcidId}
                                label="ORCID ID #"
                                name="orcidId"
                                type="text"
                            />
                            <span className={classes.linkMargin}>
                                Learn more at:{' '}
                                <a href="https://orcid.org/" target="_blank" rel="noopener noreferrer">
                                    https://orcid.org/
                                </a>
                            </span>
                        </Col>
                    </Row>
                    {email && !email.endsWith('nih.gov') && (
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
                    )}
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
                title="Edit Profile"
                bodyChildren={bodyComp}
                dialogClassName={classes.modalWidth}
                formInstructions={true}
            />
        </>
    );
};

UserProfileModal.propTypes = {
    closeModal: PropTypes.func,
    userId: PropTypes.number,
    visible: PropTypes.bool,
};

export default UserProfileModal;
