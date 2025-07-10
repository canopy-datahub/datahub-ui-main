/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'react-bootstrap';
import classes from './DownloadsDashboard.module.scss';
import Banner from '../../components/Banner/Banner';
import Table from '../../components/Table/Table';
import { downloadsDashboardTableColumns } from './Components/constants';
import { useRouter } from 'next/router';
import useRest from '../../lib/hooks/useRest';
import { useSelector } from 'react-redux';

/**
 * View for the Downloads Dashboard
 * @property {String} baseUrl - String grabbing the base URL for downloads
 * @property {Array<Object>} downloads - list of files to be downloaded
 * @returns {Node} object rendering Downloads Dashboard
 */

const DownloadsDashboard = (props) => {
    const { baseUrl, downloads } = props;
    const router = useRouter();
    const { restGet } = useRest();
    const { user } = useSelector((state) => state.userProfile);

    return (
        <>
            <Banner title="Downloads" path={router.asPath} variant="crystal" ariaLabel="Downloads Dashboard Breadcrumb" />

            <Container className={classes.Container}>
                <Table
                    className={classes.tableContainer}
                    tableRows={downloads}
                    tableHeaders={downloadsDashboardTableColumns(baseUrl, restGet, user)}
                    ariaCaption="Downloads Table"
                    noHover
                    responsive={false}
                    allowSort
                ></Table>
            </Container>
        </>
    );
};

DownloadsDashboard.propTypes = {
    baseUrl: PropTypes.string,
    downloads: PropTypes.arrayOf(PropTypes.object),
};

export default DownloadsDashboard;
