import { useEffect } from 'react';

const useKeyboardNavigation = ({
  focusedButton,
  setFocusedButton,
  buttonCount,
  onEnterKeyPress,
  tabCount,
  buttonRefs,
}) => {
  const handleKeyDown = (event, index) => {
    const navigateButton = (key) => {
      switch (key) {
        case 'ArrowRight': return (index + 1) % buttonCount;
        case 'ArrowLeft': return (index - 1 + buttonCount) % buttonCount;
        case 'ArrowDown': return index + 3 < buttonCount ? index + 3 : index;
        case 'ArrowUp': return index - 3 >= 0 ? index - 3 : index;
        default: return index;
      }
    };

    switch (event.key) {
      case 'Enter':
        event.preventDefault();
        event.stopPropagation();
        onEnterKeyPress(index);
        return;

      case 'ArrowRight':
      case 'ArrowLeft':
      case 'ArrowDown':
      case 'ArrowUp': {
        const newIndex = navigateButton(event.key);
        if (newIndex >= 0 && newIndex < buttonCount && buttonRefs.current[newIndex]) {
          event.preventDefault();
          event.stopPropagation();
          setFocusedButton(newIndex);
          buttonRefs.current[newIndex].focus();
        }
        break;
      }

      default:
        return;
    }
  };

  useEffect(() => {
    buttonRefs.current[focusedButton]?.focus();
  }, [focusedButton]);
  
  useEffect(() => {
    if (tabCount === 4 || tabCount === 0) {
      buttonRefs.current[focusedButton]?.focus();
    }
  }, [tabCount, focusedButton]);

  return {
    buttonRefs,
    handleKeyDown,
  };
};

export default useKeyboardNavigation;
