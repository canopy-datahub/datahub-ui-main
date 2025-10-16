/* eslint-disable array-callback-return */
/* eslint-disable multiline-ternary */
import React, { useState } from 'react';
import ExpandableTable from '../../../../components/Table/ExpandableTable';
import classes from './DataIngestForm.module.scss';
import OpenBundle from '../../../../components/Images/svg/OpenBundle';
import ClosedBundle from '../../../../components/Images/svg/ClosedBundle';
import PaperFile from '../../../../components/Images/svg/PaperFile';
import SubBranchIcon from '../../../../components/Images/svg/SubBranchIcon';
import CalloutBox from '../../../../components/CalloutBox/CalloutBox';
import DataIngestFormNavigation from './DataIngestFormNavigation';
import { Form, Row, Col } from 'react-bootstrap';
import Table from '../../../../components/Table/Table';
import { DI_UPDATE_BUNDLES, DI_PREVIOUS_PAGE } from '../../../../constants/apiRoutes';
import useRest from '../../../../lib/hooks/useRest';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { convertFileSize } from '../../../../lib/DataIngest/CategorizeFiles/expandableTableUtils';
import { ChevronDown, ChevronRight, Plus, XCircle } from 'react-bootstrap-icons';
import DeleteFileModal from '../DeleteFileModal';
import { canProceed, handleAddChild } from '../Helpers/categorizeHelpers';

/**
 * Second step of the Data ingest form - categorization of the files is done here
 * @param {Object} props - Object with all of the properties used within the react component, listed below.
 * @property {Object} fileTypes - Object with the file types for the dropdowns in the tables
 * @property {Number} submissionId - Integer of the submission id of the submission
 * @property {Number} activeStep - What step of the form we are currently on
 * @property {Function} setActiveStep - function to set the active step to a certain number
 * @property {Number} totalSteps - total amount of steps in the form
 * @property {Object(Array(Object))} bundlesData - object with the data of bundles and unassigned files pre-categorized files
 * @returns {JSX} CategorizeFiles component
 */

const CategorizeFiles = (props) => {
    const { fileTypes, activeStep, setActiveStep, totalSteps, submissionId, bundlesData } = props;
    const [unassignedFiles, setUnassignedFiles] = useState(bundlesData.unassigned ? bundlesData?.unassigned : []);
    const [bundleFiles, setBundleFiles] = useState(bundlesData?.bundles);
    const [selectUnassignedFile, setSelectUnassignedFile] = useState({});
    const [selectDataFile, setSelectDataFile] = useState(false);
    const [selectStudyDocument, setSelectStudyDocument] = useState(false);
    const childFileTypes = [...fileTypes.metadata, ...fileTypes.dictionary];
    const docs = fileTypes?.document.map((item) => item.name);
    const [studyDocuments, setStudyDocuments] = useState(bundlesData?.documents);

    const { restPost } = useRest();
    const router = useRouter();

    const studyDocumentsColumns = [
        {
            id: 'name',
            accessorKey: 'name',
            alignLeft: true,
            cell: (props) => {
                /* eslint-disable-next-line react/prop-types */
                return <span>{props.getValue()}</span>;
            },
            header: 'File Name',
            size: '450',
        },
        {
            id: 'category',
            accessorKey: 'category',
            cell: (original) => (
                /* eslint-disable-next-line react/prop-types */
                <select value={original.row.original.category} onChange={(e) => handleStudyFileTypeChange(e, original.row)}>
                    <optgroup label="Study Documents">
                        {fileTypes?.document.map((op) => (
                            <option value={op.name} key={_.uniqueId()}>
                                {op.name}
                            </option>
                        ))}
                    </optgroup>
                </select>
            ),
            header: 'File Type',
            size: '350',
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
        {
            id: 'remove',
            size: '150',
            header: 'Remove',
            cell: (original) => (
                <button className={classes.removeIcon} onClick={() => removeStudyDocument(original.row.original)}>
                    <XCircle />
                </button>
            ),
        },
    ];

    const unassignedTableColumns = [
        {
            id: 'name',
            accessorKey: 'name',
            alignLeft: true,
            cell: (props) => {
                /* eslint-disable-next-line react/prop-types */
                return <span>{props.getValue()}</span>;
            },
            header: 'File Name',
            size: '450',
        },
        {
            id: 'category',
            accessorKey: 'category',
            cell: (original) => (
                /* eslint-disable-next-line react/prop-types */
                <select value={original.row.original.category} onChange={(e) => handleUnassignedFileTypeChange(e, original.row)}>
                    <optgroup label="Data Files">
                        {fileTypes?.data.map((op) => (
                            <option value={op.name} key={_.uniqueId()}>
                                {op.name}
                            </option>
                        ))}
                    </optgroup>
                    <optgroup label="Metadata">
                        {fileTypes?.metadata.map((op) => (
                            <option value={op.name} key={_.uniqueId()}>
                                {op.name}
                            </option>
                        ))}
                    </optgroup>
                    <optgroup label="Data Dictionary">
                        {fileTypes?.dictionary.map((op) => (
                            <option value={op.name} key={_.uniqueId()}>
                                {op.name}
                            </option>
                        ))}
                    </optgroup>
                    <optgroup label="Study Documents">
                        {fileTypes?.document.map((op) => (
                            <option value={op.name} key={_.uniqueId()}>
                                {op.name}
                            </option>
                        ))}
                    </optgroup>
                    <optgroup label="Other">
                        {fileTypes?.other.map((op) => (
                            <option value={op.name} key={_.uniqueId()}>
                                {op.name}
                            </option>
                        ))}
                    </optgroup>
                </select>
            ),
            header: 'File Type',
            size: '350',
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
        {
            id: 'delete',
            accessorKey: '',
            cell: (props) => {
                return (
                    <span>
                        {/* eslint-disable-next-line react/prop-types */}
                        <DeleteFileModal
                            fileId={props.row.original.id}
                            fileName={props.row.original.name}
                            files={unassignedFiles}
                            setFiles={setUnassignedFiles}
                        />
                    </span>
                );
            },
            header: 'Delete',
        },
    ];

    const tableColumns = [
        {
            id: 'expander',
            size: 450,
            alignLeft: true,
            /* eslint-disable-next-line react/prop-types */
            Header: ({ getToggleAllRowsExpandedProps }) => <span {...getToggleAllRowsExpandedProps()}>File Name</span>,
            /* eslint-disable-next-line react/prop-types */
            Cell: ({ row }) =>
                /* eslint-disable-next-line react/prop-types */
                row.canExpand && row.depth === 0 ? (
                    /* eslint-disable-next-line react/prop-types */
                    <span {...row.getToggleRowExpandedProps({})}>
                        {/* eslint-disable-next-line react/prop-types */}
                        <span>{row.isExpanded ? <OpenBundle /> : <ClosedBundle />}</span>
                        {/* eslint-disable-next-line react/prop-types */}
                        {` ${row.original.name} `}
                        {/* eslint-disable-next-line react/prop-types */}
                        {row.isExpanded ? <ChevronDown /> : <ChevronRight />}
                    </span>
                ) : (
                    <span
                        /* eslint-disable-next-line react/prop-types */
                        {...row.getToggleRowExpandedProps({
                            style: {
                                /* eslint-disable-next-line react/prop-types */
                                marginLeft: `${row.depth * 3}rem`,
                            },
                        })}
                    >
                        {/* eslint-disable-next-line react/prop-types */}
                        {!(row.original.name === 'button') ? (
                            <span>
                                <span style={{ fontSize: '20px', color: '#437b83' }}>
                                    <SubBranchIcon /> <PaperFile />
                                </span>{' '}
                                {/* eslint-disable-next-line react/prop-types */}
                                {row.original.name}{' '}
                            </span> /* eslint-disable-next-line react/prop-types */
                        ) : selectUnassignedFile.id === row.original.id && selectUnassignedFile.toggle ? (
                            <span>
                                <select
                                    value=""
                                    onChange={(e) =>
                                        handleAddChild(
                                            e.target.value,
                                            row,
                                            bundleFiles,
                                            unassignedFiles,
                                            setUnassignedFiles,
                                            setBundleFiles,
                                            setSelectUnassignedFile
                                        )
                                    }
                                >
                                    {/* eslint-disable-next-line array-callback-return */}
                                    {unassignedFiles.map((file) => {
                                        for (const item of childFileTypes) {
                                            if (file.category === item.name) {
                                                return <option value={file.id}>{file.name}</option>;
                                            }
                                        }
                                    })}
                                    <option value=""></option>
                                </select>
                                <button
                                    className={classes.cancelButton}
                                    /* eslint-disable-next-line react/prop-types */
                                    onClick={() => setSelectUnassignedFile({ id: row.original.id, toggle: false })}
                                >
                                    Cancel
                                </button>
                            </span>
                        ) : (
                            <button
                                /* eslint-disable-next-line react/prop-types */
                                id={row.original.id}
                                className={classes.assignFilesButton}
                                disabled={
                                    !(
                                        // eslint-disable-next-line array-callback-return
                                        (
                                            unassignedFiles?.filter((f) => {
                                                for (const i of childFileTypes) {
                                                    if (i.name === f.category) {
                                                        return f;
                                                    }
                                                }
                                            }).length > 0
                                        )
                                    )
                                }
                                /* eslint-disable-next-line react/prop-types */
                                onClick={() => setSelectUnassignedFile({ id: row.original.id, toggle: true })}
                            >
                                <span className={classes.assignFilesIcon}>
                                    <Plus />
                                </span>
                                Add Unassigned File
                            </button>
                        )}
                    </span>
                ),
        },
        {
            id: 'category',
            size: 300,
            Header: 'File Type',
            Cell: (original) =>
                original.row.original.name !== 'button' ? (
                    /* eslint-disable-next-line react/prop-types */
                    original.row.depth > 0 ? (
                        <select
                            value={original.row.original.category}
                            className={classes.selectFileType}
                            onChange={(e) => handleFileTypeChange(e, original.row)}
                        >
                            {childFileTypes.map((op) => (
                                <option value={op.name} key={_.uniqueId()}>
                                    {op.name}
                                </option>
                            ))}
                        </select>
                    ) : (
                        <select
                            value={original.row.original.category}
                            className={classes.selectFileType}
                            onChange={(e) => handleFileTypeChange(e, original.row)}
                        >
                            {fileTypes.data.map((op) => (
                                <option value={op.name} key={_.uniqueId()}>
                                    {op.name}
                                </option>
                            ))}
                        </select>
                    )
                ) : null,
        },
        {
            id: 'size',
            size: 150,
            Header: 'File Size',
            Cell: (original) => {
                if (original.row.original.size) {
                    return <span>{convertFileSize(original.row.original.size)}</span>;
                } else {
                    return <span></span>;
                }
            },
        },
        {
            id: 'remove',
            size: 150,
            Header: 'Remove',
            Cell: (original) =>
                original.row.original.name !== 'button' ? (
                    <button className={classes.removeIcon} onClick={() => removeFile(original.row)}>
                        <XCircle />
                    </button>
                ) : null,
        },
    ];

    const handleAddDataFile = (newId) => {
        const bundles = [...bundleFiles];
        const unassigned = [...unassignedFiles];
        const newUnassigned = unassigned.filter((file) => file.id !== parseInt(newId));
        const fileToAdd = unassigned.filter((file) => file.id === parseInt(newId));
        setUnassignedFiles([...newUnassigned]);
        setBundleFiles([...bundles, ...fileToAdd]);
        setSelectDataFile(false);
    };

    const handleAddStudyFile = (newId) => {
        const studyDocs = [...studyDocuments];
        const unassigned = [...unassignedFiles];
        const newUnassigned = unassigned.filter((file) => file.id !== parseInt(newId));
        const fileToAdd = unassigned.filter((file) => file.id === parseInt(newId));
        setUnassignedFiles([...newUnassigned]);
        setStudyDocuments([...studyDocs, ...fileToAdd]);
        setSelectStudyDocument(false);
    };

    const handleFileTypeChange = (e, row) => {
        const arr = [...bundleFiles];
        /* eslint-disable-next-line react/prop-types */
        if (row.depth === 0) {
            arr.forEach((item) => {
                /* eslint-disable-next-line react/prop-types */
                if (item.id === row.original.id) {
                    item.category = e.target.value;
                }
            });
        } else {
            for (const item of arr) {
                /* eslint-disable-next-line react/prop-types */
                const index = item.childFiles.findIndex((child) => child.id === row.original.id);
                if (index > -1) {
                    item.childFiles[index].category = e.target.value;
                }
            }
        }
        setBundleFiles([...arr]);
    };

    const handleUnassignedFileTypeChange = (e, row) => {
        const arr = [...unassignedFiles];
        for (const item of arr) {
            /* eslint-disable-next-line react/prop-types */
            if (item.id === row.original.id) {
                item.category = e.target.value;
            }
        }
        setUnassignedFiles([...arr]);
    };

    const handleStudyFileTypeChange = (e, row) => {
        const arr = [...studyDocuments];
        for (const item of arr) {
            /* eslint-disable-next-line react/prop-types */
            if (item.id === row.original.id) {
                item.category = e.target.value;
            }
        }
        setStudyDocuments([...arr]);
    };

    const removeChildById = (key) => {
        const arr = [...bundleFiles];
        let removedFiles = {};
        for (const item of arr) {
            const index = item.childFiles.findIndex((child) => child.id === key);
            if (index > -1) {
                removedFiles = item.childFiles.splice(index, 1);
            }
        }
        setBundleFiles([...arr]);
        setUnassignedFiles([...unassignedFiles, removedFiles[0]]);
    };

    const removeParentById = (key) => {
        const arr = [...bundleFiles];
        const newArr = arr.filter((item) => item.id !== key);
        const remove = arr.filter((item) => item.id === key);
        const removedChildren = remove[0].childFiles.filter((child) => child.name !== 'button');
        const removedFiles = [
            {
                name: remove[0]?.name,
                size: remove[0]?.size,
                category: remove[0]?.category,
                id: remove[0]?.id,
                childFiles: [],
            },
            ...removedChildren,
        ];
        setBundleFiles([...newArr]);
        setUnassignedFiles([...unassignedFiles, ...removedFiles]);
    };

    const removeStudyDocument = (key) => {
        const arr = [...studyDocuments];
        const newArr = arr.filter((item) => item.id !== key.id);
        const remove = arr.filter((item) => item.id === key.id);
        setStudyDocuments([...newArr]);
        setUnassignedFiles([...unassignedFiles, ...remove]);
    };

    const removeChildButtons = () => {
        const arr = [...bundleFiles];
        for (const item of arr) {
            const index = item.childFiles.findIndex((child) => child.name === 'button');
            if (index > -1) {
                item.childFiles.splice(index, 1);
            }
        }
        setBundleFiles([...arr]);
    };

    const removeParentButtons = () => {
        const arr = [...bundleFiles];
        const newArr = arr.filter((item) => item.name !== 'button');
        setBundleFiles([...newArr]);
    };

    const removeFile = (file) => {
        if (file.depth === 0) {
            removeParentById(file.original.id);
        } else {
            removeChildById(file.original.id);
        }
    };

    const createButton = (id) => {
        return {
            id: `button_${id}`,
            name: 'button',
            category: '',
            size: '',
        };
    };

    const addFilesButton = () => {
        bundleFiles.forEach((bundle) => {
            if (bundle.childFiles?.length < 2 && bundle.childFiles[0]?.name !== 'button') {
                bundle.childFiles = [...bundle.childFiles, createButton(bundle.id)];
            }
        });
    };

    const updateBundles = async () => {
        removeParentButtons();
        removeChildButtons();
        const body = {
            submissionId: parseInt(submissionId),
            bundles: bundleFiles,
            documents: studyDocuments,
            unassigned: unassignedFiles,
        };
        const updateBundleResult = await restPost(DI_UPDATE_BUNDLES, body, {
            showLoading: true,
            showSuccess: true,
            successMessage: 'Successfully updated bundles',
            errorMessage: 'Error with updating bundles',
        });
        if (updateBundleResult.status === 200 || updateBundleResult.status === 201) {
            setTimeout(function () {
                router.reload();
            }, 500);
        }
    };

    const handlePrevious = async () => {
        const body = {
            submissionId: parseInt(submissionId),
        };
        const previousResult = await restPost(DI_PREVIOUS_PAGE, body, {
            showLoading: true,
            showSuccess: false,
            successMessage: 'Successfully set submission back to upload files step',
            errorMessage: 'An error occurred. If issues persist, please contact the RADx Support Team.',
        });
        if (previousResult.status === 200 || previousResult.status === 201) {
            setTimeout(function () {
                router.reload();
            }, 500);
        }
    };

    return (
        <div>
            <CalloutBox
                className={classes.instructionsContainer}
                body={
                    <div>
                        The system automatically categorizes files based on their naming conventions. After categorization, the system may
                        automatically assign files to bundles or display them as solitary files in the ‘Bundled Files’ table. Each bundle
                        includes a data file as well as their supporting files: metadata and data dictionary files. Study documents, such as
                        README files, will appear in the 'Study Documents' table, and will not be bundled with other files. Files that are
                        not categorized into either of these tables will be placed in the 'Unassigned Files' table and will require action
                        before proceeding. To remove a file from the Bundled Files or Study Documents table, please use the ‘Remove’ icon on
                        the right. This will move the file to the Unassigned Files table where several actions can be taken.
                    </div>
                }
            />
            <Row className="mb-4">
                <Form.Label className={classes.uploadLabel}> Bundled Files</Form.Label>
                {addFilesButton()}
                <ExpandableTable tableData={bundleFiles} tableColumns={tableColumns} ariaCaption="" />
                {/* eslint-disable-next-line array-callback-return */}
                {unassignedFiles?.filter((f) => {
                    for (const i of fileTypes.data) {
                        if (i.name === f.category) {
                            return f;
                        }
                    }
                }).length > 0 && (
                    <Row className="mb-4">
                        <Col>
                            {selectDataFile ? (
                                <span>
                                    <select value="" onChange={(e) => handleAddDataFile(e.target.value)}>
                                        {/* eslint-disable-next-line array-callback-return */}
                                        {unassignedFiles.map((file) => {
                                            for (const item of fileTypes.data) {
                                                if (file.category === item.name) {
                                                    return (
                                                        <option value={file.id} key={_.uniqueId()}>
                                                            {file.name}
                                                        </option>
                                                    );
                                                }
                                            }
                                        })}
                                        <option value=""></option>
                                    </select>
                                    <button className={classes.cancelButton} onClick={() => setSelectDataFile(false)}>
                                        Cancel
                                    </button>
                                </span>
                            ) : (
                                <button className={classes.addDataFilesButton} onClick={() => setSelectDataFile(true)}>
                                    <span className={classes.assignFilesIcon}>
                                        <Plus />
                                    </span>{' '}
                                    Add Data File
                                </button>
                            )}
                        </Col>
                    </Row>
                )}
            </Row>
            <Row className={`${classes.studyDocsContainer} mb-4`}>
                <Form.Label className={classes.uploadLabel}>Study Documents</Form.Label>
                <Table tableHeaders={studyDocumentsColumns} tableRows={studyDocuments} variant="dataIngest" ariaCaption="" />
            </Row>
            {unassignedFiles?.filter((f) => {
                for (const i of fileTypes.document) {
                    if (i.name == f.category) {
                        return f;
                    }
                }
            }).length > 0 && (
                <Row className="mb-4">
                    <Col>
                        {selectStudyDocument ? (
                            <span>
                                <select value="" onChange={(e) => handleAddStudyFile(e.target.value)}>
                                    {/* eslint-disable-next-line array-callback-return */}
                                    {unassignedFiles.map((file) => {
                                        for (const item of fileTypes.document) {
                                            if (file.category === item.name) {
                                                return (
                                                    <option value={file.id} key={_.uniqueId()}>
                                                        {file.name}
                                                    </option>
                                                );
                                            }
                                        }
                                    })}
                                    <option value=""></option>
                                </select>
                                <button className={classes.cancelButton} onClick={() => setSelectStudyDocument(false)}>
                                    Cancel
                                </button>
                            </span>
                        ) : (
                            <button className={classes.addDataFilesButton} onClick={() => setSelectStudyDocument(true)}>
                                <span className={classes.assignFilesIcon}>
                                    <Plus />
                                </span>{' '}
                                Add Study Document
                            </button>
                        )}
                    </Col>
                </Row>
            )}
            {unassignedFiles?.length > 0 && (
                <Row className={`${classes.unassignedContainer} mb-4`}>
                    <Form.Label className={classes.unassignedLabel}>Unassigned Files</Form.Label>
                    <p className={classes.textContent}>
                        The following files were either unable to be categorized or were not able to be assigned to a bundle. Categorize
                        each unassigned file by selecting an option from the dropdown in the ‘File Type’ column. Then, you can assign the
                        file to a bundle above by using either the ‘Add Unassigned File’ or ‘Add Data File’ buttons in the ‘Uploaded Files’
                        table. To remove individual files, please click the ’Delete’ icon. This will delete them from the submission package
                        permanently.
                    </p>
                    <Table tableHeaders={unassignedTableColumns} tableRows={unassignedFiles} variant="dataIngest" ariaCaption="" />
                </Row>
            )}
            <DataIngestFormNavigation
                activeStep={activeStep}
                setActiveStep={setActiveStep}
                totalSteps={totalSteps}
                disabled={canProceed(childFileTypes, fileTypes, unassignedFiles)}
                submissionId={submissionId}
                handleNextPage={updateBundles}
                handlePrevious={handlePrevious}
            />
        </div>
    );
};

CategorizeFiles.propTypes = {
    activeStep: PropTypes.number,
    bundlesData: PropTypes.shape({
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
    fileTypes: PropTypes.shape(
        PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.string,
                name: PropTypes.string,
                categoryGroup: PropTypes.string,
            })
        )
    ),
    setActiveStep: PropTypes.func,
    submissionId: PropTypes.number,
    totalSteps: PropTypes.number,
};

export default CategorizeFiles;
