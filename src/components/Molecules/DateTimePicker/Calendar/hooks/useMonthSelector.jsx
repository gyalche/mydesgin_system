import { useState, useRef, useEffect } from 'react';

import {
  ARROW_DOWN,
  ARROW_LEFT,
  ARROW_RIGHT,
  ARROW_UP,
  ENTER,
} from '../../../../../constant/keyCodes';

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
        case ARROW_RIGHT: return (index + 1) % totalButtons;
        case ARROW_LEFT: return (index - 1 + totalButtons) % totalButtons;
        case ARROW_DOWN: return index + 3 < totalButtons ? index + 3 : index;
        case ARROW_UP: return index - 3 >= 0 ? index - 3 : index;
        default: return index;
      }
    };

    switch (event.key) {
      case ENTER:
        event.preventDefault();
        event.stopPropagation();
        buttonRefs.current[index].click();
        return;

      case ARROW_RIGHT:
      case ARROW_LEFT:
      case ARROW_DOWN:
      case ARROW_UP:
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
