import TabComponent from 'components/Atoms/Tabs/Tab';

const meta = {
  component: TabComponent,
  tags: ['!dev'],
};

export default meta;

export const Tab = {
  argTypes: {
    children: {
      description: 'Content to display.',
      control: { type: 'text' },
      table: {
        disable: true,
      },
    },
    tabKey: {
      description: 'Key to identify the tab inside parent `Tabs` component.',
      control: { type: 'text' },
    },
    label: {
      description: 'Label to display inside parent `Tabs` component.',
      control: { type: 'text' },
    },
  },
};
