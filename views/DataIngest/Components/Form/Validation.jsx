/* eslint-disable multiline-ternary */
import React, { useState, useEffect } from 'react';
import { Row, Form, Col, Container } from 'react-bootstrap';
import classes from './DataIngestForm.module.scss';
import Alert from '../../../../components/Notifications/Alert';
import Button from '../../../../components/Button/Button';
import DataIngestFormNavigation from './DataIngestFormNavigation';
import DropdownButton from '../../../../components/DropdownButton/DropdownButton';
import ValidationErrorModal from '../ValidationErrorModal';
import CalloutBox from '../../../../components/CalloutBox/CalloutBox';
import useRest from '../../../../lib/hooks/useRest';
import DownloadIcon from '../../../../components/Images/svg/DownloadIcon';
import PropTypes from 'prop-types';
import {
    DI_VALIDATE_SUBMISSION,
    DI_GET_VALIDATION,
    DI_REPLACE,
    DI_SEND_ACKNOWLEDGEMENT,
    GET_DOWNLOAD_BY_SUBMISSION,
    DI_SAVE_VALIDATION,
} from '../../../../constants/apiRoutes';
import { downloadLink } from '../../../../lib/pageHelpers/downloadLink';
import DeleteBundleModal from '../DeleteBundleModal';
import { useRouter } from 'next/router';
import _ from 'lodash';
import {
    CheckCircle,
    CheckCircleFill,
    DashLg,
    ExclamationTriangleFill,
    HourglassSplit,
    ChevronRight,
    ChevronDown,
} from 'react-bootstrap-icons';
import ExpandableTable from '../../../../components/Table/ExpandableTable';
import OpenBundle from '../../../../components/Images/svg/OpenBundle';
import ClosedBundle from '../../../../components/Images/svg/ClosedBundle';
import SubBranchIcon from '../../../../components/Images/svg/SubBranchIcon';

/**
 * Third step of the Data ingest form - validation of the files is done here
 * @param {Object} props - Object with all of the properties used within the react component, listed below.
 * @property {Number} submissionId - Integer of the submission id of the submission
 * @property {Number} activeStep - What step of the form we are currently on
 * @property {Function} setActiveStep - function to set the active step to a certain number
 * @property {Number} totalSteps - total amount of steps in the form
 * @property {Boolean} validated - whether the validation has already been done or not
 * @property {Object} fileTypes - the file type options of file categories for submission
 * @property {String} baseUrl - url for downloading validation warnings
 * @returns {JSX} Validation component
 */

const Validation = (props) => {
    const { submissionId, activeStep, setActiveStep, totalSteps, validated, baseUrl } = props;
    const { restPost, restGet, restPut } = useRest();
    const router = useRouter();

    const [errorFiles, setErrorFiles] = useState([]);
    const [isValidated, setIsValidated] = useState(validated);
    const [piiCheck, setPiiCheck] = useState(null);
    const [proceedMessage, setProceedMessage] = useState('');

    useEffect(() => {
        if (isValidated) {
            getResults();
        }
    }, [errorFiles.length]);

    const alterErrorFiles = (files) => {
        const eFiles = [...files];
        const newFiles = eFiles.map((file) => {
            let action;
            action = file.acknowledged ? 'Acknowledged' : 'Action Needed';
            if (file.fileType === 'Tabular Data - Harmonized' && !file.acknowledged) {
                action = (file.cdeErrors || file.piiErrors) ? 'Action Needed' : '-';
            } else if (file.fileType === 'Tabular Data - Non-harmonized' && !file.acknowledged) {
                action = file.piiErrors ? 'Action Needed' : '-';
            }
            file.childFiles.forEach((child) => {
                // check for which type of file it is first before determining the action taken
                let actionTaken;
                if (child.fileType.includes('Metadata')) {
                    actionTaken = Object.keys(child.metaErrors).length > 0 ? 'Action Needed' : '-';
                } else {
                    actionTaken = Object.keys(child.dictErrors).length > 0 ? 'Action Needed' : '-';
                }
                child.actionTaken = actionTaken;
            });
            return { ...file, actionTaken: action };
        });
        setErrorFiles([...newFiles]);
    };

    const createActionList = (row) => {
        const actions = [];
        const unacknowledgement = {
            label: 'Unacknowledge Warnings',
            onClick: () => {
                const files = [...errorFiles];
                files.forEach((f) => {
                    if (f.fileId === row.fileId) {
                        f.acknowledged = !f.acknowledged;
                        f.actionTaken = 'Action Needed';
                    }
                });
                setErrorFiles([...files]);
            },
        };
        const acknowledgement = {
            label: 'Acknowledge Warnings',
            onClick: () => {
                const files = [...errorFiles];
                files.forEach((f) => {
                    if (f.fileId === row.fileId) {
                        f.acknowledged = !f.acknowledged;
                        f.acknowledged ? (f.actionTaken = 'Acknowledged') : (f.actionTaken = 'Action Needed');
                    }
                });
                setErrorFiles([...files]);
            },
        };
        const replaceFile = {
            label: (
                <>
                    <input
                        id={`replaceFile-di-form-${row.fileId}`}
                        label="Replace File"
                        type="file"
                        multiple={false}
                        accept={'*/*'}
                        onChange={(e) => handleReplaceFile(row.fileId, e)}
                        onClick={(e) => e.stopPropagation()}
                        aria-label="replace your file"
                        className={classes.replaceFile}
                    />
                    <span className={classes.replaceFileLabel}>Replace File</span>
                </>
            ),
            onClick: (e) => {
                e.stopPropagation();
            },
        };
        const deleteBundle = {
            label: (
                <DeleteBundleModal
                    fileId={row.fileId}
                    currentFile={row.fileName}
                    files={errorFiles}
                    setFiles={setErrorFiles}
                    submissionId={submissionId}
                />
            ),
            onClick: () => {},
        };
        if (row.actionTaken === 'Acknowledged') {
            actions.push(unacknowledgement);
        } else if (row.fileType.includes('File Metadata') || row.fileType.includes('File Data Dictionary')) {
            actions.push(replaceFile);
            actions.push(deleteBundle);
        } else {
            actions.push(acknowledgement);
            actions.push(replaceFile);
            actions.push(deleteBundle);
        }
        return actions;
    };

    const readUploadedFileAsText = (file) => {
        const temporaryFileReader = new FileReader();

        return new Promise((resolve, reject) => {
            temporaryFileReader.onerror = () => {
                temporaryFileReader.abort();
                reject(new DOMException('Problem parsing input file.'));
            };
            temporaryFileReader.onload = () => {
                resolve(temporaryFileReader.result);
            };
            temporaryFileReader.readAsText(file);
        });
    };

    const handleReplaceFile = async (fileId, e) => {
        const replacementFile = e.target.files[0];
        let fileContents;
        try {
            fileContents = await readUploadedFileAsText(replacementFile);
        } catch (e) {}

        const body = {
            newFile: fileContents,
            fileId: fileId,
            fileName: replacementFile.name,
        };
        const diUploadResult = await restPut(DI_REPLACE, body, {
            showLoading: true,
            showSuccess: true,
            successMessage: 'Successfully replaced file',
            errorMessage: 'Error with replacing file',
        });
        if (diUploadResult.status === 200) {
            setTimeout(function () {
                const files = [...errorFiles];
                const results = diUploadResult?.data?.data?.bundles[0];
                const newFiles = files.filter((f) => f.fileId !== results.fileId);
                const action =
                    results.cdeErrors || results.dictErrors || results.metaErrors || results.piiErrors ? 'Action Needed' : 'File Replaced';
                if (newFiles.length > 0) {
                    setErrorFiles([...newFiles, { ...results, actionTaken: action }]);
                } else {
                    setErrorFiles([{ ...results, actionTaken: action }]);
                }
            }, 500);
        }
    };

    const getResults = async () => {
        const validateResult = await restGet(DI_GET_VALIDATION + `?submissionId=${submissionId}`, {
            showLoading: true,
            showSuccess: false,
            errorMessage: 'Error getting results',
        });
        if (validateResult.status === 200) {
            if (validateResult?.data?.data?.bundles) {
                alterErrorFiles(validateResult?.data?.data?.bundles);
            }
            setPiiCheck(validateResult?.data?.data?.piiPhiCompleted);
            if (errorFiles.length <= 0 && validateResult?.data?.data?.piiPhiCompleted) {
                setProceedMessage('There are no validation warnings. Please proceed to the Review and Submit step.');
            }
        }
    };

    const validateFiles = async () => {
        const body = {
            submissionId: parseInt(submissionId),
        };
        const validateResult = await restPost(DI_VALIDATE_SUBMISSION, body, {
            showLoading: true,
            showSuccess: true,
            successMessage: 'Successfully validated files',
            errorMessage: 'Error with validating files',
        });
        if (validateResult.status === 200 || validateResult.status === 201) {
            setTimeout(function () {
                getResults();
                setIsValidated(true);
            }, 500);
        }
    };

    const saveValidation = async () => {
        const body = {
            submissionId: parseInt(submissionId),
            bundles: errorFiles,
        };
        const saveResult = await restPost(DI_SAVE_VALIDATION, body, {
            showLoading: true,
            showSuccess: true,
            successMessage: 'Successfully saved validation progress',
            errorMessage: 'An Error occurred while trying to save validation',
        });
        if (saveResult.status === 200 || saveResult.status === 201) {
            router.reload();
        }
    };

    const validationCompletion = async () => {
        const body = {
            submissionId: parseInt(submissionId),
            bundles: errorFiles,
            submit: true,
        };
        const acknowledgeResult = await restPost(DI_SEND_ACKNOWLEDGEMENT, body, {
            showLoading: true,
            showSuccess: true,
            successMessage: 'Successfully completed validation',
            errorMessage: 'Error with completing validation',
        });
        if (acknowledgeResult.status === 200 || acknowledgeResult.status === 201) {
            setTimeout(function () {
                router.reload();
            }, 500);
        }
    };

    const checkActionNeeded = () => {
        if (!piiCheck) {
            return true;
        } else if (errorFiles.length > 0) {
            const childList = [];
            const needed = errorFiles.filter((err) => err.actionTaken === 'Action Needed');
            errorFiles.forEach((file) => file.childFiles.forEach((child) => childList.push(child)));
            const childNeeded = childList.filter((child) => child.actionTaken === 'Action Needed');
            return needed.length > 0 || childNeeded.length > 0;
        }
        return !isValidated;
    };

    const piiScreen = (
        <div className={classes.piiScreen}>
            <span className={classes.hourglass}>
                <HourglassSplit />
            </span>
            <p className={classes.textContent}>
                Your submission package is being checked for any validation warnings. Once complete, you will be able to take action on
                files that need remediation. Please note that the scanning process typically takes up to 15 minutes (in rare cases longer).
            </p>
        </div>
    );

    const validationExTableColumns = [
        {
            id: 'expander',
            accessorKey: 'fileName',
            alignLeft: true,
            Cell: ({ row }) =>
                /* eslint-disable-next-line react/prop-types */
                row.canExpand && row.depth === 0 ? (
                    /* eslint-disable-next-line react/prop-types */
                    <div className={classes.row} {...row.getToggleRowExpandedProps({})}>
                        {/* eslint-disable-next-line react/prop-types */}
                        <div className={classes.branchIcon}>{row.isExpanded ? <OpenBundle /> : <ClosedBundle />}</div>
                        {/* eslint-disable-next-line react/prop-types */}
                        <div className={classes.fileName}>
                            {row.original.fileName} {row.isExpanded ? <ChevronDown /> : <ChevronRight />}
                        </div>
                        {/* eslint-disable-next-line react/prop-types */}
                    </div>
                ) : (
                    <div
                        /* eslint-disable-next-line react/prop-types */
                        {...row.getToggleRowExpandedProps({
                            style: {
                                /* eslint-disable-next-line react/prop-types */
                                marginLeft: `${row.depth * 1.5}rem`,
                            },
                        })}
                    >
                        <div className={classes.row}>
                            <div className={classes.branchIcon} style={{ fontSize: '20px', color: '#437b83' }}>
                                <SubBranchIcon />
                            </div>{' '}
                            <div className={classes.fileName}>{row.original.fileName}</div>
                        </div>
                    </div>
                ),
            Header: ({ getToggleAllRowsExpandedProps }) => <span {...getToggleAllRowsExpandedProps()}>File Name</span>,
            size: 425,
        },
        {
            id: 'piiErrors',
            Cell: (props) => {
                let showIcon;
                /* eslint-disable-next-line react/prop-types */
                const errObj = props.row.original;
                /* eslint-disable-next-line react/prop-types */
                if (!errObj.fileType.includes('Tabular Data')) {
                    showIcon = <DashLg />;
                    /* eslint-disable-next-line react/prop-types */
                } else if (errObj?.piiErrors) {
                    /* eslint-disable-next-line react/prop-types */
                    if (errObj.acknowledged) {
                        showIcon = (
                            <span className={classes.acknowledgedCheck}>
                                <CheckCircleFill />
                            </span>
                        );
                    } else {
                        showIcon = <ExclamationTriangleFill className={classes.validationError} />;
                    }
                } else {
                    showIcon = (
                        <span className={classes.validationCheck}>
                            <CheckCircle />
                        </span>
                    );
                }
                return showIcon;
            },
            Header: 'PII',
            size: 50,
        },
        {
            id: 'cdeErrors',
            accessorKey: '',
            Cell: (props) => {
                /* eslint-disable-next-line react/prop-types */
                const errObj = props.row.original;
                let showIcon;
                /* eslint-disable-next-line react/prop-types */
                if (errObj.fileType !== 'Tabular Data - Harmonized') {
                    showIcon = <DashLg />;
                } else if (
                    /* eslint-disable-next-line react/prop-types */
                    errObj.cdeErrors || errObj.missingHeaders?.length > 0 || errObj.cdeErrors // eslint-disable-next-line react/prop-types
                        ? Object.keys(errObj?.cdeErrors).length > 0
                        : false
                ) {
                    /* eslint-disable-next-line react/prop-types */
                    if (errObj.acknowledged) {
                        showIcon = (
                            <span className={classes.acknowledgedCheck}>
                                <CheckCircleFill />
                            </span>
                        );
                    } else {
                        showIcon = <ExclamationTriangleFill className={classes.validationError} />;
                    }
                } else {
                    showIcon = (
                        <span className={classes.validationCheck}>
                            <CheckCircle />
                        </span>
                    );
                }
                return showIcon;
            },
            Header: 'CDE',
            size: 60,
        },
        {
            id: 'meta',
            Header: 'Meta',
            size: 65,
            Cell: (props) => {
                /* eslint-disable-next-line react/prop-types */
                const errObj = props.row.original;
                let showIcon;
                /* eslint-disable-next-line react/prop-types */
                if (!errObj.fileType.includes('File Metadata')) {
                    showIcon = <DashLg />;
                } else {
                    /* eslint-disable-next-line react/prop-types */
                    if (errObj?.metaErrors === null || _.isEmpty(errObj?.metaErrors)) {
                        showIcon = (
                            <span className={classes.validationCheck}>
                                <CheckCircle />
                            </span>
                        );
                    } else {
                        showIcon = <ExclamationTriangleFill className={classes.validationError} />;
                    }
                }
                return showIcon;
            },
        },
        {
            id: 'dict',
            Header: 'Dict',
            size: 65,
            Cell: (props) => {
                /* eslint-disable-next-line react/prop-types */
                const errObj = props.row.original;
                let showIcon;
                /* eslint-disable-next-line react/prop-types */
                if (!errObj.fileType.includes('File Data Dictionary')) {
                    showIcon = <DashLg />;
                } else {
                    /* eslint-disable-next-line react/prop-types */
                    if (errObj?.dictErrors === null || _.isEmpty(errObj?.dictErrors)) {
                        showIcon = (
                            <span className={classes.validationCheck}>
                                <CheckCircle />
                            </span>
                        );
                    } else {
                        showIcon = <ExclamationTriangleFill className={classes.validationError} />;
                    }
                }
                return showIcon;
            },
        },
        {
            id: 'fileType',
            Cell: ({ row }) => <span>{row.original.fileType}</span>,
            Header: 'File Type',
            size: 125,
        },
        {
            id: 'errorCount',
            accessorKey: 'dataEntryWarningCount',
            Header: 'Warning Count',
            Cell: (props) => {
                /* eslint-disable-next-line react/prop-types */
                const errObj = props.row.original;
                /* eslint-disable-next-line react/prop-types */
                return errObj?.dataEntryWarningCount + (errObj.missingHeaders?.length ? errObj.missingHeaders?.length : 0) ? (
                    <ValidationErrorModal
                        /* eslint-disable-next-line react/prop-types */
                        fileId={errObj.fileId}
                        /* eslint-disable-next-line react/prop-types */
                        baseUrl={baseUrl}
                        restGet={restGet}
                        /* eslint-disable-next-line react/prop-types */
                        cdeErrors={errObj.cdeErrors}
                        /* eslint-disable-next-line react/prop-types */
                        piiErrors={errObj.piiErrors}
                        /* eslint-disable-next-line react/prop-types */
                        metaErrors={errObj.metaErrors}
                        /* eslint-disable-next-line react/prop-types */
                        dictErrors={errObj.dictErrors}
                        /* eslint-disable-next-line react/prop-types */
                        missingHeaders={errObj.missingHeaders}
                        errorCount={
                            /* eslint-disable-next-line react/prop-types */
                            errObj.missingHeaders?.length > 0 /* eslint-disable-next-line react/prop-types */
                                ? errObj?.dataEntryWarningCount + 1 /* eslint-disable-next-line react/prop-types */
                                : errObj?.dataEntryWarningCount
                        }
                    />
                ) : (
                    <span>0 Warnings</span>
                );
            },
            size: 170,
        },
        {
            id: 'actions',
            size: 105,
            Cell: (props) => {
                /* eslint-disable-next-line react/prop-types */
                const errObj = props.row.original;
                return (
                    <DropdownButton
                        label="Actions"
                        menuItems={createActionList(errObj)}
                        disabled={!(errObj?.dataEntryWarningCount + (errObj.missingHeaders?.length ? errObj.missingHeaders?.length : 0) > 0)}
                    />
                );
            },
            Header: 'Actions',
        },
        {
            id: 'actionTaken',
            size: 130,
            Cell: (props) => {
                /* eslint-disable-next-line react/prop-types */
                return <span>{props.row.original.actionTaken}</span>;
            },
            Header: 'Action Taken',
        },
    ];

    return (
        <div>
            {!isValidated && (
                <div>
                    <CalloutBox
                        className={classes.instructionsContainer}
                        body={
                            <div>
                                The Data Hub will automatically validate data files as well as metadata and data dictionary files. To
                                start the validation process, press ‘Begin Validation.’ If the system finds any problems with your files,
                                you can address the issues on the next screen.
                            </div>
                        }
                    />
                    <Row className="mb-4">
                        <Button
                            label="Begin Validation"
                            type="button"
                            ariaLabel="begin the validation process for this submission"
                            size="medium"
                            variant="primary"
                            className={classes.validateButton}
                            handleClick={() => validateFiles()}
                        />
                    </Row>
                </div>
            )}
            {isValidated &&
                (!piiCheck ? (
                    piiScreen
                ) : errorFiles?.length > 0 && errorFiles ? (
                    <div>
                        <Row className={`${classes.validationLegend} mb-4`}>
                            <Form.Label className={classes.uploadLabel}>Note for Reference:</Form.Label>
                            <p className={classes.textContent}>
                                <span className={classes.validationError}>
                                    <ExclamationTriangleFill />
                                </span>{' '}
                                Indicates a file has validation warnings
                            </p>
                            <p className={classes.textContent}>
                                <span className={classes.validationCheck}>
                                    <CheckCircle />
                                </span>{' '}
                                Indicates a file has passed a validation check
                            </p>
                            <p className={classes.textContent}>
                                <span className={classes.acknowledgedCheck}>
                                    <CheckCircleFill />
                                </span>{' '}
                                Indicates a file has validation warnings that have been acknowledged
                            </p>
                            <p className={classes.textContent}>
                                <span className={classes.notApplicable}>
                                    <DashLg />
                                </span>{' '}
                                Indicates the validation type is not applicable to a file
                            </p>
                        </Row>
                        {!checkActionNeeded() && (
                            <Alert variant="success" className={classes.alert}>
                                <Container>
                                    <Row className="py-1">
                                        <div className={classes.noWarnings}>
                                            There are no validation warnings. Please click 'Next Page' to proceed to the Review and Submit
                                            step.
                                        </div>
                                    </Row>
                                </Container>
                            </Alert>
                        )}
                        <Container className="m-0 p-0">
                            <Row className="m-0 p-0 mb-3">
                                <Col className="col-6 p-0">
                                    <Form.Label className={classes.uploadLabel}> Bundle Files</Form.Label>
                                </Col>
                                <Col className={`${classes.downloadAll} col-6 p-0`}>
                                    {checkActionNeeded() && (
                                        <Button
                                            label="Download All Warnings"
                                            ariaLabel="download all warnings"
                                            size="auto"
                                            iconLeft={<DownloadIcon />}
                                            variant="secondary"
                                            handleClick={async () => {
                                                downloadLink(`${baseUrl}${GET_DOWNLOAD_BY_SUBMISSION}${submissionId}`, restGet);
                                            }}
                                        />
                                    )}
                                </Col>
                            </Row>
                            <ExpandableTable tableData={errorFiles} tableColumns={validationExTableColumns} />
                        </Container>
                    </div>
                ) : (
                    <Row className={classes.emptyValidation}>
                        <h5>{proceedMessage}</h5>
                    </Row>
                ))}
            <DataIngestFormNavigation
                activeStep={activeStep}
                setActiveStep={setActiveStep}
                totalSteps={totalSteps}
                disabled={checkActionNeeded()}
                submissionId={submissionId}
                handleNextPage={validationCompletion}
                handleSave={saveValidation}
                renderSave={checkActionNeeded()}
                isValidated={isValidated && piiCheck}
            />
        </div>
    );
};

Validation.propTypes = {
    activeStep: PropTypes.number,
    baseUrl: PropTypes.string,
    setActiveStep: PropTypes.func,
    submissionId: PropTypes.number,
    totalSteps: PropTypes.number,
    validated: PropTypes.bool,
};

export default Validation;
