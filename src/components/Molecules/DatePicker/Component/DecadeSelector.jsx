import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { DecadeGrid, DecadeButton, ButtonActive } from '../styles';
import { ToastButton } from 'components/Molecules/Toast/CommonToastStyle';

const DecadeSelector = ({
  currentDecadeStart, 
  selectedDecade, 
  handleDecadeSelect, 
  enableKey, 
  setTabCount,
  goToNextDecade,
  goToPreviousDecade,
  enableFocus,
  setModalFocus
 }) => {
  const [focusedButton, setFocusedButton] = useState(null);
  const buttonRefs = useRef([]);
  
  const handleKeyDown = (event, index) => {
    const totalButtons = buttonRefs.current.length;
    let newIndex;

    const navigateButton = (key) => {
      setModalFocus(false);
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
        setTabCount(0);
        buttonRefs.current[enableKey ? index : index].click();
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
    if(newIndex === 0) goToPreviousDecade();
    if(newIndex === totalButtons - 1) goToNextDecade();
    if (newIndex >= 0 && newIndex < totalButtons - 1 && buttonRefs.current[newIndex]) {
      event.preventDefault();
      event.stopPropagation();
      setFocusedButton(newIndex);
      buttonRefs.current[newIndex].focus();
    }
  };
  
  useEffect(() => {
    const selectedIndex = selectedDecade ? Math.max(0, Math.min((selectedDecade - currentDecadeStart) / 10 + 1, buttonRefs.current.length - 1)) : 1;
    setFocusedButton(selectedIndex);
    buttonRefs.current[selectedIndex]?.focus();
  }, [selectedDecade, currentDecadeStart, enableKey]);

  return (
    <DecadeGrid focus={enableFocus}>
       <ButtonActive data-calendar-btn />
      <DecadeButton disabled ref={(el) => (buttonRefs.current[0] = el)}>
        {currentDecadeStart - 10} - {currentDecadeStart - 1}
      </DecadeButton>
      {Array.from({ length: 10 }, (_, index) => {
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
          >
            {decadeStart} - {decadeStart + 9}
          </DecadeButton>
        );
      })}
      <DecadeButton disabled ref={(el) => (buttonRefs.current[11] = el)}>
        {currentDecadeStart + 100} - {currentDecadeStart + 109}
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
};

export default DecadeSelector;
