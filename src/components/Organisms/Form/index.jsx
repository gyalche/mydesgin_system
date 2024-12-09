import React from 'react';
import { Field, Form as FinalForm } from 'react-final-form';
import DatePicker from 'components/Molecules/DatePicker/DatePicker';
import TimePicker from 'components/Molecules/DatePicker/TimePicker';
import DateTimePicker from 'components/Molecules/DatePicker/DateTimePicker';
import DateRangePicker from 'components/Molecules/DatePicker/DateRangePicker';
import TimeRangePicker from 'components/Molecules/DatePicker/TimeRangePicker';

const Form = () => {
  const initialValues = {
    dateRange: [new Date(), new Date(new Date().setDate(new Date().getDate() + 14))],
    time: ['1:00', '2:00'],
    singleDate: new Date(new Date().setDate(new Date().getDate() + 9)),
    singleTime: '1:30 PM',
    dateTime: {
      date:  [new Date(), new Date(new Date().setDate(new Date().getDate() + 11))],
      time: ['3:00', '4:50'],
    },
  };

  const onSubmit = (values) => {
    // console.log('Submission values:', values);
  };

  return (
    <div>
      <FinalForm
        initialValues={initialValues}
        onSubmit={onSubmit}
        render={({ handleSubmit, form }) => (
          <form onSubmit={handleSubmit}>
            <div style={{ minWidth: '200px', 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'start', 
              justifyContent: 'center', 
              padding: '10px', 
              gap: '10px' }}>
                
              {/* Single date picker */}
              <div>
                <label>Date:</label>
                <Field name="singleDate" component={DatePicker} />
              </div>

              {/* Date range picker */}
              <div>
                <label>Daterange:</label>
                <Field name="dateRange" component={DateRangePicker}/>
              </div>

              {/* Single TimePicker */}
              <div>
                <label>Time:</label>
                <Field name="singleTime" component={TimePicker} />
              </div>

              <div>
                <label>Time Range:</label>
                <Field name="time" component={TimeRangePicker}/>
              </div>

              <div>
                <label>DateTime Picker:</label>
                <Field name="dateTime" component={DateTimePicker} />
              </div>
            </div>

            <div style={{ marginTop: '20px' }}>
              <button type="submit">Submit</button>
            </div>
          </form>
        )}
      />
    </div>
  );
};


export default Form;
