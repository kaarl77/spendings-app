/**
 * 1. dateToString
 * (DD-MM-YYYY)
 *
 * 2. stringToDate
 *
 * using moment lib
 */
import moment, {Moment} from "moment";

const DATE_FORMAT: string = "DD-MM-YYYY";

export function StringToDate(string: string, dateFormat: string = DATE_FORMAT) {
  return moment(string, dateFormat);
}

export function DateToString(date: Moment, dateFormat: string = DATE_FORMAT) {
  return date.format(dateFormat);
}

function DateToString_deprecated(date: Date) {
  let day: string, month: string;

  if (date.getDate() <= 9) {
    day = `0${date.getDate()}`;
  } else {
    day = `${date.getDate()}`
  }

  if (date.getMonth() + 1 <= 9) {
    month = `0${date.getMonth() + 1}`;
  } else {
    month = `${date.getMonth() + 1}`;
  }

  return `${day}-${month}-${date.getFullYear()}`
}

function StringToDate_deprecated(text: string) {
  return (new Date(parseInt(text[6] + text[7] + text[8] + text[9]), parseInt(text[3] + text[4]) - 1, parseInt(text[0] + text[1])));
}