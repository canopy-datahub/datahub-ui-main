import DeleteSubmissionModal from './DeleteSubmissionModal';
import Link from 'next/link';
import _ from 'lodash';

export const submitterTableColumns = (submissionsData, setUserSubmissions, status) => {
    let submitterDashColumns;

    switch (status) {
        case 'in_progress':
            submitterDashColumns = [
                {
                    accessorKey: 'id',
                    cell: (info) => {
                        if (_.startCase(status) === 'In Progress') {
                            return (
                                <Link href={`/dataIngest/${info.getValue()}`} legacyBehavior>
                                    {info.getValue()}
                                </Link>
                            );
                        } else {
                            return <span>{info.getValue()}</span>;
                        }
                    },
                    header: 'ID',
                    size: 80,
                },
                {
                    accessorKey: 'studyName',
                    cell: (info) => info.getValue(),
                    header: 'Study',
                    size: 300,
                },
                {
                    accessorKey: 'createdDate',
                    cell: (info) => (info.getValue() ? new Date(info.getValue()).toLocaleString() : '-'),
                    header: 'Modified Date',
                    size: 150,
                },
                {
                    accessorKey: '',
                    cell: (info) => {
                        if (_.startCase(info.row.original.status) === 'In Progress') {
                            return (
                                <DeleteSubmissionModal
                                    submissionId={info.row.original.id}
                                    userSubmissions={submissionsData}
                                    setUserSubmissions={setUserSubmissions}
                                />
                            );
                        } else {
                            return '-';
                        }
                    },
                    header: 'Delete',
                    size: 80,
                },
            ];
            break;
        case 'submitted':
            submitterDashColumns = [
                {
                    accessorKey: 'id',
                    cell: (info) => info.getValue(),
                    header: 'ID',
                    size: 80,
                },
                {
                    accessorKey: 'studyName',
                    cell: (info) => info.getValue(),
                    header: 'Study',
                    size: 300,
                },
                {
                    accessorKey: 'submittedDate',
                    cell: (info) => (info.getValue() ? new Date(info.getValue()).toLocaleString() : '-'),
                    header: 'Submitted Date',
                    size: 150,
                },
            ];
            break;
        case 'completed':
            submitterDashColumns = [
                {
                    accessorKey: 'id',
                    cell: (info) => info.getValue(),
                    header: 'ID',
                    size: 80,
                },
                {
                    accessorKey: 'studyName',
                    cell: (info) => info.getValue(),
                    header: 'Study',
                    size: 300,
                },
                {
                    accessorKey: 'submittedDate',
                    cell: (info) => (info.getValue() ? new Date(info.getValue()).toLocaleString() : '-'),
                    header: 'Submitted Date',
                    size: 150,
                },
            ];
    }

    return submitterDashColumns;
};
