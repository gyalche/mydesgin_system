import React, { useState } from 'react';
import PropTypes from 'prop-types';
import expect from 'expect';
import { render, screen, waitFor } from '@testing-library/react';
import { userEvent } from '@storybook/testing-library';

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
      'var(--rds-color-primary-1-dark)'
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
      'var(--rds-color-primary-1-dark)'
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
      'var(--rds-color-primary-1-dark)'
    );
  });
});

it('should display ellipses when there are more than 7 pages', () => {
  render(<TestComponent totalPages={12} />);
  const ellipsesStart = screen.getByText('...');

  expect(ellipsesStart).toBeInTheDocument();
});
