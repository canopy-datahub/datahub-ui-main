/* eslint-disable max-len */

import PropTypes from 'prop-types';
import React from 'react';

/**
 * List Icon
 * * @property {String} checked - for the view toggle button in SearchResultViewToggle.jsx, if we are passing in "list", change the colors
 * @returns {JSX} List Icon
 */

const ListIcon = (props) => {
    const { checked } = props;
    let stroke, fill, outsideStroke;
    if (checked === 'list') {
        fill = '#00889D';
        outsideStroke = '#00889D';
        stroke = '#FFFFFF';
    } else {
        fill = '#FFFFFF';
        outsideStroke = '#000000';
        stroke = '#000000';
    }

    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="23" viewBox="0 0 24 23" fill="none">
            <g id="Group 181">
                <rect id="Rectangle 151" x="0.5" y="0.5" width="23" height="22" fill={fill} stroke={outsideStroke} />
                <path id="Vector 41" d="M4 7H20M4 11.5H20M4 16H20" stroke={stroke} strokeWidth="1.5" />
            </g>
        </svg>
    );
};

ListIcon.propTypes = {
    checked: PropTypes.string.isRequired,
};

export default ListIcon;
