"use client"

import { ReactElement, useCallback } from "react"
import { useSearchParams, useRouter, usePathname } from "next/navigation"

import { cantons } from "@/utils/constants"
import { getNationalHolidayRows, getHolidayRowsFromCanton } from "@/utils/helpers"
import { HolidayType } from "@/utils/enums"
import type { HolidayRowType } from "@/utils/types"
import Dropdown from "../common/Dropdown"

interface HolidaysPropsType {
  cantonID: string | null
  year: string | null
}

function getHolidayRows(holidays: HolidayRowType[], year: string): ReactElement[] {
  let oldMonthName = ""
  let holidayRows: ReactElement[] = []
  holidays.forEach(({ date, name, weekday, type, monthName }, i) => {
    if (monthName !== oldMonthName) {
      holidayRows.push(
        <tr key={`month-header-${i}`}>
          <td
            className="bg-primary-100 border-primary-200 text-primary-600 border-y-1 px-4 py-4 text-left font-medium"
            colSpan={4}>
            {monthName} {year}
          </td>
        </tr>
      )

      oldMonthName = monthName
    }

    holidayRows.push(
      <tr key={i}>
        <td className="py-4 pl-4">{date}</td>
        <td>{name}</td>
        <td>{weekday}</td>
        <td className="pr-4">{getTypeBadge(type)}</td>
      </tr>
    )
  })

  return holidayRows
}

function getTypeBadge(type: HolidayType): ReactElement {
  let text
  let textColor
  let borderColor
  let bgColor

  switch (type) {
    case HolidayType.by_law:
      text = "gesetzlich"
      textColor = "text-red-600"
      borderColor = "border-red-400"
      bgColor = "bg-red-100"
      break

    case HolidayType.partly_by_law:
      text = "teils gesetzlich"
      textColor = "text-yellow-700"
      borderColor = "border-yellow-400"
      bgColor = "bg-yellow-100"
      break

    case HolidayType.optional:
      text = "optional"
      textColor = "text-sky-700"
      borderColor = "border-sky-400"
      bgColor = "bg-sky-100"
      break

    default:
      break
  }

  return (
    <div className={`${textColor} ${borderColor} ${bgColor} w-fit rounded-full border-1 px-2 py-1`}>
      <p className="text-xs">{text}</p>
    </div>
  )
}

export function HolidaysFallback() {
  let holidayRows = []
  for (let i = 0; i < 5; i++) {
    holidayRows.push(
      <tr key={i}>
        <td className="flex py-4 pl-4">
          <div className="h-5 w-14 animate-pulse rounded-full bg-neutral-200" />
        </td>
        <td>
          <div className="h-5 w-32 animate-pulse rounded-full bg-neutral-200" />
        </td>
        <td>
          <div className="h-5 w-28 animate-pulse rounded-full bg-neutral-200" />
        </td>
        <td className="pr-4">
          <div className="h-5 w-20 animate-pulse rounded-full bg-neutral-200" />
        </td>
      </tr>
    )
  }

  return (
    <div className="mt-24 flex flex-col">
      <h1 className="font-brand text-2xl font-medium">
        Feiertage für <span className="text-primary-800 animate-pulse font-bold">. . .</span>
      </h1>
      {/* Filters */}
      <div className="mt-8">
        <div className="flex w-32 animate-pulse cursor-not-allowed justify-center rounded-full border-1 border-neutral-300 bg-neutral-300 px-5 py-3 font-medium text-transparent">
          placeholder
        </div>
      </div>
      {/* Holidays Table */}
      <div className="mt-5">
        <div className="relative max-h-[500px] overflow-scroll rounded-lg shadow-lg">
          <table className="w-full min-w-[600px]">
            <thead className="bg-neutral-200">
              <tr className="font-semibold">
                <td className="py-4 pl-4">Datum</td>
                <td>Feiertag</td>
                <td>Wochentag</td>
                <td className="pr-4">Typ</td>
              </tr>
            </thead>
            <tbody>{holidayRows}</tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default function Holidays() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const createQueryString = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(key, value)

      return params.toString()
    },
    [searchParams]
  )

  const cantonID = searchParams.get("canton")
  const year = searchParams.get("year")
  const currentYear = new Date().getFullYear()
  const fixedOrCurrentYear = year || currentYear.toString()

  let yearOptions = []
  for (let i = 0; i < 26; i++) {
    // range from now: -5 years, +20 years
    let yearStr = (currentYear - 5 + i).toString()
    yearOptions.push({ id: yearStr, value: yearStr })
  }

  let titleScope = "die gesamte Schweiz"
  let holidays: HolidayRowType[] = getNationalHolidayRows(parseInt(fixedOrCurrentYear))
  if (cantonID) {
    const cantonName = cantons[cantonID as keyof typeof cantons]
    titleScope = `Kanton ${cantonName}`
    holidays = getHolidayRowsFromCanton(cantonID, parseInt(fixedOrCurrentYear))
  }

  function handleSetYear(id: string) {
    router.push(`${pathname}?${createQueryString("year", id)}`, { scroll: false })
  }

  return (
    <div className="mt-24 flex flex-col">
      <h1 className="font-brand text-2xl font-medium">
        Feiertage für <span className="text-primary-800 font-bold">{titleScope}</span>
      </h1>
      {/* Filters */}
      <div className="mt-8">
        <Dropdown
          className="!w-32"
          theme="secondary"
          placeholder={fixedOrCurrentYear as string}
          options={yearOptions}
          setValue={handleSetYear}
        />
      </div>
      {/* Holidays Table */}
      <div className="mt-5">
        <div className="relative max-h-[500px] overflow-scroll rounded-lg shadow-lg">
          <table className="w-full min-w-[600px]">
            <thead className="bg-neutral-200">
              <tr className="font-semibold">
                <td className="py-4 pl-4">Datum</td>
                <td>Feiertag</td>
                <td>Wochentag</td>
                <td className="pr-4">Typ</td>
              </tr>
            </thead>
            <tbody>{getHolidayRows(holidays, fixedOrCurrentYear)}</tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
