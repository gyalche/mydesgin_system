import StatusComponent from 'components/Molecules/Status';
import * as Layout from 'components/Atoms/Layout';

const meta = {
  title: 'UI Components/Status',
  component: StatusComponent,
  tags: ['!dev'],
};

export default meta;

export const Status = {
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    children: {
      description: 'Content to display.',
      control: { type: 'text' },
    },
    appearance: {
      control: 'select',
      options: [
        'disabled',
        'enabled',
        'info',
        'warning',
        'nodata',
        'error',
        'success',
        'none',
      ],
      description: 'Defines the status appearance.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'primary' },
      },
    },
  },
  args: {
    children: 'Status',
    appearance: 'success',
  },
  render: ({ children, ...args }) => (
    <StatusComponent {...args}>{children}</StatusComponent>
  ),
};

export const Palette = {
  parameters: {
    layout: 'centered',
  },
  render: () => (
    <Layout.Block>
      <Layout.Item mt="20px">
        <StatusComponent appearance="disabled">Disabled</StatusComponent>
      </Layout.Item>
      <Layout.Item mt="20px">
        <StatusComponent appearance="enabled">Enabled</StatusComponent>
      </Layout.Item>
      <Layout.Item mt="20px">
        <StatusComponent appearance="info">Info</StatusComponent>
      </Layout.Item>
      <Layout.Item mt="20px">
        <StatusComponent appearance="warning">Warning</StatusComponent>
      </Layout.Item>
      <Layout.Item mt="20px">
        <StatusComponent appearance="nodata">No Data</StatusComponent>
      </Layout.Item>
      <Layout.Item mt="20px">
        <StatusComponent appearance="error">Error</StatusComponent>
      </Layout.Item>
      <Layout.Item mt="20px">
        <StatusComponent appearance="success">Success</StatusComponent>
      </Layout.Item>
      <Layout.Item mt="20px">
        <StatusComponent>Default</StatusComponent>
      </Layout.Item>
    </Layout.Block>
  ),
};
