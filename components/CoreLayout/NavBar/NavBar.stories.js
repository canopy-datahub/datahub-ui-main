import React from 'react';
import NavigationBar from './NavBar';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
export default {
    title: 'Components/NavigationBar',
    component: NavigationBar,
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

const NavParams = [
    {
        name: 'Study Explorer',
        dropdown: [
            { name: 'Studies', link: '#' },
            { name: 'Study Components', link: '#' },
            { name: 'Datasets', link: '#', children: [{}] },
        ],
    },
    {
        name: 'Helpful Information',
        dropdown: [
            { name: 'About', link: '#' },
            { name: 'News', link: '#' },
            { name: 'RADx Policy', link: '#' },
            { name: 'RADx User Agreement', link: '#' },
        ],
    },
    { name: 'Variables Catalog', link: '#' },
    { name: 'Contact', link: '#' },
];

const ResearcherParms = [...NavParams, { name: 'Support', link: '#' }];

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
const Template = (args) => <NavigationBar {...args} />;

export const Default = Template.bind({});
Default.args = {
    tabList: NavParams,
};

export const Researcher = Template.bind({});
Researcher.args = {
    tabList: ResearcherParms,
};
