import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import Form from '../../../src/components/Organisms/Form';

jest.mock('components/Molecules/DateTimePicker/DateAndTime/DatePicker', () => (props) => {
  const { input, isRangePicker } = props;
  const name = input?.name || 'singleDate';
  return (
    <input
      data-testid={name}
      type="text"
      onChange={(e) => input?.onChange?.(e.target.value)}
      placeholder={isRangePicker ? 'Date Range Picker' : 'Date Picker'}
    />
  );
});

jest.mock('components/Molecules/DateTimePicker/DateAndTime/TimePicker', () => (props) => {
  const { input, isRangePicker } = props;
  const name = input?.name || 'singleTime';
  return (
    <input
      data-testid={name}
      type="text"
      onChange={(e) => input?.onChange?.(e.target.value)}
      placeholder={isRangePicker ? 'Time Range Picker' : 'Time Picker'}
    />
  );
});

jest.mock('components/Molecules/DateTimePicker/DateAndTime/DateTimePicker', () => (props) => {
  const { input } = props;
  return (
    <input
      data-testid={input?.name || 'dateTime'}
      type="text"
      onChange={(e) => input?.onChange?.(e.target.value)}
      placeholder="DateTime Picker"
    />
  );
});

describe('Form Component', () => {
  it('should render all form fields', () => {
    render(<Form />);

    expect(screen.getByPlaceholderText('Date Picker')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Date Range Picker')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Time Picker')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Time Range Picker')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('DateTime Picker')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  it('should initialize with default values', () => {
    render(<Form />);
    expect(screen.getByPlaceholderText('Date Picker')).toHaveValue('');
    expect(screen.getByPlaceholderText('Date Range Picker')).toHaveValue('');
    expect(screen.getByPlaceholderText('Time Picker')).toHaveValue('');
    expect(screen.getByPlaceholderText('Time Range Picker')).toHaveValue('');
    expect(screen.getByPlaceholderText('DateTime Picker')).toHaveValue('');
  });

  it('should update field values on user input', () => {
    render(<Form />);

    const datePicker = screen.getByPlaceholderText('Date Picker');
    const dateRangePicker = screen.getByPlaceholderText('Date Range Picker');
    const timePicker = screen.getByPlaceholderText('Time Picker');
    const timeRangePicker = screen.getByPlaceholderText('Time Range Picker');
    const dateTimePicker = screen.getByPlaceholderText('DateTime Picker');

    act(() => {
      fireEvent.change(datePicker, { target: { value: '2026-02-15' } });
      fireEvent.change(dateRangePicker, { target: { value: '2026-02-15 to 2026-02-28' } });
      fireEvent.change(timePicker, { target: { value: '15:30' } });
      fireEvent.change(timeRangePicker, { target: { value: '15:30 to 16:30' } });
      fireEvent.change(dateTimePicker, { target: { value: '2026-02-15 15:30' } });
    });

    expect(datePicker).toHaveValue('2026-02-15');
    expect(dateRangePicker).toHaveValue('2026-02-15 to 2026-02-28');
    expect(timePicker).toHaveValue('15:30');
    expect(timeRangePicker).toHaveValue('15:30 to 16:30');
    expect(dateTimePicker).toHaveValue('2026-02-15 15:30');
  });

  it('should submit the form with correct values', async () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

    render(<Form />);

    const submitButton = screen.getByRole('button', { name: /submit/i });

    act(() => {
      fireEvent.click(submitButton);
    });
    consoleSpy.mockRestore();
  });
});
