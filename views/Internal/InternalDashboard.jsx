import React from 'react';
import { Col, Row } from 'react-bootstrap';
import Banner from '../../components/Banner/Banner';
import classes from './InternalDashboard.module.scss';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import useRest from '../../lib/hooks/useRest';
import { downloadLink } from '../../lib/pageHelpers/downloadLink';
import Button from '../../components/Button/Button';
import Table from '../../components/Table/Table';
import { allSupportTracker } from './Columns';
import DownloadIcon from '../../components/Images/svg/DownloadIcon';

const InternalDashboard = (props) => {
    const { getSupportTracker, downloadCSV } = props;
    const { user } = useSelector((state) => state.userProfile);
    const { restGet } = useRest();

    const crumbs = [
        {
            page: 'Home',
            pageLink: '/',
            ariaLabel: 'home',
        },
        {
            page: 'Support Dashboard',
        },
    ];

    return (
        <>
            <Banner title="Support Dashboard" manualCrumbs={crumbs} variant="virus4" ariaLabel="Support Dashboard" />
            <Row className={classes.container}>
                <Col lg="12" className="px-0">
                    <div className={`${classes.rowContainer}`}>
                        <Button
                            variant="secondary"
                            label="Download CSV"
                            className={`${classes.button}`}
                            iconLeft={<DownloadIcon />}
                            handleClick={async () => {
                                downloadLink(downloadCSV.replace('[sessionID]', user?.sessionID), restGet);
                            }}
                        />
                    </div>
                    <Table
                        tableRows={getSupportTracker}
                        tableHeaders={allSupportTracker}
                        className={classes.tableContainer}
                        ariaCaption="Support Tracker View"
                        responsive={false}
                        allowSort={true}
                    />
                </Col>
            </Row>
        </>
    );
};

InternalDashboard.propTypes = {
    downloadCSV: PropTypes.string,
    getSupportTracker: PropTypes.arrayOf(PropTypes.string),
};

export default InternalDashboard;
