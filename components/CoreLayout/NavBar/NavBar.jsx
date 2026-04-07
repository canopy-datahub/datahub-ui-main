import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Dropdown, Nav, Navbar, NavItem, NavLink } from 'react-bootstrap';
import classes from './NavBar.module.scss';
import ChevronDownIcon from '../../Images/svg/ChevronDownIcon';
import HomeIcon from '../../Images/svg/HomeIcon';
import Button from '../../Button/Button';
import Link from 'next/link';
import LogoutModal from '../Header/Components/LogoutModal';
import UserProfileModal from '../../../views/UserProfile/UserProfileModal';
import useKeycloak from '../../../lib/hooks/useKeycloak';

/**
 * @param {Object} props - Object with all of the properties used within the react component, listed below.
 * @property {Array} tabList - list of all of tabs and their respective links or dropdowns with links
 * @property {String} path - current url path
 * @property {Object} userProfile - user profile object
 * @returns Nav bar node element that sits in the header
 */
const NavigationBar = (props) => {
    const { tabList, path, userProfile } = props;
    const [size, setSize] = useState(0);
    const [collapsed, setCollapsed] = useState(false);
    const [logoutVisible, setLogoutVisible] = useState(false);
    const [userProfileVisible, setUserProfileVisible] = useState(false);
    const [mounted, setMounted] = useState(false);
    const { login: keycloakLogin } = useKeycloak();

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        const updateSize = () => {
            setSize(window.innerWidth);
        };
        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, []);

    // Function using both window size and number of nav items to determine when to collapse nav and show hamburger menu
    // The breakpoints are determined manually by the length of the nav items.
    // After the public-facing 5 nav items, the length of the largest -> smallest nav items (with opened dropdowns) are accounted for
    // If the name of a nav item changes or more nav items are added, the breakpoints will need to change
    const showCollapsedNav = () => {
        if (size < 905) {
            return true;
        } else if (size < 1075) {
            if (tabList.length > 4) {
                return true;
            } else {
                return false;
            }
        } else if (size < 1335) {
            if (tabList.length > 5) {
                return true;
            } else {
                return false;
            }
        } else if (size < 1525) {
            if (tabList.length > 6) {
                return true;
            } else {
                return false;
            }
        } else if (size < 1715) {
            if (tabList.length > 7) {
                return true;
            } else {
                return false;
            }
        } else if (size < 1860) {
            if (tabList.length > 8) {
                return true;
            } else {
                return false;
            }
        } else if (size < 1990) {
            if (tabList.length > 9) {
                return true;
            } else {
                return false;
            }
        } else if (size < 2120) {
            if (tabList.length > 10) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    };

    useEffect(() => {
        setCollapsed(showCollapsedNav());
    }, [size, tabList]);

    const closeLogoutModal = () => setLogoutVisible(false);
    const closeUserProfileModal = () => setUserProfileVisible(false);

    // Cleaned path with removed search parameters
    const cleanedPath = path.split('?')[0];
    // Path root used to compare with allowedRoots for odd child pages
    const pathRoot = cleanedPath.split('/')[1];

    // Determine if the nav item and/or its child item is the active page
    // Checks allowedRoot in case page has an odd path (ex: Metrics Dashboard has specific pathing for api queries)
    const isActive = (item) => {
        // Checks if a dropdown's child item is active
        if (Array.isArray(item)) {
            const active = item.find((x) => x.link.split('?')[0] === cleanedPath);
            if (!active) {
                const activeRoot = item.find((x) => x.allowedRoot === pathRoot);
                return activeRoot;
            }
            return active;
        } else {
            // Checks if nav item is active
            const active = item.link.split('?')[0] === cleanedPath;
            if (!active) {
                const activeRoot = item.allowedRoot === pathRoot;
                return activeRoot;
            }
            return active;
        }
    };

    const navClasses = collapsed ? `${classes.NavigationBar} ${classes.collapsedNav}` : `${classes.NavigationBar}`;

    const items = [];
    const populateDropdownItems = (dropdownArray) => {
        const dropdownItems = [];
        for (const item of dropdownArray) {
            dropdownItems.push(
                <Dropdown.Item
                    key={item.name}
                    className={isActive(item) ? `${classes.selected} ${classes.dropdownItem}` : `${classes.dropdownItem}`}
                    eventkey={item.name}
                >
                    <Link
                        className={
                            isActive(item) ? `${classes.selected} ${classes.dropdownItemContainer}` : `${classes.dropdownItemContainer}`
                        }
                        href={item.link}
                    >
                        {item.name}
                    </Link>
                </Dropdown.Item>
            );
        }
        return dropdownItems;
    };

    tabList.forEach((tab, index) => {
        if ('dropdown' in tab) {
            items.push(
                <Dropdown key={tab.name} className={classes.navItem} as={NavItem}>
                    <Dropdown.Toggle
                        className={isActive(tab.dropdown) ? `${classes.selected} ${classes.dropdownToggle}` : `${classes.dropdownToggle}`}
                        as={NavLink}
                    >
                        {tab.name}
                        <ChevronDownIcon />
                    </Dropdown.Toggle>
                    <Dropdown.Menu className={classes.dropdown}>{populateDropdownItems(tab.dropdown)}</Dropdown.Menu>
                </Dropdown>
            );
        } else {
            const isHomepage = tab.link === '/' || tab.name === 'Homepage';
            items.push(
                <Nav.Item
                    key={tab.name}
                    eventkey={index}
                    className={cleanedPath === tab.link.split('?')[0] ? `${classes.selected} ${classes.navItem}` : classes.navItem}
                >
                    <Nav.Link
                        className={cleanedPath === tab.link.split('?')[0] ? `${classes.selected} ${classes.item} ${isHomepage ? classes.homeLink : ''}` : `${classes.item} ${isHomepage ? classes.homeLink : ''}`}
                        href={tab.link}
                        as={Link}
                        aria-label={isHomepage ? 'Homepage' : tab.name}
                    >
                        {isHomepage ? <HomeIcon /> : tab.name}
                    </Nav.Link>
                </Nav.Item>
            );
        }
    });

    const userDropdownItems = [
        <Dropdown.Item
            key={'editProfile'}
            className={classes.dropdownItem}
            eventKey={'editProfile'}
            onClick={() => setUserProfileVisible(true)}
        >
            Edit Profile
        </Dropdown.Item>,
        <Dropdown.Item
            key={'logout'}
            className={classes.dropdownItem}
            eventKey={'logout'}
            onClick={() => setLogoutVisible(true)}
        >
            Logout
        </Dropdown.Item>,
    ];

    return (
        <>
            <Navbar className={navClasses} sticky="top" expand={!collapsed} collapseOnSelect>
                <Navbar.Toggle aria-controls="navbar-collapse" className={classes.toggle} />
                <Navbar.Collapse id="navbar-collapse" className={classes.collapse}>
                    {items}
                </Navbar.Collapse>
                {mounted && userProfile?.id ? (
                    <Dropdown className={classes.userDropdown} as={NavItem}>
                        <Dropdown.Toggle className={classes.userDropdownToggle} as={NavLink}>
                            {userProfile.firstName}
                        </Dropdown.Toggle>
                        <Dropdown.Menu className={classes.dropdown}>{userDropdownItems}</Dropdown.Menu>
                    </Dropdown>
                ) : (
                    <Button className={classes.loginButton} label="Login" variant="login" handleClick={() => keycloakLogin && keycloakLogin()} />
                )}
                <Link href="/support" className={collapsed ? classes.hide : ''}>
                    <Button className={classes.needSupport} variant="secondary" label="Need Support?" />
                </Link>
            </Navbar>
            {userProfile && userProfileVisible && (
                <UserProfileModal visible={userProfileVisible} closeModal={closeUserProfileModal} userId={userProfile?.id} />
            )}
            <LogoutModal visible={logoutVisible} closeModal={closeLogoutModal} />
        </>
    );
};

NavigationBar.propTypes = {
    path: PropTypes.string.isRequired,
    tabList: PropTypes.array.isRequired,
    userProfile: PropTypes.object,
};

export default NavigationBar;
