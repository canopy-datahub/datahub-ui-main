import { Trash } from 'react-bootstrap-icons';

export const unassignedTableColumns = [
    {
        id: 'fileName',
        accessorKey: 'fileName',
        alignLeft: true,
        cell: (props) => {
            return <span>{props.getValue()}</span>;
        },
        header: 'File Name',
        size: '750',
    },
    {
        id: 'fileType',
        accessorKey: 'fileType',
        cell: (props) => {
            return <span>{props.getValue()}</span>;
        },
        header: 'File Type',
        size: '200',
    },
    {
        id: 'fileSize',
        accessorKey: 'fileSize',
        header: 'File Size',
        size: '150',
    },
    {
        id: 'delete',
        accessorKey: '',
        cell: (props) => {
            return (
                <span>
                    {/* this will be an API call to delete service */}
                    <button type="button" style={{ border: 'none', color: 'red', fontSize: '20px' }} onClick={() => ''}>
                        <Trash />
                    </button>
                </span>
            );
        },
        header: 'Delete',
    },
];
