import PropTypes from 'prop-types';
import React from 'react';
import { styled } from 'styled-components';

const Column = styled.td`
  display: flex;
  flex: ${props => props.flex};
  min-width: ${props => props.minWidth};
  padding-top: 8px;
  white-space: pre-line;
`;

const Row = styled.tr`
  align-items: center;
  background-color: var(--rds-color-neutral-0);
  color: var(--rds-color-neutral-10);
  display: flex;
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
  letter-spacing: 0px;
  text-align: left;
  width: 100%;
`;

const DefaultRow = ({ data, columns }) => {
  return (
    <Row>
      {columns.map((column, index) => {
        return <Column key={index} {...column}>{data[column.field]}</Column>;
      })}
    </Row>
  );
};

DefaultRow.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.object.isRequired,
};

export default DefaultRow;
