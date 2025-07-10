/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';

/**
 * External Icon
 * @property {String} width - Determines width of icon for sizing purposes
 * @property {String} height - Determines height of icon for sizing purposes
 * @returns {JSX} External Icon
 */

const ExternalIcon = ({ width, height }) => {
    width = width || '10';
    height = height || '10';

    return (
        <svg
            aria-label="This link is external"
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            fill="currentColor"
            className="bi bi-box-arrow-up-right"
            viewBox="0 0 16 16"
        >
            <path
                fillRule="evenodd"
                d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"
            />
            <path
                fillRule="evenodd"
                d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"
            />
        </svg>
    );
};

ExternalIcon.propTypes = {
    height: PropTypes.string,
    width: PropTypes.string,
};

export default ExternalIcon;
