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
}) => {
  const initialValues = {
    date: dateInitialValue,
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
                <Field name="date" render={({ input }) => (
                  <DatePicker 
                    {...input}
                    initialValue={input.value}
                    isRangePicker={isRangePicker} 
                    isDoubleView={isDoubleView}
                    onChange={input.onChange}
                  />
                )}/>
              </div>

              {/* Time Field */}
              <div>
                <label>Time:</label>
                <Field name="time" render={({input}) => (
                  <TimePicker 
                    {...input} 
                    initialValue={input.value}
                    is12Hour={is12Hour}
                    step = {step}
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
  dateInitialValue: PropTypes.date,
  timeInitialValue : PropTypes.string,
  isDoubleView: PropTypes.bool,
  isRangePicker: PropTypes.bool,
  initialValue:  PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.instanceOf(Date)), 
    PropTypes.instanceOf(Date),
  ]),
  dateTimeFormat: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  is12Hour: PropTypes.bool,
  step: PropTypes.number,
  initialValue: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

Form.defaultProps = {
  isDoubleView: true,
  isRangePicker: true,
  initialValue: null,
  dateTimeFormat: 'ja-JA',
  is12Hour: false,
  step: 15,
  initialValue: '1:15 AM',
};
export default Form;
