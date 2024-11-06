import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { DecadeGrid, DecadeButton } from './styles';

const DecadeSelector = ({ currentDecadeStart, selectedDecade, handleDecadeSelect }) => {
  const buttonRefs = useRef([]);

  // Focus the selected decade when the component renders or updates
  useEffect(() => {
    const selectedIndex = selectedDecade ? (selectedDecade - currentDecadeStart) / 10 + 1 : 1;
    buttonRefs.current[selectedIndex]?.focus();
  }, [selectedDecade, currentDecadeStart]);

  // Handle keyboard navigation
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
        break;
      default:
        return;
    }
    // event.preventDefault();
    buttonRefs.current[newIndex].focus();
  };

  return (
    <DecadeGrid>
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
};

export default DecadeSelector;
