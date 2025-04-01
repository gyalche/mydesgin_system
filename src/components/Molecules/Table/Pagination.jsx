import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Icon } from 'components/Atoms';
import * as Layout from 'components/Atoms/Layout';

import { ENTER } from '../../../constant/keyCodes';

const PaginationContainer = styled(Layout.Flex).attrs(() => ({ justifyContent: 'left', mt: '20px' }))``;

const PaginationList = styled(Layout.Flex).attrs(() => ({
  as: 'ul', alignItems: 'center', pt: '0', pr: '0', pb: '0', pl: '0',
}))`
  list-style: none;
`;

const PaginationControl = styled(Layout.Flex).attrs(() => ({
  alignItems: 'center', justifyContent: 'center', pt: '4px', pr: '4px', pb: '4px', pl: '4px', w: '40px', h: '40px',
}))`
  color: ${({ disabled }) => (disabled ? 'var(--rds-color-neutral-4)' : 'var(--rds-color-neutral-8)')};
  cursor: pointer;
  font-size: 24px;
  margin: ${({ $isPrevious }) => ($isPrevious ? '0 4px 0 0' : '0 0 0 4px')};
  border-radius: 100%;

  i {
    position: relative;
    margin-top: 4px;
  }

  &:hover {
    background-color: ${({ disabled }) => !disabled && 'var(--rds-color-neutral-2)'};
  }
`;

const PaginationEllipsis = styled(Layout.Flex).attrs(() => ({
  as: 'li', alignItems: 'center', justifyContent: 'center', pt: '4px', pr: '12px', pb: '4px', pl: '12px', w: '40px', h: '40px', mr: '4px', ml: '4px',
}))`
  border-radius: 100%;
  color: var(--rds-color-neutral-8);
  font-size: 14px;
  font-weight: 400;
  line-height: 160%;
  cursor: default;
`;

const PaginationItem = styled(PaginationEllipsis)`
  background-color: ${({ $pressed, $active }) => {
    if ($pressed) {
      return 'var(--rds-color-neutral-2)';
    }
    if ($active) {
      return 'var(--rds-color-primary-1-subtle)';
    }
    return 'var(--rds-color-neutral-0)';
  }};
  color: ${({ $active }) => ($active ? 'var(--rds-color-primary-1-intense)' : 'var(--rds-color-neutral-8)')};
  cursor: pointer;

  &:hover {
    background-color: ${({ $active }) => !$active && 'var(--rds-color-neutral-1)'};
  }
`;

function Pagination({ totalPages, currentPage, onPageChange }) {
  const [pressedPage, setPressedPage] = useState(null);
  let pressed = false;

  const handlePageChange = page => {
    if (page !== currentPage && page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
    setPressedPage(page);
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

  const handleKeyDown = (event, page, paginationControl) => {
    if (event.key === ENTER) {
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

  const onMouseDownChange = e => {
    e.preventDefault();
    pressed = true;
  };

  const renderPaginationItems = () => {
    const paginationItems = [];

    // Number of pages to show before ellipses excluding first and last page
    const visiblePages = 5;

    // First page
    paginationItems.push(
      <PaginationItem
        key={1}
        $active={currentPage === 1}
        onClick={() => handlePageChange(1)}
        onMouseDown={onMouseDownChange}
        onKeyDown={event => handleKeyDown(event, 1)}
        tabIndex={0}
      >
        1
      </PaginationItem>,
    );

    // Range of pages to display
    let start = Math.max(2, currentPage - Math.floor(visiblePages / 2));
    const end = Math.min(start + visiblePages - 1, totalPages - 1);

    // If there are not enough pages after the current page, adjust the range
    if (end === totalPages - 1) {
      start = Math.max(2, end - visiblePages + 1);
    }

    if (start > 2) {
      paginationItems.push(
        <PaginationEllipsis key="ellipsis-start" data-testid="ellipsis-start">
          ...
        </PaginationEllipsis>,
      );
    }

    for (let i = start; i <= end; i += 1) {
      paginationItems.push(
        <PaginationItem
          key={i}
          $active={i === currentPage}
          $pressed={pressedPage === i && pressed}
          onClick={() => handlePageChange(i)}
          onKeyDown={event => handleKeyDown(event, i)}
          onMouseDown={onMouseDownChange}
          tabIndex={0}
        >
          {i}
        </PaginationItem>,
      );
    }

    if (end < totalPages - 1) {
      paginationItems.push(
        <PaginationEllipsis key="ellipsis-end" data-testid="ellipsis-end">
          ...
        </PaginationEllipsis>,
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
          onMouseDown={onMouseDownChange}
          tabIndex={0}
        >
          {totalPages}
        </PaginationItem>,
      );
    }

    return paginationItems;
  };

  return (
    <PaginationContainer>
      <PaginationList>
        <PaginationControl
          $isPrevious={true}
          onClick={() => handlePreviousChange()}
          onKeyDown={event => handleKeyDown(event, null, 'isPrevious')}
          onMouseDown={onMouseDownChange}
          tabIndex={0}
          data-testid="prev-button"
          disabled={currentPage === 1}
        >
          <Icon name="Interface-chevron-left" />
        </PaginationControl>
        {renderPaginationItems()}
        <PaginationControl
          onClick={() => handleNextChange()}
          onKeyDown={event => handleKeyDown(event, null, 'isNext')}
          onMouseDown={onMouseDownChange}
          tabIndex={0}
          data-testid="next-button"
          disabled={totalPages === currentPage}
        >
          <Icon name="Interface-chevron-right" />
        </PaginationControl>
      </PaginationList>
    </PaginationContainer>
  );
}

Pagination.defaultProps = {
  currentPage: 1,
};

Pagination.propTypes = {
  totalPages: PropTypes.number.isRequired,
  currentPage: PropTypes.number,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
