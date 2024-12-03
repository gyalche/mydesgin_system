import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { DecadeGrid, DecadeButton } from './styles';

const YearSelector = ({ selectedDecade, 
  yearsInDecade, 
  setCurrentMonth, 
  setOpenDecade, 
  setShowYears,
  currentMonth,
  showYears,
  setYearSelected,
}) => {
  const [selectedYearIndex, setSelectedYearIndex] = useState(0);
  const buttonRefs = useRef([]);
  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const currentYearIndex = yearsInDecade.indexOf(currentYear);
    setSelectedYearIndex(currentYearIndex !== -1 ? currentYearIndex : -1);
  }, [yearsInDecade]);

const handleKeyDown = (event) => {
  let newIndex = selectedYearIndex;
  const totalButtons = buttonRefs.current.length;

  switch (event.key) {
    case 'ArrowRight':
      newIndex = (selectedYearIndex + 1) % totalButtons;
      break;
    case 'ArrowLeft':
      newIndex = (selectedYearIndex - 1 + totalButtons) % totalButtons;
      break;
    case 'ArrowDown':
      newIndex = selectedYearIndex + 3 < totalButtons ? selectedYearIndex + 3 : selectedYearIndex;
      break;
    case 'ArrowUp':
      newIndex = selectedYearIndex - 3 >= 0 ? selectedYearIndex - 3 : selectedYearIndex;
      break;
    case 'Enter':
      buttonRefs.current[selectedYearIndex].click();
      return;
    default:
      return;
  }
  event.preventDefault();
  setSelectedYearIndex(newIndex);
  buttonRefs.current[newIndex]?.focus();
};

  useEffect(() => {
    if(showYears){
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  },[selectedYearIndex, showYears]);
  

const handleYearSelection = (year, event) => {
    if(typeof year !== 'number' && year.toString().length !== 4) return;
    event.preventDefault();
    setCurrentMonth(new Date(year, currentMonth.getMonth(), 1));
    setOpenDecade(false);
    setShowYears(false);
    setYearSelected(true);
  };

  return (
    <DecadeGrid>
      <DecadeButton disabled>
        {selectedDecade - 1}
      </DecadeButton>
      {yearsInDecade.map((year, index) => (
        <DecadeButton
          key={year}
          ref={(el) => (buttonRefs.current[index] = el)}
          onClick={(event) => handleYearSelection(year, event)}
          tabIndex={0}
          // selected={selectedYearIndex === index}
          keyboardSelect={selectedYearIndex === index}
          >
          {year}
        </DecadeButton>
      ))}
      <DecadeButton disabled>
        {selectedDecade + 10}
      </DecadeButton>
    </DecadeGrid>
  );
};

YearSelector.propTypes = {
  selectedDecade: PropTypes.number.isRequired,
  yearsInDecade: PropTypes.arrayOf(PropTypes.number).isRequired,
  setCurrentMonth: PropTypes.func.isRequired,
  setOpenDecade: PropTypes.func.isRequired,
  setShowYears: PropTypes.func,
  currentMonth: PropTypes.instanceOf(Date),
  showYears: PropTypes.bool,
  setYearSelected: PropTypes.bool,
};

export default YearSelector;
