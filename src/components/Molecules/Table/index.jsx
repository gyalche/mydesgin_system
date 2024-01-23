import { default as DefaultTable } from './DefaultTable';
import { default as DefaultRow } from './DefaultRow';
import { default as DefaultHeader } from './DefaultHeader';

const Table = DefaultTable;

Table.Header = DefaultHeader;
Table.Row = DefaultRow;

export default Table;
