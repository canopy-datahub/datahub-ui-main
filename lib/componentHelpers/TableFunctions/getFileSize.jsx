import PropTypes from 'prop-types';

/**
 * Recursive function to format size of files from bytes to a more readable format i.e. KB, MB, or GB
 * @param {Number} fileSize - size of files in bytes
 * @param {Number} recursed - track the number of times the function has recursed to determine correct unit. ALWAYS start call with recursed being 0.
 * @returns {String} formatted file size
 */

export const getFileSize = (fileSize, recursed) => {
    const size = Number(fileSize) / 1024;

    if (size < 1024) {
        const formattedSize = (Math.round(size * 100) / 100).toFixed(2);
        switch (recursed) {
            case 0:
                return formattedSize + ' KB';
            case 1:
                return formattedSize + ' MB';
            case 2:
                return formattedSize + ' GB';
            default:
                return;
        }
    }
    recursed++;
    return getFileSize(size, recursed);
};

getFileSize.propTypes = {
    fileSize: PropTypes.Number,
    recursed: PropTypes.Number,
};
