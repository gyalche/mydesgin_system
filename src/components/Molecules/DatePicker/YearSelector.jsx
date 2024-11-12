import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { DecadeGrid, DecadeButton } from './styles';

const YearSelector = ({ selectedDecade, yearsInDecade, setCurrentMonth, setOpenDecade, setShowYears }) => {
  const [selectedYearIndex, setSelectedYearIndex] = useState(0);
  const buttonRefs = useRef([]);

  useEffect(() => {
    // Set initial selection to current year if it's in the decade, otherwise to the first year
    const currentYear = new Date().getFullYear();
    const currentYearIndex = yearsInDecade.indexOf(currentYear);
    setSelectedYearIndex(currentYearIndex !== -1 ? currentYearIndex : 0);
  }, [yearsInDecade]);

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
    setSelectedYearIndex(newIndex);
    buttonRefs.current[newIndex]?.focus();
  };

  const handleYearSelection = (year) => {
    setCurrentMonth(new Date(year, 0, 1));
    setOpenDecade(false);
    setShowYears(false);
  };

  return (
    <DecadeGrid tabIndex={0}>
      <DecadeButton disabled>
        {selectedDecade - 1}
      </DecadeButton>
      {yearsInDecade.map((year, index) => (
        <DecadeButton
          key={year}
          ref={(el) => (buttonRefs.current[index] = el)}
          onClick={() => handleYearSelection(year, index)}
          onKeyDown={(event) => handleKeyDown(event, index)}
          tabIndex={0}
          selected={selectedYearIndex === index}
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
};

export default YearSelector;
