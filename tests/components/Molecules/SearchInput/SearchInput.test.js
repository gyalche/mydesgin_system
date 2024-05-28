import React from 'react';
import expect from 'expect';
import { render, screen, fireEvent } from '@testing-library/react';

import SearchInput from 'src/components/Molecules/SearchInput';

it('applies default styles', () => {
  render(<SearchInput />);
  const inputElement = screen.getByRole('textbox');

  expect(inputElement).toHaveStyleRule('height', '40px');
  expect(inputElement).toHaveStyleRule('padding', '10px 8px');
});

it('applies custom styles when compact is true', () => {
  render(<SearchInput compact="true" />);
  const inputElement = screen.getByRole('textbox');

  expect(inputElement).toHaveStyleRule('padding', '6px 8px');
});

it('handles user interaction', () => {
  render(<SearchInput />);
  const inputElement = screen.getByRole('textbox');

  fireEvent.change(inputElement, { target: { value: 'Test input value' } });

  expect(inputElement).toHaveValue('Test input value');
});

it('input changes style on hover', () => {
  render(<SearchInput />);
  const inputElement = screen.getByRole('textbox');

  expect(inputElement).toHaveStyleRule(
    'border',
    '1px solid var(--rds-color-primary-1-normal)',
    { modifier: ':hover' }
  );
});

it('input can be focused', () => {
  render(<SearchInput />);
  const inputElement = screen.getByRole('textbox');

  inputElement.focus();

  expect(inputElement).toHaveFocus();
});

it('input changes style on invalid', () => {
  render(<SearchInput isInvalid />);
  const inputElement = screen.getByRole('textbox');

  expect(inputElement).toHaveStyleRule(
    'border',
    '1px solid var(--rds-color-secondary-3-normal)'
  );
});

it('input changes style on disabled', () => {
  render(<SearchInput />);
  const inputElement = screen.getByRole('textbox');

  expect(inputElement).toHaveStyleRule('color', 'var(--rds-color-neutral-5)', {
    modifier: ':disabled',
  });
  expect(inputElement).toHaveStyleRule(
    'background-color',
    'var(--rds-color-neutral-2)',
    { modifier: ':disabled' }
  );
  expect(inputElement).toHaveStyleRule(
    'border',
    '1px solid var(--rds-color-neutral-3)',
    { modifier: ':disabled' }
  );
});

it('input changes style when mt has value', () => {
  const margin = '100px';
  render(<SearchInput mt={margin} />);
  const inputElement = screen.getByRole('textbox');

  expect(inputElement).toHaveStyleRule('margin-top', margin);
});

it('input changes style when mr has value', () => {
  const margin = '100px';
  render(<SearchInput mr={margin} />);
  const inputElement = screen.getByRole('textbox');

  expect(inputElement).toHaveStyleRule('margin-right', margin);
});

it('input changes style when mb has value', () => {
  const margin = '100px';
  render(<SearchInput mb={margin} />);
  const inputElement = screen.getByRole('textbox');

  expect(inputElement).toHaveStyleRule('margin-bottom', margin);
});

it('input changes style when ml has value', () => {
  const margin = '100px';
  render(<SearchInput ml={margin} />);
  const inputElement = screen.getByRole('textbox');

  expect(inputElement).toHaveStyleRule('margin-left', margin);
});

it('should render the search icon as default', () => {
  const icon = 'action-loupe';
  render(<SearchInput />);
  const iconElement = screen.getByTestId(`icon-${icon}`);

  expect(iconElement).toBeInTheDocument();
});

it('should render the correct icon', () => {
  const icon = 'global-puzzle';
  render(<SearchInput icon={icon} />);
  const iconElement = screen.getByTestId(`icon-${icon}`);

  expect(iconElement).toBeInTheDocument();
});
