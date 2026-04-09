import DatePickerComponent from './Components/DatePicker';
import TimePickerComponent from './Components/TimePicker';
import DateTimePickerComponent from './Components/DateTimePicker';

/**
 * Compound date picker API used by consumers of the published package.
 *
 * @type {typeof DatePickerComponent & {
 *   Time: typeof TimePickerComponent,
 *   DateTime: typeof DateTimePickerComponent
 * }}
 */
const DatePicker = DatePickerComponent;
DatePicker.displayName = 'DatePicker';

DatePicker.Time = TimePickerComponent;
DatePicker.Time.displayName = 'TimePicker';
DatePicker.DateTime = DateTimePickerComponent;
DatePicker.DateTime.displayName = 'DateTimePicker';

export default DatePicker;
