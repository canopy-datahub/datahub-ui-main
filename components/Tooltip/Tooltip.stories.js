import React from 'react';
import Tooltip from './Tooltip';
import LoginIcon from '../Images/svg/LoginIcon';
import MinusIcon from '../Images/svg/MinusIcon';
import classes from '../Utils.module.scss';
import { Row } from 'react-bootstrap';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
export default {
    title: 'Components/Tooltip',
    component: Tooltip,
    argTypes: { handleClick: { action: 'handleClick' } },
    parameters: {
        backgrounds: {
            default: 'light grey',
            values: [
                { name: 'light grey', value: '#E9E9E9' },
                { name: 'white', value: '#F0F0F0' },
                { name: 'search nav', value: '#297FD5' },
            ],
        },
    },
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
const Template = (args) => {
    return (
        <>
            <Tooltip {...args} />

        </>
    );
};

export const Primary = Template.bind({});
Primary.args = {
    children: <div>Hi</div>
};
