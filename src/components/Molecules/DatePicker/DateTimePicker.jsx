import React, { useEffect, useState } from 'react';
import TimePicker from './Time/TimePicker';
import DatePicker from './Date/DatePicker';
import PropTypes from 'prop-types';
import { DateTimeContainer, NextIcon } from './styles';
import { Layout } from 'components/Atoms';
import { combineDateAndTime } from '../../../utils/index';

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

  const initialValues = input?.value ?? initialValue ?? new Date();

  const [dateTimeStart, setDateTimeStart] = useState(true);
  const [dateTimeEnd, setDateTimeEnd] = useState(true);

  const [dateTimeStartvalue, setDateTimeStartValue] = useState(Array.isArray(initialValues) ? initialValues[0] : initialValues);
  const [dateTimeEndvalue, setDateTimeEndValue] = useState(Array.isArray(initialValues) ? initialValues[1]: initialValues);

  const handleChange = (value, type) => {
    setDateTimeStartValue((prevValue) => {
      if (type === 'date') {
        // When the date changes, combine it with the existing time
        return combineDateAndTime(value, prevValue);
      }
      
      if (type === 'time') {
        // When the time changes, combine it with the existing date
        return combineDateAndTime(prevValue, value);
      }
      return prevValue;
    });
  };

  const handleChangeEnd = (value, type) => {
    setDateTimeEndValue((prevValue) => {
      if (type === 'date') {
        // When the date changes, combine it with the existing time
        return combineDateAndTime(value, prevValue);
      }
      
      if (type === 'time') {
        // When the time changes, combine it with the existing date
        return combineDateAndTime(prevValue, value);
      }
      return prevValue;
    });
  };

  useEffect(() => {
    onChange([dateTimeStartvalue, dateTimeEndvalue]);
    input?.onChange([dateTimeStartvalue, dateTimeEndvalue]);
  }, [dateTimeStartvalue, dateTimeEndvalue]);
  
  return (
    <DateTimeContainer>
      <Layout.Flex alignItems="center" gap="6px">
        <DatePicker
          onChange={(e) => handleChange(e, 'date')}
          disabled={disabled}
          isRangePicker={isRangePicker}
          isDoubleView={isDoubleView}
          locale={locale}
          placeholder={placeholder.date}
          dateTimeStart={dateTimeStart}
          setDateTimeStart={setDateTimeStart}
          dateTimeDefault={initialValues}
          handleDateTime={input}
        />
        <TimePicker
          is12Hour={is12Hour}
          onChange={(e) => handleChange(e, 'time')}
          disabled={disabled}
          placeholder={placeholder.time}
          isTimeRange={isTimeRange}
          dateTimeDefault={initialValues}
        />
      </Layout.Flex>

      {isDoublePicker && (
        <>
          <NextIcon name="Interface-arrow-right" />

          <Layout.Flex alignItems="center" gap="6px" ml="-1px">
            <DatePicker
              onChange={(e) => handleChangeEnd(e,'date')}
              disabled={disabled}
              locale={locale}
              placeholder={placeholder.date}
              isRangePicker={isRangePicker}
              isDoubleView={isDoubleView}
              dateTimeEnd={dateTimeEnd}
              setDateTimeEnd={setDateTimeEnd}
              isDateTimeDouble={true}
              dateTimeDefault={initialValues}
            />
            <TimePicker
              is12Hour={is12Hour}
              onChange={(e) => handleChangeEnd(e, 'time')}
              disabled={disabled}
              placeholder={placeholder.time}
              isTimeRange={isTimeRange}
              isDateTimeDouble={true}
              dateTimeDefault={initialValues}
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
