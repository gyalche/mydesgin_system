import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { DecadeGrid, DecadeButton } from '../styles';

const YearSelector = ({
  selectedDecade,
  yearsInDecade,
  setCurrentMonth,
  setOpenDecade,
  setShowYears,
  currentMonth,
  showYears,
  setYearSelected,
  enableKey,
  setTabCount,
  tabCount,
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
    if(tabCount === 2){
      switch (event.key) {
        case 'Tab':
          newIndex = (selectedYearIndex + 1) % totalButtons;
          break;
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
          setTabCount(0);
          buttonRefs.current[newIndex]?.click();
          return;
        default:
          return;
      }
    }else{
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
          setTabCount(0);
          buttonRefs.current[newIndex]?.click();
          return;
        default:
          return;
      }
    }
    event.preventDefault();
    event.stopPropagation();
    setSelectedYearIndex(newIndex);
    buttonRefs.current[newIndex]?.focus();
  };

  useEffect(() => {
    if (showYears) {
      document?.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document?.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedYearIndex, showYears, tabCount]);

  const handleYearSelection = (year, event) => {
    if (typeof year !== 'number' || year.toString().length !== 4) return;
    event.preventDefault();
    setCurrentMonth(new Date(year, currentMonth.getMonth(), 1));
    setOpenDecade(false);
    setShowYears(false);
    setYearSelected(true);
    setTabCount(0);
  };

  return (
    <DecadeGrid>
      <DecadeButton disabled>{selectedDecade - 1}</DecadeButton>
      {yearsInDecade.map((year, index) => (
        <DecadeButton
          key={year}
          ref={(el) => (buttonRefs.current[index] = el)}
          onClick={(event) => handleYearSelection(year, event)}
          tabIndex={0}
          keyboardSelect={selectedYearIndex === index}
        >
          {year}
        </DecadeButton>
      ))}
     
      <DecadeButton disabled>{selectedDecade + 10}</DecadeButton>
    </DecadeGrid>
  );
};

YearSelector.propTypes = {
  selectedDecade: PropTypes.number.isRequired,
  yearsInDecade: PropTypes.arrayOf(PropTypes.number).isRequired,
  setCurrentMonth: PropTypes.func.isRequired,
  setOpenDecade: PropTypes.func.isRequired,
  setShowYears: PropTypes.func.isRequired,
  currentMonth: PropTypes.instanceOf(Date).isRequired,
  showYears: PropTypes.bool,
  setYearSelected: PropTypes.func.isRequired,
  enableKey: PropTypes.bool,
  setTabCount: PropTypes.number,
  goToPreviousDecade: PropTypes.func,
  goToNextDecade: PropTypes.func,
  tabCount: PropTypes.func,
};

export default YearSelector;
