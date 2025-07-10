/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';
import { useRouter } from 'next/router';
import classes from './StudyFileSubmissions.module.scss';
import Banner from '../../components/Banner/Banner';
import Table from '../../components/Table/Table';
import { submissionsTableColumns } from './constants';
import Sidebar from '../../components/Sidebar/Sidebar';
import CollapsibleSideBar from '../../components/CollapsibleSideBar/CollapsibleSideBar';
import Button from '../../components/Button/Button';
import { downloadLink } from '../../lib/pageHelpers/downloadLink';
import useRest from '../../lib/hooks/useRest';
import DownloadIcon from '../../components/Images/svg/DownloadIcon';
import { DOWNLOAD_WEEKLY_REPORT } from '../../constants/apiRoutes';
import Cookies from 'js-cookie';

/**
 * View for the Study File Submission Dashboard
 *
 * @property {Array} studyFileSubmissios - list of study file submissions
 * @property {String} status - which status of submissions were looking at
 * @property {String} baseUrl - url used for downloading
 * @returns {Node} object rendering the Study File Submission Dashboard
 */

const StudyFileSubmissions = (props) => {
    const { studyFileSubmissions, status, baseUrl } = props;
    const router = useRouter();
    const { restGet } = useRest();
    const cookie = Cookies.get('chocolateChip');

    const menuItems = [
        {
            label: 'In Progress',
            value: 'in_progress',
        },
        {
            label: 'Submitted',
            value: 'submitted',
        },
        {
            label: 'Completed',
            value: 'completed',
        },
    ];

    // set active state
    const defaultState = menuItems.find((x) => x.value === status);

    const [selectedItem, setSelectedItem] = useState(defaultState);
    const [sidebarOpen, setSideBarOpen] = useState(true);
    const handleViewSidebar = () => {
        setSideBarOpen(!sidebarOpen);
    };

    const contentContainerClass = sidebarOpen ? classes.body : `${classes.body} ${classes.sidebarClosed}`;

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

    return (
        <>
            <Banner
                title="Study File Submissions"
                path={router.asPath}
                variant="virus4"
                ariaLabel="Study File Submissions"
                topic="Studies"
            />
            <Row className={classes.row}>
                <CollapsibleSideBar
                    isOpen={sidebarOpen}
                    toggleSidebar={handleViewSidebar}
                    title="Statuses"
                    titleClassName={classes.sidebarTitle}
                >
                    <Sidebar menuItems={menuItems} onSelectedMenuItem={setSelectedItem} selectedItem={selectedItem} />
                </CollapsibleSideBar>
                <Col lg={10} className={contentContainerClass}>
                    <Button
                        label="Download Weekly Report"
                        variant="primary"
                        size="auto"
                        iconRight={<DownloadIcon />}
                        className={classes.buttons}
                        handleClick={async () => {
                            downloadLink(`${baseUrl}${DOWNLOAD_WEEKLY_REPORT}${cookie}`, restGet);
                        }}
                    />
                    <Table
                        className={classes.tableContainer}
                        tableRows={studyFileSubmissions}
                        tableHeaders={submissionsTableColumns(selectedItem.value)}
                        ariaCaption="Study File Submissions Table"
                        noHover
                        responsive={false}
                    ></Table>
                </Col>
            </Row>
        </>
    );
};

StudyFileSubmissions.propTypes = {
    baseUrl: PropTypes.string,
    status: PropTypes.string,
    studyFileSubmissions: PropTypes.array,
};

export default StudyFileSubmissions;
