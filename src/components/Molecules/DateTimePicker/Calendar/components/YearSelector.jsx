import React from 'react';
import PropTypes from 'prop-types';

import { DecadeGrid, DecadeButton, ButtonActive } from '../../styles';
import useYearSelector from '../hooks/useYearSelector';

function YearSelector({
  selectedDecade,
  yearsInDecade,
  setCurrentMonth,
  setOpenDecade,
  setShowYears,
  currentMonth,
  showYears,
  setTabCount,
  tabCount,
  goToPreviousDecade,
  goToNextDecade,
  enableFocus,
  setModalFocus,
  enableKeyboard,
}) {
  const { selectedYearIndex, buttonRefs, handleYearSelection } = useYearSelector({
    yearsInDecade,
    currentMonth,
    setCurrentMonth,
    setOpenDecade,
    setShowYears,
    setTabCount,
    tabCount,
    goToPreviousDecade,
    goToNextDecade,
    enableKeyboard,
    enableFocus,
    setModalFocus,
    showYears,
  });

  return (
    <DecadeGrid focus={enableFocus}>
      <ButtonActive data-calendar-btn={true} />
      <DecadeButton disabled={true}>{selectedDecade - 1}</DecadeButton>
      {yearsInDecade.map((year, index) => (
        <DecadeButton
          key={year}
          ref={el => {
            if (el) {
              buttonRefs.current[index] = el;
            }
          }}
          onClick={event => handleYearSelection(year, event)}
          tabIndex={0}
          keyboardSelect={selectedYearIndex === index}
          isFocused={enableFocus}
        >
          {year}
        </DecadeButton>
      ))}
      <DecadeButton disabled={true}>{selectedDecade + 10}</DecadeButton>
    </DecadeGrid>
  );
}

YearSelector.propTypes = {
  selectedDecade: PropTypes.number.isRequired,
  yearsInDecade: PropTypes.arrayOf(PropTypes.number).isRequired,
  setCurrentMonth: PropTypes.func.isRequired,
  setOpenDecade: PropTypes.func.isRequired,
  setShowYears: PropTypes.func.isRequired,
  currentMonth: PropTypes.instanceOf(Date).isRequired,
  showYears: PropTypes.bool,
  setTabCount: PropTypes.number,
  goToPreviousDecade: PropTypes.func,
  goToNextDecade: PropTypes.func,
  tabCount: PropTypes.func,
  enableFocus: PropTypes.bool,
  setModalFocus: PropTypes.bool,
  enableKeyboard: PropTypes.func,
};

YearSelector.defaultProps = {
  showYears: false,
  setTabCount: null,
  goToPreviousDecade: null,
  goToNextDecade: null,
  tabCount: 0,
  enableFocus: false,
  setModalFocus: false,
  enableKeyboard: null,
};
export default YearSelector;
