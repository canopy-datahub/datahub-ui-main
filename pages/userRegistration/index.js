import React from 'react';
import UserRegistration from '../../views/UserRegistration/UserRegistration';
import logger from '../../lib/logger';
import axios from 'axios';
import {
    GET_RESEARCHER_LEVELS,
    GET_APPROVED_INSTITUTIONS,
    ALL_STATES,
    ALL_COUNTRIES,
    GET_INSTITUTIONS_TYPES,
    GET_INFO_BY_COOKIE,
    GET_REFERRERS,
} from '../../constants/apiRoutes';

const UserRegistrationPage = (props) => <UserRegistration {...props} />;

export async function getServerSideProps(context) {
    logger.defaultMeta.service = 'user_registration_form';
    const { req } = context;
    const researcherLevels = [];
    const approvedInstitution = [];
    const allStates = [];
    const allCountries = [];
    const institutionTypes = [];
    const referrerTypes = [];
    let rasUser = {};
    let checkUser = false;

    logger.info('Calling GET_INFO_BY_COOKIE with: %s', GET_INFO_BY_COOKIE);
    try {
        const getCheckUserResponse = await axios.get(`${GET_INFO_BY_COOKIE}`, {
            withCredentials: true,
            headers: {
                Cookie: req.headers.cookie,
            },
        });
        if (getCheckUserResponse.data) {
            checkUser = true;
        }
    } catch (e) {
        logger.error(`GET_INFO_BY_COOKIE call failed.  Error Message: ${e?.response?.data?.message || e?.response?.data?.detail || e}`);
    }

    logger.info('Calling GET_RESEARCHER_LEVELS with: %s', GET_RESEARCHER_LEVELS);
    try {
        const getResearcherLevelsResponse = await axios.get(`${GET_RESEARCHER_LEVELS}`, {
            withCredentials: true,
            headers: {
                Cookie: req.headers.cookie,
            },
        });
        getResearcherLevelsResponse.data.forEach((obj) => {
            const setup = {
                label: obj,
                value: obj,
            };
            researcherLevels.push(setup);
        });
    } catch (e) {
        logger.error(`GET_RESEARCHER_LEVELS call failed.  Error Message: ${e?.response?.data?.message || e?.response?.data?.detail || e}`);
    }

    logger.info('Calling GET_APPROVED_INSTITUTIONS with: %s', GET_APPROVED_INSTITUTIONS);
    try {
        const getApprovedInstitutionResponse = await axios.get(`${GET_APPROVED_INSTITUTIONS}`, {
            withCredentials: true,
            headers: {
                Cookie: req.headers.cookie,
            },
        });
        getApprovedInstitutionResponse.data.forEach((obj) => {
            const setup = {
                label: obj.name,
                value: obj.name,
            };

            approvedInstitution.push(setup);
        });
    } catch (e) {
        logger.error(`GET_APPROVED_INSTITUTIONS call failed.  Error Message: ${e?.response?.data?.message || e?.response?.data?.detail || e}`);
    }

    logger.info('Calling ALL_STATES with: %s', ALL_STATES);
    try {
        const getAllStatesResponse = await axios.get(`${ALL_STATES}`, {
            withCredentials: true,
            headers: {
                Cookie: req.headers.cookie,
            },
        });
        getAllStatesResponse.data.forEach((obj) => {
            const setup = {
                label: obj.name,
                value: obj.name,
            };

            allStates.push(setup);
        });
    } catch (e) {
        logger.error(`ALL_STATES call failed.  Error Message: ${e?.response?.data?.message || e?.response?.data?.detail || e}`);
    }

    logger.info('Calling ALL_COUNTRIES with: %s', ALL_COUNTRIES);
    try {
        const getAllCountriesResponse = await axios.get(`${ALL_COUNTRIES}`, {
            withCredentials: true,
            headers: {
                Cookie: req.headers.cookie,
            },
        });
        getAllCountriesResponse.data.forEach((obj) => {
            const setup = {
                label: obj.name,
                value: obj.name,
            };

            allCountries.push(setup);
        });
    } catch (e) {
        logger.error(`ALL_COUNTRIES call failed.  Error Message: ${e?.response?.data?.message || e?.response?.data?.detail || e}`);
    }

    logger.info('Calling GET_INSTITUTIONS_TYPES with: %s', GET_INSTITUTIONS_TYPES);
    try {
        const getInstitutionTypesResponse = await axios.get(`${GET_INSTITUTIONS_TYPES}`, {
            withCredentials: true,
            headers: {
                Cookie: req.headers.cookie,
            },
        });
        getInstitutionTypesResponse.data.forEach((obj) => {
            const setup = {
                label: obj,
                value: obj,
            };

            institutionTypes.push(setup);
        });
    } catch (e) {
        logger.error(`GET_INSTITUTIONS_TYPES call failed.  Error Message: ${e?.response?.data?.message || e?.response?.data?.detail || e}`);
    }

    logger.info('Calling GET_REFERRERS with: %s', GET_REFERRERS);
    try {
        const getReferrersResponse = await axios.get(`${GET_REFERRERS}`, {
            withCredentials: true,
            headers: {
                Cookie: req.headers.cookie,
            },
        });
        getReferrersResponse.data.forEach((obj) => {
            referrerTypes.push(obj);
        });
    } catch (e) {
        logger.error(`GET_REFERRERS call failed.  Error Message: ${e?.response?.data?.message || e?.response?.data?.detail || e}`);
    }

    return {
        props: {
            rasUser,
            researcherLevels,
            approvedInstitution,
            allStates,
            allCountries,
            institutionTypes,
            checkUser,
            referrerTypes,
            pageTitle: 'User Registration',
        },
    };
}

export default UserRegistrationPage;
