import React from 'react';
import VariableOverview from '../../views/VariableOverview/VariableOverview';
import { GET_VARIABLE, GET_PERMISSIBLE_VALUES, GET_LINKED_STUDIES } from '../../constants/apiRoutes';
import axios from 'axios';
import logger from '../../lib/logger';

const VariableOverviewPage = (props) => <VariableOverview {...props} />;

export async function getServerSideProps(context) {
    logger.defaultMeta.service = 'pages_variable_overview';
    const { req } = context;
    const { variableId } = context.query;
    let variableData, permissibleValues, linkedStudies;

    // GET Variable
    logger.info('Calling GET_VARIABLE with : %s', GET_VARIABLE + variableId);
    try {
        const searchResponse = await axios.get(GET_VARIABLE + variableId, {
            withCredentials: true,
            headers: {
                Cookie: req.headers.cookie,
            },
        });
        variableData = searchResponse.data;
    } catch (e) {
        logger.error(e?.response?.data?.message || e?.response?.data?.detail || e);
    }

    // GET Permissble Values
    logger.info('Calling GET_PERMISSIBLE_VALUES with : %s', GET_PERMISSIBLE_VALUES + variableId);
    try {
        const searchResponse = await axios.get(GET_PERMISSIBLE_VALUES + variableId, {
            withCredentials: true,
            headers: {
                Cookie: req.headers.cookie,
            },
        });
        permissibleValues = searchResponse.data;
    } catch (e) {
        logger.error(e?.response?.data?.message || e?.response?.data?.detail || e);
    }

    // GET Linked Studies
    logger.info('Calling GET_LINKED_STUDIES with : %s', GET_LINKED_STUDIES + variableId);
    try {
        const searchResponse = await axios.get(GET_LINKED_STUDIES + variableId, {
            withCredentials: true,
            headers: {
                Cookie: req.headers.cookie,
            },
        });
        linkedStudies = searchResponse.data;
    } catch (e) {
        logger.error(e?.response?.data?.message || e?.response?.data?.detail || e);
    }

    return {
        props: {
            variableData,
            permissibleValues,
            linkedStudies
        },
    };
}

export default VariableOverviewPage;
