import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import DefaultRow from './DefaultRow';
import DefaultHeader from './DefaultHeader';

const TableBodyContainer = styled.tbody``;

const TableContainer = styled.table`
  height: ${props => props.height};
  padding: ${props => props.padding};
  width: ${props => props.width};
`;

const Table = ({ data, columns, RowComponent, HeaderComponent, ...style }) => {
  return (
    <TableContainer {...style}>
      {HeaderComponent && <HeaderComponent columns={columns}/>}
      <TableBodyContainer>
        {data.map((rowData, index) => (
          <RowComponent key={index} data={rowData} columns={columns}/>
        ))}
      </TableBodyContainer>
    </TableContainer>
  );
};

Table.defaultProps = {
  height: '100%',
  padding: '0',
  width: '100%',
  RowComponent: DefaultRow,
  HeaderComponent: DefaultHeader,
};

Table.propTypes = {
  columns: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
  ]).isRequired,
  data: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
  ]).isRequired,
  HeaderComponent: PropTypes.elementType,
  height: PropTypes.string,
  padding: PropTypes.string,
  RowComponent: PropTypes.elementType,
  width: PropTypes.string,
};

export default Table;
