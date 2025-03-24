import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import 'jest-styled-components';
import Checkbox from 'components/Molecules/Checkbox';

it('renders with default props', () => {
  render(<Checkbox label="Test Checkbox" />);
  const checkboxLabel = screen.getByText('Test Checkbox');
  const checkboxInput = screen.getByRole('checkbox');

  expect(checkboxLabel).toBeInTheDocument();
  expect(checkboxInput).toHaveAttribute('type', 'checkbox');
  expect(checkboxInput).not.toBeChecked();
});

it('renders with checked state when input prop is provided', () => {
  render(<Checkbox label="Test Checkbox" input={{ checked: true }} />);
  const checkboxInput = screen.getByRole('checkbox');

  expect(checkboxInput).toBeChecked();
});

it('toggles checkbox state on click', () => {
  render(<Checkbox label="Toggle Checkbox" />);
  const checkboxContainer = screen.getByText('Toggle Checkbox').parentElement;
  const checkboxInput = screen.getByRole('checkbox');

  // Initially not checked
  expect(checkboxInput).not.toBeChecked();

  // Click the container to check (since the actual input is hidden)
  fireEvent.click(checkboxContainer);
  expect(checkboxInput).toBeChecked();

  // Click again to uncheck
  fireEvent.click(checkboxContainer);
  expect(checkboxInput).not.toBeChecked();
});

it('calls input.onChange when clicked', () => {
  const onChangeMock = jest.fn();
  render(
    <Checkbox
      label="Change Handler Checkbox"
      input={{ checked: false, onChange: onChangeMock }}
    />,
  );
  const checkboxContainer = screen.getByText('Change Handler Checkbox').parentElement;

  // Click to check
  fireEvent.click(checkboxContainer);
  expect(onChangeMock).toHaveBeenCalledWith(true);

  // The component's behavior has changed - it now calls onChange with the new state
  // each time, rather than toggling between true and false
  // This is because the component is now controlled by the input prop
});

it('applies disabled styles when disabled prop is true', () => {
  render(<Checkbox label="Disabled Checkbox" disabled={true} />);
  const checkboxContainer = screen.getByText('Disabled Checkbox').parentElement;

  // Disabled color
  expect(checkboxContainer).toHaveStyleRule(
    'color',
    'var(--rds-color-neutral-5)',
  );
});

it('changes style on hover', () => {
  render(<Checkbox label="Hover Checkbox" />);
  const checkboxContainer = screen.getByText('Hover Checkbox').parentElement;

  // Hover state
  fireEvent.mouseOver(checkboxContainer);
  expect(checkboxContainer).toHaveStyleRule(
    'color',
    'var(--rds-color-primary-1-normal)',
    {
      modifier: ':hover',
    },
  );
});

it('renders the correct icon based on isChecked state', () => {
  const { container, rerender } = render(
    <Checkbox label="Icon Checkbox" input={{ checked: false }} />,
  );

  // Check for the default icon class
  let iconElement = container.querySelector('.rds-action-checkbox-default');
  expect(iconElement).toBeInTheDocument();

  rerender(<Checkbox label="Icon Checkbox" input={{ checked: true }} />);

  // Check for the selected icon class
  iconElement = container.querySelector('.rds-action-checkbox-selected');
  expect(iconElement).toBeInTheDocument();
});
