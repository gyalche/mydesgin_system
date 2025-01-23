import { useState, useEffect, useCallback, useRef } from 'react';
import useClickOutside from './useClickOutside';
import closeOpenModal from './closeOpenModal';

export const useDatePickerKeyboard = ({ 
  locale,
  disabled,
  onlyFuture,
  startDate,
  endDate,
  isRangePicker,
  dateTimeValue,
  handleSingleDate,
  input,
  onChange,
  setStartDate,
  setEndDate
}) => {
  const [openCalendar, setOpenCalendar] = useState(false);
  const [openCalendarEnd, setOpenCalendarEnd] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [currentDate, setCurrentDate] = useState(new Date());
  const [weekdays, setWeekdays] = useState([]);
  const [enableKeyboard, setEnableKeyboard] = useState(true);

  const datePickerRef = useRef(null);
  const inputRefEnd = useRef(null);
  const inputRefStart = useRef(null);

  const notCurrentMonthAndYear = currentDate.getMonth() !== currentMonth.getMonth() || currentDate.getFullYear() !== currentMonth.getFullYear();

  useClickOutside(datePickerRef, () => {
    setOpenCalendar(false);
    setOpenCalendarEnd(false);
  });
  
  closeOpenModal(() => {
    setOpenCalendar(false);
    setOpenCalendarEnd(false);
  });

  const disableKeyboardFunc = () => {
    setEnableKeyboard(false);
  };

  const enabledKeyboardFunc = () => {
    setEnableKeyboard(true);
  };

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

  const handlePrevYear = useCallback(() => {
    setCurrentMonth(prevMonth => new Date(prevMonth.getFullYear() - 1, prevMonth.getMonth(), 1));
  }, []);

  const handleNextYear = useCallback(() => {
    setCurrentMonth(prevMonth => new Date(prevMonth.getFullYear() + 1, prevMonth.getMonth(), 1));
  }, []);

  const handlePrevMonth = useCallback(() => {
    setCurrentMonth(prevMonth => new Date(prevMonth.getFullYear(), prevMonth.getMonth() - 1, 1));
  }, []);

  const handleNextMonth = useCallback(() => {
    setCurrentMonth(prevMonth => new Date(prevMonth.getFullYear(), prevMonth.getMonth() + 1, 1));
  }, []);

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
          onChange([startDate, currentDate]);
        }
      }
    };

    switch (e.key) {
      case 'ArrowLeft':
        selectPreviousDate(notCurrentMonthAndYear);
        updateDate((prev) => new Date(prev.setDate(prev.getDate() - 1)));
        break;
      case 'ArrowRight':
        selectPreviousDate(notCurrentMonthAndYear);
        updateDate((prev) => new Date(prev.setDate(prev.getDate() + 1)));
        break;
      case 'ArrowUp':
        selectPreviousDate(notCurrentMonthAndYear);
        updateDate((prev) => new Date(prev.setDate(prev.getDate() - 7)));
        break;
      case 'ArrowDown':
        selectPreviousDate(notCurrentMonthAndYear);
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

  // Calendar open/close effects
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
  }, [startDate, endDate, openCalendar, openCalendarEnd]);

  // Keyboard navigation effect
  useEffect(() => {
    if ((openCalendar || openCalendarEnd) && enableKeyboard && !disabled) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [openCalendar, openCalendarEnd, enableKeyboard, disabled, currentDate, currentMonth]);

  // Weekdays calculation effect
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

  return {
    openCalendar,
    openCalendarEnd,
    currentMonth,
    currentDate,
    weekdays,
    datePickerRef,
    inputRefEnd,
    inputRefStart,
    enableKeyboard,
    setOpenCalendar,
    setOpenCalendarEnd,
    handlePrevYear,
    handleNextYear,
    handlePrevMonth,
    handleNextMonth,
    handleInputKeyDown,
    setEnableKeyboard,
    onChangeCurrent,
    enabledKeyboardFunc,
    disableKeyboardFunc
  };
};
