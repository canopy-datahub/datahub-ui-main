import { isEqual } from 'lodash';

/**
 * Fetches user profile from API using Keycloak JWT authentication
 * @param {Object} nextUser - User profile from props
 * @param {Object} user - Current user from Redux state
 * @param {boolean} authenticated - Whether user is authenticated via Keycloak
 * @param {string} token - Keycloak JWT token
 * @param {Function} restGet - useRest hook's restGet function
 * @param {Function} dispatch - Redux dispatch function
 * @param {Function} setUser - Redux action to set user
 */
export const fetchUserProfile = async (nextUser, user, authenticated, token, restGet, dispatch, setUser) => {
    // Skip if user already loaded and matches props
    if (user !== null && nextUser === undefined) {
        return;
    }

    // Update from props if changed
    if ((user === null && nextUser !== undefined) || (nextUser !== undefined && !isEqual(user, nextUser))) {
        dispatch(setUser(nextUser));
        return;
    }

    // Fetch from API if authenticated with Keycloak
    // Use Next.js API proxy which forwards authorization headers to backend
    if (authenticated && token) {
        try {
            console.log('Fetching user profile...');
            console.log(token);
            const userProfileResponse = await restGet('/api/launch/GetUserProfile/GetUserProfile', {
                errorMessage: 'Error getting user profile info',
            });
            if (userProfileResponse.status === 200) {
                dispatch(setUser(userProfileResponse.data.data));
                console.log('User profile fetched successfully.');
                console.log(userProfileResponse.data.data);
            }
        } catch (error) {
            console.error('Error fetching user profile:', error);
        }
    }
};

