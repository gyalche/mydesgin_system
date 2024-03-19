import React from 'react';
import expect from 'expect';
import { render, screen, fireEvent } from '@testing-library/react';

import Input from 'src/components/Atoms/Input';

it('applies default styles', () => {
  render(<Input />);
  const inputElement = screen.getByRole('textbox');

  expect(inputElement).toHaveStyleRule('height', '20px');
  expect(inputElement).toHaveStyleRule('padding', '8px');
});

it('applies custom styles when compact is true', () => {
  render(<Input compact="true" />);
  const inputElement = screen.getByRole('textbox');

  expect(inputElement).toHaveStyleRule('padding', '4px');
});

it('handles user interaction', () => {
  render(<Input />);
  const inputElement = screen.getByRole('textbox');

  fireEvent.change(inputElement, { target: { value: 'Test input value' } });

  expect(inputElement).toHaveValue('Test input value');
});

it('input changes style on hover', () => {
  render(<Input />);
  const inputElement = screen.getByRole('textbox');

  expect(inputElement).toHaveStyleRule('border', '1px solid var(--rds-color-primary-1-normal)',{ modifier: ':hover' });
});

it('input can be focused', () => {
  render(<Input />);
  const inputElement = screen.getByRole('textbox');

  inputElement.focus();

  expect(inputElement).toHaveFocus();
});

it('input changes style on invalid', () => {
  render(<Input />);
  const inputElement = screen.getByRole('textbox');

  expect(inputElement).toHaveStyleRule('border', '1px solid var(--rds-color-secondary-3-normal)',{ modifier: ':invalid' });
});

it('input changes style on disabled', () => {
  render(<Input />);
  const inputElement = screen.getByRole('textbox');

  expect(inputElement).toHaveStyleRule('color', 'var(--rds-color-neutral-5)',{ modifier: ':disabled' });
  expect(inputElement).toHaveStyleRule('background-color', 'var(--rds-color-neutral-2)',{ modifier: ':disabled' });
  expect(inputElement).toHaveStyleRule('border', '1px solid var(--rds-color-neutral-3)',{ modifier: ':disabled' });
});

it('input changes style when mt has value', () => {
  const margin = '100px';
  render(<Input mt={margin} />);
  const inputElement = screen.getByRole('textbox');

  expect(inputElement).toHaveStyleRule('margin-top', margin);
});

it('input changes style when mr has value', () => {
  const margin = '100px';
  render(<Input mr={margin} />);
  const inputElement = screen.getByRole('textbox');

  expect(inputElement).toHaveStyleRule('margin-right', margin);
});

it('input changes style when mb has value', () => {
  const margin = '100px';
  render(<Input mb={margin} />);
  const inputElement = screen.getByRole('textbox');

  expect(inputElement).toHaveStyleRule('margin-bottom', margin);
});

it('input changes style when ml has value', () => {
  const margin = '100px';
  render(<Input ml={margin} />);
  const inputElement = screen.getByRole('textbox');

  expect(inputElement).toHaveStyleRule('margin-left', margin);
});

