/* eslint-disable multiline-ternary */
import React, { useState } from 'react';
import { Col, Row, Container, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import Input from '../../../components/Input/Input';
import Select from '../../../components/Select/Select';
import Button from '../../../components/Button/Button';
import TextArea from '../../../components/TextArea/TextArea';
import Toggle from '../../../components/Toggle/Toggle';
import classes from './UserRegistrationForm.module.scss';
import { validateEmail } from '../../../lib/validators/emailValidator';
import { useRouter } from 'next/router';
import { map, isEmpty, startCase } from 'lodash';
import Alert from '../../../components/Notifications/Alert';
import useRest from '../../../lib/hooks/useRest';
import { USER_REGISTRATION } from '../../../constants/apiRoutes';
import PropTypes from 'prop-types';
import { termsConditions } from '../../../constants/userRegistration';
import AddInstitutionModal from './AddInstitutionModal';

/**
 * User Registration Form
 * @param {Object} props - Object with all of the properties used within the react component, listed below.
 * @property {Array} allStates - Array of all the states
 * @property {Array} allCountries - Array of all the countries
 * @property {Array} institutionTypes - Array of all the different types of institutions
 * @property {Array} approvedInstitution - Array of all approved institutions
 * @property {Array} researcherLevels - Array of all the different researcher levels for a user
 * @property {Object} rasUser - User information coming from Ras when logging in from login.gov - used to pre-populate user registration fields
 * @property {Boolean} checkUser - Boolean to see if user is logged in
 * @property {Array} referrerTypes - Array of all the ways you may have heard of the site
 * @returns {JSX} User Registration Form Component
 */

const UserRegistrationForm = (props) => {
    const { rasUser, researcherLevels, approvedInstitution, allStates, allCountries, institutionTypes, checkUser, referrerTypes } = props;
    const router = useRouter();
    const { restPost } = useRest();
    const [visible, setVisible] = useState(false);
    const [institutionList, setInstitutionList] = useState(approvedInstitution);
    const [institutionObj, setInstitutionObj] = useState(null);
    const [formatted, setFormatted] = useState('');
    const [referrerChecked, setReferrerChecked] = useState(referrerTypes.map((refer) => false));

    const {
        register: userRegRegister,
        handleSubmit: userRegRegisterHandleSubmit,
        setValue: userRegSetValue,
        getValues: userRegGetValue,
        formState: { errors: userRegErrors },
        watch,
    } = useForm({
        mode: 'onSubmit',
        reValidateMode: 'onSubmit',
    });

    const referrerCheck = [];
    referrerTypes.map((refer) => referrerCheck.push(watch(`referrer${refer.id}`)));

    const handleFormSubmitHelper = async (data, e) => {
        const referrerDataCheck = [];
        const referrerDataSpecific = [];
        const referrerDataObj = [];
        Object.keys(data).forEach((key) => {
            if (key.includes('referrer') && data[key]) {
                if (key.includes('Detail')) {
                    referrerDataSpecific.push(data[key]);
                } else if (!key.includes('Group')) {
                    referrerDataCheck.push(key.slice(-1));
                }
            }
        });
        for (let i = 0; i < referrerDataCheck.length; i++) {
            referrerDataObj.push({ referrerId: referrerDataCheck[i], referrerSpecify: referrerDataSpecific[i] });
        }
        const payload = {
            acceptTerms: data.acceptTerms,
            email: data.email,
            firstName: data.firstName,
            institution: data.institution,
            jobTitle: data.jobTitle,
            lastName: data.lastName,
            middleInitial: data.middleInitial,
            orcidId: data.orcidId,
            referrers: referrerDataObj,
            researcherLevel: data.researcherLevel,
        };
        const userRegistrationResult = await restPost(USER_REGISTRATION.replace('[sessionId]', rasUser.id), payload, {
            showLoading: true,
            showSuccess: true,
            successMessage: 'Successfully sent user registration',
            errorMessage: 'Error refreshing token',
        });
        if (userRegistrationResult.status === 200) {
            setTimeout(function () {
                router.push(`/postAuth?sessionID=${rasUser.id}`);
            }, 3000);
        }
    };

    const closeModal = () => {
        setVisible(false);
    };

    const orcidIdFormatter = (value) => {
        const formattedValue = value.replace(/[^0-9x]/gi, '').replace(/(\d{4})(?=\d)/g, '$1-');
        setFormatted(formattedValue);
    };

    const disableField = (checkUser, rasUser, field) => {
        if (checkUser) {
            return false;
        } else {
            if (isEmpty(rasUser)) {
                return false;
            } else if (rasUser && field !== null) {
                return true;
            }
            return false;
        }
    };

    return (
        <>
            <AddInstitutionModal
                visible={visible}
                closeModal={closeModal}
                allStates={allStates}
                allCountries={allCountries}
                institutionTypes={institutionTypes}
                userRegUseForm={userRegSetValue}
                setInstitutionList={setInstitutionList}
                setInstitutionObj={setInstitutionObj}
            />
            <div className={classes.alertContainer}>
                {!isEmpty(userRegErrors) && (
                    <Alert variant="danger" dismissible>
                        <Container>
                            {map(userRegErrors, (error, index) => {
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
            <Container className={`py-5 px-4`}>
                <Row className="mb-5">
                    <Col className={classes.spanText}>
                        <span>All fields marked with asterisk (</span>
                        <span className={classes.spanTextAsterisk}>*</span>
                        <span>) are required.</span>
                    </Col>
                </Row>
                <form onSubmit={userRegRegisterHandleSubmit(handleFormSubmitHelper)}>
                    <Row className="mb-5">
                        <Col>
                            <Input
                                {...userRegRegister('firstName', {
                                    value: rasUser && rasUser?.firstName !== null ? rasUser.firstName : '',
                                    required: 'First Name is missing.',
                                })}
                                ariaLabel="first name"
                                controlId="firstName"
                                error={userRegErrors?.firstName}
                                label="First Name"
                                name="firstName"
                                required
                                disabled={disableField(checkUser, rasUser, rasUser?.firstName)}
                            />
                        </Col>
                        <Col lg={1}>
                            <Input
                                {...userRegRegister('middleInitial', {
                                    maxLength: 1,
                                })}
                                ariaLabel="middle initial"
                                controlId="middleInitial"
                                error={userRegErrors?.middleInitial}
                                label="M.I."
                                name="middleInitial"
                                type="text"
                                maxLength={1}
                            />
                        </Col>
                        <Col>
                            <Input
                                {...userRegRegister('lastName', {
                                    value: rasUser && rasUser?.lastName !== null ? rasUser.lastName : '',
                                    required: 'Last Name is missing.',
                                })}
                                ariaLabel="last name"
                                controlId="lastName"
                                error={userRegErrors?.lastName}
                                label="Last Name"
                                name="lastName"
                                required
                                type="text"
                                disabled={disableField(checkUser, rasUser, rasUser?.lastName)}
                            />
                        </Col>
                    </Row>
                    <Row className="mb-5">
                        <Col>
                            <Input
                                {...userRegRegister('email', {
                                    value: rasUser && rasUser?.email !== null ? rasUser.email : '',
                                    validate: { validateEmail },
                                })}
                                ariaLabel="email"
                                controlId="email"
                                error={userRegErrors?.email}
                                label="Email"
                                name="email"
                                required
                                type="text"
                                disabled={disableField(checkUser, rasUser, rasUser?.email)}
                            />
                        </Col>
                    </Row>
                    <Row className="mb-5">
                        <Col>
                            <div>
                                <Input
                                    {...userRegRegister('orcidId', {
                                        maxLength: {
                                            value: 19,
                                            message: 'Incorrect orcid id',
                                        },
                                        minLength: {
                                            value: 19,
                                            message: 'Incorrect orcid id',
                                        },
                                    })}
                                    onChange={(e) => orcidIdFormatter(e.target.value)}
                                    value={formatted}
                                    ariaLabel="orcid id"
                                    controlId="orcidId"
                                    error={userRegErrors?.orcidId}
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
                            </div>
                        </Col>
                        <Col>
                            <Input
                                {...userRegRegister('jobTitle', {
                                    required: 'Job Title/Position is missing.',
                                })}
                                ariaLabel="job title/position"
                                controlId="jobTitle"
                                error={userRegErrors?.jobTitle}
                                label="Job Title/Position"
                                name="jobTitle"
                                required
                                type="text"
                            />
                        </Col>
                    </Row>
                    <Row className="mb-5">
                        <div>
                            <Select
                                {...userRegRegister('institution', {
                                    required: 'Institution must be selected.',
                                    onChange: (e) => setInstitutionObj(e.target.value),
                                    value: rasUser && rasUser?.institutionName !== null ? rasUser.institutionName : '',
                                })}
                                ariaLabel="institution"
                                className={classes.select}
                                controlId="institution"
                                error={userRegErrors?.institution}
                                label="Institution"
                                name="institution"
                                options={institutionList}
                                value={institutionObj ? institutionObj.value : ''}
                                placeholder="---"
                                required
                                type="text"
                                disabled={disableField(checkUser, rasUser, rasUser?.institutionName)}
                            />
                            <span className={classes.linkMargin}>
                                Don't see your institution?
                                <a
                                    href=""
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setVisible(true);
                                    }}
                                >
                                    {' Click here to add an institution'}
                                </a>
                            </span>
                        </div>
                    </Row>
                    <Row className="mb-5">
                        <div>
                            <Select
                                {...userRegRegister('researcherLevel', {
                                    required: 'Researcher Level must be selected.',
                                })}
                                ariaLabel="researcher level"
                                className={classes.select}
                                controlId="researcherLevel"
                                error={userRegErrors?.researcherLevel}
                                label="Researcher Level"
                                name="researcherLevel"
                                options={researcherLevels}
                                placeholder="---"
                                required
                                type="text"
                            />
                            <span className={classes.linkMargin}>
                                Please identify your career stage as a researcher:{' '}
                                <a href="/" target="_blank" rel="noopener noreferrer">
                                    /
                                </a>
                            </span>
                        </div>
                    </Row>
                    <Row className="mb-5">
                        <div className={`${classes.formLabel} ${classes.errorCheckboxGroup}`}>
                            <span className={classes.spanTextAsterisk}>*</span> How did you hear about the site?
                        </div>
                        <div
                            {...userRegRegister('referrerGroup', {
                                required: 'At least one option for how you heard about the site must be selected with details',
                            })}
                        >
                            <Toggle
                                className={classes.referrerToggleHide}
                                controlId={`referrer0`}
                                label={''}
                                name={`referrer0`}
                                type="checkbox"
                                key={'0'}
                            />
                            {referrerTypes.map((referrer) => {
                                return (
                                    <div key={referrer.id}>
                                        <Toggle
                                            handleChange={(e) => {
                                                userRegSetValue(`referrer${referrer.id}`, e.target.checked);
                                                const refCheck = [...referrerChecked];
                                                refCheck[referrer.id - 1] = e.target.checked;
                                                setReferrerChecked(refCheck);
                                                userRegSetValue('referrerGroup', refCheck.includes(true));
                                            }}
                                            className={classes.referrerToggle}
                                            controlId={`referrer${referrer.id}`}
                                            label={referrer.name}
                                            name={`referrer${referrer.id}`}
                                            type="checkbox"
                                            key={referrer.id}
                                        />

                                        {referrerChecked[referrer.id - 1] ? (
                                            <div key={`${referrer.id}-specify`} className={classes.specify}>
                                                <Input
                                                    {...userRegRegister(`referrer${referrer.id}Detail`, {
                                                        required: `Specific Details for ${referrer.name} is missing`,
                                                    })}
                                                    ariaLabel={`${referrer.name} specific details`}
                                                    controlId={`referrer${referrer.id}Detail`}
                                                    error={userRegErrors?.[`referrer${referrer.id}Detail`]}
                                                    label={startCase(referrer.specifyPrompt)}
                                                    name={`referrer${referrer.id}Detail`}
                                                    onChange={() => userRegSetValue('referrerGroup', true)}
                                                    required
                                                />
                                            </div>
                                        ) : null}
                                    </div>
                                );
                            })}
                        </div>
                    </Row>
                    <Row className="mb-5">
                        <TextArea
                            ariaLabel="Terms & Conditions"
                            className={classes.textArea}
                            controlId="termsConditions"
                            error={userRegErrors?.termsConditions}
                            label="Terms & Conditions"
                            name="termsConditions"
                            readOnly={true}
                            required
                            rows={7}
                            type="text"
                            value={termsConditions}
                        />
                    </Row>
                    <Row className="mb-5">
                        <Toggle
                            {...userRegRegister('acceptTerms', {
                                required: 'Accept Conditions required',
                            })}
                            handleChange={(e) => {
                                userRegSetValue('acceptTerms', e.target.checked);
                            }}
                            className={classes.toggle}
                            controlId="acceptTerms"
                            error={userRegErrors?.acceptTerms}
                            label="Accept Conditions"
                            name="acceptTerms"
                            required
                            type="checkbox"
                        />
                    </Row>
                    <Row className={`mb-4 d-flex justify-content-center align-items-center ${classes.submitButton}`}>
                        <Button
                            ariaLabel="submit"
                            className={classes.submitButton}
                            handleClick={() => {
                                window.scrollTo({
                                    top: 0,
                                    behavior: 'smooth',
                                });
                            }}
                            label="Submit"
                            size="large"
                            type="submit"
                            variant="primary"
                        />
                    </Row>
                </form>
            </Container>
        </>
    );
};

UserRegistrationForm.propTypes = {
    allCountries: PropTypes.arrayOf(PropTypes.object),
    allStates: PropTypes.arrayOf(PropTypes.object),
    approvedInstitution: PropTypes.arrayOf(PropTypes.object),
    checkUser: PropTypes.bool,
    institutionTypes: PropTypes.arrayOf(PropTypes.object),
    rasUser: PropTypes.shape({
        email: PropTypes.string,
        firstName: PropTypes.string,
        lastName: PropTypes.string,
        institutionName: PropTypes.string,
    }),
    referrerTypes: PropTypes.arrayOf(PropTypes.object),
    researcherLevels: PropTypes.arrayOf(PropTypes.object),
};

export default UserRegistrationForm;
