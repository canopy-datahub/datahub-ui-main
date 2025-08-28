import React from 'react';
import PropTypes from 'prop-types';
import classes from '../StudyRegistrationEdit.module.scss';
import { Col, Row } from 'react-bootstrap';
import Button from '../../../../components/Button/Button';
import Input from '../../../../components/Input/Input';
import Multiselect from '../../../../components/Multiselect/Multiselect';
import BadgeSection from './Badges/BadgeSection';
import { isEmpty } from '../../../../lib/hooks/comparisonFunctions';
import Toggle from '../../../../components/Toggle/Toggle';
import TextArea from '../../../../components/TextArea/TextArea';
import { defaultValueGeneratorForMultiSelect } from '../../../../lib/componentHelpers/MultiselectFunctions/defaultValueGenerator';
import { isDateAfterToday, isFirstDateAfterSecondDate } from '../../../../lib/componentHelpers/DatePickerFunctions/DayPickerFunctions';
import { dateValidation } from '../../../../constants/regex';

/**
 * Combined Study Registration Form that includes both Curator and DCC fields
 * @property {Function} register - react hook forms register function. See https://react-hook-form.com/docs/useform/register for documentation.
 * @property {Object} errors - errors returned by react hook form
 * @property {Function} getValues - reach hook form function to get the value of fields. See https://react-hook-form.com/docs/useform/getvalues for documentation.
 * @property {Object} formData - data that prepopulates these fields
 * @property {Function} control - manual controller interface for react hook form. See https://react-hook-form.com/docs/usecontroller/controller for documentation.
 * @property {Object} codeListsValues - all of the codelists on the site
 * @property {Function} resetField - field reset for react hook form, used for those + add buttons. See https://react-hook-form.com/docs/useform/resetfield for documentation.
 * @property {Object} curatorStates - all of the useState variables for curator form fields
 * @property {Object} dccStates - all of the useState variables for DCC form fields
 * @property {Function} setValue - react hook forms function to set the value of a field. See https://react-hook-form.com/docs/useform/setvalue for documentation.
 * @property {Function} trigger - react hook forms trigger function for validation
 * @returns {Node} The combined study registration form
 */

const StudyRegistrationForm = (props) => {
    const { register, errors, getValues, formData, control, codeListsValues, resetField, curatorStates, dccStates, setValue, trigger } = props;
    
    const {
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
    } = curatorStates;

    const {
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
    } = dccStates;

    const isValidUrl = (string) => {
        // breaking it down by regex as URL was not working
        const url = new RegExp(
            '^(https?:\\/\\/)?' + // validate protocol
                '((([a-z\\d]([a-z\\d-]*[a-z\\d])|[a-z\\d])\\.)+[a-z]{2,}|' +
                '((\\d{1,3}\\.){3}\\d{1,3}))' +
                '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' +
                '(\\?[;&a-z\\d%_.~+=-]*)?' +
                '(\\#[-a-z\\d_]*)?$',
            'i'
        );
        return url.test(string);
    };

    return (
        <>
            {/* Curator Form Fields */}
            <Row className={classes.spacer}>
                <Col>
                    <span className={classes.labelFont}>Required Documents</span>
                    <Toggle
                        {...register('has_ic')}
                        className="mt-1"
                        handleChange={(e) => {
                            // This will look weird but I need it to be this way for react hook form to capture this as a dirty field
                            setHasIC(e.target.checked ? 'Yes' : 'No');
                            setValue('has_ic', e.target.checked ? 'Yes' : 'No', { shouldDirty: true });
                        }}
                        selected={hasIC === 'Yes'}
                        key="institutes_supporting_study"
                        label="Institutional Certification"
                    />
                    <Toggle
                        {...register('data_sharing_info')}
                        handleChange={(e) => {
                            // This will look weird but I need it to be this way for react hook form to capture this as a dirty field
                            setDataSharingInfo(e.target.checked ? 'Yes' : 'No');
                            setValue('data_sharing_info', e.target.checked ? 'Yes' : 'No', { shouldDirty: true });
                        }}
                        selected={dataSharingInfo === 'Yes'}
                        key="data_sharing_info"
                        label="Data Sharing & Submission Information"
                    />
                </Col>
                <Col lg={1} />
                <Col>
                    <Input
                        {...register('estimated_participants', {
                            value: formData?.estimated_participants,
                        })}
                        error={errors.estimated_participants}
                        controlId="estimated_participants"
                        label="Estimated Number of Study Participants"
                    />
                </Col>
            </Row>

            <Row className={classes.spacer}>
                <Col>
                    <span className={classes.labelFont}>Is it a Multi-Center Study?</span>
                    <Toggle
                        {...register('is_multi_center')}
                        className="mt-2"
                        handleChange={(e) => {
                            // This will look weird but I need it to be this way for react hook form to capture this as a dirty field
                            setValue('is_multi_center', e.target.checked ? 'Yes' : 'No', { shouldDirty: true });
                            setIsMultiCenter(e.target.checked ? 'Yes' : 'No');
                        }}
                        selected={isMultiCenter === 'Yes'}
                        error={errors.is_multi_center}
                        controlId="is_multi_center"
                        label="Multi-Center Study"
                    />
                </Col>
                <Col lg={1} />
                <Col>
                    <Input
                        {...register('multi_center_sites', {
                            value: formData?.multi_center_sites,
                        })}
                        error={errors.multi_center_sites}
                        controlId="multi_center_sites"
                        label="If multi-center study, list study sites"
                        placeholder=""
                    />
                </Col>
            </Row>

            <Row className={classes.spacer}>
                <Col>
                    <Multiselect
                        isClearable
                        control={control}
                        defaultValue={defaultValueGeneratorForMultiSelect(formData?.data_access_points)}
                        error={errors.data_access_points}
                        name="data_access_points"
                        controlId="data_access_points"
                        label="Data Availability"
                        options={codeListsValues.Repositories}
                    />
                </Col>
                <Col lg={1} />
                <Col>
                    <Row>
                        <Col>
                            <Input
                                {...register('data_access_points_other')}
                                error={errors.data_access_points_other}
                                controlId="data_access_points_other"
                                label="Other Data Availability"
                            />
                        </Col>
                        <Col lg={'2'}>
                            <Button
                                size="none"
                                label="+ Add"
                                ariaLabel="Add Other Data Availability"
                                variant="secondary"
                                className={classes.addButton}
                                handleClick={() => {
                                    if (!isEmpty(getValues('data_access_points_other'))) {
                                        setOtherDataAccessPoints([...otherDataAccessPoints, getValues('data_access_points_other')]);
                                        resetField('data_access_points_other', { keepDirty: true });
                                    }
                                }}
                            />
                        </Col>
                    </Row>
                    {otherDataAccessPoints.length > 0 && (
                        <Row className="mt-4">
                            <Col>
                                <BadgeSection
                                    badgeList={otherDataAccessPoints}
                                    fieldName="data_access_points_other"
                                    setValue={setValue}
                                    setBadges={setOtherDataAccessPoints}
                                />
                            </Col>
                        </Row>
                    )}
                </Col>
            </Row>

            <Row className={classes.spacer}>
                <Col>
                    <Input
                        {...register('data_submission_date', {
                            value: formData?.data_submission_date,
                            validate: (value) => {
                                if (value.length !== 0 && !dateValidation.test(value)) {
                                    return 'Date needs format MM/DD/YYYY';
                                }
                                if (isDateAfterToday(value)) {
                                    return 'Start Date cannot be after today';
                                }
                            },
                        })}
                        inline
                        error={errors.data_submission_date}
                        controlId="data_submission_date"
                        label="Submission Date"
                    />
                </Col>
                <Col lg={1} />
                <Col>
                    <Input
                        {...register('data_submission_timeline_details', {
                            value: formData?.data_submission_timeline_details,
                        })}
                        error={errors.data_submission_timeline_details}
                        controlId="data_submission_timeline_details"
                        label="Data submission timeline details"
                    />
                </Col>
            </Row>

            <Row className={classes.spacer}>
                <Col>
                    <Input
                        {...register('data_target_delivery_date', {
                            value: formData?.data_target_delivery_date,
                            validate: (value) => {
                                if (value.length !== 0 && !dateValidation.test(value)) {
                                    return 'Date needs format MM/DD/YYYY';
                                }
                            },
                        })}
                        inline
                        error={errors.data_target_delivery_date}
                        controlId="data_target_delivery_date"
                        label="Target Data Delivery Date"
                    />
                </Col>
                <Col lg={1} />
                <Col>
                    <Input
                        {...register('data_storage_size', {
                            value: formData?.data_storage_size,
                        })}
                        error={errors.data_storage_size}
                        controlId="data_storage_size"
                        label="Estimated Study Data Size (GB)"
                    />
                </Col>
            </Row>

            <Row className={classes.spacer}>
                <Col>
                    <Input
                        {...register('pi_name', {
                            required: 'PI Name is missing',
                            value: formData?.pi_name,
                        })}
                        error={errors.pi_name}
                        controlId="pi_name"
                        label="PI Name"
                        required
                        inline
                    />
                </Col>
                <Col lg={1} />
                <Col>
                    <Input
                        {...register('pi_email', {
                            required: 'PI Email is missing',
                            value: formData?.pi_email,
                        })}
                        error={errors.pi_email}
                        controlId="pi_email"
                        label="PI Email"
                        required
                        inline
                    />
                </Col>
            </Row>
            <Row className={classes.spacer}>
                <Col>
                    <Input
                        {...register('pi_institution', {
                            required: 'PI Institution is missing',
                            value: formData?.pi_institution,
                        })}
                        error={errors.pi_institution}
                        controlId="pi_institution"
                        label="PI Institution"
                        required
                        inline
                    />
                </Col>
                <Col lg={1} />
                <Col />
            </Row>

            <Row className={classes.spacer}>
                <Col>
                    <Input
                        {...register('pi_assistant_name', {
                            required: 'Data Submitter Name is missing',
                            value: formData?.pi_assistant_name,
                        })}
                        error={errors.pi_assistant_name}
                        controlId="pi_assistant_name"
                        label="Data Submitter Name"
                        required
                        inline
                    />
                </Col>
                <Col lg={1} />
                <Col>
                    <Input
                        {...register('pi_assistant_email', {
                            required: 'Data Submitter Email is missing',
                            value: formData?.pi_assistant_email,
                        })}
                        error={errors.pi_assistant_email}
                        controlId="pi_assistant_email"
                        label="Data Submitter Email"
                        required
                        inline
                    />
                </Col>
            </Row>
            <hr className="separator" />
            <Row className={classes.spacer}>
                <Col>
                    <Row>
                        <Col>
                            <Input
                                {...register('grant_number', {
                                    required: grantNumber.length === 0 && 'At least 1 Grant or Contract Number is required',
                                })}
                                error={errors.grant_number}
                                controlId="grant_number"
                                label="Grant or Contract Number(s)"
                                required
                                inline
                            />
                        </Col>
                        <Col lg={'2'}>
                            <Button
                                size="none"
                                label="+ Add"
                                ariaLabel="Add Grant or Contract Number"
                                variant="secondary"
                                className={classes.addButton}
                                handleClick={() => {
                                    if (!isEmpty(getValues('grant_number'))) {
                                        setGrantNumber([...grantNumber, getValues('grant_number')]);
                                        resetField('grant_number', { keepDirty: true });
                                    }
                                }}
                            />
                        </Col>
                    </Row>
                    {grantNumber.length > 0 && (
                        <Row className="mt-4">
                            <Col>
                                <BadgeSection
                                    badgeList={grantNumber}
                                    fieldName="grant_number"
                                    setValue={setValue}
                                    setBadges={setGrantNumber}
                                />
                            </Col>
                        </Row>
                    )}
                </Col>
                <Col lg={1} />
                <Col>
                    <Input
                        {...register('po_name', {
                            required: 'NIH Program Officer is missing',
                            value: formData?.po_name,
                        })}
                        error={errors.po_name}
                        controlId="po_name"
                        label="NIH Program Officer"
                        required
                        inline
                    />
                </Col>
            </Row>
            <Row className={classes.spacer}>
                <Col>
                    <Multiselect
                        validationRules={{ required: 'At least 1 NIH Institute / Center is required' }}
                        isClearable
                        control={control}
                        defaultValue={defaultValueGeneratorForMultiSelect(formData?.institutes_supporting_study)}
                        required
                        inline
                        error={errors.institutes_supporting_study}
                        name="institutes_supporting_study"
                        controlId="institutes_supporting_study"
                        label="NIH Institute / Center"
                        options={codeListsValues.NIH_Institute}
                    />
                </Col>
                <Col lg={1} />
                <Col />
            </Row>

            {/* DCC Form Fields */}
            <Row className={classes.spacer}>
                <Col>
                    <Row>
                        <Col>
                            <Input
                                {...register('FOA_number', {
                                    required: foa.length === 0 && 'FOA Number is missing',
                                })}
                                error={errors.FOA_number}
                                controlId="FOA_number"
                                label="FOA Number"
                                type="text"
                                required
                                inline
                            />
                        </Col>
                        <Col lg={'2'}>
                            <Button
                                size="none"
                                label="+ Add"
                                ariaLabel="Add Other Topic"
                                variant="secondary"
                                className={classes.addButton}
                                handleClick={() => {
                                    if (!isEmpty(getValues('FOA_number'))) {
                                        setFoa([...foa, getValues('FOA_number')]);
                                        resetField('FOA_number', { keepDirty: true });
                                    }
                                }}
                            />
                        </Col>
                    </Row>
                    {foa.length > 0 && (
                        <Row className="mt-4">
                            <Col>
                                <BadgeSection badgeList={foa} setBadges={setFoa} fieldName="FOA_number" setValue={setValue} />
                            </Col>
                        </Row>
                    )}
                </Col>
                <Col lg={1} />
                <Col />
            </Row>

            <Row className={classes.spacer}>
                <Col>
                <Input
                        {...register('studystartdate', {
                            required: 'Start Date is missing',
                            value: formData?.studystartdate,
                            validate: (value, formValues) => {
                                if (!dateValidation.test(value)) {
                                    return 'Start Date needs format MM/DD/YYYY';
                                }
                                if (!formValues.studyenddate) {
                                    return 'Enter Study End Date to validate this field appropriately';
                                }
                                if (isFirstDateAfterSecondDate(value, formValues.studyenddate)) {
                                    return 'Start Date cannot be after End Date';
                                }
                                if (isDateAfterToday(value)) {
                                    return 'Start Date cannot be after today';
                                }
                            },
                        })}
                        error={errors.studystartdate}
                        inline
                        controlId="studystartdate"
                        label="Study Start Date"
                        placeholder="MM/DD/YYYY"
                        type="text"
                        required
                    />
                </Col>
                <Col lg={1} />
                <Col>
                <Input
                        {...register('studyenddate', {
                            required: 'End Date is missing',
                            value: formData?.studyenddate,
                            validate: (value, formValues) => {
                                if (!dateValidation.test(value)) {
                                    return 'End Date needs format MM/DD/YYYY';
                                }
                                if (!formValues.studystartdate) {
                                    return 'Enter Study Start Date to validate this field appropriately';
                                }
                                if (isFirstDateAfterSecondDate(formValues.studystartdate, value)) {
                                    return 'End Date cannot be before Start Date';
                                }
                            },
                        })}
                        error={errors.studyenddate}
                        controlId="studyenddate"
                        label="Study End Date"
                        placeholder="MM/DD/YYYY"
                        type="text"
                        required
                        inline
                    />
                </Col>
            </Row>

            <Row className={classes.spacer}>
                <Col>
                    <Multiselect
                        isClearable
                        control={control}
                        defaultValue={defaultValueGeneratorForMultiSelect(formData?.topics)}
                        required
                        inline
                        error={errors.topics}
                        validationRules={{ required: 'At least 1 Study Domain is required' }}
                        name="topics"
                        controlId="topics"
                        label="Study Domain"
                        options={codeListsValues.Study_Topics}
                    />
                </Col>
                <Col lg={1} />
                <Col>
                    <Row>
                        <Col>
                            <Input
                                {...register('topics_other_specify')}
                                error={errors.topics_other_specify}
                                controlId="topics_other_specify"
                                label="Other Domain, Specify"
                                placeholder="Add Other Domains one at a time"
                            />
                        </Col>
                        <Col lg={'2'}>
                            <Button
                                size="none"
                                label="+ Add"
                                ariaLabel="Add Other Topic"
                                variant="secondary"
                                className={classes.addButton}
                                handleClick={() => {
                                    if (!isEmpty(getValues('topics_other_specify'))) {
                                        setTopics([...topics, getValues('topics_other_specify')]);
                                        resetField('topics_other_specify', { keepDirty: true });
                                    }
                                }}
                            />
                        </Col>
                    </Row>
                    {topics.length > 0 && (
                        <Row className="mt-4">
                            <Col>
                                <BadgeSection
                                    badgeList={topics}
                                    setBadges={setTopics}
                                    fieldName="topics_other_specify"
                                    setValue={setValue}
                                />
                            </Col>
                        </Row>
                    )}
                </Col>
            </Row>

            <Row className={classes.spacer}>
                <Col>
                    <Multiselect
                        isClearable
                        control={control}
                        defaultValue={defaultValueGeneratorForMultiSelect(formData?.source)}
                        required
                        inline
                        error={errors.source}
                        validationRules={{ required: 'At least 1 Data Collection Method is required' }}
                        name="source"
                        controlId="source"
                        label="Data Collection Methods"
                        options={codeListsValues.Collection_Method}
                    />
                </Col>
                <Col lg={1} />
                <Col>
                    <Row>
                        <Col>
                            <Input
                                {...register('source_other_specify')}
                                error={errors.source_other_specify}
                                controlId="source_other_specify"
                                label="Other Data Collection Methods"
                                placeholder="Add Other Methods one at a time"
                            />
                        </Col>
                        <Col lg={'2'}>
                            <Button
                                size="none"
                                label="+ Add"
                                ariaLabel="Add Other Data Collection Method"
                                variant="secondary"
                                className={classes.addButton}
                                handleClick={() => {
                                    if (!isEmpty(getValues('source_other_specify'))) {
                                        setSourceOtherSpecify([...sourceOtherSpecify, getValues('source_other_specify')]);
                                        resetField('source_other_specify', { keepDirty: true });
                                    }
                                }}
                            />
                        </Col>
                    </Row>
                    {sourceOtherSpecify.length > 0 && (
                        <Row className="mt-4">
                            <Col>
                                <BadgeSection
                                    badgeList={sourceOtherSpecify}
                                    setBadges={setSourceOtherSpecify}
                                    fieldName="source_other_specify"
                                    setValue={setValue}
                                />
                            </Col>
                        </Row>
                    )}
                </Col>
            </Row>

            <Row className={classes.spacer}>
                <Col>
                    <Multiselect
                        isClearable
                        control={control}
                        defaultValue={defaultValueGeneratorForMultiSelect(formData?.study_population_focus)}
                        required
                        inline
                        error={errors.study_population_focus}
                        validationRules={{ required: 'At least 1 Study Population Focus is required' }}
                        name="study_population_focus"
                        controlId="study_population_focus"
                        label="Study Population Focus"
                        options={codeListsValues.Study_Focus_Population}
                    />
                </Col>
                <Col lg={1} />
                <Col>
                    <Row>
                        <Col>
                            <Input
                                {...register('subject', {
                                    required: keywords.length === 0 && 'At least 1 keyword is required',
                                })}
                                error={errors.subject}
                                controlId="subject"
                                label="Keywords"
                                placeholder="Add Keywords one at a time"
                                type="text"
                                required
                                inline
                            />
                        </Col>
                        <Col lg={'2'}>
                            <Button
                                size="none"
                                label="+ Add"
                                ariaLabel="Add Keyword"
                                variant="secondary"
                                className={classes.addButton}
                                handleClick={() => {
                                    if (!isEmpty(getValues('subject'))) {
                                        setKeywords([...keywords, getValues('subject')]);
                                        resetField('subject', { keepDirty: true });
                                    }
                                }}
                            />
                        </Col>
                    </Row>
                    {keywords.length > 0 && (
                        <Row className="mt-4">
                            <Col>
                                <BadgeSection badgeList={keywords} setBadges={setKeywords} fieldName="subject" setValue={setValue} />
                            </Col>
                        </Row>
                    )}
                </Col>
            </Row>

            <Row className={classes.spacer}>
                <Col>
                    <Input
                        {...register('CT_URL', {
                            value: formData?.CT_URL,
                            validate: (value) => {
                                if (!isValidUrl(value) && value.length > 0) {
                                    return "Enter valid Clinical Trials.gov URL in the format: 'http://example.com'";
                                }
                            },
                        })}
                        error={errors.CT_URL}
                        controlId="CT_URL"
                        label="Clinical Trials.gov URL"
                        type="text"
                        inline
                    />
                </Col>
            </Row>
            <Row className={classes.spacer}>
                <Col>
                    <Input
                        {...register('study_website_URL', {
                            value: formData?.study_website_URL,
                            validate: (value) => {
                                if (!isValidUrl(value) && value.length > 0) {
                                    return "Enter valid Study Website URL in the format: 'http://example.com'";
                                }
                            },
                        })}
                        error={errors.study_website_URL}
                        controlId="study_website_URL"
                        label="Study Website URL"
                        type="text"
                        inline
                    />
                </Col>
            </Row>
            <Row className={classes.spacer}>
                <Col>
                    <Input
                        {...register('publication_URL', {
                            validate: (value) => {
                                if (!isValidUrl(value) && value.length > 0) {
                                    return "Enter valid Primary Publication URL  in the format: 'http://example.com'";
                                }
                            },
                        })}
                        error={errors.publication_URL}
                        controlId="publication_URL"
                        label="Primary Publication URL"
                        type="text"
                        inline
                    />
                </Col>
                <Col lg={'2'}>
                    <Button
                        size="none"
                        label="+ Add"
                        ariaLabel="Add Publication URL"
                        variant="secondary"
                        className={classes.addButton}
                        handleClick={() => {
                            if (!isEmpty(getValues('publication_URL'))) {
                                if (isValidUrl(getValues('publication_URL'))) {
                                    setPublicationURLs([...publicationURLs, getValues('publication_URL')]);
                                    resetField('publication_URL', { keepDirty: true });
                                } else {
                                    trigger('publication_URL', { shouldFocus: true });
                                }
                            }
                        }}
                    />
                </Col>
            </Row>
            {publicationURLs.length > 0 && (
                <Row className="mt-4">
                    <Col>
                        <BadgeSection
                            badgeList={publicationURLs}
                            setBadges={setPublicationURLs}
                            fieldName="publication_URL"
                            setValue={setValue}
                        />
                    </Col>
                </Row>
            )}

            {/* Continuing with more Curator fields */}
            <Row className={classes.spacer}>
                <Col>
                    <Multiselect
                        validationRules={{ required: 'At least 1 Study Design is required' }}
                        isClearable
                        control={control}
                        defaultValue={defaultValueGeneratorForMultiSelect(formData?.types)}
                        required
                        inline
                        error={errors.types}
                        name="types"
                        controlId="types"
                        label="Study Design"
                        options={codeListsValues.Study_Design}
                    />
                </Col>
                <Col lg={1} />
                <Col>
                    <Row>
                        <Col>
                            <Input
                                {...register('types_other_specify', {})}
                                error={errors.types_other_specify}
                                controlId="types_other_specify"
                                label="Other Study Design"
                            />
                        </Col>
                        <Col lg={'2'}>
                            <Button
                                size="none"
                                label="+ Add"
                                ariaLabel="Add Other Study Design Types"
                                variant="secondary"
                                className={classes.addButton}
                                handleClick={() => {
                                    if (!isEmpty(getValues('types_other_specify'))) {
                                        setTypesOtherSpecify([...typesOtherSpecify, getValues('types_other_specify')]);
                                        resetField('types_other_specify', { keepDirty: true });
                                    }
                                }}
                            />
                        </Col>
                    </Row>
                    {typesOtherSpecify.length > 0 && (
                        <Row className="mt-4">
                            <Col>
                                <BadgeSection
                                    badgeList={typesOtherSpecify}
                                    fieldName="types_other_specify"
                                    setValue={setValue}
                                    setBadges={setTypesOtherSpecify}
                                />
                            </Col>
                        </Row>
                    )}
                </Col>
            </Row>

            <Row className={classes.spacer}>
                <Col>
                    <Multiselect
                        isClearable
                        control={control}
                        defaultValue={defaultValueGeneratorForMultiSelect(formData?.data_species)}
                        error={errors.data_species}
                        name="data_species"
                        controlId="data_species"
                        label="Species"
                        options={codeListsValues.Species}
                    />
                </Col>
                <Col lg={1} />
                <Col>
                    <Multiselect
                        isClearable
                        control={control}
                        defaultValue={defaultValueGeneratorForMultiSelect(formData?.data_sample_collection)}
                        error={errors.data_sample_collection}
                        name="data_sample_collection"
                        controlId="data_sample_collection"
                        label="Sample Collection"
                        options={codeListsValues.Sample_Collection_Type}
                    />
                </Col>
            </Row>

            <Row className={classes.spacer}>
                <Col>
                    <Multiselect
                        isClearable
                        control={control}
                        defaultValue={defaultValueGeneratorForMultiSelect(formData?.data_general_types)}
                        error={errors.data_general_types}
                        name="data_general_types"
                        controlId="data_general_types"
                        label="Data Types"
                        options={codeListsValues.Data_Type}
                    />
                </Col>
                <Col lg={1} />
                <Col>
                    <Row>
                        <Col>
                            <Input
                                {...register('data_general_types_other_specify')}
                                error={errors.data_general_types_other_specify}
                                controlId="data_general_types_other_specify"
                                label="Other Data Types"
                            />
                        </Col>
                        <Col lg={'2'}>
                            <Button
                                size="none"
                                label="+ Add"
                                ariaLabel="Add Other General Data Type"
                                variant="secondary"
                                className={classes.addButton}
                                handleClick={() => {
                                    if (!isEmpty(getValues('data_general_types_other_specify'))) {
                                        setDataGeneralTypesOtherSpecify([
                                            ...dataGeneralTypesOtherSpecify,
                                            getValues('data_general_types_other_specify'),
                                        ]);
                                        resetField('data_general_types_other_specify', { keepDirty: true });
                                    }
                                }}
                            />
                        </Col>
                    </Row>
                    {dataGeneralTypesOtherSpecify.length > 0 && (
                        <Row className="mt-4">
                            <Col>
                                <BadgeSection
                                    badgeList={dataGeneralTypesOtherSpecify}
                                    fieldName="data_general_types_other_specify"
                                    setValue={setValue}
                                    setBadges={setDataGeneralTypesOtherSpecify}
                                />
                            </Col>
                        </Row>
                    )}
                </Col>
            </Row>

            <Row className={classes.spacer}>
                <Col>
                    <Multiselect
                        isClearable
                        control={control}
                        defaultValue={defaultValueGeneratorForMultiSelect(formData?.data_genomic)}
                        error={errors.data_genomic}
                        name="data_genomic"
                        controlId="data_genomic"
                        label="Genomic Data Types"
                        options={codeListsValues.Genomic_Data_Types}
                    />
                </Col>
                <Col lg={1} />
                <Col>
                    <Row>
                        <Col>
                            <Input
                                {...register('data_genomic_other_specify', {})}
                                error={errors.data_genomic_other_specify}
                                controlId="data_genomic_other_specify"
                                label="Other Genomic Data Types"
                            />
                        </Col>
                        <Col lg={'2'}>
                            <Button
                                size="none"
                                label="+ Add"
                                ariaLabel="Add Other Genomic Data Type"
                                variant="secondary"
                                className={classes.addButton}
                                handleClick={() => {
                                    if (!isEmpty(getValues('data_genomic_other_specify'))) {
                                        setDataGenomicOtherSpecify([...dataGenomicOtherSpecify, getValues('data_genomic_other_specify')]);
                                        resetField('data_genomic_other_specify', { keepDirty: true });
                                    }
                                }}
                            />
                        </Col>
                    </Row>
                    {dataGenomicOtherSpecify.length > 0 && (
                        <Row className="mt-4">
                            <Col>
                                <BadgeSection
                                    badgeList={dataGenomicOtherSpecify}
                                    fieldName="data_genomic_other_specify"
                                    setValue={setValue}
                                    setBadges={setDataGenomicOtherSpecify}
                                />
                            </Col>
                        </Row>
                    )}
                </Col>
            </Row>

            <Row className={classes.spacer}>
                <Col>
                    <Multiselect
                        isClearable
                        control={control}
                        defaultValue={defaultValueGeneratorForMultiSelect(formData?.data_phenotype)}
                        error={errors.data_phenotype}
                        name="data_phenotype"
                        controlId="data_phenotype"
                        label="Phenotypes"
                        options={codeListsValues.Phenotype_Data_Types}
                    />
                </Col>
                <Col lg={1} />
                <Col>
                    <Row>
                        <Col>
                            <Input
                                {...register('data_phenotype_other_specify')}
                                error={errors.data_phenotype_other_specify}
                                controlId="data_phenotype_other_specify"
                                label="Other Phenotypes"
                            />
                        </Col>
                        <Col lg={'2'}>
                            <Button
                                size="none"
                                label="+ Add"
                                ariaLabel="Add Other Phenotypes"
                                variant="secondary"
                                className={classes.addButton}
                                handleClick={() => {
                                    if (!isEmpty(getValues('data_phenotype_other_specify'))) {
                                        setDataPhenotypeOtherSpecify([
                                            ...dataPhenotypeOtherSpecify,
                                            getValues('data_phenotype_other_specify'),
                                        ]);
                                        resetField('data_phenotype_other_specify', { keepDirty: true });
                                    }
                                }}
                            />
                        </Col>
                    </Row>
                    {dataPhenotypeOtherSpecify.length > 0 && (
                        <Row className="mt-4">
                            <Col>
                                <BadgeSection
                                    badgeList={dataPhenotypeOtherSpecify}
                                    fieldName="data_phenotype_other_specify"
                                    setValue={setValue}
                                    setBadges={setDataPhenotypeOtherSpecify}
                                />
                            </Col>
                        </Row>
                    )}
                </Col>
            </Row>

            <Row className={classes.spacer}>
                <Col>
                    <Multiselect
                        isClearable
                        control={control}
                        defaultValue={defaultValueGeneratorForMultiSelect(formData?.data_sample_types)}
                        error={errors.data_sample_types}
                        name="data_sample_types"
                        controlId="data_sample_types"
                        label="Sample Types"
                        options={codeListsValues.Sample_Types}
                    />
                </Col>
                <Col lg={1} />
                <Col>
                    <Row>
                        <Col>
                            <Input
                                {...register('data_sample_types_other_specify')}
                                error={errors.data_sample_types_other_specify}
                                controlId="data_sample_types_other_specify"
                                label="Other Sample Types"
                            />
                        </Col>
                        <Col lg={'2'}>
                            <Button
                                size="none"
                                label="+ Add"
                                ariaLabel="Add Other Sample Types"
                                variant="secondary"
                                className={classes.addButton}
                                handleClick={() => {
                                    if (!isEmpty(getValues('data_sample_types_other_specify'))) {
                                        setDataSampleTypesOtherSpecify([
                                            ...dataSampleTypesOtherSpecify,
                                            getValues('data_sample_types_other_specify'),
                                        ]);
                                        resetField('data_sample_types_other_specify', { keepDirty: true });
                                    }
                                }}
                            />
                        </Col>
                    </Row>
                    {dataSampleTypesOtherSpecify.length > 0 && (
                        <Row className="mt-4">
                            <Col>
                                <BadgeSection
                                    badgeList={dataSampleTypesOtherSpecify}
                                    fieldName="data_sample_types_other_specify"
                                    setValue={setValue}
                                    setBadges={setDataSampleTypesOtherSpecify}
                                />
                            </Col>
                        </Row>
                    )}
                </Col>
            </Row>

            <Row className={classes.spacer}>
                <Col>
                    <Multiselect
                        isClearable
                        control={control}
                        defaultValue={defaultValueGeneratorForMultiSelect(formData?.data_genotype)}
                        error={errors.data_genotype}
                        name="data_genotype"
                        controlId="data_genotype"
                        label="Genotypes"
                        options={codeListsValues.Genotypes}
                    />
                </Col>
                <Col lg={1} />
                <Col>
                    <Row>
                        <Col>
                            <Input
                                {...register('data_genotype_other_specify')}
                                error={errors.data_genotype_other_specify}
                                controlId="data_genotype_other_specify"
                                label="Other Genotypes"
                            />
                        </Col>
                        <Col lg={'2'}>
                            <Button
                                size="none"
                                label="+ Add"
                                ariaLabel="Add Other Genotypes"
                                variant="secondary"
                                className={classes.addButton}
                                handleClick={() => {
                                    if (!isEmpty(getValues('data_genotype_other_specify'))) {
                                        setDataGenotypeOtherSpecify([
                                            ...dataGenotypeOtherSpecify,
                                            getValues('data_genotype_other_specify'),
                                        ]);
                                        resetField('data_genotype_other_specify', { keepDirty: true });
                                    }
                                }}
                            />
                        </Col>
                    </Row>
                    {dataGenotypeOtherSpecify.length > 0 && (
                        <Row className="mt-4">
                            <Col>
                                <BadgeSection
                                    badgeList={dataGenotypeOtherSpecify}
                                    fieldName="data_genotype_other_specify"
                                    setValue={setValue}
                                    setBadges={setDataGenotypeOtherSpecify}
                                />
                            </Col>
                        </Row>
                    )}
                </Col>
            </Row>

            <Row className={classes.spacer}>
                <Col>
                    <Multiselect
                        isClearable
                        control={control}
                        defaultValue={defaultValueGeneratorForMultiSelect(formData?.data_sequencing)}
                        error={errors.data_sequencing}
                        name="data_sequencing"
                        controlId="data_sequencing"
                        label="Sequencing Data Types"
                        options={codeListsValues.Sequencing_Data_Types}
                    />
                </Col>
                <Col lg={1} />
                <Col>
                    <Row>
                        <Col>
                            <Input
                                {...register('data_sequencing_other_specify')}
                                error={errors.data_sequencing_other_specify}
                                controlId="data_sequencing_other_specify"
                                label="Other Sequencing Data Types"
                            />
                        </Col>
                        <Col lg={'2'}>
                            <Button
                                size="none"
                                label="+ Add"
                                ariaLabel="Add Other Sequencing Data Types"
                                variant="secondary"
                                className={classes.addButton}
                                handleClick={() => {
                                    if (!isEmpty(getValues('data_sequencing_other_specify'))) {
                                        setDataSequencingOtherSpecify([
                                            ...dataSequencingOtherSpecify,
                                            getValues('data_sequencing_other_specify'),
                                        ]);
                                        resetField('data_sequencing_other_specify', { keepDirty: true });
                                    }
                                }}
                            />
                        </Col>
                    </Row>
                    {dataSequencingOtherSpecify.length > 0 && (
                        <Row className="mt-4">
                            <Col>
                                <BadgeSection
                                    badgeList={dataSequencingOtherSpecify}
                                    fieldName="data_sequencing_other_specify"
                                    setValue={setValue}
                                    setBadges={setDataSequencingOtherSpecify}
                                />
                            </Col>
                        </Row>
                    )}
                </Col>
            </Row>

            <Row className="mb-5">
                <Col>
                    <Multiselect
                        isClearable
                        control={control}
                        defaultValue={defaultValueGeneratorForMultiSelect(formData?.data_analyses)}
                        error={errors.data_analyses}
                        name="data_analyses"
                        controlId="data_analyses"
                        label="Genomic Analyses Types"
                        options={codeListsValues.Genomic_Analyses_Types}
                    />
                </Col>
                <Col lg={1} />
                <Col>
                    <Row>
                        <Col>
                            <Input
                                {...register('data_analyses_other_specify')}
                                error={errors.data_analyses_other_specify}
                                controlId="data_analyses_other_specify"
                                label="Other Genomic Analyses Types"
                            />
                        </Col>
                        <Col lg={'2'}>
                            <Button
                                size="none"
                                label="+ Add"
                                ariaLabel="Add "
                                variant="secondary"
                                className={classes.addButton}
                                handleClick={() => {
                                    if (!isEmpty(getValues('data_analyses_other_specify'))) {
                                        setDataAnalysesOtherSpecify([
                                            ...dataAnalysesOtherSpecify,
                                            getValues('data_analyses_other_specify'),
                                        ]);
                                        resetField('data_analyses_other_specify', { keepDirty: true });
                                    }
                                }}
                            />
                        </Col>
                    </Row>
                    {dataAnalysesOtherSpecify.length > 0 && (
                        <Row className="mt-4">
                            <Col>
                                <BadgeSection
                                    badgeList={dataAnalysesOtherSpecify}
                                    fieldName="data_analyses_other_specify"
                                    setValue={setValue}
                                    setBadges={setDataAnalysesOtherSpecify}
                                />
                            </Col>
                        </Row>
                    )}
                </Col>
            </Row>

            <Row className={classes.spacer}>
                <Col>
                    <Multiselect
                        isClearable
                        control={control}
                        defaultValue={defaultValueGeneratorForMultiSelect(formData?.data_array_data)}
                        error={errors.data_array_data}
                        name="data_array_data"
                        controlId="data_array_data"
                        label="Genomic Array Data Types"
                        options={codeListsValues.Genomic_Array_Data_Types}
                    />
                </Col>
                <Col lg={1} />
                <Col>
                    <Row>
                        <Col>
                            <Input
                                {...register('data_array_data_other_specify')}
                                error={errors.data_array_data_other_specify}
                                controlId="data_array_data_other_specify"
                                label="Other Genomic Array Data Types"
                            />
                        </Col>
                        <Col lg={'2'}>
                            <Button
                                size="none"
                                label="+ Add"
                                ariaLabel="Add Other Genomic Array Data Types"
                                variant="secondary"
                                className={classes.addButton}
                                handleClick={() => {
                                    if (!isEmpty(getValues('data_array_data_other_specify'))) {
                                        setDataArrayDataOtherSpecify([
                                            ...dataArrayDataOtherSpecify,
                                            getValues('data_array_data_other_specify'),
                                        ]);
                                        resetField('data_array_data_other_specify', { keepDirty: true });
                                    }
                                }}
                            />
                        </Col>
                    </Row>
                    {dataArrayDataOtherSpecify.length > 0 && (
                        <Row className="mt-4">
                            <Col>
                                <BadgeSection
                                    badgeList={dataArrayDataOtherSpecify}
                                    fieldName="data_array_data_other_specify"
                                    setValue={setValue}
                                    setBadges={setDataArrayDataOtherSpecify}
                                />
                            </Col>
                        </Row>
                    )}
                </Col>
            </Row>
            <hr className="separator" />
            <Row className={classes.spacer}>
                <Col>
                    <TextArea
                        {...register('acknowledgement_statement', {
                            required: 'Acknowledgment Statement is missing',
                            value: formData?.acknowledgement_statement,
                        })}
                        label="Acknowledgment Statement"
                        ariaLabel="Acknowledgment Statement"
                        required
                        inline
                        error={errors?.acknowledgement_statement}
                        controlId="acknowledgement_statement"
                        name="acknowledgement_statement"
                        className={classes.textArea}
                    />
                </Col>
                <Col lg={1} />
                <Col>
                    <TextArea
                        {...register('description', {
                            required: 'Study Description is missing',
                            value: formData?.description,
                        })}
                        label="Study Description"
                        ariaLabel="Study Description"
                        required
                        inline
                        error={errors?.description}
                        controlId="description"
                        name="description"
                        className={classes.textArea}
                    />
                </Col>
            </Row>
            <hr className="separator" />
            <Row className={classes.spacer}>
                <h4>Data Use Limitations</h4>
            </Row>
            <Row className={classes.spacer}>
                <Col>
                    <Multiselect
                        isClearable
                        control={control}
                        defaultValue={defaultValueGeneratorForMultiSelect(formData?.general_research_group)}
                        error={errors.general_research_group}
                        name="general_research_group"
                        controlId="general_research_group"
                        label="General Research Use"
                        options={codeListsValues.General_Research_Use}
                    />
                </Col>
                <Col lg={1} />
                <Col>
                    <Multiselect
                        isClearable
                        control={control}
                        defaultValue={defaultValueGeneratorForMultiSelect(formData?.health_biomed_group)}
                        error={errors.health_biomed_group}
                        name="health_biomed_group"
                        controlId="health_biomed_group"
                        label="Health/Medical/Biomedical"
                        options={codeListsValues.HealthBiomed_Research_Use}
                    />
                </Col>
            </Row>

            <Row className={classes.spacer}>
                <Col>
                    <Multiselect
                        isClearable
                        control={control}
                        defaultValue={defaultValueGeneratorForMultiSelect(formData?.disease_specific_group)}
                        error={errors.disease_specific_group}
                        name="disease_specific_group"
                        controlId="disease_specific_group"
                        label="Conditions/Diseases"
                        options={codeListsValues.Disease_Research_Use}
                    />
                </Col>
                <Col lg={1} />
                <Col>
                    <Input
                        {...register('disease_specific_related_conditions', {
                            value: formData?.disease_specific_related_conditions,
                        })}
                        error={errors.disease_specific_related_conditions}
                        controlId="disease_specific_related_conditions"
                        label="Related Conditions"
                    />
                </Col>
            </Row>

            <Row className={classes.spacer}>
                <Col>
                    <Input
                        {...register('other_group_description', {
                            value: formData?.other_group_description,
                        })}
                        error={errors.other_group_description}
                        controlId="other_group_description"
                        label="Other Data Use Limitations"
                    />
                </Col>
                <Col lg={1} />
                <Col />
            </Row>
            <hr className="separator" />
        </>
    );
};

StudyRegistrationForm.propTypes = {
    codeListsValues: PropTypes.shape({
        Collection_Method: PropTypes.array,
        Data_Type: PropTypes.array,
        Disease_Research_Use: PropTypes.array,
        General_Research_Use: PropTypes.array,
        Genomic_Analyses_Types: PropTypes.array,
        Genomic_Array_Data_Types: PropTypes.array,
        Genomic_Data_Types: PropTypes.array,
        Genotypes: PropTypes.array,
        HealthBiomed_Research_Use: PropTypes.array,
        NIH_Institute: PropTypes.array,
        Phenotype_Data_Types: PropTypes.array,
        Repositories: PropTypes.array,
        Sample_Collection_Type: PropTypes.array,
        Sample_Types: PropTypes.array,
        Sequencing_Data_Types: PropTypes.array,
        Species: PropTypes.array,
        Study_Design: PropTypes.array,
        Study_Focus_Population: PropTypes.array,
        Study_Topics: PropTypes.array,
    }),
    control: PropTypes.object,
    curatorStates: PropTypes.shape({
        dataAnalysesOtherSpecify: PropTypes.any,
        dataArrayDataOtherSpecify: PropTypes.any,
        dataGeneralTypesOtherSpecify: PropTypes.any,
        dataGenomicOtherSpecify: PropTypes.any,
        dataGenotypeOtherSpecify: PropTypes.any,
        dataPhenotypeOtherSpecify: PropTypes.any,
        dataSampleTypesOtherSpecify: PropTypes.any,
        dataSequencingOtherSpecify: PropTypes.any,
        dataSharingInfo: PropTypes.string,
        grantNumber: PropTypes.any,
        hasIC: PropTypes.string,
        isMultiCenter: PropTypes.string,
        otherDataAccessPoints: PropTypes.any,
        setDataAnalysesOtherSpecify: PropTypes.func,
        setDataArrayDataOtherSpecify: PropTypes.func,
        setDataGeneralTypesOtherSpecify: PropTypes.func,
        setDataGenomicOtherSpecify: PropTypes.func,
        setDataGenotypeOtherSpecify: PropTypes.func,
        setDataPhenotypeOtherSpecify: PropTypes.func,
        setDataSampleTypesOtherSpecify: PropTypes.func,
        setDataSequencingOtherSpecify: PropTypes.func,
        setDataSharingInfo: PropTypes.func,
        setGrantNumber: PropTypes.func,
        setHasIC: PropTypes.func,
        setIsMultiCenter: PropTypes.func,
        setOtherDataAccessPoints: PropTypes.func,
        setTypesOtherSpecify: PropTypes.func,
        typesOtherSpecify: PropTypes.any,
    }),
    dccStates: PropTypes.shape({
        foa: PropTypes.array,
        keywords: PropTypes.array,
        publicationURLs: PropTypes.array,
        setFoa: PropTypes.func,
        setKeywords: PropTypes.func,
        setPublicationURLs: PropTypes.func,
        setSourceOtherSpecify: PropTypes.func,
        setTopics: PropTypes.func,
        sourceOtherSpecify: PropTypes.any,
        topics: PropTypes.array,
    }),
    errors: PropTypes.object,
    formData: PropTypes.object,
    getValues: PropTypes.func,
    register: PropTypes.func,
    resetField: PropTypes.func,
    setValue: PropTypes.func,
    trigger: PropTypes.func,
};

export default StudyRegistrationForm;
