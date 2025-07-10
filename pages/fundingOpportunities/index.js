import React from 'react';
import FundingOpportunities from '../../views/FundingOpportunities/FundingOpportunities';
import { GET_ALL_FUNDING } from '../../constants/apiRoutes';
import axios from 'axios';
import logger from '../../lib/logger';

const FundingOpportunitiesPage = (props) => <FundingOpportunities {...props} />;

export async function getServerSideProps(context) {
    const { req } = context;

    logger.defaultMeta.service = 'all_funding_opportunities';

    let fundingOpportunities;

    // GET News
    logger.info('Calling GET_ALL_FUNDING: %s', GET_ALL_FUNDING);
    try {
        const searchResponse = await axios.get(GET_ALL_FUNDING, {
            withCredentials: true,
            headers: {
                Cookie: req.headers.cookie,
            },
        });
        fundingOpportunities = searchResponse.data;
    } catch (e) {
        logger.error(e?.response?.data?.message || e?.response?.data?.detail || e);
    }


    return {
        props: {
            fundingOpportunities,
            pageTitle: 'Funding Opportunities',
        },
    };
}

export default FundingOpportunitiesPage;
