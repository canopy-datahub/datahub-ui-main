/* eslint-disable multiline-ternary */
import { Trash } from 'react-bootstrap-icons';
import EditIcon from '../../../components/Images/svg/EditIcon';
import classes from './StudyRegistrationDash.module.scss';
import { dateFormatter } from '../../../lib/componentHelpers/SupportFunctions/dateFormatter';
import DeleteStudyRegModal from './DeleteStudyRegModal';
import Link from 'next/link';

export const studyRegistrationTableColumns = (userRole, handleEdit, handleDeleteStudy, handleDeleteStudyFiles, selectedItem) => {
    let tableColumns;

    tableColumns = [
        {
            id: 'studyName',
            accessorKey: 'studyName',
            cell: (info) =>
                selectedItem.label === 'Approved' ? (
                    <Link href={`/study/${info.row.original.studyId}`} legacyBehavior><a className={classes.link}>{info.getValue()}</a></Link>
                ) : (
                    info.getValue()
                ),
            header: 'Study Name',
            alignLeft: true,
            size: 250,
        },
        {
            id: 'status',
            accessorKey: 'status',
            cell: (info) => info.getValue(),
            header: 'Status',
            alignLeft: true,
            size: 120,
        },
        {
            id: 'createdAt',
            accessorKey: 'createdAt',
            cell: (info) => dateFormatter(info.getValue(), 'US Date'),
            header: 'Created Date',
            alignLeft: true,
            size: 120,
        },
    ];
    if (userRole === 'curator') {
        tableColumns.push({
            id: 'edit',
            accessorKey: '',
            cell: (info) => (
                <button type="button" aria-label="Edit study registration" className={classes.editIcon} onClick={() => handleEdit(userRole, info.row.original.studyId)}>
                    <EditIcon />
                </button>
            ),
            header: 'Edit',
            size: 80,
        });
        if (selectedItem.label !== 'Approved') {
            tableColumns.push({
                id: 'delete',
                accessorKey: '',
                cell: (info) => (
                    <DeleteStudyRegModal
                        handleDelete={handleDeleteStudy}
                        studyId={info.row.original.studyId}
                        modalTitle={
                            <div>
                                <span>Confirm Study Registration Record Deletion</span>
                            </div>
                        }
                        bodyComp={
                            <div className="m-2">
                                <span>You are about to delete the study registration record for:</span>
                                <div className="my-4">
                                    <b>
                                        {info.row.original.phs}: {info.row.original.studyName}
                                    </b>
                                </div>
                                <span>
                                    This will also delete all in progress, in review, and approved submissions regarding this study. Are you
                                    sure you wish to delete?
                                </span>
                            </div>
                        }
                        closeButtonLabel={<span className={classes.submitModalButton}>Delete Record</span>}
                    />
                ),
                header: 'Delete',
                size: 80,
            });
        }
        if (selectedItem.label === 'Approved') {
            tableColumns.push(
                {
                    id: 'deleteStudyFiles',
                    accessorKey: '',
                    cell: ({ row }) =>
                        row.original.hasDataFiles ? (
                            <DeleteStudyRegModal
                                handleDelete={handleDeleteStudyFiles}
                                studyId={row.original.studyId}
                                modalTitle={
                                    <div>
                                        <span>Confirm Study File Deletion</span>
                                    </div>
                                }
                                bodyComp={
                                    <div className="m-2">
                                        <span>You are about to delete all files for the study:</span>
                                        <div className="my-4">
                                            <b>
                                                {row.original.phs}: {row.original.studyName}
                                            </b>
                                        </div>
                                        <span>
                                            Only the files will be deleted, not the study. This will also delete all in progress, in review,
                                            and approved submissions regarding these files. Are you sure you wish to delete?
                                        </span>
                                    </div>
                                }
                                closeButtonLabel={<span className={classes.submitModalButton}>Delete Study Files</span>}
                            />
                        ) : (
                            <Trash className={classes.disabled}></Trash>
                        ),
                    header: 'Delete Study Files',
                    size: 80,
                },
                {
                    id: 'deleteStudy',
                    accessorKey: '',
                    cell: (info) => (
                        <DeleteStudyRegModal
                            handleDelete={handleDeleteStudy}
                            studyId={info.row.original.studyId}
                            modalTitle={
                                <div>
                                    <span>Confirm Study Deletion</span>
                                </div>
                            }
                            bodyComp={
                                <div className="m-2">
                                    <span>You are about to delete the study:</span>
                                    <div className="my-4">
                                        <b>
                                            {info.row.original.phs}: {info.row.original.studyName}
                                        </b>
                                    </div>
                                    <span>
                                        This will also delete all in progress, in review, and approved submissions regarding this study. Are
                                        you sure you wish to delete?
                                    </span>
                                </div>
                            }
                            closeButtonLabel={<span className={classes.submitModalButton}>Delete Study</span>}
                        />
                    ),
                    header: 'Delete Study',
                    size: 80,
                }
            );
        }
    }
    if (userRole === 'center' && selectedItem.label === 'Draft') {
        tableColumns.push({
            id: 'edit',
            accessorKey: '',
            cell: (info) => (
                <button type="button" aria-label="Edit study registration" className={classes.editIcon} onClick={() => handleEdit(userRole, info.row.original.studyId)}>
                    <EditIcon />
                </button>
            ),
            header: 'Edit',
            size: 80,
        });
        
        tableColumns.push({
            id: 'delete',
            accessorKey: '',
            cell: (info) => (
                <DeleteStudyRegModal
                    handleDelete={handleDeleteStudy}
                    studyId={info.row.original.studyId}
                    modalTitle={
                        <div>
                            <span>Confirm Study Registration Record Deletion</span>
                        </div>
                    }
                    bodyComp={
                        <div className="m-2">
                            <span>You are about to delete the study registration record for:</span>
                            <div className="my-4">
                                <b>
                                    {info.row.original.phs}: {info.row.original.studyName}
                                </b>
                            </div>
                            <span>
                                This will also delete all in progress, in review, and approved submissions regarding this study. Are you
                                sure you wish to delete?
                            </span>
                        </div>
                    }
                    closeButtonLabel={<span className={classes.submitModalButton}>Delete Record</span>}
                />
            ),
            header: 'Delete',
            size: 80,
        });
    }

    return tableColumns;
};
