import React from 'react';
import expect from 'expect';
import { render, screen } from '@testing-library/react';

import Pill from 'src/components/Atoms/Pill';

it('should render the correct text', () => {
  const text = '123';
  render(<Pill>{text}</Pill>);
  const pill = screen.getByText(text);
  expect(pill).toBeInTheDocument();
});

it('should render the correct styles', () => {
  const text = '420';
  render(<Pill.Blue>{text}</Pill.Blue>);
  const pill = screen.getByText(text);

  expect(pill).toBeInTheDocument();
  expect(pill).toHaveStyleRule(
    'background-color',
    'var(--rds-color-teritary-2-subtle)'
  );
  expect(pill).toHaveStyleRule('color', 'var(--rds-color-tertiary-2-deep)');
});
