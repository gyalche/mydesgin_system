import React from 'react';
import Icon from 'src/components/Atoms/Icon';
import PropTypes from 'prop-types';
import Button from 'src/components/Atoms/Button';
import styled from 'styled-components';

export const BaseStyle = styled(Button)`
  align-items: center;
  cursor: pointer;
  display: flex;
  flex-direction: ${({ position }) => (position === 'right' ? 'row-reverse' : 'row')};
  font-size: ${({ compact, hasText }) => (compact || hasText ? '24px' : '32px')};
  padding: ${({ hasText }) => (hasText ? '' : '4px')};
  padding-bottom: 0;
  text-decoration: none;

  &:active {
    outline: none;
  }

  i {
    margin-bottom: ${({ hasText }) => (hasText ? '-2px' : '0')};
  }

  span {
    font-size: 14px;
    ${({ position }) => position === 'right' ? 'margin-right: 4px;' : 'margin-left: 4px;'}
  }
`;

export function StyledIconButton({ iconName, text, appearance, as, ...props }) {
  return (
    <BaseStyle appearance={appearance} hasText={text} forwardedAs={as} {...props}>
      <Icon name={iconName} />
      {text && <span>{text}</span>}
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
