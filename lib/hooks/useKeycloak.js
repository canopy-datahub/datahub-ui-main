import { useEffect, useState, useCallback } from 'react';
import Keycloak from 'keycloak-js';

// Initialize Keycloak instance configuration
const keycloakConfig = {
    url: process.env.NEXT_PUBLIC_DEV_URL,
    realm: process.env.NEXT_PUBLIC_KEYCLOAK_REALM,
    clientId: process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID,
};

// Use module-level variables to ensure singleton behavior
let keycloakInstance = null;
let isKeycloakInitialized = false; // Flag to track if init has been called
let initializationPromise = null; // Store the initialization promise

const useKeycloak = () => {
    const [keycloak, setKeycloak] = useState(null);
    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState(null);

    useEffect(() => {
        const initKeycloak = async () => {
            try {
                // Create Keycloak instance only once
                if (!keycloakInstance) {
                    keycloakInstance = new Keycloak(keycloakConfig);
                }

                // Call init() only once and reuse the promise
                if (!isKeycloakInitialized && !initializationPromise) {
                    initializationPromise = keycloakInstance.init({
                        onLoad: 'check-sso',
                        pkceMethod: 'S256',
                        checkLoginIframe: false,
                    }).then((auth) => {
                        isKeycloakInitialized = true;
                        // Auto-refresh the token before it expires so all callers
                        // reading keycloakInstance.token always get a valid token.
                        keycloakInstance.onTokenExpired = () => {
                            keycloakInstance.updateToken(30).catch(() => {
                                console.error('Keycloak token refresh failed');
                            });
                        };
                        return auth;
                    }).catch((error) => {
                        console.error('Keycloak initialization failed:', error);
                        return false;
                    });
                }

                // Wait for initialization to complete
                if (initializationPromise) {
                    const auth = await initializationPromise;
                    setKeycloak(keycloakInstance);
                    setAuthenticated(auth || false);
                    setToken(keycloakInstance.token || null);

                    // Expose to window for debugging
                    if (typeof window !== 'undefined') {
                        window.keycloak = keycloakInstance;
                    }
                } else {
                    // Already initialized
                    setKeycloak(keycloakInstance);
                    setAuthenticated(keycloakInstance.authenticated || false);
                    setToken(keycloakInstance.token || null);

                    // Expose to window for debugging
                    if (typeof window !== 'undefined') {
                        window.keycloak = keycloakInstance;
                    }
                }
            } catch (error) {
                console.error('Error in useKeycloak:', error);
                setAuthenticated(false);
                setToken(null);
            } finally {
                setLoading(false);
            }
        };

        initKeycloak();
    }, []);

    const login = useCallback(() => {
        if (keycloakInstance) {
            keycloakInstance.login();
        }
    }, []);

    const logout = useCallback(() => {
        if (keycloakInstance) {
            // Redirect to homepage after logout
            keycloakInstance.logout({
                redirectUri: window.location.origin
            });
        }
    }, []);

    return {
        keycloak,
        authenticated,
        loading,
        token,
        login,
        logout
    };
};

export default useKeycloak;
