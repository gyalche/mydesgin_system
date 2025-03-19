import ItemComponent from 'components/Molecules/Profile/Item';

const meta = {
  component: ItemComponent,
  tags: ['!dev'],
};

export default meta;

export const Item = {
  argTypes: {
    as: {
      description: `This is a polymorphic prop that would be forwarded to styled-components.
      For more information please visit the [external documentation](https://styled-components.com/docs/api#as-polymorphic-prop).`,
      control: { type: 'text' },
    },
    text: {
      description: 'This is the item display text.',
      control: { type: 'text' },
    },
    icon: {
      description: 'This is the item display icon.',
      control: { type: 'text' },
    },
  },
};
