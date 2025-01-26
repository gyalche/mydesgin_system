import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

import { ButtonActive, DecadeButton, DecadeGrid } from '../../styles';
import { getLocalizedMonthName } from '../../../../../utils';
import useKeyboardNavigation from '../hooks/useMonthSelector';

function MonthSelector({
  locale,
  setCurrentMonth,
  setOpenMonth,
  date,
  currentMonth,
  enableFocus,
  tabCount,
  setModalFocus,
}) {
  const [focusedButton, setFocusedButton] = useState(currentMonth || 0);
  const buttonRefs = useRef([]);

  const handleMonthSelect = monthIndex => {
    if (!(date instanceof Date) || Number.isNaN(date)) {
      return;
    }
    setCurrentMonth(new Date(date.getFullYear(), monthIndex, 1));
    setOpenMonth(false);
    setModalFocus(false);
  };

  const { handleKeyDown } = useKeyboardNavigation({
    focusedButton,
    setFocusedButton,
    buttonCount: 12,
    onEnterKeyPress: index => handleMonthSelect(index),
    tabCount,
    buttonRefs,
    setModalFocus,
  });

  useEffect(() => {
    buttonRefs.current[focusedButton]?.focus();
  }, [focusedButton]);

  return (
    <DecadeGrid focus={enableFocus}>
      <ButtonActive data-calendar-btn={true} />
      {Array.from({ length: 12 }, (_, index) => (
        <DecadeButton
          selected={currentMonth === index}
          key={index}
          ref={el => {
            if (el) {
              buttonRefs.current[index] = el;
            }
          }}
          onClick={() => handleMonthSelect(index)}
          onKeyDown={event => handleKeyDown(event, index)}
          tabIndex={0}
          keyboardSelect={focusedButton === index && currentMonth !== index}
          isFocused={enableFocus}
        >
          {getLocalizedMonthName(new Date(0, index), locale)}
        </DecadeButton>
      ))}
    </DecadeGrid>
  );
}
MonthSelector.defaultProps = {
  currentMonth: null,
  enableFocus: false,
  tabCount: 0,
  setModalFocus: () => {},
};
MonthSelector.propTypes = {
  locale: PropTypes.string.isRequired,
  setCurrentMonth: PropTypes.func.isRequired,
  setOpenMonth: PropTypes.func.isRequired,
  date: PropTypes.instanceOf(Date).isRequired,
  currentMonth: PropTypes.number,
  enableFocus: PropTypes.bool,
  tabCount: PropTypes.number,
  setModalFocus: PropTypes.func,
};

export default MonthSelector;
