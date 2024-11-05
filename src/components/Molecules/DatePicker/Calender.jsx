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
  };

  const handleDecadeSelect = (decadeStart) => {
    setSelectedDecade(decadeStart);
    setShowYears(true);
  };

  closeOpenModal(() => (setOpenDecade(false), setShowYears(false)));

  useEffect(()=>{
    setSelectedDecade(currentDecadeStart);
  },[]);

  useEffect(() => {
    setCurrentMonth(date);
  }, [date]);

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
        <DecadeGrid>
          <DecadeButton
            disabled
          >
            {currentDecadeStart - 10} - {currentDecadeStart - 1}
        </DecadeButton>
          {Array.from({ length: 12 }, (_, index) => {
            const decadeStart = Math.floor(currentYear / 10) * 10 + index * 10;
            return (
              <DecadeButton
                selected={selectedDecade === decadeStart} 
                key={decadeStart}
                onClick={() => handleDecadeSelect(decadeStart)}
               >
                {decadeStart} - {decadeStart + 9}
              </DecadeButton>
            );
          })}
           <DecadeButton
              disabled
            >
            {currentDecadeStart + 120} - {currentDecadeStart + 129}
          </DecadeButton>
        </DecadeGrid>
      ) : (
        <DecadeGrid>
          <DecadeButton
            disabled
            >
            {selectedDecade - 1}
          </DecadeButton>
            {yearsInDecade.map((year, index) => (
              <DecadeButton key={year} 
                onClick={() => {
                  setCurrentMonth(new Date(year, 0, 1));
                  setOpenDecade(false);
                }}
              >
              {year}
            </DecadeButton>
          ))}
           <DecadeButton
            disabled
            >
            {selectedDecade + 10}
          </DecadeButton>
        </DecadeGrid>
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
};

export default Calendar;
