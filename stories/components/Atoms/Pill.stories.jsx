import React from 'react';
import Pill from 'components/Atoms/Pill';
import * as Layout from 'components/Atoms/Layout';

export default {
  title: 'Design System/Atoms',
};

export const Pills = {
  title: 'Pills',
  component: Pill,
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/7GhAI7t2dM3tVWpWMAVFXJ?type=design%27&node-id=2826:1318',
    },
  },
  argTypes: {
    text: {
      name: 'Pill Content',
      description: 'Content of the Pill',
      control: { type: 'text' },
    },
  },
  args: {
    text: '420',
  },
  render: args => {
    return (
      <Layout.Block>
        <Layout.Item mt="20px">
          <Pill.Danger>{args.text}</Pill.Danger>
        </Layout.Item>
        <Layout.Item mt="20px">
          <Pill>{args.text}</Pill>
        </Layout.Item>
        <Layout.Item mt="20px">
          <Pill.Blue>{args.text}</Pill.Blue>
        </Layout.Item>
        <Layout.Item mt="20px">
          <Pill.Green>{args.text}</Pill.Green>
        </Layout.Item>
        <Layout.Item mt="20px">
          <Pill.Yellow>{args.text}</Pill.Yellow>
        </Layout.Item>
        <Layout.Item mt="20px">
          <Pill.Red>{args.text}</Pill.Red>
        </Layout.Item>
        <Layout.Item mt="20px">
          <Pill.Violet>{args.text}</Pill.Violet>
        </Layout.Item>
        <Layout.Item mt="20px">
          <Pill.Teal>{args.text}</Pill.Teal>
        </Layout.Item>
        <Layout.Item mt="20px">
          <Pill.Pink>{args.text}</Pill.Pink>
        </Layout.Item>
        <Layout.Item mt="20px">
          <Pill.Orange>{args.text}</Pill.Orange>
        </Layout.Item>
      </Layout.Block>
    );
  },
};
