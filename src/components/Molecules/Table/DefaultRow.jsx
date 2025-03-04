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
  border-bottom: 1px solid var(--rds-color-neutral-3);

  &:last-child {
    border-bottom: none;
  }
`;

function DefaultRow({ data, columns }) {
  return (
    <Row>
      {columns.map(column => <Column key={column?.field} {...column}>{data[column.field]}</Column>)}
    </Row>
  );
}

DefaultRow.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      field: PropTypes.string.isRequired,
      flex: PropTypes.string,
    }),
  ),
  data: PropTypes.shape({
    effectiveDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
    meetingRoom: PropTypes.string,
    memo: PropTypes.string,
    personInCharge: PropTypes.string,
    receptionCode: PropTypes.string,
    title: PropTypes.string,
    visitor: PropTypes.string,
  }),
};

DefaultRow.defaultProps = {
  columns: null,
  data: null,
};

export default DefaultRow;
