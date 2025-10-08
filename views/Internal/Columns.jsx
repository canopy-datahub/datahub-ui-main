import Link from 'next/link';
import { toCamel } from '../../lib/componentHelpers/SupportFunctions/toCamel';
import { calculateResolutionTime } from '../../lib/componentHelpers/SupportFunctions/calculateResolutionTime';
import { dateFormatter } from '../../lib/componentHelpers/SupportFunctions/dateFormatter';

export const allSupportTracker = [
    {
        accessorKey: 'id',
        cell: (props) => {
            return (
                <Link href={`/internal/supportDashboard/${props.getValue()}`} legacyBehavior>{`#${props.getValue()} - 
                ${props?.row?.original?.requestTitle}`}</Link>
            );
        },
        header: 'Id - Title',
        size: 350,
        alignLeft: true,
    },
    {
        accessorKey: 'status',
        cell: (info) => toCamel(info.getValue()),
        header: 'Status',
        size: 140,
        alignLeft: true,
    },
    {
        accessorKey: 'requestType',
        cell: (info) => info.getValue(),
        header: 'Type',
        size: 180,
        alignLeft: true,
    },
    {
        accessorKey: 'severity',
        cell: (info) => info.getValue(),
        header: 'Severity',
        size: 130,
        alignLeft: true,
    },
    {
        accessorKey: 'fullName',
        cell: (info) => info.getValue(),
        header: 'Requestor Name',
        size: 200,
        alignLeft: true,
    },
    {
        accessorKey: 'createdAt',
        cell: (info) => dateFormatter(info.getValue()),
        header: 'Created At',
        size: 200,
        alignLeft: true,
    },
    {
        accessorKey: 'resolvedAt',
        cell: (info) => (info.getValue() ? dateFormatter(info.getValue()) : 'N/A'),
        header: 'Resolved At',
        size: 200,
        alignLeft: true,
    },
    {
        accessorKey: 'assignedAt',
        cell: (info) => (info.getValue() ? dateFormatter(info.getValue()) : 'N/A'),
        header: 'Assigned At',
        size: 200,
        alignLeft: true,
    },
    {
        accessorKey: 'assigneeEmail',
        cell: (info) => info.getValue(),
        header: 'Assignee',
        size: 200,
        alignLeft: true,
    },
    {
        accessorKey: 'updateAt',
        cell: (info) => dateFormatter(info.getValue()),
        header: 'Last Modified At',
        size: 200,
        alignLeft: true,
    },
    {
        accessorKey: 'resolutionType',
        cell: (info) => info.getValue(),
        header: 'Resolution Status',
        size: 180,
        alignLeft: true,
    },    
    {
        accessorKey: '',
        cell: (props) => {
            return <span>{calculateResolutionTime(props?.row?.original?.assignedAt, props?.row?.original?.resolvedAt)}</span>;
        },
        header: 'Resolved Time',
        size: 170,
        alignLeft: true,
        removeSort: true,
    },
];
