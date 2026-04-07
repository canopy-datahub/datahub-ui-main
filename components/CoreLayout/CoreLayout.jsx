import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';
import classes from './CoreLayout.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { removeNotification } from '../../store/notifications/notificationsSlice';
import { NotificationType } from '../../store/notifications/notificationConstants';
import { Toast, ToastContainer } from 'react-bootstrap';
import { useRouter } from 'next/router';
import Head from 'next/head';
import PageHeader from './Header/PageHeader';
import NavBar from './NavBar/NavBar';
import Footer from './Footer/Footer';
import Loading from '../Loading/Loading';
import { fetchUserProfile } from '../../lib/utils/getUserProfile';
import { GetNavBar } from '../../lib/hooks/getNavBar';
import CloseIcon from '../Images/svg/CloseIcon';
import SessionModal from './Components/SessionModal';
import { useIdleTimer } from 'react-idle-timer';
import useRest from '../../lib/hooks/useRest';
import { setUser } from '../../store/user/userSlice';
import UserProfileModal from '../../views/UserProfile/UserProfileModal';
import Link from 'next/link';
import useKeycloak from '../../lib/hooks/useKeycloak';

/**
 * The base component for every page. The page's actual content is a child of this.
 * This layout adds a notification(s) area, a header containing user login info, the consent modal, and the loading blurout modal.
 * @param {{children: React.ReactNode}} props
 * @returns {JSX.Element}
 */
const CoreLayout = (props) => {
    const router = useRouter();
    const { restGet } = useRest();
    const dispatch = useDispatch();
    const handleRemoveNotification = (notification) => dispatch(removeNotification(notification));
    const { notifications } = useSelector((state) => state.notifications);
    const { token, authenticated } = useKeycloak();

    // grab "latest" user if it exists from the page already
    const { user } = useSelector((state) => state.userProfile);

    // Fetch user profile with Keycloak token
    useEffect(() => {
        fetchUserProfile(props.userProfile, user, authenticated, token, restGet, dispatch, setUser);
    }, [authenticated, token, props.userProfile]);

    // Edit User Profile modal will open if a returning 1.0 user returns and does not have the required fields
    const [userProfileVisible, setUserProfileVisible] = useState(false);

    useEffect(() => {
        if (!user) {
            setUserProfileVisible(false);
            return;
        }
        if (authenticated && !router.pathname.startsWith('/postAuth')) {
            if (!user.researcherLevel || !user.jobTitle || !user.institution) {
                setUserProfileVisible(true);
            }
        }
    }, [user, authenticated]);

    const closeUserProfileModal = () => {
        setUserProfileVisible(false);
    };

    /**
     * Idle Timer
     * Documentation: https://idletimer.dev/
     * Confirm Prompt: https://idletimer.dev/docs/features/confirm-prompt
     * Cross Tab Functionality: https://idletimer.dev/docs/features/cross-tab
     */
    const TIMEOUTMINUTES = 29;
    const FIVEMINUTES = 5;
    const timeout = 1_000 * 60 * TIMEOUTMINUTES; // total timeout in ms
    const promptBeforeIdle = 1_000 * 60 * FIVEMINUTES; // time allotted inside modal in ms
    const [remaining, setRemaining] = useState(timeout);
    const [sessionModalVisible, setSessionModalVisible] = useState(false);
    const closeModal = () => {
        setSessionModalVisible(false);
    };

    const refreshToken = () => {
        // Ask Keycloak to refresh the token if it expires within the next 30 seconds.
        // updateToken resolves true if refreshed, false if still valid.
        if (window.keycloak) {
            window.keycloak.updateToken(30).catch(() => {
                // Refresh failed (e.g. session expired on Keycloak side) — log out.
                handleLogout();
            });
        }
        closeModal();
    };

    const handleLogout = () => {
        dispatch(setUser(null));
        closeModal();
        if (window.keycloak?.idToken) {
            window.keycloak.logout({
                redirectUri: window.location.origin,
                id_token_hint: window.keycloak.idToken,
            });
        } else {
            router.push('/');
        }
    };

    const onIdle = () => {
        setSessionModalVisible(false);
        handleLogout();
    };

    const onActive = () => {
        setSessionModalVisible(false);
    };

    const onPrompt = () => {
        setSessionModalVisible(true);
    };

    const handleStillHere = () => {
        activate();
        refreshToken();
    };

    const { getRemainingTime, activate } = useIdleTimer({
        onIdle,
        onActive,
        onPrompt,
        timeout,
        promptBeforeIdle,
        throttle: 500,
        events: [
            'mousemove',
            'keydown',
            'wheel',
            'DOMMouseScroll',
            'mousewheel',
            'mousedown',
            'touchstart',
            'touchmove',
            'MSPointerDown',
            'MSPointerMove',
        ], // took out 'visibilitychange' event that restarted timer when tab became active, even without mouse moving
        crossTab: true,
        leaderElection: true,
        syncTimers: 200,
        disabled: !user || Object.keys(user).length === 0, // prevent idleTimer from starting if user not logged in
    });

    useEffect(() => {
        const interval = setInterval(() => {
            setRemaining(Math.ceil(getRemainingTime() / 1000));
        }, 500);

        return () => {
            clearInterval(interval);
        };
    });

    // Page specific styling for footer and hex background
    const PATHS_USING_COLORFUL_FOOTER = ['/'];
    const useColorfulFooter = PATHS_USING_COLORFUL_FOOTER.includes(router.pathname);
    const PATHS_NOT_USING_HEX_BKGD = ['/faq', '/tutorial', '/glossary'];
    const noHexBkgd = PATHS_NOT_USING_HEX_BKGD.includes(router.pathname);

    // Nav Bar
    const NavParams = [
        { name: 'Homepage', link: '/' },
        { name: 'Study Explorer', link: '/studyExplorer/studies?&sort=asc&prop=title&page=1&size=50' },
        {
            name: 'Helpful Information',
            dropdown: [
                { name: 'Getting Started', link: '/gettingStarted' },
                { name: 'Resource Center', link: '/resourceCenter' },
                { name: 'FAQs', link: '/faq' },
                { name: 'User Tutorial', link: '/tutorial' },
                { name: 'Events', link: '/events' },
                { name: 'Funding Opportunities', link: '/fundingOpportunities' },
            ],
        },
        {
            name: 'About',
            dropdown: [
                { name: 'Overview', link: '/about' },
                { name: 'Latest News & Updates', link: '/news' },
                { name: 'Newsletters', link: '/newsletters' },
                { name: 'Contact Us', link: '/contactUs' },
            ],
        },
    ];
    GetNavBar(user, NavParams);

    const switchNotification = (type) => {
        switch (type) {
            case NotificationType.ERROR:
                return classes.toastErrorHeader;
            case NotificationType.WARNING:
                return classes.toastWarningHeader;
            case NotificationType.SUCCESS:
                return classes.toastSuccessHeader;
            default:
                return classes.toastNormalHeader;
        }
    };

    const switchNotificationHeader = (type) => {
        switch (type) {
            case NotificationType.ERROR:
                return 'System Error';
            case NotificationType.SUCCESS:
                return 'Notification';
            default:
                return 'Notification';
        }
    };

    // prettier-ignore
    return (
        <div className={`${classes.coreLayout} ${noHexBkgd ? `${classes.noHexBkgd}` : ''}`}>
            <Head>
                <title>{props.pageTitle ? `Site - ${props.pageTitle}` : `Site`}</title>
            </Head>
            <a href="#main" className="skipLink" >Skip to main content</a>
            <div className={classes.container}>
                {notifications &&
                notifications.map((notification) => {
                    const messageToastClass = classes.messageToast;
                    const toastClass = switchNotification(notification.type);

                    return (
                        <ToastContainer className="p-3" key={notification.id}>
                            <Toast
                                key={notification.id}
                                className={messageToastClass}
                                show={notifications}
                                onClose={() => handleRemoveNotification(notification)}
                                autohide={true}
                                delay={notification.delay}
                            >
                                <Toast.Header className={toastClass} closeButton={false}>
                                    <strong>{switchNotificationHeader(notification.type)}</strong>
                                    <button className={classes.popupClose} onClick={() => handleRemoveNotification(notification)}>
                                        <CloseIcon />
                                    </button>
                                </Toast.Header>
                                <Toast.Body className={classes.testing} >
                                    <div className={classes.body}>{notification.message || notification.message?.message}</div>
                                </Toast.Body>
                            </Toast>
                        </ToastContainer>
                    );
                })}
                <NavBar tabList={NavParams} path={router.asPath} userProfile={user} />
                <main id="main">
                    {props.children /* actual contents of page */}
                </main>
                <Loading />
                <Footer useColorfulVariant={useColorfulFooter} baseUrl={props.baseUrl}/>
                <SessionModal visible={sessionModalVisible} closeModal={closeModal} remainingTime={remaining} handleStillHere={handleStillHere} onIdle={onIdle}/>
                {userProfileVisible && (
                    <UserProfileModal
                        visible={userProfileVisible}
                        closeModal={closeUserProfileModal}
                        userId={user?.id}
                    />
                )}
            </div>
        </div>
    );
};

CoreLayout.propTypes = {
    children: PropTypes.node.isRequired,
    pageTitle: PropTypes.string,
};

export default CoreLayout;
