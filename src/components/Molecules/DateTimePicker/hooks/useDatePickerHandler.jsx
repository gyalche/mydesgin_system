import { useState, useEffect, useCallback } from 'react';

import { normalizeDate } from '../../../../utils';

export const useDatePickerHandler = ({
  isRangePicker,
  onlyFuture,
  input,
  onChange,
  value,
  dateTimeValue,
  dateTimeDefault,
  isDateTimeDouble,
}) => {
  const getEffectiveInitialValue = () => {
    if (input?.value !== undefined) return input.value;
    return value;
  };

  const [startDate, setStartDate] = useState(() => {
    const values = getEffectiveInitialValue();
    return Array.isArray(values) ? values[0] : values;
  });

  const [endDate, setEndDate] = useState(() => {
    const values = getEffectiveInitialValue();
    return Array.isArray(values) ? values[1] : null;
  });

  const [dateRange, setDateRange] = useState(null);
  const [hoveredDate, setHoveredDate] = useState(null);
  const [displayErrorFirst, setDisplayErrorFirst] = useState(false);
  const [displayErrorLast, setDisplayErrorLast] = useState(false);

  const handleSingleDate = useCallback(date => {
    setStartDate(date);
    setDisplayErrorFirst(true);
    onChange(date);
    if (input?.onChange) {
      input.onChange(date);
    }
  }, [setStartDate, onChange, input]);

  const handleDateRangeClick = useCallback(date => {
    const normalizedDate = normalizeDate(date);
    const today = normalizeDate(new Date());
    if (onlyFuture && normalizedDate < today) return;

    if (!startDate || (startDate && endDate)) {
      setStartDate(date);
      setEndDate('');
      setDateRange([date, null]);
      onChange([date, null]);
      input.onChange([date, null]);
    } else if (normalizedDate < normalizeDate(startDate)) {
      setStartDate(date);
      onChange([date, endDate]);
      input.onChange([date, endDate]);
    } else {
      setEndDate(date);
      setDateRange([startDate, date]);
      onChange([startDate, date]);
      input.onChange([startDate, date]);
    }
  }, [startDate, endDate, onlyFuture, onChange, input]);

  const isInRange = useCallback(day => {
    const normalizedDay = normalizeDate(day);
    const normalizedStartDate = normalizeDate(startDate);
    const normalizedEndDate = normalizeDate(endDate);
    return normalizedStartDate && normalizedEndDate
           && normalizedDay > normalizedStartDate
           && normalizedDay < normalizedEndDate;
  }, [startDate, endDate]);

  const isInHoverRange = useCallback(day => {
    if (!startDate || !hoveredDate) return false;
    const normalizedDay = normalizeDate(day);
    const normalizedStartDate = normalizeDate(startDate);
    const normalizedHoveredDate = normalizeDate(hoveredDate);

    return (
      (normalizedDay >= normalizedStartDate && normalizedDay <= normalizedHoveredDate)
      || (normalizedDay <= normalizedStartDate && normalizedDay >= normalizedHoveredDate)
    );
  }, [startDate, hoveredDate]);

  const clearStartDate = () => {
    setStartDate('');
  };

  const clearStartDateWhenNoDateTime = () => {
    setStartDate('');
    setDisplayErrorFirst(true);
    if (isRangePicker) {
      input.onChange([null, endDate]);
      if (Array.isArray(dateRange) && dateRange.length > 0) {
        dateRange.shift();
      }
    }
    input.onChange(null);
    onChange(null);
  };

  const clearEndDate = () => {
    setEndDate('');
    setDisplayErrorLast(true);
    input.onChange([startDate || null, null]);
    onChange([startDate || null, null]);
    dateRange.pop();
    setHoveredDate(startDate);
  };

  useEffect(() => {
    if (Array.isArray(value) && isRangePicker) {
      setStartDate(prev => (prev !== value[0] ? value[0] : prev));
      setEndDate(prev => (prev !== value[1] ? value[1] : prev));
      setDateRange(prev => (prev !== value ? value : prev));
    } else if (!isRangePicker) {
      setStartDate(prev => (prev !== value ? value || input?.value : prev));
      setEndDate(null);
    }
  }, [value, input?.value, isRangePicker]);

  useEffect(() => {
    if (dateTimeValue) {
      setStartDate(prev => {
        if (isDateTimeDouble && Array.isArray(dateTimeDefault) && dateTimeDefault.length >= 2) {
          return prev !== dateTimeDefault[1] ? dateTimeDefault[1] : prev;
        }
        if (!isDateTimeDouble && Array.isArray(dateTimeDefault) && dateTimeDefault.length > 0) {
          return prev !== dateTimeDefault[0] ? dateTimeDefault[0] : prev;
        }
        if (dateTimeDefault && !(Array.isArray(dateTimeDefault))) {
          return prev !== dateTimeDefault ? dateTimeDefault : prev;
        }
        return prev;
      });
    }
  }, [dateTimeDefault, isDateTimeDouble, dateTimeValue]);

  return {
    startDate,
    endDate,
    hoveredDate,
    displayErrorFirst,
    displayErrorLast,
    setHoveredDate,
    handleDateRangeClick,
    handleSingleDate,
    isInRange,
    isInHoverRange,
    clearStartDate,
    clearEndDate,
    clearStartDateWhenNoDateTime,
    setStartDate,
    setEndDate,
  };
};
