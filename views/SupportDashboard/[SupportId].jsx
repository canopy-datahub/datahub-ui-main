import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import Banner from '../../components/Banner/Banner';
import bannerImage from '../../public/images/banner2.jpg';
import { Container, Row, Col } from 'react-bootstrap';
import classes from './SupportId.module.scss';
import TextArea from '../../components/TextArea/TextArea';
import Button from '../../components/Button/Button';
import Select from '../../components/Select/Select';
import { calculateResolutionTime } from '../../lib/componentHelpers/SupportFunctions/calculateResolutionTime';
import useRest from '../../lib/hooks/useRest';
import useKeycloak from '../../lib/hooks/useKeycloak';
import { dateFormatter } from '../../lib/componentHelpers/SupportFunctions/dateFormatter';
import { SUPPORTID } from '../../constants/apiRoutes';

const SupportRequestInfoPage = (props) => {
    const { supportId } = props;
    const { restGet, restPut } = useRest();
    const { token } = useKeycloak();
    const router = useRouter();

    const [requestInfoById, setRequestInfoById] = useState({});
    const [supportStatuses, setSupportStatuses] = useState([]);
    const [supportSeverity, setSupportSeverity] = useState([]);
    const [supportResolutionTypes, setSupportResolutionTypes] = useState([]);
    const [supportRequestTypes, setSupportRequestTypes] = useState([]);
    const [supportAssignees, setSupportAssignees] = useState([]);
    const [loading, setLoading] = useState(true);

    const {
        register,
        handleSubmit,
        getValues,
        reset,
        watch,
        formState: { errors },
    } = useForm({
        mode: 'onSubmit',
        reValidateMode: 'onSubmit',
    });

    const watchedStatus = watch('status');

    useEffect(() => {
        if (!token || !supportId) return;
        setLoading(true);
        restGet(`/api/launch/Support/SupportTicketData?supportId=${supportId}`, {
            showLoading: true,
            errorMessage: 'Error loading support ticket',
        }).then((response) => {
            const data = response?.data?.data;
            if (data) {
                setRequestInfoById(data.requestInfoById || {});
                setSupportStatuses(data.supportStatuses || []);
                setSupportSeverity(data.supportSeverity || []);
                setSupportResolutionTypes(data.supportResolutionTypes || []);
                setSupportRequestTypes(data.supportRequestTypes || []);
                setSupportAssignees(data.supportAssignees || []);
                reset(data.requestInfoById || {});
            }
        }).catch((e) => {
            console.error('Failed to load support ticket', e);
        }).finally(() => setLoading(false));
    }, [token, supportId]);

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
            page: loading ? 'Loading...' : `${requestInfoById?.id} - ${requestInfoById?.requestTitle}`,
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

    if (loading) {
        return (
            <>
                <Banner title="Support Request" manualCrumbs={crumbs} variant="alt" ariaLabel="Support Request" backgroundImage={bannerImage} />
                <Container style={{ padding: '2rem', textAlign: 'center' }}>Loading...</Container>
            </>
        );
    }

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
                            <span className={classes.label}>
                                Resolution Type: {watchedStatus === 'closed' && <span style={{ color: 'red' }}>*</span>}
                            </span>
                            <Select
                                {...register('resolutionType', {
                                    validate: (value) =>
                                        watchedStatus !== 'closed' || (value && value !== '') || 'Resolution type is required when closing a ticket',
                                })}
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
                            handleSubmit(handleFormSubmitHelper)();
                        }}
                        className={classes.submitButton}
                        testId="support-save"
                    />
                </div>
            </Container>
        </>
    );
};

SupportRequestInfoPage.propTypes = {
    supportId: PropTypes.string,
};

export default SupportRequestInfoPage;
