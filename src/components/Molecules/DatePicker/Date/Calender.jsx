import React, { useCallback, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import {
  CalendarContainer,
  CalenderMonths,
  DaysContainer,
  Day,
  WeekdayHeader,
  TextAreaYearMonth,
  CalendarHeader,
  HeaderIcons,
  CalendarIcon,
  CalendarIconBtn,
} from '../styles';
import { getDaysInMonth, getLocalizedMonthName, normalizeDate } from '../../../../utils';
import closeOpenModal from '../../../../hooks/closeOpenModal';
import CalendarNavigation from '../Component/Header';
import DecadeSelector from '../Component/DecadeSelector';
import YearSelector from '../Component/YearSelector';
import MonthSelector from '../Component/MonthSelector';

const Calendar = ({
  date,
  locale,
  startDate,
  endDate,
  weekdays,
  handleSingleDate,
  handleDateRangeClick,
  isRangePicker,
  isInRange,
  isInHoverRange,
  setHoveredDate,
  isSelected,
  enableKeyboard,
  disableKeyboard,
  handlePrevYear,
  handleNextYear,
  handlePrevMonth,
  handleNextMonth,
  setDates,
  isDoubleView,
  disableHeader,
  openCalender,
  openCalenderEnd,
}) => {
  const [openDecade, setOpenDecade] = useState(false);
  const [openMonth, setOpenMonth] = useState(false);
  const [showYears, setShowYears] = useState(false);
  const [selectedDecade, setSelectedDecade] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(date);
  const [yearSelected, setYearSelected] = useState(false);
  const [tabCount, setTabCount] = useState(0);
  
  const doublePrevYearRef=useRef(null);
  const doublePrevMonthRef=useRef(null);
  const doubleNextYearRef=useRef(null);
  const doubleNextMonthRef=useRef(null);
  const currentMonthButtonRef = useRef(null);

  const doubleViewRefs = {
    1: doublePrevYearRef,
    2: doublePrevMonthRef,
    3: doubleNextMonthRef,
    4: doubleNextYearRef,
  };

  const days = getDaysInMonth(currentMonth);
  const currentYear = new Date(Date.now()).getFullYear();
  const currentDecadeStart = Math.floor(currentYear / 10) * 10;

  // const displayYear = new Date(currentMonth).getFullYear() !== currentYear && currentMonth.getFullYear();
  const displayYear = currentMonth.getFullYear();

  const yearsInDecade = Array.from({ length: 10 }, (_, index) => selectedDecade + index);

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
    disableKeyboard();
    setTabCount(0);
  };

  closeOpenModal(() => (setOpenDecade(false), setShowYears(false)));

  const goToNextDecadeInYears = () => {
    setSelectedDecade((currentDecade) => {
      const nextDecade = currentDecade + 10;
      return nextDecade;
    });
  };

  const goToPreviousDecadeInYears = () => {
    enableKeyboard();
    setSelectedDecade((currentDecade) => {
      const previousDecade = currentDecade - 10;
      return previousDecade;
    });
  };
  const goToPreviousDecade = () => {
    setSelectedDecade((currentDecade) => {
      const previousDecade = currentDecade - 10;
      if (previousDecade >= currentDecadeStart) {
        return previousDecade;
      }
      return currentDecade;
    });
  };
  
  const goToNextDecade = () => {
    setSelectedDecade((currentDecade) => {
      const nextDecade = currentDecade + 10;
      if (nextDecade <= currentDecadeStart + 90) {
        return nextDecade;
      }
      return currentDecade;
    });
  };
  
  
  useEffect(()=>{
    setSelectedDecade(currentDecadeStart);
  },[]);

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

  const maxCount = openDecade || openMonth  ? 3 : 4;

  useEffect(() => {
    const handleKeyDown = (e) => {
      if(e.shiftKey){
        disableKeyboard();
        setTabCount(0);
      }
      if(e.key === 'Tab' && tabCount >= maxCount) return enableKeyboard();
      if ((openCalender || openCalenderEnd)) {
        if (e.key === 'Tab') {
          e.preventDefault();
          disableKeyboard();
          if (e.shiftKey) {
            setTabCount((prevTabCount) => Math.max(0, prevTabCount - 1));
          } else {
            setTabCount((prevTabCount) => Math.max(prevTabCount + 1));
          }
          const selector = '[data-calendar-btn]';
          const buttons = document.querySelectorAll(selector);
          const focusedIndex = Array.from(buttons).findIndex(
            (button) => button === document.activeElement
          );

          const nextIndex = e.shiftKey
            ? ((focusedIndex - 1 + buttons.length) % buttons.length, setTabCount(0))
            : (focusedIndex + 1) % buttons.length;
          
          buttons[nextIndex]?.focus();
        }
      }
    };
    if(((openCalender || openCalenderEnd) && !openMonth) ){
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [openCalender, openCalenderEnd, tabCount, isDoubleView]);

  useEffect(() => {
    if(yearSelected) disableKeyboard();
    // enableKeyboard();
  }, [yearSelected]);
  
  useEffect(() => {
    if (isDoubleView) {
      doubleViewRefs[tabCount]?.current?.focus();
    }
  }, [tabCount, isDoubleView]);

  return (
    <CalendarContainer data-testid='calender-container'>
      <CalenderMonths>
          <TextAreaYearMonth onClick={()=>!showYears && (openSelectDecade(), setTabCount(0))} openDecade={openDecade} >
          {selectedDecade && openDecade ? `${selectedDecade} - ${selectedDecade + 9}` : displayYear}
          </TextAreaYearMonth>
          {(!openDecade && !openMonth) && <TextAreaYearMonth onClick={() => (openSelectMonth(), setTabCount(0))}>
            {getLocalizedMonthName(currentMonth, locale)}
            </TextAreaYearMonth>
          }
      </CalenderMonths>

      <CalendarNavigation
         isDoubleView={isDoubleView}
         disableHeader={disableHeader}
         openDecade={openDecade}
         openMonth={openMonth}
         isRangePicker={isRangePicker}
         handlePrevYear={handlePrevYear}
         handleNextYear={handleNextYear}
         handlePrevMonth={handlePrevMonth}
         handleNextMonth={handleNextMonth}
         goToPreviousDecade={showYears ? goToPreviousDecadeInYears : goToPreviousDecade}
         goToNextDecade={showYears ? goToNextDecadeInYears : goToNextDecade}
         doublePrevYearRef={doublePrevYearRef}
         doubleNextYearRef={doubleNextYearRef}
         doublePrevMonthRef={doublePrevMonthRef}
         doubleNextMonthRef={doubleNextMonthRef}
         showYears={showYears}
      />

      {!openDecade && !openMonth && (
          <DaysContainer secondCalendar={disableHeader}>
            {weekdays.map(({day, dayIndex}, index) => (
              <WeekdayHeader
                key={index}
                isSaturday={dayIndex === 6}
                isSunday={dayIndex === 0}
              >
                {day}
              </WeekdayHeader>
            ))}
              {days.map((day, index) => {
                const dayDate = day?.date;
                const isValidDate = dayDate instanceof Date && !isNaN(dayDate);
                if (!isValidDate) return null;
                const notCurrent = !day?.isCurrentMonth;
                const dayOfWeek = dayDate?.getDay();
                return (
                  <Day
                    key={`${day?.date}-${index}`}
                    currentDate={normalizeDate(new Date()) === normalizeDate(dayDate)}
                    isSelected={normalizeDate(dayDate) === normalizeDate(startDate) 
                      || normalizeDate(dayDate) === normalizeDate(endDate)
                    }
                    isEndSelect={normalizeDate(dayDate) !== normalizeDate(startDate)}
                    isKeyboardSelect={normalizeDate(dayDate) === normalizeDate(isSelected) 
                      && normalizeDate(dayDate) !== normalizeDate(startDate)}
                    isInRange={isInRange && isInRange(dayDate)}
                    isDisabled={normalizeDate(dayDate) < normalizeDate(new Date()) || notCurrent}
                    isSaturday={dayOfWeek === 5}
                    isSunday={dayOfWeek === 6}
                    onClick={!isRangePicker ? () => (handleSingleDate(dayDate)) : 
                      () => (handleDateRangeClick(dayDate), enableKeyboard())}
                    isInHoverRange={isInHoverRange && isInHoverRange(dayDate)}
                    onMouseEnter={() => handleMouseEnter(dayDate)}
                    onMouseLeave={handleMouseLeave}
                    data-testid={`day-${dayDate.getDate()}`}
                    isRangePicker={isRangePicker}
                    isToday={normalizeDate(startDate) == normalizeDate(endDate)}
                  >
                    {dayDate.getDate()}
                  </Day>
                );
              })}
          </DaysContainer>
      )}

      {openDecade && (
        !showYears ? (
          <DecadeSelector
            currentDecadeStart={currentDecadeStart}
            selectedDecade={selectedDecade}
            handleDecadeSelect={handleDecadeSelect}
            setTabCount={setTabCount}
            enableKey={tabCount === maxCount}
            enabledKeyboardFunc={enableKeyboard}
            goToNextDecade={goToNextDecade}
            goToPreviousDecade={goToPreviousDecade}
          />
        ) : (
          <YearSelector
            selectedDecade={selectedDecade}
            yearsInDecade={yearsInDecade}
            currentMonth={currentMonth}
            setCurrentMonth={setDates}
            setOpenDecade={setOpenDecade}
            setShowYears={setShowYears}
            disableKeyboard={disableKeyboard}
            showYears={showYears}
            setTabCount={setTabCount}
            setYearSelected={setYearSelected}
            enableKey={tabCount === maxCount}
            goToPreviousDecade={goToPreviousDecade}
            goToNextDecade={goToNextDecade}
            tabCount = {tabCount}
            
          />
        )
      )}
      {openMonth && (
        <MonthSelector
          locale={locale}
          setCurrentMonth={setDates}
          setOpenMonth={setOpenMonth}
          date={date}
          currentMonth={currentMonth.getMonth()}
          openMonth={openMonth}
        />
      )
    }
    </CalendarContainer>
  );
};

Calendar.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
  locale: PropTypes.string.isRequired,
  startDate: PropTypes.instanceOf(Date),
  endDate: PropTypes.instanceOf(Date),
  weekdays: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleSingleDate: PropTypes.func.isRequired,
  handleDateRangeClick: PropTypes.func.isRequired,
  isRangePicker: PropTypes.bool,
  isInRange: PropTypes.func,
  isInHoverRange: PropTypes.func,
  hoveredDate: PropTypes.instanceOf(Date),
  setHoveredDate: PropTypes.instanceOf(Date),
  isSelected: PropTypes.instanceOf(Date),
  enableKeyboard: PropTypes.func,
  disableKeyboard: PropTypes.func,
  handlePrevYear: PropTypes.func,
  handleNextYear: PropTypes.func,
  handlePrevMonth: PropTypes.func,
  handleNextMonth: PropTypes.func,
  setDates: PropTypes.any,
  isDoubleView: PropTypes.bool,
  disableHeader: PropTypes.bool,
  enabledKeyboardFunc: PropTypes.func,
  openCalender: PropTypes.func,
  openCalenderEnd: PropTypes.func,
  setOpenCalender: PropTypes.bool,
};

export default Calendar;
