/* eslint-disable max-len */
import React from 'react';

export const columns = [
    // button column
    {
        accessorKey: 'button',
        // TODO add modal part
        cell: (props) => {
            return <div></div>;
        },
        header: '',
        size: 50,
    },
    {
        accessorKey: 'email',
        cell: (info) => info.getValue(),
        header: 'Email',
        sort: true,
        alignLeft: true,
    },
    {
        accessorKey: 'firstName',
        cell: (info) => info.getValue(),
        header: 'First Name',
        sort: true,
        alignLeft: true,
    },
    {
        accessorKey: 'lastName',
        cell: (info) => info.getValue(),
        header: 'Last Name',
        sort: true,
        alignLeft: true,
    },
    {
        accessorKey: 'jobTitle',
        cell: (info) => info.getValue(),
        header: 'Job Title/Position',
        sort: true,
        alignLeft: true,
    },
    {
        accessorKey: 'institution',
        cell: (info) => {
            return <span>{info.getValue() === null ? 'null value' : info.getValue()}</span>;
        },
        header: 'Institution Name',
        sort: true,
        alignLeft: true,
    },
];
