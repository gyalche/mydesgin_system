import { default as DefaultTable } from './DefaultTable';
import { default as DefaultRow } from './DefaultRow';
import { default as DefaultHeader } from './DefaultHeader';
import { default as Pagination } from './Pagination';

const Table = DefaultTable;

Table.Header = DefaultHeader;
Table.Row = DefaultRow;
Table.Pagination = Pagination;

export default Table;
