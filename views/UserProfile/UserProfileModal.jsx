import React, { useState, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import Modal from '../../components/GeneralModal/GeneralModal';
import { Container, Row, Col } from 'react-bootstrap';
import classes from './UserProfileModal.module.scss';
import Input from '../../components/Input/Input';
import Select from '../../components/Select/Select';
import MultiCheck from '../../components/MultiCheck/MultiCheck';
import Button from '../../components/Button/Button';
import { EDIT_USER_PROFILE, GET_RESEARCHER_LEVEL_VALUES, GET_INSTITUTION_VALUES } from '../../constants/apiRoutes';
import useRest from '../../lib/hooks/useRest';
import useKeycloak from '../../lib/hooks/useKeycloak';
import { map, isEmpty } from 'lodash';
import Alert from '../../components/Notifications/Alert';
import { ROLES } from '../../lib/utils/roles';

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
    const { token } = useKeycloak();
    const [institutions] = useState([]);
    const [researcherLevels] = useState([]);
    const [email, setEmail] = useState();
    const [formatted, setFormatted] = useState();

    // All ROLES rendered as MultiCheck options, every one disabled — read-only display
    // matching the look (4-per-line wrap, native MultiCheck styling) of the admin
    // edit-user dialog. Order comes from the canonical ROLES list.
    const roleOptions = ROLES.map((r) => ({ label: r.label, value: r.name, disabled: true }));

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
    const getUserInfo = async () => {
        if (!token) return;
        const userInfoRequest = await restGet('/api/launch/GetUserProfile/GetUserProfile', {
            hideErrorMessage: true,
        });
        if (userInfoRequest.data) {
            setEmail(userInfoRequest.data.data.email);

            reset({
                institution: userInfoRequest.data.data.institution,
                jobTitle: userInfoRequest.data.data.jobTitle,
                researcherLevel: userInfoRequest.data.data.researcherLevel,
                orcidId: userInfoRequest.data.data.orcidId,
                // Read-only fields populated through react-hook-form so the same Input /
                // MultiCheck components used elsewhere render them with their normal
                // styling. Stripped from the PUT body in handleFormSubmitHelper below.
                centerReadOnly: userInfoRequest.data.data.center || '',
                rolesReadOnly: userInfoRequest.data.data.roles || [],
            });
        }
    };

    useEffect(() => {
        getResearcherLevels();
    }, []);

    useEffect(() => {
        getInstitutions();
    }, []);

    const getResearcherLevels = async () => {
        const researcherLevelRequest = await restGet(GET_RESEARCHER_LEVEL_VALUES, {
            showLoading: true,
            errorMessage: 'Error sending data.',
        });
        if (researcherLevels && researcherLevels.length === 0) {
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

        if (institutions && institutions.length === 0) {
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
        if (visible && token) {
            getUserInfo();
        }
    }, [visible, token]);

    const handleFormSubmitHelper = async (data, e) => {
        // Strip read-only fields — they're rendered through the form so the
        // shared Input/MultiCheck components style them, but only an admin can
        // change them so we never PUT them back.
        const { centerReadOnly: _ignoreCenter, rolesReadOnly: _ignoreRoles, ...editable } = data;
        const userInfoResult = await restPut(EDIT_USER_PROFILE, editable, {
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
                    {/* Read-only: Center. Only an admin can change this. */}
                    <Row className="mb-5">
                        <Col md={6}>
                            <Input
                                {...register('centerReadOnly')}
                                ariaLabel="center"
                                controlId="centerReadOnly"
                                label="Center"
                                name="centerReadOnly"
                                type="text"
                                readOnly
                                className={classes.readOnlyInput}
                            />
                        </Col>
                    </Row>
                    {/* Read-only: User roles. Only an admin can change these. */}
                    <Row className="mb-5">
                        <Col>
                            <MultiCheck
                                ariaLabel="user roles"
                                options={roleOptions}
                                type="checkbox"
                                label="Roles"
                                controlId="rolesReadOnly"
                                name="rolesReadOnly"
                                register={register}
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
                            variant="secondary"
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
