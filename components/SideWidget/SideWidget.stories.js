import React from 'react';
import SideWidget from './SideWidget';
import FeedbackIcon from '../Images/svg/FeedbackIcon';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
export default {
    title: 'Components/SideWidget',
    component: SideWidget,
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

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
const Template = (args) => {
    return (
        <>
            <SideWidget {...args} />

        </>
    );
};

export const Feedback = Template.bind({});
Feedback.args = {
    label: 'Feedback',
    variant: 'feedback',
    iconRight: <FeedbackIcon />,
    popupText: 'We look forward to hearing from you. Click the button below to submit your feedback.',
    buttonText: 'Submit Feedback >'
};
