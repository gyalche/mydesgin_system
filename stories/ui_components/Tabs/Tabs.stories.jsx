import TabsComponent from 'components/Atoms/Tabs';

const meta = {
  title: 'UI Components/Tabs',
  component: TabsComponent,
  tags: ['!dev'],
};

export default meta;

export const Tabs = {
  argTypes: {
    appearance: {
      description: 'Style to be applied on the tabs.',
      control: {
        type: 'select',
      },
      options: ['primary', 'secondary'],
    },
    gap: {
      description: 'Gap between the tabs.',
      control: { type: 'text' },
    },
    defaultTab: {
      description: 'Default selected tab.',
      control: { type: 'text' },
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
    children: {
      description: 'Tabs to display. It only supports [`Tab`](..?path=/docs/ui-components-tabs--docs#tab) subcomponents.',
      control: false,
    },
    onClick: {
      description: 'Action triggered when selecting the tab.',
      control: { type: 'text' },
      table: {
        disable: true,
      },
    },
  },
  args: {
    appearance: 'primary',
    gap: '12px',
    defaultTab: '1',
    mt: '0px',
    mb: '0px',
    ml: '0px',
    mr: '0px',
  },
  render: ({ content, ...args }) => (
    <TabsComponent {...args}>
      <TabsComponent.Tab tabKey="1" label="Tab 1">
        This is Tab 1 content.
      </TabsComponent.Tab>
      <TabsComponent.Tab tabKey="2" label="Tab 2">
        This is Tab 2 content.
      </TabsComponent.Tab>
      <TabsComponent.Tab tabKey="3" label="Tab 3">
        This is Tab 3 content.
      </TabsComponent.Tab>
    </TabsComponent>
  ),
};
