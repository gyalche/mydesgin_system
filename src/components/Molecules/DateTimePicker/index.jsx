import Date from './DateAndTime/DatePicker';
import Time from './DateAndTime/TimePicker';
import DateTime from './DateAndTime/DateTimePicker';

const DatePicker = Date;
DatePicker.Time = Time;
DatePicker.DateTime = DateTime;

export default DatePicker;
