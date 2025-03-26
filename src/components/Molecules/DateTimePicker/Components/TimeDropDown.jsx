import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import {
  TimeOption,
  ScrollColumn,
  StaticColumn,
  HourMinuteWrapper,
} from '../styles';

function TimeDropdown({
  is12Hour,
  hours,
  minutes,
  AmPmValue,
  handleHourClick,
  handleMinuteClick,
  handleAmPm,
  selectedHour,
  roundUpMinute,
  amPm,
  highlightedHourIndex,
  highlightedMinuteIndex,
  highlightedAmPmIndex,
  activeColumn,
  isEndTime,
}) {
  const timeOptionRefs = useRef([]);
  const minuteOptionRefs = useRef([]);
  const latestValues = useRef({});

  useEffect(() => {
    latestValues.current = {
      hours, minutes, selectedHour, roundUpMinute,
    };
  }, [hours, minutes, selectedHour, roundUpMinute]);

  useEffect(() => {
    const {
      hours: currentHour,
      minutes: currentMinute,
      selectedHour: currentSelectedHour,
      roundUpMinute: currentRoundUpMinute,
    } = latestValues.current;

    if (activeColumn === 'hour' && currentSelectedHour !== null) {
      const selectedIndex = currentHour.findIndex(hour => String(hour) === String(currentSelectedHour));
      if (selectedIndex !== -1 && timeOptionRefs.current[selectedIndex]) {
        timeOptionRefs.current[selectedIndex].scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
        });
      }
    }

    if (activeColumn === 'minute' && currentRoundUpMinute !== null) {
      const selectedIndex = currentMinute.findIndex(minute => String(minute) === String(currentRoundUpMinute));
      if (selectedIndex !== -1 && minuteOptionRefs.current[selectedIndex]) {
        minuteOptionRefs.current[selectedIndex].scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
        });
      }
    }
  }, [activeColumn]);

  return (
    <HourMinuteWrapper>
      <ScrollColumn>
        {hours?.map((hour, index) => (
          <TimeOption
            key={hour}
            id={`hour${isEndTime ? 'End' : ''}-${index}`}
            onClick={() => handleHourClick(hour)}
            selected={String(hour) === String(selectedHour)}
            highlighted={highlightedHourIndex === index && activeColumn === 'hour'}
            ref={el => { timeOptionRefs.current[index] = el; }}
          >
            {hour}
          </TimeOption>
        ))}
      </ScrollColumn>
      <ScrollColumn>
        {minutes.map((minute, index) => (
          <TimeOption
            key={minute}
            id={`minute${isEndTime ? 'End' : ''}-${index}`}
            onClick={() => handleMinuteClick(minute)}
            selected={String(minute) === String(roundUpMinute)}
            highlighted={highlightedMinuteIndex === index && activeColumn === 'minute'}
            ref={el => { minuteOptionRefs.current[index] = el; }}
          >
            {String(minute).padStart(2, '0')}
          </TimeOption>
        ))}
      </ScrollColumn>
      {is12Hour && (
        <StaticColumn>
          {AmPmValue.map(({ name, value }, index) => (
            <TimeOption
              key={value}
              id={`amPm${isEndTime ? 'End' : ''}-${index}`}
              onClick={() => handleAmPm(name)}
              selected={name === amPm}
              highlighted={highlightedAmPmIndex === index && activeColumn === 'ampm'}
            >
              {name}
            </TimeOption>
          ))}
        </StaticColumn>
      )}
    </HourMinuteWrapper>
  );
}

TimeDropdown.propTypes = {
  is12Hour: PropTypes.bool,
  hours: PropTypes.arrayOf(PropTypes.number).isRequired,
  minutes: PropTypes.arrayOf(PropTypes.number).isRequired,
  AmPmValue: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleHourClick: PropTypes.func.isRequired,
  handleMinuteClick: PropTypes.func.isRequired,
  handleAmPm: PropTypes.func.isRequired,
  selectedHour: PropTypes.number.isRequired,
  roundUpMinute: PropTypes.number.isRequired,
  amPm: PropTypes.string.isRequired,
  highlightedHourIndex: PropTypes.number.isRequired,
  highlightedMinuteIndex: PropTypes.number.isRequired,
  highlightedAmPmIndex: PropTypes.number.isRequired,
  activeColumn: PropTypes.string.isRequired,
  isEndTime: PropTypes.bool,
};

TimeDropdown.defaultProps = {
  is12Hour: false,
  isEndTime: false,
};
export default TimeDropdown;
