import InputComponent from 'components/Atoms/Input';

const meta = {
  title: 'UI Components/Input/Input',
  component: InputComponent,
  tags: ['!dev'],
};

export default meta;

export const Input = {
  argTypes: {
    compact: {
      control: 'boolean',
      description: 'If true, the button has a smaller height and padding.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    isInvalid: {
      control: 'boolean',
      description: 'If true, it forces the input to show as invalid.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    name: {
      description: 'The name to identify the field.',
      control: { type: 'text' },
    },
    value: {
      description: 'The value for the field.',
      control: { type: 'text' },
    },
    input: {
      description: `When FormField controlled, this is the model. For more information
       please read the [documentation](https://final-form.org/docs/react-final-form/types/FieldRenderProps).`,
      control: false,
    },
    w: {
      control: 'text',
      description: 'Sets the input width (e.g., `100px`, `50%`).',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'auto' },
      },
    },
    mt: {
      control: 'text',
      description: 'Margin-top (e.g., `8px`).',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '0' },
      },
    },
    mr: {
      control: 'text',
      description: 'Margin-right (e.g., `8px`).',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '0' },
      },
    },
    mb: {
      control: 'text',
      description: 'Margin-bottom (e.g., `8px`).',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '0' },
      },
    },
    ml: {
      control: 'text',
      description: 'Margin-left (e.g., `8px`).',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '0' },
      },
    },
  },
  args: {
    compact: false,
    isInvalid: false,
    name: 'storybook-input',
    value: 'value',
    mt: '0',
    mr: '0',
    mb: '0',
    ml: '0',
    w: 'auto',
  },
  render: ({ content, ...args }) => (
    <InputComponent {...args} />
  ),
};
