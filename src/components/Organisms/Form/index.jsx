import React from 'react';
import { DatePicker } from 'components/Molecules';
import { Field, Form as FinalForm } from 'react-final-form';
import TimePicker from 'components/Molecules/DatePicker/Time';
import PropTypes from 'prop-types';

const Form = ({ 
  dateInitialValue = new Date(), 
  timeInitialValue = '10:15 AM',
  isRangePicker = true, 
  isDoubleView = true, 
  is12Hour = true,
  step = 15,
  dateTimeFormat = 'ja-JP'
}) => {
  const initialValues = {
    date: isRangePicker 
      ? Array.isArray(dateInitialValue) 
        ? dateInitialValue 
        : [new Date(), new Date()]
      : dateInitialValue instanceof Date 
        ? dateInitialValue 
        : new Date(),
    time: timeInitialValue,
  };

  const onSubmit = values => {
    // console.log('Form values submitted:', values);
  };

  return (
    <div>
      <FinalForm
        initialValues={initialValues}
        onSubmit={onSubmit}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <div style={{ minWidth: '200px', display: 'flex', alignItems: 'center', padding: '10px'}}>
              
              {/* Date Field */}
              <div>
                <label>Date:</label>
                <Field name="date" render={({ input }) => {
                  const dateValue = isRangePicker 
                    ? input.value 
                    : (input.value instanceof Date ? input.value : new Date());

                  return (
                    <DatePicker 
                      {...input}
                      initialValue={dateValue}
                      isRangePicker={isRangePicker} 
                      isDoubleView={isDoubleView}
                      onChange={input.onChange}
                      dateTimeFormat={dateTimeFormat}
                    />
                  );
                }} />
              </div>

              {/* Time Field */}
              <div>
                <label>Time:</label>
                <Field name="time" render={({input}) => (
                  <TimePicker 
                    {...input} 
                    initialValue={input.value}
                    is12Hour={is12Hour}
                    step={step}
                  />
                )}/>
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

Form.propTypes = {
  dateInitialValue: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.instanceOf(Date)), 
    PropTypes.instanceOf(Date),
  ]),
  timeInitialValue : PropTypes.string,
  isDoubleView: PropTypes.bool,
  isRangePicker: PropTypes.bool,
  dateTimeFormat: PropTypes.string,
  onChange: PropTypes.func,
  is12Hour: PropTypes.bool,
  step: PropTypes.number,
};

Form.defaultProps = {
  dateInitialValue: new Date(), 
  timeInitialValue: '10:15 AM',
  isRangePicker: true, 
  isDoubleView: true, 
  is12Hour: true,
  step: 15,
  dateTimeFormat: 'ja-JP',
  onChange: ()=>{}
};

export default Form;
