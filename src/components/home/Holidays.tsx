"use client"

import { ReactElement, useRef, useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"

import MiniSearch from "minisearch"

import { cantons } from "@/utils/constants"
import { getNationalHolidayRows, getHolidayRowsFromCanton, getWeekdayStr } from "@/utils/helpers"
import { HolidayType } from "@/utils/enums"
import type { HolidayRowType } from "@/utils/types"
import HolidaysFilter from "./HolidaysFilter"

function getHolidayRows(
  holidays: HolidayRowType[],
  year: string,
  typeFilter: string | null,
  weekdayFilter: string | null,
  searchFilter: string
): ReactElement[] {
  let oldMonthName = ""
  let holidayRows: ReactElement[] = []
  let fuzzyResults: string[] = []
  if (searchFilter) {
    let miniSearch = new MiniSearch({
      fields: ["name"],
      idField: "name"
    })
    miniSearch.addAll(holidays)

    const results = miniSearch.search(searchFilter, { fuzzy: 0.2 })
    results.forEach(({ id }) => {
      fuzzyResults.push(id)
    })
  }

  holidays.forEach(({ date, name, weekday, type, monthName }, i) => {
    // type filter
    if (typeFilter && type !== typeFilter) {
      return
    }

    // weekday filter
    if (weekdayFilter && weekday !== weekdayFilter) {
      return
    }

    // search filter
    if (
      searchFilter &&
      !name.toLowerCase().includes(searchFilter.toLocaleLowerCase()) &&
      !fuzzyResults.includes(name)
    ) {
      return
    }

    if (monthName !== oldMonthName) {
      holidayRows.push(
        <tr key={`month-header-${i}`}>
          <td
            className="bg-primary-100 dark:bg-primary-600/20 border-primary-200 dark:border-primary-900 text-primary-600 dark:text-primary-500 border-y-1 py-4 pl-4 text-left font-medium sm:pl-8"
            colSpan={4}>
            {monthName} {year}
          </td>
        </tr>
      )

      oldMonthName = monthName
    }

    holidayRows.push(
      <tr key={i}>
        <td className="py-4 pl-4 sm:pl-8">{date}</td>
        <td>{name}</td>
        <td>{weekday}</td>
        <td className="pr-4 sm:pr-8">{getTypeBadge(type)}</td>
      </tr>
    )
  })

  if (holidayRows.length === 0) {
    holidayRows.push(
      <tr key="no-results">
        <td
          className="border-y-1 border-neutral-200 bg-neutral-100 py-4 pl-4 text-left text-neutral-500 sm:pl-8 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-400"
          colSpan={4}>
          Keine Ergebnisse gefunden.
        </td>
      </tr>
    )
  }

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
      textColor = "text-red-600 dark:text-red-500"
      borderColor = "border-red-400 dark:border-red-800"
      bgColor = "bg-red-100 dark:bg-red-600/20"
      break

    case HolidayType.partly_by_law:
      text = "teils gesetzlich"
      textColor = "text-yellow-700 dark:text-yellow-600"
      borderColor = "border-yellow-400 dark:border-yellow-700"
      bgColor = "bg-yellow-100 dark:bg-yellow-600/20"
      break

    case HolidayType.optional:
      text = "optional"
      textColor = "text-sky-700 dark:text-sky-500"
      borderColor = "border-sky-400 dark:border-sky-800"
      bgColor = "bg-sky-100 dark:bg-sky-600/20"
      break

    default:
      break
  }

  return (
    <div className={`${textColor} ${borderColor} ${bgColor} w-fit rounded-full border-1 px-2 py-1 sm:px-3`}>
      <p className="text-xs sm:text-sm">{text}</p>
    </div>
  )
}

export function HolidaysFallback() {
  let holidayRows = []
  for (let i = 0; i < 5; i++) {
    holidayRows.push(
      <tr key={i}>
        <td className="flex py-4 pl-4 sm:pl-8">
          <div className="h-5 w-14 animate-pulse rounded-full bg-neutral-200 sm:h-6 sm:w-20 dark:bg-neutral-800" />
        </td>
        <td>
          <div className="h-5 w-32 animate-pulse rounded-full bg-neutral-200 sm:h-6 sm:w-44 dark:bg-neutral-800" />
        </td>
        <td>
          <div className="h-5 w-28 animate-pulse rounded-full bg-neutral-200 sm:h-6 sm:w-32 dark:bg-neutral-800" />
        </td>
        <td className="pr-4 sm:pr-8">
          <div className="h-5 w-20 animate-pulse rounded-full bg-neutral-200 sm:h-6 sm:w-24 dark:bg-neutral-800" />
        </td>
      </tr>
    )
  }

  return (
    <div className="mt-24 flex flex-col">
      <h1 className="font-brand text-2xl font-medium sm:text-center sm:text-3xl">
        Feiertage für{" "}
        <span className="text-primary-800 dark:text-primary-200 animate-pulse font-bold">. . .</span>
      </h1>
      {/* Filters */}
      <div className="mt-8 sm:mt-14 sm:flex sm:items-center sm:justify-between">
        <div className="sm:flex sm:w-1/2 sm:items-center">
          <div className="flex w-32 animate-pulse cursor-not-allowed justify-center rounded-full border-1 border-neutral-300 bg-neutral-300 px-5 py-3 font-medium text-transparent sm:w-28 sm:py-2 dark:border-neutral-800 dark:bg-neutral-800">
            placeholder
          </div>
          <div className="mt-3 flex w-48 animate-pulse cursor-not-allowed justify-center rounded-full border-1 border-neutral-300 bg-neutral-300 px-5 py-3 font-medium text-transparent sm:mt-0 sm:ml-3 sm:w-44 sm:py-2 dark:border-neutral-800 dark:bg-neutral-800">
            placeholder
          </div>
          <div className="mt-3 flex w-48 animate-pulse cursor-not-allowed justify-center rounded-full border-1 border-neutral-300 bg-neutral-300 px-5 py-3 font-medium text-transparent sm:mt-0 sm:ml-3 sm:w-44 sm:py-2 dark:border-neutral-800 dark:bg-neutral-800">
            placeholder
          </div>
        </div>
        <div className="mt-3 flex w-full animate-pulse cursor-not-allowed justify-center rounded-full border-1 border-neutral-300 bg-neutral-300 px-5 py-3 font-medium text-transparent sm:mt-0 sm:w-0 sm:py-2 dark:border-neutral-800 dark:bg-neutral-800">
          placeholder
        </div>
      </div>
      {/* Holidays Table */}
      <div className="mt-5">
        <div className="relative max-h-[500px] overflow-scroll rounded-lg border-1 border-neutral-300 shadow-lg sm:max-h-[600px] dark:border-neutral-800 dark:shadow-xl dark:shadow-neutral-900/50">
          <table className="w-full min-w-[600px]">
            <thead className="sticky top-0 bg-neutral-200 dark:bg-neutral-700">
              <tr className="font-semibold">
                <td className="relative py-4 pl-4 sm:pl-8">
                  <p>Datum</p>
                  <div className="absolute bottom-0 left-0 h-[1px] w-full bg-neutral-300 dark:bg-neutral-800" />
                </td>
                <td className="relative">
                  <p>Feiertag</p>
                  <div className="absolute bottom-0 left-0 h-[1px] w-full bg-neutral-300 dark:bg-neutral-800" />
                </td>
                <td className="relative">
                  <p>Wochentag</p>
                  <div className="absolute bottom-0 left-0 h-[1px] w-full bg-neutral-300 dark:bg-neutral-800" />
                </td>
                <td className="relative pr-4 sm:pr-8">
                  <p>Typ</p>
                  <div className="absolute bottom-0 left-0 h-[1px] w-full bg-neutral-300 dark:bg-neutral-800" />
                </td>
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
  // * States *
  const searchParams = useSearchParams()
  const [searchValue, setSearchValue] = useState("")
  const searchFilterRef: React.Ref<HTMLInputElement> = useRef(null)
  useEffect(() => {
    const currentSearchValue = searchFilterRef.current?.value
    if (currentSearchValue !== searchFilter) {
      setSearchValue(searchFilter)
    }
  }, [])

  // * Variables *
  const cantonID = searchParams.get("canton")
  const year = searchParams.get("year")
  const type = searchParams.get("type")
  const weekdayNr = searchParams.get("weekday")
  const weekday = weekdayNr ? getWeekdayStr(parseInt(weekdayNr)) : null

  const searchFilter = searchParams.get("search") || ""

  const currentYear = new Date().getFullYear()
  const fixedOrCurrentYear = year || currentYear.toString()

  let titleScope = "die gesamte Schweiz"
  let holidays: HolidayRowType[] = getNationalHolidayRows(parseInt(fixedOrCurrentYear))
  if (cantonID) {
    const cantonName = cantons[cantonID as keyof typeof cantons]
    titleScope = `Kanton ${cantonName}`
    holidays = getHolidayRowsFromCanton(cantonID, parseInt(fixedOrCurrentYear))
  }

  return (
    <div className="mt-24 flex flex-col">
      <h1 className="font-brand text-2xl font-medium sm:text-center sm:text-3xl">
        Feiertage für <span className="text-primary-800 dark:text-primary-200 font-bold">{titleScope}</span>
      </h1>
      {/* Filters */}
      <HolidaysFilter
        year={fixedOrCurrentYear}
        type={type}
        weekday={weekday}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        searchFilterRef={searchFilterRef}
      />
      {/* Holidays Table */}
      <div className="mt-5">
        <div className="relative max-h-[500px] overflow-scroll rounded-lg border-1 border-neutral-300 shadow-lg sm:max-h-[600px] dark:border-neutral-800 dark:shadow-xl dark:shadow-neutral-900/50">
          <table className="w-full min-w-[600px]">
            <thead className="sticky top-0 bg-neutral-200 dark:bg-neutral-700">
              <tr className="font-semibold">
                <td className="relative py-4 pl-4 sm:pl-8">
                  <p>Datum</p>
                  <div className="absolute bottom-0 left-0 h-[1px] w-full" />
                </td>
                <td className="relative">
                  <p>Feiertag</p>
                  <div className="absolute bottom-0 left-0 h-[1px] w-full" />
                </td>
                <td className="relative">
                  <p>Wochentag</p>
                  <div className="absolute bottom-0 left-0 h-[1px] w-full" />
                </td>
                <td className="relative pr-4 sm:pr-8">
                  <p>Typ</p>
                  <div className="absolute bottom-0 left-0 h-[1px] w-full" />
                </td>
              </tr>
            </thead>
            <tbody>{getHolidayRows(holidays, fixedOrCurrentYear, type, weekday, searchValue)}</tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
