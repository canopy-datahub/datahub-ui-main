import React from 'react';
import Button from './Button';
import LoginIcon from '../Images/svg/LoginIcon';
import MinusIcon from '../Images/svg/MinusIcon';
import classes from '../Utils.module.scss';
import { Row } from 'react-bootstrap';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
export default {
    title: 'Components/Button',
    component: Button,
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
            <Row className={classes.spacing}>
                <Button {...args} />
                <span> Base</span>
            </Row>
            <Row className={classes.spacing}>
                <Button rounded="lite" {...args} />
                <span> &apos;Lite&apos; Round</span>
            </Row>
            <Row className={classes.spacing}>
                <Button rounded="round" {...args} />
                <span> Round</span>
            </Row>
        </>
    );
};

export const Primary = Template.bind({});
Primary.args = {
    label: 'Select All',
    variant: 'primary',
    size: 'medium',
};

export const Secondary = Template.bind({});
Secondary.args = {
    label: 'Secondary Button',
    variant: 'secondary',
    size: 'medium',
};

export const Tertiary = Template.bind({});
Tertiary.args = {
    label: 'Tertiary Button',
    variant: 'tertiary',
    size: 'medium',
};

export const Danger = Template.bind({});
Danger.args = {
    label: 'Danger Button',
    variant: 'danger',
    size: 'medium',
};

export const Warning = Template.bind({});
Warning.args = {
    label: 'Warning Button',
    variant: 'warning',
    size: 'medium',
};

export const Success = Template.bind({});
Success.args = {
    label: 'Success Button',
    variant: 'success',
    size: 'medium',
};

export const Info = Template.bind({});
Info.args = {
    label: 'Info Button',
    variant: 'info',
    size: 'medium',
};

export const Light = Template.bind({});
Light.args = {
    label: 'Light Button',
    variant: 'light',
    size: 'medium',
};

export const Dark = Template.bind({});
Dark.args = {
    label: 'Dark Button',
    variant: 'dark',
    size: 'medium',
};

export const Link = Template.bind({});
Link.args = {
    label: 'Link Button',
    variant: 'link',
    size: 'medium',
};

export const Login = Template.bind({});
Login.args = {
    label: 'Login',
    iconRight: <LoginIcon />,
    variant: 'login',
};

export const Disabled = Template.bind({});
Disabled.args = {
    disabled: true,
    label: 'Button',
    size: 'medium',
};

export const Icon = Template.bind({});
Icon.args = {
    disabled: true,
    iconRight: <LoginIcon />,
    size: 'icon',
    variant: 'icon',
};

export const IconButton = Template.bind({});
IconButton.args = {
    iconLeft: <MinusIcon />,
    variant: 'primary',
    size: 'icon',
};

export const Homepage = Template.bind({});
Homepage.args = {
    label: 'More',
    variant: 'homepage',
    size: 'auto'
};
