/* eslint-disable multiline-ternary */
import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import classes from './StudyRegistrationDash.module.scss';
import { useRouter } from 'next/router';
import Banner from '../../../components/Banner/Banner';
import Table from '../../../components/Table/Table';
import Upload from '../../../components/Upload/Upload';
import CalloutBox from '../../../components/CalloutBox/CalloutBox';
import useRest from '../../../lib/hooks/useRest';
import { studyRegistrationTableColumns } from './constants';
import { UPLOAD_STUDY_REG, STUDY_DELETION, APPROVED_STUDY_FILES_DELETION } from '../../../constants/apiRoutes';
import Sidebar from '../../../components/Sidebar/Sidebar';
import CollapsibleSideBar from '../../../components/CollapsibleSideBar/CollapsibleSideBar';

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
            label: 'In Review',
            value: 'In Review',
        },
        {
            label: 'Pending DCC Input',
            value: 'Pending DCC Input',
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
        router.push(`/${userRole}/editStudyRegistration?studyId=${id}`);
    };

    const handleAddStudy = async (e) => {
        const formData = new FormData();
        formData.append('file', e.target.files[0]);
        const uploadResult = await restPost(UPLOAD_STUDY_REG, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
            showLoading: true,
            successMessage: `Study successfully added`,
        });
        if (uploadResult.status === 200) {
            router.reload();
        } else {
            router.reload();
        }
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
                {userRole === 'curator' && (
                    <Row>
                        <Container>
                            <CalloutBox
                                className={classes.instructionsContainer}
                                body={
                                    <div>
                                        To begin a new study registration, please upload a dbGaP PDF form using the button below. Click the
                                        edit icon below to view the form.
                                    </div>
                                }
                            />
                        </Container>
                        <div>
                            <Upload
                                id={'uploadFiles-study-reg-dash'}
                                label="PDF Upload"
                                multiple={false}
                                accept={'*/*'}
                                handleChange={handleAddStudy}
                                ariaLabel="Upload the D B gap .pdf file for Study Registration"
                                buttonClass={classes.uploadButtons}
                            />
                        </div>
                    </Row>
                )}
                {userRole === 'dcc' && selectedItem.label === 'Pending DCC Input' ? (
                    <CalloutBox
                        className={classes.instructionsContainer}
                        body={<div>Please view a form by clicking an edit icon below.</div>}
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
