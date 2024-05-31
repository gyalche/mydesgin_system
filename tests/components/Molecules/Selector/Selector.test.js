import React from 'react';
import expect from 'expect';
import { render, screen, fireEvent } from '@testing-library/react';

import Selector from 'src/components/Molecules/Selector';

it('should change selector style when w has value', () => {
  const width = '300px';
  render(<Selector w={width} />);
  const selector = screen.getByTestId('selector');

  expect(selector).toHaveStyleRule('width', width);
});

it('should change selector style when h has value', () => {
  const height = '50px';
  render(<Selector h={height} />);
  const selector = screen.getByTestId('selector-value-wrapper');

  expect(selector).toHaveStyleRule('height', height);
});

it('should change style on focus', () => {
  render(<Selector />);
  const selectorInput = screen.getByTestId('selector-value-wrapper');

  expect(selectorInput).toHaveStyleRule(
    'outline',
    '3px solid var(--rds-color-primary-1-pale)',
    {
      modifier: ':focus',
    }
  );
});

it('should render dropdown, ul and all the list items when clicked', () => {
  const options = [
    { label: 'Black', value: 1 },
    { label: 'Red', value: 2 },
    { label: 'Green', value: 3 },
    { label: 'Blue', value: 4 },
    { label: 'Orange', value: 5 },
    { label: 'Purple', value: 6 },
    { label: 'Pink', value: 7 },
    { label: 'Orchid', value: 8 },
    { label: 'Aqua', value: 9 },
    { label: 'Lime', value: 10 },
    { label: 'Gray', value: 11 },
    { label: 'Brown', value: 12 },
    { label: 'Teal', value: 13 },
    { label: 'Skyblue', value: 14 },
  ];
  render(<Selector options={options} />);

  const selectorInput = screen.getByTestId('selector-value-wrapper');
  const dropdownElement = screen.getByTestId('dropdown');

  expect(dropdownElement).toHaveStyleRule('visibility', 'hidden');

  fireEvent.click(selectorInput);

  const ulElement = screen.getByRole('listbox');
  const listItems = screen.getAllByRole('option');

  expect(dropdownElement).toHaveStyleRule('visibility', 'visible');
  expect(ulElement).toBeInTheDocument();
  expect(listItems).toHaveLength(14);
});

it('should change style when mt has value', () => {
  const margin = '100px';
  render(<Selector mt={margin} />);
  const selector = screen.getByTestId('selector');

  expect(selector).toHaveStyleRule('margin-top', margin);
});

it('should change style when mr has value', () => {
  const margin = '100px';
  render(<Selector mr={margin} />);
  const selector = screen.getByTestId('selector');

  expect(selector).toHaveStyleRule('margin-right', margin);
});

it('should change style when mb has value', () => {
  const margin = '100px';
  render(<Selector mb={margin} />);
  const selector = screen.getByTestId('selector');

  expect(selector).toHaveStyleRule('margin-bottom', margin);
});

it('should change style when ml has value', () => {
  const margin = '100px';
  render(<Selector ml={margin} />);
  const selector = screen.getByTestId('selector');

  expect(selector).toHaveStyleRule('margin-left', margin);
});
