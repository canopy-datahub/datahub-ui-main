/* eslint-disable max-len */
import React from 'react';
import { Col, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import classes from './ResultNumbers.module.scss';

/*
 */

//TODO: <NavigationBar activeTab={NavParams.activeTab} tabList={NavParams.tabList} setTab={setView} />
// Toss this somewhere

const ResultNumbers = (props) => {
    const { pagination } = props;
    return (
        <>
            <span className={classes.bolded}>{`${pagination.firstNum} - ${pagination.secondNum}`}</span>
            <span className={classes.text}>{` of ${pagination.total.value} Results`}</span>
        </>
    );
};

ResultNumbers.propTypes = {
    pagination: PropTypes.shape({
        page: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        size: PropTypes.string,
        total: PropTypes.shape({
            value: PropTypes.number,
            relation: PropTypes.string,
        }),
    }),
};

export default ResultNumbers;
