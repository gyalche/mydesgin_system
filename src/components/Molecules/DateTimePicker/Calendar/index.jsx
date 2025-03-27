import React, { useState } from 'react';
import PropTypes from 'prop-types';

import {
  CalendarContainer,
  DaysContainer,
  Day,
  WeekdayHeader,
  ButtonActive,
  DoubleViewContainer,
  DayContainerWrapper,
} from '../styles';
import { getDaysInMonth, normalizeDate } from '../../../../utils';
import CalendarNavigation from './components/NavigationHeader';
import DecadeSelector from './components/DecadeSelector';
import YearSelector from './components/YearSelector';
import MonthSelector from './components/MonthSelector';
import useCalendarNavigation from './hooks/useCalendarKeyboardNavigation';
import useCalendarHandler from './hooks/useCalendarHandler';

function Calendar({
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
  openCalendar,
  openCalendarEnd,
  onlyFuture,
  setOpenCalendar,
  inputRefEnd,
  setOpenCalendarEnd,

}) {
  const [openDecade, setOpenDecade] = useState(false);
  const [openMonth, setOpenMonth] = useState(false);
  const [showYears, setShowYears] = useState(false);

  const [tabCount, setTabCount] = useState(0);
  const [modalFocus, setModalFocus] = useState(false);

  let maxCount;
  if ((openDecade || openMonth || showYears) && !isDoubleView) {
    maxCount = 4;
  } else if ((openDecade || openMonth || showYears) && isDoubleView) {
    maxCount = 4;
  } else if (isDoubleView && isRangePicker) {
    maxCount = 9;
  } else {
    maxCount = 7;
  }

  const {
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
  } = useCalendarHandler({
    startDate,
    endDate,
    setHoveredDate,
    date,
    setDates,
    isRangePicker,
    enableKeyboard,
    modalFocus,
    showYears,
    openDecade,
    setShowYears,
    setOpenDecade,
    setOpenMonth,
    setModalFocus,
  });

  useCalendarNavigation({
    openCalendar,
    openCalendarEnd,
    tabCount,
    maxCount,
    modalFocus,
    isRangePicker,
    setOpenCalendar,
    setOpenCalendarEnd,
    inputRefEnd,
    disableKeyboard,
    enableKeyboard,
    setTabCount,
    setModalFocus,
  });

  const displayYear = currentMonth.getFullYear();
  const yearsInDecade = Array.from({ length: 10 }, (_, index) => selectedDecade + index);
  const nextMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1);
  const days = getDaysInMonth(currentMonth);
  const nextMonthDays = getDaysInMonth(nextMonth);

  return (
    <CalendarContainer
      data-testid="calendar-container"
      isDoubleView={isDoubleView && isRangePicker}
    >
      <CalendarNavigation
        isDoubleView={isDoubleView}
        disableHeader={disableHeader}
        setTabCount={setTabCount}
        openSelectDecade={openSelectDecade}
        openSelectMonth={openSelectMonth}
        selectedDecade={selectedDecade}
        displayYear={displayYear}
        currentMonth={currentMonth}
        locale={locale}
        openDecade={openDecade}
        openMonth={openMonth}
        isRangePicker={isRangePicker}
        handlePrevYear={handlePrevYear}
        handleNextYear={handleNextYear}
        handlePrevMonth={handlePrevMonth}
        handleNextMonth={handleNextMonth}
        goToPreviousDecade={goToPreviousDecade}
        goToNextDecade={goToNextDecade}
        showYears={showYears}
        tabCount={tabCount}
        setModalFocus={setModalFocus}
      />

      <DoubleViewContainer focus={modalFocus && isDoubleView}>
        <>
          <ButtonActive
            data-calendar-btn={true}
            onFocus={() => {
              setModalFocus(true);
              enableKeyboard();
            }}
            type="button"
          />
          {!openDecade && !openMonth && (
            <DayContainerWrapper>
              <DaysContainer
                focus={modalFocus && !isDoubleView ? modalFocus : undefined}
                secondCalendar={disableHeader}
              >
                {weekdays.map(({ day, dayIndex }) => (
                  <WeekdayHeader
                    key={day}
                    isSaturday={dayIndex === 6}
                    isSunday={dayIndex === 0}
                  >
                    {day}
                  </WeekdayHeader>
                ))}

                {days.map(day => {
                  const dayDate = new Date(day?.date);
                  const isValidDate = dayDate instanceof Date && !Number.isNaN(dayDate);
                  if (!isValidDate) return null;
                  const notCurrent = !day?.isCurrentMonth;
                  const dayOfWeek = dayDate?.getDay();

                  return (
                    <Day
                      key={day?.date}
                      currentDate={normalizeDate(new Date()) === normalizeDate(dayDate)}
                      isSelected={normalizeDate(dayDate) === normalizeDate(startDate)
                          || normalizeDate(dayDate) === normalizeDate(endDate)}
                      isEndSelect={normalizeDate(dayDate) !== normalizeDate(startDate)}
                      isKeyboardSelect={normalizeDate(dayDate) === normalizeDate(isSelected)
                          && normalizeDate(dayDate) !== normalizeDate(startDate)}
                      isInRange={isInRange && isInRange(dayDate)}
                      isDisabled={(onlyFuture && normalizeDate(dayDate) < normalizeDate(new Date())) || notCurrent}
                      isSaturday={dayOfWeek === 6}
                      isSunday={dayOfWeek === 0}
                      type="button"
                      onClick={!isRangePicker ? e => {
                        e.preventDefault();
                        handleSingleDate(dayDate);
                        setModalFocus(false);
                      } : e => {
                        e.preventDefault();
                        handleDateRangeClick(dayDate);
                        enableKeyboard();
                        setModalFocus(false);
                      }}
                      isInHoverRange={isInHoverRange && isInHoverRange(dayDate)}
                      onMouseEnter={() => handleMouseEnter(dayDate)}
                      onMouseLeave={handleMouseLeave}
                      data-testid={`day-${dayDate.getDate()}`}
                      isRangePicker={isRangePicker}
                      istoday={normalizeDate(startDate) === normalizeDate(endDate)}
                    >
                      {dayDate.getDate()}
                    </Day>
                  );
                })}
              </DaysContainer>
            </DayContainerWrapper>
          )}
        </>
        {isDoubleView && isRangePicker && (
          <DayContainerWrapper>
            {!openDecade && !openMonth && (
              <DaysContainer
                focus={modalFocus && !isDoubleView ? modalFocus : undefined}
                secondCalendar={disableHeader}
                style={{ width: '320px' }}
              >
                {weekdays.map(({ day, dayIndex }) => (
                  <WeekdayHeader
                    key={day}
                    isSaturday={dayIndex === 6}
                    isSunday={dayIndex === 0}
                  >
                    {day}
                  </WeekdayHeader>
                ))}

                {nextMonthDays.map(day => {
                  const dayDate = new Date(day?.date);
                  const isValidDate = dayDate instanceof Date && !Number.isNaN(dayDate);
                  if (!isValidDate) return null;
                  const notCurrent = !day?.isCurrentMonth;
                  const dayOfWeek = dayDate?.getDay();
                  return (
                    <Day
                      key={day?.date}
                      currentDate={normalizeDate(new Date()) === normalizeDate(dayDate)}
                      isSelected={normalizeDate(dayDate) === normalizeDate(startDate)
                            || normalizeDate(dayDate) === normalizeDate(endDate)}
                      isEndSelect={normalizeDate(dayDate) !== normalizeDate(startDate)}
                      isKeyboardSelect={normalizeDate(dayDate) === normalizeDate(isSelected)
                            && normalizeDate(dayDate) !== normalizeDate(startDate)}
                      isInRange={isInRange && isInRange(dayDate)}
                      isDisabled={(onlyFuture && normalizeDate(dayDate) < normalizeDate(new Date())) || notCurrent}
                      isSaturday={dayOfWeek === 5}
                      isSunday={dayOfWeek === 6}
                      type="button"
                      onClick={!isRangePicker ? e => {
                        e.preventDefault();
                        handleSingleDate(dayDate);
                      } : e => {
                        e.preventDefault();
                        handleDateRangeClick(dayDate);
                        enableKeyboard();
                      }}
                      isInHoverRange={isInHoverRange && isInHoverRange(dayDate)}
                      onMouseEnter={() => handleMouseEnter(dayDate)}
                      onMouseLeave={handleMouseLeave}
                      data-testid={`day-${dayDate.getDate()}`}
                      isRangePicker={isRangePicker}
                      istoday={normalizeDate(startDate) === normalizeDate(endDate)}
                    >
                      {dayDate.getDate()}
                    </Day>
                  );
                })}
              </DaysContainer>
            )}
          </DayContainerWrapper>
        )}
      </DoubleViewContainer>
      {openDecade && (
        !showYears ? (
          <DecadeSelector
            currentDecadeStart={currentDecadeStart}
            selectedDecade={Math.floor((currentMonth?.getFullYear() ?? 0) / 10) * 10}
            handleDecadeSelect={handleDecadeSelect}
            goToNextDecade={goToNextDecade}
            goToPreviousDecade={goToPreviousDecade}
            enableFocus={modalFocus || false}
            setModalFocus={setModalFocus}
            isDoubleView={isDoubleView && isRangePicker}
            openDecade={openDecade}
            tabCount={tabCount}
            setTabCount={setTabCount}
          />
        ) : (
          <YearSelector
            selectedDecade={selectedDecade}
            yearsInDecade={yearsInDecade}
            currentMonth={currentMonth}
            setCurrentMonth={setDates}
            setOpenDecade={setOpenDecade}
            setShowYears={setShowYears}
            showYears={showYears}
            setTabCount={setTabCount}
            goToPreviousDecade={goToPreviousDecade}
            goToNextDecade={goToNextDecade}
            enableFocus={modalFocus || false}
            tabCount={tabCount}
            setModalFocus={setModalFocus}
            isDoubleView={isDoubleView && isRangePicker}
            enableKeyboard={enableKeyboard}
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
          enableFocus={modalFocus || undefined}
          tabCount={tabCount}
          setModalFocus={setModalFocus}
          isDoubleView={isDoubleView && isRangePicker}
        />
      )}
    </CalendarContainer>
  );
}

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
  setHoveredDate: PropTypes.func,
  isSelected: PropTypes.instanceOf(Date),
  enableKeyboard: PropTypes.func,
  disableKeyboard: PropTypes.func,
  handlePrevYear: PropTypes.func,
  handleNextYear: PropTypes.func,
  handlePrevMonth: PropTypes.func,
  handleNextMonth: PropTypes.func,
  setDates: PropTypes.func,
  isDoubleView: PropTypes.bool,
  disableHeader: PropTypes.bool,
  openCalendar: PropTypes.func,
  openCalendarEnd: PropTypes.func,
  onlyFuture: PropTypes.bool,
  setOpenCalendar: PropTypes.bool,
  setOpenCalendarEnd: PropTypes.bool,
  inputRefEnd: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
};

Calendar.defaultProps = {
  startDate: null,
  endDate: null,
  isRangePicker: false,
  isInRange: () => false,
  isInHoverRange: () => false,
  setHoveredDate: () => {},
  isSelected: null,
  enableKeyboard: () => {},
  disableKeyboard: () => {},
  handlePrevYear: () => {},
  handleNextYear: () => {},
  handlePrevMonth: () => {},
  handleNextMonth: () => {},
  setDates: () => {},
  isDoubleView: false,
  disableHeader: false,
  openCalendar: () => {},
  openCalendarEnd: () => {},
  onlyFuture: false,
  setOpenCalendar: () => {},
  setOpenCalendarEnd: () => {},
  inputRefEnd: null,
};

export default Calendar;
