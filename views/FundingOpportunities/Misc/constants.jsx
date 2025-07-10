import { dateFormatter } from '../../../lib/componentHelpers/SupportFunctions/dateFormatter';

export const fundingOpsTableColumns = () => {
    return [
        {
            id: 'title',
            accessorKey: 'title',
            cell: (props) => {
                return (
                    <a href={props.row.original.linkUrl} target="_blank" rel="noopener noreferrer">
                        {props.getValue()}
                    </a>
                );
            },
            header: 'Title',
            size: '280',
            alignLeft: true,
        },
        {
            id: 'noticeNumber',
            accessorKey: 'noticeNumber',
            cell: (info) => info.getValue(),
            header: 'NOFO / Notice Number',
            size: '130',
            alignLeft: true,
        },
        {
            id: 'description',
            accessorKey: 'description',
            cell: (info) => info.getValue(),
            header: 'Description',
            size: '300',
            alignLeft: true,
        },
        {
            id: 'startDate',
            accessorKey: 'startDate',
            cell: (info) => dateFormatter(info.getValue(), 'US Date'),
            header: 'Posted Date',
            size: '120',
            alignLeft: true,
        },
        {
            id: 'expirationDate',
            accessorKey: 'expirationDate',
            cell: (info) => dateFormatter(info.getValue(), 'US Date'),
            header: 'Final Submission Date',
            size: '150',
            alignLeft: true,
        },
        {
            id: 'activityCode',
            accessorKey: 'activityCode',
            cell: (info) => (info.getValue() ? info.getValue() : 'N/A'),
            header: 'Activity Code',
            size: '120',
            alignLeft: true,
        },
    ];
};
