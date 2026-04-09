/* eslint-disable max-len */
import React, { useState, useEffect, useRef } from 'react';
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
import useRest from '../../lib/hooks/useRest';
import useKeycloak from '../../lib/hooks/useKeycloak';

const SupportDashboard = (props) => {
    const router = useRouter();
    const { status } = props;
    const { restGet } = useRest();
    const { token } = useKeycloak();

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

    const defaultState = menuItems.find((x) => x.value === status) || menuItems[1];
    const [selectedItem, setSelectedItem] = useState(defaultState);
    const [getSupportDashboard, setGetSupportDashboard] = useState([]);
    const isInitialRender = useRef(true);

    const [sidebarOpen, setSideBarOpen] = useState(true);
    const handleViewSidebar = () => {
        setSideBarOpen(!sidebarOpen);
    };

    const contentContainerClass = sidebarOpen ? classes.contentContainer : `${classes.contentContainer} ${classes.sidebarClosed}`;

    useEffect(() => {
        if (isInitialRender.current) {
            isInitialRender.current = false;
            return;
        }
        router.push(
            {
                pathname: router.pathname,
                query: { status: selectedItem.value },
            },
            undefined,
            { scroll: false, shallow: true }
        );
    }, [selectedItem]);

    useEffect(() => {
        if (!token) return;
        restGet(`/api/launch/Support/AllSupportRequests?status=${selectedItem.value}`, {
            errorMessage: 'Error loading support requests',
        }).then((response) => {
            if (response?.status === 200) {
                setGetSupportDashboard(response.data.data || []);
            }
        });
    }, [token, selectedItem]);

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
    status: PropTypes.string,
};

export default SupportDashboard;
