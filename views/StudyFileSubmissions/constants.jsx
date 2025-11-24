import Link from 'next/link';
import { dateFormatter } from '../../lib/componentHelpers/SupportFunctions/dateFormatter';

export const submissionsTableColumns = (status) => {
    let tableColumns;

    if (status === 'in_progress') {
        tableColumns = [
            {
                id: 'id',
                accessorKey: 'id',
                cell: (info) => {
                    return <Link href={`/studyFileSubmissions/${info.getValue()}`} legacyBehavior>{`#${info.getValue()}`}</Link>;
                },
                header: 'ID',
                size: 80,
            },
            {
                id: 'studyName',
                accessorKey: 'studyName',
                cell: (info) => info.getValue(),
                header: 'Study Name',
                alignLeft: true,
                size: 250,
            },
            {
                id: 'center',
                accessorKey: 'center',
                cell: (info) => info.getValue(),
                header: 'Center',
                alignLeft: true,
                size: 110,
            },
            {
                id: 'createdAt',
                accessorKey: 'createdAt',
                cell: (info) => info.getValue() ? dateFormatter(info.getValue()) : '-',
                header: 'Created Date',
                alignLeft: true,
                size: 150,
            },
        ];
    } else if (status === 'completed') {
        tableColumns = [
            {
                id: 'studyName',
                accessorKey: 'studyName',
                cell: (info) => <Link href={`/study/${info.row.original.studyId}`} legacyBehavior>{info.getValue()}</Link>,
                header: 'Study Name',
                alignLeft: true,
                size: 250,
            },
            {
                id: 'center',
                accessorKey: 'center',
                cell: (info) => info.getValue(),
                header: 'Center',
                alignLeft: true,
                size: 110,
            },
            {
                id: 'submissionDate',
                accessorKey: 'submissionDate',
                cell: (info) => (info.getValue() ? dateFormatter(info.getValue()) : '-'),
                header: 'Submission Date',
                alignLeft: true,
                size: 150,
            },
        ];
    } else {
        tableColumns = [
            {
                id: 'id',
                accessorKey: 'id',
                cell: (info) => <Link href={`/studyFileSubmissions/${info.getValue()}`} legacyBehavior>{`#${info.getValue()}`}</Link>,
                header: 'ID',
                size: 80,
            },
            {
                id: 'studyName',
                accessorKey: 'studyName',
                cell: (info) => info.getValue(),
                header: 'Study Name',
                alignLeft: true,
                size: 250,
            },
            {
                id: 'center',
                accessorKey: 'center',
                cell: (info) => info.getValue(),
                header: 'Center',
                alignLeft: true,
                size: 110,
            },
            {
                id: 'submissionDate',
                accessorKey: 'submissionDate',
                cell: (info) => (info.getValue() ? dateFormatter(info.getValue()) : '-'),
                header: 'Submission Date',
                alignLeft: true,
                size: 150,
            },
        ];
    }


    return tableColumns;
};
