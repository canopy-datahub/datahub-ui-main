/* eslint-disable max-len */
import React from 'react';

/**
 * Calendar Icon
 * @property {String} width - Determines width of icon for sizing purposes
 * @property {String} height - Determines height of icon for sizing purposes
 * @property {String} fill - Color of the icon
 * @returns {JSX} Calendar Icon
 */

const CalendarIcon = ({ width, height, fill }) => {
    width = width || '26';
    height = height || '27';
    fill = fill || 'white';
    return (
        <svg width={width} height={height} viewBox="0 0 26 27" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M5.6875 0.875C5.90299 0.875 6.10965 0.960602 6.26202 1.11298C6.4144 1.26535 6.5 1.47201 6.5 1.6875V2.5H19.5V1.6875C19.5 1.47201 19.5856 1.26535 19.738 1.11298C19.8903 0.960602 20.097 0.875 20.3125 0.875C20.528 0.875 20.7347 0.960602 20.887 1.11298C21.0394 1.26535 21.125 1.47201 21.125 1.6875V2.5H22.75C23.612 2.5 24.4386 2.84241 25.0481 3.4519C25.6576 4.0614 26 4.88805 26 5.75V23.625C26 24.487 25.6576 25.3136 25.0481 25.9231C24.4386 26.5326 23.612 26.875 22.75 26.875H3.25C2.38805 26.875 1.5614 26.5326 0.951903 25.9231C0.34241 25.3136 0 24.487 0 23.625V5.75C0 4.88805 0.34241 4.0614 0.951903 3.4519C1.5614 2.84241 2.38805 2.5 3.25 2.5H4.875V1.6875C4.875 1.47201 4.9606 1.26535 5.11298 1.11298C5.26535 0.960602 5.47201 0.875 5.6875 0.875ZM1.625 7.375V23.625C1.625 24.056 1.7962 24.4693 2.10095 24.774C2.4057 25.0788 2.81902 25.25 3.25 25.25H22.75C23.181 25.25 23.5943 25.0788 23.899 24.774C24.2038 24.4693 24.375 24.056 24.375 23.625V7.375H1.625Z"
                fill={fill}
            />
        </svg>
    );
};

export default CalendarIcon;
