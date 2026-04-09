import { useEffect, useState } from 'react';
import useKeycloak from '../lib/hooks/useKeycloak';
import axios from 'axios';

const KeycloakTest = () => {
    const { authenticated, loading, login, logout, token } = useKeycloak();
    const [apiResponse, setApiResponse] = useState(null);
    const [error, setError] = useState(null);

    const testPublicEndpoint = async () => {
        try {
            const response = await axios.get(
                'http://localhost:8082/api/user/v1/test-keycloak/public'
            );
            setApiResponse(response.data);
            setError(null);
        } catch (err) {
            setError(err.message);
        }
    };

    const testProtectedEndpoint = async () => {
        try {
            const response = await axios.get(
                'http://localhost:8082/api/user/v1/test-keycloak/protected',
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setApiResponse(response.data);
            setError(null);
        } catch (err) {
            setError(err.response?.data?.message || err.message);
        }
    };

    const testUserInfo = async () => {
        try {
            const response = await axios.get(
                'http://localhost:8082/api/user/v1/test-keycloak/user-info',
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setApiResponse(response.data);
            setError(null);
        } catch (err) {
            setError(err.response?.data?.message || err.message);
        }
    };

    if (loading) {
        return <div style={styles.container}>Loading Keycloak...</div>;
    }

    return (
        <div style={styles.container}>
            <h1>🔐 Keycloak Integration Test</h1>
            
            <div style={styles.section}>
                <h2>Authentication Status</h2>
                <p>Status: {authenticated ? '✅ Authenticated' : '❌ Not Authenticated'}</p>
                {authenticated && (
                    <div>
                        <p>Token: {token?.substring(0, 50)}...</p>
                    </div>
                )}
            </div>

            <div style={styles.section}>
                <h2>Actions</h2>
                {!authenticated ? (
                    <button onClick={login} style={styles.button}>
                        🔑 Login with Keycloak
                    </button>
                ) : (
                    <button onClick={logout} style={styles.button}>
                        🚪 Logout
                    </button>
                )}
            </div>

            {authenticated && (
                <div style={styles.section}>
                    <h2>API Tests</h2>
                    <button onClick={testPublicEndpoint} style={styles.button}>
                        Test Public Endpoint
                    </button>
                    <button onClick={testProtectedEndpoint} style={styles.button}>
                        Test Protected Endpoint
                    </button>
                    <button onClick={testUserInfo} style={styles.button}>
                        Test User Info
                    </button>
                </div>
            )}

            {apiResponse && (
                <div style={styles.section}>
                    <h2>API Response</h2>
                    <pre style={styles.pre}>{JSON.stringify(apiResponse, null, 2)}</pre>
                </div>
            )}

            {error && (
                <div style={styles.error}>
                    <h2>Error</h2>
                    <p>{error}</p>
                </div>
            )}
        </div>
    );
};

const styles = {
    container: {
        maxWidth: '800px',
        margin: '50px auto',
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
    },
    section: {
        marginTop: '30px',
        padding: '20px',
        border: '1px solid #ddd',
        borderRadius: '8px',
    },
    button: {
        padding: '10px 20px',
        margin: '10px',
        fontSize: '16px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
    pre: {
        backgroundColor: '#f5f5f5',
        padding: '15px',
        borderRadius: '4px',
        overflow: 'auto',
    },
    error: {
        marginTop: '30px',
        padding: '20px',
        backgroundColor: '#f8d7da',
        color: '#721c24',
        border: '1px solid #f5c6cb',
        borderRadius: '8px',
    },
};

export default KeycloakTest;
