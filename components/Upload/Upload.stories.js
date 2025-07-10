import React from 'react';
import Upload from './Upload';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
export default {
    title: 'Components/Upload',
    component: Upload
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
const Template = (args) => <Upload {...args} />;

export const UploadTool = Template.bind({});
UploadTool.args = {
    multiple: true,
    handleChange: () => {},
    id: 'uploadComponent',
};
