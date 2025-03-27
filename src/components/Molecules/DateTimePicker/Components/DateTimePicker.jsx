import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
} from 'react';
import PropTypes from 'prop-types';

import { Layout } from 'components/Atoms';

import TimePicker from './TimePicker';
import DatePicker from './DatePicker';
import { DateTimeContainer, NextIcon } from '../styles';
import { combineDateAndTime } from '../../../../utils/index';

/**
 * DateTimePicker component
 * Combines DatePicker and TimePicker components for selecting both date and time
 */

function DateTimePicker({
  onChange,
  disabled,
  isRangePicker,
  isDoubleView,
  is12Hour,
  locale,
  placeholder,
  input,
  value,
  step,
}) {
  const initialValues = useMemo(() => input?.value ?? value, [input, value]);
  const [isRange, setIsRange] = useState(false);

  const [dateTimeStartValue, setDateTimeStartValue] = useState(() => {
    if (Array.isArray(initialValues)) return initialValues[0] ?? new Date();
    return initialValues ?? new Date();
  });
  const [dateTimeEndValue, setDateTimeEndValue] = useState(() => {
    if (Array.isArray(initialValues)) return initialValues[1] ?? new Date();
    return null;
  });

  const prevValuesRef = useRef(null);

  const handleChange = (values, type) => {
    setDateTimeStartValue(prevValue => {
      if (!prevValue) return values;

      if (type === 'date') {
        return combineDateAndTime(values, prevValue);
      }

      if (type === 'time') {
        return combineDateAndTime(prevValue, values);
      }

      return prevValue;
    });
  };

  const handleChangeEnd = (values, type) => {
    setDateTimeEndValue(prevValue => {
      if (!prevValue) return values;
      if (type === 'date') {
        return combineDateAndTime(values, prevValue);
      }
      if (type === 'time') {
        return combineDateAndTime(prevValue, values);
      }
      return prevValue;
    });
  };

  useEffect(() => {
    setIsRange(isRangePicker || (Array.isArray(initialValues || input?.value) && (initialValues?.length > 1 || input?.value?.length > 1)));
    const newValue = isRangePicker || Array.isArray(initialValues || input?.value)
      ? [dateTimeStartValue, dateTimeEndValue]
      : dateTimeStartValue;

    if (JSON.stringify(prevValuesRef.current) !== JSON.stringify(newValue)) {
      prevValuesRef.current = newValue;
      onChange(newValue);
      input?.onChange?.(newValue);
    }
  }, [dateTimeStartValue, dateTimeEndValue, isRangePicker, input, initialValues, onChange]);

  return (
    <DateTimeContainer>
      <Layout.Flex alignItems="center" gap="6px">
        <DatePicker
          data-testid="first-input"
          onChange={data => handleChange(data, 'date')}
          disabled={disabled}
          isRangePicker={false}
          isDoubleView={isDoubleView}
          locale={locale}
          placeholder={placeholder.date}
          dateTimeDefault={value || input?.value}
          handleDateTime={input}
          dateTimeValue={true}
          onlyFuture={true}
        />
        <TimePicker
          is12Hour={is12Hour}
          onChange={data => handleChange(data, 'time')}
          disabled={disabled}
          placeholder={placeholder.time}
          isRangePicker={false}
          dateTimeDefault={value || input?.value}
          dateTimeValue={true}
          step={step}
        />
      </Layout.Flex>

      {isRange && (
        <>
          <NextIcon name="Interface-arrow-right" />

          <Layout.Flex alignItems="center" gap="6px" ml="-1px">
            <DatePicker
              data-testid="second-input"
              onChange={data => handleChangeEnd(data, 'date')}
              disabled={disabled}
              locale={locale}
              placeholder={placeholder.date}
              isRangePicker={false}
              isDoubleView={isDoubleView}
              isDateTimeDouble={true}
              dateTimeDefault={value || input?.value}
              dateTimeValue={true}
            />
            <TimePicker
              is12Hour={is12Hour}
              onChange={data => handleChangeEnd(data, 'time')}
              disabled={disabled}
              placeholder={placeholder.time}
              isRangePicker={false}
              isDateTimeDouble={true}
              dateTimeDefault={value || input?.value}
              dateTimeValue={true}
              step={step}
            />
          </Layout.Flex>
        </>
      )}
    </DateTimeContainer>
  );
}

DateTimePicker.propTypes = {
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  isDoubleView: PropTypes.bool,
  isRangePicker: PropTypes.bool,
  is12Hour: PropTypes.bool,
  locale: PropTypes.string,
  placeholder: PropTypes.shape({
    date: PropTypes.string,
    time: PropTypes.string,
  }),
  input: PropTypes.oneOfType([PropTypes.object]),
  value: PropTypes.instanceOf(Date),
  step: PropTypes.number,
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
  value: null,
  step: 15,
  input: {},
};

export default DateTimePicker;
