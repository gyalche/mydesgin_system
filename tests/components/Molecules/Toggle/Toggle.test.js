import React from 'react';
import expect from 'expect';
import {
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';
import { userEvent } from '@storybook/test';
import Toggle from 'src/components/Molecules/Toggle';
import { Icon } from 'src/components/Atoms';

it('should change width when w has value', () => {
  const width = '80px';
  render(<Toggle w={width} />);
  const toggle = screen.getByTestId('switch-wrapper');

  expect(toggle).toHaveStyleRule('width', `${width}`);
});

it('should change colors according to colors prop', () => {
  const colors = [
    'var(--rds-color-primary-1-dark)',
    'var(--rds-color-secondary-3-deep)',
  ];
  render(<Toggle colors={colors} />);
  const toggle = screen.getByTestId('switch-inner');

  expect(toggle).toHaveStyleRule('background-color', colors[0], {
    modifier: ':before',
  });

  expect(toggle).toHaveStyleRule('background-color', colors[1], {
    modifier: ':after',
  });
});

it('should change background color on hover', () => {
  render(<Toggle />);
  const toggle = screen.getByTestId('switch-inner');

  expect(toggle).toHaveStyleRule(
    'background-color',
    'var(--rds-color-primary-1-dark)',
    {
      modifier: ':hover:before',
    },
  );

  expect(toggle).toHaveStyleRule(
    'background-color',
    'var(--rds-color-neutral-6)',
    {
      modifier: ':hover:after',
    },
  );
});

it('should render icons when icons are passed in labels prop', () => {
  const labels = [
    <Icon name="global-small-check" key={1} />,
    <Icon name="action-cross" key={2} />,
  ];
  const { container } = render(<Toggle labels={labels} />);

  const iconElements = container.querySelectorAll('i');

  expect(iconElements.length).toBe(2);
});

it('should change text according to labels prop', () => {
  const labels = ['On', 'Off'];
  render(<Toggle labels={labels} />);
  const switchInner = screen.getByTestId('switch-inner');

  expect(switchInner).toHaveAttribute('data-yes', 'On');
  expect(switchInner).toHaveAttribute('data-no', 'Off');
});

it('should change value after being clicked', async () => {
  render(<Toggle />);
  const toggle = screen.getByRole('checkbox');

  expect(toggle).not.toBeChecked();

  userEvent.click(toggle);

  await waitFor(() => {
    expect(toggle).toBeChecked();
  });
});

it('should be focusable and change value after spacebar is pressed', async () => {
  render(<Toggle />);
  const toggle = screen.getByRole('checkbox');
  const toggleLabel = screen.getByTestId('switch-label');

  expect(toggle).not.toBeChecked();

  expect(document.activeElement).not.toBe(toggleLabel);
  toggleLabel.focus();
  expect(document.activeElement).toBe(toggleLabel);

  const toggleStyles = getComputedStyle(toggleLabel);
  expect(toggleStyles.outline).not.toBe('none');

  fireEvent.keyDown(toggle, { key: ' ', code: 'Space' });

  await waitFor(() => {
    expect(toggle).toBeChecked();
  });
});
