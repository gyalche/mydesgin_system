import { default as Date } from './DatePicker';
import { default as Time } from './TimePicker';
import { default as DateTime } from './DateTimePicker';


const DatePicker = Date;
DatePicker.Time = Time;
DatePicker.DateTime = DateTime;

export default DatePicker;
