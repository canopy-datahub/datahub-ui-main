import blacklist from 'badwords-list';

export const validateProfanity = (val) => {
    if (val !== undefined && val !== '') {
        if (blacklist.regex.test(val)) {
            return 'Profanity is not allowed';
        }
    }

    return '';
};
