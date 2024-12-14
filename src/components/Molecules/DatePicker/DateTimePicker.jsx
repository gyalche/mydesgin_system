import React, { useEffect, useState } from 'react';
import TimePicker from './Time/TimePicker';
import DatePicker from './Date/DatePicker';
import PropTypes from 'prop-types';
import { DateTimeContainer, NextIcon } from './styles';
import { Layout } from 'components/Atoms';

const DateTimePicker = ({ onChange, 
  disabled,
  isDoublePicker,
  isDoubleView,
  isRangePicker,
  is12Hour,
  locale,
  placeholder,
  isTimeRange,
  input,
  initialValue,
}) => {
  const [value, setValue] = useState([]);
  const [dateTimeStart, setDateTimeStart] = useState(true);
  const [dateTimeEnd, setDateTimeEnd] = useState(true);

  const validateValue = (value, type) => {
    const isValidDate = (date) => date instanceof Date && !isNaN(date);
    const isValidTime = (time) => {
      const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
      return typeof time === 'string' && timeRegex.test(time);
    };
  
    return type === 'date' ? isValidDate(value) : isValidTime(value);
  };

  const handleDateTimeChange = (dateValue, timeValue, position) => {
    const myData = { ...value };

    const date = new Date(dateValue); // Ensure dateValue is a Date object
    const [hours, minutes] = timeValue.split(':'); // Assuming time is in "hh:mm" format
    date.setHours(hours);
    date.setMinutes(minutes);
    if (position === 'start') {
      myData['startDateTime'] = date;
    } else if (position === 'end') {
      myData['endDateTime'] = date;
    }
    if (onChange) {
      onChange(myData);
    }
    if (input && typeof input.onChange === 'function') {
      input.onChange(myData);
    }
    return myData;
  };

  const handleChange = (value, type, position) => {
    if (!validateValue(value, type)) return;

    setValue((prevValue) => {
      const myData = { ...prevValue };

      // Handle double picker logic
      if (isDoublePicker) {
        if (!Array.isArray(myData[type])) {
          myData[type] = [null, null];
        }
        if (position === 'start') {
          myData[type][0] = value;
          if (myData['time'] && myData['time'][0]) {
            const startTime = myData['time'][0];
            myData = handleDateTimeChange(value, startTime, 'start');
          }
        } else if (position === 'end') {
          myData[type][1] = value;
          if (myData['time'] && myData['time'][1]) {
            const endTime = myData['time'][1];
            myData = handleDateTimeChange(value, endTime, 'end');
          }
        }
      } else {
        myData[type] = value;
      }
      return myData;
    });
  };

  return (
    <DateTimeContainer>
      <Layout.Flex alignItems="center" gap="6px">
        <DatePicker
          onChange={(e) => handleChange(e, 'date', 'start')}
          disabled={disabled}
          isRangePicker={isRangePicker}
          isDoubleView={isDoubleView}
          locale={locale}
          placeholder={placeholder.date}
          dateTimeStart={dateTimeStart}
          setDateTimeStart={setDateTimeStart}
          dateTimeDefault={input?.value ?? initialValue}
          handleDateTime={input}
        />
        <TimePicker
          is12Hour={is12Hour}
          onChange={(e) => handleChange(e, 'time', 'start')}
          disabled={disabled}
          placeholder={placeholder.time}
          isTimeRange={isTimeRange}
          dateTimeDefault={input?.value ?? initialValue}
        />
      </Layout.Flex>

      {isDoublePicker && (
        <>
          <NextIcon name="Interface-arrow-right" />

          <Layout.Flex alignItems="center" gap="6px" ml="-1px">
            <DatePicker
              onChange={(e) => handleChange(e, 'date', 'end')}
              disabled={disabled}
              locale={locale}
              placeholder={placeholder.date}
              isRangePicker={isRangePicker}
              isDoubleView={isDoubleView}
              dateTimeEnd={dateTimeEnd}
              setDateTimeEnd={setDateTimeEnd}
              isDateTimeDouble={true}
              dateTimeDefault={input?.value ?? initialValue}
            />
            <TimePicker
              is12Hour={is12Hour}
              onChange={(e) => handleChange(e, 'time', 'end')}
              disabled={disabled}
              placeholder={placeholder.time}
              isTimeRange={isTimeRange}
              isDateTimeDouble={true}
              dateTimeDefault={input?.value ?? initialValue}
            />
          </Layout.Flex>
        </>
      )}
    </DateTimeContainer>
  );
};

DateTimePicker.propTypes = {
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  isDoubleView: PropTypes.bool,
  isRangePicker: PropTypes.bool,
  is12Hour: PropTypes.bool,
  isDoublePicker: PropTypes.bool,
  locale: PropTypes.string,
  placeholder: PropTypes.shape({
    date: PropTypes.string,
    time: PropTypes.string,
  }),
  isTimeRange: PropTypes.bool,
  input: PropTypes.oneOfType([PropTypes.object]),
  initialValue: PropTypes.any,
};

DateTimePicker.defaultProps = {
  onChange: () => {},
  disabled: false,
  isDoubleView: false,
  isRangePicker: false,
  is12Hour: false,
  isDoublePicker: true,
  locale: 'en-US',
  placeholder: {
    date: 'yyyy/mm/dd',
    time: 'hh:mm',
  },
  isTimeRange: false,
  initialValue: null,
};

export default DateTimePicker;
