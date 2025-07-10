import React from 'react';
import PageHeader from './PageHeader';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
export default {
    title: 'Components/PageHeader',
    component: PageHeader,
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
const Template = (args) => <PageHeader {...args} />;

export const Home = Template.bind({});
Home.args = {};
