import React from 'react';
import SearchResult from './SearchResult';
import { searchBody } from '../MockData/getSearch';
import { propsBody } from '../MockData/getProps';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
export default {
    title: 'Components/SearchResult',
    component: SearchResult,
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
const Template = (args) => <SearchResult {...args} />;

export const Base = Template.bind({});
Base.args = {
    propertyList: propsBody.Representative,
    resultData: searchBody.hits.hits[0].sourceAsMap,
};
