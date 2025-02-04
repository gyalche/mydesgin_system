import { useEffect } from 'react';

import { KEY_CODES } from '../../../../../constants';

const useCalendarKeyboardNavigation = ({
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
  enableKeyboard,
}) => {
  useEffect(() => {
    if (openCalendarEnd && tabCount === 0) enableKeyboard();
    const closeCalendars = () => {
      setOpenCalendar(false);
      setOpenCalendarEnd(false);
      disableKeyboard();
      setModalFocus(false);
      setTabCount(0);
    };

    const handleKeyDown = e => {
      if ((e.key === KEY_CODES.TAB && modalFocus) || e.key !== KEY_CODES.TAB) {
        setModalFocus(false);
      }
      if (openCalendar || openCalendarEnd) {
        if (e.key === KEY_CODES.TAB) {
          e.preventDefault();
          const buttons = document.querySelectorAll('[data-calendar-btn]');
          const focusedIndex = Array.from(buttons).findIndex(
            button => button === document.activeElement,
          );
          if (e.shiftKey) {
            if (focusedIndex === 0) {
              closeCalendars();
              return;
            }
            setTabCount(prevTabCount => (prevTabCount === 1 ? maxCount : prevTabCount - 1));
            const prevIndex = (focusedIndex - 1 + buttons.length) % buttons.length;
            buttons[prevIndex]?.focus();
            return;
          }
          setTabCount(prevTabCount => (prevTabCount === maxCount ? 1 : prevTabCount + 1));

          if (modalFocus) {
            if (openCalendar || openCalendarEnd) {
              closeCalendars();
            }
            if (isRangePicker && openCalendar) {
              setOpenCalendar(false);
              inputRefEnd?.current?.focus();
              inputRefEnd?.current?.click();
              enableKeyboard();
            }
          }
          disableKeyboard();
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
    enableKeyboard,
  ]);
};

export default useCalendarKeyboardNavigation;
