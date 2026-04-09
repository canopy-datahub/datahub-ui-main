import React from 'react';
import PropTypes from 'prop-types';
import { Row } from 'react-bootstrap';
import classes from './SuccessPage.module.scss';

/**
 * A Success page for after we submit to study portal
 * @param {Object} props - Object with all of the properties used within the react component, listed below.
 * @property {JSX} icon - icon for the page
 * @property {String} iconClassName - className for styling the icon
 * @property {String} textContent - content for the page
 * @returns {JSX} A SuccessPage component
 */

const SuccessPage = (props) => {
    const { icon, iconClassName, textContent } = props;
    return (
        <Row>
            <span className={iconClassName}>{icon}</span>
            <div className={classes.textContent}>
                {textContent}
            </div>
        </Row>
    );
};

SuccessPage.propTypes = {
    icon: PropTypes.object,
    iconClassName: PropTypes.string,
    textContent: PropTypes.string,
};

export default SuccessPage;
