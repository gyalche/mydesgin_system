import { useEffect, useState } from 'react';;
import useClickOutside from './useClickOutside';
import closeOpenModal from './closeOpenModal';
import { columns } from '../constants';

export const useTimePickerNavigation = ({
  is12Hour,
  isDropdownOpen: initialIsDropdownOpen,
  isEndTimeDropdownOpen: initialIsEndTimeDropdownOpen,
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
  const [isDropdownOpen, setIsDropdownOpen] = useState(initialIsDropdownOpen || false);
  const [isEndTimeDropdownOpen, setIsEndTimeDropdownOpen] = useState(initialIsEndTimeDropdownOpen || false);

  const [highlightedHourIndex, setHighlightedHourIndex] = useState(-1);
  const [highlightedMinuteIndex, setHighlightedMinuteIndex] = useState(-1);
  const [highlightedAmPmIndex, setHighlightedAmPmIndex] = useState(-1);

  const [highlightedHourEndIndex, setHighlightedHourEndIndex] = useState(-1);
  const [highlightedMinuteEndIndex, setHighlightedMinuteEndIndex] = useState(-1);
  const [highlightedAmPmEndIndex, setHighlightedAmPmEndIndex] = useState(-1);

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
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleEndDropdown = () => {
    setIsDropdownOpen(false);
    setIsEndTimeDropdownOpen(!isEndTimeDropdownOpen);
  };

  const onKeyDownFirstInput = (e) => {
    if(e.key === 'Enter'){
      timeInputRef?.current?.click();
      if(isDropdownOpen) setIsDropdownOpen(true);
    }
    if(e.key === 'Tab' && isDropdownOpen) setIsDropdownOpen(false);
    if (e.key === 'Tab' && !e.shiftKey) {
      e.preventDefault();
      timeInputRefEnd.current?.focus();
    }
  };

  const onKeyDownSecondInput = (e) => {
    if(e.key === 'Enter'){
      timeInputRefEnd?.current?.click();
      if(isEndTimeDropdownOpen) setIsEndTimeDropdownOpen(true);
    }
    if(e.key === 'Tab' && isEndTimeDropdownOpen) setIsEndTimeDropdownOpen(false);
    if (e.key === 'Tab' && e.shiftKey) {
      e.preventDefault();
      timeInputRef.current?.focus();
    }
  };

  const updateColumnIndex = (setIndexFn, maxLength, direction, idPrefix) => {
    setIndexFn((prevIndex) => {
      const newIndex = (prevIndex + direction + maxLength) % maxLength;
      const element = document.getElementById(`${idPrefix}-${newIndex}`);
      if (element) {
        element.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      }
      return newIndex;
    });
  };

  useEffect(() => {
    setActiveColumn('hour');
  }, [isEndTimeDropdownOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      const isEndTime = isEndTimeDropdownOpen;
      const isStartTime = isDropdownOpen;

      if (!isStartTime && !isEndTime) return;

      const handleArrowDown = (isEndTime) => {
        if (activeColumn === 'hour') {
          updateColumnIndex(isEndTime ? setHighlightedHourEndIndex : setHighlightedHourIndex, hours.length, 1, 'hour');
        } else if (activeColumn === 'minute') {
          updateColumnIndex(isEndTime ? setHighlightedMinuteEndIndex : setHighlightedMinuteIndex, minutes.length, 1, 'minute');
        } else if (activeColumn === 'ampm' && is12Hour) {
          updateColumnIndex(isEndTime ? setHighlightedAmPmEndIndex : setHighlightedAmPmIndex, AmPmValue.length, 1, 'amPm');
        }
      };

      const handleArrowUp = (isEndTime) => {
        if (activeColumn === 'hour') {
          updateColumnIndex(isEndTime ? setHighlightedHourEndIndex : setHighlightedHourIndex, hours.length, -1, 'hour');
        } else if (activeColumn === 'minute') {
          updateColumnIndex(isEndTime ? setHighlightedMinuteEndIndex : setHighlightedMinuteIndex, minutes.length, -1, 'minute');
        } else if (activeColumn === 'ampm' && is12Hour) {
          updateColumnIndex(isEndTime ? setHighlightedAmPmEndIndex : setHighlightedAmPmIndex, AmPmValue.length, -1, 'amPm');
        }
      };

      const handleArrowRight = () => {
        setActiveColumn((prevColumn) => {
          const nextColumnIndex = (columns.indexOf(prevColumn) + 1) % (is12Hour ? columns.length : columns.length - 1);
          return columns[nextColumnIndex];
        });
      };

      const handleArrowLeft = () => {
        setActiveColumn((prevColumn) => {
          const prevColumnIndex = (columns.indexOf(prevColumn) - 1 + columns.length) % columns.length;
          return columns[prevColumnIndex];
        });
      };

      const handleEnter = (isEndTime) => {
        const hoursIndex = isEndTime ? highlightedHourEndIndex : highlightedHourIndex;
        const minutesIndex = isEndTime ? highlightedMinuteEndIndex : highlightedMinuteIndex;
        const ampmIndex = isEndTime ? highlightedAmPmEndIndex : highlightedAmPmIndex;

        if (activeColumn === 'hour' && hoursIndex >= 0) {
          isEndTime ? handleEndHourClick(hours[hoursIndex]) : handleHourClick(hours[hoursIndex]);
        } else if (activeColumn === 'minute' && minutesIndex >= 0) {
          isEndTime ? handleEndMinuteClick(minutes[minutesIndex]) : handleMinuteClick(minutes[minutesIndex]);
        } else if (activeColumn === 'ampm' && is12Hour && ampmIndex >= 0) {
          isEndTime ? handleEndAmPm(AmPmValue[ampmIndex].name) : handleAmPm(AmPmValue[ampmIndex].name);
        }
      };

      switch (e.key) {
        case 'ArrowDown':
          handleArrowDown(isEndTime);
          break;
        case 'ArrowUp':
          handleArrowUp(isEndTime);
          break;
        case 'ArrowRight':
          handleArrowRight();
          break;
        case 'ArrowLeft':
          handleArrowLeft();
          break;
        case 'Enter':
          handleEnter(isEndTime);
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [
    isDropdownOpen,
    isEndTimeDropdownOpen,
    highlightedHourIndex,
    highlightedMinuteIndex,
    highlightedAmPmIndex,
    highlightedHourEndIndex,
    highlightedMinuteEndIndex,
    highlightedAmPmEndIndex,
    activeColumn,
  ]);

  return {
    isDropdownOpen,
    isEndTimeDropdownOpen,
    highlightedHourIndex,
    highlightedMinuteIndex,
    highlightedAmPmIndex,
    highlightedHourEndIndex,
    highlightedMinuteEndIndex,
    highlightedAmPmEndIndex,
    activeColumn,
    setIsDropdownOpen,
    setIsEndTimeDropdownOpen,
    toggleDropdown,
    toggleEndDropdown,
    onKeyDownFirstInput,
    onKeyDownSecondInput,
  };
};
