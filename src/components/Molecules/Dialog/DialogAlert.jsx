import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { Button, Icon } from 'src/components/Atoms';
import { Flex } from 'src/components/Atoms/Layout';
import Dialog from 'src/components/Molecules/Dialog';

import { ContentText, StyledIcon, TitleText } from './styles';

const DialogAlert = forwardRef(function DialogAlert(
  { title, titleIcon, titleIconColor, content, maxWidth, onOK, ...rest },
  ref
) {
  const buttons = [
    {
      text: 'キャンセル',
      button: Button.Secondary,
      onClick: 'close',
    },
    {
      text: 'OK',
      button: Button,
      onClick: () => onOK(),
      props: { w: '112px' },
    },
  ];

  return (
    ref && (
      <Dialog ref={ref} maxWidth={maxWidth} buttons={buttons}>
        <Flex alignItems="center" mb="16px" data-testid="title-container">
          <Flex
            alignItems="center"
            mr="12px"
            mt="4px"
            w="auto"
            data-testid="icon-container"
          >
            <StyledIcon name={titleIcon} $color={titleIconColor} />
          </Flex>
          <TitleText>{title}</TitleText>
        </Flex>
        <Flex data-testid="content-container">
          <ContentText>{content}</ContentText>
        </Flex>
      </Dialog>
    )
  );
});

DialogAlert.defaultProps = {
  title: '',
  titleIcon: 'alert-circle-solid-check',
  titleIconColor: 'var(--rds-color-secondary-2-deep)',
  content: '',
  maxWidth: '400px',
  onOK: 'close',
};

DialogAlert.propTypes = {
  title: PropTypes.string.isRequired,
  titleIcon: PropTypes.string.isRequired,
  titleIconColor: PropTypes.string,
  content: PropTypes.string.isRequired,
  maxWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onOK: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
};

export default DialogAlert;
