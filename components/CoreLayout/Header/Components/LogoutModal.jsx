import React from 'react';
import classes from './LogoutModal.module.scss';
import Modal from '../../../GeneralModal/GeneralModal';
import Button from '../../../Button/Button';
import { useRouter } from 'next/router';
import { LOGOUT } from '../../../../constants/apiRoutes';
import { useDispatch, useSelector } from 'react-redux';
import useRest from '../../../../lib/hooks/useRest';
import Cookies from 'js-cookie';
import { setUser } from '../../../../store/user/userSlice';
import PropTypes from 'prop-types';

/**
 * Logout Modal
 * @returns {JSX} Logout Modal Component
 * @property {Boolean} visible - Boolean handling when the modal is visible
 * @property {Function} [closeModal=()=>{}] - function handling closing of the modal
 * @returns {JSX} Logout Modal Component
 */

const LogoutModal = (props) => {
    const { visible, closeModal } = props;
    const router = useRouter();
    const dispatch = useDispatch();
    const { restPost } = useRest();
    const { user } = useSelector((state) => state.userProfile);

    const handleLogout = async () => {
        // Best-effort backend session cleanup — do not block on failure.
        try {
            await restPost(LOGOUT, user.sessionID, {
                errorMessage: 'Error logging out',
            });
        } catch (e) {
            console.warn('Backend logout failed, proceeding with client-side logout:', e);
        }

        // Always clear local state and Keycloak session regardless of backend result.
        Cookies.remove('chocolateChip');
        dispatch(setUser(null));
        closeModal();

        // Terminate the Keycloak session.
        // id_token_hint tells Keycloak 18+ to skip its own confirmation page.
        if (window.keycloak?.idToken) {
            window.keycloak.logout({
                redirectUri: window.location.origin,
                id_token_hint: window.keycloak.idToken,
            });
        } else {
            router.push('/');
        }
    };

    const bodyComp = (
        <div className={classes.modalBody}>
            <span>Are you sure you want to logout?</span>
            <div className={classes.centered}>
                <Button
                    label="Cancel"
                    variant="secondary"
                    handleClick={() => {
                        closeModal();
                    }}
                />
                <Button
                    label="Logout"
                    variant="primary"
                    handleClick={() => {
                        handleLogout();
                    }}
                />
            </div>
        </div>
    );
    return (
        <>
            <Modal
                show={visible}
                onHide={closeModal}
                closable={true}
                title="Logout"
                bodyChildren={bodyComp}
                dialogClassName={classes.modalWidth}
                centered={true}
            />
        </>
    );
};

LogoutModal.propTypes = {
    closeModal: PropTypes.func,
    visible: PropTypes.bool,
};

export default LogoutModal;
