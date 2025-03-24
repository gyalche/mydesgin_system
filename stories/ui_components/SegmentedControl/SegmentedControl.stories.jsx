import React from 'react';

import SegmentedControl from 'components/Atoms/SegmentedControl';
import * as Layout from 'components/Atoms/Layout';

const meta = {
  title: 'UI Components/Segmented Control',
  component: SegmentedControl,
  tags: ['!dev'],
};

export default meta;

export const SegmentedControls = {
  argTypes: {
    defaultSegment: {
      description: 'The segment key that is initially selected',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
    segments: {
      description: 'Array of segment objects that define the content and behavior of each segment',
      control: { type: 'object' },
      table: {
        type: {
          summary: 'array',
          detail: `[{
  segmentKey: string,
  label: string,
  onClick: function,
  disabled: boolean
}]`,
        },
      },
    },
    mt: {
      description: 'Margin top',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '0' },
      },
    },
    mb: {
      description: 'Margin bottom',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '0' },
      },
    },
    ml: {
      description: 'Margin left',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '0' },
      },
    },
    mr: {
      description: 'Margin right',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '0' },
      },
    },
  },
  args: {
    defaultSegment: '1',
    mt: '0',
    mb: '0',
    ml: '0',
    mr: '0',
    segments: [
      {
        segmentKey: '1',
        label: 'レブル',
        onClick: () => window.alert('Clicked 1!'),
      },
      {
        segmentKey: '2',
        label: 'Seg 2',
        onClick: () => window.alert('Clicked 2!'),
      },
      {
        segmentKey: '3',
        label: 'Seg long test 3',
        onClick: () => window.alert('Clicked 3!'),
      },
    ],
  },
  render: args => (
    <Layout.Block>
      <Layout.Item>
        <SegmentedControl {...args} />
      </Layout.Item>
    </Layout.Block>
  ),
};

export const DisabledSegment = {
  ...SegmentedControls,
  args: {
    ...SegmentedControls.args,
    segments: [
      {
        segmentKey: '1',
        label: 'Enabled',
        onClick: () => window.alert('Clicked 1!'),
      },
      {
        segmentKey: '2',
        label: 'Disabled',
        onClick: () => window.alert('Clicked 2!'),
        disabled: true,
      },
      {
        segmentKey: '3',
        label: 'Enabled',
        onClick: () => window.alert('Clicked 3!'),
      },
    ],
  },
};
