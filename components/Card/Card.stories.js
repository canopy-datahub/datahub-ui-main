import React from 'react';
import Card from './Card';
import Toggle from '../Toggle/Toggle';
import Button from '../Button/Button';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
export default {
    title: 'Components/Card',
    component: Card,
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
const Template = (args) => <Card {...args} />;

export const Facet = Template.bind({});
Facet.args = {
    title: 'Filters',
    children: (
        <>
            <h4>Data collection</h4>
            <Toggle label="COVID Test Device" />
            <Toggle label="Other" />
            <Toggle label="Smartphone" />
            <Toggle label="Survey" />
            <h4>Data collection</h4>
            <Toggle label="COVID Test Device" />
            <Toggle label="Other" />
            <Toggle label="Smartphone" />
            <Toggle label="Survey" />
            <h4>Data collection</h4>
            <Toggle label="COVID Test Device" />
            <Toggle label="Other" />
            <Toggle label="Smartphone" />
            <Toggle label="Survey" />
        </>
    ),
    variant: 'facet',
    // size: 'medium',
};

export const Blog = Template.bind({});
Blog.args = {
    title: 'About RADx',
    subtitle: 'Lorem ipsum dolor sit amet, consecteur adipsing elit',
    footer: 'Read More >',
    variant: 'blog',
    image: { src: '/images/Blue_Virus_Img.jpeg', alt: 'This is a caption for the Image', width: '230px', height: '162px' },
};

export const Detail = Template.bind({});
Detail.args = {
    children: (
        <>
            <span>This is a card with just a drop shadow</span>
            <p>We are going to use this for the base of the StudyDetail component</p>
        </>
    ),
    variant: 'detail',
};

export const Result = Template.bind({});
Result.args = {
    title: 'Result Card',
    children: (
        <>
            <span>
                This is going to be mostly uninteresting because our real use case for this component is to be a CSS base for another
                component
            </span>
            <p>We are going to use this for File Cards relating to the study data</p>
        </>
    ),
    variant: 'result',
};

export const Info = Template.bind({});
Info.args = {
    title: 'Funding Opportunities',
    children: (
        <>
            <p>We are going to use this for info cards in homepage</p>
        </>
    ),
    footer: <Button label="More" variant="homepage" size="auto" rounded="lite" />,
    headerImg: '/images/med1.png',
    size: 'medium',
    variant: 'info',
};

export const ColoredInfo = Template.bind({});
ColoredInfo.args = {
    title: 'Funding Opportunities',
    children: (
        <>
            <p>We are going to use this for info cards in homepage</p>
        </>
    ),
    footer: <Button label="More" variant="homepage" modification="whiteText" size="auto" rounded="lite" />,
    headerImg: '/images/med2.png',
    modification: 'colored',
    bkgdColor: '#376970',
    size: 'medium',
    variant: 'info',
};
