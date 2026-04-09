/* eslint-disable max-len */
import React, { useState, useEffect, useRef } from 'react';
import { Col, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import EditIcon from '../../components/Images/svg/EditIcon';
import { useRouter } from 'next/router';
import classes from './UserDashboard.module.scss';
import Sidebar from '../../components/Sidebar/Sidebar';
import Banner from '../../components/Banner/Banner';
import CollapsibleSideBar from '../../components/CollapsibleSideBar/CollapsibleSideBar';
import UserDashboardTable from './Components/UserDashboardTable';
import UserManageDashModal from './Components/UserDashModal';
import useRest from '../../lib/hooks/useRest';
import useKeycloak from '../../lib/hooks/useKeycloak';

/**
 * User Dashboard Page
 * @param {Object} props - Object with all of the properties used within the react component, listed below.
 * @property {String} status - Initial status filter from URL query param
 * @returns {JSX} User Dashboard Page
 */

const UserDashboard = (props) => {
    const { status } = props;
    const router = useRouter();
    const { restGet } = useRest();
    const { token } = useKeycloak();

    const [userModalVisible, setUserModalVisible] = useState(false);
    const [userId, setUserId] = useState(null);

    const [getUserDashboard, setGetUserDashboard] = useState([]);
    const [userRoleList, setUserRoleList] = useState([]);
    const [approvedInstitutions, setApprovedInstitutions] = useState([]);
    const [generalStatuses, setGeneralStatuses] = useState([]);
    const [researcherLevels, setResearcherLevels] = useState([]);
    const [dccs, setDccs] = useState([]);

    const menuItems = [
        { label: 'Active', value: 'active' },
        { label: 'Inactive', value: 'inactive' },
    ];

    const defaultState = menuItems.find((x) => x.value === status) || menuItems[0];
    const [selectedItem, setSelectedItem] = useState(defaultState);
    const isInitialRender = useRef(true);

    const [sidebarOpen, setSideBarOpen] = useState(true);
    const handleViewSidebar = () => setSideBarOpen(!sidebarOpen);
    const contentContainerClass = sidebarOpen ? classes.contentContainer : `${classes.contentContainer} ${classes.sidebarClosed}`;

    // Update URL when tab changes (skip initial render to avoid Keycloak loop)
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

    // Fetch reference/config data once when token is ready
    useEffect(() => {
        if (!token) return;
        restGet('/api/launch/UserDashboard/UserDashboardConfig', {
            errorMessage: 'Error loading user dashboard config',
        }).then((response) => {
            if (response?.status === 200) {
                const d = response.data.data;
                setUserRoleList(d.userRoleList || []);
                setApprovedInstitutions(d.approvedInstitutions || []);
                setGeneralStatuses(d.generalStatuses || []);
                setResearcherLevels(d.researcherLevels || []);
                setDccs(d.dccs || []);
            }
        });
    }, [token]);

    // Fetch user list when token or selected status changes
    useEffect(() => {
        if (!token) return;
        restGet(`/api/launch/UserDashboard/AllUsers?status=${selectedItem.value}`, {
            errorMessage: 'Error loading users',
        }).then((response) => {
            if (response?.status === 200) {
                setGetUserDashboard(response.data.data || []);
            }
        });
    }, [token, selectedItem]);

    const closeModal = () => setUserModalVisible(false);

    const crumbs = [
        { page: 'Home', pageLink: '/', ariaLabel: 'home' },
        { page: 'Manage Users Dashboard', pageLink: '/userDashboard', ariaLabel: 'manage user dashboard' },
    ];

    const columns = [
        {
            accessorKey: 'id',
            cell: (props) => (
                <span
                    className={classes.icon}
                    onClick={() => {
                        setUserId(props.getValue());
                        setUserModalVisible(true);
                    }}
                >
                    <EditIcon />
                </span>
            ),
            header: '',
            size: 50,
        },
        { accessorKey: 'email', cell: (info) => info.getValue(), header: 'Email', sort: true, alignLeft: true },
        { accessorKey: 'firstName', cell: (info) => info.getValue(), header: 'First Name', sort: true, alignLeft: true },
        { accessorKey: 'lastName', cell: (info) => info.getValue(), header: 'Last Name', sort: true, alignLeft: true },
        { accessorKey: 'jobTitle', cell: (info) => info.getValue(), header: 'Job Title/Position', sort: true, alignLeft: true },
        {
            accessorKey: 'institution',
            cell: (info) => <span>{info.getValue() === null ? 'null value' : info.getValue()}</span>,
            header: 'Institution Name',
            sort: true,
            alignLeft: true,
        },
    ];

    return (
        <>
            <Banner title="Manage Users Dashboard" manualCrumbs={crumbs} variant="lab1" ariaLabel="Manage Users Dashboard Breadcrumb" />
            <Row className={classes.container}>
                <CollapsibleSideBar
                    isOpen={sidebarOpen}
                    toggleSidebar={handleViewSidebar}
                    title="Statuses"
                    titleClassName={classes.sidebarTitle}
                >
                    <Sidebar menuItems={menuItems} onSelectedMenuItem={setSelectedItem} selectedItem={selectedItem} />
                </CollapsibleSideBar>
                <Col lg="10" className={`px-5 ${contentContainerClass}`}>
                    <div className={`${classes.rowContainer}`}>
                        <span className={classes.tableTitle}>{`${selectedItem.label} Users`}</span>
                    </div>
                    <UserDashboardTable
                        tableRows={getUserDashboard}
                        tableHeaders={columns}
                        className={classes.tableContainer}
                        ariaCaption={`${selectedItem.label} Users`}
                        responsive={false}
                        allowSort
                    />
                </Col>
            </Row>
            <UserManageDashModal
                visible={userModalVisible}
                closeModal={closeModal}
                roles={userRoleList}
                institutions={approvedInstitutions}
                dccs={dccs}
                userId={userId}
                status={generalStatuses}
                researcherLevels={researcherLevels}
            />
        </>
    );
};

UserDashboard.propTypes = {
    status: PropTypes.string,
};

export default UserDashboard;
