/**
 * 1. dateToString
 * (DD-MM-YYYY)
 *
 * 2. stringToDate
 *
 * using moment lib
 */

export function DateToString(date: Date) {
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

export function StringToDate(text: string) {
    return (new Date(parseInt(text[6]+text[7]+text[8]+text[9]), parseInt(text[3]+text[4])-1, parseInt(text[0]+text[1])));
}