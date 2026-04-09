import React, { useState } from 'react';
import { Col, Row, Container } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import Input from '../../../components/Input/Input';
import Select from '../../../components/Select/Select';
import Button from '../../../components/Button/Button';
import Toggle from '../../../components/Toggle/Toggle';
import Alert from '../../../components/Notifications/Alert';
import Modal from '../../../components/GeneralModal/GeneralModal';
import classes from './AddInstitutionModal.module.scss';
import useRest from '../../../lib/hooks/useRest';
import { ADD_INSTITUTION } from '../../../constants/apiRoutes';
import PropTypes from 'prop-types';
import { map, isEmpty } from 'lodash';
import Link from 'next/link';

/**
 * Modal for adding an instition for user registration
 * @param {Object} props - Object with all of the properties used within the react component, listed below.
 * @property {Object} userRegUseForm - React hook form setValue function, dealing with setting institution value
 * @property {Array} allStates - Array of all the states
 * @property {Array} allCountries - Array of all the countries
 * @property {Array} institutionTypes - Array of all the different types of institutions
 * @property {Boolean} visible - Boolean variable handling if the modal is visible or not
 * @property {Function} closeModal - Function handling closing the modal
 * @property {Function} setInstitutionList - React hook updating the list of institutions
 * @property {Function} setInstitutionObj - React hook setting the new institution that was created
 * @returns {JSX} Add Institution Modal Component
 */

const AddInstitutionModal = (props) => {
    const { userRegUseForm, allStates, allCountries, institutionTypes, visible, closeModal, setInstitutionList, setInstitutionObj } = props;
    const { restPost } = useRest();
    const {
        register: institutionRegister,
        handleSubmit: institutionHandleSubmit,
        setValue: institutionSetValue,
        watch: institutionWatch,
        formState: { errors: institutionErrors },
    } = useForm({
        mode: 'onSubmit',
        reValidateMode: 'onSubmit',
    });
    const watchCountry = institutionWatch('country');
    const [rorIdValue, setRorIdValue] = useState('');

    const handleInstitutionSubmit = async (data, e) => {
        try {
            const addInstitutionResult = await restPost(ADD_INSTITUTION, data, {
                showLoading: true,
                showSuccess: true,
                successMessage: 'Successfully added new institution',
                errorMessage: 'Error with adding new institution',
            });
            if (addInstitutionResult?.status === 200) {
                const newInstitution = {
                    label: addInstitutionResult.data.data.name,
                    value: addInstitutionResult.data.data.name,
                };
                setInstitutionObj(newInstitution);
                setInstitutionList((prevArray) => [...prevArray, newInstitution]);
                closeModal();
                userRegUseForm('institution', newInstitution.value);
            }
        } catch (e) {}
    };

    const rorIdHandler = (value) => {
        const formattedValue = value.replace(/[^a-zA-Z0-9]/g, '');
        setRorIdValue(formattedValue);
    };

    const locationComp = () => {
        if (watchCountry === undefined || watchCountry.length === 0) {
            return null;
        } else if (watchCountry === 'United States') {
            return (
                <Row className={classes.modalInputRow}>
                    <Col>
                        <Select
                            {...institutionRegister('state', {
                                required: 'State is missing.',
                            })}
                            className={classes.select}
                            label="State"
                            ariaLabel="state"
                            placeholder="---"
                            options={allStates}
                            required
                            error={institutionErrors?.state}
                            controlId="state"
                            type="text"
                            name="state"
                        />
                    </Col>
                </Row>
            );
        } else {
            return (
                <Row className={classes.modalInputRow}>
                    <Col>
                        <Input
                            {...institutionRegister('province', {
                                required: 'Province/Region is missing.',
                            })}
                            label="Province/Region"
                            ariaLabel="province/region"
                            required
                            error={institutionErrors?.province}
                            controlId="province"
                            type="text"
                            name="province"
                            containerClass={classes.inputLabel}
                        />
                    </Col>
                </Row>
            );
        }
    };

    const bodyComp = (
        <div className={classes.modalBody}>
            <div className={classes.alertContainer}>
                {!isEmpty(institutionErrors) && (
                    <Alert variant="danger">
                        <Container>
                            {map(institutionErrors, (error, index) => {
                                return (
                                    <Row key={index}>
                                        <Col className={classes.errorText}>Error: {error?.message}</Col>
                                    </Row>
                                );
                            })}
                        </Container>
                    </Alert>
                )}
            </div>
            <form onSubmit={institutionHandleSubmit(handleInstitutionSubmit)}>
                <Row className={classes.modalInputRow}>
                    <Col>
                        <Input
                            {...institutionRegister('name', {
                                required: 'Institution Name is missing.',
                            })}
                            label="Institution Name"
                            ariaLabel="institution name"
                            required
                            error={institutionErrors?.name}
                            controlId="name"
                            type="text"
                            name="name"
                            containerClass={classes.inputLabel}
                        />
                    </Col>
                </Row>
                <Row className={classes.modalInputRow}>
                    <Col>
                        <Select
                            {...institutionRegister('country', {
                                required: 'Country is missing.',
                            })}
                            className={classes.select}
                            label="Country"
                            ariaLabel="country"
                            required
                            placeholder="---"
                            options={allCountries}
                            error={institutionErrors?.country}
                            controlId="country"
                            type="text"
                            name="country"
                        />
                    </Col>
                </Row>
                {locationComp()}
                <Row className={classes.toggleGap}>
                    <Col>
                        <Select
                            {...institutionRegister('type', {
                                required: 'Institution Type is missing.',
                            })}
                            className={classes.select}
                            label="Institution Type"
                            ariaLabel="institution type"
                            placeholder="---"
                            options={institutionTypes}
                            required
                            error={institutionErrors?.type}
                            controlId="type"
                            type="text"
                            name="type"
                        />
                    </Col>
                </Row>
                <Row className={classes.modalInputRow}>
                    <Col className={classes.inlineToggle}>
                        <Toggle
                            {...institutionRegister('isForProfit', {
                                required: 'Select either For-Profit or Non-Profit',
                            })}
                            handleChange={() => {
                                institutionSetValue('isForProfit', 1);
                            }}
                            error={institutionErrors?.isForProfit}
                            label="For-Profit"
                            controlId="forProfit"
                            type="radio"
                            className={classes.toggle}
                        />
                        <Toggle
                            {...institutionRegister('isForProfit', {
                                required: 'Select either For-Profit or Non-Profit',
                            })}
                            handleChange={() => {
                                institutionSetValue('isForProfit', 0);
                            }}
                            error={institutionErrors?.isForProfit}
                            label="Non-Profit"
                            controlId="forProfit"
                            type="radio"
                            className={classes.toggle}
                        />
                    </Col>
                </Row>
                <Row className={classes.modalInputRow}>
                    <Col>
                        <Input
                            {...institutionRegister('rorId')}
                            onChange={(e) => rorIdHandler(e.target.value)}
                            value={rorIdValue}
                            label="ROR ID"
                            ariaLabel="ror id"
                            error={institutionErrors?.rorId}
                            controlId="rorId"
                            type="text"
                            name="rorId"
                            containerClass={classes.inputLabel}
                        />
                    </Col>
                </Row>
                <Row className={classes.modalInputRow}>
                    <div className={classes.centered}>
                        <Button label="Add Institution" size="small" variant="primary" type="submit" />
                    </div>
                </Row>
            </form>
        </div>
    );
    const footerComp = (
        <>
            <span>Need help?</span>
            <Link href="/support" className={classes.link}>
                Contact the support team
            </Link>
        </>
    );

    return (
        <>
            <Modal
                show={visible}
                onHide={closeModal}
                closable={true}
                title="Add Institution"
                bodyChildren={bodyComp}
                footerChildren={footerComp}
                dialogClassName={classes.modalWidth}
                formInstructions={true}
            />
        </>
    );
};

AddInstitutionModal.propTypes = {
    allCountries: PropTypes.arrayOf(PropTypes.object),
    allStates: PropTypes.arrayOf(PropTypes.object),
    closeModal: PropTypes.func,
    institutionTypes: PropTypes.arrayOf(PropTypes.object),
    setInstitutionList: PropTypes.func,
    setInstitutionObj: PropTypes.func,
    userRegUseForm: PropTypes.func,
    visible: PropTypes.bool,
};

export default AddInstitutionModal;
