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
            <span>
                All users of the NIH Rapid Acceleration of Diagnostics RADx Data Hub (RADx Data Hub) are required to login/sign up using Keycloak authentication.
            </span>
            <div className={classes.centered} style={{ marginTop: '20px' }}>
                <Button
                    label={loading ? "Loading..." : "Login/Sign Up"}
                    variant="primary"
                    handleClick={handleKeycloakLogin}
                    disabled={loading}
                />
            </div>
        </div>
    );
    const footerComp = (
        <>
            <span>Need help?</span>
                Contact the support team
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
