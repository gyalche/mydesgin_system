import { useCallback, useEffect, useState } from 'react';

const useCalendarNavigator = ({
  openCalendar,
  openCalendarEnd,
  tabCount,
  setTabCount,
  maxCount,
  modalFocus,
  setModalFocus,
  isRangePicker,
  setOpenCalendar,
  setOpenCalendarEnd,
  inputRefEnd,
  disableKeyboard,
  startDate,
  endDate,
  setHoveredDate,
  date,
  showYears,
  openDecade,
  setDates,
  enableKeyboard,
  setOpenDecade,
  setShowYears,
  setOpenMonth,
}) => {
  const currentYear = new Date(Date.now()).getFullYear();
  const [currentMonth, setCurrentMonth] = useState(date);
  const [currentDecadeStart, setCurrentDecadestart] = useState(Math.floor(currentYear / 10) * 10);
  const [selectedDecade, setSelectedDecade] = useState(null);
  
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
    disableKeyboard();
  };

  const openSelectMonth = () => {
    setOpenMonth(true);
    setOpenDecade(false);
    disableKeyboard();
  };

  const handleDecadeSelect = (decadeStart) => {
    if(typeof decadeStart !== 'number' || decadeStart < 1000 || decadeStart > 9999) return;
    setSelectedDecade(decadeStart);
    setShowYears(true);
    setTabCount(0);
    setModalFocus(false);
    enableKeyboard();
  };

  const goToNextDecade = () => {
    setCurrentDecadestart((prev) => prev + 10);
    setSelectedDecade((currentDecade) => {
      const nextDecade = currentDecade + 10;
      return nextDecade;
    });
  };

  const goToPreviousDecade = () => {
    enableKeyboard();
    setCurrentDecadestart((prev) => prev - 10);
    setSelectedDecade((currentDecade) => {
      const previousDecade = currentDecade - 10;
      return previousDecade;
    });
  };

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
    const handleKeyDown = (e) => {
      if ((e.key === 'Tab' && modalFocus) || e.key !== 'Tab') {
        setModalFocus(false);
      }
      if (openCalendar || openCalendarEnd) {
        if (e.key === 'Tab') {
          e.preventDefault();
          if (e.shiftKey) {
            const buttons = document.querySelectorAll('[data-calendar-btn]');
            const focusedIndex = Array.from(buttons).findIndex(
              (button) => button === document.activeElement
            );
            if (focusedIndex === 0) {
              setOpenCalendar(false);
              setOpenCalendarEnd(false);
              disableKeyboard();
              setModalFocus(false);
              setTabCount(0);
              return;
            }
            setTabCount((prevTabCount) =>
              prevTabCount === 1 ? maxCount : prevTabCount - 1
            );

            const prevIndex = (focusedIndex - 1 + buttons.length) % buttons.length;
            buttons[prevIndex]?.focus();
            return;
          }

          if (tabCount === maxCount) {
            setTabCount(0);
          }
          if (modalFocus) {
            if (openCalendar || openCalendarEnd) {
              setOpenCalendar(false);
              setOpenCalendarEnd(false);
            }

            if (isRangePicker && openCalendar) {
              setOpenCalendar(false);
              inputRefEnd?.current?.focus();
              inputRefEnd?.current?.click();
            }
          }

          disableKeyboard();
          setTabCount((prevTabCount) =>
            prevTabCount === maxCount ? 1 : prevTabCount + 1
          );
          const buttons = document.querySelectorAll('[data-calendar-btn]');
          const focusedIndex = Array.from(buttons).findIndex(
            (button) => button === document.activeElement
          );
          
          const nextIndex = focusedIndex === -1 ? 0 : (focusedIndex + 1) % buttons.length;
          buttons[nextIndex]?.focus();
        }
      }
    };

    if (openCalendar || openCalendarEnd) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [
    openCalendar,
    openCalendarEnd,
    tabCount,
    maxCount,
    modalFocus,
    isRangePicker,
    setTabCount,
    setModalFocus,
    setOpenCalendar,
    setOpenCalendarEnd,
    inputRefEnd,
    disableKeyboard,
  ]);

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

export default useCalendarNavigator;
