import React, { useState } from 'react';
import TimePicker from './TimePicker';
import DatePicker from './DatePicker';
import PropTypes from 'prop-types';

const DateTimePicker = (onChange, disabled) => {
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
    <div style={{display: 'flex'}}>
         <DatePicker isDoubleView={false} onChange={(e)=>handleChange(e, 'date')} disabled={disabled} />
         <TimePicker is12Hour={true} onChange={(e)=>handleChange(e, 'time')} disabled={disabled} />
    </div>
  );
};

DateTimePicker.propTypes = {
    onChange: PropTypes.func,
    disabled: PropTypes.bool,
};

DateTimePicker.defaultProps = {
    onChange: () => {},
    disabled: false
};

export default DateTimePicker;
