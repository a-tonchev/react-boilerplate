const DateHelper = {
  setBeginningOfDay(date) {
    return new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
    );
  },

  setBeginningOfHour(date) {
    return new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      date.getHours(),
    );
  },

  setFirstDayOfMonth(date) {
    return new Date(
      date.getFullYear(),
      date.getMonth(),
    );
  },

  getNow() {
    return new Date(Date.now());
  },

  getBefore(dateObject) {
    return new Date(Date.now() - DateHelper.getDateBase(dateObject));
  },

  getAfter(dateObject) {
    return new Date(Date.now() + DateHelper.getDateBase(dateObject));
  },

  getDateAt(dateObject) {
    return new Date(DateHelper.getDateBase(dateObject));
  },

  getDateToDay(dateObject) {
    return new Date(dateObject.getFullYear(), dateObject.getMonth(), dateObject.getDate());
  },

  getTimestamp() {
    return Date.now();
  },

  getTimestampBefore(dateObject) {
    return DateHelper.getTimestamp() - DateHelper.getDateBase(dateObject);
  },

  getTimestampAfter(dateObject) {
    return DateHelper.getTimestamp() + DateHelper.getDateBase(dateObject);
  },

  getDateBase({
    seconds = 0,
    minutes = 0,
    hours = 0,
    days = 0,
    weeks = 0,
    months = 0,
    years = 0,
  }) {
    return (
      DateHelper.getSecondsBase(seconds) +
      DateHelper.getMinutesBase(minutes) +
      DateHelper.getHoursBase(hours) +
      DateHelper.getDaysBase(days) +
      DateHelper.getWeeksBase(weeks) +
      DateHelper.getMonthsBase(months) +
      DateHelper.getYearsBase(years)
    );
  },

  getSecondsBase(seconds = 0) {
    return seconds * 1000;
  },

  getMinutesBase(minutes = 0) {
    return minutes * 60 * 1000;
  },

  getHoursBase(hours = 0) {
    return hours * 60 * 60 * 1000;
  },

  getDaysBase(days = 0) {
    return days * 24 * 60 * 60 * 1000;
  },

  getWeeksBase(weeks = 0) {
    return weeks * 7 * 24 * 60 * 60 * 1000;
  },

  getMonthsBase(months = 0) {
    return months * 30 * 24 * 60 * 60 * 1000;
  },

  getYearsBase(years = 0) {
    return years * 365 * 24 * 60 * 60 * 1000;
  },
};

export default DateHelper;
