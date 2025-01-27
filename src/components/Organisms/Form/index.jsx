/* eslint-disable react/function-component-definition */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { Field, Form as FinalForm } from 'react-final-form';

import DatePicker from 'components/Molecules/DateTimePicker/DateAndTime/DatePicker';
import DateTimePicker from 'components/Molecules/DateTimePicker/DateAndTime/DateTimePicker';
import TimePicker from 'components/Molecules/DateTimePicker/DateAndTime/TimePicker';

const Form = () => {
  const initialValues = {
    dateRange: [new Date(), new Date(new Date().setDate(new Date().getDate() + 14))],
    singleDate: new Date('Feb 14 2026 15:20:00'),
    singleTime: new Date('Jan 14 2026 15:20:00'),
    time: [new Date(), new Date('Dec 14 2025 1:20:00')],
    dateTime: new Date('Dec 20 2025 1:50:00'),
  };

  const onSubmit = values => {
    // eslint-disable-next-line no-console
    console.log('Submission values:', values);
  };

  return (
    <div>
      <FinalForm
        initialValues={initialValues}
        onSubmit={onSubmit}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <div
              style={{
                minWidth: '200px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'start',
                justifyContent: 'center',
                padding: '10px',
                gap: '10px',
              }}
            >
              {/* Single date picker */}
              <div>
                <label htmlFor="singleDate">Date:</label>
                <Field name="singleDate" component={DatePicker} />
              </div>

              {/* Date range picker */}
              <div>
                <label>Daterange:</label>
                <Field name="dateRange" render={({ input }) => <DatePicker input={input} isRangePicker={true} />} />
              </div>

              {/* Single TimePicker */}
              <div>
                <label>Time:</label>
                <Field name="singleTime" component={TimePicker} />
              </div>

              <div>
                <label>Time Range:</label>
                <Field name="time" render={({ input }) => <TimePicker is12Hour={true} input={input} isRangePicker={true} />} />
              </div>

              <div>
                <label>DateTime Picker:</label>
                <Field name="dateTime" component={DateTimePicker} />
              </div>
            </div>

            <div style={{ marginTop: '20px' }}>
              <button style={{ width: '80px' }} type="submit"> Submit </button>
            </div>
          </form>
        )}
      />
    </div>
  );
};

export default Form;
