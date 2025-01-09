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
      if (e.shiftKey) {
        disableKeyboard();
        setModalFocus(false);
        return;
      }
      if ((e.key === 'Tab' && modalFocus) || e.key !== 'Tab') {
        setModalFocus(false);
      }
      if (openCalender || openCalenderEnd) {
        if (e.key === 'Tab') {
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
          e.preventDefault();
          disableKeyboard();
          if (e.shiftKey) {
            setTabCount((prevTabCount) =>
              prevTabCount === 1 ? maxCount : prevTabCount - 1
            );
          } else {
            setTabCount((prevTabCount) =>
              prevTabCount === maxCount ? 1 : prevTabCount + 1
            );
          }
          const selector = '[data-calendar-btn]';
          const buttons = document.querySelectorAll(selector);

          const focusedIndex = Array.from(buttons).findIndex(
            (button) => button === document.activeElement
          );

          const nextIndex = e.shiftKey
            ? ((focusedIndex - 1 + buttons.length) % buttons.length, setTabCount(0))
            : (focusedIndex + 1) % buttons.length;
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
