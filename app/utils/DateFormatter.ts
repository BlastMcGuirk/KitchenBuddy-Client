/**
 * Format a date to show the month and year
 * @param date The date object
 * @returns A formatted date
 */
export function MonthYear(date: Date) {
    return date.getMonth() + "/" + date.getFullYear();
}