import React from 'react';
import expect from 'expect';
import { render, screen } from '@testing-library/react';

import Typography from 'src/components/Atoms/Typography';

it('applies default styles', () => {
  render(<Typography>test</Typography>);
  const TypographyElement = screen.getByText('test');

  expect(TypographyElement).toHaveStyleRule('font-size', '17px');
});

it('Typography changes style when level has predetermined-value', () => {
  const level = 'h1';
  render(<Typography level={level}>test</Typography>);
    const TypographyElement = screen.getByText('test');

  expect(TypographyElement).toHaveStyleRule('font-size', '42px');
});
