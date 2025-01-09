import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ButtonActive, DecadeButton, DecadeGrid } from '../styles';
import { getLocalizedMonthName } from '../../../../utils';
import useMonthSelector from '../../../../hooks/useMonthSelector';

const MonthSelector = ({ locale, 
  setCurrentMonth, 
  setOpenMonth, 
  date, 
  currentMonth, 
  enableFocus, 
  tabCount,
  setModalFocus
}) => {
  const { focusedButton, buttonRefs, handleMonthSelect, handleKeyDown } =
    useMonthSelector({
      currentMonth,
      tabCount,
      setModalFocus,
      setCurrentMonth,
      setOpenMonth,
      date,
  });

  return (
    <DecadeGrid focus={enableFocus}>
      <ButtonActive data-calendar-btn />
      {Array.from({ length: 12 }, (_, index) => (
        <DecadeButton
          selected={currentMonth === index}
          key={index}
          ref={(el) => (buttonRefs.current[index] = el)}
          onClick={() => handleMonthSelect(index)}
          onKeyDown={(event) => handleKeyDown(event, index)}
          tabIndex={0}
          keyboardSelect={focusedButton === index && currentMonth !== index}
          isFocused={enableFocus}
        >
          {getLocalizedMonthName(new Date(0, index), locale)}
        </DecadeButton>
      ))}
    </DecadeGrid>
  );
};

MonthSelector.propTypes = {
  locale: PropTypes.string.isRequired,
  setCurrentMonth: PropTypes.func.isRequired,
  setOpenMonth: PropTypes.func.isRequired,
  date: PropTypes.instanceOf(Date).isRequired,
  currentMonth: PropTypes.number,
  openMonth: PropTypes.bool,
  tabCounts: PropTypes.number,
  enableFocus: PropTypes.bool,
  tabCount: PropTypes.number,
  setModalFocus: PropTypes.bool,
};

export default MonthSelector;
