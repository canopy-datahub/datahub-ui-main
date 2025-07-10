import Link from 'next/link';
import { dateFormatter } from '../../../lib/componentHelpers/SupportFunctions/dateFormatter';

export const workbenchRequestDashboardTableColumns = () => {
    return [
        {
            id: 'id',
            accessorKey: 'id',
            cell: (info) => {
                return <Link href={`/workbenchRequestDashboard/${info.getValue()}`}>{`#${info.getValue()}`}</Link>;
            },
            header: 'ID',
            size: '80',
        },
        {
            id: 'name',
            accessorKey: 'name',
            cell: (info) => info.getValue(),
            header: 'Name',
            alignLeft: true,
        },
        {
            id: 'email',
            accessorKey: 'email',
            cell: (info) => info.getValue(),
            header: 'Email',
            alignLeft: true,
        },
        {
            id: 'analyticsSoftwareRequest',
            accessorKey: 'analyticsSoftwareRequest',
            cell: (info) => info.getValue(),
            header: 'Analytics Software ',
            size: '125',
        },
        {
            id: 'dccAffiliated',
            accessorKey: 'dccAffiliated',
            cell: (info) => (info.getValue() ? 'Yes' : 'No'),
            header: '(C)DCC?',
            size: '100',
        },
        {
            id: 'status',
            accessorKey: 'status',
            cell: (info) => info.getValue(),
            header: 'Status',
            size: '110',
        },
        {
            id: 'requestDate',
            accessorKey: 'requestDate',
            cell: (info) => dateFormatter(info.getValue()),
            header: 'Request Date',
            size: '125',
        },
        {
            id: 'responseDate',
            accessorKey: 'responseDate',
            cell: (info) => (info.getValue() !== null ? dateFormatter(info.getValue()) : 'N/A'),
            header: 'Response Date',
            size: '125',
        },
    ];
};
