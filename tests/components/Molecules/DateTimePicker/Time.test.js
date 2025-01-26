import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import TimePicker from '../../../../src/components/Molecules/DateTimePicker/DateAndTime/TimePicker';

describe('TimePicker Component', () => {
  let onChangeMock;

  beforeEach(() => {
    onChangeMock = jest.fn();
  });

  it('opens dropdown when clicked', () => {
    render(<TimePicker onChange={onChangeMock} is12Hour={true} />);
    const input = screen.getByPlaceholderText('hh:mm');
    fireEvent.click(input);

    expect(screen.getByText('AM')).toBeInTheDocument();
    expect(screen.getByText('PM')).toBeInTheDocument();
  });

  it('selects hour, minute, and am/pm', () => {
    render(<TimePicker onChange={onChangeMock} step={15} is12Hour={true} />);

    const input = screen.getByPlaceholderText('hh:mm');
    fireEvent.click(input);
    fireEvent.click(screen.getByText('1'));
    fireEvent.click(screen.getByText('15'));
    fireEvent.click(screen.getByText('AM'));

    expect(onChangeMock).toHaveBeenCalledWith(expect.objectContaining({}));
  });

  it('correctly formats time with 12-hour clock', () => {
    render(<TimePicker onChange={onChangeMock} is12Hour={true} isRangePicker={false} />);
    const input = screen.getByPlaceholderText('hh:mm');
    fireEvent.click(input);

    fireEvent.click(screen.getByText('12'));
    fireEvent.click(screen.getByText('30'));
    fireEvent.click(screen.getByText('PM'));

    expect(input.value).toBe('12:30 PM');
  });

  it('handles disabled state correctly', () => {
    render(<TimePicker onChange={onChangeMock} disabled={true} />);
    const input = screen.getByPlaceholderText('hh:mm');
    expect(input).toBeDisabled();
  });
});
