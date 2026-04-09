import React, { useState, useEffect } from 'react';
import Banner from '../../components/Banner/Banner';
import bannerImage from '../../public/images/banner2.jpg';
import { Container, Row, Col } from 'react-bootstrap';
import classes from './SupportId.module.scss';
import { calculateResolutionTime } from '../../lib/componentHelpers/SupportFunctions/calculateResolutionTime';
import PropTypes from 'prop-types';
import { dateFormatter } from '../../lib/componentHelpers/SupportFunctions/dateFormatter';
import useRest from '../../lib/hooks/useRest';
import useKeycloak from '../../lib/hooks/useKeycloak';
import { formatSnakeCase } from '../../lib/componentHelpers/SupportFunctions/formatSnakeCase';

const InternalSupportRequestInfoPage = (props) => {
    const { supportId } = props;
    const { restGet } = useRest();
    const { token } = useKeycloak();

    const [requestInfoById, setRequestInfoById] = useState({});
    const [supportStatuses, setSupportStatuses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!token || !supportId) return;
        setLoading(true);
        restGet(`/api/launch/Support/InternalSupportId?supportId=${supportId}`, {
            showLoading: true,
            errorMessage: 'Error loading support ticket',
        }).then((response) => {
            const data = response?.data?.data;
            if (data) {
                setRequestInfoById(data.requestInfoById || {});
                const statuses = (data.supportStatuses || []).map((obj) => ({
                    label: formatSnakeCase(obj),
                    value: obj,
                }));
                setSupportStatuses(statuses);
            }
        }).catch((e) => {
            console.error('Failed to load support ticket', e);
        }).finally(() => setLoading(false));
    }, [token, supportId]);

    const crumbs = [
        {
            page: 'Home',
            pageLink: '/',
            ariaLabel: 'home',
        },
        {
            page: 'Support Dashboard',
            pageLink: '/internal/supportDashboard/',
            ariaLabel: 'Internal Support Dashboard',
        },
        {
            page: loading ? 'Loading...' : `${requestInfoById?.id} - ${requestInfoById?.requestTitle}`,
        },
    ];

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
                <div className={`${classes.container} whiteTextBackground`}>
                    <Row className={classes.rowContainer}>
                        <Col lg="4">
                            <span className={classes.label}>Requestor Name: </span>
                            <span className={classes.text}>{requestInfoById?.fullName}</span>
                        </Col>
                        <Col lg="4" className={classes.selectContainer}>
                            <span className={classes.label}>Assignee: </span>
                            <span className={classes.text}>
                                {requestInfoById.assigneeUserId === null ? '' : requestInfoById.assigneeEmail}
                            </span>
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
                            <span className={classes.text}>{requestInfoById?.resolutionType ? requestInfoById.resolutionType : 'N/A'}</span>
                        </Col>
                    </Row>
                    <Row className={classes.rowContainer}>
                        <Col lg="4" className={classes.selectContainer}>
                            <span className={classes.label}>Request Type: </span>
                            <span className={classes.text}>{requestInfoById?.requestType ? requestInfoById.requestType : 'N/A'}</span>
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
                            <span className={classes.text}>
                                {requestInfoById?.status
                                    ? supportStatuses.map((obj) => {
                                        if (obj.value === requestInfoById.status) return obj.label;
                                      })
                                    : 'N/A'}
                            </span>
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
                            <span className={classes.text}>{requestInfoById?.severity ? requestInfoById.severity : 'N/A'}</span>
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
                        <div className={classes.boxContainer}>
                            <span className={classes.boxHeader}>Notes</span>
                            <span className={classes.boxText}>{requestInfoById?.notes}</span>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

InternalSupportRequestInfoPage.propTypes = {
    supportId: PropTypes.string,
};

export default InternalSupportRequestInfoPage;
