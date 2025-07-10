import React from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import Banner from '../../components/Banner/Banner';
import bannerImage from '../../public/images/banner2.jpeg';
import { Container, Row, Col } from 'react-bootstrap';
import classes from './SupportId.module.scss';
import TextArea from '../../components/TextArea/TextArea';
import Button from '../../components/Button/Button';
import Select from '../../components/Select/Select';
import { calculateResolutionTime } from '../../lib/componentHelpers/SupportFunctions/calculateResolutionTime';
import useRest from '../../lib/hooks/useRest';
import { dateFormatter } from '../../lib/componentHelpers/SupportFunctions/dateFormatter';
import { SUPPORTID } from '../../constants/apiRoutes';

/**
 * Support Dashboard Support Ticket View page
 * @param {Object} props - Object with all of the properties used within the react component, listed below.
 * @property {Object} requestInfoById - Object containing information pertaining to a support ticket
 * @property {Array} supportStatuses - List of all statuses for a ticket
 * @property {Array} supportSeverity - List of all severities for a ticket
 * @property {Array} supportResolutionTypes - List of all resolution types for a ticket
 * @property {Array} supportRequestTypes - List of all request types for a ticket
 * @property {Array} supportAssignees - List of all assignees for a ticket
 * @returns {JSX} A SupportRequestInfoPage React Component
 */

const SupportRequestInfoPage = (props) => {
    const { requestInfoById, supportStatuses, supportSeverity, supportResolutionTypes, supportRequestTypes, supportAssignees } = props;
    const { restPut } = useRest();
    const router = useRouter();

    const {
        register,
        handleSubmit,
        getValues,
        formState: { errors },
    } = useForm({
        mode: 'onSubmit',
        reValidateMode: 'onSubmit',
        defaultValues: requestInfoById,
    });

    // this will be set if requestInfoById.assigneeUserId is not null
    const assigneePlaceholder = [
        {
            label: requestInfoById.assigneeEmail,
            value: requestInfoById.assigneeUserId,
        },
    ];

    const crumbs = [
        {
            page: 'Home',
            pageLink: '/',
            ariaLabel: 'home',
        },
        {
            page: 'Support Dashboard',
            pageLink: '/supportDashboard',
            ariaLabel: 'support dashboard',
        },
        {
            page: `${requestInfoById?.id} - ${requestInfoById?.requestTitle}`,
        },
    ];

    const handleFormSubmitHelper = async (data) => {
        const response = await restPut(SUPPORTID.replace('[id]', requestInfoById.id), data, {
            showLoading: true,
            showSuccess: true,
            successMessage: 'Successfully updated support request',
            errorMessage: 'Error with updating support request',
        });

        if (response.status === 200) {
            window.scrollTo(0, 0);
            setTimeout(function () {
                router.reload({ scroll: true });
            }, 5000);
        }
    };

    return (
        <>
            <Banner
                title={`${requestInfoById?.id} - ${requestInfoById?.requestTitle}`}
                manualCrumbs={crumbs}
                variant="alt"
                ariaLabel={`${requestInfoById?.id} - ${requestInfoById?.requestTitle}`}
                backgroundImage={bannerImage}
            />
            <Container>
                <div className={classes.container}>
                    <Row className={classes.rowContainer}>
                        <Col lg="4">
                            <span className={classes.label}>Requestor Name: </span>
                            <span className={classes.text}>{requestInfoById?.fullName}</span>
                        </Col>
                        <Col lg="4" className={classes.selectContainer}>
                            <span className={classes.label}>Assignee: </span>
                            <Select
                                {...register('assigneeUserId')}
                                containerClass={classes.select}
                                label=""
                                placeholder="---"
                                ariaLabel="assigneeUserId"
                                options={requestInfoById.assigneeUserId === null ? supportAssignees : assigneePlaceholder}
                                error={errors?.assigneeUserId}
                                controlId="assigneeUserId"
                                type="text"
                                name="assigneeUserId"
                                disabled={requestInfoById.assigneeUserId !== null}
                            />
                        </Col>
                        <Col lg="4">
                            <span className={classes.label}>Resolution Date: </span>
                            <span className={classes.text}>
                                {requestInfoById?.resolvedAt ? dateFormatter(requestInfoById.resolvedAt) : 'N/A'}
                            </span>
                        </Col>
                    </Row>
                    <Row className={classes.rowContainer}>
                        <Col lg="4">
                            <span className={classes.label}>Requestor Email: </span>
                            <span className={classes.text}>{requestInfoById?.email}</span>
                        </Col>
                        <Col lg="4">
                            <span className={classes.label}>Assigned Date: </span>
                            <span className={classes.text}>
                                {requestInfoById?.assignedAt ? dateFormatter(requestInfoById.assignedAt) : 'N/A'}
                            </span>
                        </Col>
                        <Col lg="4" className={classes.selectContainer}>
                            <span className={classes.label}>Resolution Type: </span>
                            <Select
                                {...register('resolutionType')}
                                containerClass={classes.select}
                                label=""
                                placeholder="---"
                                ariaLabel="resolution type"
                                options={supportResolutionTypes}
                                error={errors?.resolutionType}
                                controlId="resolutionType"
                                type="text"
                                name="resolutionType"
                            />
                        </Col>
                    </Row>
                    <Row className={classes.rowContainer}>
                        <Col lg="4" className={classes.selectContainer}>
                            <span className={classes.label}>Request Type: </span>
                            <Select
                                {...register('requestType')}
                                containerClass={classes.select}
                                label=""
                                placeholder="---"
                                ariaLabel="request type"
                                options={supportRequestTypes}
                                error={errors?.requestType}
                                controlId="requestType"
                                type="text"
                                name="requestType"
                            />
                        </Col>
                        <Col lg="4">
                            <span className={classes.label}>Request Created: </span>
                            <span className={classes.text}>
                                {requestInfoById?.createdAt ? dateFormatter(requestInfoById.createdAt) : 'N/A'}
                            </span>
                        </Col>
                        <Col lg="4">
                            <span className={classes.label}>Resolution Time: </span>
                            <span className={classes.text}>
                                {requestInfoById?.createdAt && requestInfoById?.resolvedAt
                                    ? calculateResolutionTime(requestInfoById.assignedAt, requestInfoById.resolvedAt)
                                    : 'N/A'}
                            </span>
                        </Col>
                    </Row>
                    <Row className={classes.rowContainer}>
                        <Col lg="4" className={classes.selectContainer}>
                            <span className={classes.label}>Status: </span>
                            <Select
                                {...register('status')}
                                containerClass={classes.select}
                                label=""
                                placeholder="---"
                                ariaLabel="status"
                                options={supportStatuses}
                                error={errors?.status}
                                controlId="status"
                                type="text"
                                name="status"
                            />
                        </Col>
                        <Col lg="4">
                            <span className={classes.label}>Request Last Modified: </span>
                            <span className={classes.text}>
                                {requestInfoById?.updateAt ? dateFormatter(requestInfoById.updateAt) : 'N/A'}
                            </span>
                        </Col>
                    </Row>
                    <Row className={classes.rowContainer}>
                        <Col lg="4" className={classes.selectContainer}>
                            <span className={classes.label}>Severity: </span>
                            <Select
                                {...register('severity')}
                                containerClass={classes.select}
                                label=""
                                placeholder="---"
                                ariaLabel="severity"
                                options={supportSeverity}
                                error={errors?.severity}
                                controlId="severity"
                                type="text"
                                name="severity"
                            />
                        </Col>
                    </Row>
                </div>
                <Row className="mb-5">
                    <Col>
                        <div className={classes.boxContainer}>
                            <span className={classes.boxHeader}>Request Details</span>
                            <span className={classes.boxText}>{requestInfoById.requestDetail}</span>
                        </div>
                    </Col>
                </Row>
                <Row className={classes.rowContainer}>
                    <Col>
                        <div className={`${classes.boxContainer} ${classes.activeBoxContainer}`}>
                            <span className={classes.boxHeader}>Notes</span>
                            <TextArea
                                {...register('notes')}
                                label=""
                                ariaLabel="Support ticket notes"
                                type="text"
                                error={errors?.notes}
                                name="notes"
                                controlId="notes"
                                className={classes.textArea}
                                rows={5}
                            />
                        </div>
                    </Col>
                </Row>
                <div className={`mb-4 d-flex justify-content-center align-items-center ${classes.submitButton}`}>
                    <Button
                        label="Save"
                        ariaLabel="save"
                        size="auto"
                        variant="primary"
                        type="submit"
                        handleClick={() => {
                            handleSubmit(handleFormSubmitHelper(getValues()));
                        }}
                        className={classes.submitButton}
                    />
                </div>
            </Container>
        </>
    );
};

SupportRequestInfoPage.propTypes = {
    requestInfoById: PropTypes.shape({
        assignedAt: PropTypes.string,
        assigneeEmail: PropTypes.string,
        assigneeUserId: PropTypes.number,
        createdAt: PropTypes.string,
        email: PropTypes.string,
        fullName: PropTypes.string,
        id: PropTypes.number,
        notes: PropTypes.string,
        requestDetail: PropTypes.string,
        requestTitle: PropTypes.string,
        requestType: PropTypes.string,
        resolutionType: PropTypes.string,
        resolvedAt: PropTypes.string,
        severity: PropTypes.number,
        status: PropTypes.string,
        updateAt: PropTypes.string,
    }),
    supportAssignees: PropTypes.array,
    supportRequestTypes: PropTypes.array,
    supportResolutionTypes: PropTypes.array,
    supportSeverity: PropTypes.array,
    supportStatuses: PropTypes.array,
};

export default SupportRequestInfoPage;
