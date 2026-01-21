import React from 'react';
import classes from './LoginModal.module.scss';
import Modal from '../../../GeneralModal/GeneralModal';
import Button from '../../../Button/Button';
import { useRouter } from 'next/router';
import { LOGIN } from '../../../../constants/apiRoutes';
import useRest from '../../../../lib/hooks/useRest';
import useKeycloak from '../../../../lib/hooks/useKeycloak';
import PropTypes from 'prop-types';

/**
 * Login Modal
 * @returns {JSX} Login Modal Component
 * @property {Boolean} visible - Boolean handling when the modal is visible
 * @property {Function} [closeModal=()=>{}] - function handling closing of the modal
 */

const LoginModal = (props) => {
    const { visible, closeModal } = props;
    const router = useRouter();
    const { restGet } = useRest();
    const { login: keycloakLogin, loading } = useKeycloak();

    const getLoginURL = async () => {
        const userProfileResponse = await restGet(LOGIN, {
            errorMessage: 'Error getting Login Link',
        });
        router.push(userProfileResponse.data.data);
    };

    const handleKeycloakLogin = () => {
        if (keycloakLogin && !loading) {
            keycloakLogin();
            closeModal();
        }
    };

    const bodyComp = (
        <div className={classes.modalBody}>
            <div className={classes.centered}>
                <Button
                    label={loading ? "Loading..." : "Login/Sign Up"}
                    variant="primary"
                    handleClick={handleKeycloakLogin}
                    disabled={loading}
                ></Button>
            </div>
        </div>
    );
    const footerComp = (
        <>
            <span>Need help?</span>
            <a href="mailto:" className={classes.link}>
                Contact the support team
            </a>
        </>
    );

    return (
        <>
            <Modal
                show={visible}
                onHide={closeModal}
                closable={true}
                title="Login"
                bodyChildren={bodyComp}
                footerChildren={footerComp}
                dialogClassName={classes.modalWidth}
            />
        </>
    );
};

LoginModal.propTypes = {
    closeModal: PropTypes.func,
    visible: PropTypes.bool,
};

export default LoginModal;
