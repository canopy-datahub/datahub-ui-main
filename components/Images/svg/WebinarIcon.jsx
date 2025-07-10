/* eslint-disable max-len */
import React from 'react';

/**
 * Webinar Icon
 * @property {String} width - Determines width of icon for sizing purposes
 * @property {String} height - Determines height of icon for sizing purposes
 * @property {String} fill - Color of the icon
 * @returns {JSX} Webinar Icon
 */

const WebinarIcon = ({ width, height, fill }) => {
    width = width || '26';
    height = height || '24';
    fill = fill || 'white';
    return (
        <svg width={width} height={height} viewBox="0 0 26 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_5679_39289)">
                <path
                    d="M22.75 14.25C22.75 15.0456 22.4076 15.8087 21.7981 16.3713C21.1886 16.9339 20.362 17.25 19.5 17.25C18.638 17.25 17.8114 16.9339 17.2019 16.3713C16.5924 15.8087 16.25 15.0456 16.25 14.25C16.25 13.4544 16.5924 12.6913 17.2019 12.1287C17.8114 11.5661 18.638 11.25 19.5 11.25C20.362 11.25 21.1886 11.5661 21.7981 12.1287C22.4076 12.6913 22.75 13.4544 22.75 14.25ZM13 22.8C13 24 14.3 24 14.3 24H24.7C24.7 24 26 24 26 22.8C26 21.6 24.7 18 19.5 18C14.3 18 13 21.6 13 22.8Z"
                    fill={fill}
                />
                <path
                    d="M3.25 3C2.38805 3 1.5614 3.31607 0.951903 3.87868C0.34241 4.44129 0 5.20435 0 6L0 18C0 18.7956 0.34241 19.5587 0.951903 20.1213C1.5614 20.6839 2.38805 21 3.25 21H11.7699C11.9681 20.511 12.2493 19.998 12.6246 19.5H3.25C2.81902 19.5 2.4057 19.342 2.10095 19.0607C1.7962 18.7794 1.625 18.3978 1.625 18V6C1.625 5.60218 1.7962 5.22064 2.10095 4.93934C2.4057 4.65804 2.81902 4.5 3.25 4.5H22.75C23.181 4.5 23.5943 4.65804 23.899 4.93934C24.2038 5.22064 24.375 5.60218 24.375 6V17.715C24.9486 18.06 25.441 18.459 25.8538 18.8895C25.9513 18.6085 26 18.312 26 18V6C26 5.20435 25.6576 4.44129 25.0481 3.87868C24.4386 3.31607 23.612 3 22.75 3H3.25Z"
                    fill={fill}
                />
            </g>
            <defs>
                <clipPath id="clip0_5679_39289">
                    <rect width="26" height="24" fill={fill} />
                </clipPath>
            </defs>
        </svg>
    );
};

export default WebinarIcon;
