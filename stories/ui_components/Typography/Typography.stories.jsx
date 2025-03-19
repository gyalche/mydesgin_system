import TypographyComponent from 'components/Atoms/Typography';

const meta = {
  title: 'UI Components/Typography',
  component: TypographyComponent,
  tags: ['!dev'],
};

export default meta;

export const Typography = {
  argTypes: {
    level: {
      control: 'select',
      // eslint-disable-next-line max-len
      description: 'Level of typography we want to use. For more information, please follow to the [typography guidelines here](..?path=/docs/guidelines-typography--docs).',
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'h7', 'h8', 'h9', 'p1', 'p2', 'p3', 'p4'],
      table: {
        type: { summary: 'text' },
        defaultValue: { summary: 'p1' },
      },
    },
  },
  args: {
    level: 'p1',
  },
  render: args => (
    <TypographyComponent {...args}>Receptionist is Great</TypographyComponent>
  ),
};
