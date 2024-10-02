import React, { useState } from 'react';
import TimePicker from './TimePicker';
import DatePicker from './DatePicker';
import PropTypes from 'prop-types';
import { NextIcon } from './styles';
import { Layout } from 'components/Atoms';

const DateTimePicker = ({onChange, disabled, isDoubleView}) => {
    const [value, setValue] = useState({
      date: null,
      time: null,
    });

    const handleChange = (value, type) => {
      setValue((data)=> {
        const myData = {...data};
        myData[type] = value;
        return myData;
      });
    };

  return (
    <div style={{display: 'flex', alignItems: 'center'}}>
      <div style={{ display: 'flex'}}>
        <DatePicker isDoubleView={false} onChange={(e)=>handleChange(e, 'date')} disabled={disabled} isRangePicker={false} />
        <TimePicker is12Hour={true} onChange={(e)=>handleChange(e, 'time')} disabled={disabled} />
      </div>
      {isDoubleView && (
      <>
        <NextIcon name="Interface-arrow-right" />

        <Layout.Flex>
          <DatePicker isDoubleView={false} onChange={(e)=>handleChange(e, 'date')} disabled={disabled} isRangePicker={false}/>
          <TimePicker is12Hour={true} onChange={(e)=>handleChange(e, 'time')} disabled={disabled} />
        </Layout.Flex>
      </>
      )}
    </div>
  );
};

DateTimePicker.propTypes = {
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  isDoubleView: PropTypes.bool,
};

DateTimePicker.defaultProps = {
  onChange: () => {},
  disabled: false,
  isDoubleView: true,
};

export default DateTimePicker;
