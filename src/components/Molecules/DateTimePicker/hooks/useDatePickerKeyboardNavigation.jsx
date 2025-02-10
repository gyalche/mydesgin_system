import {
  useState, useEffect, useCallback, useRef,
} from 'react';

import useClickOutside from '../../../../hooks/useClickOutside';
import useCloseOpenModal from '../../../../hooks/closeOpenModal';
import { KEYBOARD_KEYS } from '../../../../constant';

export const useDatePickerKeyboardNavigation = ({
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
  setEndDate,
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

  useCloseOpenModal(() => {
    setOpenCalendar(false);
    setOpenCalendarEnd(false);
  });

  const disableKeyboardFunc = () => setEnableKeyboard(false);
  const enabledKeyboardFunc = () => setEnableKeyboard(true);

  const selectPreviousDate = useCallback(monthAndYearNotSame => {
    if (monthAndYearNotSame) {
      const adjustDate = new Date(currentMonth);
      adjustDate.setDate(currentDate.getDate() - 1);
      setCurrentDate(adjustDate);
    }
  }, [currentDate, currentMonth]);

  const onChangeCurrent = useCallback(val => {
    if (!(val instanceof Date)) return;
    setCurrentMonth(val);
  }, [setCurrentMonth]);

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

  const handleInputKeyDown = (e, isStartInput) => {
    if (e.key === KEYBOARD_KEYS.enter) {
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

  const handleKeyDown = useCallback(e => {
    e.preventDefault();
    const today = new Date();
    const todayNormalized = new Date(today.getFullYear(), today.getMonth(), today.getDate());

    const updateDate = changeFn => {
      setCurrentDate(prev => {
        const newDate = changeFn(prev);
        const newYear = newDate.getFullYear();
        const currentYear = currentMonth.getFullYear();
        const isNextMonth = newDate.getMonth() > currentMonth.getMonth();
        const isPrevMonth = newDate.getMonth() < currentMonth.getMonth();

        if (isNextMonth && newYear === currentYear) handleNextMonth();
        if (isPrevMonth && newYear === currentYear) handlePrevMonth();
        if (newYear > currentYear) handleNextMonth();
        if (newYear < currentYear) handlePrevMonth();

        if (onlyFuture) {
          if (newDate < todayNormalized) {
            return todayNormalized;
          }
          return newDate;
        }
        return newDate;
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
          setOpenCalendar(true);
        }
      } else if (openCalendarEnd) {
        if (currentDate >= startDate) {
          setEndDate(currentDate);
          input.onChange([startDate, currentDate]);
          onChange([startDate, currentDate]);
        }
      }
    };

    switch (e.key) {
      case KEYBOARD_KEYS.arrowLeft:
        selectPreviousDate(notCurrentMonthAndYear);
        updateDate(prev => new Date(prev.setDate(prev.getDate() - 1)));
        break;
      case KEYBOARD_KEYS.arrowRight:
        selectPreviousDate(notCurrentMonthAndYear);
        updateDate(prev => new Date(prev.setDate(prev.getDate() + 1)));
        break;
      case KEYBOARD_KEYS.arrowUp:
        selectPreviousDate(notCurrentMonthAndYear);
        updateDate(prev => new Date(prev.setDate(prev.getDate() - 7)));
        break;
      case KEYBOARD_KEYS.arrowDown:
        selectPreviousDate(notCurrentMonthAndYear);
        updateDate(prev => new Date(prev.setDate(prev.getDate() + 7)));
        break;
      case KEYBOARD_KEYS.enter:
        if (!isRangePicker || dateTimeValue) handleSingleDate(currentDate);
        handleEnter(e);
        break;
      default:
        break;
    }
  }, [
    currentDate,
    currentMonth,
    onlyFuture,
    openCalendar,
    startDate,
    endDate,
    isRangePicker,
    dateTimeValue,
    input,
    inputRefEnd,
    handleNextMonth,
    handlePrevMonth,
    selectPreviousDate,
    notCurrentMonthAndYear,
    handleSingleDate,
    onChange,
    openCalendarEnd,
    setEndDate,
    setStartDate,
  ]);

  useEffect(() => {
    if ((openCalendar || openCalendarEnd) && enableKeyboard && !disabled) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentDate, currentMonth, openCalendar, openCalendarEnd, enableKeyboard, notCurrentMonthAndYear, disabled, handleKeyDown]);

  useEffect(() => {
    const fallbackDate = new Date();
    if (openCalendar) {
      const initialDate = startDate && !Number.isNaN(new Date(startDate)) ? new Date(startDate) : fallbackDate;
      setCurrentDate(initialDate);
      setCurrentMonth(initialDate);
    }

    if (openCalendarEnd) {
      const endDateValid = endDate && !Number.isNaN(new Date(endDate));
      const startDateValid = startDate && !Number.isNaN(new Date(startDate));
      let initialEndDate;
      if (endDateValid) {
        initialEndDate = new Date(endDate);
      } else if (startDateValid) {
        initialEndDate = new Date(startDate);
      } else {
        initialEndDate = fallbackDate;
      }
      setCurrentDate(initialEndDate);
      setCurrentMonth(initialEndDate);
    }
  }, [startDate, endDate, openCalendar, openCalendarEnd]);

  useEffect(() => {
    const currentDateValue = new Date();
    const currentDay = currentDateValue.getDay();
    const startOfWeek = new Date(currentDateValue);
    startOfWeek.setDate(currentDateValue.getDate() - currentDay + 1);

    const calculatedWeekdays = [...Array(7).keys()].map(index => {
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
    disableKeyboardFunc,
  };
};
