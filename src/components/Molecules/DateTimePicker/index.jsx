import DatePickerComponent from './Components/DatePicker';
import TimePickerComponent from './Components/TimePicker';
import DateTimePickerComponent from './Components/DateTimePicker';

const DatePicker = DatePickerComponent;
DatePicker.Time = TimePickerComponent;
DatePicker.DateTime = DateTimePickerComponent;

export default DatePicker;
