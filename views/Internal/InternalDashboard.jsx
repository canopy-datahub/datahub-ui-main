import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import Banner from '../../components/Banner/Banner';
import classes from './InternalDashboard.module.scss';
import PropTypes from 'prop-types';
import useRest from '../../lib/hooks/useRest';
import useKeycloak from '../../lib/hooks/useKeycloak';
import Button from '../../components/Button/Button';
import Table from '../../components/Table/Table';
import { allSupportTracker } from './Columns';
import DownloadIcon from '../../components/Images/svg/DownloadIcon';

const InternalDashboard = (props) => {
    const { restGet } = useRest();
    const { token } = useKeycloak();
    const [supportTracker, setSupportTracker] = useState([]);

    useEffect(() => {
        if (!token) return;
        restGet('/api/launch/Support/AllSupportRequests?status=all', {
            errorMessage: 'Error loading support requests',
        }).then((response) => {
            if (response?.status === 200) {
                setSupportTracker(response.data.data || []);
            }
        }).catch((e) => {
            console.error('Error fetching support requests:', e);
        });
    }, [token]);

    const crumbs = [
        {
            page: 'Home',
            pageLink: '/',
            ariaLabel: 'home',
        },
        {
            page: 'Support Dashboard',
        },
    ];

    return (
        <>
            <Banner title="Support Dashboard" manualCrumbs={crumbs} variant="lab4" ariaLabel="Support Dashboard" />
            <Row className={classes.container}>
                <Col lg="12" className="px-0">
                    <div className={`${classes.rowContainer}`}>
                        <Button
                            variant="secondary"
                            label="Download CSV"
                            className={`${classes.button}`}
                            iconLeft={<DownloadIcon />}
                            handleClick={async () => {
                                try {
                                    const headers = {};
                                    if (token) headers['Authorization'] = `Bearer ${token}`;
                                    const response = await fetch('/api/launch/Support/DownloadSupportReport', { headers });
                                    if (!response.ok) throw new Error(`Download failed: ${response.status}`);
                                    const blob = await response.blob();
                                    const url = URL.createObjectURL(blob);
                                    const a = document.createElement('a');
                                    a.href = url;
                                    a.download = 'support_request.csv';
                                    a.click();
                                    a.remove();
                                    URL.revokeObjectURL(url);
                                } catch (e) {
                                    console.error('Failed to download CSV', e);
                                }
                            }}
                        />
                    </div>
                    <Table
                        tableRows={supportTracker}
                        tableHeaders={allSupportTracker}
                        className={classes.tableContainer}
                        ariaCaption="Support Tracker View"
                        responsive={false}
                        allowSort={true}
                    />
                </Col>
            </Row>
        </>
    );
};

InternalDashboard.propTypes = {
    getSupportTracker: PropTypes.arrayOf(PropTypes.string),
};

export default InternalDashboard;
