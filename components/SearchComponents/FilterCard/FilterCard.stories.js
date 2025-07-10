import React from 'react';
import FilterCard from './FilterCard';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
export default {
    title: 'Components/FilterCard',
    component: FilterCard,
    argTypes: { handleClick: { action: 'handleClick' } },
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
const Template = (args) => <FilterCard {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    label: 'Primary FilterCard',
    variant: 'primary',
    // size: 'medium',
};
