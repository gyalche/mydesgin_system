import React, { useCallback, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import {
  CalendarContainer,
  DaysContainer,
  Day,
  WeekdayHeader,
  ButtonActive,
  DoubleViewContainer,
  DayContainerWrapper,
} from './styles';
import { getDaysInMonth, normalizeDate } from '../../../utils';
import closeOpenModal from '../../../hooks/closeOpenModal';
import CalendarNavigation from './Component/NavigationHeader';
import DecadeSelector from './Component/DecadeSelector';
import YearSelector from './Component/YearSelector';
import MonthSelector from './Component/MonthSelector';

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
  onlyFuture,
  setOpenCalender,
  setOpenCalenderEnd
}) => {
  const currentYear = new Date(Date.now()).getFullYear();
  const [openDecade, setOpenDecade] = useState(false);
  const [openMonth, setOpenMonth] = useState(false);
  const [showYears, setShowYears] = useState(false);
  const [selectedDecade, setSelectedDecade] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(date);
  const [currentDecadeStart, setCurrentDecadestart] = useState(Math.floor(currentYear / 10) * 10);

  const [tabCount, setTabCount] = useState(0);
  const [modalFocus, setModalFocus] = useState(false);

  const nextMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1);
  const days = getDaysInMonth(currentMonth);
  const nextMonthDays= getDaysInMonth(nextMonth);

  const displayYear = currentMonth.getFullYear();
  const maxCount =(openDecade || openMonth || showYears) && !isDoubleView? 4 : 
  (openDecade || openMonth || showYears) && isDoubleView ? 4 :
  (isDoubleView && isRangePicker) ? 9 : 7;

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
    setTabCount(0);
    setModalFocus(false);
    enableKeyboard();
  };

  closeOpenModal(() => (setOpenDecade(false), setShowYears(false)));

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
    const handleKeyDown = (e) => {
      if(e.shiftKey){
        disableKeyboard();
        setModalFocus(false);
        return;
      }
      if(e.key === 'Tab' && modalFocus || e.key !== 'Tab') {
        setModalFocus(false);
      }
      if ((openCalender || openCalenderEnd)) {
        if (e.key === 'Tab') {
          if(tabCount === maxCount) {
            setTabCount(0);
          };
          if( modalFocus ){
            if(openCalender){
              setOpenCalender(false);
            }
            if(isRangePicker && openCalender){
              setOpenCalender(false);
              setOpenCalenderEnd(true);
            }else {
              setOpenCalenderEnd(false);
            }
          }
          e.preventDefault();
          disableKeyboard();
          if (e.shiftKey) {
            setTabCount((prevTabCount) => (prevTabCount === 1 ? maxCount : prevTabCount - 1));
          } else {
            setTabCount((prevTabCount) => (prevTabCount === maxCount ? 1 : prevTabCount + 1));
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
    if((openCalender || openCalenderEnd)){
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [openCalender, openCalenderEnd, tabCount, isDoubleView, modalFocus, openMonth]);

  useEffect(() => {
    let timer;
    if(modalFocus){
      timer= setTimeout(() => {
        setModalFocus(false);
      }, 5000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [modalFocus]);
  return (
    <CalendarContainer data-testid='calender-container'
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
          goToNextDecade={ goToNextDecade}
          showYears={showYears}
          tabCount={tabCount}
        />
      
        <DoubleViewContainer focus={modalFocus && isDoubleView}>
        <>
          <ButtonActive data-calendar-btn onFocus={()=> {
            setModalFocus(true);
            enableKeyboard();
          }}/>
          {!openDecade && !openMonth && (
            <DayContainerWrapper>
              <DaysContainer
                focus={modalFocus && !isDoubleView ? modalFocus : undefined}
                secondCalendar={disableHeader}
                >
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
                    const dayDate = new Date(day?.date);
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
                        isDisabled={onlyFuture && normalizeDate(dayDate) < normalizeDate(new Date()) || notCurrent}
                        isSaturday={dayOfWeek === 6}
                        isSunday={dayOfWeek === 0}
                        onClick={!isRangePicker ? () => (handleSingleDate(dayDate), setModalFocus(false)) : 
                          () => (handleDateRangeClick(dayDate), enableKeyboard(), setModalFocus(false))}
                        isInHoverRange={isInHoverRange && isInHoverRange(dayDate)}
                        onMouseEnter={() => handleMouseEnter(dayDate)}
                        onMouseLeave={handleMouseLeave}
                        data-testid={`day-${dayDate.getDate()}`}
                        isRangePicker={isRangePicker}
                        istoday={normalizeDate(startDate) == normalizeDate(endDate)}
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
            <>
              {!openDecade && !openMonth && (
                <DayContainerWrapper>
                  <DaysContainer
                    focus={modalFocus && !isDoubleView ? modalFocus : undefined}
                    secondCalendar={disableHeader}
                    style={{width: '320px'}}
                    >
                    {weekdays.map(({day, dayIndex}, index) => (
                      <WeekdayHeader
                        key={index}
                        isSaturday={dayIndex === 6}
                        isSunday={dayIndex === 0}
                      >
                        {day}
                      </WeekdayHeader>
                    ))}

                      {nextMonthDays.map((day, index) => {
                        const dayDate = new Date(day?.date);
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
                            isDisabled={onlyFuture && normalizeDate(dayDate) < normalizeDate(new Date()) || notCurrent}
                            isSaturday={dayOfWeek === 5}
                            isSunday={dayOfWeek === 6}
                            onClick={!isRangePicker ? () => (handleSingleDate(dayDate)) : 
                              () => (handleDateRangeClick(dayDate), enableKeyboard())}
                            isInHoverRange={isInHoverRange && isInHoverRange(dayDate)}
                            onMouseEnter={() => handleMouseEnter(dayDate)}
                            onMouseLeave={handleMouseLeave}
                            data-testid={`day-${dayDate.getDate()}`}
                            isRangePicker={isRangePicker}
                            istoday={normalizeDate(startDate) == normalizeDate(endDate)}
                          >
                            {dayDate.getDate()}
                          </Day>
                        );
                      })}
                  </DaysContainer>
                </DayContainerWrapper>
              )}
            </>
          )}
        </DoubleViewContainer>
      {openDecade && (
        !showYears ? (
          <DecadeSelector
            currentDecadeStart={currentDecadeStart}
            selectedDecade={Math.floor(currentMonth?.getFullYear() / 10) * 10}
            handleDecadeSelect={handleDecadeSelect}
            goToNextDecade={goToNextDecade}
            goToPreviousDecade={goToPreviousDecade}
            enableFocus={modalFocus ? modalFocus : false}
            setModalFocus={setModalFocus}
            isDoubleView = {isDoubleView && isRangePicker}
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
            enableFocus={modalFocus ? modalFocus : false}
            tabCount={tabCount}
            setModalFocus={setModalFocus}
            isDoubleView = {isDoubleView && isRangePicker}
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
          enableFocus={modalFocus ? modalFocus : undefined}
          tabCount={tabCount}
          setModalFocus={setModalFocus}
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
  setHoveredDate: PropTypes.any,
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
  openCalender: PropTypes.func,
  openCalenderEnd: PropTypes.func,
  onlyFuture: PropTypes.bool,
  setEnableKeyboard: PropTypes.bool,
  setOpenCalender: PropTypes.bool,
  setOpenCalenderEnd: PropTypes.bool,
};

export default Calendar;
