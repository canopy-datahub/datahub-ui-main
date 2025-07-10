import React from 'react';
import Table from './Table';

const tableColumns = [
    {
        accessorKey: 'firstName',
        cell: (info) => info.getValue(),
    },
    {
        id: 'lastName',
        accessorKey: 'lastName',
        cell: (info) => info.getValue(),
        header: 'Last Name',
    },
];

const tableData = [
    {
        firstName: 'tanner',
        lastName: 'linsley',
    },
    {
        firstName: 'tandy',
        lastName: 'miller',
    },
    {
        firstName: 'joe',
        lastName: 'dirte',
    },
];

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
export default {
    title: 'Components/Table',
    component: Table,
    argTypes: { handleClick: { action: 'handleClick' } },
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
const Template = (args) => <Table {...args} />;

export const StudyTable = Template.bind({});
StudyTable.args = {
    tableRows: tableData,
    tableHeaders: tableColumns,
};
