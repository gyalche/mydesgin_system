import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Icon from 'components/Atoms/Icon';
import { Flex } from 'components/Atoms/Layout';

const ValueWrapper = styled(Flex).attrs(props => ({
  h: props.$h,
  alignItems: 'center',
  justifyContent: 'space-between',
  border: '1px solid var(--rds-color-neutral-3)',
  borderRadius: '4px',
  cursor: 'pointer',
}))`
  background: var(--rds-color-neutral-0);
  padding: 0 8px;

  &:focus {
    outline: 3px solid var(--rds-color-primary-1-pale);
  }
`;

const IconWrapper = styled.div`
  margin-top: 4px;
  margin-left: 4px;
`;

export function SelectorIcon({ isOpen }) {
  return (
    <IconWrapper>
      <Icon name={`global-chevron-large-${isOpen ? 'up' : 'down'}`} />
    </IconWrapper>
  );
}

SelectorIcon.propTypes = {
  isOpen: PropTypes.bool.isRequired,
};

const DefaultDisplay = forwardRef((
  {
    h, selectedItem, isOpen, ...rest
  },
  ref,
) => (
  <ValueWrapper
    $h={h}
    ref={ref}
    data-testid="selector-value-wrapper"
    {...rest}
  >
    <div>{selectedItem?.label}</div>
    <SelectorIcon isOpen={isOpen} />
  </ValueWrapper>
));

DefaultDisplay.displayName = 'DefaultDisplay';

DefaultDisplay.defaultProps = {
  selectedItem: '',
  isOpen: '',
  h: '',
};

DefaultDisplay.propTypes = {
  h: PropTypes.string,
  selectedItem: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  isOpen: PropTypes.bool,
};

export default DefaultDisplay;
