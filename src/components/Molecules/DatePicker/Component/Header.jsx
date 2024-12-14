import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { CalendarHeader, CalendarIconBtn, CalendarIcon, HeaderIcons } from '../styles';

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
}) => {
  if (isDoubleView) {
    return (
      <>
        {!disableHeader && (
          <CalendarHeader>
            <HeaderIcons>
              <CalendarIconBtn ref={doublePrevYearRef} onClick={handlePrevYear}>
                <CalendarIcon name="Interface-chevron-double-left" />
              </CalendarIconBtn>
              {!openDecade && !openMonth && (
                <CalendarIconBtn ref={doublePrevMonthRef} onClick={handlePrevMonth}>
                  <CalendarIcon name="Interface-chevron-left" />
                </CalendarIconBtn>
              )}
            </HeaderIcons>

            <HeaderIcons m={openDecade || openMonth ? '585px' : isRangePicker && isDoubleView && '520px'}>
              {!openDecade && !openMonth && (
                <CalendarIconBtn ref={doubleNextMonthRef} onClick={handleNextMonth}>
                  <CalendarIcon name="Interface-chevron-right" />
                </CalendarIconBtn>
              )}
              <CalendarIconBtn ref={doubleNextYearRef} onClick={handleNextYear}>
                <CalendarIcon name="Interface-chevron-double-right" />
              </CalendarIconBtn>
            </HeaderIcons>
          </CalendarHeader>
        )}
      </>
    );
  } else {
    return (
      <CalendarHeader>
        <HeaderIcons>
          <CalendarIconBtn
            data-calendar-btn
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
  }
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
};

export default CalendarNavigation;
