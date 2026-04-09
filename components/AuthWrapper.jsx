import { useEffect, useState } from 'react';
import useKeycloak from '../lib/hooks/useKeycloak';
import { useRouter } from 'next/router';

const AuthWrapper = ({ children, requireAuth = true }) => {
    const { authenticated, loading } = useKeycloak();
    const router = useRouter();
    const [showContent, setShowContent] = useState(false);

    useEffect(() => {
        if (loading) return;

        if (requireAuth && !authenticated) {
            // Redirect to login page instead of showing errors
            router.push('/login-keycloak');
            return;
        }

        setShowContent(true);
    }, [authenticated, loading, requireAuth, router]);

    if (loading) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                flexDirection: 'column'
            }}>
                <h2>Loading...</h2>
                <p>Please wait while we check your authentication status.</p>
            </div>
        );
    }

    if (!showContent) {
        return null;
    }

    return children;
};

export default AuthWrapper;
