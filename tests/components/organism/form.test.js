import React from 'react';
import { render, screen } from '@testing-library/react';
import Form from 'src/components/Organisms/Form';

// Mock date pickers components
jest.mock('components/Molecules/DatePicker/DatePicker', () => {
  // eslint-disable-next-line react/display-name, react/prop-types
  return ({ input, isRangePicker }) => (
    <input
      data-testid={isRangePicker ? 'date-range-picker' : 'date-picker'}
      // eslint-disable-next-line react/prop-types
      value={input?.value instanceof Array ? input.value.map(d => d.toISOString()) : input?.value?.toISOString()}
      // eslint-disable-next-line react/prop-types
      onChange={input?.onChange}
    />
  );
});

jest.mock('components/Molecules/DatePicker/DateTimePicker', () => {
  // eslint-disable-next-line react/display-name, react/prop-types
  return ({ input }) => (
    <input
      data-testid="date-time-picker"
      // eslint-disable-next-line react/prop-types
      value={input?.value?.toISOString()}
      // eslint-disable-next-line react/prop-types
      onChange={input?.onChange}
    />
  );
});

jest.mock('components/Molecules/DatePicker/TimePicker', () => {
  // eslint-disable-next-line react/display-name, react/prop-types
  return ({ input, isRangePicker }) => (
    <input
      data-testid={isRangePicker ? 'time-range-picker' : 'time-picker'}
      // eslint-disable-next-line react/prop-types
      value={input?.value instanceof Array ? input.value.map(d => d.toISOString()) : input?.value?.toISOString()}
      // eslint-disable-next-line react/prop-types
      onChange={input?.onChange}
    />
  );
});

describe('Form Initial Values', () => {
  const NOW = new Date('2024-01-08T12:00:00Z');
  
  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(NOW);
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should initialize with correct initial values', () => {
    render(<Form />);
  
    const expectedValues = {
      singleDate: new Date('Feb 14 2026 15:20:00').toISOString(),
      dateRange: [
        NOW.toISOString(),
        new Date(NOW.setDate(NOW.getDate() + 14)).toISOString()
      ],
      singleTime: new Date('Jan 14 2026 15:20:00').toISOString(),
      time: [
        NOW.toISOString(),
        new Date('Dec 14 2025 1:20:00').toISOString()
      ],
      dateTime: new Date('Dec 20 2025 1:50:00').toISOString()
    };

    const singleDatePicker = screen.getByTestId('date-picker');
    const dateRangePicker = screen.getByTestId('date-range-picker');
    const singleTimePicker = screen.getByTestId('time-picker');
    const timeRangePicker = screen.getByTestId('time-range-picker');
    const dateTimePicker = screen.getByTestId('date-time-picker');

    expect(singleDatePicker).toHaveValue(expectedValues.singleDate);

    expect(dateRangePicker).toHaveValue(expectedValues.dateRange.toString());

    expect(singleTimePicker).toHaveValue(expectedValues.singleTime);

    expect(dateTimePicker).toHaveValue(expectedValues.dateTime);
  });

  it('should render all date/time picker fields', () => {
    render(<Form />);

    expect(screen.getByTestId('date-picker')).toBeInTheDocument();
    expect(screen.getByTestId('date-range-picker')).toBeInTheDocument();
    expect(screen.getByTestId('time-picker')).toBeInTheDocument();
    expect(screen.getByTestId('time-range-picker')).toBeInTheDocument();
    expect(screen.getByTestId('date-time-picker')).toBeInTheDocument();
  });

  it('should have correct label for each field', () => {
    render(<Form />);

    expect(screen.getByText('Date:')).toBeInTheDocument();
    expect(screen.getByText('Daterange:')).toBeInTheDocument();
    expect(screen.getByText('Time:')).toBeInTheDocument();
    expect(screen.getByText('Time Range:')).toBeInTheDocument();
    expect(screen.getByText('DateTime Picker:')).toBeInTheDocument();
  });

  it('should maintain initialValues after re-render', () => {
    const { rerender } = render(<Form />);
    
    const initialDateValue = screen.getByTestId('date-picker').value;
    const initialDateTimeValue = screen.getByTestId('date-time-picker').value;

    rerender(<Form />);
    
    // Check if values remain the same after re-render
    expect(screen.getByTestId('date-picker')).toHaveValue(initialDateValue);
    expect(screen.getByTestId('date-time-picker')).toHaveValue(initialDateTimeValue);
  });
});
