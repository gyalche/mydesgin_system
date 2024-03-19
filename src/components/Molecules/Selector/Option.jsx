import React from 'react';
import PropTypes from 'prop-types';
import { styled } from 'styled-components';

const ListItem = styled.li`
  cursor: pointer;
  list-style: none;
  margin: 8px 0;
  padding: 8px 20px;
  color: ${({ $isHighlighted }) =>
    $isHighlighted ? 'var(--rds-color-primary-1-dark)' : 'var(--rds-color-neutral-10)'};

  &:hover {
    background: rgba(226, 231, 239, 0.32);
  }
`;

export const Option = ({
  item,
  index,
  highlightedIndex,
  getItemProps,
  children,
  ...rest
}) => {
  return (
    <ListItem
      $isHighlighted={highlightedIndex === index}
      {...getItemProps({ item, index })}
    >
      <span>{children}</span>
    </ListItem>
  );
};

Option.propTypes = {
  item: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  highlightedIndex: PropTypes.number.isRequired,
  children: PropTypes.string.isRequired,
  getItemProps: PropTypes.func.isRequired,
};

export default Option;
