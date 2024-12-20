import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ButtonActive, DecadeButton, DecadeGrid } from '../styles';
import { getLocalizedMonthName } from '../../../../utils';

const MonthSelector = ({ locale, setCurrentMonth, setOpenMonth, date, currentMonth, enableFocus, tabCount }) => {
  const [focusedButton, setFocusedButton] = useState(currentMonth || 0);
  // const [tabCount, setTabCount] = useState(0);
  const buttonRefs = useRef([]);

  useEffect(() => {
    buttonRefs.current[focusedButton]?.focus();
  }, [focusedButton]);

  const handleMonthSelect = (monthIndex) => {
    if (!(date instanceof Date) || isNaN(date)) {
      return;
    }
    setCurrentMonth(new Date(date.getFullYear(), monthIndex, 1));
    setOpenMonth(false);
  };

  const handleKeyDown = (event, index) => {
    const totalButtons = buttonRefs.current.length;
    let newIndex;

    const navigateButton = (key) => {

      switch (key) {
        case 'ArrowRight': return (index + 1) % totalButtons;
        case 'ArrowLeft': return (index - 1 + totalButtons) % totalButtons;
        case 'ArrowDown': return index + 3 < totalButtons ? index + 3 : index;
        case 'ArrowUp': return index - 3 >= 0 ? index - 3 : index;
        default: return index;
      }
    };
  
    switch (event.key) {
      case 'Enter':
        event.preventDefault();
        event.stopPropagation();
        // setTabCount(0);
        buttonRefs.current[index].click();
        return;
  
      case 'ArrowRight':
      case 'ArrowLeft':
      case 'ArrowDown':
      case 'ArrowUp':
        newIndex = navigateButton(event.key);
        break;
  
      default:
        return;
    }
    if (newIndex >= 0 && newIndex < totalButtons && buttonRefs.current[newIndex]) {
      event.preventDefault();
      event.stopPropagation();
      setFocusedButton(newIndex);
      buttonRefs.current[newIndex].focus();
    }
  };

  useEffect(() => {
    if(tabCount === 4 || tabCount == 0){
      buttonRefs.current[focusedButton]?.focus();
    }
  }, [tabCount]);

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
};

export default MonthSelector;
