import React from 'react';
import PropTypes from 'prop-types';
import { styled } from 'styled-components';

const DropdownContainer = styled.div`
  background: var(--rds-color-neutral-0);
  border: 1px solid var(--rds-color-neutral-3);
  border-radius: 4px;
  box-shadow: 0 4px 8px 0 rgba(156, 168, 184, 0.48);
  overflow-y: auto;
  padding: 0;
  position: absolute;
  z-index: 10;
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

export const Dropdown = ({
  isOpen,
  w,
  h,
  scroll,
  children,
  mt,
  mr,
  mb,
  ml,
  ...rest
}) => {
  return (
    <DropdownContainer
      $scroll={scroll}
      $isOpen={isOpen}
      $w={w}
      $h={h}
      $mt={mt}
      $mr={mr}
      $mb={mb}
      $ml={ml}
      data-testid="dropdown"
      {...rest}
    >
      {isOpen && children}
    </DropdownContainer>
  );
};

Dropdown.defaultProps = {
  isOpen: false,
  w: '240px',
  h: '200px',
  mt: '0',
  mr: '0',
  mb: '0',
  ml: '0',
  scroll: true,
};

Dropdown.propTypes = {
  isOpen: PropTypes.bool,
  w: PropTypes.string,
  h: PropTypes.string,
  mt: PropTypes.string,
  mr: PropTypes.string,
  mb: PropTypes.string,
  ml: PropTypes.string,
  scroll: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.array,
    PropTypes.node,
  ]).isRequired,
};

export default Dropdown;
