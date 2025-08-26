import type { HolidayRowType } from "./types"
import { HolidayType } from "./enums"
import { cantons, munics } from "./constants"

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

function _getHolidayRow(name: string, date: string, type: HolidayType): HolidayRowType {
    const dateObj = new Date(date)

    const month = dateObj.getMonth()
    const colDate = `${getDayStr(dateObj.getDate())}.${getMonthStr(month + 1)}.${dateObj.getFullYear()}`
    const colWeekday = getWeekdayStr(dateObj.getDay())
    const colMonthName = getMonthName(month)

    return { date: colDate, name, weekday: colWeekday, type, monthName: colMonthName }
}

export function getHolidayRowsData(data: Record<string, string>[]): HolidayRowType[] {
    let holidayRows: HolidayRowType[] = []
    data.forEach(({ name, date, type }) => {
        holidayRows.push(_getHolidayRow(name, date, HolidayType[type as keyof typeof HolidayType]))
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

export function getSitemapYearRange(): number[] {
    const currentYear = new Date().getFullYear()

    let years = []
    for (let i = 0; i < 7; i++) {
        // range from now: -1 year, +5 years
        let year = currentYear - 1 + i
        years.push(year)
    }

    return years
}

export function getStaticPageYearRange(): string[] {
    const currentYear = new Date().getFullYear()

    let years = []
    for (let i = 0; i < 5; i++) {
        // range from now: -1 year, +3 years
        let year = currentYear - 1 + i
        years.push(year.toString())
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
        "zug",
        "zuerich"
    ]
    return cities.includes(municID)
}

export function isMunicEqCant(municID: string): boolean {
    const cities = ["schwyz"]
    return cities.includes(municID)
}

export function getSitemapIds(): { id: string }[] {
    const ids = [{ id: "home" }, { id: "legal" }]
    for (const canton of Object.keys(cantons)) {
        ids.push({ id: canton })
    }

    return ids
}

export function isMunicParamValid(canton: string, munic: string): boolean {
    return isCantonParamValid(canton) && munic in munics[canton as keyof typeof munics]
}

export function isCantonParamValid(canton: string): boolean {
    return canton in cantons
}

export function isYearParamValid(year: string): boolean {
    return getYearRange().includes(parseInt(year))
}
