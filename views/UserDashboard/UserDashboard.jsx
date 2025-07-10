/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
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

/**
 * User Dashboard Page
 * @param {Object} props - Object with all of the properties used within the react component, listed below.
 * @property {Array} getUserDashboard - Array of all the users
 * @property {Array<Object>} userRoleList - Array of all the different type of user roles
 * @property {Array<Object>} approvedInstitutions - Array of all approved institutions
 * @property {Array<Object>} dccs - codelist Array of all dccs
 * @property {Array<Object>} generalStatuses - Array of all the different types status for a user
 * @property {Array<Object>} researcherLevels - Array object of all the different levels of researcher
 * @returns {JSX} User Dashboard Page
 */

const UserDashboard = (props) => {
    const { getUserDashboard, status, userRoleList, approvedInstitutions, generalStatuses, researcherLevels, dccs } = props;
    const router = useRouter();
    const [userModalVisible, setUserModalVisible] = useState(false);
    const [userId, setUserId] = useState(null);

    const menuItems = [
        {
            label: 'Active',
            value: 'active',
        },
        {
            label: 'Inactive',
            value: 'inactive',
        },
    ];

    // set active state
    const defaultState = menuItems.find((x) => x.value === status);

    const [selectedItem, setSelectedItem] = useState(defaultState);

    useEffect(() => {
        router.push(
            {
                pathname: router.pathname,
                query: { status: selectedItem.value },
            },
            undefined,
            { scroll: false }
        );
    }, [selectedItem]);

    const closeModal = () => {
        setUserModalVisible(false);
    };

    const [sidebarOpen, setSideBarOpen] = useState(true);
    const handleViewSidebar = () => {
        setSideBarOpen(!sidebarOpen);
    };

    const contentContainerClass = sidebarOpen ? classes.contentContainer : `${classes.contentContainer} ${classes.sidebarClosed}`;

    const crumbs = [
        {
            page: 'Home',
            pageLink: '/',
            ariaLabel: 'home',
        },
        {
            page: 'Manage Users Dashboard',
            pageLink: '/userDashboard',
            ariaLabel: 'manage user dashboard',
        },
    ];

    const columns = [
        // button column
        {
            accessorKey: 'id',
            cell: (props) => {
                return (
                    <span
                        className={classes.icon}
                        onClick={() => {
                            setUserId(props.getValue());
                            setUserModalVisible(true);
                        }}
                    >
                        <EditIcon />
                    </span>
                );
            },
            header: '',
            size: 50,
        },
        {
            accessorKey: 'email',
            cell: (info) => info.getValue(),
            header: 'Email',
            sort: true,
            alignLeft: true,
        },
        {
            accessorKey: 'firstName',
            cell: (info) => info.getValue(),
            header: 'First Name',
            sort: true,
            alignLeft: true,
        },
        {
            accessorKey: 'lastName',
            cell: (info) => info.getValue(),
            header: 'Last Name',
            sort: true,
            alignLeft: true,
        },
        {
            accessorKey: 'jobTitle',
            cell: (info) => info.getValue(),
            header: 'Job Title/Position',
            sort: true,
            alignLeft: true,
        },
        {
            accessorKey: 'institution',
            cell: (info) => {
                return <span>{info.getValue() === null ? 'null value' : info.getValue()}</span>;
            },
            header: 'Institution Name',
            sort: true,
            alignLeft: true,
        },
    ];

    return (
        <>
            <Banner title="Manage Users Dashboard" manualCrumbs={crumbs} variant="virus1" ariaLabel="Manage Users Dashboard Breadcrumb" />
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
    approvedInstitutions: PropTypes.arrayOf(PropTypes.object),
    dccs: PropTypes.arrayOf(PropTypes.object),
    generalStatuses: PropTypes.arrayOf(PropTypes.string),
    getUserDashboard: PropTypes.arrayOf(PropTypes.object),
    getUserRoles: PropTypes.arrayOf(PropTypes.string),
    researcherLevels: PropTypes.arrayOf(PropTypes.object),
};

export default UserDashboard;
