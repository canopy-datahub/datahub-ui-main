/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';

/**
 * Question Circle Filled Icon
 * @property {String} fontColor - Determines color of the "?"
 * @property {String} circleColor - Determines color of the background circle
 * @property {String} width - Determines width of icon for sizing purposes
 * @property {String} height - Determines height of icon for sizing purposes
 * @returns {JSX} Question Circle Filled Icon
 */

const QuestionCircleFilled = ({ fontColor, circleColor, width, height }) => {
    fontColor = fontColor || 'white';
    circleColor = circleColor || 'black';
    width = width || '22';
    height = height || '22';

    return (
        <svg width={width} height={height} viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_6506_177)">
                <rect x="5.78955" y="3.47363" width="10.4211" height="13.8947" fill={fontColor} />
                <path
                    d="M22 11C22 13.9174 20.8411 16.7153 18.7782 18.7782C16.7153 20.8411 13.9174 22 11 22C8.08262 22 5.28473 20.8411 3.22183 18.7782C1.15893 16.7153 0 13.9174 0 11C0 8.08262 1.15893 5.28473 3.22183 3.22183C5.28473 1.15893 8.08262 0 11 0C13.9174 0 16.7153 1.15893 18.7782 3.22183C20.8411 5.28473 22 8.08262 22 11ZM7.557 8.29537H8.69138C8.88113 8.29537 9.03237 8.14 9.05712 7.95162C9.18087 7.04962 9.79962 6.39238 10.9024 6.39238C11.8456 6.39238 12.7091 6.864 12.7091 7.99837C12.7091 8.8715 12.1949 9.273 11.3822 9.8835C10.4569 10.5559 9.724 11.341 9.77625 12.6156L9.78037 12.914C9.78182 13.0042 9.81867 13.0902 9.88298 13.1535C9.94729 13.2168 10.0339 13.2523 10.1241 13.2522H11.2392C11.3304 13.2522 11.4179 13.216 11.4823 13.1516C11.5468 13.0871 11.583 12.9997 11.583 12.9085V12.7641C11.583 11.7769 11.9584 11.4895 12.9718 10.7209C13.8091 10.0842 14.6823 9.3775 14.6823 7.89388C14.6823 5.81625 12.9278 4.8125 11.0069 4.8125C9.26475 4.8125 7.35625 5.62375 7.22563 7.95575C7.22374 8.00015 7.23096 8.04447 7.24684 8.08598C7.26272 8.1275 7.28693 8.16532 7.31796 8.19713C7.349 8.22894 7.38622 8.25407 7.42733 8.27096C7.46843 8.28786 7.51256 8.29616 7.557 8.29537ZM10.7539 17.1545C11.5926 17.1545 12.1688 16.6127 12.1688 15.8799C12.1688 15.1209 11.5913 14.5874 10.7539 14.5874C9.95088 14.5874 9.3665 15.1209 9.3665 15.8799C9.3665 16.6127 9.9495 17.1545 10.7539 17.1545Z"
                    fill={circleColor}
                />
            </g>
            <defs>
                <clipPath id="clip0_6506_177">
                    <rect width="22" height="22" fill={fontColor} />
                </clipPath>
            </defs>
        </svg>
    );
};

QuestionCircleFilled.propTypes = {
    circleColor: PropTypes.string,
    fontColor: PropTypes.string,
    height: PropTypes.string,
    width: PropTypes.string,
};

export default QuestionCircleFilled;
