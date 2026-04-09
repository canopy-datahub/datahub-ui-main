import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'react-bootstrap';
import classes from './NoticeBox.module.scss';
import InfoIcon from '../../components/Images/svg/InfoIcon';

/**
 * Notice Box
 * @param {Object} props - Object with all of the properties used within the react component, listed below.
 * @property {String} className - Custom styling
 * @property {Object} body - Body content for the notice box
 * @returns {JSX} Notice Box Component
 */

const NoticeBox = ({ className, body }) => {
    const containerClass = className ? `${className} ${classes.noticeContainer}` : classes.noticeContainer;

    return (
        <Container className={`${classes.Container} ${containerClass}`}>
            <div className={classes.noticeBox}>
                <div className={classes.noticeIcon}>
                    <InfoIcon fontColor="#AAAAAA" width="60" height="60" />
                </div>
                <div>{body}</div>
            </div>
        </Container>
    );
};

NoticeBox.propTypes = {
    className: PropTypes.string,
    body: PropTypes.object,
};

export default NoticeBox;
