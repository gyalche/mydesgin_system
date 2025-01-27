import React from 'react';
import PropTypes from 'prop-types';

import {
  TimeOption,
  ScrollColumn,
  StaticColumn,
  HourMinuteWrapper,
} from '../../styles';

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
