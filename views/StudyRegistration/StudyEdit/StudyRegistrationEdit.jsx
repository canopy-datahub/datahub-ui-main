/* eslint-disable no-inner-declarations */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classes from './StudyRegistrationEdit.module.scss';
import { useRouter } from 'next/router';
import Banner from '../../../components/Banner/Banner';
import { Col, Container, Row, Card, Badge } from 'react-bootstrap';
import Button from '../../../components/Button/Button';
import StudyRegistrationForm from './Components/StudyRegistrationForm';
import { useForm } from 'react-hook-form';
import useRest from '../../../lib/hooks/useRest';
import Alert from '../../../components/Notifications/Alert';
import { isEmpty } from '../../../lib/hooks/comparisonFunctions';
import Input from '../../../components/Input/Input';
import { BaseNotification, NotificationType } from '../../../store/notifications/notificationConstants';
import { UPDATE_STUDY_REGISTRATION } from '../../../constants/apiRoutes';
import { addNotification } from '../../../store/notifications/notificationsSlice';
import { useDispatch } from 'react-redux';
import { scrollToTop } from '../../../lib/componentHelpers/scrollHelpers';
import { ChevronLeft, Download, ChevronRight } from 'react-bootstrap-icons';
import TextArea from '../../../components/TextArea/TextArea';
import Cookies from 'js-cookie';
import ReturnToDashModal from './Components/ReturnToDashModal';
import Select from '../../../components/Select/Select';
import { useEffect } from 'react';



/**
 * @property {String} type - details if the curator or a center is looking at this page and manages differences in the views
 * @property {Object} formData - data that prepopulates these fields
 * @property {Object} studyInfo - the original data from the study
 * @property {Object} codeListsValues - all of the codelists on the site
 * @property {Boolean} isNewStudy - whether this is a new study or an existing study
 * @property {String} status - the status of the study, could be 'Draft', 'In Review', or 'Approved'
 * @returns {Node} The Study Registration Edit form
 */

const StudyRegistrationEdit = (props) => {
    const { type, formData, studyInfo, codeListsValues, isNewStudy, status } = props;
    const crumbs = [
        {
            page: 'Home',
            pageLink: '/',
            ariaLabel: 'home',
        },
        {
            page: 'Study Registration',
            // eslint-disable-next-line react/prop-types
            pageLink: `/${type.toLowerCase()}/studyRegistration?status=${status}`,
            ariaLabel: 'Study Registration',
        },
        {
            page: isNewStudy ? 'Register New Study' : `Edit Study : ${formData?.phs} [${status}]`,
        },
    ];

    const dispatch = useDispatch();

    const [returnModal, setReturnModal] = useState(false);

    const [foa, setFoa] = useState(formData?.FOA_number || []);
    const [topics, setTopics] = useState(formData?.topics_other_specify || []);
    const [keywords, setKeywords] = useState(formData?.subject || []);
    const [publicationURLs, setPublicationURLs] = useState(formData?.publication_URL || []);
    const [sourceOtherSpecify, setSourceOtherSpecify] = useState(formData?.source_other_specify || []);
    const [otherDataAccessPoints, setOtherDataAccessPoints] = useState(formData?.data_access_points_other || []);
    const [grantNumber, setGrantNumber] = useState(formData?.grant_number || []);
    const [typesOtherSpecify, setTypesOtherSpecify] = useState(formData?.types_other_specify || []);
    const [dataGeneralTypesOtherSpecify, setDataGeneralTypesOtherSpecify] = useState(formData?.data_general_types_other_specify || []);
    const [dataGenomicOtherSpecify, setDataGenomicOtherSpecify] = useState(formData?.data_genomic_other_specify || []);
    const [dataPhenotypeOtherSpecify, setDataPhenotypeOtherSpecify] = useState(formData?.data_phenotype_other_specify || []);
    const [dataSampleTypesOtherSpecify, setDataSampleTypesOtherSpecify] = useState(formData?.data_sample_types_other_specify || []);
    const [dataGenotypeOtherSpecify, setDataGenotypeOtherSpecify] = useState(formData?.data_genotype_other_specify || []);
    const [dataSequencingOtherSpecify, setDataSequencingOtherSpecify] = useState(formData?.data_sequencing_other_specify || []);
    const [dataAnalysesOtherSpecify, setDataAnalysesOtherSpecify] = useState(formData?.data_analyses_other_specify || []);
    const [dataArrayDataOtherSpecify, setDataArrayDataOtherSpecify] = useState(formData?.data_array_data_other_specify || []);

    const [hasIC, setHasIC] = useState(formData?.has_ic || false);
    const [dataSharingInfo, setDataSharingInfo] = useState(formData?.data_sharing_info || false);
    const [isMultiCenter, setIsMultiCenter] = useState(formData?.is_multi_center || "No");

    const formStates = {
        foa,
        setFoa,
        topics,
        setTopics,
        keywords,
        setKeywords,
        publicationURLs,
        setPublicationURLs,
        sourceOtherSpecify,
        setSourceOtherSpecify,
        setHasIC,
        hasIC,
        setDataSharingInfo,
        dataSharingInfo,
        setIsMultiCenter,
        isMultiCenter,
        setOtherDataAccessPoints,
        otherDataAccessPoints,
        setGrantNumber,
        grantNumber,
        setTypesOtherSpecify,
        typesOtherSpecify,
        setDataGeneralTypesOtherSpecify,
        dataGeneralTypesOtherSpecify,
        setDataGenomicOtherSpecify,
        dataGenomicOtherSpecify,
        setDataPhenotypeOtherSpecify,
        dataPhenotypeOtherSpecify,
        setDataSampleTypesOtherSpecify,
        dataSampleTypesOtherSpecify,
        setDataGenotypeOtherSpecify,
        dataGenotypeOtherSpecify,
        setDataSequencingOtherSpecify,
        dataSequencingOtherSpecify,
        setDataAnalysesOtherSpecify,
        dataAnalysesOtherSpecify,
        setDataArrayDataOtherSpecify,
        dataArrayDataOtherSpecify,
    };

    const router = useRouter();
    const { restPut, restGet } = useRest();
    const {
        register,
        handleSubmit,
        formState: { errors, isValid, dirtyFields, isValidating },
        setValue,
        getValues,
        resetField,
        trigger,
        control,
    } = useForm({
        mode: 'onSubmit',        // Only validate on submit, not on change
        reValidateMode: 'onSubmit', // Only re-validate on submit
    });

    // Consolidated required fields configuration
    const getRequiredFieldsConfig = () => {
        return {
            basicFields: [
                { field: 'center', label: 'Center' },
                { field: 'title', label: 'Study Name' },
                { field: 'pi_name', label: 'PI Name' },
                { field: 'pi_email', label: 'PI Email' },
                { field: 'pi_institution', label: 'PI Institution' },
                { field: 'pi_assistant_name', label: 'Data Submitter Name' },
                { field: 'pi_assistant_email', label: 'Data Submitter Email' },
                { field: 'po_name', label: 'NIH Program Officer' },
                { field: 'acknowledgement_statement', label: 'Acknowledgment Statement' },
                { field: 'description', label: 'Study Description' },
                { field: 'studystartdate', label: 'Study Start Date' },
                { field: 'studyenddate', label: 'Study End Date' }
            ],
            arrayFields: [
                { field: 'FOA_number', label: 'FOA Number', stateArray: foa },
                { field: 'grant_number', label: 'Grant Number', stateArray: grantNumber },
                { field: 'subject', label: 'Keywords', stateArray: keywords }
            ],
            selectFields: [
                { field: 'institutes_supporting_study', label: 'NIH Institute / Center' },
                { field: 'types', label: 'Study Design' },
                { field: 'topics', label: 'Study Domain' },
                { field: 'source', label: 'Data Collection Methods' },
                { field: 'study_population_focus', label: 'Study Population Focus' }
            ]
        };
    };

    // Function to validate minimum fields required for save (study name only)
    const validateSaveRequirements = () => {
        const values = getValues();
        
        // Helper function to check if a field value is empty
        const isFieldEmpty = (value) => {
            if (value === null || value === undefined) return true;
            if (typeof value === 'string') return value.trim() === '';
            if (Array.isArray(value)) return value.length === 0;
            if (typeof value === 'object') return Object.keys(value).length === 0;
            return !value;
        };
        
        // For save operations, only study name is required
        const studyNameMissing = isFieldEmpty(values.title);
        
        return {
            canSave: !studyNameMissing,
            missingFields: studyNameMissing ? ['Study Name'] : []
        };
    };

    // Function to validate all required fields and return validation status
    const validateRequiredFields = () => {
        const values = getValues();
        const config = getRequiredFieldsConfig();
        const missing = [];
        
        // Helper function to check if a field value is empty
        const isFieldEmpty = (value) => {
            if (value === null || value === undefined) {
                return true;
            }
            if (typeof value === 'string') {
                return value.trim() === '';
            }
            if (Array.isArray(value)) {
                return value.length === 0;
            }
            if (typeof value === 'object') {
                return Object.keys(value).length === 0;
            }
            return !value;
        };
        
        // Check basic required fields
        for (const { field, label } of config.basicFields) {
            if (isFieldEmpty(values[field])) {
                missing.push(label);
            }
        }
        
        // Check array fields that need at least one item
        for (const { field, label, stateArray } of config.arrayFields) {
            const formValue = values[field];
            const hasFormValue = formValue && (typeof formValue === 'string' ? formValue.trim() !== '' : !isFieldEmpty(formValue));
            const hasStateValue = stateArray && stateArray.length > 0;
            
            if (!hasFormValue && !hasStateValue) {
                missing.push(label);
            }
        }
        
        // Check select fields
        for (const { field, label } of config.selectFields) {
            if (isFieldEmpty(values[field])) {
                missing.push(label);
            }
        }
        
        return {
            isValid: missing.length === 0,
            missingFields: missing
        };
    };

    // Function to get missing required fields for user feedback
    const getMissingRequiredFields = () => {
        return validateRequiredFields().missingFields;
    };

    // Function to determine if save button should be disabled
    const isSaveDisabled = () => {
        return !validateSaveRequirements().canSave;
    };

    // Function to determine if submit button should be disabled
    const isSubmitDisabled = () => {
        // Check if form has errors
        if (Object.keys(errors).length > 0) {
            return true;
        }
        
        // Check if form is currently validating
        if (isValidating) {
            return true;
        }
        
        // Check if all required fields are filled
        return !validateRequiredFields().isValid;
    };

    const handleSubmitHelper = async (data, shouldSubmit) => {
        // Manually trigger validation so I can see errors before I do any data processing
        trigger();
        data.has_ic = hasIC;
        data.data_sharing_info = dataSharingInfo;
        data.is_multi_center = isMultiCenter;
        // if form isValid, process all of the array fields and do the calls
        if ((isValid && Object.keys(dirtyFields).length > 0) || !shouldSubmit || isValid || isNewStudy) {
            data.FOA_number = [...foa, data.FOA_number ? data.FOA_number : null];
            if (isEmpty(data.FOA_number[data.FOA_number.length - 1])) {
                data.FOA_number.pop();
            }
            data.topics_other_specify = [...topics, data.topics_other_specify ? data.topics_other_specify : null];
            if (isEmpty(data.topics_other_specify[data.topics_other_specify.length - 1])) {
                data.topics_other_specify.pop();
            }
            data.subject = [...keywords, data.subject ? data.subject : null];
            if (isEmpty(data.subject[data.subject.length - 1])) {
                data.subject.pop();
            }
            data.publication_URL = [...publicationURLs, data.publication_URL ? data.publication_URL : null];
            if (isEmpty(data.publication_URL[data.publication_URL.length - 1])) {
                data.publication_URL.pop();
            }
            data.source_other_specify = [...sourceOtherSpecify, data.source_other_specify ? data.source_other_specify : null];
            if (isEmpty(data.source_other_specify[data.source_other_specify.length - 1])) {
                data.source_other_specify.pop();
            }
           
            data.data_access_points_other = [
                ...otherDataAccessPoints,
                data.data_access_points_other ? data.data_access_points_other : null,
            ];
            if (isEmpty(data.data_access_points_other[data.data_access_points_other.length - 1])) {
                data.data_access_points_other.pop();
            }
            data.grant_number = [...grantNumber, data.grant_number ? data.grant_number : null];
            if (isEmpty(data.grant_number[data.grant_number.length - 1])) {
                data.grant_number.pop();
            }
            data.types_other_specify = [...typesOtherSpecify, data.types_other_specify ? data.types_other_specify : null];
            if (isEmpty(data.types_other_specify[data.types_other_specify.length - 1])) {
                data.types_other_specify.pop();
            }
            data.data_general_types_other_specify = [
                ...dataGeneralTypesOtherSpecify,
                data.data_general_types_other_specify ? data.data_general_types_other_specify : null,
            ];
            if (isEmpty(data.data_general_types_other_specify[data.data_general_types_other_specify.length - 1])) {
                data.data_general_types_other_specify.pop();
            }
            data.data_genomic_other_specify = [
                ...dataGenomicOtherSpecify,
                data.data_genomic_other_specify ? data.data_genomic_other_specify : null,
            ];
            if (isEmpty(data.data_genomic_other_specify[data.data_genomic_other_specify.length - 1])) {
                data.data_genomic_other_specify.pop();
            }
            data.data_phenotype_other_specify = [
                ...dataPhenotypeOtherSpecify,
                data.data_phenotype_other_specify ? data.data_phenotype_other_specify : null,
            ];
            if (isEmpty(data.data_phenotype_other_specify[data.data_phenotype_other_specify.length - 1])) {
                data.data_phenotype_other_specify.pop();
            }
            data.data_sample_types_other_specify = [
                ...dataSampleTypesOtherSpecify,
                data.data_sample_types_other_specify ? data.data_sample_types_other_specify : null,
            ];
            if (isEmpty(data.data_sample_types_other_specify[data.data_sample_types_other_specify.length - 1])) {
                data.data_sample_types_other_specify.pop();
            }
            data.data_genotype_other_specify = [
                ...dataGenotypeOtherSpecify,
                data.data_genotype_other_specify ? data.data_genotype_other_specify : null,
            ];
            if (isEmpty(data.data_genotype_other_specify[data.data_genotype_other_specify.length - 1])) {
                data.data_genotype_other_specify.pop();
            }
            data.data_sequencing_other_specify = [
                ...dataSequencingOtherSpecify,
                data.data_sequencing_other_specify ? data.data_sequencing_other_specify : null,
            ];
            if (isEmpty(data.data_sequencing_other_specify[data.data_sequencing_other_specify.length - 1])) {
                data.data_sequencing_other_specify.pop();
            }
            data.data_analyses_other_specify = [
                ...dataAnalysesOtherSpecify,
                data.data_analyses_other_specify ? data.data_analyses_other_specify : null,
            ];
            if (isEmpty(data.data_analyses_other_specify[data.data_analyses_other_specify.length - 1])) {
                data.data_analyses_other_specify.pop();
            }
            data.data_array_data_other_specify = [
                ...dataArrayDataOtherSpecify,
                data.data_array_data_other_specify ? data.data_array_data_other_specify : null,
            ];
            if (isEmpty(data.data_array_data_other_specify[data.data_array_data_other_specify.length - 1])) {
                data.data_array_data_other_specify.pop();
            }

            // send the data, along with dirty fields to the server to process and send to the backend since we need to update the
        
            
            // For new studies, we need to send different payload structure
            const payload = isNewStudy 
                ? { 
                    formFields: data, 
                    dirtyFields: isNewStudy ? 
                        // For new studies, treat all non-empty fields as dirty
                        Object.keys(data).reduce((acc, key) => {
                            if (data[key] !== null && data[key] !== undefined && data[key] !== '' && 
                                !(Array.isArray(data[key]) && data[key].length === 0)) {
                                acc[key] = true;
                            }
                            return acc;
                        }, {}) 
                        : dirtyFields, 
                    isNewStudy: true 
                }
                : { formFields: data, dirtyFields: dirtyFields, originalFields: studyInfo };
                
            const updateResult = await restPut(
                `${UPDATE_STUDY_REGISTRATION.replace('[userType]', type.toLowerCase())}${shouldSubmit}`,
                payload,
                {
                    showLoading: true,
                    successMessage: isNewStudy ? 'Study successfully created' : 'Study successfully updated',
                }
            );
            if (shouldSubmit && !isValid) {
                scrollToTop();
                const tempNotification = { ...BaseNotification };
                tempNotification.message = 'There were errors with your input fields.  Please review the outlined fields.';
                tempNotification.type = NotificationType.ERROR;
                dispatch(addNotification(tempNotification));
                return;
            }
            if (updateResult.request.status === 200 && updateResult?.data.success === true) {
                if (shouldSubmit && isValid) {
                    router.push(`/${type.toLowerCase()}/studyRegistration`);
                    const tempNotification = { ...BaseNotification };
                    tempNotification.message = 'Your submission was successfully processed.';
                    tempNotification.type = NotificationType.SUCCESS;
                    dispatch(addNotification(tempNotification));
                } else if (!shouldSubmit) {
                    scrollToTop();
                    Object.keys(dirtyFields).forEach((key) => delete dirtyFields[key]);
                    const tempNotification = { ...BaseNotification };
                    tempNotification.message =
                        'Your changes have been successfully saved. Please note: any errors indicated on the form are required to be addressed before submitting.';
                    tempNotification.type = NotificationType.SUCCESS;
                    dispatch(addNotification(tempNotification));
                }
            }
        } else {
            scrollToTop();
            const tempNotification = { ...BaseNotification };
            tempNotification.message = 'There were errors with your input fields.  Please review the outlined fields';
            tempNotification.type = NotificationType.ERROR;
            dispatch(addNotification(tempNotification));
        }
    };

    return (
        <>
            <Banner title="Study Registration" manualCrumbs={crumbs} variant="lab4" ariaLabel="Support Request Breadcrumb" />
            {Object.keys(errors).length > 0 && (
                <Alert variant="danger" dismissible className={classes.alert}>
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
            <Container>
                {/* Form Status Card */}
                {!isNewStudy && (
                    <Row className="mt-4 mb-4">
                        <Col>
                            <Card className="border-0 shadow-sm">
                                <Card.Body className="p-4">
                                    <div className="d-flex align-items-center">
                                        <div className="flex-grow-1">
                                            <div className="d-flex align-items-center mb-1">
                                                <Badge 
                                                    bg={status === 'Draft' ? 'secondary' : 
                                                        status === 'In Review' ? 'warning' : 'success'} 
                                                    className="me-2"
                                                    style={{ fontSize: '0.875rem' }}
                                                >
                                                    {status}
                                                </Badge>
                                            </div>
                                            <small className="text-muted">Current Registration Status</small>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                )}

                <Row className="mb-2 mt-2">
                    <ReturnToDashModal
                        visible={returnModal}
                        closeModal={setReturnModal}
                        handleSave={() => {
                            handleSubmit(handleSubmitHelper(getValues(), false));
                            router.push(`/${type.toLowerCase()}/studyRegistration`);
                        }}
                        type={type}
                    />
                    <Col lg={3} className="mb-2">
                        <Select 
                            {...register('center', {
                                required: 'Center is required',
                                value: formData?.center,
                            })}
                            name="center"
                            label="Center"
                            required
                            error={errors.center}
                            options={codeListsValues?.Center || []}
                            placeholder="Select..."
                            valueProp="value"
                            labelProp="label"
                        />
                    </Col>
                    <Col className="mb-2">
                        <Input
                            {...register('title', {
                                required: 'Study Name is missing',
                                value: formData?.title,
                            })}
                            required
                            error={errors.title}
                            controlId="studyName"
                            label="Study Name"
                        />
                    </Col>
                </Row>
            </Container>
            <div className={classes.divider}>
                <Container className={classes.topActionContainer}>
                    <Button
                        label="Return to Dashboard"
                        iconLeft={<ChevronLeft />}
                        className={classes.returnButton}
                        ariaLabel="Return to the Study Registration Dashboard"
                        size="auto"
                        variant="secondary"
                        handleClick={() => {
                            if (Object.keys(dirtyFields).length > 0) {
                                setReturnModal(true);
                            } else {
                                router.push(`/${type.toLowerCase()}/studyRegistration?status=${status}`);
                            }
                        }}
                    />
                    <span className={classes.shoveRight}>Please review and edit these fields if necessary.</span>
                    <div>
                        {type === 'Curator' && !isNewStudy && (
                            <Row>
                                <Button
                                    label="Preview Study Page"
                                    iconRight={<ChevronRight />}
                                    ariaLabel="Preview the Study Page for this study"
                                    size="none"
                                    className={classes.downloadButton}
                                    variant="secondary"
                                    handleClick={() => {
                                        router.push(`/study/${studyInfo.studyId}`);
                                    }}
                                />
                            </Row>
                        )}
                    </div>
                </Container>
            </div>

            <Container>
                <Row className={classes.container}>
                    <Col className={classes.body}>
                        <StudyRegistrationForm
                            register={register}
                            formData={formData}
                            errors={errors}
                            getValues={getValues}
                            resetField={resetField}
                            formStates={formStates}
                            control={control}
                            codeListsValues={codeListsValues}
                            setValue={setValue}
                            trigger={trigger}
                        />
                    </Col>
                </Row>

                {/* Form Status Message */}
                <Row className="mb-3">
                <Col>
                        {(() => {
                            const missingFields = getMissingRequiredFields();
                            const isStudyNameMissing = !formData.studyName?.trim();
                            
                            return (
                                <Alert variant="info" className="mb-3">
                                    <small>
                                        <strong>💾 Save:</strong> {isStudyNameMissing ? 'Study Name required' : 'Ready'} | 
                                        <strong> 📤 Submit:</strong> {missingFields.length > 0 ? 'All required fields needed' : 'Ready'}
                                    </small>
                                </Alert>
                            );
                        })()}
                    </Col>
                </Row>
                
                <Row className="mt-5">
                    <Col lg="3">
                        <Button
                            label="Return to Dashboard"
                            iconLeft={<ChevronLeft />}
                            ariaLabel="Return to the Study Registration Dashboard"
                            size="auto"
                            variant="secondary"
                            handleClick={() => {
                                if (Object.keys(dirtyFields).length > 0) {
                                    setReturnModal(true);
                                } else {
                                    router.push(`/${type.toLowerCase()}/studyRegistration`);
                                }
                            }}
                        />
                    </Col>
                    <Col lg={{ offset: 5 }}>
                        <div className="pullRight">
                            <Button
                                label="Save Progress"
                                ariaLabel="Save Updates"
                                size="large"
                                variant="tertiary"
                                disabled={isSaveDisabled()}
                                handleClick={() => {
                                    handleSubmit(handleSubmitHelper(getValues(), false));
                                }}
                            />
                        </div>
                    </Col>
                    <Col>
                        <div className="pullRight">
                            <Button
                                label={type === 'Curator' ? 'Approve' : 'Send for Review'}
                                ariaLabel="Submit Updates"
                                size="large"
                                variant="primary"
                                disabled={isSubmitDisabled()}
                                handleClick={() => {
                                    handleSubmit(handleSubmitHelper(getValues(), 'true'));
                                }}
                            />
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

StudyRegistrationEdit.propTypes = {
    PDF_URL: PropTypes.string,
    codeListsValues: PropTypes.object,
    formData: PropTypes.shape({
        FOA_number: PropTypes.array,
        data_access_points_other: PropTypes.array,
        data_analyses_other_specify: PropTypes.array,
        data_array_data_other_specify: PropTypes.array,
        data_general_types_other_specify: PropTypes.array,
        data_genomic_other_specify: PropTypes.array,
        data_genotype_other_specify: PropTypes.array,
        data_phenotype_other_specify: PropTypes.array,
        data_sample_types_other_specify: PropTypes.array,
        data_sequencing_other_specify: PropTypes.array,
        data_sharing_info: PropTypes.string,
        center: PropTypes.string,
        grant_number: PropTypes.array,
        has_ic: PropTypes.string,
        is_multi_center: PropTypes.string,
        phs: PropTypes.string,
        publication_URL: PropTypes.array,
        source_other_specify: PropTypes.array,
        subject: PropTypes.array,
        title: PropTypes.string,
        topics_other_specify: PropTypes.array,
        types_other_specify: PropTypes.array,
    }),
    studyInfo: PropTypes.any,
    type: PropTypes.string,
    isNewStudy: PropTypes.bool,
};

export default StudyRegistrationEdit;
