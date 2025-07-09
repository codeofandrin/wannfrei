import { easter } from "date-easter"

import nationalHolidays from "@/data/nationalHolidays"
import cantonHolidays from "@/data/cantonHolidays"
import municHolidays from "@/data/municHolidays"
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
            "Aschermittwoch",
            "St. Burkard",
            "Banntag Liestal"
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

                case "St. Burkard":
                    tempDate.setDate(tempDate.getDate() + 43)
                    break

                case "Banntag Liestal":
                    tempDate.setDate(tempDate.getDate() + 39) // Ascension day ("Auffahrt")
                    // Monday before Ascension day
                    tempDate.setDate(tempDate.getDate() - 3)
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
                    tempDate.setDate(tempDate.getDate() + 4)
                    break

                case "Bettagsmontag":
                    tempDate = getNthWeekdayOfMonth(year, 9, 7, 3)
                    tempDate.setDate(tempDate.getDate() + 1)
                    break

                case "Maienzug":
                    tempDate = getNthWeekdayOfMonth(year, 7, 5, 1)
                    break

                case "Jugendfest":
                    tempDate = getNthWeekdayOfMonth(year, 7, 5, 2)
                    break

                case "Kinderfest":
                    tempDate = getNthWeekdayOfMonth(year, 7, 5, 1)
                    break

                case "Solennität Burgdorf":
                    tempDate = getNthWeekdayOfMonth(year, 6, 1, -1)
                    break

                case "Ausschiesset":
                    tempDate = getNthWeekdayOfMonth(year, 9, 7, -2)
                    // Monday after 4th Sunday in September
                    tempDate.setDate(tempDate.getDate() + 1)
                    break

                case "Solennität Murten":
                    tempDate = new Date(`${year}-06-22`)
                    // if it's a Sunday it's on Saturday instead
                    if (tempDate.getDay() === 0) {
                        tempDate.setDate(tempDate.getDate() - 1)
                    }
                    break

                case "Landsgemeinde":
                    tempDate = getNthWeekdayOfMonth(year, 5, 7, 1)
                    break

                case "St. Martinsmontag":
                    tempDate = getNthWeekdayOfMonth(year, 11, 1, -3)
                    break

                case "Chilbi Einsiedeln":
                    tempDate = getNthWeekdayOfMonth(year, 8, 7, -1)
                    break

                case "Chilbi Payerne":
                    tempDate = getNthWeekdayOfMonth(year, 8, 1, 3)
                    break

                default:
                    throw Error(`'date' is not set nor replaced for '${name}'`)
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
    const targetWeekday = weekday === 7 ? 0 : weekday // Convert to JS weekday: Sunday = 0

    if (n < 0) {
        // Last, second last, etc. weekday of the month
        // Get the last day of the month
        const lastOfMonth = new Date(year, month, 0)
        const jsLastWeekday = lastOfMonth.getDay()
        const diff = (jsLastWeekday - targetWeekday + 7) % 7
        const lastTargetWeekdayDate = new Date(year, month, 0 - diff)
        return new Date(
            lastTargetWeekdayDate.getFullYear(),
            lastTargetWeekdayDate.getMonth(),
            lastTargetWeekdayDate.getDate() - 7 * (-n - 1) // Subtract 0 for -1, 7 for -2, etc.
        )
    } else {
        const firstOfMonth = new Date(year, jsMonth, 1)
        const jsFirstWeekday = firstOfMonth.getDay()
        const diff = (targetWeekday - jsFirstWeekday + 7) % 7
        return new Date(year, jsMonth, 1 + diff + 7 * (n - 1))
    }
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

export function isMunicEqCantAndCity(municID: string): boolean {
    const cities = [
        "basel",
        "bern",
        "freiburg",
        "genf",
        "luzern",
        "neuenburg",
        "schaffhausen",
        "solothurn",
        "st-gallen",
        "zug"
    ]
    return cities.includes(municID)
}

export function isMunicEqCant(municID: string): boolean {
    const cities = ["schwyz"]
    return cities.includes(municID)
}
