import { useEffect } from 'react';
import useKeycloak from '../lib/hooks/useKeycloak';

const KeycloakLoginRedirect = () => {
    const { login } = useKeycloak();

    useEffect(() => {
        // Redirect directly to Keycloak login
        login();
    }, [login]);

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            flexDirection: 'column',
            gap: '20px'
        }}>
            <h2>Redirecting to Keycloak Login...</h2>
            <p>Please wait while we redirect you to the login page.</p>
            <div style={{
                width: '40px',
                height: '40px',
                border: '4px solid #f3f3f3',
                borderTop: '4px solid #3498db',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite'
            }} />
            <style jsx>{`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
};

export default KeycloakLoginRedirect;
