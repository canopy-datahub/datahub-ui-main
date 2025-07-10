import React from 'react';
import PropTypes from 'prop-types';
import classes from './Upload.module.scss';
import UploadCloud from '../Images/svg/UploadCloud';

/**
 * Upload button for uploading a file or multiple files
 * @param {Object} props - Object with all of the properties used within the react component, listed below.
 * @property {Boolean} [multiple=false] - Determines weather you can upload more than 1 file at a time
 * @property {Function} handleChange - Function for handling action of uploading a file(s)
 * @property {String} accept - string to determine what types of files are accepted
 * @property {String} ariaLabel - The 508 compliance label for the component
 * @property {String} id - unique ID for the label and input element
 * @property {String} className - Class extension parameter. Use this to pass through the CSS object if any overwrites need to happen.
 * @property {String} label - Label property for the text on the upload button
 * @property {String} buttonClass - Class name for styling of the button
 * @property {Boolean} icon - whether to include the cloud upload icon or not
 * @property {Boolean} disabled - whether to disable button or not
 * @returns {JSX} Upload Component
 */

const Upload = (props) => {
    const { multiple, handleChange, accept, id, ariaLabel, className, label, buttonClass, icon, disabled } = props;

    return (
        <>
            <label htmlFor={id}>
                <span className={`${buttonClass || classes.uploadButton} ${disabled ? classes.disabled : ''}`}>
                    {icon && <UploadCloud className={classes.uploadIcon} />}
                    {label}
                </span>
            </label>
            <input
                id={id}
                type="file"
                multiple={multiple}
                accept={accept}
                onChange={handleChange}
                aria-label={ariaLabel}
                className={`${classes.fileUpload} ${className}`}
                disabled={disabled}
            />
        </>
    );
};

Upload.defaultProps = {
    className: '',
    label: 'Choose a File',
    multiple: false,
    accept: '*/*',
    id: 'uploadFiles_',
    icon: true,
};

Upload.propTypes = {
    accept: PropTypes.string,
    ariaLabel: PropTypes.string,
    buttonClass: PropTypes.string,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    handleChange: PropTypes.func.isRequired,
    icon: PropTypes.bool,
    id: PropTypes.string,
    label: PropTypes.string,
    multiple: PropTypes.bool,
};

export default Upload;
