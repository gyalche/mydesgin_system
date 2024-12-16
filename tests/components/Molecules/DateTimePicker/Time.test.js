import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import DatePicker from 'src/components/Molecules/DatePicker';


const TimePicker  = DatePicker.Time;
describe('TimePicker Component', () => {

  const mockOnChange = jest.fn();

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  // Test for initial render
  it('renders without crashing', () => {
    render(<TimePicker onChange={mockOnChange} />);
    expect(screen.getByPlaceholderText('hh:mm')).toBeInTheDocument();
  });

  it('sets initial value correctly based on props', () => {
    render(<TimePicker is12Hour initialValue="3:45 PM" onChange={mockOnChange} />);
    expect(screen.getByPlaceholderText('hh:mm')).toHaveValue('3:45 PM');
  });

  // Test for 24-hour format
  it('renders correctly in 24-hour format', () => {
    render(<TimePicker is12Hour={false} onChange={mockOnChange} />);
    expect(screen.getByPlaceholderText('hh:mm')).toBeInTheDocument();
  });

  // Test for opening and closing the dropdown
  it('opens and closes the dropdown when clicking the input field', async () => {
    render(<TimePicker onChange={mockOnChange} />);
    const inputField = screen.getByPlaceholderText('hh:mm');
    const dropdown = screen.findByTestId('dropdown-id');
    waitFor(() => {
      expect(dropdown).not.toBeInTheDocument();
    });

    // Open the dropdown
    waitFor(() => {
      fireEvent.click(inputField);
      expect(dropdown).toBeInTheDocument();
    });

    waitFor(() => {
      fireEvent.click(document.body);
      expect(dropdown).not.toBeInTheDocument();
    });
  });

  // Test for selecting hour
  it('updates selected hour and calls onChange when an hour is selected', async () => {
      render(<TimePicker onChange={mockOnChange} />);
      const inputField = screen.getByPlaceholderText('hh:mm');
      fireEvent.click(inputField);

      const hourOption = screen.queryByText('5');
      fireEvent.click(hourOption);
      expect(mockOnChange).toHaveBeenCalledWith(expect.stringContaining('5'));
    });
      
      it('updates selected minute and calls onChange when a minute is selected', async () => {
        const mockOnChange = jest.fn();
        render(<TimePicker onChange={mockOnChange} is12Hour={false} />);
      
        const inputField = screen.getByPlaceholderText('hh:mm');
        fireEvent.click(inputField);
      
        const hourOption = screen.getByText('5');
        fireEvent.click(hourOption);
      
        const minuteOption = screen.getByText('30');
        fireEvent.click(minuteOption);
      
        // Expected Date object
        const expectedDate = new Date();
        expectedDate.setHours(5, 30, 0, 0); // Set time to 5:30 with 0 seconds and milliseconds
      
        await waitFor(() => {
          // Assert that mockOnChange was called with a Date object matching 5:30
          expect(mockOnChange).toHaveBeenCalledWith(expect.any(Date));
          const receivedDate = mockOnChange.mock.calls[0][0]; // Get the first argument of the first call
          expect(receivedDate.getHours()).toBe(expectedDate.getHours());
          expect(receivedDate.getMinutes()).toBe(expectedDate.getMinutes());
        });
      });
      

// Test for selecting AM/PM
  it('updates AM/PM and calls onChange when AM/PM is selected', async () => {
    render(<TimePicker is12Hour onChange={mockOnChange} isTimeRange={false}/>);
    const inputField = screen.getByPlaceholderText('hh:mm');
    fireEvent.click(inputField);

    // Select an hour and minute first
    const hourOption = screen.getByText('5');
    fireEvent.click(hourOption);

    const minuteOption = screen.getByText('30');
    fireEvent.click(minuteOption);

    const amOption = screen.getByText('AM');
    fireEvent.click(amOption);

    waitFor(() => {
      expect(mockOnChange).toHaveBeenCalledWith(expect.stringContaining('AM'));
    });
  });     
});
