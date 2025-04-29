import React from 'react';

import Notification from 'components/Molecules/Notification';
import * as Layout from 'components/Atoms/Layout';

const meta = {
  title: 'UI Components/Notification',
  component: Notification,
  tags: ['!dev'],
  parameters: {
    controls: {
      exclude: [],
    },
  },
};

export default meta;

export const NotificationMenu = {
  argTypes: {
    notifications: {
      description: 'Array of notification items to display.',
      control: { type: 'object' },
      table: {
        type: { summary: 'array' },
      },
    },
    hasDot: {
      description: 'Display the red notification dot or not',
      control: { type: 'boolean' },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
  },
  args: {
    notifications: [
      {
        title: 'alert for appointment A',
        category: 'important',
        date: '4th April 2025',
      },
      {
        title: 'You are lost',
        category: 'important',
        date: '4th April 2025',
        link: 'www.zombo.com',
      },
      {
        title: 'Someone at the door',
        category: 'important',
        date: '4th April 2025',
        link: 'www.door.com',
      },
    ],
    hasDot: true,
  },
  render: args => (
    <Layout.Block minH="250px">
      <Notification {...args} />
    </Layout.Block>
  ),
};
