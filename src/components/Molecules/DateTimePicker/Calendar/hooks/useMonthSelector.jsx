import { useState, useRef, useEffect } from 'react';

import { KEY_CODES } from '../../../../../constants';

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

  const handleMonthSelect = monthIndex => {
    if (!(date instanceof Date) || Number.isNaN(date)) {
      return;
    }
    setCurrentMonth(new Date(date.getFullYear(), monthIndex, 1));
    setOpenMonth(false);
    setModalFocus(false);
  };

  const handleKeyDown = (event, index) => {
    const totalButtons = buttonRefs.current.length;
    let newIndex;

    const navigateButton = key => {
      setModalFocus(false);
      switch (key) {
        case KEY_CODES.ARROW_RIGHT: return (index + 1) % totalButtons;
        case KEY_CODES.ARROW_LEFT: return (index - 1 + totalButtons) % totalButtons;
        case KEY_CODES.ARROW_DOWN: return index + 3 < totalButtons ? index + 3 : index;
        case KEY_CODES.ARROW_UP: return index - 3 >= 0 ? index - 3 : index;
        default: return index;
      }
    };

    switch (event.key) {
      case 'Enter':
        event.preventDefault();
        event.stopPropagation();
        buttonRefs.current[index].click();
        return;

      case KEY_CODES.ARROW_RIGHT:
      case KEY_CODES.ARROW_LEFT:
      case KEY_CODES.ARROW_DOWN:
      case KEY_CODES.ARROW_UP:
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
  }, [focusedButton, tabCount]);

  return {
    focusedButton,
    buttonRefs,
    handleMonthSelect,
    handleKeyDown,
  };
};

export default useMonthSelector;
