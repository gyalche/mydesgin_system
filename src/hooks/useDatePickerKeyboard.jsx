import { useState, useEffect } from 'react';

function useDatePickerKeyboardHandler({
  openCalender,
  openCalenderEnd,
  currentDate,
  setCurrentDate,
  currentMonth,
  startDate,
  endDate,
  isRangePicker,
  onlyFuture,
  input,
  onChange,
  inputRefEnd,
  inputRefStart,
  selectPreviousDate,
  handleNextMonth,
  handlePrevMonth,
  hoveredDate,
  setHoveredDate,
  setStartDate,
  setEndDate,
  disabled,
  dateTimeValue,
  handleSingleDate,
  notCurrentMontAndYear,
  dateTimeDefault,
  isDateTimeDouble,
  setCurrentMonth,
  setOpenCalender,
  setOpenCalenderEnd
}) {
  const [enableKeyboard, setEnableKeyboard] = useState(true);

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
    
      if (openCalender) {
        if (isRangePicker) {
          if (!startDate) {
            setStartDate(currentDate);
          } else if (endDate || currentDate < startDate) {
            setStartDate(currentDate);
          } else {
            setEndDate(currentDate);
            setHoveredDate(currentDate);
            setOpenCalenderEnd(false);
            input.onChange([startDate, currentDate]);
            onChange([startDate, currentDate]);
            return;
          }
          setOpenCalender(false);
          setOpenCalenderEnd(true);
          inputRefEnd.current?.focus();
        } else {
          setStartDate(currentDate);
          input.onChange(currentDate);
          onChange(currentDate);
          setOpenCalender(false);
        }
      } else if (openCalenderEnd) {
        if (currentDate >= startDate) {
          setEndDate(currentDate);
          setHoveredDate(currentDate);
          setOpenCalenderEnd(false);
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

    if (openCalender) {
      const initialDate = startDate && !isNaN(new Date(startDate)) ? new Date(startDate) : fallbackDate;
      setCurrentDate(initialDate);
      setCurrentMonth(initialDate);
    }
    
    if (openCalenderEnd) {
      const endDateValid = endDate && !isNaN(new Date(endDate));
      const startDateValid = startDate && !isNaN(new Date(startDate));
      const initialEndDate = endDateValid ? new Date(endDate) : startDateValid ? new Date(startDate) : fallbackDate;
      setCurrentDate(initialEndDate);
      setCurrentMonth(initialEndDate);
    }
  }, [startDate, openCalender, openCalenderEnd]);

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
        setOpenCalenderEnd(false);
        setOpenCalender(!openCalender);
        if (!openCalender) {
          inputRefStart.current?.focus();
        }
      } else {
        setOpenCalender(false);
        setOpenCalenderEnd(!openCalenderEnd);
        if (!openCalenderEnd) {
          inputRefEnd.current?.focus();
        }
      }
    }
  };

  useEffect(() => {
    if ((openCalender || openCalenderEnd) && enableKeyboard && !disabled) {
      window.addEventListener('keydown', handleKeyDown);

      return () => {
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [currentDate, currentMonth, openCalender, openCalenderEnd, enableKeyboard, hoveredDate, startDate, endDate, notCurrentMontAndYear]);

  return {
    enabledKeyboardFunc,
    disableKeyboardFunc,
    handleInputKeyDown,
  };
}

export default useDatePickerKeyboardHandler;
