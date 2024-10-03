import React, { useState } from 'react';
import TimePicker from './TimePicker';
import DatePicker from './DatePicker';
import PropTypes from 'prop-types';
import { DateTimeContainer, NextIcon } from './styles';
import { Layout } from 'components/Atoms';

const DateTimePicker = ({ onChange, disabled, isDoublePicker, isDoubleView, is12Hour, locale }) => {
  const [value, setValue] = useState({
    date: null,
    time: null,
  });

  const handleChange = (value, type, position) => {
    setValue((data) => {
      const myData = { ...data };
  
      if (isDoublePicker) {
        if (!Array.isArray(myData[type])) {
          myData[type] = [null, null];
        }
        if (position === 'start') {
          myData[type][0] = value;
        } else if (position === 'end') {
          myData[type][1] = value;
        }
      } else {
        myData[type] = value;
      }
      onChange(myData);
      return myData;
    });
  };  
  return (
    <DateTimeContainer>
      <Layout.Flex alignItems="center" gap="10px">
        <DatePicker 
          isDoubleView={isDoubleView}
          onChange={(e)=>handleChange(e, 'date', 'start')}
          disabled={disabled}
          isRangePicker={false}
          locale={locale} 
        />
        <TimePicker is12Hour={is12Hour} onChange={(e)=>handleChange(e, 'time', 'start')} disabled={disabled} />
      </Layout.Flex>

      {isDoublePicker && (
      <>
        <NextIcon name="Interface-arrow-right" />

        <Layout.Flex alignItems="center" gap="10px">
          <DatePicker
            isDoubleView={isDoubleView}
            onChange={(e)=>handleChange(e, 'date', 'end')}
            disabled={disabled}
            isRangePicker={false}
            locale={locale}
          />
          <TimePicker is12Hour={is12Hour} onChange={(e)=>handleChange(e, 'time', 'end')} disabled={disabled} />
        </Layout.Flex>
      </>
      )}
    </DateTimeContainer>
  );
};

DateTimePicker.propTypes = {
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  isDoubleView: PropTypes.bool,
  is12Hour: PropTypes.bool,
  isDoublePicker: PropTypes.bool,
  locale: PropTypes.string,
  placholder: PropTypes.string,
};

DateTimePicker.defaultProps = {
  onChange: () => {},
  disabled: false,
  isDoubleView: false,
  is12Hour: false,
  isDoublePicker: true,
  locale: 'en-US',
};

export default DateTimePicker;
