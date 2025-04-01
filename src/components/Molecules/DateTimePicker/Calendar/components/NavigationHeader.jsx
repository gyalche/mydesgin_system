import React from 'react';
import PropTypes from 'prop-types';

import { CalendarHeader, HeaderIcons, CalendarMonths } from '../../styles';
import NavigationButton from './NavigationButton';
import MonthYearDisplay from './MonthYearDisplay';
import { ENTER } from '../../../../../constant/keyCodes';

function CalendarNavigation({
  isDoubleView,
  openDecade,
  openMonth,
  isRangePicker,
  handlePrevYear,
  handleNextYear,
  handlePrevMonth,
  handleNextMonth,
  goToPreviousDecade,
  goToNextDecade,
  selectedDecade,
  setTabCount,
  openSelectDecade,
  displayYear,
  currentMonth,
  locale,
  openSelectMonth,
  showYears,
  setModalFocus,
}) {
  const stopPropagatingOnEnter = e => {
    if (e.key === ENTER) e.stopPropagation();
  };

  const handleYearClick = () => {
    if (!showYears) {
      openSelectDecade();
      setTabCount(0);
      setModalFocus(false);
    }
  };

  const handleMonthClick = () => {
    openSelectMonth();
    setTabCount(0);
    setModalFocus(false);
  };

  const nextMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1);

  return (
    <CalendarHeader>
      <HeaderIcons>
        <NavigationButton
          icon="Interface-chevron-double-left"
          onClick={e => {
            e.preventDefault();
            e.stopPropagation();
            if (!openDecade) handlePrevYear();
            goToPreviousDecade();
          }}
          onKeyDown={stopPropagatingOnEnter}
        />
        <NavigationButton
          icon="Interface-chevron-left"
          onClick={handlePrevMonth}
          onKeyDown={stopPropagatingOnEnter}
          showButton={!openDecade && !openMonth}
        />
      </HeaderIcons>

      <CalendarMonths>
        <MonthYearDisplay
          isDoubleView={isDoubleView}
          openDecade={openDecade}
          openMonth={openMonth}
          selectedDecade={selectedDecade}
          displayYear={displayYear}
          currentMonth={currentMonth}
          locale={locale}
          onYearClick={handleYearClick}
          onMonthClick={handleMonthClick}
          onKeyDown={stopPropagatingOnEnter}
          showYears={showYears}
        />
      </CalendarMonths>

      {isDoubleView && isRangePicker && (
        <CalendarMonths>
          {!openDecade && !openMonth && (
            <MonthYearDisplay
              isDoubleView={isDoubleView}
              openDecade={openDecade}
              openMonth={openMonth}
              selectedDecade={selectedDecade}
              displayYear={nextMonth.getFullYear()}
              currentMonth={nextMonth}
              locale={locale}
              onYearClick={handleYearClick}
              onMonthClick={handleMonthClick}
              onKeyDown={stopPropagatingOnEnter}
              showYears={showYears}
            />
          )}
        </CalendarMonths>
      )}

      <HeaderIcons>
        <NavigationButton
          icon="Interface-chevron-right"
          onClick={handleNextMonth}
          onKeyDown={stopPropagatingOnEnter}
          showButton={!openDecade && !openMonth}
        />
        <NavigationButton
          icon="Interface-chevron-double-right"
          onClick={() => (!openDecade ? handleNextYear() : goToNextDecade())}
          onKeyDown={stopPropagatingOnEnter}
        />
      </HeaderIcons>
    </CalendarHeader>
  );
}

CalendarNavigation.defaultProps = {
  isDoubleView: false,
  openDecade: false,
  openMonth: false,
  isRangePicker: false,
  handlePrevMonth: () => {},
  handleNextMonth: () => {},
  goToPreviousDecade: () => {},
  goToNextDecade: () => {},
  selectedDecade: null,
  setTabCount: () => {},
  openSelectDecade: () => {},
  displayYear: null,
  currentMonth: new Date(),
  locale: 'ja-JP',
  openSelectMonth: () => {},
  showYears: false,
  setModalFocus: () => {},
};

CalendarNavigation.propTypes = {
  isDoubleView: PropTypes.bool,
  openDecade: PropTypes.bool,
  openMonth: PropTypes.bool,
  isRangePicker: PropTypes.bool,
  handlePrevYear: PropTypes.func.isRequired,
  handleNextYear: PropTypes.func.isRequired,
  handlePrevMonth: PropTypes.func,
  handleNextMonth: PropTypes.func,
  goToPreviousDecade: PropTypes.func,
  goToNextDecade: PropTypes.func,
  selectedDecade: PropTypes.number,
  setTabCount: PropTypes.func,
  openSelectDecade: PropTypes.func,
  displayYear: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  currentMonth: PropTypes.instanceOf(Date),
  locale: PropTypes.string,
  openSelectMonth: PropTypes.func,
  showYears: PropTypes.bool,
  setModalFocus: PropTypes.func,
};

export default CalendarNavigation;
