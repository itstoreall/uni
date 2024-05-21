export type IntelDateTimeFormat = Intl.DateTimeFormatOptions;

export const dateConfig = {
  format: {
    date: {
      label: 'date',
      value: {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        timeZone: 'Europe/Kiev'
      } as IntelDateTimeFormat
    },
    time: {
      label: 'time',
      value: {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZone: 'Europe/Kiev'
      } as IntelDateTimeFormat
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
      } as IntelDateTimeFormat
    }
  }
};

const { date, time, dateAndTime } = dateConfig.format;

const setIntDateFormat = (format?: string) => {
  switch (format) {
    case date.label:
      return date.value;

    case time.label:
      return time.value;

    default:
      return dateAndTime.value;
  }
};

export const getIntlDate = (format?: string) =>
  new Intl.DateTimeFormat('en-GB', setIntDateFormat(format)).format(new Date());

/* 

------ date string to a timestamp:
const dateString = '21 May 2024 19:00:53';
const date = new Date(dateString);
const timestamp = date.getTime();

*/
