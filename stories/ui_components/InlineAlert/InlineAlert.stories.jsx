import React from 'react';

import Alert from 'components/Molecules/InlineAlert';

const meta = {
  title: 'UI Components/Inline Alert',
  component: Alert,
  tags: ['!dev'],
};

export default meta;

export const Alerts = {
  title: 'InlineAlerts',
  component: Alert,
  argTypes: {
    appearance: {
      description: 'Describes the alert appearance.',
      control: { type: 'radio' },
      options: ['success', 'info', 'warning', 'error'],
    },
    title: {
      description: 'Title of the alert.',
      control: 'text',
    },
    description: {
      description: 'Description of the alert,',
      control: 'text',
    },
    action: {
      description: 'Action button inside the alert.',
      control: 'function',
    },
    btnLabel: {
      description: 'Action button label.',
      control: 'text',
      if: { arg: 'action' },
    },
  },
  args: {
    appearance: 'success',
    title: 'Alert message.',
    description: 'In offices, share offices, buildings, factories, stores, etc.Please leave RECEPTIONIST to support and manage customers',
    action: () => alert('Action button clicked'),
    btnLabel: 'リンク',
  },
  render: args => (
    <Alert {...args} />
  ),
};
