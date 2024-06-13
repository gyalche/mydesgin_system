import React from 'react';
import Icon from 'components/Atoms/Icon';
import PropTypes from 'prop-types';
import Button from 'components/Atoms/Button';
import { Typography } from 'components/Atoms';
import styled from 'styled-components';

// TODO- FIX ME the handling of the underline is messy, it needs to be reworked.

export const BaseStyle = styled(Button)`
  align-items: center;
  cursor: pointer;
  display: flex;
  flex-direction: ${({ position }) => (position === 'right' ? 'row-reverse' : 'row')};
  font-size: ${({ compact, hastext }) => (compact || hastext ? '24px' : '32px')};
  padding: ${({ hastext }) => (hastext ? '' : '4px')};
  text-decoration: none;

  &:active {
    outline: none;
  }

  &:hover {
    text-decoration: none !important;
  }

  i {
    margin-bottom: ${({ hastext }) => (hastext ? '-6px' : '0')};
  }
`;

const TextContainer = styled(Typography)`
  ${({ appearance }) => (appearance === 'subtleLink' || appearance === 'link') &&
    `
    margin-right: 4px;
    margin-left: 4px;
    &:hover {
      text-decoration: underline;
    }`
  }
`;

export function StyledIconButton({ iconName, text, appearance, as, ...props }) {
  return (
    <BaseStyle appearance={appearance} hastext={text} forwardedAs={as} {...props}>
      <Icon name={iconName} />
      {text && <TextContainer appearance={appearance}>{text}</TextContainer>}
    </BaseStyle>
  );
};

StyledIconButton.defaultProps = {
  appearance: 'primary',
  iconName: 'navigation-users',
  text: '',
  as: undefined,
};

StyledIconButton.propTypes = {
  appearance: PropTypes.string,
  iconName: PropTypes.string,
  text: PropTypes.string,
  as: PropTypes.string,
};
