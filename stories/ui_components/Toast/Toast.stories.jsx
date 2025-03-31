import React from 'react';

import * as Layout from 'components/Atoms/Layout';
import Button from 'components/Atoms/Button';
import { Toast, ToastProvider, useToast } from 'components/Molecules/Toast';

const meta = {
  title: 'UI Components/Toast',
  component: Toast,
  tags: ['!dev'],
  parameters: {
    controls: {
      exclude: ['type', 'close', 'fadeOut'],
    },
  },
};

export default meta;

export const ToastExamples = {
  argTypes: {
    title: {
      description: 'Title of the Toast',
      control: { type: 'text' },
    },
    description: {
      description: 'Description of the Toast',
      control: { type: 'text' },
    },
    placement: {
      description: 'Placement of the Toast',
      control: {
        type: 'select',
      },
      options: ['bottomCenter', 'topCenter'],
      default: 'bottomCenter',
    },
    duration: {
      description: 'Duration of the Toast in milliseconds',
      control: { type: 'number', min: 500, step: 500 },
    },
    action: {
      description: 'Toggle to show or hide the action button',
      control: false,
    },
    btnLabel: {
      description: 'Label of the Action Button',
      control: { type: 'text' },
      if: { arg: 'action' },
    },
  },
  args: {
    title: 'Info message.',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.',
    action: () => {},
    btnLabel: 'action',
    duration: 1000,
    placement: 'bottomCenter',
  },
  render: args => {
    function TestComponent() {
      const {
        title, description, placement, duration, action, btnLabel,
      } = args;
      const toast = useToast();

      const handleSuccessClick = () => {
        toast?.success(title, description, placement, duration, action, btnLabel);
      };

      const handleInfoClick = () => {
        toast?.info(title, description, placement, duration, action, btnLabel);
      };

      const handleWarningClick = () => {
        toast?.warning(title, description, placement, duration, action, btnLabel);
      };

      const handleErrorClick = () => {
        toast?.error(title, description, placement, duration, action, btnLabel);
      };

      return (
        <Layout.Flex gap="10px" minH="300px">
          <Layout.Item>
            <Button.Primary onClick={handleSuccessClick} {...args}>
              Success
            </Button.Primary>
          </Layout.Item>
          <Layout.Item>
            <Button.Secondary onClick={handleInfoClick} {...args}>
              Info
            </Button.Secondary>
          </Layout.Item>
          <Layout.Item>
            <Button.Warning onClick={handleWarningClick} {...args}>
              Warning
            </Button.Warning>
          </Layout.Item>
          <Layout.Item>
            <Button.Danger onClick={handleErrorClick} {...args}>
              Error
            </Button.Danger>
          </Layout.Item>
        </Layout.Flex>
      );
    }

    return (
      <ToastProvider>
        <TestComponent {...args} />
      </ToastProvider>
    );
  },
};
