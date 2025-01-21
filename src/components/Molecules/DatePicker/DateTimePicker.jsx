import React, { useEffect, useState } from 'react';
import TimePicker from './TimePicker';
import DatePicker from './DatePicker';
import PropTypes from 'prop-types';
import { DateTimeContainer, NextIcon } from './styles';
import { Layout } from 'components/Atoms';
import { combineDateAndTime } from '../../../utils/index';

const DateTimePicker = ({ onChange, 
  disabled,
  isRangePicker,
  isDoubleView,
  is12Hour,
  locale,
  placeholder,
  input,
  initialValue,
  step,
}) => {
  const initialValues = input?.value ?? initialValue ?? new Date();
  const [isRange, setIsRange] = useState(false);

  const [dateTimeStart, setDateTimeStart] = useState(true);
  const [dateTimeEnd, setDateTimeEnd] = useState(true);

  const [dateTimeStartvalue, setDateTimeStartValue] = useState(Array.isArray(initialValues) ? initialValues[0] : initialValues);
  const [dateTimeEndvalue, setDateTimeEndValue] = useState(Array.isArray(initialValues) ? initialValues[1]: initialValues);

  const handleChange = (value, type) => {
    setDateTimeStartValue((prevValue) => {
      if (type === 'date') {
        return combineDateAndTime(value, prevValue);
      }
      
      if (type === 'time') {
        return combineDateAndTime(prevValue, value);
      }

      return prevValue;
    });
  };

  const handleChangeEnd = (value, type) => {
    setDateTimeEndValue((prevValue) => {
    
      if (type === 'date') {
        return combineDateAndTime(value, prevValue);
      } 
      if (type === 'time') {
        return combineDateAndTime(prevValue, value);
      }
      return prevValue;
    });
  };

  useEffect(() => {
    if (isRangePicker || Array.isArray(initialValues || input?.value)) {
      const updatedValue = [dateTimeStartvalue, dateTimeEndvalue];
      onChange(updatedValue);
      input?.onChange(updatedValue);
      setIsRange(true);
    } else {
      onChange(dateTimeStartvalue);
      input?.onChange(dateTimeStartvalue);
      setIsRange(false);
    }
  }, [dateTimeStartvalue, dateTimeEndvalue, isRangePicker, input]);

  return (
    <DateTimeContainer>
      <Layout.Flex alignItems="center" gap="6px">
        <DatePicker
          data-testid = 'first-input'
          onChange={(value) => handleChange(value, 'date')}
          disabled={disabled}
          isRangePicker={false}
          isDoubleView={isDoubleView}
          locale={locale}
          placeholder={placeholder.date}
          dateTimeStart={dateTimeStart}
          setDateTimeStart={setDateTimeStart}
          dateTimeDefault={initialValues}
          handleDateTime={input}
          dateTimeValue={true}
          onlyFuture={true}
        />
        <TimePicker
          is12Hour={is12Hour}
          onChange={(value) => handleChange(value, 'time')}
          disabled={disabled}
          placeholder={placeholder.time}
          isRangePicker={false}
          dateTimeDefault={initialValues}
          dateTimeValue={true}
          step={step}
        />
      </Layout.Flex>

      {isRange && (
        <>
          <NextIcon name="Interface-arrow-right" />

          <Layout.Flex alignItems="center" gap="6px" ml="-1px">
            <DatePicker
              data-testid = 'second-input'
              onChange={(value) => handleChangeEnd(value,'date')}
              disabled={disabled}
              locale={locale}
              placeholder={placeholder.date}
              isRangePicker={false}
              isDoubleView={isDoubleView}
              dateTimeEnd={dateTimeEnd}
              setDateTimeEnd={setDateTimeEnd}
              isDateTimeDouble={true}
              dateTimeDefault={initialValues}
              dateTimeValue={true}
            />
            <TimePicker
              is12Hour={is12Hour}
              onChange={(value) => handleChangeEnd(value, 'time')}
              disabled={disabled}
              placeholder={placeholder.time}
              isRangePicker={false}
              isDateTimeDouble={true}
              dateTimeDefault={initialValues}
              dateTimeValue={true}
              step={step}
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
  isRangePicker: PropTypes.bool,
  locale: PropTypes.string,
  placeholder: PropTypes.shape({
    date: PropTypes.string,
    time: PropTypes.string,
  }),
  isTimeRange: PropTypes.bool,
  input: PropTypes.oneOfType([PropTypes.object]),
  initialValue: PropTypes.any,
  step: PropTypes.bool,
};

DateTimePicker.defaultProps = {
  onChange: () => {},
  disabled: false,
  isDoubleView: false,
  isRangePicker: false,
  is12Hour: false,
  locale: 'ja-JP',
  placeholder: {
    date: 'yyyy/mm/dd',
    time: 'hh:mm',
  },
  isTimeRange: false,
  initialValue: null,
  step: 15,
};

export default DateTimePicker;
