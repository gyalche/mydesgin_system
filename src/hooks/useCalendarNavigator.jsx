import { useEffect } from 'react';

const useCalendarNavigator = ({
  openCalendar,
  openCalendarEnd,
  tabCount,
  setTabCount,
  maxCount,
  modalFocus,
  setModalFocus,
  isRangePicker,
  setOpenCalendar,
  setOpenCalendarEnd,
  inputRefEnd,
  disableKeyboard,
}) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.key === 'Tab' && modalFocus) || e.key !== 'Tab') {
        setModalFocus(false);
      }
      if (openCalendar || openCalendarEnd) {
        if (e.key === 'Tab') {
          e.preventDefault();
          if (e.shiftKey) {
            const buttons = document.querySelectorAll('[data-calendar-btn]');
            const focusedIndex = Array.from(buttons).findIndex(
              (button) => button === document.activeElement
            );
            if (focusedIndex === 0) {
              setOpenCalendar(false);
              setOpenCalendarEnd(false);
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
            if (openCalendar || openCalendarEnd) {
              setOpenCalendar(false);
              setOpenCalendarEnd(false);
            }

            if (isRangePicker && openCalendar) {
              setOpenCalendar(false);
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

    if (openCalendar || openCalendarEnd) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [
    openCalendar,
    openCalendarEnd,
    tabCount,
    maxCount,
    modalFocus,
    isRangePicker,
    setTabCount,
    setModalFocus,
    setOpenCalendar,
    setOpenCalendarEnd,
    inputRefEnd,
    disableKeyboard,
  ]);
};

export default useCalendarNavigator;
