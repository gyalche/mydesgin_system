import React from 'react';
import Tabs from 'components/Atoms/Tabs';
import * as Layout from 'components/Atoms/Layout';

export default {
  title: 'Design System/Atoms',
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
    showTab: {
      name: 'Show Tab 4',
      description: 'Conditional rendering of Tab 4',
      control: { type: 'boolean' },
    },
  },
  args: {
    appearance: 'primary',
    gap: '12px',
    defaultTab: '1',
    mt: '0',
    mb: '0',
    ml: '0',
    mr: '0',
    showTab: true,
  },
  render: (args) => {
    return (
      <Layout.Block mt="20px">
        <Layout.Item>
          <Tabs { ...args }>
            <Tabs.Tab tabKey="1" label="Tab 1">
              <div>This is Tab 1 content.</div>
            </Tabs.Tab>
            <Tabs.Tab tabKey="2" label="Tab 2">
              <div>This is Tab 2 content.</div>
            </Tabs.Tab>
            <Tabs.Tab tabKey="3" label="Tab 3">
              <div>This is Tab 3 content.</div>
            </Tabs.Tab>
            {args.showTab &&
              <Tabs.Tab tabKey="4" label="Tab 4">
                <div>This is Tab 4 content.</div>
              </Tabs.Tab>
            }
          </Tabs>
        </Layout.Item>
      </Layout.Block>
    );
   }
};
