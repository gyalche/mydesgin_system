import React from 'react';

import Status from 'components/Molecules/Status';
import * as Layout from 'components/Atoms/Layout';

export default {
  title: 'Design System/Molecules',
};

export const StatusMessage = {
  title: 'Status',
  component: Status,
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/7GhAI7t2dM3tVWpWMAVFXJ/Design-System?node-id=6087%3A12412&mode=dev',
    },
  },
  argTypes: {
    text: {
      name: 'Text',
      description: 'Label text for the Status',
      control: { type: 'text' },
    },
  },
  args: {
    text: 'Label',
  },
  render: args => {
    const { text } = args;
    return (
      <Layout.Flex gap="20px">
        <Layout.Item>
          <Status appearance="disabled">{text}</Status>
        </Layout.Item>
        <Layout.Item>
          <Status appearance="enabled">{text}</Status>
        </Layout.Item>
        <Layout.Item>
          <Status appearance="info">{text}</Status>
        </Layout.Item>
        <Layout.Item>
          <Status appearance="warning">{text}</Status>
        </Layout.Item>
        <Layout.Item>
          <Status appearance="nodata">{text}</Status>
        </Layout.Item>
        <Layout.Item>
          <Status appearance="error">{text}</Status>
        </Layout.Item>
        <Layout.Item>
          <Status appearance="success">{text}</Status>
        </Layout.Item>
        <Layout.Item>
          <Status>{text}</Status>
        </Layout.Item>
      </Layout.Flex>
    );
  },
};
