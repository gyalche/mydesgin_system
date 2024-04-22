import React from 'react';
import Tabs from 'src/components/Atoms/Tabs';
import * as Layout from 'src/components/Atoms/Layout';

export default {
  title: 'Atoms',
};

export const TabsComponent = {
  component: Tabs,
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/7GhAI7t2dM3tVWpWMAVFXJ/Design-System?type=design&node-id=6044-14890&mode=design&t=g6nxjdQUCysTShhd-0'
    }
  },
  argTypes: {
    appearance: {
      name: 'appearance',
      description: 'Styling of the Tabs',
      control: {
        type: 'select',
      },
      options: ['primary', 'secondary'],
    },
    gap: {
      name: 'Gap',
      description: 'Size of the gap in between Tabs',
      control: { type: 'text' },
    },
    defaultTab: {
      name: 'Default Tab',
      description: 'The Tab key that is initially opened',
      control: { type: 'text' },
    },
    mt: {
      name: 'Margin Top',
      description: 'Set the Top Margin of the list of tab'
    },
    mb: {
      name: 'Margin Bottom',
      description: 'Set the Bottom Margin of the list of tab'
    },
    ml: {
      name: 'Margin Left',
      description: 'Set the Left Margin of the list of tab'
    },
    mr: {
      name: 'Margin Right',
      description: 'Set the Right Margin of the list of tab'
    },
  },
  args: {
    appearance: 'primary',
    gap: '12px',
    defaultTab: 'tab1',
    mt: '0',
    mb: '0',
    ml: '0',
    mr: '0'
  },
  render: (args) => {
    return (
      <Layout.Block mt="20px">
        <Layout.Item>
          <Tabs { ...args }>
            <Tabs.Tab tabKey="tab1" label="Tab 1">
              <div>This is Tab 1 content.</div>
            </Tabs.Tab>
            <Tabs.Tab tabKey="tab2" label="Tab 2">
              <div>This is Tab 2 content.</div>
            </Tabs.Tab>
            <Tabs.Tab tabKey="tab3" label="Tab 3">
              <div>This is Tab 3 content.</div>
            </Tabs.Tab>
          </Tabs>
        </Layout.Item>
      </Layout.Block>
    );
   }
};
