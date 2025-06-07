import { easter } from "date-easter"

import { cantonHolidays, nationalHolidays } from "./constants"
import type { HolidayRowType } from "./types"
import { HolidayType } from "./enums"

export function getMonthStr(month: number, leadingZero: boolean = true): string {
    const monthStr = month.toString()
    if (leadingZero) {
        return month < 10 ? "0" + month : monthStr
    } else {
        return monthStr
    }
}

export function getDayStr(day: number, leadingZero: boolean = true): string {
    const dayStr = day.toString()
    if (leadingZero) {
        return day < 10 ? "0" + day : dayStr
    } else {
        return dayStr
    }
}

export function getWeekdayStr(weekday: number): string {
    const weekdays = ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"]
    return weekdays[weekday]
}

export function getMonthName(month: number): string {
    const monthNames = [
        "Januar",
        "Februar",
        "März",
        "April",
        "Mai",
        "Juni",
        "Juli",
        "August",
        "September",
        "Oktober",
        "November",
        "Dezember"
    ]
    return monthNames[month]
}

function _getHolidayRow(name: string, date: string | null, type: HolidayType, year: number): HolidayRowType {
    let tempDate

    if (date) {
        tempDate = new Date(`${year}-${date}`)
    } else {
        const easterDateStr = easter(year).toString()
        tempDate = new Date(easterDateStr)

        switch (name) {
            case "Karfreitag":
                tempDate.setDate(tempDate.getDate() - 2)
                break

            case "Ostermontag":
                tempDate.setDate(tempDate.getDate() + 1)
                break

            case "Auffahrt":
                tempDate.setDate(tempDate.getDate() + 39)
                break

            case "Pfingstmontag":
                tempDate.setDate(tempDate.getDate() + 50)
                break

            case "Fronleichnam":
                tempDate.setDate(tempDate.getDate() + 60)
                break

            default:
                break
        }
    }

    const month = tempDate.getMonth()
    const colDate = `${getDayStr(tempDate.getDate())}.${getMonthStr(month + 1)}.${tempDate.getFullYear()}`
    const colWeekday = getWeekdayStr(tempDate.getDay())
    const colMonthName = getMonthName(month)

    return { date: colDate, name, weekday: colWeekday, type, monthName: colMonthName }
}

export function getHolidayRowsFromCanton(cantonID: string, year: number): HolidayRowType[] {
    const holidays = cantonHolidays[cantonID]

    let holidayRows: HolidayRowType[] = []
    holidays.forEach(({ name, date, type }) => {
        holidayRows.push(_getHolidayRow(name, date, type, year))
    })

    return holidayRows
}

export function getNationalHolidayRows(year: number): HolidayRowType[] {
    let holidayRows: HolidayRowType[] = []
    nationalHolidays.forEach(({ name, date, type }) => {
        holidayRows.push(_getHolidayRow(name, date, type, year))
    })

    return holidayRows
}

export function getYearRange(): number[] {
    const currentYear = new Date().getFullYear()

    let years = []
    for (let i = 0; i < 26; i++) {
        // range from now: -5 years, +20 years
        let year = currentYear - 5 + i
        years.push(year)
    }

    return years
}

export function isInAlphabet(key: string): boolean {
    return /^[a-z]$/.test(key)
}
