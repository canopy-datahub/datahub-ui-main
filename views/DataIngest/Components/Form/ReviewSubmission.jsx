/* eslint-disable multiline-ternary */
import React, { useState, useEffect } from 'react';
import ExpandableTable from '../../../../components/Table/ExpandableTable';
import { Row, Form, Col } from 'react-bootstrap';
import Table from '../../../../components/Table/Table';
import ClosedBundle from '../../../../components/Images/svg/ClosedBundle';
import PaperFile from '../../../../components/Images/svg/PaperFile';
import SubBranchIcon from '../../../../components/Images/svg/SubBranchIcon';
import classes from './DataIngestForm.module.scss';
import FinalSubmissionModal from '../FinalSubmissionModal';
import DeleteBundleModal from '../DeleteBundleModal';
import CalloutBox from '../../../../components/CalloutBox/CalloutBox';
import PropTypes from 'prop-types';
import { convertFileSize } from '../../../../lib/DataIngest/CategorizeFiles/expandableTableUtils';
import { CheckCircle, CheckCircleFill, ChevronDown, ChevronRight } from 'react-bootstrap-icons';

/**
 * Final step of the Data ingest form - review and submit of the form done here
 * @param {Object} props - Object with all of the properties used within the react component, listed below.
 * @property {Object} studyInfo - Object with the details of the study the submission is related to
 * @property {Number} submissionId - Integer of the submission id of the submission
 * @property {Object(Array(Object))} bundlesFiles - object with the data of bundles and unassigned files in final bundles
 * @returns {JSX} ReviewSubmission component
 */

const ReviewSubmission = (props) => {
    const { bundleFiles, submissionId, studyInfo } = props;
    const [bundles, setBundles] = useState(bundleFiles.bundles);
    const [studyDocuments, setStudyDocuments] = useState(bundleFiles?.documents);

    const unassignedTableColumns = [
        {
            id: 'name',
            accessorKey: 'name',
            alignLeft: true,
            header: 'File Name',
            size: '450',
        },
        {
            id: 'category',
            accessorKey: 'category',
            header: 'File Type',
            size: '300',
        },
        {
            id: 'size',
            accessorKey: 'size',
            header: 'File Size',
            size: '150',
            cell: (info) => {
                return <span>{convertFileSize(info.getValue())}</span>;
            },
        },
    ];

    const documentsTableColumns = [
        {
            id: 'name',
            accessorKey: 'name',
            alignLeft: true,
            header: 'File Name',
            size: '450',
        },
        {
            id: 'category',
            accessorKey: 'category',
            header: 'File Type',
            size: '300',
        },
        {
            id: 'size',
            accessorKey: 'size',
            header: 'File Size',
            size: '150',
            cell: (info) => {
                return <span>{convertFileSize(info.getValue())}</span>;
            },
        },
    ];

    const tableColumns = [
        {
            id: 'errors',
            size: 150,
            Header: 'Warnings',
            /* eslint-disable-next-line react/prop-types */
            Cell: ({ row }) =>
                /* eslint-disable-next-line react/prop-types */
                row.original.acknowledged ? (
                    <span className={classes.acknowledgedCheck}>
                        <CheckCircleFill />
                    </span>
                ) : (
                    <span className={classes.validationCheck}>
                        <CheckCircle />
                    </span>
                ),
        },
        {
            id: 'expander',
            size: 400,
            alignLeft: true,
            /* eslint-disable-next-line react/prop-types */
            Header: ({ getToggleAllRowsExpandedProps }) => <span {...getToggleAllRowsExpandedProps()}>File Name</span>,
            /* eslint-disable-next-line react/prop-types */
            Cell: ({ row }) =>
                /* eslint-disable-next-line react/prop-types */
                row.canExpand && row.depth === 0 ? (
                    /* eslint-disable-next-line react/prop-types */
                    <div className={classes.row} {...row.getToggleRowExpandedProps({})}>
                        {/* eslint-disable-next-line react/prop-types */}
                        <div className={classes.branchIcon}>{<ClosedBundle />}</div>
                        {/* eslint-disable-next-line react/prop-types */}
                        <div className={classes.fileName}>
                            {row.original.name}{' '}
                            {row.isExpanded ? <ChevronDown /> : <ChevronRight />}
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
                            <div className={classes.fileName}>
                                {row.original.name}
                            </div>
                        </div>
                    </div>
                )
        },
        {
            id: 'category',
            size: 150,
            Header: 'File Type',
            accessor: 'category',
        },
        {
            id: 'size',
            size: 150,
            Header: 'File Size',
            accessor: 'size',
            Cell: (original) => {
                return <span>{convertFileSize(original.row.original.size)}</span>;
            },
        },
        {
            id: 'version',
            size: 150,
            Header: 'Version',
            accessor: '',
            Cell: (original) => {
                let version = '-';
                if (original.row.original.category.includes('Tabular') && original.row.original.willBeVersioned) {
                    version = 'Updated';
                } else if (original.row.original.category.includes('Tabular') && !original.row.original.willBeVersioned) {
                    version = 'First';
                }
                return version;
            },
        },
        {
            id: 'delete',
            size: 125,
            Header: 'Delete',
            accessor: '',
            Cell: (original) => {
                if (original.row.original.category.includes('Tabular')) {
                    return (
                        <DeleteBundleModal
                            variant="review"
                            fileId={original.row.original.id}
                            currentFile={original.row.original.name}
                            files={bundles}
                            setFiles={setBundles}
                            submissionId={submissionId}
                        />
                    );
                }
                return '-';
            },
        },
    ];

    return (
        <div>
            <CalloutBox
                className={classes.instructionsContainer}
                body={
                    <div>
                        The files in the ‘Bundled Files’ table are ready for submission. Press the ‘Submit’ button to send the files to the
                        RADx Data Hub team for review.
                    </div>
                }
            />
            <Row className="mb-4">
                <span className={classes.textContent}>
                    <Form.Label className={classes.uploadLabel}>Submission ID: </Form.Label> {submissionId}
                </span>
            </Row>
            <Row className="mb-4">
                <span className={classes.textContent}>
                    <Form.Label className={classes.uploadLabel}>Study Name: </Form.Label> {studyInfo.dcc}
                </span>
            </Row>
            <Row className="mb-4">
                <Form.Label className={classes.uploadLabel}>Bundled Files</Form.Label>
                <ExpandableTable tableData={bundles} tableColumns={tableColumns} ariaCaption="" />
            </Row>
            {studyDocuments.length > 0 && (
                <Row className="mb-4">
                    <Form.Label className={classes.uploadLabel}>Study Documents</Form.Label>
                    <Table tableHeaders={documentsTableColumns} tableRows={studyDocuments} variant="dataIngest" ariaCaption="" />
                </Row>
            )}
            {bundleFiles.unassigned.length > 0 && (
                <Row className="mb-4">
                    <Form.Label className={classes.uploadLabel}>Unassigned Files</Form.Label>
                    <Table tableHeaders={unassignedTableColumns} tableRows={bundleFiles.unassigned} variant="dataIngest" ariaCaption="" />
                </Row>
            )}
            <Row className={classes.buttonGroup}>
                <Col className={classes.submitButton}>
                    <FinalSubmissionModal submissionId={submissionId} studyName={studyInfo.dcc} />
                </Col>
            </Row>
        </div>
    );
};

ReviewSubmission.propTypes = {
    bundleFiles: PropTypes.shape({
        bundles: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.number,
                name: PropTypes.string,
                category: PropTypes.string,
                size: PropTypes.number,
                cdeValidation: PropTypes.bool,
                acknowledged: PropTypes.bool,
                piiPhiValidation: PropTypes.bool,
                childFiles: PropTypes.arrayOf(),
            })
        ),
        documents: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.number,
                name: PropTypes.string,
                category: PropTypes.string,
                size: PropTypes.number,
                cdeValidation: PropTypes.bool,
                acknowledged: PropTypes.bool,
                piiPhiValidation: PropTypes.bool,
                childFiles: PropTypes.arrayOf(),
            })
        ),
        unassigned: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.number,
                name: PropTypes.string,
                category: PropTypes.string,
                size: PropTypes.number,
                cdeValidation: PropTypes.bool,
                acknowledged: PropTypes.bool,
                piiPhiValidation: PropTypes.bool,
                childFiles: PropTypes.arrayOf(),
            })
        ),
    }),
    studyInfo: PropTypes.shape({
        dcc: PropTypes.string,
        studyId: PropTypes.number,
    }),
    submissionId: PropTypes.number,
};

export default ReviewSubmission;
