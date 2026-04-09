import React from 'react';

/**
 * Home (house) icon for navigation
 * @returns {JSX} Home Icon
 */
const HomeIcon = () => {
    return (
        <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            role="graphics-symbol"
            aria-hidden="true"
        >
            <path
                d="M3 9.5L12 4L21 9.5V20H14V14H10V20H3V9.5Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

export default HomeIcon;
