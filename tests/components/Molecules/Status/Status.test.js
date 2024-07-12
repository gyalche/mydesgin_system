import React from 'react';
import expect from 'expect';
import { render, screen } from '@testing-library/react';

import Status from 'src/components/Molecules/Status';

it('should render the correct text and bullet color', () => {
  const text = 'Enabled';
  render(<Status appearance="enabled">{text}</Status>);
  const status = screen.getByText(text);
  const bullet = screen.getByTestId('bullet');

  expect(status).toBeInTheDocument();
  expect(bullet).toBeInTheDocument();
  expect(bullet).toHaveStyleRule(
    'background-color',
    'var(--rds-color-secondary-2-normal)'
  );
});

it('should render the icon for success appearance', () => {
  const text = 'Success';
  const { container } = render(<Status appearance="success">{text}</Status>);

  const iconElement = container.querySelectorAll('i');

  expect(iconElement.length).toBe(1);
});

it('should not render the bullet when appearance is not passed', () => {
  const text = 'None';
  render(<Status>{text}</Status>);
  const status = screen.getByText(text);

  expect(status).toBeInTheDocument();
  expect(() => screen.getByTestId('bullet')).toThrowError();
});
