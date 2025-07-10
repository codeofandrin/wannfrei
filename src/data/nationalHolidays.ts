import { HolidayType } from "@/utils/enums"

type NationHolidaysType = Array<{ name: string; date: string | null; type: HolidayType }>

export const nationalHolidays: NationHolidaysType = [
    { name: "Neujahrstag", date: "01-01", type: HolidayType.by_law },
    { name: "Karfreitag", date: null, type: HolidayType.partly_by_law },
    { name: "Auffahrt", date: null, type: HolidayType.by_law },
    { name: "Bundesfeier", date: "08-01", type: HolidayType.by_law },
    { name: "Weihnachtstag", date: "12-25", type: HolidayType.by_law }
]

export default nationalHolidays
