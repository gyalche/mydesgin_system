import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Icon from 'components/Atoms/Icon';

const ValueWrapper = styled.div`
  align-items: center;
  background: var(--rds-color-neutral-0);
  border: 1px solid var(--rds-color-neutral-3);
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  height: ${({ $h }) => $h};
  justify-content: space-between;
  padding: 0 8px;

  &:focus {
    outline: 3px solid var(--rds-color-primary-1-pale);
  }
`;

const IconWrapper = styled.div`
  margin-top: 4px;
  margin-left: 4px;
`;

export const SelectorIcon = ({ isOpen }) => {
  return (
    <IconWrapper>
      <Icon name={`global-chevron-large-${isOpen ? 'up' : 'down'}`} />
    </IconWrapper>
  );
};

SelectorIcon.propTypes = {
  isOpen: PropTypes.bool.isRequired,
};

const DefaultDisplay = forwardRef(function DefaultDisplay(
  { h, selectedItem, isOpen, ...rest },
  ref
) {
  return (
    <ValueWrapper
      $h={h}
      ref={ref}
      data-testid="selector-value-wrapper"
      {...rest}
    >
      <div>{selectedItem?.label}</div>
      <SelectorIcon isOpen={isOpen} />
    </ValueWrapper>
  );
});

DefaultDisplay.defaultProps = {
  selectedItem: '',
  isOpen: '',
};

DefaultDisplay.propTypes = {
  h: PropTypes.string,
  selectedItem: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  isOpen: PropTypes.bool,
};

export default DefaultDisplay;
