import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import Calendar from 'src/components/Molecules/DatePicker/Calendar';

describe('Calendar Component', () => {
  const mockHandleSingleDate = jest.fn();
  const mockHandleDateRangeClick = jest.fn();
  const mockDisableKeyboard = jest.fn();
  const mockEnableKeyboard = jest.fn();
  const mockSetDates = jest.fn();

  const defaultProps = {
    date: new Date(2024, 0, 1),
    locale: 'en-US',
    weekdays: [
      { day: 'Sun', dayIndex: 0 },
      { day: 'Mon', dayIndex: 1 },
      { day: 'Tue', dayIndex: 2 },
      { day: 'Wed', dayIndex: 3 },
      { day: 'Thu', dayIndex: 4 },
      { day: 'Fri', dayIndex: 5 },
      { day: 'Sat', dayIndex: 6 },
    ],
    handleSingleDate: mockHandleSingleDate,
    handleDateRangeClick: mockHandleDateRangeClick,
    isRangePicker: false,
    isInRange: jest.fn(),
    isInHoverRange: jest.fn(),
    setHoveredDate: null,
    isSelected: null,
    enableKeyboard: mockEnableKeyboard,
    disableKeyboard: mockDisableKeyboard,
    handlePrevYear: jest.fn(),
    handleNextYear: jest.fn(),
    handlePrevMonth: jest.fn(),
    handleNextMonth: jest.fn(),
    setDates: mockSetDates,
    isDoubleView: false,
    disableHeader: false,
    openCalendar: true,
    openCalendarEnd: false,
  };

  test('opens decade selector when clicking on the year text', async() => {
    render(<Calendar {...defaultProps} />);
    const yearText = screen.findByText('2024');

   waitFor(() => {
    fireEvent.click(yearText);
    expect(screen.getByText('2020 - 2029')).toBeInTheDocument();
    expect(mockDisableKeyboard).toHaveBeenCalled();
   });
  });

  test('opens month selector when clicking on the month text', () => {
    render(<Calendar {...defaultProps} />);
    const monthText = screen.getByText('January');
    fireEvent.click(monthText);
    expect(screen.getByText('January')).toBeInTheDocument();
    expect(screen.getByText('December')).toBeInTheDocument();
    expect(mockDisableKeyboard).toHaveBeenCalled();
  });

  test('opens year selector after selecting a decade', async () => {
    render(<Calendar {...defaultProps} />);
    const yearText = screen.findByText('2024');
   waitFor(() => {
    fireEvent.click(yearText);
    const decadeText = screen.getByText('2020 - 2029');
    fireEvent.click(decadeText);
    
    expect(screen.getByText('2020')).toBeInTheDocument();
    expect(screen.getByText('2029')).toBeInTheDocument();
    expect(mockDisableKeyboard).toHaveBeenCalled();
   });
  });
});
