import CheckboxComponent from 'components/Molecules/Checkbox';

const meta = {
  title: 'UI Components/Checkbox',
  component: CheckboxComponent,
  tags: ['!dev'],
  parameters: {
    controls: {
      exclude: ['value', 'checked'],
    },
  },
};

export default meta;

export const Checkbox = {
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    input: {
      description: `When FormField controlled, this is the model. For more information
       please read the [documentation](https://final-form.org/docs/react-final-form/types/FieldRenderProps).`,
      control: false,
    },
    label: {
      description: 'Text label that will be shown close to the checkbox.',
      control: { type: 'text' },
    },
    name: {
      description: 'Text name to identify the checkbox.',
      control: { type: 'text' },
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the checkbox.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    checked: {
      control: 'boolean',
      description: 'Controls the checked state of the checkbox when used directly (not through FormField).',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    onChange: {
      action: 'changed',
      description: 'Callback function that is called when the checkbox state changes.',
      table: {
        type: { summary: 'function' },
        defaultValue: { summary: 'null' },
      },
    },
  },
  args: {
    label: 'Checkbox 1',
    name: 'checkbox',
    disabled: false,
    checked: false,
  },
  render: ({ content, ...args }) => (
    <CheckboxComponent {...args} />
  ),
};
