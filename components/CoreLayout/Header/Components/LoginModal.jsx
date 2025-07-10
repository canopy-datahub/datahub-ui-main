import React from 'react';
import classes from './LoginModal.module.scss';
import Modal from '../../../GeneralModal/GeneralModal';
import Button from '../../../Button/Button';
import { useRouter } from 'next/router';
import { LOGIN } from '../../../../constants/apiRoutes';
import useRest from '../../../../lib/hooks/useRest';
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

    const getLoginURL = async () => {
        const userProfileResponse = await restGet(LOGIN, {
            errorMessage: 'Error getting Login Link',
        });
        router.push(userProfileResponse.data.data);
    };

    const bodyComp = (
        <div className={classes.modalBody}>
            <span>
                All users of the NIH Rapid Acceleration of Diagnostics RADx Data Hub (RADx Data Hub) are required to login/sign up using
                Researcher Auth Service (RAS). To learn more about RAS, visit their{' '}
                <a
                    href=""
                    className={classes.altLink}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    website
                </a>
                .
            </span>
            <span>
                <strong>Important:</strong> If you plan on using the ‘Analytics Workbench,’ you must use the{' '}
                <strong>same RAS Account</strong> you use to login to and request access to studies in <strong>dbGaP</strong> unless the
                account you are using is linked to your RAS Account for dbGaP. Otherwise, the studies you have access to will not appear in
                your approved files.
            </span>
            <div className={classes.centered}>
                <Button
                    label="Login/Sign Up using RAS"
                    variant="primary"
                    handleClick={() => {
                        getLoginURL();
                    }}
                ></Button>
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
