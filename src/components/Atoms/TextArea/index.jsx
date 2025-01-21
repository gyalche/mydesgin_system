import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledTextArea = styled.textarea.withConfig({
  shouldForwardProp: prop => !['isInvalid', 'compact', 'w', 'h', 'mt', 'mr', 'mb', 'ml'].includes(prop),
})`
  background: var(--rds-color-neutral-0);
  border: ${({ isInvalid }) => (isInvalid
    ? '1px solid var(--rds-color-secondary-3-normal)'
    : '1px solid var(--rds-color-neutral-3)')};
  border-radius: 4px;
  color: var(--rds-color-neutral-10);
  height: ${({ h }) => h};
  width: ${({ w }) => w};
  margin-top: ${({ mt }) => mt};
  margin-right: ${({ mr }) => mr};
  margin-bottom: ${({ mb }) => mb};
  margin-left: ${({ ml }) => ml};
  padding: 8px;
  resize: none;

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

function TextArea({
  mt, mr, mb, ml, w, h, isInvalid, ...inputProps
}) {
  return (
    <StyledTextArea
      {...inputProps}
      mt={mt}
      mr={mr}
      mb={mb}
      ml={ml}
      w={w}
      h={h}
      isInvalid={isInvalid}
    />
  );
}

TextArea.propTypes = {
  mt: PropTypes.string,
  mr: PropTypes.string,
  mb: PropTypes.string,
  ml: PropTypes.string,
  w: PropTypes.string,
  h: PropTypes.string,
  isInvalid: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
};

TextArea.defaultProps = {
  mt: '0',
  mr: '0',
  mb: '0',
  ml: '0',
  w: '200px',
  h: '300px',
  isInvalid: false,
};

export default TextArea;
