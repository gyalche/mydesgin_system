export const getDaysInMonth = (date) => {
  if(!(date instanceof Date) || isNaN(date)){
    throw new Error('Invalid Date Provided');
  }
    const year = date.getFullYear();
    const month = date.getMonth();
    
    // Get the first day of the month
    const firstDayOfMonth = new Date(year, month, 1).getDay();

    // Get the last day of the month
    const lastDateOfMonth = new Date(year, month + 1, 0);

    const daysInMonth = lastDateOfMonth.getDate();
    
    const days = [];
    
    // Add the last few days of the previous month
    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
      days.push({date: new Date(year, month, -i), isCurrentMonth: false});
    }
    
    // Add all days in the current month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({date: new Date(year, month, i), isCurrentMonth: true});
    }
    
    // Add the first few days of the next month
    const lastDayOfMonth = lastDateOfMonth.getDay();
    for (let i = 1; i < 7 - lastDayOfMonth; i++) {
      days.push({date: new Date(year, month + 1, i), isCurrentMonth: false});
    }
    return days;
  };

export const normalizeDate = (date) => new Date(date).setHours(0, 0, 0, 0);

export const getLocalizedMonthName = (date, locale) => {
  return new Intl.DateTimeFormat(locale, { month: 'long' }).format(date);
};

export const roundToNearestStep = (minute, step) => {
  return Math.floor(minute / step) * step;
};

export function createDateFromTime(timeString) {
  const [time, amPm] = timeString.split(' ');
  const [hours, minutes, seconds] = time.split(':').map(num => parseInt(num));

  let hour = hours;
  if (amPm === 'PM' && hour < 12) {
    hour += 12;
  } else if (amPm === 'AM' && hour === 12) {
    hour = 0;
  }
  const baseDate = new Date();
  baseDate.setHours(hour);
  baseDate.setMinutes(minutes);
  baseDate.setSeconds(seconds);
  baseDate.setMilliseconds(0);

  return baseDate;
};

export const  combineDateAndTime = (startDate, startTime) => {
  if (!startDate || !startTime) {
    throw new Error('Both startDate and startTime are required.');
  }
  const updatedDate = new Date(startDate);

  updatedDate.setHours(startTime.getHours());
  updatedDate.setMinutes(startTime.getMinutes());
  updatedDate.setSeconds(startTime.getSeconds());
  updatedDate.setMilliseconds(startTime.getMilliseconds());

  return updatedDate;
};

