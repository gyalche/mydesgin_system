import React from 'react';
import FormField from 'components/Molecules/FormField';
import * as Layout from 'components/Atoms/Layout';

const mockMeta = {
  error: 'error',
  touched: true,
};

export default {
  title: 'Design System/Molecules/Field',
};

export const Field =  {
  component: FormField,
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/7GhAI7t2dM3tVWpWMAVFXJ/Design-System?node-id=6087%3A12412&mode=dev'
    }
  },
  argTypes: {
    labelText: {
      description: 'In put Label displaying at the over of the input',
      control: { type: 'text' }
    },
    helperText: {
      description: 'Helper text displaying at the under of the input',
      control: { type: 'text' }
    },
    validText: {
      description: 'Validation text displaying at the under of the input',
      control: { type: 'text' }
    },
    meta: {
      description: 'Mock meta data used by React Final Form that handles the status of the validation',
      control: { type: 'object' }
    },
    placeholder: {
      description: 'Place holder for initial state of the input',
      control: { type: 'text' }
    },
    isLeftSideLabel: {
      description: 'True => Label is on the left, false => Label is on top',
      control: { type: 'boolean' }
    },
    w: {
      name: 'Width',
      description: 'Width of the Field',
      control: { type: 'text' }
    },
  },
  args:{
    labelText: 'Label on top',
    helperText: 'Enter value',
    validText: 'Correct',
    meta: mockMeta,
    placeholder: 'Name',
    isLeftSideLabel: false,
    w: '416px'
  },
  render: (args) => {
    return  (
      <Layout.Block>
          <Layout.Item >
            <FormField.Input  {...args} />
          </Layout.Item>
          <Layout.Item>
            <FormField.TextArea  {...args} />
          </Layout.Item>
      </Layout.Block>
    );
  }
};
