// Calendar.js
import React, { useCallback, useEffect, useState } from 'react';
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
}) => {
  const [openDecade, setOpenDecade] = useState(false);
  const [openMonth, setOpenMonth] = useState(false);
  const [showYears, setShowYears] = useState(false);
  const [selectedDecade, setSelectedDecade] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(date);

  const days = getDaysInMonth(currentMonth);
  const currentYear = new Date(Date.now()).getFullYear();
  const currentDecadeStart = Math.floor(currentYear / 10) * 10;

  // const displayYear = new Date(currentMonth).getFullYear() !== currentYear && currentMonth.getFullYear();
  const displayYear = currentMonth.getFullYear();

  const yearsInDecade = Array.from({ length: 10 }, (_, index) => selectedDecade + index);

  const handleMouseEnter = useCallback((day) => {
    if (isRangePicker && startDate && !endDate) {
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
    setSelectedDecade(decadeStart);
    setShowYears(true);
    disableKeyboard();
  };

  closeOpenModal(() => (setOpenDecade(false), setShowYears(false)));

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

  return (
    <CalendarContainer data-testid='calender-container'>
      <CalenderMonths>
          <TextAreaYearMonth onClick={openSelectDecade}>
          {selectedDecade && openDecade ? `${selectedDecade} - ${selectedDecade + 9}` : displayYear}
          </TextAreaYearMonth>
          {(!openDecade && !openMonth) && <TextAreaYearMonth onClick={openSelectMonth}>
            {getLocalizedMonthName(currentMonth, locale)}
            </TextAreaYearMonth>}
      </CalenderMonths>

      <CalendarHeader>
        <HeaderIcons>
          <CalendarIcon name='Interface-chevron-double-left' onClick={()=> handlePrevYear()}/>
            {(!openDecade && !openMonth) && ( 
              <CalendarIcon name='Interface-chevron-left' onClick={() => handlePrevMonth()}/>
            )}
        </HeaderIcons>

        <HeaderIcons>
          {(!openDecade && !openMonth) && (
            <CalendarIcon name='Interface-chevron-right' onClick={() => handleNextMonth()}/>
          )}
          <CalendarIcon name='Interface-chevron-double-right' onClick={() => handleNextYear()}/>
        </HeaderIcons>
      </CalendarHeader>
     {!openDecade && !openMonth && (
        <DaysContainer>
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
            const notCurrent = !day?.isCurrentMonth;
            const dayOfWeek = dayDate?.getDay();
            return (
              <Day
                key={`${day?.date}-${index}`}
                currentDate={normalizeDate(new Date()) === normalizeDate(dayDate)}
                isSelected={normalizeDate(dayDate) === normalizeDate(startDate) 
                  || normalizeDate(dayDate) === normalizeDate(endDate)
                }
                isKeyboardSelect={normalizeDate(dayDate) === normalizeDate(isSelected) 
                  && normalizeDate(dayDate) !== normalizeDate(startDate)}
                isInRange={isInRange(dayDate)}
                isDisabled={normalizeDate(dayDate) < normalizeDate(new Date()) || notCurrent}
                isSaturday={dayOfWeek === 5}
                isSunday={dayOfWeek === 6}
                onClick={!isRangePicker ? () => handleSingleDate(dayDate) : () => handleDateRangeClick(dayDate)}
                isInHoverRange={isInHoverRange(dayDate)}
                onMouseEnter={() => handleMouseEnter(dayDate)}
                onMouseLeave={handleMouseLeave}
                data-testid={`day-${dayDate.getDate()}`}
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
          setCurrentMonth={setDates}
          setOpenDecade={setOpenDecade}
          setShowYears={setShowYears}
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
    )}
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
};

export default Calendar;
