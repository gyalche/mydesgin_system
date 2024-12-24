import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import DateTimePicker from 'src/components/Molecules/DatePicker/DateTimePicker';

describe('DateTime picker component testing', () => {
  it('renders DateTimePicker correctly', async () => {
    render(<DateTimePicker locale="en-US" placeholder={{ date: 'yyyy/mm/dd', time: 'hh:mm' }} />);
    
    const dateInputs = await screen.findAllByPlaceholderText('yyyy/mm/dd');
    const timeInputs = await screen.findAllByPlaceholderText('hh:mm');
    
    expect(dateInputs.length).toBe(1);
    expect(timeInputs.length).toBe(1);
    
    expect(dateInputs[0]).toBeInTheDocument();
    expect(timeInputs[0]).toBeInTheDocument();
  });

  it('renders default values when initialValue is provided', async () => {
    const initialValue = new Date('Dec 14 2024 1:40:00');
  
    render(
      <DateTimePicker
        initialValue={initialValue}
        locale="en-US"
        placeholder={{ date: 'yyyy/mm/dd', time: 'hh:mm' }}
        isDoublePicker={false}
      />
    );

    const dateInput = await screen.findByPlaceholderText('yyyy/mm/dd');
    const timeInput = await screen.findByPlaceholderText('hh:mm');

    waitFor(() => {
      expect(dateInput.value).toBe(initialValue);
      expect(timeInput.value).toBe(initialValue);
    });
  });
  

  it('disables inputs when disabled is true', () => {
    render(<DateTimePicker isDoublePicker={false} disabled={true} locale="en-US" placeholder={{ date: 'yyyy/mm/dd', time: 'hh:mm' }} />);
    
    // Check if the inputs are disabled
    expect(screen.getByPlaceholderText('yyyy/mm/dd')).toBeDisabled();
    expect(screen.getByPlaceholderText('hh:mm')).toBeDisabled();
  });
});
  
