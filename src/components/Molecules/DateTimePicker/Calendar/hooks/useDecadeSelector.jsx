import { useEffect, useCallback } from 'react';

import { KEYBOARD_KEYS } from '../../../../../constant';

const useDecadeSelector = ({
  buttonRefs,
  setModalFocus,
  goToNextDecade,
  goToPreviousDecade,
  isDoubleView,
  focusedButton,
  setFocusedButton,
  currentDecadeStart,
  selectedDecade,
  openDecade,
  tabCount,
  setTabCount,
}) => {
  const navigateButton = useCallback(
    (key, index, totalButtons) => {
      setModalFocus(false);
      const isDoubleIndexes = isDoubleView ? 4 : 3;

      switch (key) {
        case KEYBOARD_KEYS.arrowRight:
          return (index + 1) % totalButtons;
        case KEYBOARD_KEYS.arrowLeft:
          return (index - 1 + totalButtons) % totalButtons;
        case KEYBOARD_KEYS.arrowDown:
          return index + isDoubleIndexes < totalButtons ? index + isDoubleIndexes : index;
        case KEYBOARD_KEYS.arrowUp:
          return index - isDoubleIndexes >= 0 ? index - isDoubleIndexes : index;
        default:
          return index;
      }
    },
    [setModalFocus, isDoubleView],
  );

  const handleKeyDown = useCallback(
    event => {
      if (focusedButton === null) {
        setFocusedButton(1);
        buttonRefs.current[1]?.focus();
        return;
      }

      const totalButtons = buttonRefs.current.length;
      let newIndex;

      switch (event.key) {
        case KEYBOARD_KEYS.enter:
          event.preventDefault();
          event.stopPropagation();
          buttonRefs.current[focusedButton]?.click();
          setTabCount(0);
          return;

        case KEYBOARD_KEYS.arrowRight:
        case KEYBOARD_KEYS.arrowLeft:
        case KEYBOARD_KEYS.arrowDown:
        case KEYBOARD_KEYS.arrowUp:
          newIndex = navigateButton(event.key, focusedButton, totalButtons);

          if (newIndex === 0) goToPreviousDecade();
          if (newIndex === totalButtons - 1) goToNextDecade();

          if (newIndex >= 0 && newIndex < totalButtons - 1 && buttonRefs.current[newIndex]) {
            event.preventDefault();
            event.stopPropagation();
            setFocusedButton(newIndex);
            buttonRefs.current[newIndex]?.focus();
          }
          break;

        default:
      }
    },
    [focusedButton, buttonRefs, setFocusedButton, setTabCount, navigateButton, goToPreviousDecade, goToNextDecade],
  );

  useEffect(() => {
    if (openDecade && (tabCount === 0 || tabCount === 4)) {
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown, openDecade, tabCount]);

  useEffect(() => {
    let selectedIndex;
    if (selectedDecade !== null && selectedDecade >= currentDecadeStart) {
      selectedIndex = Math.max(0, Math.min((selectedDecade - currentDecadeStart) / 10 + 1, buttonRefs.current.length - 1));
    } else {
      selectedIndex = buttonRefs.current.length > 10 ? 10 : 1;
    }

    setFocusedButton(selectedIndex);
    buttonRefs.current[selectedIndex]?.focus();
  }, [selectedDecade, currentDecadeStart, setFocusedButton, buttonRefs]);
};

export default useDecadeSelector;
