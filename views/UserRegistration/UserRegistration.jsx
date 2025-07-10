import Banner from '../../components/Banner/Banner';
import PropTypes from 'prop-types';
import React from 'react';
import { useRouter } from 'next/router';
import UserRegistrationForm from './Components/UserRegistrationForm';

/**
 * User Registration Page
 * @param {Object} props - Object with all of the properties used within the react component, listed below.
 * @property {Array} allStates - Array of all the states
 * @property {Array} allCountries - Array of all the countries
 * @property {Array} institutionTypes - Array of all the different types of institutions
 * @property {Array} approvedInstitution - Array of all approved institutions
 * @property {Array} researcherLevels - Array of all the different researcher levels for a user
 * @property {Object} rasUser - User information coming from Ras when logging in from login.gov - used to pre-populate user registration fields
 * @property {Boolean} checkUser - Boolean to see if user is logged in
 * @property {Array} referrerTypes - Array of the ways you may have heard of RADx
 */

const UserRegistration = (props) => {
    const { researcherLevels, approvedInstitution, allStates, allCountries, institutionTypes, rasUser, checkUser, referrerTypes } = props;
    const router = useRouter();

    return (
        <>
            <Banner title="User Registration" path={router.asPath} variant="virus4" ariaLabel="Support Dashboard Breadcrumb" />
            <UserRegistrationForm
                researcherLevels={researcherLevels}
                approvedInstitution={approvedInstitution}
                allStates={allStates}
                allCountries={allCountries}
                institutionTypes={institutionTypes}
                rasUser={rasUser}
                checkUser={checkUser}
                referrerTypes={referrerTypes}
            />
        </>
    );
};

UserRegistration.propTypes = {
    allCountries: PropTypes.arrayOf(PropTypes.object),
    allStates: PropTypes.arrayOf(PropTypes.object),
    approvedInstitution: PropTypes.arrayOf(PropTypes.object),
    checkUser: PropTypes.bool,
    institutionTypes: PropTypes.arrayOf(PropTypes.object),
    rasUser: PropTypes.object,
    referrerTypes: PropTypes.arrayOf(PropTypes.object),
    researcherLevels: PropTypes.arrayOf(PropTypes.object),
};

export default UserRegistration;
