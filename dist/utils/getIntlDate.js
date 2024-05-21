"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIntlDate = exports.dateConfig = void 0;
exports.dateConfig = {
    format: {
        date: {
            label: 'date',
            value: {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
                timeZone: 'Europe/Kiev'
            }
        },
        time: {
            label: 'time',
            value: {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                timeZone: 'Europe/Kiev'
            }
        },
        dateAndTime: {
            label: 'dateAndTime',
            value: {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                day: '2-digit',
                month: 'long',
                year: 'numeric',
                timeZone: 'Europe/Kiev'
            }
        }
    }
};
const { date, time, dateAndTime } = exports.dateConfig.format;
const setIntDateFormat = (format) => {
    switch (format) {
        case date.label:
            return date.value;
        case time.label:
            return time.value;
        default:
            return dateAndTime.value;
    }
};
const getIntlDate = (format) => new Intl.DateTimeFormat('en-GB', setIntDateFormat(format)).format(new Date());
exports.getIntlDate = getIntlDate;
/*

------ date string to a timestamp:
const dateString = '21 May 2024 19:00:53';
const date = new Date(dateString);
const timestamp = date.getTime();

*/
//# sourceMappingURL=getIntlDate.js.map