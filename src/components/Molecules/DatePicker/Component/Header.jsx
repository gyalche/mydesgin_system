import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { CalendarHeader, CalendarIconBtn, CalendarIcon, HeaderIcons, CalenderMonths, TextAreaYearMonth } from '../styles';
import { getLocalizedMonthName } from '../../../../utils';

const CalendarNavigation = ({
  isDoubleView,
  disableHeader,
  openDecade,
  openMonth,
  isRangePicker,
  handlePrevYear,
  handleNextYear,
  handlePrevMonth,
  handleNextMonth,
  goToPreviousDecade,
  goToNextDecade,
  doublePrevYearRef,
  doubleNextYearRef,
  doublePrevMonthRef,
  doubleNextMonthRef,
  selectedDecade,
  setTabCount,
  openSelectDecade,
  displayYear,
  currentMonth,
  locale,
  openSelectMonth,
  showYears,
  tabCount
}) => {
    return (
      <CalendarHeader>
        <HeaderIcons>
          <CalendarIconBtn
            data-calendar-btn
            tabIndex={0}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              !openDecade ? handlePrevYear() : goToPreviousDecade();
            }}
          >
            <CalendarIcon name="Interface-chevron-double-left" />
          </CalendarIconBtn>
          {!openDecade && !openMonth && (
            <CalendarIconBtn data-calendar-btn onClick={handlePrevMonth}>
              <CalendarIcon name="Interface-chevron-left" />
            </CalendarIconBtn>
          )}
        </HeaderIcons>

        <CalenderMonths>
            <TextAreaYearMonth data-calendar-btn 
              onClick={()=>!showYears && (openSelectDecade(), setTabCount(0))}
              openDecade={openDecade}
            >
            {selectedDecade && openDecade ? `${selectedDecade} - ${selectedDecade + 9}` : displayYear}
            </TextAreaYearMonth>
            {(!openDecade && !openMonth) && <TextAreaYearMonth data-calendar-btn onClick={() => (openSelectMonth(), setTabCount(0))}>
              {getLocalizedMonthName(currentMonth, locale)}
              </TextAreaYearMonth>
            }
        </CalenderMonths>

        <HeaderIcons>
          {!openDecade && !openMonth && (
            <CalendarIconBtn data-calendar-btn onClick={handleNextMonth}>
              <CalendarIcon name="Interface-chevron-right" />
            </CalendarIconBtn>
          )}
          <CalendarIconBtn
            data-calendar-btn
            onClick={() => (!openDecade ? handleNextYear() : goToNextDecade())}
          >

            <CalendarIcon name="Interface-chevron-double-right" />
          </CalendarIconBtn>
        </HeaderIcons>

      </CalendarHeader>
    );

};

CalendarNavigation.propTypes = {
  isDoubleView: PropTypes.bool,
  disableHeader: PropTypes.bool,
  openDecade: PropTypes.bool,
  openMonth: PropTypes.bool,
  isRangePicker: PropTypes.bool,
  handlePrevYear: PropTypes.func.isRequired,
  handleNextYear: PropTypes.func.isRequired,
  handlePrevMonth: PropTypes.func,
  handleNextMonth: PropTypes.func,
  goToPreviousDecade: PropTypes.func,
  goToNextDecade: PropTypes.func,
  doublePrevYearRef: PropTypes.object,
  doubleNextYearRef: PropTypes.object,
  doublePrevMonthRef: PropTypes.object,
  doubleNextMonthRef: PropTypes.object,
  selectedDecade: PropTypes.number,
  setTabCount: PropTypes.number,
  openSelectDecade: PropTypes.func,
  displayYear: PropTypes.func,
  currentMonth: PropTypes.string,
  locale: PropTypes.string,
  openSelectMonth: PropTypes.func,
  showYears: PropTypes.bool,
  tabCount: PropTypes.number
};

export default CalendarNavigation;
