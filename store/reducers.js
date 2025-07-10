import { combineReducers } from 'redux';
//import { supportAssigneesSlice } from './support/supportAssigneesSlice';
import environmentReducer from './environment/environmentSlice';
import notificationsReducer from './notifications/notificationsSlice';
import userReducer from './user/userSlice';

// COMBINED REDUCERS
const reducers = {
    environment: environmentReducer,
    notifications: notificationsReducer,
    //supportAssignees: supportAssigneesSlice.reducer,
    userProfile: userReducer,
};

export default combineReducers(reducers);
