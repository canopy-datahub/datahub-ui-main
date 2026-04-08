/* eslint-disable multiline-ternary */
import React, { useState, useEffect, useRef } from 'react';
import Table from '../../../components/Table/Table';
import classes from '../SubmitterDashboard.module.scss';
import { Row, Col } from 'react-bootstrap';
import Button from '../../../components/Button/Button';
import { useRouter } from 'next/router';
import useRest from '../../../lib/hooks/useRest';
import useKeycloak from '../../../lib/hooks/useKeycloak';
import PropTypes from 'prop-types';
import SftpModal from '../../DataIngest/Components/SftpModal';
import DownloadIcon from '../../../components/Images/svg/DownloadIcon';
import { downloadLink } from '../../../lib/pageHelpers/downloadLink';
import { DOWNLOAD_STUDY_UUIDS } from '../../../constants/apiRoutes';
import Cookies from 'js-cookie';
import { Plus } from 'react-bootstrap-icons';
import CollapsibleSideBar from '../../../components/CollapsibleSideBar/CollapsibleSideBar';
import Sidebar from '../../../components/Sidebar/Sidebar';
import Banner from '../../../components/Banner/Banner';
import { submitterTableColumns } from './submitterDashColumns';

/**
 * Dashboard of all submissions for the user that is currently using the system
 * @property {String} baseUrl - The URL used to download
 * @property {String} fileUploadSOP - The URL for the File Upload SOP.
 * @property {String} status - The current status view we are showing on the dashboard
 * @returns {JSX} SubmitterDashboard component
 */

const SubmitterDashboard = (props) => {
    const { status, fileUploadSOP, baseUrl } = props;

    // All hooks at the top — router must be declared before any useEffect that references it
    const router = useRouter();
    const { restGet } = useRest();
    const { token } = useKeycloak();

    const menuItems = [
        { label: 'In Progress', value: 'in_progress' },
        { label: 'Submitted', value: 'submitted' },
        { label: 'Completed', value: 'completed' },
    ];

    const defaultState = menuItems.find((x) => x.value === status) || menuItems[0];
    const [selectedItem, setSelectedItem] = useState(defaultState);
    const [submissionsData, setSubmissionsData] = useState([]);
    const [userSubmissions, setUserSubmissions] = useState(false);
    const isInitialRender = useRef(true);

    const [sidebarOpen, setSideBarOpen] = useState(true);
    const handleViewSidebar = () => setSideBarOpen(!sidebarOpen);
    const contentContainerClass = sidebarOpen ? classes.body : `${classes.body} ${classes.sidebarClosed}`;

    // Update URL when tab changes — skip initial render to avoid Keycloak loop
    useEffect(() => {
        if (isInitialRender.current) {
            isInitialRender.current = false;
            return;
        }
        router.push(
            { pathname: router.pathname, query: { status: selectedItem.value } },
            undefined,
            { scroll: false, shallow: true }
        );
    }, [selectedItem]);

    // Fetch submissions when token, tab, or a table action (userSubmissions) changes
    useEffect(() => {
        if (!token) return;
        restGet(`/api/launch/SubmitterDash/SubmitterSubmissions?status=${selectedItem.value}`, {
            errorMessage: 'Error loading submissions',
        }).then((response) => {
            if (response?.status === 200) {
                setSubmissionsData(response.data.data || []);
            }
        });
    }, [token, selectedItem, userSubmissions]);

    const crumbs = [
        { page: 'Home', pageLink: '/', ariaLabel: 'home' },
        { page: 'Submitter Dashboard', pageLink: '/submitterDashboard', ariaLabel: 'submitter dashboard' },
    ];

    return (
        <Row className={`${classes.container} ${classes.row}`}>
            <Banner title="Submitter Dashboard" manualCrumbs={crumbs} variant="lab1" ariaLabel="Submitter Dashboard Breadcrumb" />
            <CollapsibleSideBar
                isOpen={sidebarOpen}
                toggleSidebar={handleViewSidebar}
                title="Statuses"
                titleClassName={classes.sidebarTitle}
            >
                <Sidebar menuItems={menuItems} onSelectedMenuItem={setSelectedItem} selectedItem={selectedItem} />
            </CollapsibleSideBar>
            <Col lg={10} className={contentContainerClass}>
                <Row className={`${classes.buttonContainer} ${classes.row}`}>
                    <Col lg={8} md={12} className={classes.sftpGrouping}>
                        <Button
                            label="Download Study Keys"
                            ariaLabel="Download Study Key"
                            size="auto"
                            variant="secondary"
                            iconLeft={<DownloadIcon />}
                            handleClick={async () => {
                                downloadLink(`${baseUrl}${DOWNLOAD_STUDY_UUIDS}${Cookies.get('chocolateChip')}`, restGet);
                            }}
                            className={classes.downloadStudySheet}
                        />
                        <SftpModal variant="multi" title="Multi Study sFTP Upload Notice" fileUploadSOP={fileUploadSOP} />
                    </Col>
                    <Col lg={4} md={12} className={classes.buttonGroup}>
                        <Button
                            label="New Submission"
                            ariaLabel="New submission"
                            size="auto"
                            variant="primary"
                            iconLeft={<Plus size={30} />}
                            handleClick={() => router.push('dataIngest/')}
                            className={classes.newSubmission}
                        />
                    </Col>
                </Row>
                <Row className={classes.row}>
                    <div className={classes.submitterContainer}>
                        {submissionsData.length > 0 ? (
                            <Table
                                tableRows={submissionsData}
                                tableHeaders={submitterTableColumns(submissionsData, setUserSubmissions, status)}
                                ariaCaption="Submitter Dashboard"
                            />
                        ) : (
                            <div className={classes.noSubmissions}>
                                You currently have no submission records in our system. Please click the &apos;New Submission&apos; button above to
                                begin your submission.
                            </div>
                        )}
                    </div>
                </Row>
            </Col>
        </Row>
    );
};

SubmitterDashboard.propTypes = {
    baseUrl: PropTypes.string,
    fileUploadSOP: PropTypes.string,
    status: PropTypes.string,
};

export default SubmitterDashboard;
