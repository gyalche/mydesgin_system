import React from 'react';
import expect from 'expect';
import { render, screen, fireEvent } from '@testing-library/react';

import Button from 'src/components/Atoms/Button';

it('button has the correct text', () => {
  const label = 'Click Me';
  render(<Button>{label}</Button>);
  const button = screen.getByText(label);
  expect(button).toBeInTheDocument();
});

it('onClick event is triggered when button is clicked', () => {
  const onClickMock = jest.fn();
  render(<Button onClick={onClickMock} />);
  const button = screen.getByRole('button');
  fireEvent.click(button);
  expect(onClickMock).toHaveBeenCalledTimes(1);
});

it('button changes style on hover', () => {
  render(<Button />);
  const button = screen.getByRole('button');
  expect(button).toHaveStyleRule('background-color', 'var(--rds-color-primary-1-deep)',{ modifier: ':hover' });
});

it('button changes style on click', () => {
  render(<Button />);
  const button = screen.getByRole('button');
  expect(button).toHaveStyleRule('background-color', 'var(--rds-color-primary-1-intense)',{ modifier: ':active' });
});

it('button changes style on disabled', () => {
  render(<Button />);
  const button = screen.getByRole('button');
  expect(button).toHaveStyleRule('background-color', 'var(--rds-color-neutral-2)',{ modifier: ':disabled' });
});

it('button changes style when mt has value', () => {
  const margin = '100px';
  render(<Button mt={margin} />);
  const button = screen.getByRole('button');

  expect(button).toHaveStyleRule('margin-top', margin);
});

it('button changes style when mr has value', () => {
  const margin = '100px';
  render(<Button mr={margin} />);
  const button = screen.getByRole('button');

  expect(button).toHaveStyleRule('margin-right', margin);
});

it('button changes style when mb has value', () => {
  const margin = '100px';
  render(<Button mb={margin} />);
  const button = screen.getByRole('button');

  expect(button).toHaveStyleRule('margin-bottom', margin);
});

it('button changes style when ml has value', () => {
  const margin = '100px';
  render(<Button ml={margin} />);
  const button = screen.getByRole('button');

  expect(button).toHaveStyleRule('margin-left', margin);
});

