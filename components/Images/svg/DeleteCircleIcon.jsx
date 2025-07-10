/* eslint-disable max-len */
import React from 'react';

/**
 * Delete Circle Icon
 * @returns {JSX} Delete Circle Icon
 */

const DeleteCircleIcon = (props) => {
    const { circleBorder, circleFill, xColor, dimensions } = props;
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={dimensions.x} height={dimensions.y} viewBox="0 0 18 18" fill="none">
            <circle cx="8.57143" cy="8.57143" r="8.07143" fill={circleFill} stroke={circleBorder} />
            <path d="M12.5703 12.5723L4.57031 4.57227" stroke={xColor} strokeWidth="2" strokeMiterlimit="10" />
            <path d="M4.57031 12.5723L12.5703 4.57227" stroke={xColor} strokeWidth="2" strokeMiterlimit="10" />
        </svg>
    );
};

export default DeleteCircleIcon;
