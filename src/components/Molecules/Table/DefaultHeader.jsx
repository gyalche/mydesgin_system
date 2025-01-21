import PropTypes from 'prop-types';
import React from 'react';
import { styled } from 'styled-components';

const Header = styled.thead`
  color: ${props => props.color};
  display: table-cell;
`;

const Row = styled.tr`
  display: flex;
`;

const TextColumn = styled.td`
  flex: ${props => props.flex};
  font-size: 12px;
  Line height: 14.4px;
  min-width: ${props => props.minWidth};
  weight: 700;
`;

function DefaultHeader({ columns, color }) {
  return (
    <Header color={color}>
      <Row>
        {columns.map(column => (
          <TextColumn key={column.label} {...column}>
            {column.label}
          </TextColumn>
        ))}
      </Row>
    </Header>
  );
}

DefaultHeader.defaultProps = {
  color: 'var(--rds-color-neutral-10)',
};

DefaultHeader.propTypes = {
  color: PropTypes.string,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      flex: PropTypes.string,
      field: PropTypes.string,
    }),
  ).isRequired,

};

export default DefaultHeader;
