/* eslint-disable multiline-ternary */
import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import classes from './StudyRegistrationDash.module.scss';
import { useRouter } from 'next/router';
import Banner from '../../../components/Banner/Banner';
import Table from '../../../components/Table/Table';
import CalloutBox from '../../../components/CalloutBox/CalloutBox';
import useRest from '../../../lib/hooks/useRest';
import { studyRegistrationTableColumns } from './constants';
import { STUDY_DELETION, APPROVED_STUDY_FILES_DELETION } from '../../../constants/apiRoutes';
import Sidebar from '../../../components/Sidebar/Sidebar';
import CollapsibleSideBar from '../../../components/CollapsibleSideBar/CollapsibleSideBar';
import Button from '../../../components/Button/Button';

/**
 * View for the Study Registration Page
 * @property {String} userRole the user role of the current user
 * @returns {Node} object rendering the Study Registration
 */

const StudyRegistrationDash = (props) => {
    const { userRole, studies, status } = props;
    const router = useRouter();

    const menuItems = [
        {
            label: 'Draft',
            value: 'Draft',
        },
        {
            label: 'In Review',
            value: 'In Review',
        },
        {
            label: 'Approved',
            value: 'Approved',
        },
    ];

    // set active state
    const defaultState = menuItems.find((x) => x.value === status);

    const [selectedItem, setSelectedItem] = useState(defaultState);
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const handleViewSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

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

    const { restPost, restDelete } = useRest();

    const handleEdit = (userRole, id) => {
        router.push(`/editStudyRegistration?studyId=${id}&userRole=${userRole}&status=${status}`);
    };

    const handleRegisterNewStudy = () => {
        // Navigate to edit page with a special flag for new study
        router.push(`/editStudyRegistration?newStudy=true&userRole=${userRole}&status=${status}`);
    };

    const handleDeleteStudy = async (id) => {
        const deleteResult = await restDelete(`${STUDY_DELETION.replace(`[studyId]`, id)}`, {
            showLoading: true,
            showSuccess: true,
            successMessage: `Study ${id} successfully deleted`,
        });
        if (deleteResult.status === 200) {
            router.reload();
        }
    };

    const handleDeleteStudyFiles = async (id) => {
        const deleteResult = await restDelete(`${APPROVED_STUDY_FILES_DELETION.replace(`[studyId]`, id)}`, {
            showLoading: true,
            showSuccess: true,
            successMessage: `Files for Study ${id} were successfully deleted`,
        });
        if (deleteResult.status === 200) {
            router.reload();
        }
    };

    const crumbs = [
        {
            page: 'Home',
            pageLink: '/',
            ariaLabel: 'home',
        },
        {
            page: 'Study Registration',
        },
    ];

    return (
        <Row className={`${classes.container} ${classes.row}`}>
            <Banner title="Study Registration" manualCrumbs={crumbs} variant="crystal" ariaLabel="Study Registration" />
            <CollapsibleSideBar
                isOpen={sidebarOpen}
                toggleSidebar={handleViewSidebar}
                title="Statuses"
                titleClassName={classes.sidebarTitle}
            >
                <Sidebar menuItems={menuItems} onSelectedMenuItem={setSelectedItem} selectedItem={selectedItem} />
            </CollapsibleSideBar>
            <Col className={`${classes.container} ${classes.body}`}>
                {(userRole === 'curator' || userRole === 'center') && (
                    <Row>
                        <Container>
                            <CalloutBox
                                className={classes.instructionsContainer}
                                body={
                                    <div>
                                        To begin a new study registration, click the button below to start with an empty registration form. 
                                    </div>
                                }
                            />
                        </Container>
                        <div>
                            <Button
                                label="Register A New Study"
                                handleClick={handleRegisterNewStudy}
                                variant="primary"
                                className={classes.uploadButtons}
                                ariaLabel="Register a new study with empty form"
                            />
                        </div>
                    </Row>
                )}
                {selectedItem.label === 'Draft' ? (
                    <CalloutBox
                        className={classes.instructionsContainer}
                        body={<div>Please continue your study registration by clicking an edit icon below.</div>}
                    />
                ) : (
                    <br />
                )}
                <Table
                    tableRows={studies}
                    tableHeaders={studyRegistrationTableColumns(
                        userRole,
                        handleEdit,
                        handleDeleteStudy,
                        handleDeleteStudyFiles,
                        selectedItem
                    )}
                    className={classes.tableContainer}
                    ariaCaption="Study Registration Dashboard"
                    responsive={false}
                    noHover
                />
            </Col>
        </Row>
    );
};

StudyRegistrationDash.propTypes = {
    userRole: PropTypes.string,
};

export default StudyRegistrationDash;
