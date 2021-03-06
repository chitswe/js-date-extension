import  * as fecha from "fecha";
import javascript_time_ago from "javascript-time-ago";
import DateUti from "./date-uti";
import * as en from "javascript-time-ago/locale/en";
const Preference = {
  format: {
    date: {
      short: "DD/MM/YYYY",
      long: "DD/MM/YYYY hh:mm:ss A"
    },
    time: {
      short: "hh:mm A",
      long: "hh:mm:ss A"
    }
  }
};
type DatePreference = {
  date?: {
    short?: string;
    long?: string;
  };
  time?: {
    short: string;
    long: string;
  };
};
const setPreference = (preference: DatePreference) => {
  const { date, time } = preference;
  const { short: dShort, long: dLong } = date ? date : Preference.format.date;
  const { short: tShort, long: tLong } = time ? time : Preference.format.time;
  Preference.format.date = {
    short: dShort ? dShort : Preference.format.date.short,
    long: dLong ? dLong : Preference.format.date.long
  };
  Preference.format.time = {
    short: tShort ? tShort : Preference.format.time.short,
    long: tLong ? tLong : Preference.format.time.long
  };
};
javascript_time_ago.addLocale(en);
const timeAgo = new javascript_time_ago("en-US");
declare global {
  interface Date {
    dateOnly(): Date;
    toDateOnlyJSON(): string;
    startOfDay(): Date;
    clone(): Date;
    endOfDay(): Date;
    merge(source: Date): Date;
    quarter(): number;
    addDays(days: number): Date;
    daysInMonth(): Date;
    startOfMonth(): Date;
    endOfMonth(): Date;
    startOfQuarter(): Date;
    endOfQuarter(): Date;
    startOfWeek(): Date;
    endOfWeek(): Date;
    startOfYear(): Date;
    endOfYear(): Date;
    yesterday(): Date;
    lastWeek(): Date;
    lastMonth(): Date;
    lastYear(): Date;
    lastQuarter(): Date;
    tomorrow(): Date;
    nextWeek(): Date;
    nextMonth(): Date;
    nextQuarter(): Date;
    nextYear(): Date;
    formatAsShortDate(): string;
    formatAsLongDate(): string;
    formatAsShortTime(): string;
    formatAsLongTime(): string;
    assumeUTCAsLocal(): Date;
    assumeLocalAsUTC(): Date;
    timeAgo(): string;
    uniqueNumber(): number;
    format(format: string): string;
  }
}

Date.prototype.dateOnly = function(): Date {
  this.setHours(0, 0, 0, 0);
  return this;
};

Date.prototype.toDateOnlyJSON = function(): string {
  return fecha.format(this, "YYYY-MM-DD");
};

Date.prototype.format = function(format: string): string {
  return fecha.format(this, format);
};

Date.prototype.startOfDay = function() {
  this.setHours(0);
  this.setMinutes(0);
  this.setSeconds(0);
  this.setMilliseconds(1);
  return this;
};
Date.prototype.clone = function() {
  return new Date().merge(this);
};
Date.prototype.endOfDay = function() {
  this.setHours(23);
  this.setMinutes(59);
  this.setSeconds(59);
  this.setMilliseconds(999);
  return this;
};
Date.prototype.merge = function(source: Date) {
  this.setYear(source.getFullYear());
  this.setMonth(source.getMonth());
  this.setDate(source.getDate());
  this.setHours(source.getHours());
  this.setMinutes(source.getMinutes());
  this.setSeconds(source.getSeconds());
  this.setMilliseconds(source.getMilliseconds());
  return this;
};

Date.prototype.quarter = function() {
  const month: number = this.getMonth();
  let quarter: number = Number.parseInt((month / 3).toString(), 10);
  quarter++;
  return quarter;
};
Date.prototype.addDays = function(days: number) {
  this.setDate(this.getDate() + days);
  return this;
};
Date.prototype.daysInMonth = function() {
  const resultDate = this.startOfMonth();
  resultDate.setMonth(resultDate.getMonth() + 1);
  resultDate.setDate(resultDate.getDate() - 1);
  return resultDate.getDate();
};
Date.prototype.startOfMonth = function() {
  this.setDate(1);
  return this.startOfDay();
};
Date.prototype.endOfMonth = function() {
  const days: number = this.daysInMonth();
  return this.startOfMonth()
    .addDays(days - 1)
    .endOfDay();
};
Date.prototype.startOfQuarter = function() {
  const q = this.quarter();
  const m = q * 3 - 3;
  this.startOfMonth();
  this.setMonth(m);
  return this;
};

Date.prototype.endOfQuarter = function() {
  const q = this.quarter();
  const m = q * 3 - 1;
  this.startOfMonth();
  this.setMonth(m);
  return this.endOfMonth();
};

Date.prototype.startOfWeek = function() {
  this.setDate(this.getDate() - this.getDay());
  return this.startOfDay();
};
Date.prototype.endOfWeek = function() {
  return this.startOfWeek()
    .addDays(6)
    .endOfDay();
};
Date.prototype.startOfYear = function() {
  this.startOfMonth();
  this.setMonth(0);
  return this;
};
Date.prototype.endOfYear = function() {
  this.startOfMonth();
  this.setMonth(11);
  return this.endOfMonth();
};

Date.prototype.yesterday = function() {
  return this.addDays(-1);
};
Date.prototype.lastWeek = function() {
  return this.addDays(-7);
};
Date.prototype.lastMonth = function() {
  this.startOfMonth();
  this.setMonth(this.getMonth() - 1);
  return this;
};
Date.prototype.lastYear = function() {
  this.startOfYear();
  this.setYear(this.getFullYear() - 1);
  return this;
};
Date.prototype.lastQuarter = function() {
  this.startOfQuarter();
  this.setMonth(this.getMonth() - 3);
  return this;
};
Date.prototype.tomorrow = function() {
  return this.addDays(1);
};
Date.prototype.nextWeek = function() {
  return this.addDays(7);
};
Date.prototype.nextMonth = function() {
  this.startOfMonth();
  this.setMonth(this.getMonth() + 1);
  return this;
};
Date.prototype.nextQuarter = function() {
  this.startOfQuarter();
  this.setMonth(this.getMonth() + 3);
  return this;
};
Date.prototype.nextYear = function() {
  this.startOfYear();
  this.setYear(this.getFullYear() + 1);
  return this;
};

Date.prototype.formatAsShortDate = function() {
  return fecha.format(this, Preference.format.date.short);
};
Date.prototype.formatAsLongDate = function() {
  return fecha.format(this, Preference.format.date.long);
};
Date.prototype.formatAsShortTime = function() {
  return fecha.format(this, Preference.format.time.short);
};
Date.prototype.formatAsLongTime = function() {
  return fecha.format(this, Preference.format.time.long);
};
Date.prototype.toDateOnlyJSON = function() {
  return fecha.format(this, "YYYY-MM-DD");
};

Date.prototype.assumeUTCAsLocal = function() {
  return new Date(
    this.toJSON()
      .replace("T", " ")
      .replace("Z", "")
  );
};

Date.prototype.assumeLocalAsUTC = function() {
  return new Date(this.getTime() - this.getTimezoneOffset() * 60000);
};

Date.prototype.timeAgo = function() {
  return timeAgo.format(this);
};
Date.prototype.uniqueNumber = function() {
  const num = this.valueOf();
  if (num <= DateUti._datePreviousUniqueNumber) {
    DateUti._datePreviousUniqueNumber++;
    return DateUti._datePreviousUniqueNumber;
  } else {
    DateUti._datePreviousUniqueNumber = num;
    return num;
  }
};

export { setPreference, DatePreference };
