import { default as Date } from './DatePicker';
import { default as Time } from './TimePicker';
import { default as DateTime } from './DateTimePicker';
import { default as DateRangePicker } from './DateRangePicker';

const DatePicker = Date;
DatePicker.Time = Time;
DatePicker.DateTime = DateTime;
DatePicker.DateRangePicker = DateRangePicker;

export default DatePicker;
