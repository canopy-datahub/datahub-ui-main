/* eslint-disable multiline-ternary */
import React, { useState } from 'react';
import classes from './PageHeader.module.scss';
import { Col, Row, Dropdown, Nav, Navbar, NavItem, NavLink } from 'react-bootstrap';
import NIHLogo from '../../Images/svg/NIHLogo';
import Button from '../../Button/Button';
import LoginIcon from '../../Images/svg/LoginIcon';
import InfoIcon from '../../Images/svg/InfoIcon';
import Link from 'next/link';
import LoginModal from './Components/LoginModal';
import LogoutModal from './Components/LogoutModal';
import UserProfileModal from '../../../views/UserProfile/UserProfileModal';
import { useRouter } from 'next/router';
import useKeycloak from '../../../lib/hooks/useKeycloak';

/**

 * Page header
 * @property {Object} userProfile - Takes in the user profile from redux, managed by the core layout of the site
 * @returns {JSX} Page Header Component
 */

const PageHeader = (props) => {
    const { userProfile } = props;
    const router = useRouter();
    const { authenticated, login: keycloakLogin, logout: keycloakLogout } = useKeycloak();
    const [loginVisible, setLoginVisible] = useState(false);
    const [logoutVisible, setLogoutVisible] = useState(false);
    const [userProfileVisible, setUserProfileVisible] = useState(false);

    const closeLoginModal = () => {
        setLoginVisible(false);
    };
    const closeLogoutModal = () => {
        setLogoutVisible(false);
    };
    const closeUserProfileModal = () => {
        setUserProfileVisible(false);
    };

    const handleLogin = () => {
        if (keycloakLogin) {
            keycloakLogin(); // Redirect directly to Keycloak
        }
    };

    const handleLogout = () => {
        if (keycloakLogout) {
            keycloakLogout(); // Keycloak logout
            // Keycloak will handle the redirect, but we can also reload
            setTimeout(() => {
                router.reload();
            }, 100);
        }
    };

    const LoginParams = [
        {
            name: userProfile?.firstName,
            dropdown: [
                { name: 'Edit Profile', link: '' },
                { name: 'Logout', link: '' },
            ],
        },
    ];

    const dropDownList = [
        <Dropdown.Item
            key={'editProfile'}
            className={classes.dropdownItem}
            eventKey={'editProfile'}
            onClick={() => setUserProfileVisible(true)}
        >
            Edit Profile
        </Dropdown.Item>,
        <Dropdown.Item key={'logout'} className={classes.dropdownItem} eventKey={'logout'} onClick={handleLogout}>
            Logout
        </Dropdown.Item>,
    ];

    return (
        <>
            <Row className={classes.headerContainer}>
                <Col className={classes.content}>
                    <Link href="/">
                        <div className={classes.headerText}>
                            RADx<span className={classes.registered}>®</span> Data Hub
                        </div>
                    </Link>
                </Col>
                <Col className={classes.content}>
                    {authenticated ? (
                        LoginParams.map((tab) => (
                            <Dropdown key={tab.name} className={classes.navItem} as={NavItem}>
                                <Dropdown.Toggle className={classes.dropdownToggle} as={NavLink}>
                                    <LoginIcon /> {tab.name}
                                </Dropdown.Toggle>
                                <Dropdown.Menu className={classes.dropdown}>{dropDownList}</Dropdown.Menu>
                            </Dropdown>
                        ))
                    ) : (
                        <Button label="Login" iconRight={<LoginIcon />} variant="login" handleClick={handleLogin} />
                    )}
                </Col>
                <LoginModal visible={loginVisible} closeModal={closeLoginModal} />
                <UserProfileModal
                visible={userProfileVisible}
                closeModal={closeUserProfileModal}
                userId={userProfile?.id}
                />
                <LogoutModal visible={logoutVisible} closeModal={closeLogoutModal} />
            </Row>
        </>
    );
};

export default PageHeader;
