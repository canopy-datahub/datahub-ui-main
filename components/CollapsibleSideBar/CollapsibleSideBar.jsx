import React from 'react';
import PropTypes from 'prop-types';
import classes from './CollapsibleSideBar.module.scss';
import { Col } from 'react-bootstrap';
import { ChevronDoubleRight, ChevronDoubleLeft } from 'react-bootstrap-icons';

/**
 * Collapsible Side Bar
 * For responsiveness, parent component needs dynamic width styling for the actual page content when sidebar is open or closed, and the state controls for open or closed (See example styling below)
 * Currently used on some dashboard pages and Study Explorer
 *
 * @param {Object} props - Object with all of the properties used within the react component, listed below.
 * @property {Node} children - Contents of the sidebar
 * @property {String} title - Name of sidebar that'll appear at the top and when sidebar is collapsed
 * @property {Boolean} isOpen - Flag to determine if sidebar is open or closed
 * @property {Function} toggleSidebar - Toggle function to open or close sidebar
 * @property {String} className - Additional styling on the sidebar container
 * @property {String} titleClassName - Additional styling for the title when side bar is collapsed
 *
 * @returns {JSX} Collapsible Side Bar Component
 */

// Example code and css needed for parent class (additional styling may be needed):
//
// const [sidebarOpen, setSideBarOpen] = useState(true);
// const handleViewSidebar = () => {
//     setSideBarOpen(!sidebarOpen);
// };
// const mainContentClass = sidebarOpen ? classes.mainContent : `${classes.mainContent} ${classes.sidebarClosed}`;
//
// .mainContent.sidebarClosed {
//    width: 95%;
// }
// @media (max-width: 991px) {
//    .mainContent.sidebarClosed {
//       width: 100%;
//    }
// }

const CollapsibleSideBar = (props) => {
    const { children, title, isOpen, toggleSidebar, className, titleClassName } = props;

    const sidebarClass = isOpen ? ` ${classes.sidebar}` : `${classes.sidebar} ${classes.closed}`;
    const containerClass = isOpen ? ` ${classes.container}` : `${classes.container} ${classes.closed}`;
    return (
        <Col lg="2" className={`${className} ${containerClass}`}>
            <div className={classes.toggleContainer}>
                <div className={`${classes.title} ${isOpen ? '' : titleClassName}`}>{title}</div>
                <button onClick={toggleSidebar} className={classes.toggleButton} aria-label={isOpen ? `Hide ${title}` : `Show ${title}`}>
                    {isOpen && <ChevronDoubleLeft />}
                    {!isOpen && <ChevronDoubleRight />}
                </button>
            </div>
            <div className={`${sidebarClass}`}>{children}</div>
        </Col>
    );
};

CollapsibleSideBar.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    isOpen: PropTypes.bool,
    title: PropTypes.string,
    titleClassName: PropTypes.string,
    toggleSidebar: PropTypes.func,
};

export default CollapsibleSideBar;
