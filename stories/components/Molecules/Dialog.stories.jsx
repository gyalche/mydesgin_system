import React, { useRef } from 'react';
import styled from 'styled-components';
import Dialog from 'src/components/Molecules/Dialog';
import { Button, Icon } from 'src/components/Atoms';
import { Flex } from 'src/components/Atoms/Layout';

export default {
  title: 'Molecules/Dialog',
  component: Dialog,
};

const { Alert } = Dialog;

export const Dialogs = {
  title: 'Dialogs',
  component: Dialog,
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/7GhAI7t2dM3tVWpWMAVFXJ/Design-System?type=design&node-id=2826-1795&mode=design&t=973V53j1FkUyBkzs-0',
    },
  },
  argTypes: {
    modal: {
      description:
        'if true its a modal, make sure to run showModal() instead of show() on the dialogRef',
      control: { type: 'boolean' },
    },
    showClose: {
      description:
        'if present an X icon will be displayed on the top right corner',
      control: { type: 'boolean' },
    },
    maxWidth: {
      description: 'max-width of the dialog in px',
      control: { type: 'text' },
    },
  },
  args: {
    modal: false,
    showClose: false,
    maxWidth: '400px',
  },
  render: args => {
    const TitleText = styled.span`
      color: var(--rds-color-neutral-11);
      font-size: 18px;
      font-style: normal;
      font-weight: 700;
      line-height: 120%;
    `;

    const ContentText = styled.span`
      color: var(--rds-color-neutral-9);
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: 160%;
    `;

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
      args.modal ? ref.current.showModal() : ref.current.show();
    };

    return (
      <>
        <Button onClick={handleDialogOpen}>Open dialog</Button>
        <Dialog buttons={buttons} ref={ref} {...args}>
          <Flex alignItems="center" mb="16px">
            <Flex alignItems="center" mr="12px" mt="4px" w="auto">
              <Icon name="alert-circle-solid-check" />
            </Flex>
            <TitleText>メッセージを送信しました</TitleText>
          </Flex>
          <ContentText>
            この文章はダミーコピーですお読みにならないで下さい。構成を分かりやすくするため使用しています。本来の文言とは全く違った内容を記載しています。
          </ContentText>
        </Dialog>
      </>
    );
  },
};

export const DialogAlerts = {
  title: 'Alerts',
  component: Alert,
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/7GhAI7t2dM3tVWpWMAVFXJ/Design-System?type=design&node-id=2826-1795&mode=design&t=973V53j1FkUyBkzs-0',
    },
  },
  argTypes: {
    title: {
      description: 'title of the dialog alert',
      control: { type: 'text' },
    },
    titleIcon: {
      description: 'name of the title icon for the dialog alert',
      control: { type: 'text' },
    },
    titleIconColor: {
      description: 'color of the title icon for the dialog alert',
      control: { type: 'text' },
    },
    content: {
      description: 'content of the dialog alert',
      control: { type: 'text' },
    },
    maxWidth: {
      description: 'max-width of the dialog in px',
      control: { type: 'text' },
    },
    onOK: {
      description: 'on click function for the OK button',
      control: { type: 'text' },
    },
  },
  args: {
    title: 'Dialog Title',
    titleIcon: 'alert-circle-solid-check',
    titleIconColor: 'var(--rds-color-secondary-2-deep)',
    content: `Used for multiline pieces of content. Lorem ipsum dolor sit amet,
       ex lucilius hendrerit vim, tempor scaevola iudicabit ei ius, te eum illud impetus antiopam.
       Eu wisi commune volutpat pro, usu at alii magna aperiam.`,
    maxWidth: '400px',
    onOK: () => alert('OK'),
  },
  render: args => {
    const ref = useRef();

    const handleDialogOpen = () => {
      ref.current.show();
    };

    return (
      <>
        <Button onClick={handleDialogOpen}>Open dialog alert</Button>
        <Alert ref={ref} {...args} />
      </>
    );
  },
};
