import React from 'react';
import expect from 'expect';
import { render, screen } from '@testing-library/react';
import Divider from 'src/components/Atoms/Divider';

it('Divider default styles', () => {
  render(<Divider />);
  const divider = screen.getByRole('separator');
  expect(divider).toHaveStyleRule('width', '100%');
  expect(divider).toHaveStyleRule('height', '2px');
  expect(divider).toHaveStyleRule('border-radius', '21px');
  expect(divider).toHaveStyleRule('margin', '12px 0 12px 0');
  expect(divider).toHaveStyleRule('background-color', 'var(--rds-color-neutral-3)');
});
