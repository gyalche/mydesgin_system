import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { DecadeGrid, DecadeButton, ButtonActive } from '../styles';
import useDecadeSelector from '../hooks/useDecadeSelector';

const DecadeSelector = ({
  currentDecadeStart,
  selectedDecade, 
  handleDecadeSelect, 
  goToNextDecade,
  goToPreviousDecade,
  enableFocus,
  setModalFocus,
  isDoubleView,
 }) => {
  const [focusedButton, setFocusedButton] = useState(null);
  const buttonRefs = useRef([]);
  
  const { handleKeyDown } = useDecadeSelector({
    buttonRefs,
    enableFocus,
    setModalFocus,
    goToNextDecade,
    goToPreviousDecade,
    isDoubleView,
    handleDecadeSelect,
    focusedButton,
    setFocusedButton,
    currentDecadeStart,
    selectedDecade,
  });

  return (
    <DecadeGrid focus={enableFocus} isDoubleView={isDoubleView}>
      <ButtonActive data-calendar-btn />
      <DecadeButton disabled ref={(el) => (buttonRefs.current[0] = el)}>
        {currentDecadeStart - 10} - {currentDecadeStart - 1}
      </DecadeButton>
      {Array.from({ length: isDoubleView ? 14 : 10 }, (_, index) => {
        const decadeStart = Math.floor(currentDecadeStart / 10) * 10 + index * 10;
        return (
          <DecadeButton
            selected={selectedDecade === decadeStart}
            key={decadeStart}
            ref={(el) => (buttonRefs.current[index + 1] = el)}
            onClick={() => handleDecadeSelect(decadeStart)}
            onKeyDown={(event) => handleKeyDown(event, index + 1)}
            tabIndex={0}
            keyboardSelect={(focusedButton === index + 1) && (selectedDecade !== decadeStart)}
            isFocused={enableFocus}
          >
            {decadeStart} - {decadeStart + 9}
          </DecadeButton>
        );
      })}
      <DecadeButton disabled ref={(el) => (buttonRefs.current[isDoubleView ? 15 : 11] = el)}>
        {isDoubleView ? currentDecadeStart + 140 : currentDecadeStart + 100} - {isDoubleView ? currentDecadeStart + 149 : currentDecadeStart + 109}
      </DecadeButton>
    </DecadeGrid>
  );
};

DecadeSelector.propTypes = {
  currentDecadeStart: PropTypes.number.isRequired,
  selectedDecade: PropTypes.number,
  handleDecadeSelect: PropTypes.func.isRequired,
  enableKey: PropTypes.bool,
  setTabCount: PropTypes.number,
  goToNextDecade: PropTypes.func,
  goToPreviousDecade: PropTypes.func,
  enableFocus: PropTypes.bool,
  setModalFocus: PropTypes.bool,
  isDoubleView: PropTypes.bool,
};

export default DecadeSelector;
