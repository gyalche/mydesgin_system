import React from 'react';
import Icon from 'src/components/Atoms/Icon';
import PropTypes from 'prop-types';
import Button from 'src/components/Atoms/Button';
import styled from 'styled-components';

export const BaseStyle = styled(Button)`
  display: flex;
  flex-direction: ${({ position }) => (position === 'right' ? 'row-reverse' : 'row')};
  font-size: ${({ compact, hasText }) => (compact || hasText ? '24px' : '32px')};
  padding: ${({ hasText }) => (hasText ? '' : '4px')};
  padding-bottom: 0;

  &:hover, &:active {
    text-decoration: none;
  }

  i {
    margin-bottom: ${({ hasText }) => (hasText ? '-2px' : '0')};
  }

  span {
    font-size: 14px;
    ${({ position }) => position === 'right' ? 'margin-right: 4px;' : 'margin-left: 4px;'}
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

StyledIconButton.defaultProps = {
  appearance: 'primary',
  iconName: 'navigation-users',
  text: '',
};

StyledIconButton.propTypes = {
  appearance: PropTypes.string,
  iconName: PropTypes.string,
  text: PropTypes.string,
};
