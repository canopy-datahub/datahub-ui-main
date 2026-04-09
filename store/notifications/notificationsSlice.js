import { createSlice } from '@reduxjs/toolkit';
import moment from 'moment';

export const notificationsSlice = createSlice({
    name: 'notifications',
    initialState: {
        notifications: [],
    },
    reducers: {
        addNotification: (state, action) => {
            const tempNotification = { ...action.payload };
            tempNotification.id = moment().format('x');
            state.notifications.push(tempNotification);
        },
        removeNotification: (state, action) => {
            const tempNotification = { ...action.payload };
            const removeIndex = state.notifications.findIndex((item) => item.id === tempNotification.id);
            state.notifications.splice(removeIndex, 1);
        },
    },
});

// Action creators are generated for each case reducer function
export const { addNotification, removeNotification } = notificationsSlice.actions;

export default notificationsSlice.reducer;
