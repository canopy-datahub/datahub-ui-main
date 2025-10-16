import React from 'react';
import { Provider } from 'react-redux';
import SearchBar from './SearchBar';
import { initializeStore } from '../../../store/store';

const store = initializeStore(); // You can optionally pass initial state here


// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
export default {
    title: 'Components/SearchBar',
    component: SearchBar,
    argTypes: { onClick: { action: 'onClick' } },
    decorators: [
        (Story) => (
            <Provider store={store}>
                <Story />
            </Provider>
        ),
    ],
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
const Template = (args) => <SearchBar {...args} />;

export const StudySearch = Template.bind({});
StudySearch.args = { topic: 'Studies' };
