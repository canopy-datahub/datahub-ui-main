/* eslint-disable react/prop-types */
/* eslint-disable multiline-ternary */
import React from 'react';
import ExpandableTable from './ExpandableTable';
import { ChevronDown, ChevronRight, FileEarmarkPlus, FolderFill } from 'react-bootstrap-icons';

const tableColumns = [
    {
        id: 'expander',
        Header: ({ getToggleAllRowsExpandedProps, isAllRowsExpanded }) => (
            <span {...getToggleAllRowsExpandedProps()}>
                {
                    // isAllRowsExpanded ? <ChevronDown /> : <ChevronRight />
                }
                File Name
            </span>
        ),
        Cell: ({ row }) =>
            row.canExpand ? (
                <span {...row.getToggleRowExpandedProps({})}>
                    {<FolderFill />}
                    {` ${row.original.fileName} `}
                    {row.isExpanded ? <ChevronDown /> : <ChevronRight />}
                </span>
            ) : (
                <span
                    {...row.getToggleRowExpandedProps({
                        style: {
                            marginLeft: `${row.depth * 2}rem`,
                        },
                    })}
                >
                    {<FileEarmarkPlus />}
                    {` ${row.original.fileName}`}
                </span>
            ),
    },
    {
        id: 'fileType',
        Header: 'File Type',
        accessor: 'fileType',
    },
    {
        id: 'fileSize',
        Header: 'File Size',
        accessor: 'fileSize',
    },
];

const tableData = [
    {
        fileName: 'orig_file.csv',
        fileType: 'Orig',
        fileSize: '500KB',
        subRows: [
            {
                fileName: 'meta_file1.bio',
                fileType: 'Meta',
                fileSize: '250KB',
            },
            {
                fileName: 'dict_file1.xlsx',
                fileType: 'Dict',
                fileSize: '312KB',
            },
        ],
    },
    {
        fileName: 'transform_file.csv',
        fileType: 'Transform',
        fileSize: '500KB',
        subRows: [
            {
                fileName: 'meta_file2.bio',
                fileType: 'Meta',
                fileSize: '250KB',
            },
            {
                fileName: 'dict_file2.xlsx',
                fileType: 'Dict',
                fileSize: '312KB',
            },
        ],
    },
];

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
export default {
    title: 'Components/ExpandableTable',
    component: ExpandableTable,
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
const Template = (args) => <ExpandableTable {...args} />;

export const DIExpandableTable = Template.bind({});
DIExpandableTable.args = {
    tableRows: tableData,
    tableHeaders: tableColumns,
};
