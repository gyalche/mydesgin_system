import React from 'react';
import { Icon } from 'components/Atoms';
import * as Layout from 'components/Atoms/Layout';
import { Tooltip } from 'components/Molecules';

export default {
  title: 'Design System/Molecules',
};

export const Tooltips = {
  title: 'Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/7GhAI7t2dM3tVWpWMAVFXJ/Design-System?node-id=2826%3A2052&mode=dev',
    },
  },
  argTypes: {
    header: {
      name: 'Tooltip',
      description: 'Header of the Tooltip',
      control: { type: 'text' },
    },
    message: {
      name: 'Message',
      description: 'Message of the Tooltip',
      control: { type: 'text' },
    },
    subMessage: {
      name: 'Sub Message',
      description: 'Sub Message of the Tooltip',
      control: { type: 'text' },
    },
    width: {
      name: 'Width of the Tooltip',
      description: 'Width of the Tooltip in px or other units.',
      control: { type: 'text' },
    },
    linkURL: {
      name: 'Help URL',
      description: 'Help URL for the Tooltip help link',
      control: { type: 'text' },
    },
    onHelpLinkClick: {
      name: 'onHelpLinkClick',
      description: 'onClick function for the Tooltip help link',
      control: { type: 'text' },
    },
    onHover: {
      name: 'onHover',
      description: 'onHover function for the Tooltip',
      control: { type: 'text' },
    },
    moreDetails: {
      name: 'moreDetails',
      description: 'More details text of the Tooltip',
      control: { type: 'text' },
    },
    bgColor: {
      name: 'Background Color',
      description: 'Background Color of the Tooltip',
      control: { type: 'text' },
    },
    fontColor: {
      name: 'Font Color',
      description: 'Font Color of the Tooltip',
      control: { type: 'text' },
    },
    placement: {
      name: 'Placement',
      description: 'Placement of the Tooltip',
      control: {
        type: 'select',
      },
      options: [
        'right',
        'topLeft',
        'top',
        'topRight',
        'bottomLeft',
        'bottom',
        'bottomRight',
      ],
    },
    content: {
      name: 'Tooltip Content',
      description: 'Content of the Tooltip',
      control: { type: 'text' },
    },
  },
  args: {
    content: <Icon name="Interface-circle-solid-question" />,
    header: 'Tooltip',
    message: 'This is a message.',
    subMessage:
      'Segment syncs a list of users to these destinations and keeps it up to date.',
    width: '216px',
    linkURL:
      'https://scheduling.help.receptionist.jp/how-to-create-pages/#time2',
    onHelpLinkClick: () => alert('Help Link Clicked'),
    onHover: () => {},
    btnText: 'More Details',
    bgColor: 'var(--rds-color-neutral-9)',
    fontColor: 'var(--rds-color-neutral-0)',
    placement: 'right',
  },
  render: args => {
    return (
      <Layout.Block>
        <Layout.Item>
          <Tooltip {...args}>{args.content}</Tooltip>
        </Layout.Item>
      </Layout.Block>
    );
  },
};
