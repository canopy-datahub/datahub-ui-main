/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { Container, Row, Col } from 'react-bootstrap';
import classes from './WorkbenchRequest.module.scss';
import Banner from '../../components/Banner/Banner';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import { dateFormatter } from '../../lib/componentHelpers/SupportFunctions/dateFormatter';
import useRest from '../../lib/hooks/useRest';
import { UPDATE_WORKBENCH_REQUEST } from '../../constants/apiRoutes';
import AddonRequestForm from '../ApprovedData/WorkbenchAddonRequestForm/AddonRequestForm';
import Modal from '../../components/GeneralModal/GeneralModal';

/**
 * View for the Workbench Request Details Page
 * @property {String} requestId - ID of request form
 * @returns {Node} object rendering Workbench Request Details Page
 */

const WorkbenchRequestDetailsPage = (props) => {
    const { requestId, workbenchRequestData } = props;
    const router = useRouter();
    const [requestSelected, selectRequest] = useState({});
    const [reason, changeReason] = useState('');

    const crumbs = [
        {
            page: 'Home',
            pageLink: '/',
            ariaLabel: 'Link to Homepage',
        },
        {
            page: 'Workbench Request Dashboard',
            pageLink: '/workbenchRequestDashboard',
            ariaLabel: 'Workbench Request Dashboard',
        },
        {
            page: `#${requestId}`,
            ariaLabel: `#${requestId}`,
        },
    ];

    const body = (
        <>
            {requestSelected?.type === 'rejected' && (
                <Input
                    label="Reason"
                    required
                    onChange={(e) => {
                        changeReason(e.target.value);
                    }}
                    value={reason}
                />
            )}
            <div className="d-flex justify-content-center align-items-center">
                <Button
                    label="Confirm"
                    size="medium"
                    className="mt-3"
                    handleClick={() => {
                        if ((reason && requestSelected) || requestSelected?.type === 'approved') {
                            updateRequest({ requestId: requestSelected?.id, status: requestSelected?.type, reason: reason });
                        }
                    }}
                />
            </div>
        </>
    );

    const { restPut } = useRest();

    async function updateRequest(data) {
        const updateResult = await restPut(UPDATE_WORKBENCH_REQUEST, data, {
            showLoading: true,
            successMessage: 'Request Updated',
            errorMessage: '',
        });
        if (updateResult?.status === 200) {
            selectRequest({});
            router.push('/workbenchRequestDashboard');
        } else {
            selectRequest({});
        }
    }

    return (
        <>
            <Banner
                title={`Workbench Request #${requestId}`}
                manualCrumbs={crumbs}
                variant="crystal"
                ariaLabel="Workbench Request Breadcrumb"
            />

            <Container className={classes.Container}>
                <div className={classes.section}>
                    <h5>Request Details</h5>
                    <Row>
                        <Col className={`${classes.col} mb-4`} xl={6} md={6}>
                            <span className={classes.label}>Request Date:</span> {dateFormatter(workbenchRequestData?.requestDate)}
                        </Col>
                        <Col className={`${classes.col} mb-4`} xl={6} md={6}>
                            <span className={classes.label}>Approval Date:</span>{' '}
                            {workbenchRequestData?.responseDate ? dateFormatter(workbenchRequestData?.responseDate) : 'N/A'}
                        </Col>
                        {/*<Col className={`${classes.col} mb-4`} xl={3} md={6}>
                            <span className={classes.label}>License Date:</span> {dateFormatter(workbenchRequestData?.requestDate)}
                        </Col>
                        <Col className={`${classes.col} mb-4`} xl={3} md={6}>
                            <span className={classes.label}>Expiration Date:</span> {dateFormatter(workbenchRequestData?.requestDate)}
                        </Col>*/}
                    </Row>
                </div>
            </Container>
            <AddonRequestForm manualCrumbs={null} disabledForm={true} formData={workbenchRequestData} />
            <div className="d-flex justify-content-center align-items-center">
                <Button
                    label="Approve"
                    className={classes.button}
                    variant="primary"
                    size="auto"
                    handleClick={() => {
                        selectRequest({ id: requestId, type: 'approved' });
                    }}
                ></Button>
                <Button
                    label="Reject"
                    className={classes.button}
                    variant="secondary"
                    size="auto"
                    handleClick={() => {
                        selectRequest({ id: requestId, type: 'rejected' });
                    }}
                ></Button>
            </div>
            <Modal
                show={requestSelected?.id}
                onHide={() => {
                    selectRequest({});
                }}
                closable={true}
                title={requestSelected?.type === 'rejected' ? 'Input Reason for Action' : 'Confirm Approval'}
                bodyChildren={body}
                dialogClassName={classes.modalWidth}
                formInstructions={requestSelected?.type === 'rejected'}
            />
        </>
    );
};

WorkbenchRequestDetailsPage.propTypes = { requestId: PropTypes.string };

export default WorkbenchRequestDetailsPage;
