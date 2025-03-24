import React, { useRef } from 'react';
import styled from 'styled-components';

import DialogComponent from 'components/Molecules/Dialog';
import { Button, Icon, Typography } from 'components/Atoms';
import { Flex } from 'components/Atoms/Layout';

const { Alert } = DialogComponent;

const TitleText = styled(Typography).attrs(() => ({ level: 'h6' }))`
  color: var(--rds-color-neutral-11);
`;

const ContentText = styled(Typography).attrs(() => ({ level: 'p2' }))`
  color: var(--rds-color-neutral-9);
`;

const meta = {
  title: 'UI Components/Dialog',
  component: DialogComponent,
  tags: ['!dev'],
};

export default meta;

function DialogStory(args) {
  const ref = useRef();

  const buttons = [
    {
      text: 'Close',
      button: Button,
      onClick: 'close',
    },
    {
      text: 'OK',
      button: Button,
      onClick: () => alert('OK'),
    },
  ];

  const handleDialogOpen = () => {
    if (args?.modal) {
      return ref?.current?.showModal();
    }
    return ref.current.show();
  };

  return (
    <Flex minH="350px">
      <Button onClick={handleDialogOpen}>Open dialog</Button>
      <DialogComponent buttons={buttons} ref={ref} {...args}>
        <Flex alignItems="center" mb="16px">
          <Flex alignItems="center" mr="12px" mt="4px" w="auto">
            <Icon name="alert-circle-solid-check" />
          </Flex>
          <TitleText>メッセージを送信しました</TitleText>
        </Flex>
        <ContentText>
          この文章はダミーコピーですお読みにならないで下さい。構成を分かりやすくするため使用しています。本来の文言とは全く違った内容を記載しています。
        </ContentText>
      </DialogComponent>
    </Flex>
  );
}

function AlertStory(args) {
  const ref = useRef();

  const handleDialogOpen = () => {
    ref.current.show();
  };

  return (
    <Flex minH="350px">
      <Button onClick={handleDialogOpen}>Open dialog alert</Button>
      <Alert ref={ref} {...args} />
    </Flex>
  );
}

export const Dialog = {
  argTypes: {
    modal: {
      description:
        'If true, it\'s a modal dialog. Make sure to run showModal() instead of show() on the dialogRef.',
      control: { type: 'boolean' },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    showClose: {
      description:
        'If true, an X icon will be displayed on the top right corner to close the dialog.',
      control: { type: 'boolean' },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    buttons: {
      description: 'Array of button objects to display at the bottom of the dialog. '
        + 'Each button object should have: text, button component, onClick handler, and optional props.',
      control: false,
      table: {
        type: { summary: 'array' },
        defaultValue: { summary: '[]' },
      },
    },
    w: {
      description: 'Width of the dialog. Can be a number (interpreted as pixels) '
        + 'or a string with units.',
      control: { type: 'text' },
      table: {
        type: { summary: 'string | number' },
        defaultValue: { summary: '400px' },
      },
    },
    maxW: {
      description: 'Maximum width of the dialog. Can be a number (interpreted as pixels) '
        + 'or a string with units.',
      control: { type: 'text' },
      table: {
        type: { summary: 'string | number' },
        defaultValue: { summary: 'null' },
      },
    },
    children: {
      description: 'Content to display inside the dialog.',
      control: false,
      table: {
        type: { summary: 'node | array' },
      },
    },
  },
  args: {
    modal: false,
    showClose: false,
    w: '400px',
    maxW: '500px',
  },
  render: DialogStory,
};

export const DialogAlert = {
  parameters: {
    controls: {
      exclude: ['children', 'buttons', 'showClose'],
    },
  },
  argTypes: {
    title: {
      description: 'Title text displayed in the dialog alert.',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
      },
    },
    titleIcon: {
      description: 'Name of the icon or logo to display next to the title. '
        + 'Can be an icon name or one of the predefined logo names.',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
      },
    },
    titleIconColor: {
      description: 'Color of the title icon (only applies to icons, not logos).',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'var(--rds-color-secondary-2-deep)' },
      },
    },
    content: {
      description: 'Text content displayed in the dialog alert body.',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
      },
    },
    w: {
      description: 'Width of the dialog. Can be a number (interpreted as pixels) '
        + 'or a string with units.',
      control: { type: 'text' },
      table: {
        type: { summary: 'string | number' },
        defaultValue: { summary: '400px' },
      },
    },
    maxW: {
      description: 'Maximum width of the dialog. Can be a number (interpreted as pixels) '
        + 'or a string with units.',
      control: { type: 'text' },
      table: {
        type: { summary: 'string | number' },
        defaultValue: { summary: 'null' },
      },
    },
    onOK: {
      description: 'Function called when the OK button is clicked. '
        + 'Can also be the string "close" to simply close the dialog.',
      control: false,
      table: {
        type: { summary: 'function | string' },
        defaultValue: { summary: '"close"' },
      },
    },
  },
  args: {
    title: 'Dialog Title',
    titleIcon: 'alert-circle-solid-check',
    titleIconColor: 'var(--rds-color-secondary-2-deep)',
    content: `Used for multiline pieces of content. Lorem ipsum dolor sit amet,
       ex lucilius hendrerit vim, tempor scaevola iudicabit ei ius, te eum illud impetus antiopam.
       Eu wisi commune volutpat pro, usu at alii magna aperiam.`,
    w: '400px',
    maxW: '500px',
    onOK: () => alert('OK clicked'),
  },
  render: AlertStory,
};
