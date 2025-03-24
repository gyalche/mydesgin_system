import React from 'react';

import Typography from 'components/Atoms/Typography';
import FormFieldComponent from 'components/Molecules/FormField';
import Toggle from 'components/Molecules/Toggle';
import Selector from 'components/Molecules/Selector';
import * as Layout from 'components/Atoms/Layout';

const mockMeta = {
  error: 'error',
  touched: true,
};

const meta = {
  title: 'UI Components/FormField',
  component: FormFieldComponent,
  tags: ['!dev'],
  parameters: {
    controls: {
      exclude: ['customField'],
    },
  },
};

export default meta;

export const FormField = {
  argTypes: {
    labelText: {
      description: 'Text to be displayed inside the FormField Label component.',
      control: { type: 'text' },
    },
    helperText: {
      description: 'Helper text displayed below the FormField component.',
      control: { type: 'text' },
    },
    validText: {
      description: 'Validation text displayed when successfully validated.',
      control: { type: 'text' },
    },
    meta: {
      description: 'Meta data indicating validation status as expressed in validation workflows.',
      control: { type: 'object' },
    },
    isLeftSideLabel: {
      description: 'If True, the Label is on the left, on top otherwise',
      control: { type: 'boolean' },
    },
    tooltip: {
      description: 'Tooltip component to be rendered if not null. It needs to be a [Tooltip](..?path=/docs/ui-components-tooltip--docs#tooltip).',
      control: false,
    },
    input: {
      description: `When FormField controlled, this is the model. For more information
       please read the [documentation](https://final-form.org/docs/react-final-form/types/FieldRenderProps).`,
      control: false,
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the FormField and inner components.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
  },
  args: {
    labelText: 'Label on top',
    helperText: 'Enter value',
    validText: 'Correct',
    meta: mockMeta,
    isLeftSideLabel: false,
    disabled: false,
  },
  render: args => (
    <Layout.Block>
      <Layout.Item mb="24px">
        <FormFieldComponent.Input {...args} w="300px" />
      </Layout.Item>
      <Layout.Item mb="24px">
        <FormFieldComponent.TextArea {...args} w="300px" />
      </Layout.Item>
    </Layout.Block>
  ),
};

const selectorOptions = [
  { label: 'Option 1', value: 'option1' },
  { label: 'Option 2', value: 'option2' },
  { label: 'Option 3', value: 'option3' },
  { label: 'Option 4', value: 'option4' },
  { label: 'Option 5', value: 'option5' },
];

function FormFieldToggle(props) {
  return <FormFieldComponent customField={Toggle} w="78px" h="24px" {...props} />;
}

function FormFieldSelector(props) {
  return <FormFieldComponent customField={Selector} options={selectorOptions} {...props} />;
}

export const FormFieldWithCustomComponents = {
  argTypes: {
    labelText: {
      description: 'Text to be displayed inside the FormField Label component.',
      control: { type: 'text' },
    },
    helperText: {
      description: 'Helper text displayed below the FormField component.',
      control: { type: 'text' },
    },
    validText: {
      description: 'Validation text displayed when successfully validated.',
      control: { type: 'text' },
    },
    meta: {
      description: 'Meta data indicating validation status as expressed in validation workflows.',
      control: { type: 'object' },
    },
    isLeftSideLabel: {
      description: 'If True, the Label is on the left, on top otherwise',
      control: { type: 'boolean' },
    },
    tooltip: {
      description: 'Tooltip component to be rendered if not null. It needs to be a [Tooltip](..?path=/docs/ui-components-tooltip--docs#tooltip).',
      control: false,
    },
    input: {
      description: `When FormField controlled, this is the model. For more information
       please read the [documentation](https://final-form.org/docs/react-final-form/types/FieldRenderProps).`,
      control: false,
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the FormField and inner components.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
  },
  args: {
    labelText: 'Label on top',
    helperText: 'Helper text',
    validText: 'Correct',
    meta: mockMeta,
    isLeftSideLabel: false,
    disabled: false,
  },
  render: args => (
    <Layout.Block>
      <Layout.Item mb="24px">
        <Typography level="h4">FormField with Toggle</Typography>
        <FormFieldSelector
          {...args}
        />
      </Layout.Item>
      <Layout.Item mb="24px">
        <Typography level="h4">FormField with Selector</Typography>
        <FormFieldToggle
          {...args}
        />
      </Layout.Item>
    </Layout.Block>
  ),
};
