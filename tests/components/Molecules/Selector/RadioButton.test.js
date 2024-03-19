import React from 'react';
import expect from 'expect';
import { render, screen } from '@testing-library/react';
import RadioButton from 'src/components/Molecules/RadioButton';

it('should render with a label', () => {
  const option1 = { label: 'Test 1', value: 1 };

  render(
    <div>
      <RadioButton
        label={option1.label}
        value={option1.label}
      />
    </div>

  );
  const option = screen.getByText(option1.label);

  expect(option).toBeInTheDocument();
});

it('should change position', () => {
  const option1 = { label: 'Test 1', value: 1 };
  const position = 'right'
  render(
    <div>
      <RadioButton
        position={position}
        label={option1.label}
        value={option1.label}
      />
    </div>

  );
  const option = screen.getByText(option1.label);

  expect(option).toHaveStyleRule(`padding-${position}`, '32px');

});

test('should be disabled', () => {
  const option1 = { label: 'Test 1', value: 1 };
  render(
    <RadioButton
      disabled={true}
      label={option1.label}
      value={option1.label}
    />
  );

  const hiddenRadio = screen.getByRole('radio', { hidden: true }); 

  expect(hiddenRadio).toHaveAttribute('disabled');
});

test('should be checked', () => {
  const option1 = { label: 'Test 1', value: 1 };

  render(
    <div>
      <RadioButton
        checked
        label={option1.label}
        value={option1.label}
      />
    </div>
  );

  const hiddenRadio = screen.getByRole('radio', { hidden: true });

  expect(hiddenRadio).toBeChecked();
});

test('should have the correct value', () => {
  const option1 = { label: 'Test 1', value: 'test' };

  render(
    <div>
      <RadioButton
        value={option1.value}
        label={option1.label}
      />
    </div>
  );

  const hiddenRadio = screen.getByRole('radio', { hidden: true });

  expect(hiddenRadio).toHaveAttribute('value', option1.value);
});
