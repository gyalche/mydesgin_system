import { useEffect } from 'react';

const useTimePickerKeyboardNavigation = ({
  isDropdownOpen,
  isEndTimeDropdownOpen,
  highlightedHourIndex,
  highlightedMinuteIndex,
  highlightedAmPmIndex,
  highlightedHourEndIndex,
  highlightedMinuteEndIndex,
  highlightedAmPmEndIndex,
  activeColumn,
  hours,
  minutes,
  AmPmValue,
  is12Hour,
  columns,
  setHighlightedHourIndex,
  setHighlightedMinuteIndex,
  setHighlightedAmPmIndex,
  setHighlightedHourEndIndex,
  setHighlightedMinuteEndIndex,
  setHighlightedAmPmEndIndex,
  setActiveColumn,
  handleHourClick,
  handleMinuteClick,
  handleAmPm,
  handleEndHourClick,
  handleEndMinuteClick,
  handleEndAmPm,
  openTime,
  openTimeEnd,
  setIsDropdownOpen,
  setIsEndTimeDropdownOpen
}) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      const isEndTime = isEndTimeDropdownOpen;
      const isStartTime = isDropdownOpen;

      if (!isStartTime && !isEndTime) return;

      const getColumnIndices = (column, isEndTime) => {
        const hoursIndex = isEndTime ? highlightedHourEndIndex : highlightedHourIndex;
        const minutesIndex = isEndTime ? highlightedMinuteEndIndex : highlightedMinuteIndex;
        const ampmIndex = isEndTime ? highlightedAmPmEndIndex : highlightedAmPmIndex;
        return { hoursIndex, minutesIndex, ampmIndex };
      };

      const updateColumnIndex = (setIndexFn, maxLength, direction) => {
        setIndexFn((prevIndex) => {
          const newIndex = (prevIndex + direction + maxLength) % maxLength;
          return newIndex;
        });
      };

      const handleArrowDown = (isEndTime) => {
        if (activeColumn === 'hour') {
          updateColumnIndex(isEndTime ? setHighlightedHourEndIndex : setHighlightedHourIndex, hours.length, 1);
        } else if (activeColumn === 'minute') {
          updateColumnIndex(isEndTime ? setHighlightedMinuteEndIndex : setHighlightedMinuteIndex, minutes.length, 1);
        } else if (activeColumn === 'ampm' && is12Hour) {
          updateColumnIndex(isEndTime ? setHighlightedAmPmEndIndex : setHighlightedAmPmIndex, AmPmValue.length, 1);
        }
      };

      const handleArrowUp = (isEndTime) => {
        if (activeColumn === 'hour') {
          updateColumnIndex(isEndTime ? setHighlightedHourEndIndex : setHighlightedHourIndex, hours.length, -1);
        } else if (activeColumn === 'minute') {
          updateColumnIndex(isEndTime ? setHighlightedMinuteEndIndex : setHighlightedMinuteIndex, minutes.length, -1);
        } else if (activeColumn === 'ampm' && is12Hour) {
          updateColumnIndex(isEndTime ? setHighlightedAmPmEndIndex : setHighlightedAmPmIndex, AmPmValue.length, -1);
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
        const { hoursIndex, minutesIndex, ampmIndex } = getColumnIndices(activeColumn, isEndTime);
        if (activeColumn === 'hour' && hoursIndex >= 0) {
          isEndTime ? handleEndHourClick(hours[hoursIndex]) : handleHourClick(hours[hoursIndex]);
        } else if (activeColumn === 'minute' && minutesIndex >= 0) {
          isEndTime ? handleEndMinuteClick(minutes[minutesIndex]) : handleMinuteClick(minutes[minutesIndex]);
        } else if (activeColumn === 'ampm' && is12Hour && ampmIndex >= 0) {
          isEndTime ? handleEndAmPm(AmPmValue[ampmIndex].name) : handleAmPm(AmPmValue[ampmIndex].name);
        }
      };

      if (isStartTime || isEndTime) {
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

          default:
            break;
        }
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
    hours,
    minutes,
    AmPmValue,
    is12Hour,
    columns,
    setHighlightedHourIndex,
    setHighlightedMinuteIndex,
    setHighlightedAmPmIndex,
    setHighlightedHourEndIndex,
    setHighlightedMinuteEndIndex,
    setHighlightedAmPmEndIndex,
    setActiveColumn,
    handleHourClick,
    handleMinuteClick,
    handleAmPm,
    handleEndHourClick,
    handleEndMinuteClick,
    handleEndAmPm,
  ]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
        if (openTime) {
          setIsEndTimeDropdownOpen(false);
          setIsDropdownOpen(true);
        } else if (openTimeEnd) {
          setIsDropdownOpen(false);
          setIsEndTimeDropdownOpen(true);
        }
      }
    };

    if (isDropdownOpen || isEndTimeDropdownOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [openTime, openTimeEnd, isDropdownOpen, isEndTimeDropdownOpen]);
};

export default useTimePickerKeyboardNavigation;
