import React, { useState } from 'react';
import { Col, Row, Container, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import classes from './StudyPortal.module.scss';
import Banner from '../../components/Banner/Banner';
import Select from '../../components/Select/Select';
import Upload from '../../components/Upload/Upload';
import useRest from '../../lib/hooks/useRest';
import { useRouter } from 'next/router';
import { STUDY_PORTAL_UPLOAD } from '../../constants/apiRoutes';
import PropTypes from 'prop-types';
import SftpModal from './Components/SftpModal';
import CalloutBox from '../../components/CalloutBox/CalloutBox';
import UploadCloud from '../../components/Images/svg/UploadCloud';
import { addNotification } from '../../store/notifications/notificationsSlice';
import { NotificationType, BaseNotification } from '../../store/notifications/notificationConstants';
import { useDispatch } from 'react-redux';
import Link from 'next/link';

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
 * @returns {JSX} UploadFiles component
 */

const StudyPortal = (props) => {
    const { studies, fileUploadSOP } = props;
    const { register, getValues } = useForm({
        mode: 'onSubmit',
        reValidateMode: 'onSubmit',
    });
    const dispatch = useDispatch();
    const router = useRouter();
    const { restPost } = useRest();
    const [disabledFlag, setDisabledFlag] = useState(false);

    const handleZipUpload = async (e) => {
        const zipFile = e.target.files[0];
        const formData = new FormData();
        formData.append('file', e.target.files[0]);
        formData.append('studyId', getValues().selectStudy);
        const zipUploadResult = await restPost(STUDY_PORTAL_UPLOAD, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
            showLoading: true,
            showSuccess: true,
            successMessage: `Succesfully uploaded ${zipFile.name} for Selected Study`,
            errorMessage: 'An error occurred during the file upload process',
        });
        if (zipUploadResult.status === 200 || zipUploadResult.status === 201) {
            setDisabledFlag(true);
            router.push('/studyPortal/success');
        }
    };

    return (
        <>
            <Banner title="Study Portal" path={router.asPath} variant="virus3" ariaLabel="Support Request Breadcrumb" />
            <Container className={`${classes.Container}`}>
                <div className={classes.uploadClamp}>
                    <Row>
                        <Col>
                            <CalloutBox
                                className={classes.instructionsContainer}
                                body={
                                    <div>
                                        To submit study files, select a study and upload one ZIP file with all necessary data files and
                                        documents using the button. The ZIP file must be 25MB or smaller. For any questions, please contact
                                        the Support Team by using the <Link href="/support">'Need Support?'</Link> button in the navigation
                                        bar.
                                    </div>
                                }
                            />
                        </Col>
                    </Row>
                    <form>
                        <Row className={`${classes.createSubmission} mb-5`}>
                            <Col>
                                <Select
                                    {...register('selectStudy', {
                                        required: 'Study must be selected.',
                                        ...getValues(),
                                    })}
                                    className={classes.select}
                                    label="Select Study"
                                    ariaLabel="select study"
                                    placeholder="--"
                                    labelProp="center"
                                    valueProp="studyId"
                                    options={studies}
                                    required
                                    controlId="selectStudy"
                                    type="text"
                                    name="selectStudy"
                                />
                            </Col>
                        </Row>
                    </form>
                    <Row className="mb-4">
                        <Form.Label className={classes.uploadLabel}>
                            <span className={classes.required}>*</span> File Upload
                        </Form.Label>
                    </Row>
                    <Row className="mb-4">
                        <Col className={`${classes.selectUpload} mb-4 col-3`}>
                            <Upload
                                id={'uploadFiles-study-portal'}
                                label={
                                    <span>
                                        <UploadCloud />
                                        Select File to Upload
                                    </span>
                                }
                                multiple={false}
                                accept={'application/zip'}
                                handleChange={handleZipUpload}
                                buttonClass={classes.uploadButton}
                                ariaLabel="upload files for study"
                                icon={false}
                                disabled={disabledFlag}
                            />
                        </Col>
                    </Row>
                </div>
            </Container>
        </>
    );
};

StudyPortal.propTypes = {
    activeStep: PropTypes.number,
    fileUploadSOP: PropTypes.string.isRequired,
    isSubmissionCreated: PropTypes.bool,
    setActiveStep: PropTypes.func,
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

export default StudyPortal;
