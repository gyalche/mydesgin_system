export const getDaysInMonth = (date) => {
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

export function convertToJapaneseYear(year) {
  // Check for Reiwa era (starting from May 1, 2019)
  if (year >= 2019) {
    const reiwaYear = year - 2018;
    return `Reiwa ${reiwaYear} (令和${reiwaYear}年)`;
  } 
  // Check for Heisei era (1989 - 2019)
  else if (year >= 1989) {
    const heiseiYear = year - 1988;
    return `Heisei ${heiseiYear} (平成${heiseiYear}年)`;
  } 
  // Check for Showa era (1926 - 1989)
  else if (year >= 1926) {
    const showaYear = year - 1925;
    return `Showa ${showaYear} (昭和${showaYear}年)`;
  } 
  // Check for Taisho era (1912 - 1926)
  else if (year >= 1912) {
    const taishoYear = year - 1911;
    return `Taisho ${taishoYear} (大正${taishoYear}年)`;
  } 
  // Check for Meiji era (1868 - 1912)
  else if (year >= 1868) {
    const meijiYear = year - 1867;
    return `Meiji ${meijiYear} (明治${meijiYear}年)`;
  } 
  else return;
}
