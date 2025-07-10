/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'react-bootstrap';
import classes from './FundingOpportunities.module.scss';
import Banner from '../../components/Banner/Banner';
import { useRouter } from 'next/router';
import Table from '../../components/Table/Table';
import { fundingOpsTableColumns } from './Misc/constants';

/**
 * View for the Funding Opportunities Page
 * @property {Array<Object>} fundingOpportunities - List of all funding opportunities
 * @returns {Node} object rendering funding opportunities
 */

const FundingOpportunities = (props) => {
    const { fundingOpportunities } = props;
    const router = useRouter();

    return (
        <>
            <Banner title="Funding Opportunities" path={router.asPath} variant="virus4" ariaLabel="Funding Opportunities Breadcrumb" />

            <Container className={classes.Container}>
                <Table
                    className={classes.tableContainer}
                    tableRows={fundingOpportunities}
                    tableHeaders={fundingOpsTableColumns()}
                    ariaCaption="Funding Opportunities Table"
                    noHover
                    allowSort
                    responsive={false}
                />
            </Container>
        </>
    );
};

FundingOpportunities.propTypes = {
    fundingOpportunities: PropTypes.array,
};

export default FundingOpportunities;
