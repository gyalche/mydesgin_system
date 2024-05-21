import React from 'react';
import * as Layout from 'src/components/Atoms/Layout';
import Button from 'src/components/Atoms/Button';
import { Toast, ToastProvider, useToast } from 'src/components/Molecules/Toast';

export default {
  title: 'Molecules',
};

export const Toasts = {
  title: 'Toasts',
  component: Toast,
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/7GhAI7t2dM3tVWpWMAVFXJ/Design-System?node-id=2826%3A1178&mode=dev',
    },
  },
  argTypes: {
    title: {
      name: 'Toast Title',
      description: 'Title of the Toast',
      control: { type: 'text' },
    },
    description: {
      name: 'Toast Description',
      description: 'Description of the Toast',
      control: { type: 'text' },
    },
    placement: {
      name: 'Toast Placement',
      description: 'Placement of the Toast',
      control: {
        type: 'select',
      },
      options: ['bottomCenter', 'topCenter'],
      default: 'bottomCenter',
    },
    duration: {
      name: 'Toast duration',
      description: 'Duration of the Toast in milliseconds',
      control: { type: 'number', min: 500, step: 500 },
    },
  },
  args: {
    title: 'Info message.',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.',
  },
  render: args => {
    const TestComponent = args => {
      const { title, description, placement, duration } = args;
      const toast = useToast();

      const handleSuccessClick = () => {
        toast?.success(title, description, placement, duration);
      };

      const handleInfoClick = () => {
        toast?.info(title, description, placement, duration);
      };

      const handleWarningClick = () => {
        toast?.warning(title, description, placement, duration);
      };

      const handleErrorClick = () => {
        toast?.error(title, description, placement, duration);
      };

      return (
        <Layout.Flex gap="10px">
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
    };

    return (
      <ToastProvider>
        <TestComponent {...args} />
      </ToastProvider>
    );
  },
};
