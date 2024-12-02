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
} from './styles';
import { getDaysInMonth, getLocalizedMonthName, normalizeDate } from '../../../utils';
import closeOpenModal from '../../../hooks/closeOpenModal';
import DecadeSelector from './DecadeSelector';
import YearSelector from './YearSelector';
import MonthSelector from './MonthSelector';

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
  };

  closeOpenModal(() => (setOpenDecade(false), setShowYears(false)));

  const goToNextDecade = () => {
    setSelectedDecade((currentDecade) => {
      const nextDecade = currentDecade + 10;
      return nextDecade;
    });
  };

  const goToPreviousDecade = () => {
    setSelectedDecade((currentDecade) => {
      const previousDecade = currentDecade - 10;
      return previousDecade;
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

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (openCalender || openCalenderEnd) {
        if (e.key === 'Tab') {
          e.preventDefault();
          disableKeyboard();
          setTabCount((tab) => tab + 1);
          const selector = isDoubleView
          ? '[data-calendar-btn-double]'
          : '[data-calendar-btn]';
        
        const buttons = document.querySelectorAll(selector);
        const focusedIndex = Array.from(buttons).findIndex(
          (button) => button === document.activeElement
        );

        const nextIndex = e.shiftKey
          ? (focusedIndex - 1 + buttons.length) % buttons.length
          : (focusedIndex + 1) % buttons.length;
        
        buttons[nextIndex]?.focus();
        }
      }
    };
    if(openCalender || openCalenderEnd ){
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

  return (
    <CalendarContainer data-testid='calender-container'>
      <CalenderMonths>
          <TextAreaYearMonth onClick={!showYears && openSelectDecade} openDecade={openDecade} >
          {selectedDecade && openDecade ? `${selectedDecade} - ${selectedDecade + 9}` : displayYear}
          </TextAreaYearMonth>
          {(!openDecade && !openMonth) && <TextAreaYearMonth onClick={openSelectMonth}>
            {getLocalizedMonthName(currentMonth, locale)}
            </TextAreaYearMonth>
          }
      </CalenderMonths>

    {isDoubleView ? (
      <>
        {disableHeader ? (<></>) : (
          <CalendarHeader>
            <HeaderIcons>
              <CalendarIconBtn data-calendar-btn-double onClick={()=> handlePrevYear()}>
                <CalendarIcon name='Interface-chevron-double-left'/>
              </CalendarIconBtn>
              {(!openDecade && !openMonth) && ( 
                <CalendarIconBtn data-calendar-btn-double onClick={() => handlePrevMonth()}>
                  <CalendarIcon name='Interface-chevron-left' />
                </CalendarIconBtn>
              )}
            </HeaderIcons>

            <HeaderIcons m={openDecade || openMonth ? '585px': isRangePicker && isDoubleView && '520px'}>
              {(!openDecade && !openMonth) && (
                <CalendarIconBtn data-calendar-btn-double onClick={() => handleNextMonth()}>
                  <CalendarIcon name='Interface-chevron-right' />
                </CalendarIconBtn>
              )}
              <CalendarIconBtn data-calendar-btn-double onClick={() =>  handleNextYear()}>
                <CalendarIcon name='Interface-chevron-double-right'/>
              </CalendarIconBtn>
            </HeaderIcons>
          </CalendarHeader>
        )}
      </>
      ): (
        <>
          <CalendarHeader>
            <HeaderIcons>
              <CalendarIconBtn data-calendar-btn onClick={(e)=> {
                e.preventDefault();
                e.stopPropagation();
                !openDecade ? handlePrevYear() : goToPreviousDecade();
              }}>
                  <CalendarIcon name='Interface-chevron-double-left' />
              </CalendarIconBtn>
                {(!openDecade && !openMonth) && ( 
                  <CalendarIconBtn data-calendar-btn onClick={() => handlePrevMonth()}>
                    <CalendarIcon name='Interface-chevron-left' />
                  </CalendarIconBtn>
                )}
            </HeaderIcons>

            <HeaderIcons>
              {(!openDecade && !openMonth) && (
                <CalendarIconBtn data-calendar-btn onClick={() => handleNextMonth()}>
                  <CalendarIcon name='Interface-chevron-right' />
                </CalendarIconBtn>
              )}
              <CalendarIconBtn data-calendar-btn onClick={() => !openDecade ? handleNextYear() : goToNextDecade()}>
                <CalendarIcon name='Interface-chevron-double-right' />
              </CalendarIconBtn>
            </HeaderIcons>
          </CalendarHeader>
        </>
      )}
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
                    isInRange={isInRange(dayDate)}
                    isDisabled={normalizeDate(dayDate) < normalizeDate(new Date()) || notCurrent}
                    isSaturday={dayOfWeek === 5}
                    isSunday={dayOfWeek === 6}
                    onClick={!isRangePicker ? () => (handleSingleDate(dayDate), enableKeyboard()) : 
                      () => (handleDateRangeClick(dayDate), enableKeyboard())}
                    isInHoverRange={isInHoverRange(dayDate)}
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
            setYearSelected={setYearSelected}
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
  isInRange: PropTypes.func.isRequired,
  isInHoverRange: PropTypes.func.isRequired,
  hoveredDate: PropTypes.instanceOf(Date),
  setHoveredDate: PropTypes.func.isRequired,
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
};

export default Calendar;
