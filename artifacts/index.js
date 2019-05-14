"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fecha_1 = __importDefault(require("fecha"));
var javascript_time_ago_1 = __importDefault(require("javascript-time-ago"));
var date_uti_1 = __importDefault(require("./date-uti"));
var en_1 = __importDefault(require("javascript-time-ago/locale/en"));
var Preference = {
    format: {
        currency: {
            symbol: "MMK",
            format: {
                pos: "%v %s ",
                neg: "(%v %s)",
                zero: "-- %s"
            },
            decimal: ".",
            thousand: ",",
            precision: 0 // decimal places
        },
        number: {
            precision: 2,
            thousand: ",",
            decimal: "."
        },
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
javascript_time_ago_1.default.addLocale(en_1.default);
var timeAgo = new javascript_time_ago_1.default("en-US");
Date.prototype.dateOnly = function () {
    this.setHours(0, 0, 0, 0);
    return this;
};
Date.prototype.toDateOnlyJSON = function () {
    return fecha_1.default.format(this, "YYYY-MM-DD");
};
Date.prototype.startOfDay = function () {
    this.setHours(0);
    this.setMinutes(0);
    this.setSeconds(0);
    this.setMilliseconds(1);
    return this;
};
Date.prototype.clone = function () {
    return new Date().merge(this);
};
Date.prototype.endOfDay = function () {
    this.setHours(23);
    this.setMinutes(59);
    this.setSeconds(59);
    this.setMilliseconds(999);
    return this;
};
Date.prototype.merge = function (source) {
    this.setYear(source.getFullYear());
    this.setMonth(source.getMonth());
    this.setDate(source.getDate());
    this.setHours(source.getHours());
    this.setMinutes(source.getMinutes());
    this.setSeconds(source.getSeconds());
    this.setMilliseconds(source.getMilliseconds());
    return this;
};
Date.prototype.quarter = function () {
    var month = this.getMonth();
    var quarter = Number.parseInt((month / 3).toString(), 10);
    quarter++;
    return quarter;
};
Date.prototype.addDays = function (days) {
    this.setDate(this.getDate() + days);
    return this;
};
Date.prototype.daysInMonth = function () {
    var resultDate = this.startOfMonth();
    resultDate.setMonth(resultDate.getMonth() + 1);
    resultDate.setDate(resultDate.getDate() - 1);
    return resultDate.getDate();
};
Date.prototype.startOfMonth = function () {
    this.setDate(1);
    return this.startOfDay();
};
Date.prototype.endOfMonth = function () {
    var days = this.daysInMonth();
    return this.startOfMonth()
        .addDays(days - 1)
        .endOfDay();
};
Date.prototype.startOfQuarter = function () {
    var q = this.quarter();
    var m = q * 3 - 3;
    this.startOfMonth();
    this.setMonth(m);
    return this;
};
Date.prototype.endOfQuarter = function () {
    var q = this.quarter();
    var m = q * 3 - 1;
    this.startOfMonth();
    this.setMonth(m);
    return this.endOfMonth();
};
Date.prototype.startOfWeek = function () {
    this.setDate(this.getDate() - this.getDay());
    return this.startOfDay();
};
Date.prototype.endOfWeek = function () {
    return this.startOfWeek()
        .addDays(6)
        .endOfDay();
};
Date.prototype.startOfYear = function () {
    this.startOfMonth();
    this.setMonth(0);
    return this;
};
Date.prototype.endOfYear = function () {
    this.startOfMonth();
    this.setMonth(11);
    return this.endOfMonth();
};
Date.prototype.yesterday = function () {
    return this.addDays(-1);
};
Date.prototype.lastWeek = function () {
    return this.addDays(-7);
};
Date.prototype.lastMonth = function () {
    this.startOfMonth();
    this.setMonth(this.getMonth() - 1);
    return this;
};
Date.prototype.lastYear = function () {
    this.startOfYear();
    this.setYear(this.getFullYear() - 1);
    return this;
};
Date.prototype.lastQuarter = function () {
    this.startOfQuarter();
    this.setMonth(this.getMonth() - 3);
    return this;
};
Date.prototype.tomorrow = function () {
    return this.addDays(1);
};
Date.prototype.nextWeek = function () {
    return this.addDays(7);
};
Date.prototype.nextMonth = function () {
    this.startOfMonth();
    this.setMonth(this.getMonth() + 1);
    return this;
};
Date.prototype.nextQuarter = function () {
    this.startOfQuarter();
    this.setMonth(this.getMonth() + 3);
    return this;
};
Date.prototype.nextYear = function () {
    this.startOfYear();
    this.setYear(this.getFullYear() + 1);
    return this;
};
Date.prototype.formatAsShortDate = function () {
    return fecha_1.default.format(this, Preference.format.date.short);
};
Date.prototype.formatAsLongDate = function () {
    return fecha_1.default.format(this, Preference.format.date.long);
};
Date.prototype.formatAsShortTime = function () {
    return fecha_1.default.format(this, Preference.format.time.short);
};
Date.prototype.formatAsLongTime = function () {
    return fecha_1.default.format(this, Preference.format.time.long);
};
Date.prototype.toDateOnlyJSON = function () {
    return fecha_1.default.format(this, "YYYY-MM-DD");
};
Date.prototype.assumeUTCAsLocal = function () {
    return new Date(this.toJSON()
        .replace("T", " ")
        .replace("Z", ""));
};
Date.prototype.assumeLocalAsUTC = function () {
    return new Date(this.getTime() - this.getTimezoneOffset() * 60000);
};
Date.prototype.timeAgo = function () {
    return timeAgo.format(this);
};
Date.prototype.uniqueNumber = function () {
    var num = this.valueOf();
    if (num <= date_uti_1.default._datePreviousUniqueNumber) {
        date_uti_1.default._datePreviousUniqueNumber++;
        return date_uti_1.default._datePreviousUniqueNumber;
    }
    else {
        date_uti_1.default._datePreviousUniqueNumber = num;
        return num;
    }
};
//# sourceMappingURL=index.js.map