/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';

/**
 * Info Icon
 * @property {String} fontColor - Determines color of the "i"
 * @property {String} circleColor - Determines color of the background circle
 * @property {String} width - Determines width of icon for sizing purposes
 * @property {String} height - Determines height of icon for sizing purposes
 * @returns {JSX} Info Icon
 */

const InfoIcon = ({ fontColor, circleColor, width, height }) => {
    fontColor = fontColor || 'black';
    circleColor = circleColor || 'white';
    width = width || '22';
    height = height || '22';

    return (
        <svg width={width} height={height} viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="11" cy="11" r="11" fill={circleColor} />
            <path
                d="M12.9355 16.3594C12.9355 16.6979 13.0918 16.929 13.4043 17.0527C13.5345 17.1048 13.6745 17.1504 13.8242 17.1895C13.974 17.2285 14.1139 17.2904 14.2441 17.375V18H8.74609V17.375C8.86979 17.2904 9.00651 17.2285 9.15625 17.1895C9.30599 17.1504 9.44596 17.1048 9.57617 17.0527C9.88216 16.929 10.0352 16.6979 10.0352 16.3594V9.88477C10.0352 9.5332 9.88216 9.30208 9.57617 9.19141C9.44596 9.13932 9.30599 9.09701 9.15625 9.06445C9.00651 9.02539 8.86979 8.96029 8.74609 8.86914V8.18555H12.9355V16.3594ZM11.3145 7.02344C11.0671 7.02344 10.8424 6.97786 10.6406 6.88672C10.4388 6.79557 10.2663 6.67188 10.123 6.51562C9.82357 6.1901 9.67383 5.79297 9.67383 5.32422C9.67383 4.86849 9.82357 4.47135 10.123 4.13281C10.4355 3.78776 10.8327 3.61523 11.3145 3.61523C11.8027 3.61523 12.2031 3.78776 12.5156 4.13281C12.8151 4.47135 12.9648 4.86849 12.9648 5.32422C12.9648 5.79297 12.8151 6.1901 12.5156 6.51562C12.2031 6.85417 11.8027 7.02344 11.3145 7.02344Z"
                fill={fontColor}
            />
        </svg>
    );
};

InfoIcon.propTypes = {
    circleColor: PropTypes.string,
    fontColor: PropTypes.string,
    height: PropTypes.string,
    width: PropTypes.string,
};

export default InfoIcon;
