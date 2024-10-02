import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import 'jest-styled-components';
import Checkbox from 'src/components/Molecules/Checkbox';
it('renders with default props', () => {
  render(<Checkbox label='Test Checkbox' />);
  const checkboxLabel = screen.getByText('Test Checkbox');
  const checkboxIcon = screen.getByRole('checkbox');

  expect(checkboxLabel).toBeInTheDocument();
  expect(checkboxIcon).toHaveAttribute('type', 'checkbox');
  expect(checkboxIcon).not.toBeChecked();
});

it('renders with checked state when input prop is provided', () => {
  render(<Checkbox label='Test Checkbox' input={{ checked: true }} />);
  const checkboxIcon = screen.getByRole('checkbox');

  expect(checkboxIcon).toBeChecked();
});

it('toggles checkbox state on click', () => {
  render(<Checkbox label='Toggle Checkbox' />);
  const checkboxIcon = screen.getByRole('checkbox');

  // Initially not checked
  expect(checkboxIcon).not.toBeChecked();

  // Click to check
  fireEvent.click(checkboxIcon);
  expect(checkboxIcon).toBeChecked();

  // Click again to uncheck
  fireEvent.click(checkboxIcon);
  expect(checkboxIcon).not.toBeChecked();
});

it('calls input.onChange with new checked state', () => {
  const onChangeMock = jest.fn();
  render(
    <Checkbox
      label='Change Handler Checkbox'
      input={{ checked: false, onChange: onChangeMock }}
    />
  );
  const checkboxIcon = screen.getByRole('checkbox');

  fireEvent.click(checkboxIcon);
  expect(onChangeMock).toHaveBeenCalledWith(true);

  fireEvent.click(checkboxIcon);
  expect(onChangeMock).toHaveBeenCalledWith(false);
});

it('applies disabled styles when disabled prop is true', () => {
  render(<Checkbox label='Disabled Checkbox' disabled />);
  const checkboxContainer = screen.getByText('Disabled Checkbox').parentElement;

  // Disabled color
  expect(checkboxContainer).toHaveStyleRule(
    'color',
    'var(--rds-color-neutral-5)'
  );
});

it('changes style on hover', () => {
  render(<Checkbox label='Hover Checkbox' />);
  const checkboxContainer = screen.getByText('Hover Checkbox').parentElement;

  // Hover state
  fireEvent.mouseOver(checkboxContainer);
  expect(checkboxContainer).toHaveStyleRule(
    'color',
    'var(--rds-color-primary-1-dark)',
    {
      modifier: ':hover',
    }
  );
});

it('renders the correct icon based on isChecked state', () => {
  const { container, rerender } = render(
    <Checkbox label='Icon Checkbox' input={{ checked: false }} />
  );

  // Check for the default icon class
  let iconElement = container.querySelector('.rds-action-checkbox-default');
  expect(iconElement).toBeInTheDocument();

  rerender(<Checkbox label='Icon Checkbox' input={{ checked: true }} />);

  // Check for the selected icon class
  iconElement = container.querySelector('.rds-action-checkbox-selected');
  expect(iconElement).toBeInTheDocument();
});
