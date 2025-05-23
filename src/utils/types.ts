import type { HolidayType } from "./enums"

export type HolidayRowType = {
    date: string
    name: string
    weekday: string
    type: HolidayType
    monthName: string
}
