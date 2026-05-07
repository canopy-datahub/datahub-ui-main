import React, { useEffect } from 'react';
import Banner from '../../components/Banner/Banner';
import { useRouter } from 'next/router';

/**
 * Landing page after Keycloak redirect. Just bounces the user to the home page —
 * the user profile is fetched JWT-secured from CoreLayout, so nothing else is
 * needed here.
 * @returns {JSX} Post Auth Component
 */

const PostAuth = () => {
    const router = useRouter();

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
            <Banner title="Redirecting..." variant="lab3" ariaLabel="redirecting" />
        </>
    );
};

export default PostAuth;
