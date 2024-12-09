import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import DateTimePicker from 'src/components/Molecules/DatePicker/DateTimePicker';

describe('DateTime picker component testing', () => {
  it('renders DateTimePicker correctly', async () => {
    render(<DateTimePicker locale="en-US" placeholder={{ date: 'yyyy/mm/dd', time: 'hh:mm' }} />);
    
    const dateInputs = await screen.findAllByPlaceholderText('yyyy/mm/dd');
    const timeInputs = await screen.findAllByPlaceholderText('hh:mm');
    
    expect(dateInputs.length).toBe(2);
    expect(timeInputs.length).toBe(2);
    
    expect(dateInputs[0]).toBeInTheDocument();
    expect(timeInputs[0]).toBeInTheDocument();
  });

  it('renders default values when initialValue is provided', async () => {
    const initialValue = { date: '2024-12-09', time: '12:00' };
  
    render(
      <DateTimePicker
        initialValue={initialValue}
        locale="en-US"
        placeholder={{ date: 'yyyy/mm/dd', time: 'hh:mm' }}
        isDoublePicker={false}
      />
    );
  
    // Wait for inputs to be rendered
    const dateInput = await screen.findByPlaceholderText('yyyy/mm/dd');
    const timeInput = await screen.findByPlaceholderText('hh:mm');
  
    // Ensure the values are set correctly
    waitFor(() => {
      expect(dateInput.value).toBe(initialValue.date);
      expect(timeInput.value).toBe(initialValue.time);
    });
  });
  

  it('disables inputs when disabled is true', () => {
    render(<DateTimePicker isDoublePicker={false} disabled={true} locale="en-US" placeholder={{ date: 'yyyy/mm/dd', time: 'hh:mm' }} />);
    
    // Check if the inputs are disabled
    expect(screen.getByPlaceholderText('yyyy/mm/dd')).toBeDisabled();
    expect(screen.getByPlaceholderText('hh:mm')).toBeDisabled();
  });
});
  
