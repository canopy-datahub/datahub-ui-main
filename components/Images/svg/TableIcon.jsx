/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
/**
 * Table Icon
 * * @property {String} checked - for the view toggle button in SearchResultViewToggle.jsx, if we are passing in "table", change the colors
 * @returns {JSX} Table Icon
 */

const TableIcon = (props) => {
    const { checked } = props;

    let stroke, fill;
    if (checked === 'table') {
        fill = '#00889D';
        stroke = '#00889D';
    } else {
        fill = '#FFFFFF';
        stroke = '#000000';
    }
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="22" viewBox="0 0 21 22" fill="none">
            <g id="Group 180">
                <rect id="Rectangle 147" x="0.5" y="0.5" width="8.60819" height="8.60819" fill={fill} stroke={stroke} />
                <rect id="Rectangle 149" x="0.5" y="12.7026" width="8.60819" height="8.60819" fill={fill} stroke={stroke} />
                <rect id="Rectangle 148" x="11.8891" y="0.5" width="8.60819" height="8.60819" fill={fill} stroke={stroke} />
                <rect id="Rectangle 150" x="11.8891" y="12.7026" width="8.60819" height="8.60819" fill={fill} stroke={stroke} />
            </g>
        </svg>
    );
};

TableIcon.propTypes = {
    checked: PropTypes.string.isRequired,
};

export default TableIcon;
