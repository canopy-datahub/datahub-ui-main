import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import useRest from '../../lib/hooks/useRest';
import { GET_USER_PROFILE } from '../../constants/apiRoutes';
import { isEqual } from 'lodash';
import { setUser } from '../../store/user/userSlice';

export const GetUserProfile = async (nextUser, user) => {
    const { restGet } = useRest();
    const dispatch = useDispatch();

    if (user !== null && nextUser === undefined) {
        return user;
    } else if ((user === null && nextUser !== undefined) || (nextUser !== undefined && !isEqual(user, nextUser))) {
        dispatch(setUser(nextUser));
        user = nextUser;
    } else if (Cookies.get('chocolateChip') !== undefined) {
        const userProfileResponse = await restGet(GET_USER_PROFILE.replace('[id]', Cookies.get('chocolateChip')), {
            errorMessage: 'Error getting user profile info',
        });
        if (userProfileResponse.status === 200) {
            dispatch(setUser(userProfileResponse.data.data));
            user = userProfileResponse.data.data;
        } else {
            Cookies.remove('chocolateChip');
        }
    }
};
