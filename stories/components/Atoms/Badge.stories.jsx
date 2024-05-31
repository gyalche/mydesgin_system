import React from 'react';
import Badge from 'components/Atoms/Badge';
import * as Layout from 'components/Atoms/Layout';

export default {
  title: 'Design System/Atoms',
  component: Badge,
};

export const Badges =  {
  title: 'Badges',
  component: Badge,
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/7GhAI7t2dM3tVWpWMAVFXJ/Design-System?node-id=2826%3A1609&mode=dev'
    }
  },
  argTypes: {
    text: {
      name: 'Button Content',
      description: 'Content of the Button',
      control: { type: 'text' },
    }
  },
  args:{
    text: 'Badge',
  },
  render: (args) => {
    return  (
      <Layout.Block>
        <Layout.Item mt="20px">
          <Badge>{args.text}</Badge>
        </Layout.Item>
        <Layout.Item mt="20px">
          <Badge.Blue>{args.text}</Badge.Blue>
        </Layout.Item>
        <Layout.Item mt="20px">
          <Badge.Yellow>{args.text}</Badge.Yellow>
        </Layout.Item>
        <Layout.Item mt="20px">
          <Badge.Red>{args.text}</Badge.Red>
        </Layout.Item>
        <Layout.Item mt="20px">
          <Badge.Violet>{args.text}</Badge.Violet>
        </Layout.Item>
        <Layout.Item mt="20px">
          <Badge.Teal>{args.text}</Badge.Teal>
        </Layout.Item>
        <Layout.Item mt="20px">
          <Badge.Orange>{args.text}</Badge.Orange>
        </Layout.Item>
        <Layout.Item mt="20px">
          <Badge.Pink>{args.text}</Badge.Pink>
        </Layout.Item>
      </Layout.Block>
    );
  }
};
