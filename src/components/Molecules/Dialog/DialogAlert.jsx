import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'components/Atoms';
import { Flex } from 'components/Atoms/Layout';
import Dialog from './Dialog';
import * as logos from 'components/Atoms/Logo';

import { ContentText, StyledIcon, TitleText } from './styles';

const DialogAlert = forwardRef(function DialogAlert(
  { title, titleIcon, titleIconColor, content, w, maxW, onOK, ...rest },
  ref
) {
  const LogoList = [
    'Chatwork',
    'Garoon',
    'GoogleCalendar',
    'GoogleChat',
    'GoogleMeet',
    'Google',
    'Lineworks',
    'MicrosoftAzureActiveDirectory',
    'MicrosoftOutlook',
    'MicrosoftTeams',
    'Microsoft365',
    'ReceptionistDiscovery',
    'ReceptionistScheduling',
    'Receptionist',
    'ReceptionistRooms',
    'Salesforce',
    'Slack',
    'Webex',
    'Workplace',
    'Zoom',
  ];

  const Logo = logos[titleIcon];

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
    },
  ];

  return (
    ref && (
      <Dialog ref={ref} w={w} maxW={maxW} buttons={buttons} {...rest}>
        <Flex alignItems="center" mb="16px" data-testid="title-container">
          <Flex
            alignItems="center"
            mr="12px"
            mt="4px"
            w="auto"
            data-testid="icon-container"
          >
            {LogoList.includes(titleIcon) ? (
              <Logo style={{ width: '16px' }} />
            ) : (
              <StyledIcon name={titleIcon} color={titleIconColor} />
            )}
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
  w: '400px',
  maxW: null,
  onOK: 'close',
};

DialogAlert.propTypes = {
  title: PropTypes.string.isRequired,
  titleIcon: PropTypes.string.isRequired,
  titleIconColor: PropTypes.string,
  content: PropTypes.string.isRequired,
  w: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  maxW: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onOK: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
};

export default DialogAlert;
