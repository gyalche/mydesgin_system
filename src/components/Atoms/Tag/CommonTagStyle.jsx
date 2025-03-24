import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

import Icon from '../Icon';
import Typography from '../Typography';

const TagContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 4px 8px 4px 8px;
  border-radius: 4px 4px 2px 2px;
  background-color: var(--rds-color-neutral-0);
  border: 2px solid var(--rds-color-neutral-3);
  color: var(--rds-color-neutral-10);
  user-select: none;
  &:hover {
    background-color: ${({ disabled }) => (disabled ? 'var(--rds-color-neutral-2)' : 'var(--rds-color-neutral-0)')};
    border: ${({ disabled }) => (disabled ? '1px solid var(--rds-color-neutral-3)' : '1px solid var(--rds-color-primary-1-normal)')};
  }

  &:active {
    background-color: ${({ disabled }) => (disabled ? 'var(--rds-color-neutral-2)' : 'var(--rds-color-neutral-1)')};
    border: ${({ disabled }) => (disabled ? '1px solid var(--rds-color-neutral-3)' : '1px solid var(--rds-color-primary-1-normal)')};
    color: ${({ disabled }) => !disabled && 'var(--rds-color-neutral-10)'};
  }

  ${({ disabled }) => disabled && css`
    background-color: var(--rds-color-neutral-2);
    border: 1px solid var(--rds-color-neutral-3);
    color: var(--rds-color-neutral-5);
    cursor: not-allowed;
  `}
`;

const TagIcon = styled(Icon)`
  font-size: 18px;
  display: flex;
  align-items: center;
`;

function CommonTagStyle({ content, disabled, onCloseClick }) {
  return (
    <TagContainer disabled={disabled}>
      <Typography level="p3">
        {content}
      </Typography>
      {onCloseClick && (
        <TagIcon name="action-cross" onClick={onCloseClick} />
      )}
    </TagContainer>
  );
}

CommonTagStyle.propTypes = {
  content: PropTypes.string,
  disabled: PropTypes.bool,
  onCloseClick: PropTypes.func,
};

CommonTagStyle.defaultProps = {
  disabled: false,
  content: '',
  onCloseClick: () => {},
};

export default CommonTagStyle;
