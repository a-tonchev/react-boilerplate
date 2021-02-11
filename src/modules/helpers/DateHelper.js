export default class DateHelper {
  static setBeginningOfDay(date) {
    return new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
    );
  }

  static setBeginningOfHour(date) {
    return new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      date.getHours(),
    );
  }

  static setFirstDayOfMonth(date) {
    return new Date(
      date.getFullYear(),
      date.getMonth(),
    );
  }

  static getNow() {
    return new Date(Date.now());
  }

  static getBefore(dateObject) {
    return new Date(Date.now() - this.getDateBase(dateObject));
  }

  static getAfter(dateObject) {
    return new Date(Date.now() + this.getDateBase(dateObject));
  }

  static getDateAt(dateObject) {
    return new Date(this.getDateBase(dateObject));
  }

  static getDateToDay(dateObject) {
    return new Date(dateObject.getFullYear(), dateObject.getMonth(), dateObject.getDate());
  }

  static getTimestamp() {
    return Date.now();
  }

  static getTimestampBefore(dateObject) {
    return this.getTimestamp() - this.getDateBase(dateObject);
  }

  static getTimestampAfter(dateObject) {
    return this.getTimestamp() + this.getDateBase(dateObject);
  }

  static getDateBase({
    seconds = 0,
    minutes = 0,
    hours = 0,
    days = 0,
    weeks = 0,
    months = 0,
    years = 0,
  }) {
    return (
      this.getSecondsBase(seconds) +
      this.getMinutesBase(minutes) +
      this.getHoursBase(hours) +
      this.getDaysBase(days) +
      this.getWeeksBase(weeks) +
      this.getMonthsBase(months) +
      this.getYearsBase(years)
    );
  }

  static getSecondsBase(seconds = 0) {
    return seconds * 1000;
  }

  static getMinutesBase(minutes = 0) {
    return minutes * 60 * 1000;
  }

  static getHoursBase(hours = 0) {
    return hours * 60 * 60 * 1000;
  }

  static getDaysBase(days = 0) {
    return days * 24 * 60 * 60 * 1000;
  }

  static getWeeksBase(weeks = 0) {
    return weeks * 7 * 24 * 60 * 60 * 1000;
  }

  static getMonthsBase(months = 0) {
    return months * 30 * 24 * 60 * 60 * 1000;
  }

  static getYearsBase(years = 0) {
    return years * 365 * 24 * 60 * 60 * 1000;
  }
}
