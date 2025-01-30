import { useState, useEffect, useCallback } from 'react';

import { normalizeDate } from '../../../../../utils';

export const useDatePickerHandler = ({
  isRangePicker,
  onlyFuture,
  input,
  onChange,
  initialValue,
  dateTimeValue,
  dateTimeDefault,
  isDateTimeDouble,
  dateTimeStart,
  dateTimeEnd,
  setDateTimeStart,
  setDateTimeEnd,
}) => {
  const [startDate, setStartDate] = useState(Array.isArray(input?.value) ? input?.value[0] : input?.value);
  const [endDate, setEndDate] = useState(Array.isArray(input?.value) ? input?.value[1] : input?.value);
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
    if (dateTimeStart) setDateTimeStart(false);
    if (dateTimeEnd) setDateTimeEnd(false);
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
    if (Array.isArray(initialValue) && isRangePicker) {
      setStartDate(prev => (prev !== initialValue[0] ? initialValue[0] : prev));
      setEndDate(prev => (prev !== initialValue[1] ? initialValue[1] : prev));
      setDateRange(prev => (prev !== initialValue ? initialValue : prev));
    } else if (!isRangePicker) {
      setStartDate(prev => (prev !== initialValue ? initialValue || input?.value : prev));
      setEndDate(null);
    }
  }, [initialValue, input?.value, isRangePicker]);

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
