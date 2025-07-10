import React from 'react';
import FormStepper from './FormStepper';

const steps = [
    {
        label: 'Step 1',
    },
    {
        label: 'Step 2',
    },
    {
        label: 'Step 3',
    },
];

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
export default {
    title: 'Components/FormStepper',
    component: FormStepper,
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
const Template = (args) => <FormStepper {...args} />;

export const DIFormStepper = Template.bind({});
DIFormStepper.args = {
    steps: steps,
    activeStep: 0,
};
