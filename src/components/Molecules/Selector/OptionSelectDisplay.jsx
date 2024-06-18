import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Typography } from 'components/Atoms';

import { SelectorIcon } from './DefaultDisplay';

const ValueWrapper = styled.div`
  align-items: center;

  background: ${({ $isOpen }) =>
    $isOpen
      ? 'var(--rds-color-neutral-alpha-1)'
      : 'var(--rds-color-neutral-0)'};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  height: ${({ $h }) => $h};
  justify-content: space-between;
  padding: 0 8px;

  &:focus {
    outline: none;
  }

  &:hover {
    border-radius: 4px;
    background: var(--rds-color-neutral-alpha-1);
  }
`;

const OptionSelectDisplay = forwardRef(function DefaultDisplay(
  { h, label, selectedItem, isOpen, ...rest },
  ref
) {
  return (
    <ValueWrapper
      $h={h}
      $isOpen={isOpen}
      ref={ref}
      data-testid="selector-value-wrapper"
      {...rest}
    >
      <Typography level="h8">
        {label}: {selectedItem?.label}
      </Typography>
      <SelectorIcon isOpen={isOpen} />
    </ValueWrapper>
  );
});

OptionSelectDisplay.defaultProps = {
  label: '',
  selectedItem: '',
  isOpen: '',
};

OptionSelectDisplay.propTypes = {
  h: PropTypes.string,
  label: PropTypes.string,
  selectedItem: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  isOpen: PropTypes.bool,
};

export default OptionSelectDisplay;
