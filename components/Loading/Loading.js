import React from 'react';
import classes from './Loading.module.scss';
import { Spinner } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

/**
 *
 * @param {Boolean} loading - Automatically manages showing the Loader if you don't use the redux state to manage it.  Use this for internal component load management.
 * @returns a spinner with a backdrop preventing the user from spamming actions
 */
const Loading = ({ loading }) => {
    const { showLoading } = useSelector((state) => state.environment);

    return (
        <>{(showLoading || loading) &&
            <div className={classes.spinnerContainer}>
                <Spinner animation="border" role="status" variant="light" className={classes.spinner}>
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div>
        }
        </>
    );
};

Loading.propTypes = {
    loading: PropTypes.bool,
};

export default Loading;
