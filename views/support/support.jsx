import React from 'react';
import SupportRequestForm from './Components/Form/SupportForm';
import Banner from '../../components/Banner/Banner';
import PropTypes from 'prop-types';

/**
 * Support Request Page
 * @param {Object} props - Object with all of the properties used within the react component, listed below.
 * @property {Array} requestTypesData - Array of all request types
 * @property {Array} approvedInstitutions - Array of all the approved institutions
 * @returns {JSX} Support Request Page Component
 */

const UserRequestSupport = (props) => {
    const { requestTypesData, approvedInstitutions } = props;

    const crumbs = [
        {
            page: 'Home',
            pageLink: '/',
            ariaLabel: 'home',
        },
        {
            page: 'Support Request',
        },
    ];

    return (
        <>
            <Banner title="Support Request" manualCrumbs={crumbs} variant="virus3" ariaLabel="Support Request Breadcrumb" />
            <SupportRequestForm requestTypes={requestTypesData} approvedInstitutions={approvedInstitutions} />
        </>
    );
};

UserRequestSupport.propTypes = {
    approvedInstitutions: PropTypes.arrayOf(PropTypes.string),
    requestTypesData: PropTypes.arrayOf(PropTypes.string),
};

export default UserRequestSupport;
