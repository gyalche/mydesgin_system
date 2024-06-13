import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { SelectorIcon } from './DefaultDisplay';

const ValueWrapper = styled.div`
  align-items: center;
  background: var(--rds-color-neutral-0);
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
`;

const OptionSelectDisplay = forwardRef(function DefaultDisplay(
  { h, label, selectedItem, isOpen, ...rest },
  ref
) {
  return (
    <ValueWrapper
      $h={h}
      ref={ref}
      data-testid="selector-value-wrapper"
      {...rest}
    >
      <div>
        {label}: {selectedItem?.label}
      </div>
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
