import React, { useState } from 'react';

import RadioButtonComponent from 'components/Molecules/RadioButton';
import Flex from 'components/Atoms/Layout/Flex';

const meta = {
  title: 'UI Components/RadioButton',
  component: RadioButtonComponent,
  tags: ['!dev'],
  parameters: {
    controls: {
      exclude: ['value', 'onChange'],
    },
  },
};

export default meta;

export const RadioButton = {
  argTypes: {
    input: {
      description: `When FormField controlled, this is the model. For more information
       please read the [documentation](https://final-form.org/docs/react-final-form/types/FieldRenderProps).`,
      control: false,
    },
    label: {
      description: 'Text label that will be shown next to the radio button.',
      control: { type: 'text' },
    },
    checked: {
      description: 'Whether the radio button is checked.',
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    value: {
      description: 'The value of the radio button.',
      control: { type: 'text' },
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the radio button.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    position: {
      description: 'Position of the radio button relative to the label.',
      control: { type: 'select' },
      options: ['left', 'right'],
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'left' },
      },
    },
  },
  args: {
    label: 'Option 1',
    value: 'option1',
    disabled: false,
    position: 'left',
  },
  render: args => <RadioButtonComponent {...args} />,
};

function RadioButtonGroupComponent() {
  const [selectedValue, setSelectedValue] = useState('option1');

  const handleChange = event => {
    setSelectedValue(event.target.value);
  };

  return (
    <Flex direction="column" gap="8px">
      <RadioButtonComponent
        label="Option 1"
        value="option1"
        checked={selectedValue === 'option1'}
        onChange={handleChange}
      />
      <RadioButtonComponent
        label="Option 2"
        value="option2"
        checked={selectedValue === 'option2'}
        onChange={handleChange}
      />
      <RadioButtonComponent
        label="Option 3 (Disabled)"
        value="option3"
        checked={selectedValue === 'option3'}
        onChange={handleChange}
        disabled={true}
      />
      <RadioButtonComponent
        label="Option 4 (Right positioned)"
        value="option4"
        checked={selectedValue === 'option4'}
        onChange={handleChange}
        position="right"
      />
    </Flex>
  );
}

export const RadioButtonGroup = {
  render: () => <RadioButtonGroupComponent />,
};
