/* eslint-disable max-len */
import PropTypes from 'prop-types';

/**
 * Text and links are coming from RENCI who provided content with specific characters to delineate links and new lines. This function replaces the custom characters with the appropriate usage.
 * @param {String} description - description/content text
 * @param {Array} links - array of links to be used if identified in description
 * @returns {String} new description
 */

export const regexReplace = (description, links) => {
    description = description.replace(/\n/g, `<br />`);

    let count = 1;
    links.forEach((link) => {
        const regex = new RegExp('<<<' + count + '>>>', 'g');
        description = description.replace(regex, `<a href=${link.linkUrl} target="_blank" rel="noreferrer">${link.linkLabel}</a>`);
        count++;
    });

    return description;
};

regexReplace.propTypes = {
    description: PropTypes.string,
    links: PropTypes.array,
};
