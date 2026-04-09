/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Container } from 'react-bootstrap';
import classes from './DownloadsDashboard.module.scss';
import Banner from '../../components/Banner/Banner';
import Table from '../../components/Table/Table';
import { downloadsDashboardTableColumns } from './Components/constants';
import { useRouter } from 'next/router';
import useRest from '../../lib/hooks/useRest';
import useKeycloak from '../../lib/hooks/useKeycloak';
import { useSelector } from 'react-redux';

/**
 * View for the Downloads Dashboard
 * @property {String} baseUrl - String grabbing the base URL for downloads
 * @returns {Node} object rendering Downloads Dashboard
 */

const DownloadsDashboard = (props) => {
    const { baseUrl } = props;
    const router = useRouter();
    const { restGet } = useRest();
    const { token } = useKeycloak();
    const { user } = useSelector((state) => state.userProfile);
    const [downloads, setDownloads] = useState([]);

    useEffect(() => {
        if (!token) return;
        restGet('/api/launch/DownloadsDashboard/CuratorDownloads', {
            errorMessage: 'Error loading downloads',
        }).then((response) => {
            if (response?.status === 200) {
                setDownloads(response.data.data || []);
            }
        });
    }, [token]);

    return (
        <>
            <Banner title="Downloads" path={router.asPath} variant="lab4" ariaLabel="Downloads Dashboard Breadcrumb" />

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
};

export default DownloadsDashboard;
