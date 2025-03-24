import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { styled } from 'styled-components';

const DropdownContainer = styled.div`
  background: var(--rds-color-neutral-0);
  border: ${({ $border }) => $border};
  border-radius: 4px;
  box-shadow: ${({ $boxShadow }) => $boxShadow && `var(--rds-box-shadow-${$boxShadow})`};
  overflow-y: auto;
  overflow-x: ${({ $overflowX }) => $overflowX};
  padding: ${({ $p }) => $p};
  position: absolute;
  z-index: var(--rds-z-index-3);
  right: ${({ $right }) => $right};
  margin-top: ${({ $mt }) => $mt};
  margin-right: ${({ $mr }) => $mr};
  margin-bottom: ${({ $mb }) => $mb};
  margin-left: ${({ $ml }) => $ml};
  width: ${({ $w }) => $w};
  min-height: ${({ $scroll, $h }) => !$scroll && $h};
  height: ${({ $scroll, $h }) => $scroll && $h};
  visibility: ${({ $isOpen }) => ($isOpen ? 'visible' : 'hidden')};

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: var(--rds-color-neutral-0);
  }

  &::-webkit-scrollbar-thumb {
    background: var(--rds-color-neutral-4);
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: var(--rds-color-neutral-4);
    border-radius: 3px;
  }
`;

const Dropdown = forwardRef(
  (
    {
      isOpen,
      w,
      h,
      scroll,
      overflowX,
      children,
      mt,
      mr,
      mb,
      ml,
      border,
      boxShadow,
      p,
      right,
      ...rest
    },
    ref,
  ) => (
    <DropdownContainer
      $scroll={scroll}
      $isOpen={isOpen}
      $overflowX={overflowX}
      $w={w}
      $h={h}
      $mt={mt}
      $mr={mr}
      $mb={mb}
      $ml={ml}
      $border={border}
      $boxShadow={boxShadow}
      $p={p}
      $right={right}
      data-testid="dropdown"
      {...rest}
      ref={ref}
    >
      {isOpen && children}
    </DropdownContainer>
  ),
);

Dropdown.displayName = 'Dropdown';

Dropdown.defaultProps = {
  isOpen: false,
  w: '240px',
  h: '200px',
  mt: '0',
  mr: '0',
  mb: '0',
  ml: '0',
  p: '0',
  border: '1px solid var(--rds-color-neutral-3)',
  boxShadow: 3,
  scroll: true,
  overflowX: 'visible',
  right: 'auto',
  children: undefined,
};

Dropdown.propTypes = {
  isOpen: PropTypes.bool,
  w: PropTypes.string,
  h: PropTypes.string,
  mt: PropTypes.string,
  mr: PropTypes.string,
  mb: PropTypes.string,
  ml: PropTypes.string,
  border: PropTypes.string,
  boxShadow: PropTypes.oneOf([1, 2, 3, 4]),
  right: PropTypes.string,
  p: PropTypes.string,
  scroll: PropTypes.bool,
  overflowX: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.array,
    PropTypes.node,
  ]),
};

export default Dropdown;
