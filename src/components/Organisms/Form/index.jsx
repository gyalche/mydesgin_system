import React from 'react';
import { DatePicker } from 'components/Molecules';
import { Field, Form as FinalForm } from 'react-final-form';
import TimePicker from 'components/Molecules/DatePicker/Time';

const Form = () => {
  const initialValues = {
    date: new Date(),
    time: '10:15 AM',
  };

  const onSubmit = values => {
    console.log('this is my value', values);
  };

  return (
    <div >
      <FinalForm
        initialValues={initialValues}
        onSubmit={onSubmit}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <div style={{ minWidth: '200px', display: 'flex', alignItems: 'center', padding: '10px'}}>
                <div>
                    <label>Date:</label>
                    <Field name="date" render={({ input }) => (
                    <DatePicker 
                      {...input} 
                      initialValue={input.value}
                      isRangePicker={true} 
                      isDoubleView={true}
                      onChange={input.onChange}
                    />
                  )} />
                  </div>
                <div>
                    <label>Time:</label>
                    <Field name="time" render={({input}) => (
                        <TimePicker 
                          {...input} 
                          initialValue={input.value}
                          is12Hour={false}
                        />
                    )} />
                </div>

            </div>
            <div style={{marginTop: '20px'}}>
              <button type="submit">Submit</button>
            </div>
          </form>
        )}
      />
    </div>
  );
};

export default Form;
