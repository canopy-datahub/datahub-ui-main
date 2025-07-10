import React from 'react';
import PropTypes from 'prop-types';
import { CheckCircle, ExclamationTriangleFill, DashLg } from 'react-bootstrap-icons';
import Select from '../../../components/Select/Select';
import classes from '../StudyFileSubmissions.module.scss';

const options = [
    { label: 'Accept', value: 'Accept' },
    { label: 'Reject', value: 'Reject' },
];

/**
 * Function to determine validation symbol for files
 * @param {String} warning - flag determine warning symbol
 * @returns {Element} error icon
 */

const setSymbol = (warning) => {
    if (warning) {
        return (
            <span className={classes.acknowledgedCheck}>
                <ExclamationTriangleFill />
            </span>
        );
    } else if (warning !== null) {
        return (
            <span className={classes.validationCheck}>
                <CheckCircle />
            </span>
        );
    } else {
        return (
            <span className={classes.notApplicable}>
                <DashLg />
            </span>
        );
    }
};

setSymbol.propTypes = {
    warning: PropTypes.string,
};

/**
 * Table column definition for study file submissions
 * @param {Function} register - register function for react hook form
 * @param {Array} errors - errors from react hook form
 * @returns {Array} table columns for study file submissions
 */

export const submissionsTableColumns = (register, errors) => [
    {
        id: 'id',
        accessorKey: 'id',
        cell: (info) => {
            const rowId = info.row.id;
            const item = (
                <Select
                    {...register(`acceptance-${rowId}`, {
                        required: 'Acceptance option must be selected',
                    })}
                    className={classes.select}
                    ariaLabel="Select Accept or Reject"
                    placeholder="---"
                    options={options}
                    required
                    error={errors ? errors[`acceptance-${rowId}`] : null}
                    controlId={`acceptance-${rowId}`}
                    type="text"
                    name={`acceptance-${rowId}`}
                />
            );
            return item;
        },
        header: 'Acceptance',
        size: 50,
    },
    {
        id: 'pii',
        accessorKey: 'piiPhiFailed',
        cell: (info) => setSymbol(info.getValue()),
        header: 'PII',
        size: 10,
    },
    {
        id: 'cde',
        accessorKey: 'cdeFailed',
        cell: (info) => setSymbol(info.getValue()),
        header: 'CDE',
        size: 10,
    },
    {
        id: 'meta',
        accessorKey: 'metaFailed',
        cell: (info) => setSymbol(info.getValue()),
        header: 'Meta',
        size: 10,
    },
    {
        id: 'dict',
        accessorKey: 'dictFailed',
        cell: (info) => setSymbol(info.getValue()),
        header: 'Dict',
        size: 10,
    },
    {
        id: 'sourceFileName',
        accessorKey: 'sourceFileName',
        cell: (info) => info.getValue(),
        header: 'File Name',
        alignLeft: true,
        size: 100,
    },
    {
        id: 'versionNumber',
        accessorKey: 'versionNumber',
        cell: (info) => (info.getValue() ? info.getValue() : '1'),
        header: 'Version',
        size: 40,
    },
    {
        id: 'fileCategory',
        accessorKey: 'fileCategory',
        cell: (info) => info.getValue(),
        header: 'Category',
        alignLeft: true,
        size: 80,
    },
];

submissionsTableColumns.propTypes = {
    errors: PropTypes.Array,
    register: PropTypes.Function,
};
