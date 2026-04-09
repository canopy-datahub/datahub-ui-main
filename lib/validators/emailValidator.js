const invalidChars = /[()<>,;:\\[\]\s`~!#$%^&*={}|/?"]/;

/**
 * Validates a given email address
 * @param {String} val
 * @returns {undefined | String} The first found error, if any; `undefined`, otherwise.
 */
function validateEmail(val) {
    if (!val || val.trim() === '') {
        return `Email is missing.`;
    }
    const atIndex = val.indexOf('@');
    val = val.trim();
    if (atIndex === -1) {
        return `Email is missing the @ sign.`;
    }
    if (atIndex === 0) {
        return `Email is missing username.`;
    }
    if (atIndex >= 0 && val.indexOf('.', atIndex) === -1) {
        return `Email is missing a period in the domain name.`;
    }
    if (
        atIndex >= 0 &&
        (val.indexOf('.', atIndex) === atIndex + 1 || val.lastIndexOf('.') > val.length - 3 || val.lastIndexOf('.') < val.length - 7)
    ) {
        return `Email has an invalid domain name.`;
    }
    if (val.indexOf('@', atIndex + 1) !== -1) {
        return `Email contains too many @ characters.`;
    }
    if (val.indexOf('..') !== -1) {
        return `Email has consecutive periods.`;
    }
    if (invalidChars.test(val)) {
        return `Email has invalid characters.`;
    }

    return true;
}

/**
 * Validates comma-or-semicolon separated string of emails
 * @param {String} val
 * @returns {undefined | String} The first found error, if any; `undefined`, otherwise.
 */
function validateEmailList(val) {
    let errorMessage;
    val = val.split(/[;,]+/);
    for (const email of val) {
        errorMessage = validateEmail(email);
    }
    return errorMessage;
}

export { validateEmail, validateEmailList };
