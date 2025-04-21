import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Typography } from 'components/Atoms';
import { Flex } from 'components/Atoms/Layout';

import { SelectorIcon } from './DefaultDisplay';

const ValueWrapper = styled(Flex).attrs(props => ({
  h: props?.$h,
  alignItems: 'center',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  justifyContent: 'space-between',
}))`
  background: ${({ $isOpen }) => ($isOpen
    ? 'var(--rds-color-neutral-1)'
    : 'var(--rds-color-neutral-0)')};
  padding: 0 8px;

  &:focus {
    outline: none;
  }

  &:hover {
    border-radius: 4px;
    background: var(--rds-color-neutral-1);
  }
`;

const OptionSelectDisplay = forwardRef((
  {
    h, label, selectedItem, isOpen, ...rest
  },
  ref,
) => (
  <ValueWrapper
    $h={h}
    $isOpen={isOpen}
    ref={ref}
    data-testid="selector-value-wrapper"
    {...rest}
  >
    <Typography level="h8">
      {label}
      :
      {selectedItem?.label}
    </Typography>
    <SelectorIcon isOpen={isOpen} />
  </ValueWrapper>
));

OptionSelectDisplay.displayName = 'OptionSelectDisplay';

OptionSelectDisplay.defaultProps = {
  label: '',
  selectedItem: '',
  isOpen: '',
  h: '',
};

OptionSelectDisplay.propTypes = {
  h: PropTypes.string,
  label: PropTypes.string,
  selectedItem: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  isOpen: PropTypes.bool,
};

export default OptionSelectDisplay;
