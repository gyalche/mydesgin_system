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
  DecadeGrid,
  DecadeButton,
} from './styles';
import { getDaysInMonth, getLocalizedMonthName, normalizeDate } from '../../../utils';
import closeOpenModal from '../../../hooks/closeOpenModal';
import DecadeSelector from './DecadeSelector';
import YearSelector from './YearSelector';

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
  disableKeyboard
}) => {
  const [openDecade, setOpenDecade] = useState(false);
  const [showYears, setShowYears] = useState(false);
  const [selectedDecade, setSelectedDecade] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(date);

  const days = getDaysInMonth(currentMonth);
  const currentYear = new Date(Date.now()).getFullYear();
  const currentDecadeStart = Math.floor(currentYear / 10) * 10;

  const displayYear = new Date(currentMonth).getFullYear() !== currentYear && currentMonth.getFullYear();
  
  const yearsInDecade = Array.from({ length: 10 }, (_, index) => selectedDecade + index);

  const handleMouseEnter = useCallback((day) => {
    if (isRangePicker && startDate && !endDate) {
      setHoveredDate(day);
    }
  }, [startDate, endDate, isRangePicker, setHoveredDate]);

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
  const handleMouseLeave = () => {
    setHoveredDate(null);
  };

  const openSelectDecade = (e) => {
    setOpenDecade(true);
    setShowYears(false);
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
    setCurrentMonth(date);
  }, [date]);

  useEffect(() => {
    if(!openDecade && !showYears){
      enableKeyboard();
    }
  },[showYears, openDecade]);
  return (
    <CalendarContainer data-testid='calender-container'>
      <CalenderMonths>
          <TextAreaYearMonth onClick={openSelectDecade}>
          {selectedDecade && openDecade ? `${selectedDecade} - ${selectedDecade + 9}` : displayYear}
          </TextAreaYearMonth> 
          {!openDecade && <TextAreaYearMonth>{getLocalizedMonthName(currentMonth, locale)}</TextAreaYearMonth>}
      </CalenderMonths>

      <CalendarHeader>
        <HeaderIcons>
          <CalendarIcon name='Interface-chevron-double-left' onClick={()=>{
            if(openDecade && showYears){
              setShowYears(false);
            }
            if(openDecade && !showYears){
              setOpenDecade(false);
            }
            if(!openDecade && !showYears){
              handlePrevYear();
            }
            handlePrevYear();
          }}/>
            {!openDecade && ( 
              <CalendarIcon name='Interface-chevron-left' onClick={() => handlePrevMonth()}/>
            )}
        </HeaderIcons>

        <HeaderIcons>
          {!openDecade && (
            <CalendarIcon name='Interface-chevron-right' onClick={() => handleNextMonth()}/>
          )}
          <CalendarIcon name='Interface-chevron-double-right' onClick={() => handleNextYear()}/>
        </HeaderIcons>
      </CalendarHeader>
     {!openDecade && (
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
          setCurrentMonth={setCurrentMonth}
          setOpenDecade={setOpenDecade}
          setShowYears={setShowYears}
        />
      )
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
};

export default Calendar;
