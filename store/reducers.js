import { combineReducers } from 'redux';
//import { supportAssigneesSlice } from './support/supportAssigneesSlice';
import environmentReducer from './environment/environmentSlice';
import notificationsReducer from './notifications/notificationsSlice';
import userReducer from './user/userSlice';
import systemSettingsReducer from './systemSettings/systemSettingsSlice';

// COMBINED REDUCERS
const reducers = {
    environment: environmentReducer,
    notifications: notificationsReducer,
    //supportAssignees: supportAssigneesSlice.reducer,
    userProfile: userReducer,
    systemSettings: systemSettingsReducer,
};

export default combineReducers(reducers);
