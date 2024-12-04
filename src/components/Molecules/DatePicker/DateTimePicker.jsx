import React, { useEffect, useState } from 'react';
import TimePicker from './TimePicker';
import DatePicker from './DatePicker';
import PropTypes from 'prop-types';
import { DateTimeContainer, NextIcon } from './styles';
import { Layout } from 'components/Atoms';

// const DateTimePicker = ({ onChange, 
//   disabled,
//   isDoublePicker,
//   isDoubleView,
//   isRangePicker,
//   is12Hour,
//   locale,
//   placeholder,
//   isTimeRange }) => {
//   const [value, setValue] = useState({
//     date: isDoublePicker ? [new Date(), new Date()] : new Date(),
//     time: isDoublePicker ? [null, null] : null,
//   });
//   const [dateTimeStart, setDateTimeStart] = useState(true);
//   const [dateTimeEnd, setDateTimeEnd] = useState(true);
//   const validateValue = (value, type) => {
//     const isValidDate = (date) => date instanceof Date && !isNaN(date);
//     const isValidTime = (time) => {
//       const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
//       return typeof time === 'string' && timeRegex.test(time);
//     };
  
//     return type === 'date' ? isValidDate(value) : isValidTime(value);
//   };

//   const handleChange = (value, type, position) => {
//     if (!validateValue(value, type)) {
//       return new Error('invalid');
//     }
//     setValue((data) => {
//       const myData = {...data};
  
//       if (isDoublePicker) {
//         if (!Array.isArray(myData[type])) {
//           myData[type] = [null, null];
//         }
//         if (position === 'start') {
//           myData[type][0] = value;
//         } else if (position === 'end') {
//           myData[type][1] = value;
//         }
//       } else {
//         myData[type] = value;
//       }
//       const isValidMyData = Object.keys(myData).every((key) => {
//         const val = myData[key];
//         if (isDoublePicker && Array.isArray(val)) {
//           return val.every((item) => validateValue(item, type));
//         }
//         return validateValue(val, type);
//       });
  
//       if (isValidMyData) {
//         onChange(myData);
//       }
//       return myData;
//     });
//   };

//   return (
//     <DateTimeContainer>
//       <Layout.Flex alignItems="center" gap="6px">
//         <DatePicker
//           onChange={(e)=>handleChange(e, 'date', 'start')}
//           disabled={disabled}
//           isRangePicker={isRangePicker}
//           isDoubleView={isDoubleView}
//           locale={locale}
//           placeholder={placeholder.date}
//           dateTimeStart={dateTimeStart}
//           setDateTimeStart={setDateTimeStart}
//         />
//         <TimePicker is12Hour={is12Hour}
//           onChange={(e)=>handleChange(e, 'time', 'start')}
//           disabled={disabled}
//           placeholder={placeholder.time}
//           isTimeRange={isTimeRange}
//         />
//       </Layout.Flex>

//       {isDoublePicker && (
//       <>
//         <NextIcon name="Interface-arrow-right" />

//         <Layout.Flex alignItems="center" gap="6px" ml="-1px">
//           <DatePicker
//             onChange={(e)=>handleChange(e, 'date', 'end')}
//             disabled={disabled}
//             locale={locale}
//             placeholder={placeholder.date}
//             isRangePicker={isRangePicker}
//             isDoubleView={isDoubleView}
//             dateTimeEnd={dateTimeEnd}
//             setDateTimeEnd={setDateTimeEnd}
//           />
//           <TimePicker
//             is12Hour={is12Hour}
//             onChange={(e)=>handleChange(e, 'time', 'end')}
//             disabled={disabled}
//             placeholder={placeholder.time}
//             isTimeRange={isTimeRange}
//           />
//         </Layout.Flex>
//       </>
//       )}
//     </DateTimeContainer>
//   );
// };

// DateTimePicker.propTypes = {
//   onChange: PropTypes.func,
//   disabled: PropTypes.bool,
//   isDoubleView: PropTypes.bool,
//   isRangePicker: PropTypes.bool,
//   is12Hour: PropTypes.bool,
//   isDoublePicker: PropTypes.bool,
//   locale: PropTypes.string,
//   placeholder: PropTypes.shape({
//     date: PropTypes.string,
//     time: PropTypes.string,
//   }),
//   isTimeRange: PropTypes.bool,
// };

// DateTimePicker.defaultProps = {
//   onChange: () => {},
//   disabled: false,
//   isDoubleView: false,
//   isRangePicker: false,
//   is12Hour: false,
//   isDoublePicker: true,
//   locale: 'en-US',
//   placeholder: {
//     date:'yyyy/mm/dd',
//     time: 'hh:mm',
//   },
//   isTimeRange: false,
// };

// export default DateTimePicker;
const DateTimePicker = ({
  input: { value = {}, onChange },
  disabled,
  isDoublePicker,
  isDoubleView,
  isRangePicker,
  is12Hour,
  locale,
  placeholder,
  isTimeRange,
}) => {
  // Ensure the initial structure of value
  const initialValue = {
    date: isDoublePicker ? [new Date(), new Date()] : new Date(),
    time: isDoublePicker ? [null, null] : null,
    ...value, // Merge with existing value if passed
  };

  // Handle changes to value
  const handleChange = (val, type, position) => {
    const newValue = { ...initialValue };

    if (isDoublePicker) {
      if (!Array.isArray(newValue[type])) {
        newValue[type] = [null, null];
      }
      if (position === 'start') {
        newValue[type][0] = val;
      } else if (position === 'end') {
        newValue[type][1] = val;
      }
    } else {
      newValue[type] = val;
    }

    onChange(newValue);
  };

  return (
    <DateTimeContainer>
      <Layout.Flex alignItems="center" gap="6px">
        <DatePicker
          onChange={(e) => handleChange(e, 'date', 'start')}
          disabled={disabled}
          isRangePicker={isRangePicker}
          isDoubleView={isDoubleView}
          locale={locale}
          placeholder={placeholder?.date}
        />
        <TimePicker
          is12Hour={is12Hour}
          onChange={(e) => handleChange(e, 'time', 'start')}
          disabled={disabled}
          placeholder={placeholder?.time}
          isTimeRange={isTimeRange}
        />
      </Layout.Flex>

      {isDoublePicker && (
        <>
          <NextIcon name="Interface-arrow-right" />

          <Layout.Flex alignItems="center" gap="6px" ml="-1px">
            <DatePicker
              onChange={(e) => handleChange(e, 'date', 'end')}
              disabled={disabled}
              locale={locale}
              placeholder={placeholder?.date}
              isRangePicker={isRangePicker}
              isDoubleView={isDoubleView}
            />
            <TimePicker
              is12Hour={is12Hour}
              onChange={(e) => handleChange(e, 'time', 'end')}
              disabled={disabled}
              placeholder={placeholder?.time}
              isTimeRange={isTimeRange}
            />
          </Layout.Flex>
        </>
      )}
    </DateTimeContainer>
  );
};

// Set prop types
DateTimePicker.propTypes = {
  input: PropTypes.shape({
    value: PropTypes.object,
    onChange: PropTypes.func.isRequired,
  }),
  disabled: PropTypes.bool,
  isDoubleView: PropTypes.bool,
  isRangePicker: PropTypes.bool,
  is12Hour: PropTypes.bool,
  isDoublePicker: PropTypes.bool,
  locale: PropTypes.string,
  placeholder: PropTypes.shape({
    date: PropTypes.string,
    time: PropTypes.string,
  }),
  isTimeRange: PropTypes.bool,
};

// Set default props
DateTimePicker.defaultProps = {
  input: {
    value: {
      date: new Date(),
      time: null,
    },
    onChange: () => {},
  },
  disabled: false,
  isDoubleView: false,
  isRangePicker: false,
  is12Hour: false,
  isDoublePicker: false,
  locale: 'en-US',
  placeholder: {
    date:'yyyy/mm/dd',
    time: 'hh:mm',
  },
  isTimeRange: false,
};

export default DateTimePicker;
