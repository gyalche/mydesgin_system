import { useEffect, useCallback } from 'react';

const useDecadeSelector = ({
  buttonRefs,
  enableFocus,
  setModalFocus,
  goToNextDecade,
  goToPreviousDecade,
  isDoubleView,
  focusedButton,
  setFocusedButton,
  currentDecadeStart,
  selectedDecade,
}) => {
  const handleKeyDown = useCallback(
    (event, index) => {
      if (focusedButton === null) {
        setFocusedButton(1);
        buttonRefs.current[1]?.focus();
        return;
      }
      const totalButtons = buttonRefs.current.length;
      const isDoubleIndexes = isDoubleView ? 4 : 3;

      const navigateButton = key => {
        setModalFocus(false);
        switch (key) {
          case 'ArrowRight':
            return (index + 1) % totalButtons;
          case 'ArrowLeft':
            return (index - 1 + totalButtons) % totalButtons;
          case 'ArrowDown':
            return index + isDoubleIndexes < totalButtons ? index + isDoubleIndexes : index;
          case 'ArrowUp':
            return index - isDoubleIndexes >= 0 ? index - isDoubleIndexes : index;
          default:
            return index;
        }
      };

      let newIndex;
      switch (event.key) {
        case 'Enter':
          event.preventDefault();
          event.stopPropagation();
          buttonRefs.current[enableFocus ? index : index]?.click();
          return;

        case 'ArrowRight':
        case 'ArrowLeft':
        case 'ArrowDown':
        case 'ArrowUp':
          newIndex = navigateButton(event.key);
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
    [
      focusedButton,
      buttonRefs,
      enableFocus,
      setModalFocus,
      goToNextDecade,
      goToPreviousDecade,
      isDoubleView,
      setFocusedButton,
    ],
  );

  useEffect(() => {
    let selectedIndex;
    if (selectedDecade !== null && selectedDecade >= currentDecadeStart) {
      selectedIndex = Math.max(0, Math.min((selectedDecade - currentDecadeStart) / 10 + 1, buttonRefs.current.length - 1));
    } else if (focusedButton > 9) {
      selectedIndex = 10;
    } else {
      selectedIndex = 1;
    }

    setFocusedButton(selectedIndex);
    buttonRefs.current[selectedIndex]?.focus();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDecade, currentDecadeStart, enableFocus, buttonRefs, setFocusedButton]);

  return { handleKeyDown };
};
export default useDecadeSelector;
