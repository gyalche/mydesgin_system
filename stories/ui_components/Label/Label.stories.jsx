import LabelComponent from 'components/Atoms/Label';

const meta = {
  title: 'UI Components/Label',
  component: LabelComponent,
  tags: ['!dev'],
};

export default meta;

export const Label = {
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    content: {
      description: 'Text content to display.',
      control: { type: 'text' },
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the button.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
  },
  args: {
    content: 'Label',
    disabled: false,
  },
  render: ({ content, ...args }) => (
    <LabelComponent {...args}>{content}</LabelComponent>
  ),
};
