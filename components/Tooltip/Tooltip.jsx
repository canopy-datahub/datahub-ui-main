import React from 'react';
import PropTypes from 'prop-types';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import { Tooltip as BSTooltip } from 'react-bootstrap';

/**
 * https://react-bootstrap.netlify.app/docs/components/overlays/#tooltips
 * Styling found in global.scss
 *
 * @property {Element} children - Element that when hovered, will trigger tooltip popup
 * @property {String} id - ID of tooltip, used to target popup and styling
 * @property {String} title - Text of popup
 * @returns {JSX} Tooltip
 */

const Tooltip = ({ children, id, title, placement }) => {
    const Link = ({ id, children, title }) => (
        <OverlayTrigger placement={placement} overlay={<BSTooltip id={id}>{title}</BSTooltip>}>
            {children}
        </OverlayTrigger>
    );

    return (
        <Link title={title} id={id}>
            {children}
        </Link>
    );
};

Tooltip.propTypes = {
    children: PropTypes.element,
    id: PropTypes.string,
    title: PropTypes.string,
};

export default Tooltip;
