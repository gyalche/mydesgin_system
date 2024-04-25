import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Icon } from 'src/components/Atoms';

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const PaginationList = styled.ul`
  align-items: center;
  display: flex;
  list-style: none;
  padding: 0;
`;

const PaginationControl = styled.div`
  color: var(--rds-color-neutral-8);
  cursor: pointer;
  font-size: 24px;
  height: 32px;
  margin: ${({ $isPrevious }) => ($isPrevious ? '0 4px 0 0' : '0 0 0 4px')};
  padding: 4px;
  width: 32px;

  i {
    position: relative;
    top: -4px;
  }

  &:focus {
    outline: 1px solid var(--rds-color-primary-1-dark);
  }
`;

const PaginationItem = styled.li`
  align-items: center;
  background-color: ${({ $active }) =>
    $active
      ? 'var(--rds-color-primary-1-subtle)'
      : 'var(--rds-color-neutral-0)'};
  border-radius: 5px;
  color: ${({ $active }) =>
    $active ? 'var(--rds-color-primary-1-dark)' : 'var(--rds-color-neutral-8)'};
  cursor: pointer;
  display: flex;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  height: 32px;
  justify-content: center;
  line-height: 160%;
  margin: 0 4px;
  padding: 4px 12px;
  width: 32px;

  &:focus {
    outline: 1px solid var(--rds-color-primary-1-dark);
  }
`;

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const handlePageChange = page => {
    if (page !== currentPage && page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const handleKeyDown = (event, page, paginationControl) => {
    if (event.key === 'Enter') {
      if (paginationControl === 'isPrevious') {
        handlePreviousChange();
        return;
      }

      if (paginationControl === 'isNext') {
        handleNextChange();
        return;
      }

      handlePageChange(page);
    }
  };

  const handlePreviousChange = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextChange = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const renderPaginationItems = () => {
    const paginationItems = [];

    // Number of pages to show before ellipses excluding first and last page
    const visiblePages = 4;

    // First page
    paginationItems.push(
      <PaginationItem
        key={1}
        $active={1 === currentPage}
        onClick={() => handlePageChange(1)}
        onKeyDown={event => handleKeyDown(event, 1)}
        tabIndex={0}
      >
        1
      </PaginationItem>
    );

    // Range of pages to display
    let start = Math.max(2, currentPage - Math.floor(visiblePages / 2));
    let end = Math.min(start + visiblePages - 1, totalPages - 1);

    // If there are not enough pages after the current page, adjust the range
    if (end === totalPages - 1) {
      start = Math.max(2, end - visiblePages + 1);
    }

    if (start > 2) {
      paginationItems.push(
        <PaginationItem key="ellipsis-start" data-testid="ellipsis-start">
          ...
        </PaginationItem>
      );
    }

    for (let i = start; i <= end; i++) {
      paginationItems.push(
        <PaginationItem
          key={i}
          $active={i === currentPage}
          onClick={() => handlePageChange(i)}
          onKeyDown={event => handleKeyDown(event, i)}
          tabIndex={0}
        >
          {i}
        </PaginationItem>
      );
    }

    if (end < totalPages - 1) {
      paginationItems.push(
        <PaginationItem key="ellipsis-end" data-testid="ellipsis-end">
          ...
        </PaginationItem>
      );
    }

    // Last page
    if (totalPages > 1) {
      paginationItems.push(
        <PaginationItem
          key={totalPages}
          $active={totalPages === currentPage}
          onClick={() => handlePageChange(Number(totalPages))}
          onKeyDown={event => handleKeyDown(event, Number(totalPages))}
          tabIndex={0}
        >
          {totalPages}
        </PaginationItem>
      );
    }

    return paginationItems;
  };

  return (
    <PaginationContainer>
      <PaginationList>
        <PaginationControl
          $isPrevious
          onClick={() => handlePreviousChange()}
          onKeyDown={event => handleKeyDown(event, null, 'isPrevious')}
          tabIndex={0}
          data-testid="prev-button"
        >
          <Icon name="Interface-chevron-left" />
        </PaginationControl>
        {renderPaginationItems()}
        <PaginationControl
          onClick={() => handleNextChange()}
          onKeyDown={event => handleKeyDown(event, null, 'isNext')}
          tabIndex={0}
          data-testid="next-button"
        >
          <Icon name="Interface-chevron-right" />
        </PaginationControl>
      </PaginationList>
    </PaginationContainer>
  );
};

Pagination.defaultProps = {
  currentPage: 1,
};

Pagination.propTypes = {
  totalPages: PropTypes.number.isRequired,
  currentPage: PropTypes.number,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
