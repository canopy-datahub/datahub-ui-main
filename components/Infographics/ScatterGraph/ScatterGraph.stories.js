import React from 'react';
import PlotGraph from './ScatterGraph';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
export default {
    title: 'Components/PlotGraph',
    component: PlotGraph,
    argTypes: { handleClick: { action: 'handleClick' } },
};

const dataScatter = {
    datasets: [
        {
            label: 'A dataset',
            data: [
                { x: 2, y: 8 },
                { x: 1, y: 9 },
                { x: 16, y: 8 },
                { x: 8, y: 3 },
                { x: 2, y: 5 },
            ],
            backgroundColor: 'rgba(255, 99, 132, 1)',
        },
    ],
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
const Template = (args) => <PlotGraph {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    title: 'Primary Bar Graph',
    variant: 'primary',
    data: dataPlot,

    // size: 'medium',
};
