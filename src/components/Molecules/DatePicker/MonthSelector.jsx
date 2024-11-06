import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { DecadeButton, DecadeGrid } from './styles';
import { getLocalizedMonthName } from '../../../utils';

const MonthSelector = ({ locale, setCurrentMonth, setOpenMonth, date, currentMonth }) => {
  const [focusedButton, setFocusedButton] = useState(currentMonth || 0);
  const buttonRefs = useRef([]);

  useEffect(() => {
    buttonRefs.current[focusedButton]?.focus();
  }, [focusedButton]);

  const handleMonthSelect = (monthIndex) => {
    setCurrentMonth(new Date(date.getFullYear(), monthIndex, 1));
    setOpenMonth(false);
  };

  const handleKeyDown = (event, index) => {
    let newIndex;
    const totalButtons = buttonRefs.current.length;

    switch (event.key) {
      case 'ArrowRight':
        newIndex = (index + 1) % totalButtons;
        break;
      case 'ArrowLeft':
        newIndex = (index - 1 + totalButtons) % totalButtons;
        break;
      case 'ArrowDown':
        newIndex = index + 3 < totalButtons ? index + 3 : index;
        break;
      case 'ArrowUp':
        newIndex = index - 3 >= 0 ? index - 3 : index;
        break;
      case 'Enter':
        buttonRefs.current[index].click();
        return;
      default:
        return;
    }
    event.preventDefault();
    setFocusedButton(newIndex);
  };

  return (
    <DecadeGrid>
      {Array.from({ length: 12 }, (_, index) => (
        <DecadeButton
          selected={currentMonth === index}
          key={index}
          ref={(el) => (buttonRefs.current[index] = el)}
          onClick={() => handleMonthSelect(index)}
          onKeyDown={(event) => handleKeyDown(event, index)}
          tabIndex={0}
					keyboardSelect={(focusedButton === index) && (currentMonth !== index)}
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
};

export default MonthSelector;
