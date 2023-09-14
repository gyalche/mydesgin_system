import React from 'react';
import { Icon } from 'src/components/Atoms/Icon';
import PropTypes from 'prop-types';
import Button from 'src/components/Atoms/Button';
import styled from 'styled-components';

export const BaseStyle = styled(Button)`
  font-size: ${({ compact, hasText }) => (compact || hasText ? '24px' : '32px')};
  display: flex;
  flex-direction: ${({ position }) => (position === 'right' ? 'row-reverse' : 'row')};
  padding: ${({ hasText }) => (hasText ? '' : '4px')};
  padding-bottom: 0;

  &:hover, &:active {
    text-decoration: none;
  }

  span {
    font-size: 14px;
    ${({ position }) => position === 'right' ? 'margin-right: 4px;' : 'margin-left: 4px;'}
  }
  
  i {
    margin-bottom: ${({ hasText }) => (hasText ? '-2px' : '0')};
  }
`;

export function StyledIconButton({ iconName, text, appearance, ...props }) {
  return (
    <BaseStyle appearance={appearance} hasText={text} {...props}>
      <Icon name={iconName} /> 
      {text && <span>{text}</span>}
    </BaseStyle>
  );
};

StyledIconButton.propTypes = {
  iconName: PropTypes.string,
  text: PropTypes.string,
  appearance: PropTypes.string,
};
