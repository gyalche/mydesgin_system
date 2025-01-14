import { useEffect } from 'react';

const useCalendarNavigator = ({
  openCalender,
  openCalenderEnd,
  tabCount,
  setTabCount,
  maxCount,
  modalFocus,
  setModalFocus,
  isRangePicker,
  setOpenCalender,
  setOpenCalenderEnd,
  inputRefEnd,
  disableKeyboard,
}) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.key === 'Tab' && modalFocus) || e.key !== 'Tab') {
        setModalFocus(false);
      }
      if (openCalender || openCalenderEnd) {
        if (e.key === 'Tab') {
          e.preventDefault();
          if (e.shiftKey) {
            const buttons = document.querySelectorAll('[data-calendar-btn]');
            const focusedIndex = Array.from(buttons).findIndex(
              (button) => button === document.activeElement
            );
            if (focusedIndex === 0) {
              setOpenCalender(false);
              setOpenCalenderEnd(false);
              disableKeyboard();
              setModalFocus(false);
              setTabCount(0);
              return;
            }
            setTabCount((prevTabCount) =>
              prevTabCount === 1 ? maxCount : prevTabCount - 1
            );

            const prevIndex = (focusedIndex - 1 + buttons.length) % buttons.length;
            buttons[prevIndex]?.focus();
            return;
          }

          if (tabCount === maxCount) {
            setTabCount(0);
          }
          if (modalFocus) {
            if (openCalender || openCalenderEnd) {
              setOpenCalender(false);
              setOpenCalenderEnd(false);
            }

            if (isRangePicker && openCalender) {
              setOpenCalender(false);
              inputRefEnd?.current?.focus();
              inputRefEnd?.current?.click();
            }
          }

          disableKeyboard();
          setTabCount((prevTabCount) =>
            prevTabCount === maxCount ? 1 : prevTabCount + 1
          );
          const buttons = document.querySelectorAll('[data-calendar-btn]');
          const focusedIndex = Array.from(buttons).findIndex(
            (button) => button === document.activeElement
          );
          
          const nextIndex = focusedIndex === -1 ? 0 : (focusedIndex + 1) % buttons.length;
          buttons[nextIndex]?.focus();
        }
      }
    };

    if (openCalender || openCalenderEnd) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [
    openCalender,
    openCalenderEnd,
    tabCount,
    maxCount,
    modalFocus,
    isRangePicker,
    setTabCount,
    setModalFocus,
    setOpenCalender,
    setOpenCalenderEnd,
    inputRefEnd,
    disableKeyboard,
  ]);
};

export default useCalendarNavigator;
