export const NotificationType = {
    ERROR: 'ERROR',
    WARNING: 'WARNING',
    NORMAL: 'NORMAL',
    SUCCESS: 'SUCCESS',
};

export const BaseNotification = {
    type: NotificationType.NORMAL,
    message: '',
    delay: 8000,
};

export const ErrorMessage = {
    400: `Bad Request - Request could not be completed. If needed, please contact the Support Team by using the 'Contact Us' link in the navigation bar.`,
    401: 'You are not authorized to access this page. To access, please log in.',
    // eslint-disable-next-line max-len
    403: `You do not have the correct permissions to access this page. If you believe you need to change your permissions, please contact the Support Team by using the 'Contact Us' link in the navigation bar.`,
};
