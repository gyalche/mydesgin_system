import { useEffect, useState } from 'react';

import useClickOutside from '../../../../hooks/useClickOutside';
import closeOpenModal from '../../../../hooks/closeOpenModal';
import {
  ENTER,
  ARROW_DOWN,
  ARROW_UP,
  ARROW_RIGHT,
  ARROW_LEFT,
  TAB,
} from '../../../../constant/keyCodes';
import {
  AMPM,
  AMPMEND,
  HOUR,
  HOUREND,
  MINUTE,
  MINUTEEND,
} from '../../../../constant/timeUnits';

export const useTimePickerKeyboardNavigation = ({
  is12Hour,
  AmPmValue,
  timeInputRef,
  timeInputRefEnd,
  timePickerRef,
  hours,
  minutes,
  handleHourClick,
  handleMinuteClick,
  handleAmPm,
  handleEndHourClick,
  handleEndMinuteClick,
  handleEndAmPm,
  currentSelectedTimes,
}) => {
  const {
    selectedHour, selectedMinute, selectedHourEnd, selectedMinuteEnd, selectedAmPm, selectedAmPmEnd,
  } = currentSelectedTimes;
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isEndTimeDropdownOpen, setIsEndTimeDropdownOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState({
    hour: -1,
    minute: -1,
    ampm: -1,
    hourEnd: -1,
    minuteEnd: -1,
    ampmEnd: -1,
  });
  const [activeColumn, setActiveColumn] = useState('hour');

  useClickOutside(timePickerRef, () => {
    setIsDropdownOpen(false);
    setIsEndTimeDropdownOpen(false);
  });

  closeOpenModal(() => {
    setIsDropdownOpen(false);
    setIsEndTimeDropdownOpen(false);
  });

  const toggleDropdown = () => {
    setIsEndTimeDropdownOpen(false);
    setIsDropdownOpen(prev => !prev);
  };

  const toggleEndDropdown = () => {
    setIsDropdownOpen(false);
    setIsEndTimeDropdownOpen(prev => !prev);
  };

  useEffect(() => {
    if (isDropdownOpen || isEndTimeDropdownOpen) {
      setActiveColumn('hour');
      setHighlightedIndex(prev => ({
        ...prev,
        hour: selectedHour !== null ? hours.findIndex(hour => String(hour) === String(selectedHour)) : 0,
        minute: selectedMinute !== null ? minutes.findIndex(minute => String(minute) === String(selectedMinute)) : 0,
        ampm: is12Hour && AmPmValue.length > 0 ? AmPmValue.findIndex(ampm => ampm.name === selectedAmPm) : -1,
        hourEnd: selectedHourEnd !== null ? hours.findIndex(hour => String(hour) === String(selectedHourEnd)) : 0,
        minuteEnd: selectedMinuteEnd !== null ? minutes.findIndex(minute => String(minute) === String(selectedMinuteEnd)) : 0,
        ampmEnd: is12Hour && AmPmValue.length > 0 ? AmPmValue.findIndex(ampm => ampm.name === selectedAmPmEnd) : -1,
      }));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDropdownOpen, isEndTimeDropdownOpen]);

  const handleInputKeyDown = (e, isEndInput) => {
    const currentRef = isEndInput ? timeInputRefEnd : timeInputRef;
    const isOpen = isEndInput ? isEndTimeDropdownOpen : isDropdownOpen;
    const setDropdownOpen = isEndInput ? setIsEndTimeDropdownOpen : setIsDropdownOpen;

    if (e.key === ENTER) {
      if (!isOpen) {
        e.preventDefault();
        currentRef?.current?.click();
        setDropdownOpen(true);
      }
    } else if (e.key === TAB && isOpen) {
      setDropdownOpen(false);
    }
  };
  // const handleInputKeyDown = (e, isEndInput) => {
  //   const currentRef = isEndInput ? timeInputRefEnd : timeInputRef;
  //   const isOpen = isEndInput ? isEndTimeDropdownOpen : isDropdownOpen;
  //   const setDropdownOpen = isEndInput ? setIsEndTimeDropdownOpen : setIsDropdownOpen;

  //   if (e.key === ENTER) {
  //     e.stopPropagation();
  //     e.preventDefault();

  //     currentRef?.current?.click();
  //     if (isOpen) {
  //       setDropdownOpen(true);
  //     }
  //   }
  //   if (e.key === TAB) {
  //     if (isOpen) {
  //       setDropdownOpen(false);
  //     }
  //   }
  // };
  useEffect(() => {
    if (isDropdownOpen || isEndTimeDropdownOpen) {
      const timeColumns = [HOUR, MINUTE, AMPM];

      const updateHighlightedIndex = (column, isEndTime, direction) => {
        const key = isEndTime ? `${column}End` : column;
        let maxLength;
        if (column === HOUR) {
          maxLength = hours.length;
        } else if (column === MINUTE) {
          maxLength = minutes.length;
        } else {
          maxLength = AmPmValue.length;
        }

        setHighlightedIndex(prev => {
          const newIndex = (prev[key] + direction + maxLength) % maxLength;
          if (document.getElementById(`${key}-${newIndex}`)) {
            document.getElementById(`${key}-${newIndex}`).scrollIntoView({ block: 'nearest', behavior: 'smooth' });
          }
          return { ...prev, [key]: newIndex };
        });
      };

      const handleArrowNavigation = (key, isEndTime) => {
        if (key === ARROW_DOWN) updateHighlightedIndex(activeColumn, isEndTime, 1);
        if (key === ARROW_UP) updateHighlightedIndex(activeColumn, isEndTime, -1);
        if (key === ARROW_RIGHT) {
          setActiveColumn(prev => timeColumns[(timeColumns.indexOf(prev) + 1) % (is12Hour ? timeColumns.length : timeColumns.length - 1)]);
        }
        if (key === ARROW_LEFT) {
          setActiveColumn(prev => timeColumns[(timeColumns.indexOf(prev) - 1 + timeColumns.length) % timeColumns.length]);
        }
      };

      const handleEnterSelection = isEndTime => {
        const columnKeyMap = {
          hour: isEndTime ? HOUREND : HOUR,
          minute: isEndTime ? MINUTEEND : MINUTE,
          ampm: isEndTime ? AMPMEND : AMPM,
        };

        const selectedIndex = highlightedIndex[columnKeyMap[activeColumn]];
        if (selectedIndex < 0) return;

        if (activeColumn === HOUR) {
          if (isEndTime) {
            handleEndHourClick(hours[selectedIndex]);
          } else {
            handleHourClick(hours[selectedIndex]);
          }
        } else if (activeColumn === MINUTE) {
          if (isEndTime) {
            handleEndMinuteClick(minutes[selectedIndex]);
          } else {
            handleMinuteClick(minutes[selectedIndex]);
          }
        } else if (activeColumn === AMPM && is12Hour) {
          if (isEndTime) {
            handleEndAmPm(AmPmValue[selectedIndex].name);
          } else {
            handleAmPm(AmPmValue[selectedIndex].name);
          }
        }
      };

      const handleKeyDown = e => {
        const isEndTime = isEndTimeDropdownOpen;
        const isStartTime = isDropdownOpen;

        if (!isStartTime && !isEndTime) return;

        // Prevent default for all keyboard events to avoid form submission
        e.preventDefault();
        e.stopPropagation();

        switch (e.key) {
          case ARROW_DOWN:
          case ARROW_UP:
          case ARROW_LEFT:
          case ARROW_RIGHT:
            handleArrowNavigation(e.key, isEndTime);
            break;
          case ENTER:
            handleEnterSelection(isEndTime);
            break;
          default:
            break;
        }
      };

      document.addEventListener('keydown', handleKeyDown);

      return () => document.removeEventListener('keydown', handleKeyDown);
    }

    return () => {};
  }, [isDropdownOpen,
    isEndTimeDropdownOpen,
    highlightedIndex,
    activeColumn,
    is12Hour,
    hours,
    minutes,
    AmPmValue,
    handleHourClick,
    handleMinuteClick,
    handleAmPm,
    handleEndHourClick,
    handleEndMinuteClick,
    handleEndAmPm]);

  return {
    isDropdownOpen,
    isEndTimeDropdownOpen,
    highlightedIndex,
    activeColumn,
    setIsDropdownOpen,
    setIsEndTimeDropdownOpen,
    toggleDropdown,
    toggleEndDropdown,
    onKeyDownFirstInput: e => handleInputKeyDown(e, false),
    onKeyDownSecondInput: e => handleInputKeyDown(e, true),
  };
};
