import { easter } from "date-easter"

import { cantonHolidays, nationalHolidays, municHolidays } from "./constants"
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
    let tempDate = new Date(1900)

    if (date) {
        tempDate = new Date(`${year}-${date}`)
    } else {
        const easterRelated = [
            "Karfreitag",
            "Ostermontag",
            "Auffahrt",
            "Pfingstmontag",
            "Fronleichnam",
            "Fronleichnam (Herrgottstag)",
            "Fasnacht",
            "Fasnachtsmontag",
            "Fasnachtsdienstag",
            "Fasnachtsmittwoch",
            "Aschermittwoch"
        ]
        if (easterRelated.includes(name)) {
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
                case "Fronleichnam (Herrgottstag)":
                    tempDate.setDate(tempDate.getDate() + 60)
                    break

                case "Aschermittwoch":
                    tempDate.setDate(tempDate.getDate() - 46)
                    break

                case "Fasnacht":
                    tempDate.setDate(tempDate.getDate() - 46) // Ash Wednesday
                    // Monday after Ash Wednesday
                    tempDate.setDate(tempDate.getDate() + 5)

                    break

                case "Fasnachtsmontag":
                    tempDate.setDate(tempDate.getDate() - 46) // Ash Wednesday
                    // Monday before Ash Wednesday
                    tempDate.setDate(tempDate.getDate() - 2)
                    break

                case "Fasnachtsdienstag":
                    tempDate.setDate(tempDate.getDate() - 46) // Ash Wednesday
                    // Tuesday before Ash Wednesday
                    tempDate.setDate(tempDate.getDate() - 1)
                    break

                case "Fasnachtsmittwoch":
                    tempDate.setDate(tempDate.getDate() - 46) // Ash Wednesday
                    // Wednesday after Ash Wednesday
                    tempDate.setDate(tempDate.getDate() + 7)
                    break

                default:
                    break
            }
        } else {
            switch (name) {
                case "Näfelser Fahrt":
                    tempDate = getNthWeekdayOfMonth(year, 4, 4, 1)
                    break

                case "Sechseläuten":
                    tempDate = getNthWeekdayOfMonth(year, 4, 1, 3)
                    const easterDate = new Date(easter(year).toString())
                    const easterMonday = new Date(easterDate.getDate() + 1)

                    if (tempDate === easterMonday) {
                        // if Sechseläuten is on Easter Monday it's on the 4th Monday of April
                        tempDate = getNthWeekdayOfMonth(year, 4, 1, 4)
                    }
                    break

                case "Genfer Bettag":
                    tempDate = getNthWeekdayOfMonth(year, 9, 7, 1)
                    tempDate = new Date(tempDate.setDate(tempDate.getDate() + 4))
                    break

                case "Bettagsmontag":
                    tempDate = getNthWeekdayOfMonth(year, 9, 7, 3)
                    tempDate = new Date(tempDate.setDate(tempDate.getDate() + 1))
                    break

                case "Maienzug":
                    tempDate = getNthWeekdayOfMonth(year, 7, 5, 1)
                    console.log(tempDate)
                    break

                default:
                    break
            }
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

export function getHolidayRowsFromMunic(cantonID: string, municID: string, year: number): HolidayRowType[] {
    const holidays = municHolidays[cantonID][municID]

    let holidayRows: HolidayRowType[] = []
    holidays.forEach(({ name, date, type }) => {
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

export function getNthWeekdayOfMonth(year: number, month: number, weekday: number, n: number): Date {
    // month: 1= January, ..., 12= December
    // weekday: 1= Monday, ..., 7= Sunday
    const jsMonth = month - 1
    const firstOfMonth = new Date(year, jsMonth, 1)
    const jsFirstWeekday = firstOfMonth.getDay()
    const targetWeekday = weekday === 7 ? 0 : weekday

    let diff = (targetWeekday - jsFirstWeekday + 7) % 7
    // Add (n - 1) weeks to get the nth weekday
    return new Date(year, jsMonth, 1 + diff + 7 * (n - 1))
}

export function sortByDateField<T>(array: T[], field: keyof T, ascending: boolean = true): T[] {
    function parseDate(dateStr: string): number {
        const [day, month, year] = dateStr.split(".").map(Number)
        return new Date(year, month - 1, day).getTime() // Monate: 0-basiert
    }

    return array.sort((a, b) => {
        const dateA = parseDate(a[field] as unknown as string)
        const dateB = parseDate(b[field] as unknown as string)
        return ascending ? dateA - dateB : dateB - dateA
    })
}
