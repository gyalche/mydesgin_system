import React from 'react';
import PropTypes from 'prop-types';
import { DecadeGrid, DecadeButton } from './styles';

const YearSelector = ({ selectedDecade, yearsInDecade, setCurrentMonth, setOpenDecade, setShowYears }) => (
  <DecadeGrid>
    <DecadeButton disabled>
      {selectedDecade - 1}
    </DecadeButton>
    {yearsInDecade.map((year) => (
      <DecadeButton
        key={year}
        onClick={() => {
          setCurrentMonth(new Date(year, 0, 1));
          setOpenDecade(false);
          setShowYears(false);
        }}
      >
        {year}
      </DecadeButton>
    ))}
    <DecadeButton disabled>
      {selectedDecade + 10}
    </DecadeButton>
  </DecadeGrid>
);

YearSelector.propTypes = {
  selectedDecade: PropTypes.number.isRequired,
  yearsInDecade: PropTypes.arrayOf(PropTypes.number).isRequired,
  setCurrentMonth: PropTypes.func.isRequired,
  setOpenDecade: PropTypes.func.isRequired,
  setShowYears: PropTypes.func,
};

export default YearSelector;
