import React from 'react';
import BarGraph from './BarGraph';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
export default {
    title: 'Components/BarGraph',
    component: BarGraph,
    argTypes: { handleClick: { action: 'handleClick' } },
};

const data = { labels: [1, 2, 3, 4, 5], datasets: [{ type: 'bar', label: '', id: 1, data: [12, 6, 5, 8, 10] }] };

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
const Template = (args) => <BarGraph {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    title: 'Primary Bar Graph',
    variant: 'primary',
    data: data,

    // size: 'medium',
};
