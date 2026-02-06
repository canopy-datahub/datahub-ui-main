/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import classes from './SupportDashboard.module.scss';
import Sidebar from '../../components/Sidebar/Sidebar';
import Button from '../../components/Button/Button';
import Table from '../../components/Table/Table';
import { useRouter } from 'next/router';
import Banner from '../../components/Banner/Banner';
import CollapsibleSideBar from '../../components/CollapsibleSideBar/CollapsibleSideBar';
import { allSupportDashboard, initiatedSupportDashboard, inProgressSupportDashboard, resolvedSupportDashboard } from './Columns';

const SupportDashboard = (props) => {
    const router = useRouter();
    const { getSupportDashboard, status } = props;

    const menuItems = [
        {
            label: 'All',
            value: 'all',
        },
        {
            label: 'Initiated',
            value: 'initiated',
        },
        {
            label: 'In Progress',
            value: 'in_progress',
        },
        {
            label: 'Closed',
            value: 'closed',
        },
    ];

    // set active state
    const defaultState = menuItems.find((x) => x.value === status);
    const [selectedItem, setSelectedItem] = useState(defaultState);

    const [sidebarOpen, setSideBarOpen] = useState(true);
    const handleViewSidebar = () => {
        setSideBarOpen(!sidebarOpen);
    };

    const contentContainerClass = sidebarOpen ? classes.contentContainer : `${classes.contentContainer} ${classes.sidebarClosed}`;

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

    const changeColumnHeaders = (statusType) => {
        switch (statusType) {
            case 'all':
                return allSupportDashboard;
            case 'initiated':
                return initiatedSupportDashboard;
            case 'in_progress':
                return inProgressSupportDashboard;
            case 'closed':
                return resolvedSupportDashboard;
            default:
                return allSupportDashboard;
        }
    };

    return (
        <>
            <Banner title="Support Dashboard" path={router.asPath} variant="lab4" ariaLabel="Support Dashboard Breadcrumb" />
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
                        <span className={classes.tableTitle}>{`View ${selectedItem.label} Support Requests`}</span>
                        <Button
                            label="Add New Support Request"
                            ariaLabel="add new support request"
                            variant="primary"
                            size="auto"
                            type="button"
                            handleClick={() => {
                                router.push(
                                    {
                                        pathname: '/support',
                                    },
                                    undefined,
                                    { scroll: true }
                                );
                            }}
                        />
                    </div>
                    <Table
                        tableRows={getSupportDashboard}
                        tableHeaders={changeColumnHeaders(selectedItem.value)}
                        className={classes.tableContainer}
                        ariaCaption={`${selectedItem.label} Support Dashboard View`}
                        responsive={false}
                        allowSort={true}
                    />
                </Col>
            </Row>
        </>
    );
};

SupportDashboard.propTypes = {
    getSupportDashboard: PropTypes.arrayOf(PropTypes.object),
};

export default SupportDashboard;
