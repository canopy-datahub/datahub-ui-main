import React from 'react';
import VariablesCatalog from '../../views/VariablesCatalog/VariablesCatalog';
import { GET_CORE_VARIABLES_CATALOG_DATA, GET_ALL_VARIABLES_CATALOG_DATA } from '../../constants/apiRoutes';
import axios from 'axios';
import logger from '../../lib/logger';

const VariablesCatalogPage = (props) => <VariablesCatalog {...props} />;

export async function getServerSideProps(context) {
    const { req } = context;

    logger.defaultMeta.service = 'Variables Catalog';

    let coreData, allData, date;

    // Core Variables and Last Modified Data
    logger.info('Calling GET_CORE_VARIABLES_CATALOG_DATA with : %s', GET_CORE_VARIABLES_CATALOG_DATA);
    try {
        const getCoreVariablesCatalogResponse = await axios.get(GET_CORE_VARIABLES_CATALOG_DATA);
        coreData = getCoreVariablesCatalogResponse.data;
        date = getCoreVariablesCatalogResponse.headers['last-modified'];
    } catch (e) {
        logger.error(`GET_CORE_VARIABLES_CATALOG_DATA call failed.  Error Message: ${e?.response?.data?.message || e?.response?.data?.detail || e}`);
    }

    // All Variables
    logger.info('Calling GET_ALL_VARIABLES_CATALOG_DATA with : %s', GET_ALL_VARIABLES_CATALOG_DATA);
    try {
        const getAllVariablesCatalogResponse = await axios.get(GET_ALL_VARIABLES_CATALOG_DATA);
        allData = getAllVariablesCatalogResponse.data;
    } catch (e) {
        logger.error(`GET_ALL_VARIABLES_CATALOG_DATA call failed.  Error Message: ${e?.response?.data?.message || e?.response?.data?.detail || e}`);
    }

    return {
        props: {
            coreData,
            allData,
            date,
            pageTitle: 'Variables Catalog',
        },
    };
}

export default VariablesCatalogPage;
