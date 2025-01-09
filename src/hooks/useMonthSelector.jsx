import { useState, useRef, useEffect } from 'react';

const useMonthSelector = ({
  currentMonth,
  tabCount,
  setModalFocus,
  setCurrentMonth,
  setOpenMonth,
  date,
}) => {
  const [focusedButton, setFocusedButton] = useState(currentMonth || 0);
  const buttonRefs = useRef([]);

  useEffect(() => {
    buttonRefs.current[focusedButton]?.focus();
  }, [focusedButton]);

  const handleMonthSelect = (monthIndex) => {
    if (!(date instanceof Date) || isNaN(date)) {
      return;
    }
    setCurrentMonth(new Date(date.getFullYear(), monthIndex, 1));
    setOpenMonth(false);
    setModalFocus(false);
  };

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
        buttonRefs.current[index].click();
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

    if (newIndex >= 0 && newIndex < totalButtons && buttonRefs.current[newIndex]) {
      event.preventDefault();
      event.stopPropagation();
      setFocusedButton(newIndex);
      buttonRefs.current[newIndex].focus();
    }
  };

  useEffect(() => {
    if (tabCount === 4 || tabCount === 0) {
      buttonRefs.current[focusedButton]?.focus();
    }
  }, [tabCount]);

  return {
    focusedButton,
    buttonRefs,
    handleMonthSelect,
    handleKeyDown,
  };
};

export default useMonthSelector;
