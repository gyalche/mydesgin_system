import { useState, useEffect, useCallback } from 'react';
import closeOpenModal from '../../../../hooks/closeOpenModal';

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
  showYears,
  openDecade,
}) => {
  const currentYear = new Date(Date.now()).getFullYear();
  const [currentMonth, setCurrentMonth] = useState(date);
  const [currentDecadeStart, setCurrentDecadestart] = useState(Math.floor(currentYear / 10) * 10);
  const [selectedDecade, setSelectedDecade] = useState(null);

  closeOpenModal(() => (setOpenDecade(false), setShowYears(false)));
  
  const handleMouseEnter = useCallback((day) => {
    if (isRangePicker && startDate && !endDate && (day instanceof Date)) {
      setHoveredDate(day);
    }
  }, [startDate, endDate, isRangePicker, setHoveredDate]);

  const handleMouseLeave = () => {
    setHoveredDate(null);
  };

  const openSelectDecade = () => {
    setOpenDecade(true);
    setShowYears(false);
    setOpenMonth(false);
    enableKeyboard();
  };

  const openSelectMonth = () => {
    setOpenMonth(true);
    setOpenDecade(false);
    enableKeyboard();
  };

  const handleDecadeSelect = (decadeStart) => {
    if (typeof decadeStart !== 'number' || decadeStart < 1000 || decadeStart > 9999) return;
    setSelectedDecade(decadeStart);
    setShowYears(true);
    setModalFocus(false);
    enableKeyboard();
  };

  const goToNextDecade = () => {
    setCurrentDecadestart((prev) => prev + 10);
    setSelectedDecade((currentDecade) => currentDecade + 10);
  };

  const goToPreviousDecade = () => {
    setCurrentDecadestart((prev) => prev - 10);
    setSelectedDecade((currentDecade) => currentDecade - 10);
  };

  useEffect(() => {
    if (currentMonth.getTime() !== date.getTime()) {
      setCurrentMonth(date);
    }
  }, [date]);

  useEffect(()=>{
    setSelectedDecade(currentDecadeStart);
  },[setSelectedDecade]);

  useEffect(() => {
    if (currentMonth.getTime() !== date.getTime()) {
      setCurrentMonth(date);
    }
  }, [date]);

  useEffect(() => {
    if(!openDecade && !showYears){
      enableKeyboard();
    }
  },[showYears, openDecade]);

  useEffect(() => {
    setDates(currentMonth);
  }, [setDates]);

  useEffect(() => {
    let timer;
    if(modalFocus){
      timer = setTimeout(() => {
        setModalFocus(false);
      }, 5000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [modalFocus]);

  useEffect(() => {
    setDates(currentMonth);
  }, [setDates, currentMonth]);

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
