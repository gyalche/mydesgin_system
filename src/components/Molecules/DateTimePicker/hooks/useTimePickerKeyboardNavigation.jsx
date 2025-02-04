import { useEffect, useState } from 'react';

import useClickOutside from '../../../../hooks/useClickOutside';
import closeOpenModal from '../../../../hooks/closeOpenModal';
import { columns, KEY_CODES } from '../../../../constants';

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

    if (e.key === KEY_CODES.ENTER) {
      currentRef?.current?.click();
      if (isOpen) {
        setDropdownOpen(true);
      }
    }
    if (e.key === KEY_CODES.TAB) {
      if (isOpen) {
        setDropdownOpen(false);
      }
    }
  };

  useEffect(() => {
    const updateHighlightedIndex = (column, isEndTime, direction) => {
      const key = isEndTime ? `${column}End` : column;
      let maxLength;
      if (column === 'hour') {
        maxLength = hours.length;
      } else if (column === 'minute') {
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
      if (key === KEY_CODES.ARROW_DOWN) updateHighlightedIndex(activeColumn, isEndTime, 1);
      if (key === KEY_CODES.ARROW_UP) updateHighlightedIndex(activeColumn, isEndTime, -1);
      if (key === KEY_CODES.ARROW_RIGHT) {
        setActiveColumn(prev => columns[(columns.indexOf(prev) + 1) % (is12Hour ? columns.length : columns.length - 1)]);
      }
      if (key === KEY_CODES.ARROW_LEFT) {
        setActiveColumn(prev => columns[(columns.indexOf(prev) - 1 + columns.length) % columns.length]);
      }
    };

    const handleEnterSelection = isEndTime => {
      const columnKeyMap = {
        hour: isEndTime ? 'hourEnd' : 'hour',
        minute: isEndTime ? 'minuteEnd' : 'minute',
        ampm: isEndTime ? 'ampmEnd' : 'ampm',
      };

      const selectedIndex = highlightedIndex[columnKeyMap[activeColumn]];
      if (selectedIndex < 0) return;

      if (activeColumn === 'hour') {
        if (isEndTime) {
          handleEndHourClick(hours[selectedIndex]);
        } else {
          handleHourClick(hours[selectedIndex]);
        }
      } else if (activeColumn === 'minute') {
        if (isEndTime) {
          handleEndMinuteClick(minutes[selectedIndex]);
        } else {
          handleMinuteClick(minutes[selectedIndex]);
        }
      } else if (activeColumn === 'ampm' && is12Hour) {
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
        case KEY_CODES.ARROW_DOWN:
        case KEY_CODES.ARROW_UP:
        case KEY_CODES.ARROW_LEFT:
        case KEY_CODES.ARROW_RIGHT:
          handleArrowNavigation(e.key, isEndTime);
          break;
        case KEY_CODES.ENTER:
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
