import React, { useState } from 'react';
import { Col, Row, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import classes from './DataIngestForm.module.scss';
import Select from '../../../../components/Select/Select';
import Button from '../../../../components/Button/Button';
import BasicCheckbox from '../../../../components/Checkbox/BasicCheckbox';
import Upload from '../../../../components/Upload/Upload';
import CheckboxTable from '../../../../components/Table/CheckboxTable';
import DataIngestFormNavigation from './DataIngestFormNavigation';
import useRest from '../../../../lib/hooks/useRest';
import { useRouter } from 'next/router';
import { DI_SUBMISSION, DI_CREATE_BUNDLES, DI_MULTI_UPLOAD } from '../../../../constants/apiRoutes';
import PropTypes from 'prop-types';
import SftpModal from '../SftpModal';
import CalloutBox from '../../../../components/CalloutBox/CalloutBox';
import { convertFileSize } from '../../../../lib/DataIngest/CategorizeFiles/expandableTableUtils';
import UploadCloud from '../../../../components/Images/svg/UploadCloud';
import { addNotification } from '../../../../store/notifications/notificationsSlice';
import { NotificationType, BaseNotification } from '../../../../store/notifications/notificationConstants';
import { useDispatch } from 'react-redux';

/**
 * First step of the Data ingest form - uploading of files is done here
 * @param {Object} props - Object with all of the properties used within the react component, listed below.
 * @property {Array(Object)} studies - Object that holds study data for the select study dropdown
 * @property {Array(Object)} uploadedFiles - Array holding the uploaded files for the current submission
 * @property {Number} activeStep - What step of the form we are currently on
 * @property {Function} setActiveStep - function to set the active step to a certain number
 * @property {Number} totalSteps - total amount of steps in the form
 * @property {Object} studySelected - object that holds name and id of the study selected in the dropdown
 * @property {Boolean} isSubmissionCreated - whether a submission has been created or not
 * @property {Number} subId - submissionID of the current submission - if it exists
 * @property {String} fileUploadSOP - The URL for the File Upload SOP.
 * @property {String} sftpKey - The sftp key for this particular study
 * @returns {JSX} UploadFiles component
 */

const UploadFiles = (props) => {
    const { studies, uploadedFiles, isSubmissionCreated, subId, studySelected, activeStep, setActiveStep, totalSteps, fileUploadSOP, sftpKey } =
        props;
    const { register, getValues } = useForm({
        mode: 'onSubmit',
        reValidateMode: 'onSubmit',
    });
    const dispatch = useDispatch();
    const router = useRouter();
    const { restPost } = useRest();
    const [files, setFiles] = useState(uploadedFiles ? [...uploadedFiles] : []);
    const [submissionCreated, setSubmissionCreated] = useState(!isSubmissionCreated);
    const [submissionId, setSubmissionId] = useState(subId);

    const tableColumns = [
        {
            id: 'fileName',
            accessorKey: 'fileName',
            cell: (props) => {
                /* eslint-disable-next-line react/prop-types */
                return (
                    <>
                        {props.getValue()}
                    </>
                );
            },
            alignLeft: true,
            header: 'File Name',
            size: '500',
        },
        {
            id: 'fileSize',
            accessorKey: 'fileSize',
            header: 'File Size',
            cell: (props) => {
                /* eslint-disable-next-line react/prop-types */
                return <span>{convertFileSize(props.getValue())}</span>;
            },
            size: '150',
        },
        {
            id: 'delete',
            accessorKey: 'fileSize',
            cell: (props) => {
                return (
                    <div>
                        <BasicCheckbox
                            {...{
                                checked: props.row.getIsSelected(),
                                onChange: props.row.getToggleSelectedHandler(),
                                label: '',
                                row: props.row,
                            }}
                            containerClass={classes.checkbox}
                        />
                    </div>
                );
            },
            header: 'Select',
            size: 50,
        },
    ];

    const createSubmission = async (studyId) => {
        const body = { studyId: studyId };
        const diSubmissionResult = await restPost(DI_SUBMISSION, body, {
            showLoading: true,
            showSuccess: true,
            successMessage: 'Successfully created submission',
            errorMessage: 'Error with creating submission',
        });
        if (diSubmissionResult.status === 200) {
            setSubmissionCreated(true);
            setSubmissionId(diSubmissionResult.data.data);
            const id = diSubmissionResult.data.data;
            router.push(`dataIngest/${id}`);
        }
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

    const handleMultiFileUpload = async (e) => {
        const newFiles = e.target.files;
        const fileList = [];
        const fileNames = [];
        let fileContents;
        for (let i = 0; i < newFiles.length; i++) {
            try {
                fileContents = await readUploadedFileAsText(newFiles[i]);
                fileList.push(fileContents);
                fileNames.push(newFiles[i].name);
            } catch (e) {
                const tempNotification = { ...BaseNotification };
                tempNotification.message = e?.message || 'Issue Uploading Files';
                tempNotification.type = NotificationType.ERROR;
                tempNotification.delay = 8000;
                dispatch(addNotification(tempNotification));
            }
        }
        const body = {
            files: fileList,
            fileNames: fileNames,
            submissionId: submissionId,
        };
        const diMultiUploadResult = await restPost(DI_MULTI_UPLOAD, body, {
            showLoading: true,
            showSuccess: true,
            successMessage: `Successfully Uploaded ${fileNames.length} File(s)`,
            errorMessage: 'Error during file upload process',
        });
        if (diMultiUploadResult.status === 200 || diMultiUploadResult.status === 201) {
            const newData = diMultiUploadResult.data.data;
            setFiles([...files, ...newData]);
        }
    };

    const createBundles = async () => {
        const body = {
            submissionId: submissionId,
        };
        const createBundleResult = await restPost(DI_CREATE_BUNDLES, body, {
            showLoading: true,
            showSuccess: true,
            successMessage: 'Successfully created bundle results',
            errorMessage: 'Error with creating bundle results',
        });

        if (createBundleResult.status === 200 || createBundleResult.status === 201) {
            router.reload();
        }
    };

    const sortedFiles = () => {
        const myFiles = Array.from(files);
        myFiles.sort((a, b) => a.fileName.localeCompare(b.fileName));
        return myFiles;
    };

    return (
        <div className={classes.uploadClamp}>
            <Row>
                <Col>
                    <CalloutBox
                        className={classes.instructionsContainer}
                        body={<div>To begin your submission, you must first select a study and click ‘Create Submission’.</div>}
                    />
                </Col>
            </Row>
            <form>
                <Row className={`${classes.createSubmission} mb-4`}>
                    <Col className="col-9">
                        <Select
                            {...register('selectStudy', {
                                required: 'Study must be selected.',
                                ...getValues(),
                            })}
                            className={classes.select}
                            label="Select Study"
                            ariaLabel="select study"
                            placeholder={studySelected ? studySelected.dcc : '--'}
                            labelProp="dcc"
                            valueProp="studyId"
                            disabled={submissionCreated}
                            options={studies}
                            required
                            controlId="selectStudy"
                            type="text"
                            name="selectStudy"
                        />
                    </Col>
                    <Col>
                        {submissionCreated && (
                            <Col>
                                <span className={classes.submissionLabel}>Submission ID: {submissionId}</span>
                            </Col>
                        )}
                        <Button
                            label={submissionCreated ? 'Submission Created' : 'Create Submission'}
                            type="button"
                            ariaLabel="create a submission for selected study"
                            size="medium"
                            variant="primary"
                            disabled={submissionCreated}
                            className={classes.submissionButton}
                            handleClick={() => createSubmission(getValues().selectStudy)}
                        />
                    </Col>
                </Row>
            </form>
            {submissionCreated && (
                <>
                    <Row className="mb-4">
                        <Col>
                            <CalloutBox
                                className={classes.instructionsContainer}
                                body={
                                    <div>
                                        Upload Data files and documents. If you are uploading a{' '}
                                        <b>package larger than 250 MB, we recommend uploading your files via SFTP </b>
                                        by clicking the SFTP Upload link for instructions on how to do so. For further information, refer to
                                        the File Upload Standard Operating Procedure.
                                    </div>
                                }
                            />
                        </Col>
                        <Form.Label className={classes.uploadLabel}>
                            <span className={classes.required}>*</span> File Upload
                        </Form.Label>
                    </Row>
                    <Row className="mb-4">
                        <Col className={`${classes.selectUpload} mb-4 col-3`}>
                            <Upload
                                id={'uploadFiles-di-form'}
                                label={
                                    <span>
                                        <UploadCloud />
                                        Select File(s) to Upload
                                    </span>
                                }
                                multiple={true}
                                accept={'*/*'}
                                handleChange={handleMultiFileUpload}
                                buttonClass={classes.uploadButton}
                                ariaLabel="upload files for study"
                                icon={false}
                            />
                        </Col>
                        <Col className={`col-1 ${classes.orText}`}>
                            <span>
                                <b>OR</b>
                            </span>
                        </Col>
                        <Col className="col-8">
                            <span className={classes.textContent}>
                                <SftpModal variant="single" title="SFTP Upload Notice" fileUploadSOP={fileUploadSOP} sftpKey={sftpKey} /> (Recommended for
                                uploads over 250 MB)
                            </span>
                        </Col>
                    </Row>
                    <Row className="mb-4">
                        {files.length > 0 && (
                            <>
                                <Form.Label className={classes.uploadLabel}> Uploaded Files</Form.Label>
                                <p>Total Files: {files.length}</p>
                                <CheckboxTable
                                    tableHeaders={tableColumns}
                                    tableRows={sortedFiles()}
                                    ariaCaption="uploaded files table"
                                    files={files}
                                    setFiles={setFiles}
                                />
                            </>
                        )}
                    </Row>
                </>
            )}
            <DataIngestFormNavigation
                activeStep={activeStep}
                setActiveStep={setActiveStep}
                totalSteps={totalSteps}
                disabled={!(files.length > 0)}
                handleNextPage={createBundles}
            />
        </div>
    );
};

UploadFiles.propTypes = {
    activeStep: PropTypes.number,
    fileUploadSOP: PropTypes.string.isRequired,
    isSubmissionCreated: PropTypes.bool,
    setActiveStep: PropTypes.func,
    sftpKey: PropTypes.string,
    studies: PropTypes.arrayOf(
        PropTypes.shape({
            studyId: PropTypes.number,
            dcc: PropTypes.string,
        })
    ),
    studySelected: PropTypes.bool,
    subId: PropTypes.number,
    totalSteps: PropTypes.number,
    uploadedFiles: PropTypes.arrayOf(
        PropTypes.shape({
            fileName: PropTypes.string,
            checksumHash: PropTypes.string,
            dataFileId: PropTypes.number,
            uploadSuccessful: PropTypes.bool,
        })
    ),
};

export default UploadFiles;
