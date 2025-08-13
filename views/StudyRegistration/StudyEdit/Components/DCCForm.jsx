import React from 'react';
import PropTypes from 'prop-types';
import classes from '../StudyRegistrationEdit.module.scss';
import { Col, Row } from 'react-bootstrap';
import Button from '../../../../components/Button/Button';
import Input from '../../../../components/Input/Input';
import Multiselect from '../../../../components/Multiselect/Multiselect';
import BadgeSection from './Badges/BadgeSection';
import { isEmpty } from '../../../../lib/hooks/comparisonFunctions';
import { defaultValueGeneratorForMultiSelect } from '../../../../lib/componentHelpers/MultiselectFunctions/defaultValueGenerator';
import { isDateAfterToday, isFirstDateAfterSecondDate } from '../../../../lib/componentHelpers/DatePickerFunctions/DayPickerFunctions';
import { dateValidation } from '../../../../constants/regex';

/**
 * This is the DCC's side of the Study Registration Form's inputs.  These inputs are not found on the MTA form and need to be entered by a DCC.
 * @property {Function} register - react hook forms register function. See https://react-hook-form.com/docs/useform/register for documentation.
 * @property {Object} errors - errors returned by react hook form
 * @property {Function} getValues - reach hook form function to get the value of fields. See https://react-hook-form.com/docs/useform/getvalues for documentation.
 * @property {Object} formData - data that prepopulates these fields
 * @property {Function} control - manual controller interface for react hook form. See https://react-hook-form.com/docs/usecontroller/controller for documentation.
 * @property {Object} codeListsValues - all of the codelists on the site
 * @property {Function} resetField - field reset for react hook form, used for those + add buttons. See https://react-hook-form.com/docs/useform/resetfield for documentation.
 * @property {Object} dccStates - all of the useState variables this page needs to manage the form's dynamicness
 * @property {Function} setValue - react hook forms function to set the value of a field. See https://react-hook-form.com/docs/useform/setvalue for documentation.
 * @returns {Node} The DCC specific side of the study registration form, which the curator should also be able to see and edit.
 */

const DCCForm = (props) => {
    const { register, errors, getValues, formData, control, codeListsValues, resetField, dccStates, setValue, trigger } = props;
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
        </>
    );
};

DCCForm.propTypes = {
    codeListsValues: PropTypes.shape({
        Collection_Method: PropTypes.array,
        Study_Topics: PropTypes.array,
    }),
    control: PropTypes.object,
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
        study_population_focus: PropTypes.any,
    }),
    errors: PropTypes.shape({
        CT_URL: PropTypes.any,
        FOA_number: PropTypes.any,
        publication_URL: PropTypes.any,
        source: PropTypes.any,
        source_other_specify: PropTypes.any,
        study_website_URL: PropTypes.any,
        studyenddate: PropTypes.any,
        studystartdate: PropTypes.any,
        subject: PropTypes.any,
        topics: PropTypes.any,
        topics_other_specify: PropTypes.any,
        study_population_focus: PropTypes.any,
    }),
    formData: PropTypes.shape({
        CT_URL: PropTypes.string,
        source: PropTypes.array,
        study_website_URL: PropTypes.array,
        studyenddate: PropTypes.string,
        studystartdate: PropTypes.string,
        topics: PropTypes.array,
        study_population_focus: PropTypes.any,
    }),
    getValues: PropTypes.func,
    register: PropTypes.func,
    resetField: PropTypes.func,
    setValue: PropTypes.func,
};

export default DCCForm;
