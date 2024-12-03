import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledInput = styled.input.withConfig({
  shouldForwardProp: prop =>
    !['isInvalid', 'compact', 'w', 'mt', 'mr', 'mb', 'ml'].includes(prop),
})`
  background: var(--rds-color-neutral-0);
  border: ${({ isInvalid }) =>
    isInvalid
      ? '1px solid var(--rds-color-secondary-3-normal)'
      : '1px solid var(--rds-color-neutral-3)'};
  border-radius: 4px;
  color: var(--rds-color-neutral-10);
  height: ${({ compact }) => (compact ? '32px' : '40px')};
  margin-top: ${({ mt }) => mt};
  margin-right: ${({ mr }) => mr};
  margin-bottom: ${({ mb }) => mb};
  margin-left: ${({ ml }) => ml};
  padding: ${({ compact }) => (compact ? '6px 8px' : '10px 8px')};
  width: ${({ w }) => w};

  &::placeholder {
    color: var(--rds-color-neutral-5);
  }

  &:hover {
    border: 1px solid var(--rds-color-primary-1-normal);
  }

  &:disabled {
    background-color: var(--rds-color-neutral-2);
    border: 1px solid var(--rds-color-neutral-3);
    color: var(--rds-color-neutral-5);
  }
`;

const Input = forwardRef(
  (
    { mt, mr, mb, ml, w, compact, isInvalid, name, value, onChange, input, ...props },
    ref
  ) => {
    return (
      <StyledInput
        ref={ref}
        name={name ?? input?.name}
        value={value ?? input?.value}
        onChange={onChange ?? input?.onChange}
        mt={mt}
        mr={mr}
        mb={mb}
        ml={ml}
        w={w}
        compact={compact}
        isInvalid={isInvalid}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';
Input.propTypes = {
  mt: PropTypes.string,
  mr: PropTypes.string,
  mb: PropTypes.string,
  ml: PropTypes.string,
  w: PropTypes.string,
  compact: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  isInvalid: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  name: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  input: PropTypes.object,
};

Input.defaultProps = {
  mt: '0',
  mr: '0',
  mb: '0',
  ml: '0',
  w: 'auto',
  compact: false,
  isInvalid: false,
};

export default Input;
