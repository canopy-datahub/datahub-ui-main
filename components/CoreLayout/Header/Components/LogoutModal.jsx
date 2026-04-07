import React from 'react';
import classes from './LogoutModal.module.scss';
import Modal from '../../../GeneralModal/GeneralModal';
import Button from '../../../Button/Button';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
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
    const { user } = useSelector((state) => state.userProfile);

    const handleLogout = () => {
        // Clear local state first so React re-renders (closes modals) before redirect.
        Cookies.remove('chocolateChip');
        dispatch(setUser(null));
        closeModal();

        // Defer the redirect to the next event loop tick so React has time to
        // commit the state updates above (unmount modals) before navigating away.
        setTimeout(() => {
            if (window.keycloak?.idToken) {
                window.keycloak.logout({
                    redirectUri: window.location.origin,
                    id_token_hint: window.keycloak.idToken,
                });
            } else {
                router.push('/');
            }
        }, 0);
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
