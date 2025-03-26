import DatePickerComponent from './Components/DatePicker';
import TimePickerComponent from './Components/TimePicker';
import DateTimePickerComponent from './Components/DateTimePicker';

const DatePicker = DatePickerComponent;
DatePicker.displayName = 'DatePicker';

DatePicker.Time = TimePickerComponent;
DatePicker.Time.displayName = 'TimePicker';
DatePicker.DateTime = DateTimePickerComponent;
DatePicker.DateTime.displayName = 'DateTimePicker';

export default DatePicker;
