import React from 'react';
import Accordion from './Accordion';

import classes from '../Utils.module.scss';
import { Row } from 'react-bootstrap';
import Toggle from '../Toggle/Toggle';
import Card from '../Card/Card';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
export default {
    title: 'Components/Accordion',
    component: Accordion,
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
                <Accordion title="Base Accordion" {...args}>
                    <span> &apos;Lite&apos; Round</span>
                </Accordion>
            </Row>
            <Row className={classes.spacing}>
                <Accordion title="Auto Open" defaultActiveKey={[0]} eventKey={0} {...args}>
                    <span> &apos;Lite&apos; Round</span>
                </Accordion>
            </Row>
            <Row className={classes.spacing}>
                <Card
                    title={
                        <>
                            <span className={classes.facetTitle}>Filters</span>
                        </>
                    }
                    variant="facet"
                >
                    <Accordion title="Toggles" {...args}>
                        <Toggle label="toggle" />
                        <Toggle label="toggle" />
                        <Toggle label="toggle" />
                    </Accordion>
                </Card>
            </Row>
        </>
    );
};

export const Data = Template.bind({});
Data.args = {
    title: 'Accordion Component',
    children: (
        <>
            <p>status: approved</p>
            <p>status: approved</p>
            <p>status: approved</p>
            <p>status: approved</p>
        </>
    ),
    defaultActiveKey: '0',
    eventKey: '0',
    variant: 'data',
};

export const Filter = Template.bind({});
Filter.args = {
    variant: 'filter',
};
