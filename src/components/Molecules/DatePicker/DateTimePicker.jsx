import React, { useState } from 'react';
import TimePicker from './TimePicker';
import DatePicker from './DatePicker';
import PropTypes from 'prop-types';

const DateTimePicker = ({onChange}) => {
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
         <DatePicker isDoubleView={false} onChange={(e)=>handleChange(e, 'date')} />
         <TimePicker is12Hour={true} onChange={(e)=>handleChange(e, 'time')} />
    </div>
  );
};

DateTimePicker.propTypes = {
    onChange: PropTypes.func,
};
  
DateTimePicker.defaultProps = {
    onChange: () => {},
};

export default DateTimePicker;
