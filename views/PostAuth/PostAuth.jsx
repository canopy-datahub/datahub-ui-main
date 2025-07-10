import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Banner from '../../components/Banner/Banner';
import { useDispatch } from 'react-redux';
import { setUser } from '../../store/user/userSlice';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

/**
 * PostAuth page used to set the session cookie and set userProfile in redux
 * More documentation written in pages/PostAuth
 * @param {Object} props - Object with all of the properties used within the react component, listed below.
 * @property {String} userProfile - User profile information
 * @returns {JSX} Post Auth Component
 */

const PostAuth = (props) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { userProfile } = props;
    Cookies.set('chocolateChip', userProfile.sessionID);
    dispatch(setUser(userProfile));

    useEffect(() => {
        router.push(
            {
                pathname: '/',
            },
            undefined,
            { scroll: true }
        );
    }, []);

    return (
        <>
            <Banner title="Redirecting..." variant="virus3" ariaLabel="redirecting" />
        </>
    );
};

PostAuth.propTypes = {
    userProfile: PropTypes.object,
};

export default PostAuth;
