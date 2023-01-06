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