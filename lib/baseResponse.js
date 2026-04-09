export const baseResponse = (message, data, status) => {
    return {
        success: true,
        message: message || '',
        data: data || {},
        status: status,
    };
};

export const errorResponse = (message, data = null, status) => {
    return {
        success: false,
        message: message || '',
        data: data || {},
        status: status,
    };
};

export const errorValidation = (validation) => {
    const errors = validation.errors.map((value) => {
        return {
            dataPath: value.dataPath,
            message: value.message,
        };
    });

    return {
        error: errors,
    };
};
