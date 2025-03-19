import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import 'jest-styled-components';
import Label from 'src/components/Atoms/Label';

it('renders with default styles', () => {
  render(<Label>Default Label</Label>);
  const labelElement = screen.getByText('Default Label');

  // Check that the default color is applied
  expect(labelElement).toHaveStyleRule('color', 'var(--rds-color-neutral-9)');
  // Ensure it inherits the `level: 'p2'` from Typography
  expect(labelElement).toHaveAttribute('level', 'p2');
});

it('applies disabled styles', () => {
  render(<Label disabled>Disabled Label</Label>);
  const labelElement = screen.getByText('Disabled Label');

  // Check that the disabled color is applied
  expect(labelElement).toHaveStyleRule('color', 'var(--rds-color-neutral-5)');
});

it('renders the correct text content', () => {
  render(<Label>Test Label</Label>);
  const labelElement = screen.getByText('Test Label');

  expect(labelElement).toBeInTheDocument();
});

it('does not apply disabled styles when disabled is false', () => {
  render(<Label disabled={false}>Not Disabled Label</Label>);
  const labelElement = screen.getByText('Not Disabled Label');

  // Ensure the color is not the disabled color
  expect(labelElement).toHaveStyleRule('color', 'var(--rds-color-neutral-9)');
});

it('applies custom text content', () => {
  render(<Label>Custom Label Text</Label>);
  const labelElement = screen.getByText('Custom Label Text');

  expect(labelElement).toBeInTheDocument();
});

it('inherits level prop from Typography', () => {
  render(<Label>Label with inherited level</Label>);
  const labelElement = screen.getByText('Label with inherited level');
  // Since we're setting `level` to `p2` by default, we should ensure this is correct
  expect(labelElement).toHaveAttribute('level', 'p2');
});
