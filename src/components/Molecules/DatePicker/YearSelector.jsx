import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { DecadeGrid, DecadeButton } from './styles';

const YearSelector = ({ selectedDecade, yearsInDecade, setCurrentMonth, setOpenDecade, setShowYears }) => {
  const [selectedYearIndex, setSelectedYearIndex] = useState(0);
  const buttonRefs = useRef([]);

  const handleYearSelection = (year, index) => {
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
          tabIndex={0}
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
