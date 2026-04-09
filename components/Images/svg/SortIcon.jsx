/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';

/**
 * Sort Icon
 * @property {String} width - Determines width of icon for sizing purposes
 * @property {String} height - Determines height of icon for sizing purposes
 * @property {Boolean} asc - Flag from parent component. Define as true to show only the up arrow (asc). Define as false to show only the down arrow (desc)
 * @property {Boolean} unSorted - Flag from parent component to denote an unsorted column and show both arrows
 * @returns {JSX} Sort Icon
 */

const SortIcon = ({ width, height, asc, unSorted }) => {
    width = width || '17';
    height = height || '14';
    return (
        <svg width={width} height={height} viewBox="0 0 17 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_2495_34255)">
                {unSorted && (
                    <>
                        <path d="M8.78516 4.46988L12.2503 1.46875L15.7419 4.46988" stroke="white" strokeWidth="1.8" strokeMiterlimit="10" />
                        <path d="M12.25 12.3402V2.34961" stroke="white" strokeWidth="1.8" strokeMiterlimit="10" />

                        <path d="M8.3111 9.31445L4.84596 12.3419L1.35437 9.31445" stroke="white" strokeWidth="1.8" strokeMiterlimit="10" />
                        <path d="M4.84302 1.46875V11.4594" stroke="white" strokeWidth="1.8" strokeMiterlimit="10" />
                    </>
                )}
                {!unSorted && (
                    <>
                        <path
                            d="M8.78516 4.46988L12.2503 1.46875L15.7419 4.46988"
                            stroke={asc ? 'white' : 'transparent'}
                            strokeWidth="1.8"
                            strokeMiterlimit="10"
                        />
                        <path d="M12.25 12.3402V2.34961" stroke={asc ? 'white' : 'transparent'} strokeWidth="1.8" strokeMiterlimit="10" />

                        <path
                            d="M8.3111 9.31445L4.84596 12.3419L1.35437 9.31445"
                            stroke={!asc ? 'white' : 'transparent'}
                            strokeWidth="1.8"
                            strokeMiterlimit="10"
                        />
                        <path
                            d="M4.84302 1.46875V11.4594"
                            stroke={!asc ? 'white' : 'transparent'}
                            strokeWidth="1.8"
                            strokeMiterlimit="10"
                        />
                    </>
                )}
            </g>
            <defs>
                <clipPath id="clip0_2495_34255">
                    <rect width="15.7651" height="13.663" fill="white" transform="translate(0.664429 0.0722656)" />
                </clipPath>
            </defs>
        </svg>
    );
};

SortIcon.propTypes = {
    asc: PropTypes.bool,
    height: PropTypes.string,
    unSorted: PropTypes.bool,
    width: PropTypes.string,
};

export default SortIcon;
