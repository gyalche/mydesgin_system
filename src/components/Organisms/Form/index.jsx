import React from 'react';
import { Field, Form as FinalForm } from 'react-final-form';
import PropTypes from 'prop-types';
import DatePicker from 'components/Molecules/DatePicker/DatePicker';
import TimePicker from 'components/Molecules/DatePicker/TimePicker';
import DateTimePicker from 'components/Molecules/DatePicker/DateTimePicker';

const Form = ({ 
  dateInitialValue = new Date(), 
  timeInitialValue = '10:15 AM',
  isRangePicker = true, 
  isDoubleView = true, 
  is12Hour = true,
  step = 15,
  dateTimeFormat = 'ja-JP',
  isDoublePicker,
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

    singleDate: new Date(Date.now()),

    singleTime: '11:00',

    dateTime: {
      date: isDoublePicker ? [new Date(), new Date()] : new Date(),
      time: isDoublePicker ? ['1:00', '2:30'] : '10: 00',
    },
  };

  const onSubmit = values => {
    console.log('submition', values);
  };
  const myStyles= {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
    justifyContent: 'center',
    gap: '5px',
  };
  return (
    <div>
      <FinalForm
        initialValues={initialValues}
        onSubmit={onSubmit}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <div style={{ minWidth: '200px',
              display: 'flex', 
              flexDirection:'column', 
              alignItems: 'start',
              justifyContent: 'center',
              padding: '10px', gap: '10px'}}>
              
              {/* Sigle date picker */}
              <div style={myStyles}>
                <label>Date:</label>
                <Field name="singleDate" render={({input}) => (
                  <DatePicker 
                    {...input}
                    isRangePicker={false}
                    // initialValue={initialValues}
                  />
                )} />
              </div>

              {/* Daterange date picker */}
              <div style={myStyles}>
                <label>Daterange:</label>
                <Field name="date" render={({input}) => (
                  <DatePicker
                    {...input}
                    isRangePicker={true}
                    initialValue={initialValues}
                  />
                )} />
              </div>
              {/* Single TimePicker */}
              <div style={myStyles}>
                <label>Time:</label>
                <Field name="singleTime" render={({input}) => (
                  <TimePicker 
                    {...input}
                    step={step}
                  />
                )}/>
              </div>
              <div style={myStyles}>
                <label>Time Range:</label>
                <Field name="time" render={({input}) => (
                  <TimePicker 
                    {...input}
                    isTimeRange={true}
                    step={step}
                  />
                )}/>
              </div>

              <div style={myStyles}>
                <label>DateTime Picker:</label>
                <Field
                  name="dateTime"
                  render={({ input }) => (
                    <DateTimePicker
                      input={input}
                      isDoublePicker={isDoublePicker}
                      isRangePicker={false}
                      isDoubleView={false}
                      // is12Hour={is12Hour}
                    />
                  )}
                />
              </div>
            </div>

            <div style={{ marginTop: '20px'}}>
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
  isDoublePicker: PropTypes.bool,
};

Form.defaultProps = {
  dateInitialValue: new Date(), 
  timeInitialValue: '10:15 AM',
  isRangePicker: true, 
  isDoubleView: true, 
  is12Hour: true,
  step: 15,
  dateTimeFormat: 'ja-JP',
  onChange: ()=>{},
  isDoublePicker: true,
};

export default Form;
