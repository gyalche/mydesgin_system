import React from 'react';
import {
  render,
  fireEvent,
  screen,
  waitFor,
} from '@testing-library/react';
import expect from 'expect';

import DatePicker from '../../../../src/components/Molecules/DateTimePicker/Components/DatePicker';

describe('DateRangePicker Component', () => {
  const mockOnChange = jest.fn();
  const today = new Date();
  const monthName = today.toLocaleString('ja-JP', { month: 'short' });
  const currentMonth = new RegExp(monthName, 'i');

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  it('renders DatePicker with default props', () => {
    render(<DatePicker onChange={mockOnChange} placeholder="yyyy/mm/dd" />);
    expect(screen.getByTestId('first-input')).toBeInTheDocument();
    waitFor(() => {
      expect(screen.getByTestId('first-input')).toHaveProperty('placeholder', 'yyyy/mm/dd');
    });
  });

  it('opens calendar on clicking the input field', async () => {
    render(<DatePicker onChange={mockOnChange} dateTimeFormat="ja-JP" />);
    const input = await screen.findByTestId('first-input');
    fireEvent.click(input);
    const check = screen.queryByText(currentMonth);
    await waitFor(() => {
      expect(check).toBeInTheDocument();
    });
  });

  it('closes calendar when clicked outside', async () => {
    render(<DatePicker onChange={mockOnChange} disabled={false} dateTimeFormat="ja-JP" />);
    const input = screen.getByTestId('first-input');

    fireEvent.click(input);
    const calendar = await screen.findByTestId('calendar-id');
    expect(calendar).toBeInTheDocument();

    fireEvent.click(input);
    await waitFor(() => {
      expect(calendar).not.toBeInTheDocument();
    });
  });

  it('closes calendar when pressed ESC', async () => {
    render(<DatePicker onChange={mockOnChange} disabled={false} dateTimeFormat="ja-JP" />);
    const input = screen.getByTestId('first-input');

    fireEvent.click(input);
    const calendar = await screen.findByTestId('calendar-id');
    expect(calendar).toBeInTheDocument();

    fireEvent.keyDown(document, { key: 'Escape' });

    await waitFor(() => {
      expect(calendar).not.toBeInTheDocument();
    });
  });

  it('prevents selecting past dates', async () => {
    render(<DatePicker onChange={mockOnChange} dateTimeFormat="en-US" isDoubleView={false} />);
    const input = screen.getByTestId('first-input');
    fireEvent.click(input);

    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    const pastDayButton = screen.findByTestId(`day-${yesterday.getDate()}`);

    waitFor(() => {
      fireEvent.click(pastDayButton);
      expect(mockOnChange).not.toHaveBeenCalled();
    });
  });

  it('select past date only if onlyFutre is false', async () => {
    render(<DatePicker onChange={mockOnChange} onlyFuture={false} dateTimeFormat="en-US" isDoubleView={false} />);
    const input = screen.getByTestId('first-input');
    fireEvent.click(input);

    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    const pastDayButton = screen.findByTestId(`day-${yesterday.getDate()}`);

    waitFor(() => {
      fireEvent.click(pastDayButton);
      expect(mockOnChange).toHaveBeenCalled();
    });
  });
  test('allows selecting a range in range picker mode', () => {
    render(<DatePicker isRangePicker={true} onChange={mockOnChange} />);
    const startDate = screen.getByTestId('first-input');
    const endDate = screen.getByTestId('second-input');
    expect(startDate).toBeInTheDocument();
    expect(endDate).toBeInTheDocument();
  });

  it('renders two calendars when isDoubleView is true', () => {
    render(<DatePicker isDoubleView={false} onChange={mockOnChange} dateTimeFormat="en-US" />);
    const input = screen.getByTestId('first-input');
    fireEvent.click(input);
    const calendars = screen.getAllByTestId('calendar-container');
    waitFor(() => {
      expect(calendars.length).toBe(2);
    });
  });

  it('displays hover range correctly in range picker mode', async () => {
    render(<DatePicker isRangePicker={true} onChange={mockOnChange} />);

    await waitFor(() => {
      const startInput = screen.getByTestId('first-input');
      fireEvent.click(startInput);
    });

    const firstDay = new Date().getDate();
    const secondDay = new Date().getDate() + 2;

    const startDay = screen.findByTestId(`day-${firstDay}`);
    waitFor(() => {
      fireEvent.click(startDay);
      new Promise((resolve) => setTimeout(resolve, 1000));
    });

    waitFor(() => {
      const hoverDay = screen.findByTestId(`day-${secondDay}`);
      fireEvent.mouseEnter(hoverDay);
      expect(hoverDay).toHaveStyleRule('background-color: var(--rds-color-primary-1-subtle)');
    });
  });
});
