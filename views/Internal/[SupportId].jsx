import React from 'react';
import Banner from '../../components/Banner/Banner';
import bannerImage from '../../public/images/banner2.jpeg';
import { Container, Row, Col } from 'react-bootstrap';
import classes from './SupportId.module.scss';
import { calculateResolutionTime } from '../../lib/componentHelpers/SupportFunctions/calculateResolutionTime';
import PropTypes from 'prop-types';
import { dateFormatter } from '../../lib/componentHelpers/SupportFunctions/dateFormatter';

/**
 * Internal Support Ticket View page
 * @param {Object} props - Object with all of the properties used within the react component, listed below.
 * @property {Object} requestInfoById - Object containing information pertaining to a support ticket
 * @property {Array} supportStatuses - List of all statuses for a ticket
 * @returns {JSX} A InternalSupportRequestInfoPage React Component
 */

const InternalSupportRequestInfoPage = (props) => {
    // TODO possible refactor to not need supportStatuses
    const { requestInfoById, supportStatuses } = props;

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
            page: `${requestInfoById?.id} - ${requestInfoById?.requestTitle}`,
        },
    ];

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
    requestInfoById: PropTypes.shape({
        assignedAt: PropTypes.string,
        assigneeEmail: PropTypes.string,
        assigneeUserId: PropTypes.number,
        canEdit: PropTypes.bool,
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
    supportStatuses: PropTypes.array,
};

export default InternalSupportRequestInfoPage;
