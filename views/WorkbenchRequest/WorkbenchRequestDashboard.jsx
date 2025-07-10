/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'react-bootstrap';
import classes from './WorkbenchRequest.module.scss';
import Banner from '../../components/Banner/Banner';
import Table from '../../components/Table/Table';
import { workbenchRequestDashboardTableColumns } from './Components/constants';
import { useRouter } from 'next/router';
/**
 * View for the Workbench Request Dashboard
 * @property {Array<Object>} workbenchRequestData - Table Data for all Workbench Requests
 * @returns {Node} object rendering Workbench Request Dashboard
 */

const WorkbenchRequestDashboard = (props) => {
    const { workbenchRequestData } = props;
    const router = useRouter();
    return (
        <>
            <Banner
                title="Workbench Request Dashboard"
                path={router.asPath}
                variant="crystal"
                ariaLabel="Workbench Request Dashboard Breadcrumb"
            />

            <Container className={classes.Container}>
                <Table
                    className={classes.tableContainer}
                    tableRows={workbenchRequestData}
                    tableHeaders={workbenchRequestDashboardTableColumns()}
                    ariaCaption="Study File Submissions Table"
                    noHover
                    responsive={false}
                ></Table>
            </Container>
        </>
    );
};

WorkbenchRequestDashboard.propTypes = {
    workbenchRequestData: PropTypes.arrayOf(PropTypes.object),
};

export default WorkbenchRequestDashboard;
