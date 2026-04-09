import React from 'react';
import SearchResultViewToggle from './SearchResultViewToggle';
import './SearchResultViewToggle.module.scss';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
export default {
    title: 'Components/Toggle/CustomToggles/SearchResultViewToggle',
    component: SearchResultViewToggle,
    parameters: {
        backgrounds: {
            default: 'light grey',
            values: [
                { name: 'light grey', value: '#E9E9E9' },
                { name: 'white', value: '#F0F0F0' },
            ],
        },
    },
};
const state = 'table';

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
const Template = (args) => (
    <>
        <SearchResultViewToggle {...args} /> <span> Some styling discrepancies unfixable in storybook for this component</span>
    </>
);

export const Base = Template.bind({});
SearchResultViewToggle.args = {
    toggleState: state,
};
