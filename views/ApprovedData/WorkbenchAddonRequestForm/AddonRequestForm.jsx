import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { Col, Container, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import classes from '../ApprovedData.module.scss';
import Button from '../../../components/Button/Button';
import Alert from '../../../components/Notifications/Alert';
import Input from '../../../components/Input/Input';
import Multiselect from '../../../components/Multiselect/Multiselect';
import TextArea from '../../../components/TextArea/TextArea';
import Select from '../../../components/Select/Select';
import Toggle from '../../../components/Toggle/Toggle';
import useRest from '../../../lib/hooks/useRest';
import { POST_WORKBENCH_ADDON_REQUEST } from '../../../constants/apiRoutes';
import { downloadLink } from '../../../lib/pageHelpers/downloadLink';
import { analyticAddons, workbenchInterests } from '../../../constants/workbenchAddOnCodeLists';
import Banner from '../../../components/Banner/Banner';
import { defaultValueGeneratorForMultiSelect } from '../../../lib/componentHelpers/MultiselectFunctions/defaultValueGenerator';
import DownloadIcon from '../../../components/Images/svg/DownloadIcon';

/**
 * Add On request form used for both the Researcher asking for the workbench add on's (currently SAS and Data Wrangler),
 * and the NIH Officer to view that application later in the workflow
 * @property {String} TOS_URL - URL for the Terms of Service for workbench so a Researcher can download it.
 * @property {String} title - The title for the banner if needed for Researcher view
 * @property {Array<Object>} manualCrumbs - The manual bread crumbs put into the banner for Researcher view
 * @property {Boolean} disabledForm - disables the entire form for the NIH officer so they can't edit any fields
 * @property {Object} formData - contains the workbench request application so the NIH Officer can review.
 * @returns {Node} object rendering the Add on Request form
 */

const AddonRequestForm = (props) => {
    const { TOS_URL, title, manualCrumbs, disabledForm, formData } = props;
    const { user } = useSelector((state) => state.userProfile);

    const [downloaded, clickedDownload] = useState(false);
    const [signed, enteredSignature] = useState(false);
    const router = useRouter();
    const { restPost, restGet } = useRest();
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        getValues,
        control,
    } = useForm({
        mode: 'onSubmit',
        reValidateMode: 'onSubmit',
    });

    const crumbs = [
        {
            page: 'Home',
            pageLink: '/',
            ariaLabel: 'Link to Homepage',
        },
        {
            page: 'My Approved Data',
            pageLink: '/myApprovedData',
            ariaLabel: 'My Approved Data',
        },
        {
            page: 'Workbench Add-on Request',
            ariaLabel: 'Workbench Add-on Request',
        },
    ];

    const handleSubmitHelper = async (data) => {
        const tempInterests = data.workbenchInterests.map((interestObject) => {
            return interestObject.value;
        });
        data.workbenchInterests = tempInterests;
        const postRequestResult = await restPost(POST_WORKBENCH_ADDON_REQUEST, data, {
            showLoading: true,
            showSuccess: true,
            successMessage: 'Successfully submitted workbench add-on request',
        });
        if (postRequestResult.request.status === 200 && postRequestResult?.data.success === true) {
            router.push(`/myApprovedData`);
        }
    };

    return (
        <>
            {TOS_URL && <Banner title={title} manualCrumbs={crumbs} variant="crystal" ariaLabel="Add On Request Breadcrumb" />}
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
            <form onSubmit={handleSubmit(handleSubmitHelper)}>
                <Container className={classes.Container}>
                    <h3 className="mt-3 mb-3">Requestor Information</h3>
                    <Row className={classes.spacer}>
                        <Col>
                            <Input
                                value={formData ? formData?.name : `${user?.firstName} ${user?.lastName}`}
                                controlId="name"
                                label="Name"
                                disabled
                            />
                        </Col>
                        <Col>
                            <Input value={formData ? formData?.email : user?.email} controlId="email" label="Email" disabled />
                        </Col>
                        <Col>
                            <Input
                                value={formData ? formData?.institution : user?.institution}
                                controlId="institution"
                                label="Institution"
                                disabled
                            />
                        </Col>
                    </Row>
                    <h3 className="mb-3">Application Information</h3>
                    <Row className={classes.spacer}>
                        <Col>
                            <Multiselect
                                {...register('workbenchInterests', {
                                    required: 'Primary Interest in Workbench is missing',
                                })}
                                isClearable
                                defaultValue={defaultValueGeneratorForMultiSelect(formData?.workbenchInterests)}
                                control={control}
                                required
                                disabled={disabledForm}
                                error={errors.workbenchInterests}
                                validationRules={{ required: true }}
                                name="workbenchInterests"
                                controlId="workbenchInterests"
                                label="Primary Interest in Workbench"
                                options={workbenchInterests}
                            />
                        </Col>
                        <Col lg={1} />
                        <Col>
                            <Input
                                {...register('otherSpecify', { value: formData?.otherSpecify })}
                                disabled={disabledForm}
                                error={errors.otherSpecify}
                                controlId="otherSpecify"
                                label="Other Interest in Workbench"
                            />
                        </Col>
                    </Row>
                    <Row className={classes.spacer}>
                        <Col>
                            <Select
                                {...register('analyticsSoftwareRequest', {
                                    required: 'Analytics Software Request is missing',
                                    value: formData?.analyticsSoftwareRequest,
                                })}
                                disabled={disabledForm}
                                containerClass={classes.select}
                                label="Analytics Software Request"
                                required
                                placeholder="Select..."
                                ariaLabel="assigneeUserId"
                                options={analyticAddons}
                                error={errors?.analyticsSoftwareRequest}
                                controlId="analyticsSoftwareRequest"
                                type="text"
                                name="analyticsSoftwareRequest"
                            />
                        </Col>
                        <Col lg={1} />
                        <Col>
                            <span className={classes.labelFont}>Are you affiliated with a RADx program (C)DCC?</span>
                            <Toggle
                                {...register('dccAffiliated', { value: formData?.dccAffiliated || false })}
                                disabled={disabledForm}
                                selected={formData?.dccAffiliated}
                                className="mt-2"
                                controlId="dccAffiliated"
                                handleChange={(e) => setValue('dccAffiliated', !getValues('dccAffiliated'))}
                                label="I am affiliated with a RADx program (C)DCC"
                            />
                        </Col>
                    </Row>
                    <Row className={classes.spacer}>
                        <Col>
                            <TextArea
                                {...register('researchUseStatement', {
                                    required: 'Research Use Statement is missing',
                                    value: formData?.researchUseStatement,
                                })}
                                label="Research Use Statement"
                                disabled={disabledForm}
                                ariaLabel="Research Use Statement"
                                required
                                error={errors?.researchUseStatement}
                                controlId="researchUseStatement"
                                name="researchUseStatement"
                                className={classes.textArea}
                            />
                        </Col>
                        <Col lg={1} />
                        <Col>
                            <TextArea
                                {...register('reasonOfRequest', {
                                    required: 'Reason for Request is missing',
                                    value: formData?.reasonOfRequest,
                                })}
                                label="Reason for Request"
                                disabled={disabledForm}
                                ariaLabel="Reason for Request"
                                required
                                error={errors?.reasonOfRequest}
                                controlId="reasonOfRequest"
                                name="reasonOfRequest"
                                className={classes.textArea}
                            />
                        </Col>
                    </Row>
                    {TOS_URL && (
                        <>
                            <h3 className="mb-4">Terms of Service Agreement</h3>
                            <Row className={classes.spacer}>
                                <Col lg={{ offset: 1, span: 10 }}>
                                    <span className="bold">
                                        To proceed, please click the button below to “Download the Terms of Service” as a PDF file [774 KB].
                                        After you have read the Terms of Service and would like to continue with your application, please
                                        enter your name in the “Agree to the Terms of Service” field. Then a “Submit” button will be
                                        activated for you to submit your application for review.
                                    </span>
                                </Col>
                            </Row>
                        </>
                    )}
                    <Row className={classes.spacer}>
                        {TOS_URL && (
                            <>
                                <Col lg={{ offset: 1 }}>
                                    <Button
                                        type="button"
                                        size="none"
                                        iconLeft={<DownloadIcon />}
                                        label="Download the Terms of Service as PDF [774 KB]"
                                        ariaLabel="Download and read the Terms of Service to proceed"
                                        variant="primary"
                                        className={`mt-4 ${classes.TOS_Button}`}
                                        handleClick={async () => {
                                            downloadLink(TOS_URL, restGet);
                                            clickedDownload(true);
                                        }}
                                    />
                                </Col>
                                <Col lg={1} />
                            </>
                        )}
                        <Col>
                            <Input
                                {...register('signature', {
                                    required: 'Signature for Terms of Service is missing',
                                    onChange: () => {
                                        enteredSignature(true);
                                    },
                                    value: formData?.signature,
                                })}
                                error={errors.signature}
                                controlId="signature"
                                label="Agree to the Terms of Service"
                                placeholder="Enter your name here to agree..."
                                required
                                disabled={!downloaded}
                            />
                        </Col>
                        <Col lg={1} />
                    </Row>
                    {TOS_URL && (
                        <Row>
                            <Col>
                                <div className="pullRight">
                                    <Button
                                        label="Submit"
                                        ariaLabel="Submit Request"
                                        size="medium"
                                        variant="primary"
                                        disabled={!signed}
                                        type="submit"
                                    />
                                </div>
                            </Col>
                        </Row>
                    )}
                </Container>
            </form>
        </>
    );
};

AddonRequestForm.propTypes = {
    TOS_URL: PropTypes.string,
    disabledForm: PropTypes.bool,
    formData: PropTypes.shape({
        analyticsSoftwareRequest: PropTypes.string,
        dccAffiliated: PropTypes.bool,
        email: PropTypes.string,
        institution: PropTypes.string,
        name: PropTypes.string,
        otherSpecify: PropTypes.string,
        reasonOfRequest: PropTypes.string,
        researchUseStatement: PropTypes.string,
        signature: PropTypes.string,
        workbenchInterests: PropTypes.arrayOf(PropTypes.string),
    }),
    manualCrumbs: PropTypes.arrayOf(PropTypes.object),
    title: PropTypes.string,
};

export default AddonRequestForm;
