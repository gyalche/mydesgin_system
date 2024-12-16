import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { DecadeButton, DecadeGrid } from '../styles';
import { getLocalizedMonthName } from '../../../../utils';

const MonthSelector = ({ locale, setCurrentMonth, setOpenMonth, date, currentMonth }) => {
  const [focusedButton, setFocusedButton] = useState(currentMonth || 0);
  const [tabCount, setTabCount] = useState(0); 
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
    let newIndex;
    const totalButtons = buttonRefs.current.length;

    switch (event.key) {
      case 'Tab':
        if (tabCount >= 2) {
          newIndex = (index + 1) % totalButtons;

          setFocusedButton(newIndex);
          event.preventDefault();
        }
        break;
      case 'ArrowRight':
        newIndex = (index + 1) % totalButtons;
        setFocusedButton(newIndex);
        break;
      case 'ArrowLeft':
        newIndex = (index - 1 + totalButtons) % totalButtons;
        setFocusedButton(newIndex);
        break;
      case 'ArrowDown':
        newIndex = index + 3 < totalButtons ? index + 3 : index;
        setFocusedButton(newIndex);
        break;
      case 'ArrowUp':
        newIndex = index - 3 >= 0 ? index - 3 : index;
        setFocusedButton(newIndex);
        break;
      case 'Enter':
        event.preventDefault();
        setFocusedButton(newIndex);
        buttonRefs.current[index].click();
        return;
      default:
        return;
    }
  };
  useEffect(() => {
    const handleTabPress = (e) => {
      if (e.key === 'Tab') {
        setTabCount((prev) => prev + 1);
      }
    };

    window.addEventListener('keydown', handleTabPress);
    return () => {
      window.removeEventListener('keydown', handleTabPress);
    };
  }, []);

  useEffect(() => {
    if(tabCount === 3){
      buttonRefs.current[focusedButton - 1]?.focus();
    }
  }, [tabCount]);

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
  tabCounts: PropTypes.number
};

export default MonthSelector;
