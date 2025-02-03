import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';

import { DecadeGrid, DecadeButton, ButtonActive } from '../../styles';
import useDecadeSelector from '../hooks/useDecadeSelector';

function DecadeSelector({
  currentDecadeStart,
  selectedDecade,
  handleDecadeSelect,
  goToNextDecade,
  goToPreviousDecade,
  enableFocus,
  setModalFocus,
  isDoubleView,
  openDecade,
  tabCount,
  setTabCount,
}) {
  const [focusedButton, setFocusedButton] = useState(null);
  const buttonRefs = useRef([]);

  useDecadeSelector({
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
    openDecade,
    tabCount,
    setTabCount,
  });

  return (
    <DecadeGrid focus={enableFocus} isDoubleView={isDoubleView}>
      <ButtonActive data-calendar-btn={true} />
      <DecadeButton
        disabled={true}
        ref={el => {
          if (el) {
            buttonRefs.current[0] = el;
          }
        }}
      >
        {currentDecadeStart - 10}
        {' '}
        -
        {currentDecadeStart - 1}
      </DecadeButton>
      {Array.from({ length: isDoubleView ? 14 : 10 }, (_, index) => {
        const decadeStart = Math.floor(currentDecadeStart / 10) * 10 + index * 10;
        return (
          <DecadeButton
            selected={selectedDecade === decadeStart}
            key={decadeStart}
            ref={el => {
              if (el) {
                buttonRefs.current[index + 1] = el;
              }
            }}
            onClick={() => handleDecadeSelect(decadeStart)}
            tabIndex={0}
            keyboardSelect={(focusedButton === index + 1) && (selectedDecade !== decadeStart)}
            isFocused={enableFocus}
          >
            {decadeStart}
            {' '}
            -
            {decadeStart + 9}
          </DecadeButton>
        );
      })}
      <DecadeButton
        disabled={true}
        ref={el => {
          if (el) {
            buttonRefs.current[isDoubleView ? 15 : 11] = el;
          }
        }}
      >
        {isDoubleView ? currentDecadeStart + 140 : currentDecadeStart + 100}
        {' '}
        -
        {isDoubleView ? currentDecadeStart + 149 : currentDecadeStart + 109}
      </DecadeButton>
    </DecadeGrid>
  );
}

DecadeSelector.defaultProps = {
  selectedDecade: null,
  goToNextDecade: () => {},
  goToPreviousDecade: () => {},
  enableFocus: true,
  setModalFocus: false,
  isDoubleView: false,
  openDecade: false,
  tabCount: 0,
  setTabCount: () => {},
};

DecadeSelector.propTypes = {
  currentDecadeStart: PropTypes.number.isRequired,
  selectedDecade: PropTypes.number,
  handleDecadeSelect: PropTypes.func.isRequired,
  goToNextDecade: PropTypes.func,
  goToPreviousDecade: PropTypes.func,
  enableFocus: PropTypes.bool,
  setModalFocus: PropTypes.bool,
  isDoubleView: PropTypes.bool,
  openDecade: PropTypes.bool,
  tabCount: PropTypes.number,
  setTabCount: PropTypes.func,
};

export default DecadeSelector;
