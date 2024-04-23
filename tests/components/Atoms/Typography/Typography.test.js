import React from 'react';
import expect from 'expect';
import { render, screen } from '@testing-library/react';

import Typography from 'src/components/Atoms/Typography';

it('applies default styles', () => {
  render(<Typography />);
  const TypographyElement = screen.getByTestId('typography-testid');

  expect(TypographyElement).toHaveStyleRule('font-size', '15px');
});

it('Typography changes style when level has predetermined-value', () => {
  const level = 'h1';
  render(<Typography level={level} />);
    const TypographyElement = screen.getByTestId('typography-testid');

  expect(TypographyElement).toHaveStyleRule('font-size', '34px');
});
