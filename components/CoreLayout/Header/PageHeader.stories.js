import React from 'react';
import { Provider } from 'react-redux';
import PageHeader from './PageHeader';
import { initializeStore } from '../../../store/store';

const store = initializeStore(); // You can optionally pass initial state here

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
export default {
    title: 'Components/PageHeader',
    component: PageHeader,
    decorators: [
        (Story) => (
            <Provider store={store}>
                <Story />
            </Provider>
        ),
    ],
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
const Template = (args) => <PageHeader {...args} />;

export const Home = Template.bind({});
Home.args = {};
