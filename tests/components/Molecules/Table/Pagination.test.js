import React, { useState } from 'react';
import PropTypes from 'prop-types';
import expect from 'expect';
import { render, screen, waitFor } from '@testing-library/react';
import { userEvent, fireEvent } from '@storybook/test';

import Table from 'src/components/Molecules/Table';

const { Pagination } = Table;

const TestComponent = ({ currentPage, totalPages }) => {
  const [current, setCurrent] = useState(currentPage);

  return (
    <Pagination
      totalPages={totalPages}
      currentPage={current}
      onPageChange={setCurrent}
    />
  );
};

TestComponent.defaultProps = {
  currentPage: 1,
  totalPages: 5,
};

TestComponent.propTypes = {
  totalPages: PropTypes.number.isRequired,
  currentPage: PropTypes.number,
};

it('should go to the next page when next button is clicked', async () => {
  render(<TestComponent />);
  const nextButton = screen.getByTestId('next-button');
  const secondPageBtn = screen.getByText(2);

  expect(secondPageBtn).toHaveStyleRule(
    'background-color',
    'var(--rds-color-neutral-0)'
  );
  expect(secondPageBtn).toHaveStyleRule('color', 'var(--rds-color-neutral-8)');

  userEvent.click(nextButton);

  await waitFor(() => {
    expect(secondPageBtn).toHaveStyleRule(
      'background-color',
      'var(--rds-color-primary-1-subtle)'
    );
    expect(secondPageBtn).toHaveStyleRule(
      'color',
      'var(--rds-color-primary-1-intense)'
    );
  });
});

it('should go to the previous page when previous button is clicked', async () => {
  render(<TestComponent currentPage={2} />);
  const prevButton = screen.getByTestId('prev-button');
  const firstPageBtn = screen.getByText(1);

  expect(firstPageBtn).toHaveStyleRule(
    'background-color',
    'var(--rds-color-neutral-0)'
  );
  expect(firstPageBtn).toHaveStyleRule('color', 'var(--rds-color-neutral-8)');

  userEvent.click(prevButton);

  await waitFor(() => {
    expect(firstPageBtn).toHaveStyleRule(
      'background-color',
      'var(--rds-color-primary-1-subtle)'
    );
    expect(firstPageBtn).toHaveStyleRule(
      'color',
      'var(--rds-color-primary-1-intense)'
    );
  });
});

it('should change page number after clicking the page number button', async () => {
  render(<TestComponent />);
  const secondPageBtn = screen.getByText(2);

  expect(secondPageBtn).toHaveStyleRule(
    'background-color',
    'var(--rds-color-neutral-0)'
  );
  expect(secondPageBtn).toHaveStyleRule('color', 'var(--rds-color-neutral-8)');

  userEvent.click(secondPageBtn);

  await waitFor(() => {
    expect(secondPageBtn).toHaveStyleRule(
      'background-color',
      'var(--rds-color-primary-1-subtle)'
    );
    expect(secondPageBtn).toHaveStyleRule(
      'color',
      'var(--rds-color-primary-1-intense)'
    );
  });
});

it('should display ellipses when there are more than 7 pages', () => {
  render(<TestComponent totalPages={12} />);
  const ellipsesStart = screen.getByText('...');

  expect(ellipsesStart).toBeInTheDocument();
});

it('should apply proper style on hover', () => {
  render(<TestComponent totalPage={6} />);
  const page = screen.getByText(1);
  fireEvent.mouseOver(page);

  expect(page).toHaveStyleRule('background-color: var(--rds-color-neutral-1)');
});
