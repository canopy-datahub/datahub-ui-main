import { addNotification, removeNotification } from '../../store/notifications/notificationsSlice';

export const addAlert = (dispatch, notification) => dispatch(addNotification(notification));
export const removeAlert = (dispatch, notification) => dispatch(removeNotification(notification));
