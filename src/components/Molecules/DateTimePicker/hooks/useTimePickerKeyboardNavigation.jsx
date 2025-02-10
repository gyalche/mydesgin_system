import { useEffect, useState } from 'react';

import useClickOutside from '../../../../hooks/useClickOutside';
import closeOpenModal from '../../../../hooks/closeOpenModal';
import {
  TIME_COLUMNS,
  END_TIME,
  START_TIME,
  KEYBOARD_KEYS,
} from '../../../../constant';

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
}) => {
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
    if (isEndTimeDropdownOpen || isDropdownOpen) setActiveColumn('hour');
  }, [isDropdownOpen, isEndTimeDropdownOpen]);

  const handleInputKeyDown = (e, isEndInput) => {
    const currentRef = isEndInput ? timeInputRefEnd : timeInputRef;
    const isOpen = isEndInput ? isEndTimeDropdownOpen : isDropdownOpen;
    const setDropdownOpen = isEndInput ? setIsEndTimeDropdownOpen : setIsDropdownOpen;

    if (e.key === KEYBOARD_KEYS.enter) {
      currentRef?.current?.click();
      if (isOpen) {
        setDropdownOpen(true);
      }
    }
    if (e.key === KEYBOARD_KEYS.tab) {
      if (isOpen) {
        setDropdownOpen(false);
      }
    }
  };

  useEffect(() => {
    const updateHighlightedIndex = (column, isEndTime, direction) => {
      const key = isEndTime ? `${column}End` : column;
      let maxLength;
      if (column === START_TIME.hour) {
        maxLength = hours.length;
      } else if (column === START_TIME.minute) {
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
      if (key === KEYBOARD_KEYS.arrowDown) updateHighlightedIndex(activeColumn, isEndTime, 1);
      if (key === KEYBOARD_KEYS.arrowUp) updateHighlightedIndex(activeColumn, isEndTime, -1);
      if (key === KEYBOARD_KEYS.arrowRight) {
        setActiveColumn(prev => TIME_COLUMNS[(TIME_COLUMNS.indexOf(prev) + 1) % (is12Hour ? TIME_COLUMNS.length : TIME_COLUMNS.length - 1)]);
      }
      if (key === KEYBOARD_KEYS.arrowLeft) {
        setActiveColumn(prev => TIME_COLUMNS[(TIME_COLUMNS.indexOf(prev) - 1 + TIME_COLUMNS.length) % TIME_COLUMNS.length]);
      }
    };

    const handleEnterSelection = isEndTime => {
      const columnKeyMap = {
        hour: isEndTime ? END_TIME.hour : START_TIME.hour,
        minute: isEndTime ? END_TIME.minute : START_TIME.minute,
        ampm: isEndTime ? END_TIME.ampm : START_TIME.ampm,
      };

      const selectedIndex = highlightedIndex[columnKeyMap[activeColumn]];
      if (selectedIndex < 0) return;

      if (activeColumn === START_TIME.hour) {
        if (isEndTime) {
          handleEndHourClick(hours[selectedIndex]);
        } else {
          handleHourClick(hours[selectedIndex]);
        }
      } else if (activeColumn === START_TIME.minute) {
        if (isEndTime) {
          handleEndMinuteClick(minutes[selectedIndex]);
        } else {
          handleMinuteClick(minutes[selectedIndex]);
        }
      } else if (activeColumn === START_TIME.ampm && is12Hour) {
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

      switch (e.key) {
        case KEYBOARD_KEYS.arrowDown:
        case KEYBOARD_KEYS.arrowUp:
        case KEYBOARD_KEYS.arrowLeft:
        case KEYBOARD_KEYS.arrowRight:
          handleArrowNavigation(e.key, isEndTime);
          break;
        case KEYBOARD_KEYS.enter:
          handleEnterSelection(isEndTime);
          break;
        default:
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
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
