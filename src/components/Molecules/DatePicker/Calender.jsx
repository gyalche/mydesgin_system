// Calendar.js
import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  CalendarContainer,
  CalenderMonths,
  DaysContainer,
  Day,
  WeekdayHeader,
} from './styles';
import { getDaysInMonth, getLocalizedMonthName, normalizeDate } from '../../../utils';

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
  const [displayYear, setDisplayYear] = useState(null);
  const days = getDaysInMonth(date);
  const currentYear = new Date(Date.now()).getFullYear();
  const displayNextYear = date.getFullYear() !== currentYear && 
    new Intl.DateTimeFormat(locale, { year: 'numeric' }).format(date);

  const handleMouseEnter = useCallback((day) => {
    if (isRangePicker && startDate && !endDate) {
      setHoveredDate(day);
    }
  }, [startDate, endDate, isRangePicker, setHoveredDate]);

  const handleMouseLeave = () => {
    setHoveredDate(null);
  };

  useEffect(() => {
    setDisplayYear(date.getFullYear() !== currentYear && 
    new Intl.DateTimeFormat(locale, { year: 'numeric' }).format(date));
  },[date]);

  return (
    <CalendarContainer data-testid='calender-container'>
      <CalenderMonths>
        {displayYear} {getLocalizedMonthName(date, locale)}
      </CalenderMonths>

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
