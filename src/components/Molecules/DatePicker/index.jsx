import { default as Date } from './Date/DatePicker';
import { default as Time } from './Time/TimePicker';
import { default as DateTime } from './DateTimePicker';
import { default as DateRangePicker } from './Date/DateRangePicker';
import { default as TimeRangePicker} from './Time/TimeRangePicker';

const DatePicker = Date;
DatePicker.Time = Time;
DatePicker.DateTime = DateTime;
DatePicker.DateRangePicker = DateRangePicker;
DatePicker.TimeRangePicker = TimeRangePicker;

export default DatePicker;
