import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import Form from '../../../../src/components/Organisms/Form/index';

describe('Form Component', () => {
  it('renders initial values correctly', async () => {
    render(<Form />);

    const singleDateInput = await screen.findByText('Date:');
    const dateRangeInputs = await screen.findAllByText('Daterange:');
    const singleTimeInput = await screen.findByText('Time:');
    const timeRangeInputs = await screen.findAllByText('Time Range:');
    const dateTimeInputs = await screen.findAllByText('DateTime Picker:');

    waitFor(() => {
      expect(singleDateInput).toHaveValue('2024-12-09');
      expect(dateRangeInputs[0]).toHaveValue('2024-12-09');
      expect(dateRangeInputs[1]).toHaveValue('2024-12-23');
      expect(singleTimeInput).toHaveValue('1:30 PM');
      expect(timeRangeInputs[0]).toHaveValue('1:00');
      expect(timeRangeInputs[1]).toHaveValue('2:00');
      expect(dateTimeInputs[0]).toHaveValue('2024-12-09');
      expect(dateTimeInputs[1]).toHaveValue('2024-12-20');
      expect(dateTimeInputs[2]).toHaveValue('3:00');
      expect(dateTimeInputs[3]).toHaveValue('4:50');
    });
  });

  it('updates form values when fields are changed', async () => {
    render(<Form />);
    const singleDateInput = await screen.findByText('Date:');

    const timeRangeStartInput = await screen.findByLabelText('Time Range:').firstChild;
    waitFor(() => {
      fireEvent.change(singleDateInput, { target: { value: '2024-12-15' } });
      fireEvent.change(timeRangeStartInput, { target: { value: '2:00' } });
  
      expect(singleDateInput).toHaveValue('2024-12-15');
      expect(timeRangeStartInput).toHaveValue('2:00');
    }, {timeout: 100});
  });
});
