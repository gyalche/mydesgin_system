import React from 'react';
import expect from 'expect';
import { render, screen } from '@testing-library/react';

import Card from 'src/components/Atoms/Card';

it('applies default styles', () => {
  render(<Card>test</Card>);
  const CardElement = screen.getByText('test');

  expect(CardElement).toHaveStyleRule('padding', '8px');
});

it('Card changes style when padding has value', () => {
  const padding = '100px';
  render(<Card padding={padding}>test</Card>);
    const CardElement = screen.getByText('test');

  expect(CardElement).toHaveStyleRule('padding', padding);
});

it('Card changes style when mt has value', () => {
  const margin = '100px';
  render(<Card mt={margin}>test</Card>);
    const CardElement = screen.getByText('test');

  expect(CardElement).toHaveStyleRule('margin-top', margin);
});

it('Card changes style when mr has value', () => {
  const margin = '100px';
  render(<Card mr={margin}>test</Card>);
    const CardElement = screen.getByText('test');

  expect(CardElement).toHaveStyleRule('margin-right', margin);
});

it('Card changes style when mb has value', () => {
  const margin = '100px';
  render(<Card mb={margin}>test</Card>);
    const CardElement = screen.getByText('test');

  expect(CardElement).toHaveStyleRule('margin-bottom', margin);
});

it('Card changes style when ml has value', () => {
  const margin = '100px';
  render(<Card ml={margin}>test</Card>);
    const CardElement = screen.getByText('test');

  expect(CardElement).toHaveStyleRule('margin-left', margin);
});

it('displays components inside', () => {
  render(
    <Card>
      <button>Click me</button>
    </Card>
  );

  const buttonElement = screen.getByText('Click me');

  expect(buttonElement).toBeInTheDocument();
});
