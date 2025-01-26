import React from 'react';
import PropTypes from 'prop-types';

import {
  CalendarHeader, CalendarIconBtn, CalendarIcon, HeaderIcons, CalendarMonths, TextAreaYearMonth,
} from '../../styles';
import { getLocalizedMonthName } from '../../../../../utils';

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
  const nextMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1);

  return (
    <CalendarHeader>
      <HeaderIcons>
        <CalendarIconBtn
          data-calendar-btn={true}
          tabIndex={0}
          onClick={e => {
            e.preventDefault();
            e.stopPropagation();
            if (!openDecade) handlePrevYear();
            goToPreviousDecade();
          }}
        >
          <CalendarIcon name="Interface-chevron-double-left" />
        </CalendarIconBtn>
        {!openDecade && !openMonth && (
          <CalendarIconBtn data-calendar-btn={true} onClick={handlePrevMonth}>
            <CalendarIcon name="Interface-chevron-left" />
          </CalendarIconBtn>
        )}
      </HeaderIcons>

      <CalendarMonths>
        <TextAreaYearMonth
          data-calendar-btn={true}
          onClick={() => !showYears && (openSelectDecade(), setTabCount(0), setModalFocus(false))}
          openDecade={openDecade}
          isDoubleView={isDoubleView && (openMonth || openDecade)}
        >
          {selectedDecade && openDecade ? `${selectedDecade} - ${selectedDecade + 9}` : displayYear}
        </TextAreaYearMonth>
        {(!openDecade && !openMonth)
              && (
                <TextAreaYearMonth
                  data-calendar-btn={true}
                  onClick={() => {
                    openSelectMonth();
                    setTabCount(0);
                    setModalFocus(false);
                  }}
                >
                  {getLocalizedMonthName(currentMonth, locale)}
                </TextAreaYearMonth>
              )}
      </CalendarMonths>

      {isDoubleView && isRangePicker && (
        <CalendarMonths>
          {!openDecade && !openMonth && (
            <>
              <TextAreaYearMonth
                data-calendar-btn={true}
                onClick={() => !showYears && (openSelectDecade(), setTabCount(0))}
                openDecade={openDecade}
              >
                {selectedDecade && openDecade ? `${selectedDecade} - ${selectedDecade + 9}` : nextMonth.getFullYear()}
              </TextAreaYearMonth>
              <TextAreaYearMonth
                data-calendar-btn={true}
                onClick={() => {
                  openSelectMonth();
                  setTabCount(0);
                }}
              >
                {getLocalizedMonthName(nextMonth, locale)}
              </TextAreaYearMonth>
            </>
          )}
        </CalendarMonths>
      )}
      <HeaderIcons>
        {!openDecade && !openMonth && (
          <CalendarIconBtn data-calendar-btn={true} onClick={handleNextMonth}>
            <CalendarIcon name="Interface-chevron-right" />
          </CalendarIconBtn>
        )}
        <CalendarIconBtn
          data-calendar-btn={true}
          onClick={() => (!openDecade ? handleNextYear() : goToNextDecade())}
        >

          <CalendarIcon name="Interface-chevron-double-right" />
        </CalendarIconBtn>
      </HeaderIcons>

    </CalendarHeader>
  );
}

CalendarNavigation.defaultProps = {
  isDoubleView: false,
  openDecade: false,
  openMonth: false,
  isRangePicker: false,
  handlePrevMonth: null,
  handleNextMonth: null,
  goToPreviousDecade: null,
  goToNextDecade: null,
  selectedDecade: null,
  setTabCount: 0,
  openSelectDecade: null,
  displayYear: null,
  currentMonth: '',
  locale: 'ja-JP',
  openSelectMonth: null,
  showYears: false,
  setModalFocus: false,
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
  setTabCount: PropTypes.number,
  openSelectDecade: PropTypes.func,
  displayYear: PropTypes.func,
  currentMonth: PropTypes.string,
  locale: PropTypes.string,
  openSelectMonth: PropTypes.func,
  showYears: PropTypes.bool,
  setModalFocus: PropTypes.bool,
};

export default CalendarNavigation;
