import React from 'react';

import Avatar from 'components/Atoms/Avatar';
import * as Layout from 'components/Atoms/Layout';

export default {
  title: 'Design System/Atoms',
  component: Avatar,
};

export const Avatars = {
  title: 'Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/7GhAI7t2dM3tVWpWMAVFXJ/Design-System?node-id=2826-1318&t=8aOPFh3x0DYZkSCs-0',
    },
  },
  argTypes: {
    text: {
      name: 'Avatar Content',
      description: 'Content of the Avatar',
      control: { type: 'text' },
    },
    size: {
      description: 'Size of the avatar by default medium',
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
    },
    fontSize: {
      description: 'Font size of the avatar content',
      control: { type: 'text' },
    },
  },
  args: {
    name: 'Avatar',
    src: '',
    size: 'medium',
    fontSize: '12px',
  },
  render: args => {
    const text = args.name.trim()[0];

    return (
      <Layout.Block>
        <Layout.Item mt="20px">
          <Avatar name={text} {...args} />
        </Layout.Item>
      </Layout.Block>
    );
  },
};
