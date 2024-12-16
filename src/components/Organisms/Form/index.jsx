import DatePicker from 'components/Molecules/DatePicker';
import DateRangePicker from 'components/Molecules/DatePicker/Date/DateRangePicker';
import DateTimePicker from 'components/Molecules/DatePicker/DateTimePicker';
import TimePicker from 'components/Molecules/DatePicker/Time/TimePicker';
import TimeRangePicker from 'components/Molecules/DatePicker/Time/TimeRangePicker';
import React from 'react';
import { Field, Form as FinalForm } from 'react-final-form';

const Form = () => {
  const initialValues = {
    dateRange: [new Date(), new Date(new Date().setDate(new Date().getDate() + 14))],
    singleDate: new Date(new Date().setDate(new Date().getDate() + 9)),
    singleTime: new Date('Dec 14 2024 15:20:00'),
    time: [new Date(), new Date('Dec 14 2024 1:10:00')],
    dateTime:  new Date('Dec 14 2024 1:50:00'),
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
              <button style={{width: '80px'}} type="submit"> Submit </button>
            </div>
          </form>
        )}
      />
    </div>
  );
};


export default Form;
