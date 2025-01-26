import { useEffect, useRef, useState } from 'react';

const useYearSelector = ({
  yearsInDecade,
  currentMonth,
  setCurrentMonth,
  setOpenDecade,
  setShowYears,
  setTabCount,
  tabCount,
  goToPreviousDecade,
  goToNextDecade,
  enableKeyboard,
  setModalFocus,
  showYears,
}) => {
  const [selectedYearIndex, setSelectedYearIndex] = useState(0);
  const buttonRefs = useRef([]);

  const currentYear = new Date(currentMonth).getFullYear();
  const currentYearIndex = yearsInDecade.indexOf(currentYear);

  useEffect(() => {
    setSelectedYearIndex(currentYearIndex !== -1 ? currentYearIndex : -1);
  }, [setSelectedYearIndex, currentMonth, currentYearIndex]);

  useEffect(() => {
    const handleKeyDown = event => {
      let newIndex = selectedYearIndex;
      const totalButtons = buttonRefs.current.length;
      setModalFocus(false);
      switch (event.key) {
        case 'ArrowRight':
          if (selectedYearIndex === totalButtons - 1) {
            goToNextDecade();
            setSelectedYearIndex(0);
            return;
          }
          newIndex = (selectedYearIndex + 1) % totalButtons;
          break;
        case 'ArrowLeft':
          if (selectedYearIndex < 0) {
            setSelectedYearIndex(0);
            return;
          }
          if (selectedYearIndex === 0) {
            goToPreviousDecade();
            setSelectedYearIndex(yearsInDecade.length - 1);
            return;
          }
          newIndex = (selectedYearIndex - 1 + totalButtons) % totalButtons;
          break;
        case 'ArrowDown':
          if (selectedYearIndex < 0) {
            setSelectedYearIndex(0);
            return;
          }
          newIndex = selectedYearIndex + 3 < totalButtons ? selectedYearIndex + 3 : selectedYearIndex;
          break;
        case 'ArrowUp':
          if (selectedYearIndex < 0) {
            setSelectedYearIndex(0);
            return;
          }
          newIndex = selectedYearIndex - 3 >= 0 ? selectedYearIndex - 3 : selectedYearIndex;
          break;
        case 'Enter':
          event.preventDefault();
          event.stopPropagation();
          enableKeyboard();
          setTabCount(0);
          buttonRefs.current[newIndex]?.click();
          return;
        default:
          return;
      }

      event.preventDefault();
      event.stopPropagation();

      setSelectedYearIndex(newIndex);
      buttonRefs.current[newIndex]?.focus();
    };
    if (showYears && (tabCount === 0 || tabCount === 4)) {
      document?.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document?.removeEventListener('keydown', handleKeyDown);
    };
  }, [enableKeyboard, goToNextDecade, goToPreviousDecade, selectedYearIndex, setModalFocus, setTabCount, showYears, tabCount, yearsInDecade.length]);

  const handleYearSelection = (year, event) => {
    if (typeof year !== 'number' || year.toString().length !== 4) return;
    event.preventDefault();
    setCurrentMonth(new Date(year, currentMonth.getMonth(), 1));
    setOpenDecade(false);
    setShowYears(false);
    setTabCount(0);
    setModalFocus(false);
  };

  return {
    selectedYearIndex,
    buttonRefs,
    handleYearSelection,
  };
};

export default useYearSelector;
