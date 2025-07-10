import React from 'react';
import SearchBar from './SearchBar';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
export default {
    title: 'Components/SearchBar',
    component: SearchBar,
    argTypes: { onClick: { action: 'onClick' } },
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
const Template = (args) => <SearchBar {...args} />;

export const StudySearch = Template.bind({});
StudySearch.args = { topic: 'Studies' };
