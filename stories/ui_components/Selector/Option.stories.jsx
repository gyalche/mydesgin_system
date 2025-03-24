import DefaultOptionComponent from 'components/Molecules/Selector/Option';

const meta = {
  component: DefaultOptionComponent,
  tags: ['!dev'],
};

export default meta;

export const Selector = {
  argTypes: {
    item: {
      description: 'The item to be displayed.',
      control: { type: 'object' },
    },
    index: {
      description: 'The item index inside the dropdown.',
      control: { type: 'number' },
    },
    highlightedIndex: {
      description: 'The highlighted item index inside the dropdown.',
      control: { type: 'number' },
    },
    children: {
      description: 'The received children corresponds to the `item.label` value.',
      control: { type: 'number' },
    },
    getItemProps: {
      description: `This element should be passed to the element representing the item as it is described in
      [downshift documentation](https://www.downshift-js.com/use-select#props-used-in-examples).`,
      control: { type: 'number' },
    },
  },
};
