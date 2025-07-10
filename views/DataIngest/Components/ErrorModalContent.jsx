import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import PropTypes from 'prop-types';
import ErrorModalTable from './ErrorModalTable';
import classes from '../DataIngest.module.scss';
import _ from 'lodash';

/**
 * The body of the error modal in validation step of data ingest form
 * @param {Object} props - Object with all of the properties used within the react component, listed below.
 * @property {Object} cdeErrors - Array of all cde errors to be displayed in the error modal
 * @property {Object} dictErrors - Array of all dict errors to be displayed in the error modal
 * @property {Object} piiErrors - Array of all pii errors to be displayed in the error modal
 * @property {Object} metaErrors - Array of all meta errors to be displayed in the error modal
 * @property {Array} missingHeaders - Array of missing headers for a particular file
 * @returns {JSX} ErrorModalContent component
 */

const ErrorModalContent = (props) => {
    const { cdeErrors, metaErrors, dictErrors, piiErrors, missingHeaders } = props;

    const showErrors = (errors) => {
        const errorMap = [];
        const keyMap = [];
        for (const key in errors) {
            keyMap.push(key);
            for (const err of errors[key]) {
                errorMap.push({ ...err, header: key });
            }
        }
        return errorMap.map((err) => {
            return (
                <div className={classes.modalTable} key={_.uniqueId()}>
                    <ErrorModalTable header={err.header} errorDetail={err} />
                </div>
            );
        });
    };

    const cdeTab = {
        tabHeader: 'CDE',
        show: !cdeErrors,
        content: (
            <div>
                <span className={classes.tabLabel}>CDE Warnings</span>
                <br />
                <br />
                <div>
                    {missingHeaders?.length > 0 && (
                        <p className={classes.missingHeaders}>
                            <b>Missing Headers: </b>
                            {missingHeaders.join(', ')}
                        </p>
                    )}
                    {showErrors(cdeErrors)}
                </div>
            </div>
        ),
    };

    const piiTab = {
        tabHeader: 'PII',
        show: !piiErrors,
        content: (
            <div>
                <span className={classes.tabLabel}>PII Warnings</span>
                <br />
                <br />
                <div>{showErrors(piiErrors)}</div>
            </div>
        ),
    };

    const metaTab = {
        tabHeader: 'Meta',
        show: !metaErrors,
        content: (
            <div>
                <span className={classes.tabLabel}>Meta Warnings</span>
                <br />
                <br />
                <div>{showErrors(metaErrors)}</div>
            </div>
        ),
    };

    const dictTab = {
        tabHeader: 'Dict',
        show: !dictErrors,
        content: (
            <div>
                <span className={classes.tabLabel}>Dict Warnings</span>
                <br />
                <br />
                <div>{showErrors(dictErrors)}</div>
            </div>
        ),
    };

    const tabs = [];
    tabs.push(piiTab);
    tabs.push(cdeTab);
    tabs.push(metaTab);
    tabs.push(dictTab);


    return (
        <Tabs>
            <TabList>
                {tabs.map((header) => (
                    header.show ? null : <Tab key={_.uniqueId()}>{header.tabHeader}</Tab>
                ))}
            </TabList>
            {tabs.map((body) => (
                body.show ? null : <TabPanel key={_.uniqueId()}>{body.content}</TabPanel>
            ))}
        </Tabs>
    );
};

ErrorModalContent.propTypes = {
    cdeErrors: PropTypes.shape({
        key: PropTypes.arrayOf(
            PropTypes.shape({
                errorType: PropTypes.string,
                message: PropTypes.string,
                lineNumber: PropTypes.number,
                solution: PropTypes.string,
            })
        )
    }),
    dictErrors: PropTypes.shape({
        key: PropTypes.arrayOf(
            PropTypes.shape({
                errorType: PropTypes.string,
                message: PropTypes.string,
                lineNumber: PropTypes.number,
                solution: PropTypes.string,
            })
        )
    }),
    metaErrors: PropTypes.shape({
        key: PropTypes.arrayOf(
            PropTypes.shape({
                errorType: PropTypes.string,
                message: PropTypes.string,
                lineNumber: PropTypes.number,
                solution: PropTypes.string,
            })
        )
    }),
    missingHeaders: PropTypes.arrayOf(PropTypes.string),
    piiErrors: PropTypes.shape({
        key: PropTypes.arrayOf(
            PropTypes.shape({
                errorType: PropTypes.string,
                message: PropTypes.string,
                lineNumber: PropTypes.number,
                solution: PropTypes.string,
            })
        )
    }),
};

export default ErrorModalContent;
