import { useState, useEffect, useCallback } from 'react';

import useCloseOpenModal from '../../../../../hooks/closeOpenModal';

const useCalendarHandler = ({
  startDate,
  endDate,
  setHoveredDate,
  date,
  setDates,
  isRangePicker,
  setModalFocus,
  enableKeyboard,
  setShowYears,
  setOpenDecade,
  setOpenMonth,
  modalFocus,
}) => {
  const currentYear = new Date().getFullYear();
  const [currentMonth, setCurrentMonth] = useState(date);
  const [currentDecadeStart, setCurrentDecadeStart] = useState(Math.floor(currentYear / 10) * 10);
  const [selectedDecade, setSelectedDecade] = useState(currentDecadeStart);

  useCloseOpenModal(() => {
    setOpenDecade(false);
    setShowYears(false);
  });

  const handleMouseEnter = useCallback(day => {
    if (isRangePicker && startDate && !endDate && day instanceof Date) {
      setHoveredDate(day);
    }
  }, [isRangePicker, startDate, endDate, setHoveredDate]);

  const handleMouseLeave = useCallback(() => setHoveredDate(null), [setHoveredDate]);

  const openSelectDecade = useCallback(() => {
    setOpenDecade(true);
    setShowYears(false);
    setOpenMonth(false);
    enableKeyboard();
  }, [setOpenDecade, setShowYears, setOpenMonth, enableKeyboard]);

  const openSelectMonth = useCallback(() => {
    setOpenMonth(true);
    setOpenDecade(false);
    enableKeyboard();
  }, [setOpenMonth, setOpenDecade, enableKeyboard]);

  const handleDecadeSelect = useCallback(decadeStart => {
    if (typeof decadeStart === 'number' && decadeStart >= 1000 && decadeStart <= 9999) {
      setSelectedDecade(decadeStart);
      setShowYears(true);
      setModalFocus(false);
      enableKeyboard();
    }
  }, [setSelectedDecade, setShowYears, setModalFocus, enableKeyboard]);

  const goToNextDecade = useCallback(() => {
    setCurrentDecadeStart(prev => prev + 10);
    setSelectedDecade(current => current + 10);
  }, []);

  const goToPreviousDecade = useCallback(() => {
    setCurrentDecadeStart(prev => prev - 10);
    setSelectedDecade(current => current - 10);
  }, []);

  useEffect(() => {
    setCurrentMonth(date);
  }, [date]);

  useEffect(() => {
    setDates(currentMonth);
  }, [currentMonth, setDates]);

  useEffect(() => {
    let timer;
    if (modalFocus) {
      timer = setTimeout(() => setModalFocus(false), 5000);
    }
    return () => clearTimeout(timer);
  }, [modalFocus, setModalFocus]);

  return {
    currentMonth,
    currentDecadeStart,
    selectedDecade,
    handleMouseEnter,
    handleMouseLeave,
    openSelectDecade,
    openSelectMonth,
    handleDecadeSelect,
    goToNextDecade,
    goToPreviousDecade,
  };
};

export default useCalendarHandler;
