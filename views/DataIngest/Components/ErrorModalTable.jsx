import React from 'react';
import PropTypes from 'prop-types';
import classes from '../DataIngest.module.scss';

/**
 * Modal that shows validation errors in the data ingest form that allows users to upload data files for studies
 * @param {Object} props - Object with all of the properties used within the react component, listed below.
 * @property {Object} errorDetail - Object that holds the detail of the particular error for a particular file
 * @property {String} header - Header name for the table of error, will detail which field the error is related to
 * @returns {JSX} ErrorModalTable component
 */

const ErrorModalTable = (props) => {
    const { header, errorDetail } = props;

    return (
        <div className={classes.expandableContainer}>
            <table className={classes.table}>
                <thead>
                    <th>{header}</th>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <b>Error type:</b> {errorDetail?.errorType}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <b>Message:</b> {JSON.stringify(errorDetail?.message)}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <b>Value:</b> {JSON.stringify(errorDetail?.value)}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <b>Line Number:</b> {errorDetail?.lineNumber}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <b>Solution:</b> {errorDetail?.solution}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

ErrorModalTable.propTypes = {
    errorDetail: PropTypes.shape({
        errorType: PropTypes.string,
        message: PropTypes.string,
        lineNumber: PropTypes.number,
        solution: PropTypes.string,
        value: PropTypes.string,
    }),
    header: PropTypes.string,
};

export default ErrorModalTable;
