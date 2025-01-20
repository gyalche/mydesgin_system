import { useState, useEffect, useRef, useCallback } from 'react';
import { normalizeDate } from '../utils';
import useClickOutside from './useClickOutside';
import closeOpenModal from './closeOpenModal';

function useDatePickerSelector({
  isRangePicker,
  onlyFuture,
  input,
  onChange,
  disabled,
  dateTimeValue,
  dateTimeDefault,
  isDateTimeDouble,
  initialValue,
  locale,
}) {
  const [startDate, setStartDate] = useState(Array.isArray(input?.value) ? input?.value[0] : input?.value);
  const [endDate, setEndDate] = useState(Array.isArray(input?.value) ? input?.value[1] : input?.value);
  const [openCalendar, setOpenCalendar] = useState(false);
  const [openCalendarEnd, setOpenCalendarEnd] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [dateRange, setDateRange] = useState(null);
  const [hoveredDate, setHoveredDate] = useState(null);
  const [weekdays, setWeekdays] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [displayErrorFirst, setDisplayErrorFirst] = useState(false);
  const [displayErrorLast, setDisplayErrorLast] = useState(false);
  const [enableKeyboard, setEnableKeyboard] = useState(true);

  const notCurrentMontAndYear = currentDate.getMonth() !== currentMonth.getMonth() || currentDate.getFullYear() !== currentMonth.getFullYear();

  const datePickerRef = useRef(null);
  const inputRefEnd = useRef(null);
  const inputRefStart = useRef(null);

  useClickOutside(datePickerRef, () => (setOpenCalendar(false), setOpenCalendarEnd(false)));
  closeOpenModal(() => (setOpenCalendar(false), setOpenCalendarEnd(false)));

  const handleSingleDate = useCallback((date) => {
    setStartDate(date);
    setDisplayErrorFirst(true);
    onChange(date);
    if(input?.onChange){
      input.onChange(date);
    }
  }, [setStartDate]);
  
  const handleDateRangeClick = useCallback((date) => {
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
      setOpenCalendar(false);
      setOpenCalendarEnd(false);
    }
  }, [startDate, endDate]);

  const isInRange = useCallback((day) => {
    const normalizedDay = normalizeDate(day);
    const normalizedStartDate = normalizeDate(startDate);
    const normalizedEndDate = normalizeDate(endDate);
    return normalizedStartDate && normalizedEndDate && normalizedDay > normalizedStartDate && normalizedDay < normalizedEndDate;
  },[startDate, endDate]);

  const handlePrevYear = useCallback(() => {
    setCurrentMonth(prevMonth => new Date(prevMonth.getFullYear() - 1, prevMonth.getMonth(), 1));
  }, [setCurrentMonth]);

  const handleNextYear = useCallback(() => {
    setCurrentMonth(prevMonth => new Date(prevMonth.getFullYear() + 1, prevMonth.getMonth(), 1));
  }, [setCurrentMonth]);

  const handlePrevMonth = useCallback(() => {
    setCurrentMonth(prevMonth => new Date(prevMonth.getFullYear(), prevMonth.getMonth() - 1, 1));
  }, [setCurrentMonth]);

  const handleNextMonth = useCallback(() => {
    setCurrentMonth(prevMonth => new Date(prevMonth.getFullYear(), prevMonth.getMonth() + 1, 1));
  }, [setCurrentMonth]);

  const isInHoverRange = useCallback((day) => {
    if (!startDate || !hoveredDate) return false;
    const normalizedDay = normalizeDate(day);
    const normalizedStartDate = normalizeDate(startDate);
    const normalizedHoveredDate = normalizeDate(hoveredDate);

    return (
      (normalizedDay >= normalizedStartDate && normalizedDay <= normalizedHoveredDate) ||
      (normalizedDay <= normalizedStartDate && normalizedDay >= normalizedHoveredDate)
    );
  }, [startDate, hoveredDate]);

  useEffect(() => {
    if(Array.isArray(initialValue) && isRangePicker){
      setStartDate(initialValue[0]);
      setEndDate(initialValue[1]);
      setDateRange(initialValue);
    }
    else if(!isRangePicker){
      setStartDate(initialValue || input?.value);
      setEndDate(null);
    }
  },[initialValue, isRangePicker, input?.value]);

  useEffect(() => {
    const currentDate = new Date();
    const currentDay = currentDate.getDay();
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDay + 1);

    const calculatedWeekdays = [...Array(7).keys()].map((index) => {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + index);
      return {
        day: new Intl.DateTimeFormat(locale, { weekday: 'short' }).format(date),
        dayIndex: date.getDay(),
      };
    });
    setWeekdays(calculatedWeekdays);
  }, [locale]);

  const selectPreviousDate = (monthAndYearNotSame) => {
    if(monthAndYearNotSame){
      const adjustDate = new Date(currentMonth);
      adjustDate.setDate(currentDate.getDate());
      setCurrentDate(adjustDate);
      updateDate(new Date(adjustDate));
      return;
    }
  };

  const onChangeCurrent = useCallback((val) => {
    if(!(val instanceof Date)) return;
    setCurrentMonth(val);
  }, [setCurrentMonth]);

  const handleKeyDown = (e) => {
    e.preventDefault();
    const today = new Date();
    const todayNormalized = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    
    const updateDate = (changeFn) => {
      setCurrentDate((prev) => {
        const newDate = changeFn(prev);
        const newYear = newDate.getFullYear();
        const currentYear = currentMonth.getFullYear();
        const isNextMonth = newDate.getMonth() > currentMonth.getMonth();
        const isPrevMonth = newDate.getMonth() < currentMonth.getMonth();

        if (isNextMonth && newYear === currentYear) handleNextMonth();
        if (isPrevMonth && newYear === currentYear) handlePrevMonth();
        if (newYear > currentYear) handleNextMonth();
        if (newYear < currentYear) handlePrevMonth();

        return onlyFuture ? newDate < todayNormalized ? todayNormalized : newDate : newDate;
      });
    };

    const handleEnter = () => {
      e.preventDefault();
      e.stopPropagation();
    
      if (openCalendar) {
        if (isRangePicker) {
          if (!startDate) {
            setStartDate(currentDate);
          } else if (endDate || currentDate < startDate) {
            setStartDate(currentDate);
          } else {
            setEndDate(currentDate);
            setHoveredDate(currentDate);
            setOpenCalendarEnd(false);
            input.onChange([startDate, currentDate]);
            onChange([startDate, currentDate]);
            return;
          }
          setOpenCalendar(false);
          setOpenCalendarEnd(true);
          inputRefEnd.current?.focus();
        } else {
          setStartDate(currentDate);
          input.onChange(currentDate);
          onChange(currentDate);
          setOpenCalendar(false);
        }
      } else if (openCalendarEnd) {
        if (currentDate >= startDate) {
          setEndDate(currentDate);
          setHoveredDate(currentDate);
          setOpenCalendarEnd(false);
          input.onChange([startDate, currentDate]);
        }
      }
    };

    switch (e.key) {
      case 'ArrowLeft':
        selectPreviousDate(notCurrentMontAndYear);
        updateDate((prev) => new Date(prev.setDate(prev.getDate() - 1)));
        break;
      case 'ArrowRight':
        selectPreviousDate(notCurrentMontAndYear);
        updateDate((prev) => new Date(prev.setDate(prev.getDate() + 1)));
        break;
      case 'ArrowUp':
        selectPreviousDate(notCurrentMontAndYear);
        updateDate((prev) => new Date(prev.setDate(prev.getDate() - 7)));
        break;
      case 'ArrowDown':
        selectPreviousDate(notCurrentMontAndYear);
        updateDate((prev) => new Date(prev.setDate(prev.getDate() + 7)));
        break;
      case 'Enter':
        if (!isRangePicker || dateTimeValue) handleSingleDate(currentDate);
        handleEnter(e);
        break;
      default:
        break;
    }
  };

  const disableKeyboardFunc = () => {
    setEnableKeyboard(false);
  };

  const enabledKeyboardFunc = () => {
    setEnableKeyboard(true);
  };

  useEffect(() => {
    const fallbackDate = new Date();

    if (openCalendar) {
      const initialDate = startDate && !isNaN(new Date(startDate)) ? new Date(startDate) : fallbackDate;
      setCurrentDate(initialDate);
      setCurrentMonth(initialDate);
    }
    
    if (openCalendarEnd) {
      const endDateValid = endDate && !isNaN(new Date(endDate));
      const startDateValid = startDate && !isNaN(new Date(startDate));
      const initialEndDate = endDateValid ? new Date(endDate) : startDateValid ? new Date(startDate) : fallbackDate;
      setCurrentDate(initialEndDate);
      setCurrentMonth(initialEndDate);
    }
  }, [startDate, openCalendar, openCalendarEnd]);

  useEffect(() => {
    if (dateTimeValue) {
      if (isDateTimeDouble && Array.isArray(dateTimeDefault) && dateTimeDefault.length >= 2) {
        setStartDate(dateTimeDefault[1]);
      }
      else if (!isDateTimeDouble && Array.isArray(dateTimeDefault) && dateTimeDefault.length > 0) {
        setStartDate(dateTimeDefault[0]);
      }
      else if (dateTimeDefault && !(Array.isArray(dateTimeDefault))) {
        setStartDate(dateTimeDefault);
      }
    }
  }, [dateTimeDefault, isDateTimeDouble, dateTimeValue]);

  useEffect(() => {
    if (!isDateTimeDouble && !Array.isArray(dateTimeDefault) && dateTimeValue) {
      setStartDate(dateTimeDefault);
    }
  }, [isDateTimeDouble, dateTimeValue]);

  const handleInputKeyDown = (e, isStartInput) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      e.stopPropagation();
      if (isStartInput) {
        setOpenCalendarEnd(false);
        setOpenCalendar(!openCalendar);
        if (!openCalendar) {
          inputRefStart.current?.focus();
        }
      } else {
        setOpenCalendar(false);
        setOpenCalendarEnd(!openCalendarEnd);
        if (!openCalendarEnd) {
          inputRefEnd.current?.focus();
        }
      }
    }
  };

  useEffect(() => {
    if ((openCalendar || openCalendarEnd) && enableKeyboard && !disabled) {
      window.addEventListener('keydown', handleKeyDown);

      return () => {
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [currentDate, currentMonth, openCalendar, openCalendarEnd, enableKeyboard, hoveredDate, startDate, endDate, notCurrentMontAndYear]);

  return {
    datePickerRef,
    inputRefEnd,
    inputRefStart,
    startDate,
    endDate,
    setStartDate,
    setEndDate,
    openCalendar,
    setOpenCalendar,
    openCalendarEnd,
    setOpenCalendarEnd,
    currentMonth,
    setCurrentMonth,
    dateRange,
    setDateRange,
    hoveredDate,
    setHoveredDate,
    weekdays,
    currentDate,
    setCurrentDate,
    displayErrorFirst,
    setDisplayErrorFirst,
    displayErrorLast,
    setDisplayErrorLast,
    handleKeyDown,
    enableKeyboard,
    disableKeyboardFunc,
    enabledKeyboardFunc,
    handleDateRangeClick,
    isInRange,
    handlePrevYear,
    handleNextYear,
    handleSingleDate,
    isInHoverRange,
    onChangeCurrent,
    handleInputKeyDown,
    handlePrevMonth,
    handleNextMonth,
    displayErrorFirst,
    setDisplayErrorFirst,
    displayErrorLast,
    setDisplayErrorLast
  };

}

export default useDatePickerSelector;
