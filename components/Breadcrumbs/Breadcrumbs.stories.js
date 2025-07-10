import React from 'react';
import Breadcrumbs from './Breadcrumbs';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
export default {
    title: 'Components/Breadcrumbs',
    component: Breadcrumbs,
    parameters: {
        backgrounds: {
            default: 'white',
            values: [
                { name: 'light grey', value: '#E9E9E9' },
                { name: 'white', value: '#F0F0F0' },
            ],
        },
    },
};

const testData = [
    { page: 'Test 1', pageLink: 'Test 1' },
    { page: 'Test 12', pageLink: 'Test 1' },
    { page: 'Test 13', pageLink: 'Test 1' },
    { page: 'Test 14', pageLink: 'Test 1' },
];

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
const Template = (args) => <Breadcrumbs {...args} />;

export const Home = Template.bind({});
Home.args = {};

export const MultiplePages = Template.bind({});
MultiplePages.args = {
    crumbs: testData,
};
